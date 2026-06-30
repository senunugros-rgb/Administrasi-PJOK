# 🎓 Teacher Generator - Platform Perangkat Pembelajaran Otomatis

Platform digital terintegrasi untuk administrasi pembelajaran **Kurikulum Merdeka** di Sekolah Dasar. Dibangun dengan teknologi serverless Google Apps Script, dilengkapi pendekatan **Deep Learning** untuk otomatisasi pembuatan modul ajar, RPP, dan sistem penilaian komprehensif.

## ✨ Fitur Utama

### 1. Dashboard Profesional
- Statistik real-time: Jumlah guru, siswa, modul ajar, dan kelas aktif
- Visualisasi data menggunakan Chart.js
- Log aktivitas pengguna
- Quick access menu

### 2. Generator Modul Ajar Berbasis AI
- Membuat draf Modul Ajar Kurikulum Merdeka secara otomatis
- Integrasi dengan dimensi Profil Lulusan (Deep Learning)
- Input: Topik, Kelas, Fase, Alokasi Waktu
- Output lengkap:
  - Capaian Pembelajaran (CP)
  - Tujuan Pembelajaran (TP)
  - Langkah kegiatan (5E Model: Engage, Explore, Explain, Elaborate, Evaluate)
  - Asesmen formatif & sumatif
  - Diferensiasi pembelajaran
  - Media dan sumber belajar

### 3. Manajemen Database Terintegrasi
- **20 Sheet otomatis**: Settings, Sekolah, Guru, Kelas, CP, TP, Modul Ajar, RPP, Asesmen, dll
- Fungsi inisialisasi database satu kali (`initDatabase`)
- CRUD operations untuk semua entitas
- Backup dan restore data

### 4. Deep Learning Framework
- **6 Dimensi Profil Lulusan**:
  - Bernalar Kritis
  - Kreatif
  - Gotong Royong
  - Mandiri
  - Berkebinekaan Global
  - Komunikasi
- Model pembelajaran: Discovery Learning, PBL, PjBL, CTL
- Diferensiasi: Konten, Proses, Produk

### 5. Sistem Penilaian Komprehensif
- Asesmen Diagnostik, Formatif, Sumatif
- Teknik penilaian: Observasi, Tes, Unjuk Kerja, Portofolio, Proyek
- Rubrik penilaian otomatis
- KKTP (Kriteria Ketuntasan Tujuan Pembelajaran)

### 6. Export & Print
- Export Modul Ajar ke Google Docs
- Export RPP ke PDF/Docs
- Generate laporan periodik
- Template dokumen profesional

### 7. UI/UX Modern & Responsif
- Desain clean menggunakan Tailwind CSS
- Navigasi sidebar intuitif
- Dark/Light theme
- Mobile-friendly
- Loading indicators & user feedback

## 🛠️ Arsitektur Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Backend | Google Apps Script (GAS) |
| Database | Google Sheets |
| Frontend | HTML5, Tailwind CSS, Vanilla JavaScript |
| AI Engine | Google Gemini API (opsional) |
| Visualisasi | Chart.js |
| Deployment | Google Apps Script Web App |

## 📊 Struktur Database

```
SETTINGS          → Konfigurasi aplikasi
SEKOLAH           → Data sekolah
GURU              → Data guru
KELAS             → Data kelas
TAHUN_AJARAN      → Tahun ajaran
SEMESTER          → Semester
FASE              → Fase Kurikulum Merdeka (A, B, C)
MAPEL             → Mata pelajaran
CP                → Capaian Pembelajaran
TP                → Tujuan Pembelajaran
MODUL_AJAR        → Modul Ajar
RPP               → Rencana Pelaksanaan Pembelajaran
ASSESMEN          → Penilaian/Asesmen
KKTP              → Kriteria Ketuntasan
DIMENSI_PROFIL    → Dimensi Profil Lulusan
KEGIATAN          → Bank Kegiatan Pembelajaran
MEDIA             → Media Pembelajaran
SUMBER_BELAJAR    → Sumber Belajar
JURNAL            → Jurnal Refleksi
LOG_AKTIVITAS     → Log aktivitas user
BACKUP            → Backup data
TEMPLATE          → Template dokumen
```

## 🚀 Cara Instalasi & Penggunaan

### Langkah 1: Persiapan Google Sheet
1. Buka [Google Sheets](https://sheets.google.com) dan buat Spreadsheet baru
2. Beri nama spreadsheet (misal: "Database Teacher Generator")
3. Salin **ID Spreadsheet** dari URL browser (bagian antara `/d/` dan `/edit`)

### Langkah 2: Setup Google Apps Script
1. Di Google Sheet, klik **Ekstensi** > **Apps Script**
2. Hapus kode default di `Code.gs`
3. Buat file-file berikut dengan copy-paste dari repositori ini:
   - `Code.gs` - Entry point & initialization
   - `Config.gs` - Konfigurasi aplikasi
   - `Database.gs` - Database operations
   - `Generator.gs` - Content generator
   - `Helper.gs` - Helper functions
   - `UI.gs` - UI handlers
   - `Index.html` - Main interface
   - `Style.html` - CSS styles
   - `Script.html` - Client-side JavaScript

### Langkah 3: Inisialisasi Database
1. Pastikan fungsi `initDatabase` terpilih di toolbar
2. Klik **Jalankan** (Run)
3. Berikan izin akses saat diminta
4. Tunggu notifikasi sukses
5. Cek Google Sheet - 20 sheet baru akan muncul otomatis

### Langkah 4: Deploy sebagai Web App
1. Klik **Terapkan** (Deploy) > **Deployment Baru**
2. Pilih jenis: **Aplikasi Web**
3. Konfigurasi:
   - Deskripsi: `Versi 1.0`
   - Jalankan sebagai: **Saya**
   - Akses: **Siapa saja dengan Akun Google** (recommended)
4. Klik **Terapkan**
5. Salin **URL Aplikasi Web** - ini adalah link aplikasi Anda

### Langkah 5: Penggunaan
1. Buka URL Web App di browser
2. Mulai input data:
   - Data Sekolah
   - Data Guru
   - Data Kelas
   - Mata Pelajaran
3. Buat perangkat pembelajaran:
   - Capaian Pembelajaran (CP)
   - Tujuan Pembelajaran (TP)
   - Modul Ajar
   - RPP
   - Asesmen
4. Export dokumen sesuai kebutuhan

## 📂 Struktur File

```
/workspace
├── Code.gs             # Entry point, initialization
├── Config.gs           # Configuration & constants
├── Database.gs         # Database CRUD operations
├── Generator.gs        # Content generation logic
├── Helper.gs           # Helper functions
├── UI.gs               # UI handlers & dialogs
├── Index.html          # Main interface
├── Style.html          # CSS styles
├── Script.html         # Client-side JavaScript
└── README.md           # Dokumentasi
```

## 🎯 Fitur Deep Learning

### Model Pembelajaran 5E
1. **Engage** - Membangun keterlibatan dan rasa ingin tahu
2. **Explore** - Eksplorasi konsep melalui investigasi
3. **Explain** - Penjelasan dan konstruksi pengetahuan
4. **Elaborate** - Penerapan dalam konteks baru
5. **Evaluate** - Evaluasi dan refleksi

### Diferensiasi Pembelajaran
- **Konten**: Variasi materi berdasarkan kesiapan siswa
- **Proses**: Variasi cara memahami materi
- **Produk**: Variasi cara mendemonstrasikan pemahaman

### Asesmen Autentik
- Observasi proses
- Unjuk kerja (performance)
- Portofolio
- Proyek
- Self & Peer Assessment

## 🔮 Roadmap Pengembangan

- [ ] **AI Integration** - Auto-generate konten dengan Gemini AI
- [ ] **Bank Soal Digital** - Repository soal terkurasi
- [ ] **Analitik Lanjutan** - Dashboard analitik pembelajaran
- [ ] **Export PDF** - Generate PDF langsung dari aplikasi
- [ ] **Multi-User Role** - Role-based access control
- [ ] **Mobile App** - Progressive Web App (PWA)
- [ ] **Integration** - Integrasi dengan SIPLah, Dapodik
- [ ] **Template Library** - Perpustakaan template siap pakai

## 👥 Tim Pengembang

Dikembangkan oleh tim ahli dengan peran:
- Senior System Analyst
- Senior UI/UX Designer
- Senior Google Apps Script Developer
- Senior Google Spreadsheet Database Architect
- Senior Education Technology Consultant
- Senior AI Prompt Engineer

## 📄 Lisensi

Dibuat untuk tujuan edukasi dan efisiensi administrasi sekolah dasar Indonesia. Silakan dimodifikasi sesuai kebutuhan instansi Anda.

## 📞 Dukungan

Untuk bantuan teknis dan pertanyaan:
- Email: support@teacher-generator.id
- Documentation: [Wiki](https://github.com/teacher-generator/wiki)

---

**© 2024 Teacher Generator - Kurikulum Merdeka Deep Learning**

*Dikembangkan dengan ❤️ untuk Pendidikan Indonesia*