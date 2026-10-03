# Verifikasi paket mentor

Pemeriksaan pada 3 Oktober 2026 di macOS, memakai Node lokal dan instalasi Express yang sudah tersedia dari praktikum Pertemuan 2. Tidak menginstal dependency baru atau menjalankan `npm ci` saat penyiapan paket.

## Sudah diperiksa

- `node --check praktikum/pertemuan-03/dockerfile/starter/server.js`: lolos.
- `bash -n praktikum/pertemuan-03/dockerfile/build-image.sh`: lolos.
- Semua 36 blok shell pada README dan tiga runbook: lolos parsing `bash -n`; parsing tidak menjalankan command.
- `server.js`, manifest, lockfile, dan `.dockerignore` starter sama dengan starter Pertemuan 2. Manifest dan lockfile sepakat pada Express 5.2.1.
- Smoke check API: proses Node pada port lokal sementara dengan `NODE_PATH` menunjuk dependency lama. `GET /health` menghasilkan status 200 dan JSON yang diharapkan, `GET /` menghasilkan teks yang diharapkan, serta override `PORT` bekerja. Proses ditutup setelah pemeriksaan.
- Helper build menolak run ketika disk kosong kurang dari 20 GiB. Penolakan terjadi sebelum image dibangun atau lock build diambil.
- Tautan lokal dan whitespace paket diperiksa saat penyiapan.

## Belum diverifikasi runtime

- SSH login, pemasangan public key, dan command VPS: tidak dijalankan; perlu rehearsal dengan akun VPS mentor yang sah.
- Image Docker, container, port mapping, dan rebuild: belum dijalankan. Disk host sekitar 14 GiB kosong, di bawah headroom 20 GiB untuk demo Docker. Tidak ada image pull/build yang dilakukan.
- Jalur sukses helper build dan lifecycle lock saat build nyata belum diuji.
- Compose belum disiapkan, sesuai pilihan Rafee untuk mendahulukan SSH dan Dockerfile.

## Rehearsal sebelum kelas

1. Ikuti `ssh/persiapan-mentor.md`, lalu `ssh/demo.md` pada VPS yang akan dipakai.
2. Setelah tersedia headroom disk dan tidak ada build lain, ikuti bagian rehearsal di `dockerfile/demo.md`.
3. Buktikan health, port mapping, environment override, dan perubahan respons setelah rebuild sesuai runbook; simpan error spesifik jika ada.
4. Bersihkan hanya container/file demo yang dibuat. Pertahankan cache/image yang masih berguna, lalu pastikan Dockerfile starter masih kosong untuk live coding.

Dokumen ini mencatat batas pemeriksaan; bukan bukti demo kelas atau penerimaan mentee.
