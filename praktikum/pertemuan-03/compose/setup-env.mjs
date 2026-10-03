import { randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const target = fileURLToPath(new URL(".env", import.meta.url));
try {
  writeFileSync(target, `POSTGRES_USER=demo\nPOSTGRES_DB=classroom\nPOSTGRES_PASSWORD=${randomBytes(24).toString("hex")}\nAPI_HOST_PORT=8085\n`, { flag: "wx", mode: 0o600 });
  console.log(".env lokal dibuat; password tidak ditampilkan.");
} catch (error) {
  if (error.code !== "EEXIST") throw error;
  console.log(".env sudah ada; isinya dipertahankan.");
}
