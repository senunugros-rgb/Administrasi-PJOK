/**
 * Teacher Generator - Aplikasi Perangkat Pembelajaran Otomatis
 * File: Code.gs
 * Deskripsi: Entry point aplikasi, menangani doGet, doPost, dan inisialisasi
 * Author: Senior Development Team
 * Version: 2.0.0 - Kurikulum Merdeka Deep Learning
 */

// --- KONFIGURASI UTAMA ---

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const APP_NAME = 'Teacher Generator - Kurikulum Merdeka';
const APP_VERSION = '2.0.0';

// --- ENTRY POINT ---

/**
 * Menangani permintaan GET ke aplikasi web
 * @param {Object} e Event object
 * @return {HtmlOutput} Halaman HTML utama
 */
function doGet(e) {
  try {
    var user = Session.getActiveUser().getEmail();
    var page = e.parameter.page || 'dashboard';
    
    Logger.log('User: ' + user + ', Page: ' + page);
    
    return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle(APP_NAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setFaviconUrl('https://www.gstatic.com/classroom/logo_square_rounded.svg');
      
  } catch (error) {
    Logger.log('Error on doGet: ' + error.toString());
    return HtmlService.createHtmlOutput(
      '<h1 style="color:red">Error</h1><p>' + error.message + '</p>' +
      '<p>Silakan refresh halaman atau hubungi administrator.</p>'
    );
  }
}

/**
 * Include file HTML lain ke dalam file utama
 * @param {string} filename Nama file tanpa ekstensi
 * @return {string} Konten HTML
 */
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (e) {
    Logger.log('Error including file: ' + filename + ' - ' + e.toString());
    return '<span style="color:red">Error loading: ' + filename + '</span>';
  }
}

/**
 * Inisialisasi Database - Jalankan sekali saat deploy pertama
 * Membuat semua sheet yang diperlukan untuk aplikasi Teacher Generator
 */
function initDatabase() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Sheet names untuk Kurikulum Merdeka Deep Learning
    var sheets = [
      'SETTINGS',        // Konfigurasi aplikasi
      'SEKOLAH',         // Data sekolah
      'GURU',            // Data guru
      'KELAS',           // Data kelas
      'TAHUN_AJARAN',    // Tahun ajaran
      'SEMESTER',        // Semester
      'FASE',            // Fase Kurikulum Merdeka (A, B, C)
      'MAPEL',           // Mata pelajaran
      'CP',              // Capaian Pembelajaran
      'TP',              // Tujuan Pembelajaran
      'MODUL_AJAR',      // Modul Ajar
      'RPP',             // Rencana Pelaksanaan Pembelajaran
      'ASSESMEN',        // Penilaian/Asesmen
      'KKTP',            // Kriteria Ketuntasan Tujuan Pembelajaran
      'DIMENSI_PROFIL',  // Dimensi Profil Lulusan (Deep Learning)
      'KEGIATAN',        // Bank Kegiatan Pembelajaran
      'MEDIA',           // Media Pembelajaran
      'SUMBER_BELAJAR',  // Sumber Belajar
      'JURNAL',          // Jurnal Refleksi
      'LOG_AKTIVITAS',   // Log aktivitas user
      'BACKUP',          // Backup data
      'TEMPLATE'         // Template dokumen
    ];
    
    Logger.log('Creating ' + sheets.length + ' sheets...');
    
    sheets.forEach(function(sheetName) {
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        ss.insertSheet(sheetName);
        Logger.log('✓ Sheet created: ' + sheetName);
      }
    });
    
    // Initialize headers dan default data
    initHeaders();
    initDefaultSettings();
    initDimensiProfil();
    
    Logger.log('✓ Database initialization completed');
    
    return { 
      success: true, 
      message: 'Database Teacher Generator berhasil diinisialisasi dengan ' + sheets.length + ' sheet.',
      sheetsCount: sheets.length
    };
    
  } catch (error) {
    Logger.log('✗ Error initializing database: ' + error.toString());
    return { success: false, message: error.message };
  }
}

/**
 * Inisialisasi headers untuk setiap sheet
 */
function initHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // SETTINGS headers
  var settingsSheet = ss.getSheetByName('SETTINGS');
  if (settingsSheet && settingsSheet.getLastRow() === 0) {
    settingsSheet.appendRow(['key', 'value', 'description', 'updated_at']);
    settingsSheet.appendRow(['APP_NAME', 'Teacher Generator - Kurikulum Merdeka', 'Nama Aplikasi', new Date().toISOString()]);
    settingsSheet.appendRow(['VERSION', APP_VERSION, 'Versi Aplikasi', new Date().toISOString()]);
    settingsSheet.appendRow(['DEFAULT_THEME', 'light', 'Tema Default (light/dark)', new Date().toISOString()]);
    settingsSheet.appendRow(['AI_ENABLED', 'true', 'Aktifkan fitur AI', new Date().toISOString()]);
    settingsSheet.appendRow(['AUTO_SAVE', 'true', 'Auto save saat generate', new Date().toISOString()]);
  }
  
  // SEKOLAH headers
  var sekolahSheet = ss.getSheetByName('SEKOLAH');
  if (sekolahSheet && sekolahSheet.getLastRow() === 0) {
    sekolahSheet.appendRow(['id', 'nama_sekolah', 'npsn', 'alamat', 'kelurahan', 'kecamatan', 'kota', 'provinsi', 'kode_pos', 'telepon', 'email', 'website', 'kepala_sekolah', 'nip_kepsek', 'akreditasi', 'kurikulum', 'created_at', 'updated_at']);
  }
  
  // GURU headers
  var guruSheet = ss.getSheetByName('GURU');
  if (guruSheet && guruSheet.getLastRow() === 0) {
    guruSheet.appendRow(['id', 'nip', 'nama_lengkap', 'gelar_depan', 'gelar_belakang', 'tanggal_lahir', 'tempat_lahir', 'jenis_kelamin', 'pendidikan_terakhir', 'jurusan', 'pt_asal', 'no_hp', 'email', 'alamat', 'status_kepegawaian', 'mapel_ampu', 'kelas_ampu', 'created_at', 'updated_at']);
  }
  
  // KELAS headers
  var kelasSheet = ss.getSheetByName('KELAS');
  if (kelasSheet && kelasSheet.getLastRow() === 0) {
    kelasSheet.appendRow(['id', 'nama_kelas', 'fase', 'tingkat', 'semester', 'tahun_ajaran', 'wali_kelas_id', 'jumlah_siswa_l', 'jumlah_siswa_p', 'total_siswa', 'ruangan', 'status', 'created_at', 'updated_at']);
  }
  
  // FASE headers
  var faseSheet = ss.getSheetByName('FASE');
  if (faseSheet && faseSheet.getLastRow() === 0) {
    faseSheet.appendRow(['id', 'kode_fase', 'nama_fase', 'kelas', 'keterangan', 'created_at']);
    faseSheet.appendRow(['fase_a', 'A', 'Fase A', '1-2', 'Kelas 1 dan 2 SD', new Date().toISOString()]);
    faseSheet.appendRow(['fase_b', 'B', 'Fase B', '3-4', 'Kelas 3 dan 4 SD', new Date().toISOString()]);
    faseSheet.appendRow(['fase_c', 'C', 'Fase C', '5-6', 'Kelas 5 dan 6 SD', new Date().toISOString()]);
  }
  
  // MAPEL headers
  var mapelSheet = ss.getSheetByName('MAPEL');
  if (mapelSheet && mapelSheet.getLastRow() === 0) {
    mapelSheet.appendRow(['id', 'kode_mapel', 'nama_mapel', 'fase', 'alokasi_waktu_minggu', 'kktp', 'deskripsi', 'urutan', 'aktif', 'created_at']);
  }
  
  // CP headers
  var cpSheet = ss.getSheetByName('CP');
  if (cpSheet && cpSheet.getLastRow() === 0) {
    cpSheet.appendRow(['id', 'mapel_id', 'mapel_nama', 'fase', 'elemen', 'capaian_pembelajaran', 'kode_cp', 'urutan', 'aktif', 'created_at']);
  }
  
  // TP headers
  var tpSheet = ss.getSheetByName('TP');
  if (tpSheet && tpSheet.getLastRow() === 0) {
    tpSheet.appendRow(['id', 'cp_id', 'tujuan_pembelajaran', 'indikator_ketercapaian', 'dimensi_profil', 'alokasi_waktu', 'urutan', 'aktif', 'created_at']);
  }
  
  // MODUL_AJAR headers
  var modulSheet = ss.getSheetByName('MODUL_AJAR');
  if (modulSheet && modulSheet.getLastRow() === 0) {
    modulSheet.appendRow(['id', 'nama_modul', 'mapel_id', 'mapel_nama', 'fase', 'kelas', 'semester', 'tahun_ajaran', 'alokasi_waktu', 'penyusun_id', 'penyusun_nama', 'status', 'tanggal_dibuat', 'tanggal_update']);
  }
  
  // RPP headers
  var rppSheet = ss.getSheetByName('RPP');
  if (rppSheet && rppSheet.getLastRow() === 0) {
    rppSheet.appendRow(['id', 'modul_id', 'pertemuan_ke', 'tanggal', 'materi_pokok', 'tujuan_pembelajaran', 'kegiatan_pendahuluan', 'kegiatan_inti', 'kegiatan_penutup', 'media_pembelajaran', 'sumber_belajar', 'asesmen_formatif', 'refleksi', 'status', 'created_at']);
  }
  
  // ASSESMEN headers
  var asesmenSheet = ss.getSheetByName('ASSESMEN');
  if (asesmenSheet && asesmenSheet.getLastRow() === 0) {
    asesmenSheet.appendRow(['id', 'rpp_id', 'jenis_penilaian', 'teknik_penilaian', 'bentuk_instrumen', 'kisi_kisi', 'rubrik', 'bobot', 'kktp', 'tanggal_pelaksanaan', 'status', 'created_at']);
  }
  
  // DIMENSI_PROFIL headers
  var dimensiSheet = ss.getSheetByName('DIMENSI_PROFIL');
  if (dimensiSheet && dimensiSheet.getLastRow() === 0) {
    dimensiSheet.appendRow(['id', 'nama_dimensi', 'elemen', 'deskripsi', 'indikator', 'created_at']);
  }
  
  // KEGIATAN headers
  var kegiatanSheet = ss.getSheetByName('KEGIATAN');
  if (kegiatanSheet && kegiatanSheet.getLastRow() === 0) {
    kegiatanSheet.appendRow(['id', 'nama_kegiatan', 'kategori', 'fase', 'deskripsi', 'langkah_langkah', 'durasi', 'media', 'created_at']);
  }
  
  // MEDIA headers
  var mediaSheet = ss.getSheetByName('MEDIA');
  if (mediaSheet && mediaSheet.getLastRow() === 0) {
    mediaSheet.appendRow(['id', 'nama_media', 'jenis', 'deskripsi', 'url_file', 'kategori', 'fase', 'created_at']);
  }
  
  // SUMBER_BELAJAR headers
  var sumberSheet = ss.getSheetByName('SUMBER_BELAJAR');
  if (sumberSheet && sumberSheet.getLastRow() === 0) {
    sumberSheet.appendRow(['id', 'judul', 'penulis', 'penerbit', 'tahun', 'url', 'jenis', 'kategori', 'created_at']);
  }
  
  // JURNAL headers
  var jurnalSheet = ss.getSheetByName('JURNAL');
  if (jurnalSheet && jurnalSheet.getLastRow() === 0) {
    jurnalSheet.appendRow(['id', 'guru_id', 'tanggal', 'kelas', 'mata_pelajaran', 'materi', 'catatan', 'refleksi', 'tindak_lanjut', 'created_at']);
  }
  
  // LOG_AKTIVITAS headers
  var logSheet = ss.getSheetByName('LOG_AKTIVITAS');
  if (logSheet && logSheet.getLastRow() === 0) {
    logSheet.appendRow(['id', 'user_email', 'action', 'details', 'ip_address', 'timestamp']);
  }
  
  // BACKUP headers
  var backupSheet = ss.getSheetByName('BACKUP');
  if (backupSheet && backupSheet.getLastRow() === 0) {
    backupSheet.appendRow(['id', 'table_name', 'data_json', 'backup_date', 'created_by']);
  }
  
  // TEMPLATE headers
  var templateSheet = ss.getSheetByName('TEMPLATE');
  if (templateSheet && templateSheet.getLastRow() === 0) {
    templateSheet.appendRow(['id', 'nama_template', 'jenis', 'konten', 'versi', 'aktif', 'updated_at']);
  }
  
  Logger.log('✓ Headers initialized for all sheets');
}

/**
 * Inisialisasi dimensi profil lulusan untuk Deep Learning
 */
function initDimensiProfil() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dimensiSheet = ss.getSheetByName('DIMENSI_PROFIL');
  
  if (!dimensiSheet || dimensiSheet.getLastRow() > 1) return;
  
  var dimensiData = [
    ['bernalar_kritis', 'Bernalar Kritis', 'Memperoleh dan memproses informasi, menganalisis, mengevaluasi, memecahkan masalah', 'Siswa mampu berpikir kritis dalam menghadapi masalah', 'Mengidentifikasi masalah|Menganalisis informasi|Menyimpulkan|Memecahkan masalah'],
    ['kreatif', 'Kreatif', 'Menghasilkan gagasan orisinal, fleksibel dalam berpikir', 'Siswa mampu menghasilkan ide-ide kreatif', 'Menghasilkan ide baru|Berpikir out of the box|Menciptakan solusi inovatif'],
    ['gotong_royong', 'Gotong Royong', 'Kolaborasi, kepedulian, berbagi', 'Siswa mampu bekerja sama dalam tim', 'Berkolaborasi|Saling membantu|Berbagi pengetahuan'],
    ['mandiri', 'Mandiri', 'Regulasi diri, tanggung jawab atas proses belajar', 'Siswa mampu belajar secara mandiri', 'Mengatur waktu belajar|Bertanggung jawab|Belajar tanpa paksaan'],
    ['berkebinekaan_global', 'Berkebinekaan Global', 'Mengenal budaya, komunikasi intercultural', 'Siswa menghargai keberagaman', 'Menghargai perbedaan|Komunikasi lintas budaya|Berpikir global'],
    ['komunikasi', 'Komunikasi', 'Memahami dan menggunakan bahasa, menyampaikan pesan', 'Siswa mampu berkomunikasi efektif', 'Menyampaikan ide|Mendengarkan aktif|Menggunakan bahasa yang tepat']
  ];
  
  dimensiData.forEach(function(row, index) {
    var id = 'DIM-' + (index + 1);
    dimensiSheet.appendRow([id, row[1], row[2], row[3], row[4], new Date().toISOString()]);
  });
  
  Logger.log('✓ Dimensi Profil initialized with ' + dimensiData.length + ' dimensions');
}