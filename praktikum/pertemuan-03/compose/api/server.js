const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({ connectionTimeoutMillis: 2000 });
pool.on("error", () => console.error("Database connection interrupted"));
app.use(express.json({ limit: "16kb" }));

app.get("/health", async (_req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    next(error);
  }
});

app.get("/notes", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT id, text, created_at FROM notes ORDER BY id");
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.post("/notes", async (req, res, next) => {
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text || text.length > 1000) {
    return res.status(400).json({ error: "text must contain 1–1000 characters" });
  }
  try {
    const { rows } = await pool.query(
      "INSERT INTO notes (text) VALUES ($1) RETURNING id, text, created_at",
      [text],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  if (error.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
  if (error.type === "entity.too.large") return res.status(413).json({ error: "Request body too large" });
  console.error("Database request failed");
  res.status(503).json({ error: "Database unavailable" });
});

const server = app.listen(Number(process.env.PORT || 3000), "0.0.0.0", () => {
  console.log("API listening on " + server.address().port);
});
process.on("SIGTERM", () => {
  server.close(() => pool.end().then(() => process.exit(0)));
});
