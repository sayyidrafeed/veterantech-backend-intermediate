# Demo SSH · 15 menit

Prasyarat: selesaikan [persiapan mentor](./persiapan-mentor.md). Mulai di **Terminal Mac** dengan variabel `SSH_USER`, `SSH_HOST`, `SSH_PORT`, dan `SSH_KEY` yang sudah diisi. Jangan menampilkan password/private key.

## 1. Laptop sebelum login

```sh
hostname
pwd
```

Tanya: “Sekarang perintah ini dijalankan di mesin mana?” Expected: nama dan direktori laptop. Catat perbedaannya dengan hasil setelah login.

## 2. Hubungkan laptop ke VPS

```sh
ssh -o IdentitiesOnly=yes \
  -o PreferredAuthentications=publickey \
  -o PasswordAuthentication=no \
  -o KbdInteractiveAuthentication=no \
  -i "$SSH_KEY" -p "$SSH_PORT" "$SSH_USER@$SSH_HOST"
```

Jelaskan user tujuan, alamat server, port layanan SSH, dan key lokal. Passphrase membuka key di laptop; private key tidak disalin ke VPS.

## 3. Buktikan berada di VPS

Semua command berikut sampai `exit` berjalan di **VPS**:

```sh
whoami
hostname
pwd
uname -s
```

Expected: user tujuan, nama server, home directory akun, dan `Linux`. Jika hostname membingungkan, gunakan user/direktori dan console provider sebagai pembanding; jangan menganggap tampilan prompt saja membuktikan target.

## 4. Navigasi dan file latihan

```sh
cd /etc
pwd
ls -ld ssh
cd "$HOME"
demo_dir="$(mktemp -d "$HOME/veterantech-ssh-demo.XXXXXX")"
printf 'Halo dari VPS\n' > "$demo_dir/catatan.txt"
ls -l "$demo_dir"
cat "$demo_dir/catatan.txt"
```

Expected: `/etc`, direktori konfigurasi `ssh`, lalu file baru berisi `Halo dari VPS`. `mktemp` membuat folder khusus run ini agar tidak menimpa file lama. Menjelaskan `cd`, `pwd`, `ls`, `>` dan `cat` sudah cukup; tidak perlu mengedit konfigurasi SSH.

## 5. Inspeksi layanan dan firewall

```sh
ss -lnt
```

Expected: daftar port TCP yang listen. Cari port SSH aktual. Jelaskan bahwa layanan listen dan port dapat diakses dari luar adalah dua hal berbeda.

```sh
command -v ufw
```

Jika UFW tersedia dan akun mentor punya akses sudo:

```sh
sudo ufw status verbose
```

Expected: status dan aturan, atau `inactive`. Jika tool/izin tidak tersedia, jelaskan hasilnya lalu lanjut; jangan instal atau ubah firewall di tengah demo. Aturan firewall provider juga dapat memengaruhi akses.

Untuk demo ini tidak ada `ufw enable`, `allow`, `reset`, atau perubahan SSH daemon. Penjelasan konfigurasi UFW boleh dirujuk dari materi Pertemuan 1; perubahan nyata perlu server latihan dan sesi cadangan.

## 6. Bersihkan hanya file run ini, lalu kembali ke laptop

Jalankan di terminal VPS yang sama setelah langkah 4:

```sh
rm -- "$demo_dir/catatan.txt"
rmdir -- "$demo_dir"
exit
```

Di **laptop**:

```sh
hostname
pwd
```

Expected: kembali ke laptop. Tidak ada penghapusan folder server lain atau perubahan konfigurasi.

## Kalau gagal

| Gejala | Cek berikutnya |
| --- | --- |
| `Connection timed out` | Host/IP, akses internet, firewall provider, dan port SSH |
| `Connection refused` | Port target dan apakah SSH daemon listen; lihat console provider |
| `Permission denied (publickey)` | User, key yang dipilih, public key/izin di server lewat akses cadangan |
| Host key berubah | Konfirmasi ke provider/admin; jangan melewati pemeriksaan identitas |
| `ss` atau UFW tidak tersedia | Lanjutkan demo login/CLI; jelaskan batas inspeksi pada OS tersebut |

Penutup lisan: “SSH memberi terminal jarak jauh. Setelah login, command berjalan di server; setelah `exit`, command kembali berjalan di laptop.”
