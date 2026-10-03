# Runbook mentor · Pertemuan 3

Panduan untuk Rafee saat demo terminal/editor. Materi ini melengkapi pembahasan kelas; bukan instruksi tugas atau spesifikasi Final Project. Tidak ada perubahan slide dalam paket ini.

## Mulai dari sini

Di Terminal Mac, masuk ke folder ini dan simpan path-nya:

```sh
cd "/Users/rafee/Developments/Veterantech/Backend Inter/praktikum/pertemuan-03"
PRAKTIKUM_DIR="$PWD"
pwd
```

Expected: path berakhir dengan `praktikum/pertemuan-03`. Semua command laptop memakai terminal ini kecuali disebutkan terminal kedua. Setelah keluar dari SSH, terminal kembali ke laptop.

| Kapan | Buka | Tujuan |
| --- | --- | --- |
| Sebelum kelas | [Persiapan SSH](./ssh/persiapan-mentor.md) | Akses VPS, key, dan jalur cadangan sudah siap |
| Sebelum kelas | [Dockerfile](./dockerfile/demo.md), bagian persiapan | Docker Engine siap, image/dependency siap, port kosong |
| Demo SSH · 15 menit | [Demo SSH](./ssh/demo.md) | Login, buktikan identitas server, CLI dan inspeksi port |
| Demo Dockerfile · 20 menit | [Demo Dockerfile](./dockerfile/demo.md) | Ketik Dockerfile, build image, run container, rebuild |
| Demo Compose · 35 menit | Menyusul; belum disiapkan dalam paket ini | Backend + database, networking, dan persistensi |

Slot lain dari 120 menit: recall 10 menit, konsep Compose/YAML 15 menit, cek pemahaman/troubleshooting 10 menit, briefing tugas dan voting 15 menit. Ini panduan alokasi, bukan jadwal kaku.

## Cara memakai bahan

- Copy-paste satu blok command setiap kali. Baca hasilnya sebelum lanjut.
- Editor dibuka di `dockerfile/starter/`. Dockerfile sengaja belum selesai; checkpoint berada di folder terpisah.
- Command SSH ditujukan ke akun VPS latihan yang memang boleh dipakai mentor. Mentee tidak perlu mendapat akses ke VPS mentor.
- Demo Dockerfile berjalan lokal. Jangan pindahkan aturan port lokal langsung ke VPS publik.
- Password, private key, passphrase, serta detail akses nyata tidak disimpan di repo. Blok placeholder SSH harus diisi secara lokal.
- Jangan lakukan pull/build saat kelas tanpa persiapan. Di Mac bersama ini, cek disk dan proses build; sisakan minimal 20 GiB sebelum menjalankan stack Docker demo. [Helper build](./dockerfile/build-image.sh) memeriksa headroom, proses build lain, dan lock `~/.cache/codex-heavy-build.lock` sebelum build; jangan menghapus lock aktif milik sesi lain.

## Batas materi

Tugas 1 terpisah dari aplikasi Tugas 2/FP. Pertemuan 3 memberi briefing Tugas 1 dan preview arah FP; briefing resmi Tugas 2/FP di Pertemuan 6. Arsitektur FP dan voting individu/kelompok belum diputuskan di paket ini.

Rafee memilih menyiapkan SSH dan Dockerfile dahulu. Contoh Compose serta dependency database ditunda; template tugas tidak diduplikasi dalam langkah ini.

## Verifikasi paket

Hasil pemeriksaan lokal dan batas verifikasi dicatat di [VERIFIKASI.md](./VERIFIKASI.md). Sebelum mengajar, tetap lakukan rehearsal pada laptop dan VPS yang akan dipakai.
