const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("API kelas berjalan");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "api-kelas" });
});

app.listen(port, "0.0.0.0", (error) => {
  if (error) throw error;
  console.log("API listening on " + port);
});
