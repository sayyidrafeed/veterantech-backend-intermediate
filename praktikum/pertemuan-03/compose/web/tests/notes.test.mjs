import assert from "node:assert/strict";
import { createServer } from "node:http";
import { test } from "node:test";
import { GET, POST } from "../app/api/notes/route.js";

test("proxy notes: runtime URL, fresh reads, validation and outage", async () => {
  const previous = process.env.API_URL;
  const calls = [];
  let unavailable = false;
  let record = { id: 1, text: "Catatan uji", created_at: "2026-10-03T00:00:00Z" };
  const server = createServer(async (req, res) => {
    let body = "";
    for await (const chunk of req) body += chunk;
    calls.push({ method: req.method, path: req.url, body });
    res.setHeader("Content-Type", "application/json");
    if (unavailable) {
      res.writeHead(503).end(JSON.stringify({ error: "Private upstream diagnostic" }));
    } else if (req.method === "POST") {
      const input = JSON.parse(body);
      if (!input.text?.trim()) res.writeHead(400).end(JSON.stringify({ error: "Invalid text" }));
      else {
        record = { ...record, text: input.text };
        res.writeHead(201).end(JSON.stringify(record));
      }
    } else res.end(JSON.stringify([record]));
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  process.env.API_URL = `http://127.0.0.1:${server.address().port}`;
  const post = text => POST(new Request("http://web/api/notes", {
    method: "POST", body: JSON.stringify({ text }),
  }));
  try {
    const first = await GET();
    assert.equal(first.status, 200);
    assert.equal(first.headers.get("cache-control"), "no-store");
    assert.deepEqual(await first.json(), [record]);
    const saved = await post("Baru ' <script> &\nbaris kedua");
    assert.equal(saved.status, 201);
    assert.equal((await saved.json()).text, record.text);
    assert.deepEqual(await (await GET()).json(), [record]);
    assert.equal((await post(" ")).status, 400);
    const before = calls.length;
    assert.equal((await POST(new Request("http://web/api/notes", { method: "POST", body: "{" }))).status, 400);
    assert.equal(calls.length, before);
    assert.ok(calls.every(call => call.path === "/notes"));
    unavailable = true;
    const outage = await GET();
    assert.equal(outage.status, 503);
    assert.deepEqual(await outage.json(), { error: "Layanan catatan tidak tersedia. Coba lagi nanti." });
    unavailable = false;
    assert.equal((await GET()).status, 200);
    await new Promise(resolve => server.close(resolve));
    assert.equal((await GET()).status, 503);
    assert.equal((await post("API offline")).status, 503);
    process.env.API_URL = "invalid-url";
    assert.equal((await GET()).status, 503);
  } finally {
    server.close();
    if (previous === undefined) delete process.env.API_URL;
    else process.env.API_URL = previous;
  }
});
