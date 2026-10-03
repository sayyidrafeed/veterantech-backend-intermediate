# Demo menulis Dockerfile · 20 menit

Semua langkah utama di **laptop mentor**, bukan VPS. Jalankan dari terminal yang sudah menyimpan `PRAKTIKUM_DIR` sesuai [README](../README.md). API memakai ulang Express 5.2.1 dari praktikum Pertemuan 2; tidak ada dependency baru untuk bagian ini.

## Persiapan sebelum kelas

```sh
cd "$PRAKTIKUM_DIR/dockerfile/starter"
node --version
docker version
docker compose version
docker ps --format 'table {{.Names}}\t{{.Ports}}'
```

Expected: client dan server Docker dapat diakses. Port `8083` dan `8084` belum dipakai. Jika daemon belum hidup, buka runtime Docker yang biasa dipakai. Jangan menghentikan container milik proyek lain.

Setelah memastikan headroom disk dan tidak ada build berat lain, siapkan base image dan dependency sebelum kelas:

```sh
docker image inspect node:24-alpine
```

Jika image belum ada, pull sekali saat persiapan:

```sh
docker pull node:24-alpine
```

```sh
npm ci
```

Dependency sudah didefinisikan oleh starter lama; `npm ci` mengikuti lockfile. Tag major menghindari perpindahan major lewat `lts`, tetapi bukan pin digest immutable.

Untuk rehearsal, buat folder scratch agar Dockerfile starter tetap kosong:

```sh
REHEARSAL_DIR="$(mktemp -d "${TMPDIR:-/tmp}/veterantech-dockerfile.XXXXXX")"
cp server.js package.json package-lock.json .dockerignore "$REHEARSAL_DIR/"
cp ../checkpoint/03-lengkap.Dockerfile "$REHEARSAL_DIR/Dockerfile"
```

Build rehearsal lewat helper yang memeriksa disk, proses build lain, dan lock:

```sh
bash ../build-image.sh veterantech-api-p03:1 "$REHEARSAL_DIR"
```

Expected: image berhasil dibangun. Jalankan langkah 5 dengan melewati build dan memakai image ini, cek health, lalu cleanup langkah 7 untuk container utama saja. Rehearsal memakai file API yang sama dengan demo; jika input Dockerfile/source nanti identik, cache build dapat dipakai ulang. Tidak perlu clean build atau `--no-cache`. Folder scratch boleh disimpan sampai selesai kelas; jangan memakai cleanup luas.

## 1. Buktikan API berjalan tanpa Docker

Terminal A, dari `dockerfile/starter`:

```sh
npm start
```

Terminal B:

```sh
curl -fsS http://localhost:3000/health
```

Expected: `{"status":"ok","service":"api-kelas"}`. Jika port 3000 sudah dipakai, jalankan `PORT=3003 npm start` dan ubah URL pengecekan ke 3003. Kembali ke Terminal A, tekan Ctrl+C sebelum lanjut.

## 2. Ketik fondasi Dockerfile

Buka `starter/Dockerfile`. Ganti komentar awal dengan:

```dockerfile
FROM node:24-alpine
WORKDIR /app
```

Jelaskan: `FROM` adalah lingkungan awal berisi Node; `WORKDIR` mengatur direktori kerja instruksi berikutnya. Container berbagi kernel host melalui runtime, bukan menghidupkan VM sendiri.

## 3. Tambahkan dependency

Tambahkan di bawahnya:

```dockerfile
COPY package*.json ./
RUN npm ci --omit=dev
```

Jelaskan: manifest dan lockfile disalin lebih dulu; `RUN` berjalan saat **build**. Memisahkan dependency dari source membantu reuse cache ketika source berubah tetapi dependency tetap.

Checkpoint kalau tertinggal, jalankan dari `starter/`:

```sh
cp ../checkpoint/02-dependency.Dockerfile Dockerfile
```

Checkpoint ini belum menjalankan aplikasi; lanjut langkah 4.

## 4. Tambahkan aplikasi dan command runtime

```dockerfile
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
```

Jelaskan: `COPY` memasukkan source, `.dockerignore` mengecualikan `node_modules` dan `.env`, `ENV` menetapkan default, `CMD` dijalankan saat container start. `EXPOSE` mendokumentasikan port; publish ke host dilakukan lewat `-p`.

Kalau perlu checkpoint selesai:

```sh
cp ../checkpoint/03-lengkap.Dockerfile Dockerfile
```

## 5. Build dan run

Setelah persiapan disk/lock selesai, dari `starter/`:

```sh
bash ../build-image.sh veterantech-api-p03:1 .
docker run -d --name veterantech-p03-dockerfile \
  -p 127.0.0.1:8083:3000 -e PORT=3000 veterantech-api-p03:1
curl -fsS http://localhost:8083/health
docker logs --tail 20 veterantech-p03-dockerfile
```

Expected: health JSON dan log `API listening on 3000`. Titik `.` adalah build context; tag menunjuk image; container adalah instance yang berjalan. `8083` port laptop, `3000` port container. Binding `127.0.0.1` membuat demo hanya dipublish ke laptop ini.

Helper menjalankan `docker build -t TAG CONTEXT` setelah preflight dan melepas hanya lock miliknya sendiri. Kalau helper gagal, berhenti sebelum `docker run`; jangan menjalankan container dari image lama seolah build baru berhasil. Kalau headroom/proses/lock memblokir, bereskan persiapan sebelum kelas atau gunakan materi tanpa demo runtime.

Jika nama container sudah dipakai, inspect dahulu. Hapus hanya container run demo sebelumnya setelah memastikan identitasnya; jangan force-remove container yang belum dikenal.

## 6. Buktikan environment dan image snapshot

Container kedua dengan port aplikasi berbeda:

```sh
docker run -d --name veterantech-p03-env \
  -p 127.0.0.1:8084:4000 -e PORT=4000 veterantech-api-p03:1
curl -fsS http://localhost:8084/health
docker logs --tail 10 veterantech-p03-env
```

Expected: API tetap berjalan, log menunjukkan port 4000. `-e` mengubah runtime default; port mapping juga harus mengikuti port tempat aplikasi listen.

Di editor, ubah teks respons `/` menjadi `API kelas versi 2`. Sebelum rebuild:

```sh
curl -fsS http://localhost:8083/
```

Expected: container lama masih merespons teks lama. Source laptop tidak otomatis mengubah image.

```sh
bash ../build-image.sh veterantech-api-p03:2 .
docker stop veterantech-p03-dockerfile
docker rm veterantech-p03-dockerfile
docker run -d --name veterantech-p03-dockerfile \
  -p 127.0.0.1:8083:3000 veterantech-api-p03:2
curl -fsS http://localhost:8083/
```

Expected: teks versi 2; dependency layer bisa memakai cache. Mengganti image memerlukan container baru. Demo perubahan source ini opsional bila waktu sempit.

## 7. Cleanup khusus demo

```sh
docker stop veterantech-p03-dockerfile veterantech-p03-env
docker rm veterantech-p03-dockerfile veterantech-p03-env
```

Jika container kedua tidak dibuat, hilangkan namanya dari kedua command. Image tetap disimpan untuk reuse; tidak ada prune.

## Kalau gagal

| Gejala | Cek berikutnya |
| --- | --- |
| Daemon tidak terhubung | Runtime Docker, hasil bagian Server pada `docker version` |
| `npm ci` gagal | Lockfile disalin, akses registry, versi Node, dan error aslinya |
| Port sudah dipakai | Pilih host port lain dan ubah URL curl; jangan stop proses proyek lain |
| Container exit | `docker logs --tail 50 veterantech-p03-dockerfile` |
| API tidak bisa diakses | Port host/container, nilai `PORT`, dan aplikasi listen pada `0.0.0.0` |

Referensi: [Node official image](https://hub.docker.com/_/node), [Dockerfile](https://docs.docker.com/reference/dockerfile/).
