# Demo Next.js + multi-stage build · tambahan sekitar 15 menit

Jalankan sesudah [demo Compose API + database](./demo.md). Next.js menambahkan tampilan untuk catatan yang sama. Ini ekstensi demo; masukkan ke slot Compose dengan mempersingkat curl write/read bila waktu kelas terbatas. Semua command di laptop mentor, shell Mac/Linux, dari folder `praktikum/pertemuan-03/compose/`.

## 1. Persiapan sebelum kelas

```sh
node setup-env.mjs
df -h .
docker version
docker ps --format 'table {{.Names}}\t{{.Ports}}'
docker compose -f compose.yaml -f compose.web.yaml config --quiet
```

Port 8086 harus kosong; ubah `WEB_HOST_PORT` di `.env` bila diperlukan. Generator `.env` mempertahankan file existing. Default web 8086 bekerja walaupun `.env` lama tidak memiliki `WEB_HOST_PORT`. Jangan tampilkan config penuh karena berisi password database.

Sebelum install/pull/build/stack, periksa disk dan proses build aktif. Mac bersama ini perlu 20 GiB kosong untuk Docker. Jika kurang, tunda rehearsal; jangan hapus file atau hentikan proses proyek lain. Persiapkan image sebelum kelas, bukan ketika mengajar. Jalankan persiapan API/database dari runbook utama, lalu build web satu kali lewat helper yang sama:

```sh
bash ../dockerfile/build-image.sh veterantech-web-compose-p03:1 ./web
```

Helper memeriksa disk, build aktif, dan lock. Reuse image dan cache; rebuild hanya setelah input berubah. Jika build gagal, berhenti dan periksa error, jangan memakai image lama sebagai bukti build baru.

## 2. Jelaskan tiga stage

Buka `web/Dockerfile` dan `web/next.config.mjs`:

| Stage | Pekerjaan | Yang diteruskan |
| --- | --- | --- |
| `deps` | `npm ci` dari manifest + lockfile | Dependency untuk build |
| `builder` | Compile Next.js dengan `npm run build` | Output standalone dan asset |
| `runner` | Menjalankan `node server.js` sebagai user `node` | Image akhir yang dijalankan Compose |

`COPY package.json package-lock.json` sebelum source memungkinkan layer dependency digunakan ulang saat hanya kode halaman berubah. Setiap `FROM` memulai stage; `COPY --from` mengambil hasil stage sebelumnya. Runner tidak menyalin seluruh source atau seluruh `node_modules` milik deps. Output standalone tetap memiliki sebagian dependency yang diperlukan runtime; bukan berarti tanpa dependency.

`public` dan `.next/static` disalin terpisah karena tidak otomatis masuk standalone. `public/.gitkeep` menjaga folder tetap ada meskipun belum memakai gambar. `CMD` menjalankan server yang dihasilkan Next.js, bukan dev server. `EXPOSE` mendokumentasikan port; mapping host dilakukan oleh Compose.

**Tiga stage build bukan tiga container aplikasi.** Stage menyiapkan satu image Next.js. Compose menjalankan tiga service: `web`, `api`, dan `db`.

Referensi: [Next.js standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) dan [Docker multi-stage builds](https://docs.docker.com/build/building/multi-stage/).

## 3. Jalankan tiga service

```sh
docker compose -f compose.yaml -f compose.web.yaml config --services
docker compose -f compose.yaml -f compose.web.yaml up -d --no-build --pull never --wait --wait-timeout 60
docker compose -f compose.yaml -f compose.web.yaml ps
curl -fsS http://localhost:8086/health
curl -fsS http://localhost:8086/api/notes
```

Expected: `api`, `db`, `web`; semuanya healthy. Health web hanya membuktikan server Next.js berjalan. GET notes membuktikan integrasi. DB siap sebelum API, API healthy sebelum web dimulai; `depends_on` tidak menjamin layanan akan selalu sehat setelah startup.

Buka `http://localhost:8086`. Tambahkan satu catatan dan cocokkan ID di halaman dengan hasil GET. Coba isi hanya spasi: pesan validasi tampil. Muat ulang halaman: catatan berasal dari database, bukan state sementara browser.

Alur request:

```text
Browser localhost:8086
  -> Next.js /api/notes
  -> Express http://api:3000/notes
  -> PostgreSQL db:5432
```

Browser memakai URL satu origin. Nama `api` dikenali DNS network Compose oleh server Next.js, bukan browser laptop. `API_URL` merupakan environment runtime web, tidak memakai `NEXT_PUBLIC_`. API tetap bisa diakses lokal di 8085 untuk demo curl; database tidak mempublish port. Semua service berada di network demo `app-net`; contoh pemisahan network tetap di runbook utama.

## 4. Buktikan persistensi dan recovery

Catat ID/text yang dibuat. Selalu gunakan kedua `-f` pada operasi demo ini, dengan project existing yang sama.

```sh
docker compose -f compose.yaml -f compose.web.yaml down
docker compose -f compose.yaml -f compose.web.yaml up -d --no-build --pull never --wait --wait-timeout 60
curl -fsS http://localhost:8086/api/notes
```

Expected: catatan dengan ID yang sama masih ada; `down` tidak menghapus named volume. Jangan memakai `down --volumes` pada data demo.

```sh
docker compose -f compose.yaml -f compose.web.yaml stop api
curl -i http://localhost:8086/api/notes
docker compose -f compose.yaml -f compose.web.yaml up -d --no-build --pull never --wait --wait-timeout 60
docker compose -f compose.yaml -f compose.web.yaml stop db
curl -i http://localhost:8086/api/notes
docker compose -f compose.yaml -f compose.web.yaml up -d --no-build --pull never --wait --wait-timeout 60
```

Saat API/DB berhenti, expected notes 503. Tekan Muat ulang atau coba simpan dari halaman: pesan gagal tampil dan input tidak hilang. Sesudah recovery, Muat ulang menampilkan catatan lagi. Saat DB berhenti, health web dapat tetap 200: proses web hidup tidak berarti seluruh alur sehat. Setelah POST berhasil tetapi refresh daftar gagal, UI menyatakan catatan tersimpan dan kegagalan pemuatan secara terpisah; tekan Muat ulang, jangan langsung submit ulang.

## 5. Inspeksi image akhir

```sh
docker compose -f compose.yaml -f compose.web.yaml exec web id
docker compose -f compose.yaml -f compose.web.yaml exec web sh -c 'test -f server.js && test -d .next/static && test -d node_modules && test ! -d app && test ! -f Dockerfile && echo "Standalone runtime tersedia; source app tidak disalin"'
docker image inspect veterantech-web-compose-p03:1 --format '{{.Config.User}}'
docker image ls veterantech-web-compose-p03
```

Expected: user `node` (non-root), server/asset/dependency runtime ada, source `app/` dan Dockerfile tidak ada. Ukuran image yang ditampilkan adalah hasil aktual mesin; jangan mengklaim persentase penghematan tanpa membandingkan image dengan kondisi build yang sama. Cache/layer stage build mungkin masih disimpan Docker meskipun tidak termasuk filesystem image runner.

## 6. Rehearsal dan akhir demo

```sh
node smoke-web.mjs
```

Smoke membutuhkan ketiga image yang sudah dibangun/pulled, memakai project/port/volume terpisah, tidak melakukan build/pull, dan menghapus hanya volume pengujiannya. Ia memeriksa halaman/asset, API melalui web, persistensi, outage/recovery, dan isi runner. Artifacts disimpan saat gagal. Smoke HTTP bukan penerimaan UI; Rafee memeriksa form, state, keyboard, serta tampilan desktop/mobile secara manual.

Untuk mengakhiri stack demo dengan data tetap disimpan:

```sh
docker compose -f compose.yaml -f compose.web.yaml down
```

Demo dua service tetap memakai `docker compose` biasa seperti runbook utama. Jika beralih setelah memakai web, tutup stack tiga service dengan kedua `-f` terlebih dahulu agar tidak meninggalkan web sebagai orphan. Tidak ada perubahan slide atau deploy VPS dalam paket ini.
