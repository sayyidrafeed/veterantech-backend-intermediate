# Persiapan SSH · sebelum kelas

Jalur utama: Terminal Mac → akun Linux VPS lewat SSH key. Tujuan persiapan ini adalah memastikan akses bekerja sebelum demo, bukan mengubah konfigurasi server live.

## 1. Siapkan akses yang sah

Pastikan tersedia user, host/IP, port SSH, akses console provider, dan fingerprint host dari console atau admin tepercaya. Gunakan VPS latihan bila ingin mendemokan perubahan firewall.

Di **laptop**, isi placeholder berikut secara lokal; jangan salin nilai nyata kembali ke file ini:

```sh
SSH_USER="<USER>"
SSH_HOST="<HOST>"
SSH_PORT="<PORT_SSH>"
SSH_KEY="$HOME/.ssh/veterantech-mentor"
command -v ssh
command -v ssh-keygen
```

Expected: dua executable tersedia. Kalau sebelumnya login menggunakan password, password akun VPS berbeda dengan passphrase yang melindungi private key di laptop.

## 2. Cek key yang sudah ada

Di **laptop**:

```sh
ls -l "$SSH_KEY" "$SSH_KEY.pub"
```

Jika kedua file ada, gunakan key tersebut dan lanjut langkah 3. Jika keduanya belum ada, buat pasangan baru:

```sh
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"
ssh-keygen -t ed25519 -f "$SSH_KEY" -C "mentor-vps-latihan"
```

Isi passphrase dan simpan melalui password manager. Jika muncul prompt overwrite, jawab tidak dan pilih nama key lain. Jika hanya salah satu file pasangan yang ada, periksa dulu; jangan menimpa key lama.

```sh
chmod 600 "$SSH_KEY"
chmod 644 "$SSH_KEY.pub"
ssh-keygen -lf "$SSH_KEY.pub"
```

Expected: fingerprint public key terlihat. File `.pub` boleh dipasang di server; file tanpa `.pub` adalah private key, jangan tampilkan dengan `cat`, dibagikan, atau dimasukkan ke repo.

## 3. Verifikasi identitas VPS

Melalui **console provider/admin**, ambil fingerprint host key, misalnya:

```sh
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Di **laptop**, login dengan akses lama:

```sh
ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST"
```

Pada koneksi pertama, cocokkan fingerprint dan jenis host key dengan sumber tepercaya sebelum menerima. Kalau jenis host key berbeda, ambil fingerprint untuk jenis yang ditampilkan. Jika muncul `REMOTE HOST IDENTIFICATION HAS CHANGED`, berhenti dan konfirmasi perubahan; jangan langsung menghapus `known_hosts`.

Biarkan sesi lama terbuka sampai login key di sesi kedua berhasil.

## 4. Pasang public key jika belum terpasang

Di **terminal laptop kedua**, isi ulang variabel langkah 1; variabel terminal pertama tidak otomatis terbawa.

```sh
command -v ssh-copy-id
```

Jika tersedia:

```sh
ssh-copy-id -i "$SSH_KEY.pub" -p "$SSH_PORT" "$SSH_USER@$SSH_HOST"
```

Expected: key ditambahkan atau sudah terpasang. Perintah ini memakai akses lama; password yang diminta adalah password akun VPS.

Jika `ssh-copy-id` tidak tersedia, gunakan alternatif tanpa menginstal tool baru. Jalankan **hanya sekali jika key ini belum dipasang**:

```sh
cat "$SSH_KEY.pub" | ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" \
  'umask 077; mkdir -p "$HOME/.ssh"; chmod 700 "$HOME/.ssh"; touch "$HOME/.ssh/authorized_keys"; chmod 600 "$HOME/.ssh/authorized_keys"; printf "\n" >> "$HOME/.ssh/authorized_keys"; cat >> "$HOME/.ssh/authorized_keys"'
```

Yang dikirim hanya public key; isi `authorized_keys` yang sudah ada dipertahankan. Jika akses lama gagal, pulihkan akses lewat provider/admin dahulu.

## 5. Buktikan login key

Di **terminal laptop kedua**:

```sh
ssh -o IdentitiesOnly=yes \
  -o PreferredAuthentications=publickey \
  -o PasswordAuthentication=no \
  -o KbdInteractiveAuthentication=no \
  -i "$SSH_KEY" -p "$SSH_PORT" "$SSH_USER@$SSH_HOST"
```

Expected: mungkin diminta passphrase lokal, lalu masuk ke server. Tes ini tidak fallback ke password akun VPS.

Di **VPS**:

```sh
whoami
hostname
pwd
exit
```

Setelah sesi kedua berhasil, sesi lama boleh ditutup. Tidak perlu mematikan password login atau mengubah SSH daemon untuk demo ini.

## Checklist sebelum mengajar

- Login key sudah dicoba, bukan hanya key sudah dibuat.
- Tahu cara membuka console provider jika akses terputus.
- Tidak ada rahasia yang ditampilkan di editor atau terminal saat screen share.
- UFW cukup diinspeksi pada VPS yang sudah digunakan; perubahan firewall hanya pada server latihan terpisah dan direncanakan.
