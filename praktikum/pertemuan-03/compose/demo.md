# Demo Docker Compose · sekitar 35 menit

Semua command berjalan di **laptop mentor**. Contoh selesai ini melanjutkan konsep Dockerfile, bukan mengubah starter live coding sebelumnya. Gunakan Node 24 dan Docker Compose 2.24.4+ (`!override` membutuhkan versi ini). Di PowerShell, gunakan `curl.exe` dan sesuaikan sintaks variabel; blok utama di bawah memakai shell Mac/Linux.

## 0. Persiapan sebelum kelas

```sh
cd "/Users/rafee/Developments/Veterantech/Backend Inter/praktikum/pertemuan-03/compose"
node --version
docker version
docker compose version
df -h .
docker ps --format 'table {{.Names}}\t{{.Ports}}'
```

Expected: Node 24+, Docker server tersedia, dan port 8085 kosong. Sisakan minimal 20 GiB di Mac ini sebelum pull/build/stack; bila kurang, tunda rehearsal Docker tanpa menghapus data otomatis. Bila port dipakai, ubah `API_HOST_PORT` di `.env` dan sesuaikan URL curl, jangan hentikan proyek lain.

```sh
node setup-env.mjs
docker compose config --quiet
```

Expected: `.env` dibuat sekali tanpa menampilkan password; config valid tidak menghasilkan output. `.env.example` hanya panduan, jangan dipakai langsung karena password kosong. Jangan menampilkan `docker compose config` tanpa `--quiet` saat screen share karena environment ter-resolve berisi password.

File `.env` di-ignore. Jangan mengubah password pada `.env` setelah volume sudah berisi database: environment init tidak mengganti password database lama. Pulihkan nilai lokal sebelumnya; jangan menghapus volume hanya untuk memperbaiki credential.

Periksa image sebelum pull:

```sh
docker image inspect node:24-alpine >/dev/null 2>&1
docker image inspect postgres:17-alpine >/dev/null 2>&1
```

Jika salah satu belum ada, pull **hanya yang belum ada**, saat headroom sudah cukup:

```sh
docker pull node:24-alpine
docker pull postgres:17-alpine
```

Build API satu kali memakai helper existing:

```sh
bash ../dockerfile/build-image.sh veterantech-api-compose-p03:1 ./api
```

Expected: image terbangun. Helper mengambil lock build dan memeriksa disk/build lain. Jika gagal, berhenti; jangan menganggap image lama sebagai hasil build baru. Dockerfile memakai `npm ci --omit=dev` dengan lockfile. API tetap Node, walaupun tooling OpenSlide memakai Bun.

## 1. Baca konfigurasi · 5 menit

Buka `compose.yaml`: `api` dibuild dari folder source; `db` memakai image PostgreSQL. Environment `PGHOST=db` dibaca driver `pg`. Network menentukan jalur komunikasi, volume menentukan lokasi data.

```sh
docker compose config --services
docker compose config --volumes
```

Expected: service `api`, `db`, dan volume `db-data`. Nama project tetap `veterantech-p03-compose` agar lifecycle dan volume konsisten. Jangan tambahkan `-p` berbeda di tengah demo.

## 2. Jalankan aplikasi · 5 menit

```sh
docker compose up -d --no-build --pull never --wait --wait-timeout 60
docker compose ps
curl -fsS http://localhost:8085/health
```

Expected: service healthy; JSON `{"status":"ok","database":"connected"}`. DB healthcheck memakai TCP localhost DB; `service_healthy` menunda API sampai DB siap. Health API menjalankan `SELECT 1`, belum membuktikan tabel/bisnis aplikasi.

SQL `db/init.sql` dijalankan oleh image PostgreSQL **hanya ketika data directory kosong**. Mengedit SQL ini tidak memigrasikan database pada volume existing.

## 3. Write/read lewat API · 5 menit

```sh
curl -i http://localhost:8085/notes \
  -H 'Content-Type: application/json' \
  --data '{"text":"Catatan pertama dari API"}'
curl -fsS http://localhost:8085/notes
```

Expected: POST 201 dengan `id`, `text`, `created_at`; GET berisi catatan yang sama. ID/timestamp dihasilkan database, tidak perlu persis sama setiap run. Catat ID hasil POST untuk pengecekan persistensi nanti.

```sh
curl -i http://localhost:8085/notes \
  -H 'Content-Type: application/json' \
  --data '{"text":"   "}'
```

Expected: 400. Jelaskan bahwa data input tetap divalidasi oleh API; Compose tidak menggantikan kode aplikasi atau query database.

## 4. Network, hostname, dan port · 5 menit

```sh
docker compose exec api node -e "require('node:dns').lookup('db',(e,a)=>{if(e){process.exitCode=1;console.error(e.code)}else console.log(a)})"
docker compose port api 3000
docker network inspect veterantech-p03-compose_app-net --format '{{range .Containers}}{{println .Name}}{{end}}'
docker compose logs --tail 20 api
```

Expected: `db` di-resolve ke IP container, host mapping API `127.0.0.1:8085`, dan kedua container berada di network yang sama. IP bisa berubah; jangan disalin ke konfigurasi.

Database tidak memiliki host port mapping. API tetap dapat mengakses `db:5432` melalui shared network. Ini berbeda dari memisahkan network: ketiadaan publish port bukan jaminan keamanan menyeluruh dan bukan sama dengan `internal: true`.

## 5. Failure hostname · 3 menit

Override mengganti hostname API menjadi `localhost`:

```sh
docker compose -f compose.yaml -f hostname-salah.yaml config --quiet
docker compose -f compose.yaml -f hostname-salah.yaml up -d --no-build --pull never api
curl -i http://localhost:8085/health
docker compose logs --tail 10 api
```

Expected: HTTP 503, log tanpa password. `localhost` di API menunjuk container API, bukan DB. Tidak memakai `--wait` ketika sengaja membuat failure.

Pulihkan memakai file utama saja:

```sh
docker compose up -d --no-build --pull never --wait --wait-timeout 60
curl -fsS http://localhost:8085/health
```

Expected: 200. Compose recreate API karena konfigurasi berubah; database/volume tetap digunakan.

## 6. Failure network · opsional 2 menit

Jika waktu cukup, pisahkan API dari network DB. Tag `!override` mengganti list network, bukan menambah network lama:

```sh
docker compose -f compose.yaml -f network-terpisah.yaml config --quiet
docker compose -f compose.yaml -f network-terpisah.yaml up -d --no-build --pull never api
curl -i http://localhost:8085/health
```

Expected: HTTP 503 karena API tidak lagi memiliki jalur shared network ke DB. Pulihkan:

```sh
docker compose up -d --no-build --pull never --wait --wait-timeout 60
curl -fsS http://localhost:8085/health
```

Override network bisa meninggalkan network demo tambahan `veterantech-p03-compose_isolated-net` setelah pemulihan. Itu masih milik project ini; cleanup pada langkah 9 mencakup kedua deklarasi network.

## 7. Database mati dan pulih · 3 menit

```sh
docker compose stop db
curl -i http://localhost:8085/health
curl -i http://localhost:8085/notes
docker compose logs --tail 10 api
```

Expected: API tetap hidup, kedua endpoint mengembalikan 503. Database readiness saat startup tidak menjamin database selalu tersedia setelahnya.

```sh
docker compose up -d --no-build --pull never --wait --wait-timeout 60
curl -fsS http://localhost:8085/health
curl -fsS http://localhost:8085/notes
```

Expected: 200 dan catatan lama masih ada.

## 8. Bukti persistensi · 4 menit

```sh
docker compose down
docker compose up -d --no-build --pull never --wait --wait-timeout 60
curl -fsS http://localhost:8085/notes
```

Expected: record dengan ID dan teks yang dicatat pada langkah 3 masih ada setelah container diganti. Restart saja tidak cukup kuat membuktikan perbedaan writable layer dan named volume. `down` default tidak menghapus named volume.

## 9. Cleanup khusus demo

```sh
docker compose -f compose.yaml -f network-terpisah.yaml down
```

Expected: container dan network project demo dihapus, volume tetap disimpan. Bila Compose lama tidak mengenali tag override, gunakan `docker compose down` untuk jalur utama dan periksa network tambahan secara manual; jangan jalankan override dengan Compose di bawah 2.24.4.

Jangan gunakan `down --volumes` sebagai cleanup default; itu menghapus data catatan. Tidak ada prune image/volume/global pada runbook ini.

## Smoke check terisolasi

Setelah image API dan PostgreSQL siap serta disk cukup:

```sh
node smoke.mjs
```

Script memakai project acak `veterantech-p03-smoke-*`, port sementara, dan volume terpisah. Ia tidak build atau pull image. Test memeriksa health, input, write/read, recreate/persistensi, dan outage/recovery DB. Cleanup menghapus volume **project test saja**, karena datanya khusus pengujian; volume demo mentor tidak disentuh. Failure menyimpan logs/state pada `artifacts/`, yang di-ignore.

## Troubleshooting

| Gejala | Langkah berikutnya |
| --- | --- |
| Password belum diisi | Jalankan `node setup-env.mjs`; validasi config dengan `--quiet` |
| Port 8085 terpakai | Ubah host port `.env`, sesuaikan curl |
| Image tidak ditemukan | Selesaikan pull/build sebelum kelas; `--pull never` sengaja mencegah download saat demo |
| Health 503 | Periksa hostname, shared network, DB state, dan log API |
| Tabel tidak ada | Cek SQL init dan riwayat volume; SQL init tidak dijalankan ulang pada volume existing |
| Password DB berubah | Kembalikan credential lokal yang sesuai volume, jangan menghapus data |
| `up --wait` timeout | `docker compose ps --all` dan logs service terkait; jangan build ulang sebelum diagnosis |

Referensi: [Compose networking](https://docs.docker.com/compose/how-tos/networking/), [startup/readiness](https://docs.docker.com/compose/how-tos/startup-order/), [PostgreSQL image](https://hub.docker.com/_/postgres), [query parameter](https://node-postgres.com/features/queries).
