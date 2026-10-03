# Verifikasi paket mentor

Pemeriksaan pada 3 Oktober 2026 di macOS. Bagian SSH/Dockerfile memakai Node lokal dan instalasi Express dari praktikum Pertemuan 2 tanpa dependency baru. Paket Compose terpisah memiliki dependency Express 5.2.1 dan `pg` 8.23.1 beserta lockfile sendiri.

## SSH dan Dockerfile: sudah diperiksa

- `node --check praktikum/pertemuan-03/dockerfile/starter/server.js`: lolos.
- `bash -n praktikum/pertemuan-03/dockerfile/build-image.sh`: lolos.
- Semua 36 blok shell pada README dan tiga runbook: lolos parsing `bash -n`; parsing tidak menjalankan command.
- `server.js`, manifest, lockfile, dan `.dockerignore` starter sama dengan starter Pertemuan 2. Manifest dan lockfile sepakat pada Express 5.2.1.
- Smoke check API: proses Node pada port lokal sementara dengan `NODE_PATH` menunjuk dependency lama. `GET /health` menghasilkan status 200 dan JSON yang diharapkan, `GET /` menghasilkan teks yang diharapkan, serta override `PORT` bekerja. Proses ditutup setelah pemeriksaan.
- Helper build menolak run ketika disk kosong kurang dari 20 GiB. Penolakan terjadi sebelum image dibangun atau lock build diambil.
- Tautan lokal dan whitespace paket diperiksa saat penyiapan.

## Compose: sudah diperiksa

- Node 24.21.0: sintaks `api/server.js`, `setup-env.mjs`, dan `smoke.mjs` lolos `node --check`.
- Dependency diinstal dengan `npm install --ignore-scripts --no-audit --no-fund`; manifest dan lockfile konsisten. Host installer memakai Node 22 sehingga memberi warning engine; pemeriksaan API kemudian memakai Node 24 sesuai target Dockerfile.
- Docker Compose 5.5.1: `config --quiet` lolos untuk konfigurasi utama dan gabungan masing-masing override hostname/network.
- Konfigurasi ter-resolve diperiksa tanpa mencetak credential: API memakai `db`, host mapping hanya `127.0.0.1`, DB tidak mempublish port; override network mengganti network API menjadi `isolated-net`, sementara DB tetap di `app-net`.
- API dijalankan dengan Node 24 pada port sementara dan alamat database lokal yang tidak tersedia. Input kosong, whitespace, tipe salah, teks terlalu panjang, dan JSON malformed menghasilkan 400; body terlalu besar menghasilkan 413. Health, GET notes, dan POST valid menghasilkan 503 dengan pesan tetap tanpa credential. Proses tetap hidup dan ditutup setelah pemeriksaan.
- Generator `.env` tidak menampilkan password, mempertahankan file existing, dan file lokal di-ignore bersama `node_modules` serta artifact smoke check.
- Blok shell runbook lolos `bash -n`; tautan lokal dan whitespace diperiksa. Parsing tidak menjalankan command demo.
- `node smoke.mjs` menolak run sebelum stack dibuat karena disk kurang dari 20 GiB. Ini pemeriksaan guard, bukan hasil lulus smoke integrasi.

## Belum diverifikasi runtime

- SSH login, pemasangan public key, dan command VPS: tidak dijalankan; perlu rehearsal dengan akun VPS mentor yang sah.
- Image Docker, container, port mapping, dan rebuild: belum dijalankan. Disk host sekitar 14 GiB kosong, di bawah headroom 20 GiB untuk demo Docker. Tidak ada image pull/build yang dilakukan.
- Jalur sukses helper build dan lifecycle lock saat build nyata belum diuji.
- Compose: build/image runtime Node 24, SQL init, write/read PostgreSQL, DNS container, kedua failure override, outage/recovery DB, dan persistensi setelah recreate belum dijalankan. Disk saat penyiapan Compose sekitar 15 GiB kosong; tidak ada pull/build atau startup stack.

## Rehearsal sebelum kelas

1. Ikuti `ssh/persiapan-mentor.md`, lalu `ssh/demo.md` pada VPS yang akan dipakai.
2. Setelah tersedia headroom disk dan tidak ada build lain, ikuti bagian rehearsal di `dockerfile/demo.md`.
3. Buktikan health, port mapping, environment override, dan perubahan respons setelah rebuild sesuai runbook; simpan error spesifik jika ada.
4. Ikuti [demo Compose](./compose/demo.md), build sekali melalui helper existing, lalu jalankan `node smoke.mjs` dari folder Compose. Smoke memakai project/volume terpisah dan menghapus hanya data pengujiannya.
5. Bersihkan hanya container/file demo yang dibuat. Pertahankan volume demo, cache/image yang masih berguna, lalu pastikan Dockerfile starter masih kosong untuk live coding.

Dokumen ini mencatat batas pemeriksaan; bukan bukti demo kelas atau penerimaan mentee.

## Tambahan Next.js + multi-stage · 3 Oktober 2026

- App di `compose/web/` memakai Next.js 16.3.8, React/React DOM 19.3.0, JavaScript, CSS biasa, dan lockfile npm. Dependency diinstal dengan `npm install --ignore-scripts --no-audit --no-fund`. Installer Node 22.23.1 memberi warning engine app; seluruh pemeriksaan runtime/build di bawah memakai Node 24.19.0 bundled Codex.
- Dari `compose/web/`, `npm test` lolos: route handler diuji terhadap server HTTP sementara untuk GET/POST, respons terbaru, no-store, status 201/400, JSON malformed tanpa request upstream, API offline/503, konfigurasi URL invalid, serta recovery. API mock bukan PostgreSQL.
- `NEXT_TELEMETRY_DISABLED=1 npm run build` lolos pada source UI final. Build memakai lock `~/.cache/codex-heavy-build.lock` dan pemeriksaan headroom framework minimal 10 GiB serta build aktif. Lock milik pemeriksaan dilepas setelah build. Output menunjukkan halaman `/` statis dan `/api/notes`, `/health` dinamis; API/database tidak diperlukan saat build.
- `npm run test:standalone` lolos dengan server output standalone dalam folder temporer: halaman 200, delapan asset JS/CSS 200, GET/POST diteruskan ke URL API yang diberikan saat startup, POST 201, dan upstream offline 503. Proses ditutup dan folder temporer pengujian dihapus. Ini bukti standalone lokal macOS, bukan runtime Linux Alpine/Docker.
- `docker compose -f compose.yaml -f compose.web.yaml config --quiet` lolos. Services `db`, `api`, `web`; web memakai runtime `API_URL=http://api:3000`, network `app-net`, dependensi API healthy, default port host 8086 hanya pada localhost. Demo dasar tetap memakai file Compose utama.
- `node --check compose/smoke-web.mjs` lolos. Manifest/lockfile, tautan lokal, dan semua blok shell kedua dokumen baru diperiksa; shell memakai `bash -n`, tidak menjalankan demo. Whitespace diff diperiksa.
- `node compose/smoke-web.mjs` ditolak oleh guard sebelum startup karena disk sekitar 12 GiB kosong. Tidak ada image pull/build atau startup Docker. Smoke tiga service belum lulus runtime: PostgreSQL, persistensi volume, outage/recovery Docker, user non-root dan filesystem image runner masih perlu rehearsal setelah headroom mencapai 20 GiB.
- UI mengikuti arah buku catatan kelas: tema terang tetap untuk screen share, font sistem, form dan daftar bernomor, fokus keyboard terlihat, loading/kosong/error tersedia, tanpa asset/angka/testimoni fiktif. Handler simpan/muat ulang tersambung menurut inspeksi source dan route runtime; render breakpoint, interaksi browser, serta penerimaan UI manual oleh Rafee belum diverifikasi. Tidak mengklaim gate UI lengkap PASS.

Setelah headroom tersedia, ikuti [runbook Next.js](./compose/demo-web.md), build web satu kali via helper existing, lalu jalankan `node smoke-web.mjs` dari folder Compose. Smoke menggunakan project/port/volume terpisah, tanpa pull/build otomatis. Dokumentasi memisahkan tiga stage pembentukan satu image dari tiga container service. Tidak ada angka penghematan image yang diklaim.

## Preview berjalan lokal · 3 Oktober 2026

- Permintaan menjalankan demo dilanjutkan dengan preview lokal karena disk masih sekitar 12 GiB. Docker Engine 29.7.2 tersedia, tetapi ketiga image demo belum tersedia dan batas 20 GiB belum terpenuhi. Tidak ada pull/build/startup Docker atau cleanup disk.
- Next.js standalone berjalan di `http://localhost:8086`, API Express di port 8085, dan PostgreSQL Homebrew 18.6 pada Unix socket `/tmp`, port socket 55433, tanpa listener TCP. Ini berbeda dari target PostgreSQL 17 Alpine di Compose.
- Database preview tersendiri dibuat di `compose/artifacts/local-preview/db/` (di-ignore). Tabel memakai `db/init.sql`; data ini terpisah dari named volume Docker. Tidak menggunakan API mock untuk preview berjalan ini.
- HTTP check lokal: halaman web 200, health API/database 200, POST melalui `/api/notes` 201, dan GET melalui Next.js memuat ID/text catatan yang sama. Satu catatan uji berlabel preview lokal disimpan. Node memakai versi bundled 24.19.0.
- Proses preview ditinggalkan berjalan agar Rafee dapat mencoba UI secara manual. Ini membuktikan alur aplikasi lokal; build stage Docker, network Compose, volume Docker, dan penerimaan UI tetap belum dibuktikan.
