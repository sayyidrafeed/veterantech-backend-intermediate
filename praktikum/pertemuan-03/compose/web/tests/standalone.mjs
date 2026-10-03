import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import net from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const source = fileURLToPath(new URL("../", import.meta.url));
const folder = mkdtempSync(join(tmpdir(), "veterantech-web-standalone-"));
const upstream = createServer(async (req, res) => {
  assert.equal(req.url, "/notes");
  let body = "";
  for await (const chunk of req) body += chunk;
  res.setHeader("Content-Type", "application/json");
  if (req.method === "POST") res.writeHead(201).end(JSON.stringify({ id: 1, ...JSON.parse(body), created_at: "2026-10-03T00:00:00Z" }));
  else res.end("[]");
});
let child;
let logs = "";
try {
  cpSync(join(source, ".next/standalone"), folder, { recursive: true });
  cpSync(join(source, ".next/static"), join(folder, ".next/static"), { recursive: true });
  cpSync(join(source, "public"), join(folder, "public"), { recursive: true });
  await new Promise(resolve => upstream.listen(0, "127.0.0.1", resolve));
  const reservation = net.createServer();
  await new Promise(resolve => reservation.listen(0, "127.0.0.1", resolve));
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  const base = `http://127.0.0.1:${port}`;
  const request = (path, options) => fetch(base + path, { ...options, signal: AbortSignal.timeout(8000) });
  child = spawn(process.execPath, ["server.js"], {
    cwd: folder,
    env: { ...process.env, HOSTNAME: "127.0.0.1", PORT: String(port), NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1", API_URL: `http://127.0.0.1:${upstream.address().port}` },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", chunk => { logs += chunk; });
  child.stderr.on("data", chunk => { logs += chunk; });
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await request("/health")).ok) { ready = true; break; } } catch {}
    if (child.exitCode !== null) break;
    await delay(100);
  }
  assert.ok(ready, "Standalone server failed to start");
  const page = await request("/");
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.ok(html.includes("Catatan Kelas"));
  assert.ok(html.includes("Catatan baru"));
  const assets = [...new Set([...html.matchAll(/(?:src|href)="([^" ]*\/_next\/static\/[^" ]+)"/g)].map(match => match[1]))];
  assert.ok(assets.some(asset => asset.includes(".css")));
  assert.ok(assets.some(asset => asset.includes(".js")));
  for (const asset of assets) assert.equal((await request(asset.replaceAll("&amp;", "&"))).status, 200);
  assert.deepEqual(await (await request("/api/notes")).json(), []);
  const post = await request("/api/notes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: "Uji standalone" }) });
  assert.equal(post.status, 201);
  assert.equal((await post.json()).text, "Uji standalone");
  await new Promise(resolve => upstream.close(resolve));
  assert.equal((await request("/api/notes")).status, 503);
  console.log(`PASS: standalone server, page, ${assets.length} static assets, runtime API_URL forwarding and upstream outage (mock HTTP API)`);
} catch (error) {
  console.error(logs);
  throw error;
} finally {
  upstream.close();
  if (child && child.exitCode === null) {
    const exited = once(child, "exit");
    child.kill("SIGTERM");
    const stopped = await Promise.race([exited.then(() => true), delay(5000).then(() => false)]);
    if (!stopped) { child.kill("SIGKILL"); await exited; }
  }
  rmSync(folder, { recursive: true, force: true });
}
