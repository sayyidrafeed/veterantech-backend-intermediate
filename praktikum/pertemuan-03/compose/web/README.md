# Catatan Kelas

Next.js App Router + JavaScript untuk demo Docker Compose Pertemuan 3. Hanya tambah dan lihat catatan. API Express dan PostgreSQL tetap menjadi pemilik validasi bisnis dan penyimpanan.

## Development lokal

Gunakan Node 24+. Dari folder ini:

```sh
npm ci
API_URL=http://127.0.0.1:8085 npm run dev
```

Buka `http://localhost:3000`. API harus berjalan pada port 8085; di PowerShell, set `$env:API_URL = 'http://127.0.0.1:8085'` sebelum `npm run dev`. URL dibaca oleh route handler saat request, bukan ditanam di bundle browser atau saat build. Build tidak memerlukan API/database hidup.

```sh
npm test
```

Test memakai HTTP upstream sementara untuk memeriksa forwarding, response terbaru, input JSON, dan outage. Ini bukan bukti integrasi PostgreSQL atau Docker.

Sesudah `npm run build`, jalankan `npm run test:standalone` untuk memeriksa server hasil build, HTML, JS/CSS, environment runtime, serta upstream offline. Pemeriksaan ini menyalin output ke folder temporer, memakai API HTTP mock, lalu menutup proses dan menghapus hanya folder pengujiannya. Build lokal di Mac membutuhkan 10 GiB kosong dan lock heavy-build sesuai aturan workspace; integrasi Docker tetap membutuhkan 20 GiB.

## Docker

Ikuti [runbook Next.js + multi-stage](../demo-web.md). Docker memakai output `standalone` dan `node server.js`; script `npm start` hanya untuk build lokal biasa. Endpoint `/health` memeriksa proses web, bukan kesehatan API/database. Endpoint `/api/notes` membuktikan jalur ke API.

## Arah UI

Halaman catatan untuk mentee saat kelas online; ENERGY 1 / RHYTHM 1 / MOTION 1. Form di atas memberi satu tindakan utama; daftar bernomor memudahkan mencocokkan ID catatan saat demo persistensi. Warna kertas terang dipilih untuk screen share, hijau gelap menandai tombol simpan, font sistem tidak membutuhkan unduhan font saat build. Jarak antarbagian memisahkan input dari hasil; tanpa kartu statistik, ilustrasi, atau animasi yang tidak membantu praktikum. Tema terang tetap agar mentor dan mentee melihat tampilan yang konsisten.
