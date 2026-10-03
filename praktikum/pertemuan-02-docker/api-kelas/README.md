# API kelas — praktikum Pertemuan 2

Starter Express untuk demo satu aplikasi dan satu container. Gunakan dari folder ini; `package-lock.json` disimpan agar `npm ci` di Dockerfile memakai versi dependency yang sama.

## Jalankan tanpa Docker

```sh
npm ci
npm start
```

Di terminal lain:

```sh
curl http://localhost:3000/health
```

Hasil yang diharapkan: `{"status":"ok","service":"api-kelas"}`. Tekan Ctrl+C untuk menghentikan server.

## Jalankan dengan Docker

```sh
docker build -t api-kelas:1.0 .
docker run -d --name api-kelas -p 8080:3000 -e PORT=3000 api-kelas:1.0
curl http://localhost:8080/health
```

Di PowerShell, gunakan `curl.exe` untuk permintaan HTTP. Hentikan dan hapus hanya container demo:

```sh
docker stop api-kelas
docker rm api-kelas
```

Port host alternatif sesuai slide: `-p 8081:3000`, lalu buka `http://localhost:8081/health`. Image `api-kelas:1.0` boleh disimpan untuk demo berikutnya.
