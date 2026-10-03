import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import net from "node:net";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL(".", import.meta.url));
const project = `veterantech-p03-web-smoke-${randomUUID().slice(0, 8)}`;
async function freePort() {
  const server = net.createServer();
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}
const webPort = await freePort();
let apiPort = await freePort();
while (apiPort === webPort) apiPort = await freePort();
const env = { ...process.env, WEB_HOST_PORT: String(webPort), API_HOST_PORT: String(apiPort) };
const base = `http://127.0.0.1:${webPort}`;
const compose = (...args) => execFileSync("docker", [
  "compose", "--project-name", project, "-f", "compose.yaml", "-f", "compose.web.yaml", ...args,
], { cwd, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
const request = (path, options) => fetch(base + path, { ...options, signal: AbortSignal.timeout(10000) });
const up = () => compose("up", "-d", "--no-build", "--pull", "never", "--wait", "--wait-timeout", "60");
let started = false;
try {
  const freeKiB = Number(execFileSync("df", ["-Pk", cwd], { encoding: "utf8" }).trim().split("\n").at(-1).split(/\s+/)[3]);
  assert.ok(freeKiB >= 20 * 1024 * 1024, "Need at least 20 GiB free before Docker smoke check");
  compose("config", "--quiet");
  for (const image of ["veterantech-api-compose-p03:1", "veterantech-web-compose-p03:1", "postgres:17-alpine"]) {
    execFileSync("docker", ["image", "inspect", image], { stdio: "ignore" });
  }
  started = true;
  up();
  assert.equal((await request("/health")).status, 200);
  const page = await request("/");
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.ok(html.includes("Catatan Kelas"));
  const assets = [...new Set([...html.matchAll(/(?:src|href)="([^" ]*\/_next\/static\/[^" ]+)"/g)].map(match => match[1]))];
  assert.ok(assets.length > 0, "Expected Next.js static assets in HTML");
  for (const asset of assets) assert.equal((await request(asset.replaceAll("&amp;", "&"))).status, 200);
  const post = text => request("/api/notes", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }),
  });
  for (const invalid of ["", "   ", 12, "x".repeat(1001)]) assert.equal((await post(invalid)).status, 400);
  assert.equal((await request("/api/notes", { method: "POST", body: "{" })).status, 400);
  const response = await post("Catatan lewat Next.js ' <script> &\nbaris kedua");
  assert.equal(response.status, 201);
  const record = await response.json();
  const assertRecord = async () => {
    const response = await request("/api/notes");
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.ok((await response.json()).some(note => note.id === record.id && note.text === record.text));
  };
  await assertRecord();
  assert.notEqual(compose("exec", "-T", "web", "id", "-u").trim(), "0");
  compose("exec", "-T", "web", "sh", "-c", "test -f server.js && test -d .next/static && test -d node_modules && test ! -d app && test ! -f Dockerfile");
  compose("down");
  up();
  await assertRecord();
  for (const service of ["api", "db"]) {
    compose("stop", service);
    assert.equal((await request("/health")).status, 200);
    assert.equal((await request("/api/notes")).status, 503);
    assert.equal((await post("Saat layanan berhenti")).status, 503);
    up();
    await assertRecord();
  }
  console.log("PASS: page/assets, notes through web, validation, persistence, API/DB recovery, non-root standalone runner");
} catch (error) {
  console.error(error instanceof assert.AssertionError ? error.message : started
    ? "Smoke web failed; inspect diagnostic artifacts."
    : "Preflight failed; check .env, Docker daemon, and three locally available images.");
  if (started) {
    const folder = `${cwd}artifacts/${project}`;
    mkdirSync(folder, { recursive: true });
    for (const [name, args] of [["state.txt", ["ps", "--all"]], ["logs.txt", ["logs", "--no-color", "--tail", "100"]]]) {
      try { writeFileSync(`${folder}/${name}`, compose(...args)); }
      catch { /* Preserve any diagnostics already written. */ }
    }
    console.error(`Diagnostics: ${folder}`);
  }
  process.exitCode = 1;
} finally {
  if (started) {
    try { compose("down", "--volumes"); }
    catch { console.error(`Cleanup failed for isolated project ${project}; inspect it manually.`); process.exitCode = 1; }
  }
}
