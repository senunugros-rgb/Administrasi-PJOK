# 🏃‍♂️ GerakPintar - Platform Administrasi PJOK SD

Platform digital terpusat untuk administrasi pembelajaran Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK) di Sekolah Dasar, berbasis **Kurikulum Merdeka**. Dibangun dengan teknologi serverless Google Apps Script, dilengkapi integrasi AI untuk otomatisasi pembuatan modul ajar, analitik data siswa, dan dashboard profesional.

## ✨ Fitur Utama

### 1. Dashboard Eksekutif
- Statistik real-time: Jumlah siswa, modul ajar, dan kelas aktif.
- Visualisasi data perkembangan motorik siswa menggunakan Chart.js.
- Log aktivitas terbaru guru dan siswa.

### 2. Generator Modul Ajar Berbasis AI (Gemini)
- Membuat draf Modul Ajar Kurikulum Merdeka secara otomatis hanya dalam hitungan detik.
- Input: Topik, Kelas, Alokasi Waktu.
- Output: Tujuan pembelajaran, langkah kegiatan (pendahuluan, inti, penutup), asesmen formatif, dan sarana prasarana.
- Format output terstruktur dan siap simpan ke database.

### 3. Manajemen Database Terintegrasi (Google Sheets)
- Sheet otomatis: `Siswa`, `Kelas`, `ModulAjar`, `Asesmen`.
- Fungsi inisialisasi database satu kali (`setupDatabase`).
- Penyimpanan data modul ajar hasil generate AI langsung ke spreadsheet.

### 4. UI/UX Modern & Responsif
- Desain bersih menggunakan **Tailwind CSS**.
- Navigasi sidebar yang intuitif.
- Tampilan optimal untuk Desktop dan Mobile.
- Indikator loading dan feedback interaksi pengguna.

## 🛠️ Arsitektur Teknologi

- **Backend**: Google Apps Script (GAS)
- **Database**: Google Sheets
- **Frontend**: HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **AI Engine**: Google Gemini API (via UrlFetchApp)
- **Visualisasi**: Chart.js
- **Deployment**: Google Apps Script Web App

## 🚀 Cara Instalasi & Penggunaan

Ikuti langkah-langkah berikut untuk menerapkan platform ini di lingkungan sekolah Anda:

### Langkah 1: Persiapan Google Sheet
1. Buka [Google Sheets](https://sheets.google.com) dan buat Spreadsheet baru.
2. Beri nama spreadsheet tersebut (misal: "Database GerakPintar").
3. Salin **ID Spreadsheet** dari URL browser (bagian antara `/d/` dan `/edit`).

### Langkah 2: Setup Google Apps Script
1. Di Google Sheet tersebut, klik menu **Ekstensi** > **Apps Script**.
2. Hapus kode default di `Code.gs`.
3. Salin kode dari file `Code.gs` pada repositori ini ke editor Apps Script.
4. Ganti nilai `SPREADSHEET_ID` dengan ID yang Anda salin di Langkah 1.
   ```javascript
   const SPREADSHEET_ID = '1xYz...ID_SPREADSHEET_ANDA...AbC'; 
   ```

### Langkah 3: Konfigurasi AI (Google Gemini)
1. Dapatkan API Key gratis dari [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Salin API Key tersebut.
3. Ganti nilai `GEMINI_API_KEY` di `Code.gs`:
   ```javascript
   const GEMINI_API_KEY = 'AIzaSy...API_KEY_ANDA...xyz';
   ```

### Langkah 4: Menambahkan Frontend
1. Di editor Apps Script, klik tanda **+** (Add file) > pilih **HTML**.
2. Beri nama file: `Index` (harus persis "Index", karena dipanggil di `doGet`).
3. Salin seluruh kode dari file `Index.html` pada repositori ini ke file `Index.html` di editor Apps Script.

### Langkah 5: Inisialisasi Database
1. Di editor Apps Script, pastikan fungsi `setupDatabase` terpilih di toolbar atas.
2. Klik tombol **Jalankan** (Run).
3. Berikan izin akses (Review Permissions > Allow) saat diminta oleh Google.
4. Tunggu hingga muncul notifikasi "Database GerakPintar berhasil diinisialisasi!".
5. Cek Google Sheet Anda, sheet baru (`Siswa`, `Kelas`, dll) akan muncul otomatis.

### Langkah 6: Deploy sebagai Web App
1. Klik tombol biru **Terapkan** (Deploy) > **Deployment Baru** (New Deployment).
2. Pilih jenis: **Aplikasi Web** (Web App).
3. Konfigurasi:
   - Deskripsi: `Versi 1.0`
   - Jalankan sebagai: **Saya** (Me)
   - Yang memiliki akses: **Siapa saja** (Anyone) atau **Siapa saja dengan Akun Google** (disarankan untuk internal sekolah).
4. Klik **Terapkan** (Deploy).
5. Salin **URL Aplikasi Web** yang dihasilkan. Ini adalah link platform GerakPintar Anda.

## 📂 Struktur File

```
/workspace
├── Code.gs             # Backend logic, API endpoints, AI integration
├── Index.html          # Frontend UI (Dashboard, Form, Charts)
└── README.md           # Dokumentasi ini
```

## 🔮 Rencana Pengembangan (Roadmap)

- [ ] **Fitur Asesmen Digital**: Input nilai praktik langsung dari mobile guru di lapangan.
- [ ] **Analitik Lanjutan**: Grafik pertumbuhan fisik dan motorik siswa per semester.
- [ ] **Export Laporan Rapor**: Otomatisasi生成 laporan nilai PJOK dalam format PDF/Excel.
- [ ] **Bank Soal & Video**: Integrasi referensi video gerakan dan soal teori.
- [ ] **Multi-User Role**: Pembedaan akses antara Guru PJOK, Wali Kelas, dan Admin.

## 📄 Lisensi

Dibuat untuk tujuan edukasi dan efisiensi administrasi sekolah dasar Indonesia. Silakan dimodifikasi sesuai kebutuhan instansi Anda.

---
*Dikembangkan dengan ❤️ oleh Tim Arsitek Perangkat Lunak untuk Pendidikan Indonesia.*