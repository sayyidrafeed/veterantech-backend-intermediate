import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import net from "node:net";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL(".", import.meta.url));
const project = `veterantech-p03-smoke-${randomUUID().slice(0, 8)}`;
const reservation = net.createServer();
await new Promise(resolve => reservation.listen(0, "127.0.0.1", resolve));
const port = reservation.address().port;
await new Promise(resolve => reservation.close(resolve));
const env = { ...process.env, API_HOST_PORT: String(port) };
const base = `http://127.0.0.1:${port}`;
const compose = (...args) => execFileSync("docker", ["compose", "--project-name", project, "-f", "compose.yaml", ...args], { cwd, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
const request = async (path, options) => {
  const response = await fetch(base + path, { ...options, signal: AbortSignal.timeout(8000) });
  return { status: response.status, body: await response.json() };
};
const up = () => compose("up", "-d", "--no-build", "--pull", "never", "--wait", "--wait-timeout", "60");
let started = false;
try {
  const freeKiB = Number(execFileSync("df", ["-Pk", cwd], { encoding: "utf8" }).trim().split("\n").at(-1).split(/\s+/)[3]);
  assert.ok(freeKiB >= 20 * 1024 * 1024, "Need at least 20 GiB free before Docker smoke check");
  compose("config", "--quiet");
  execFileSync("docker", ["image", "inspect", "veterantech-api-compose-p03:1"], { stdio: "ignore" });
  execFileSync("docker", ["image", "inspect", "postgres:17-alpine"], { stdio: "ignore" });
  started = true;
  up();
  assert.equal((await request("/health")).status, 200);
  const post = text => request("/notes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
  for (const invalid of ["", "   ", 12, "x".repeat(1001)]) assert.equal((await post(invalid)).status, 400);
  assert.equal((await request("/notes", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" })).status, 400);
  const noteText = "Catatan uji: apostrophe ' dan parameter SQL";
  const created = await post(noteText);
  assert.equal(created.status, 201);
  assert.equal(created.body.text, noteText);
  assert.ok(created.body.id && created.body.created_at);
  const assertRecord = async () => {
    const result = await request("/notes");
    assert.equal(result.status, 200);
    assert.ok(result.body.some(row => row.id === created.body.id && row.text === created.body.text));
  };
  await assertRecord();
  compose("down");
  up();
  await assertRecord();
  compose("stop", "db");
  assert.equal((await request("/health")).status, 503);
  assert.equal((await request("/notes")).status, 503);
  assert.equal((await post("Saat DB berhenti")).status, 503);
  up();
  assert.equal((await request("/health")).status, 200);
  await assertRecord();
  console.log("PASS: health, input validation, SQL write/read, persistence, DB outage and recovery");
} catch (error) {
  console.error(error instanceof assert.AssertionError ? error.message : started
    ? "Smoke check failed; inspect diagnostic artifacts."
    : "Preflight failed; check .env, Docker daemon, and both locally available images.");
  if (started) {
    const folder = `${cwd}artifacts/${project}`;
    mkdirSync(folder, { recursive: true });
    for (const [name, args] of [["state.txt", ["ps", "--all"]], ["logs.txt", ["logs", "--no-color", "--tail", "100"]]]) {
      try { writeFileSync(`${folder}/${name}`, compose(...args)); } catch { /* Keep any diagnostics already written. */ }
    }
    console.error(`Diagnostics: ${folder}`);
  }
  process.exitCode = 1;
} finally {
  if (started) {
    try { compose("down", "--volumes"); }
    catch { console.error(`Cleanup failed for isolated test project ${project}; inspect it manually.`); process.exitCode = 1; }
  }
}
