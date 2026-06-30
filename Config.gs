/**
 * Teacher Generator - Kurikulum Merdeka Deep Learning
 * File: Config.gs
 * Deskripsi: Konfigurasi aplikasi, constants, dan settings global
 * Author: Senior Development Team
 * Version: 2.0.0
 */

// --- KONSTANTA APLIKASI ---

const APP_CONFIG = {
  NAME: 'Teacher Generator - Kurikulum Merdeka',
  VERSION: '2.0.0',
  AUTHOR: 'Senior Development Team',
  COPYRIGHT: '2024',
  
  // Spreadsheet Configuration
  SPREADSHEET_ID: function() {
    return SpreadsheetApp.getActiveSpreadsheet().getId();
  },
  
  // Sheet Names
  SHEETS: {
    SETTINGS: 'SETTINGS',
    SEKOLAH: 'SEKOLAH',
    GURU: 'GURU',
    KELAS: 'KELAS',
    TAHUN_AJARAN: 'TAHUN_AJARAN',
    SEMESTER: 'SEMESTER',
    FASE: 'FASE',
    MAPEL: 'MAPEL',
    CP: 'CP',
    TP: 'TP',
    MODUL_AJAR: 'MODUL_AJAR',
    RPP: 'RPP',
    ASSESMEN: 'ASSESMEN',
    KKTP: 'KKTP',
    DIMENSI_PROFIL: 'DIMENSI_PROFIL',
    KEGIATAN: 'KEGIATAN',
    MEDIA: 'MEDIA',
    SUMBER_BELAJAR: 'SUMBER_BELAJAR',
    JURNAL: 'JURNAL',
    LOG_AKTIVITAS: 'LOG_AKTIVITAS',
    BACKUP: 'BACKUP',
    TEMPLATE: 'TEMPLATE'
  },
  
  // User Roles
  ROLES: {
    ADMIN: 'admin',
    GURU: 'guru',
    KEPALA_SEKOLAH: 'kepala_sekolah',
    SUPERVISOR: 'supervisor'
  },
  
  // Fase Kurikulum Merdeka untuk SD
  FASE_SD: {
    A: { nama: 'Fase A', kelas: '1-2', keterangan: 'Kelas 1 dan 2 SD' },
    B: { nama: 'Fase B', kelas: '3-4', keterangan: 'Kelas 3 dan 4 SD' },
    C: { nama: 'Fase C', kelas: '5-6', keterangan: 'Kelas 5 dan 6 SD' }
  },
  
  // Semester Options
  SEMESTER_OPTIONS: [
    { id: 1, nama: 'Semester 1 (Ganjil)', kode: 'SEM1' },
    { id: 2, nama: 'Semester 2 (Genap)', kode: 'SEM2' }
  ],
  
  // Dimensi Profil Lulusan (Deep Learning)
  DIMENSI_PROFIL: [
    { 
      id: 'bernalar_kritis', 
      nama: 'Bernalar Kritis', 
      elemen: ['Memperoleh dan memproses informasi', 'Menganalisis informasi', 'Mengevaluasi dan argumentasi', 'Memecahkan masalah'],
      deskripsi: 'Siswa mampu berpikir kritis dalam menghadapi masalah dan mengambil keputusan berdasarkan data'
    },
    { 
      id: 'kreatif', 
      nama: 'Kreatif', 
      elemen: ['Menghasilkan gagasan orisinal', 'Menghasilkan karya orisinal', 'Fleksibilitas berpikir'],
      deskripsi: 'Siswa mampu menghasilkan ide-ide kreatif dan solusi inovatif'
    },
    { 
      id: 'gotong_royong', 
      nama: 'Gotong Royong', 
      elemen: ['Kolaborasi', 'Kepedulian', 'Berbagi'],
      deskripsi: 'Siswa mampu bekerja sama dalam tim dan saling membantu'
    },
    { 
      id: 'mandiri', 
      nama: 'Mandiri', 
      elemen: ['Regulasi diri', 'Tanggung jawab proses belajar'],
      deskripsi: 'Siswa mampu belajar secara mandiri dan bertanggung jawab'
    },
    { 
      id: 'berkebinekaan_global', 
      nama: 'Berkebinekaan Global', 
      elemen: ['Mengenal dan menghargai budaya', 'Komunikasi interkultural', 'Refleksi kebinekaan'],
      deskripsi: 'Siswa menghargai keberagaman dan berpikir global'
    },
    { 
      id: 'komunikasi', 
      nama: 'Komunikasi', 
      elemen: ['Memahami bahasa', 'Menyampaikan pesan efektif'],
      deskripsi: 'Siswa mampu berkomunikasi secara efektif'
    }
  ],
  
  // Model Pembelajaran (Deep Learning Approach)
  MODEL_PEMBELAJARAN: [
    'Discovery Learning',
    'Problem Based Learning (PBL)',
    'Project Based Learning (PjBL)',
    'Inquiry Based Learning',
    'Cooperative Learning',
    'Contextual Teaching and Learning (CTL)',
    'Differentiated Instruction',
    'Universal Design for Learning (UDL)'
  ],
  
  // Metode Pembelajaran
  METODE_PEMBELAJARAN: [
    'Diskusi Kelompok',
    'Presentasi',
    'Demonstrasi',
    'Praktik Langsung',
    'Simulasi/Role Play',
    'Studi Kasus',
    'Problem Solving',
    'Peer Teaching',
    'Flipped Classroom',
    'Blended Learning'
  ],
  
  // Media Pembelajaran
  MEDIA_PEMBELAJARAN: [
    'Video Pembelajaran',
    'Gambar/Poster',
    'Audio/Musik',
    'Aplikasi Digital',
    'E-Book/Modul Digital',
    'Alat Peraga Fisik',
    'Interactive Whiteboard',
    'Quiz Interaktif',
    'Virtual Lab',
    'Augmented Reality (AR)'
  ],
  
  // Jenis Asesmen
  JENIS_ASSESMEN: [
    { id: 'diagnostik', nama: 'Asesmen Diagnostik', tujuan: 'Mengetahui kemampuan awal siswa' },
    { id: 'formatif', nama: 'Asesmen Formatif', tujuan: 'Memantau proses belajar dan memberikan feedback' },
    { id: 'sumatif', nama: 'Asesmen Sumatif', tujuan: 'Mengukur pencapaian hasil belajar' }
  ],
  
  // Teknik Penilaian
  TEKNIK_PENILAIAN: [
    'Observasi',
    'Tes Tertulis',
    'Tes Lisan',
    'Unjuk Kerja/Performance',
    'Portofolio',
    'Proyek',
    'Produk',
    'Self Assessment',
    'Peer Assessment'
  ],
  
  // Level Kognitif (Bloom Taxonomy Revised)
  LEVEL_KOGNITIF: [
    { level: 'C1', nama: 'Mengingat', kata_kerja: ['menyebutkan', 'mendefinisikan', 'mengidentifikasi'] },
    { level: 'C2', nama: 'Memahami', kata_kerja: ['menjelaskan', 'menguraikan', 'merangkum'] },
    { level: 'C3', nama: 'Menerapkan', kata_kerja: ['menerapkan', 'menggunakan', 'melaksanakan'] },
    { level: 'C4', nama: 'Menganalisis', kata_kerja: ['menganalisis', 'membandingkan', 'mengorganisasi'] },
    { level: 'C5', nama: 'Mengevaluasi', kata_kerja: ['menilai', 'mengevaluasi', 'mengkritisi'] },
    { level: 'C6', nama: 'Mencipta', kata_kerja: ['menciptakan', 'merancang', 'mengembangkan'] }
  ],
  
  // Status Modul Ajar
  STATUS_MODUL: [
    { id: 'draft', nama: 'Draft', warna: '#FFA500' },
    { id: 'review', nama: 'Review', warna: '#2196F3' },
    { id: 'approved', nama: 'Approved', warna: '#4CAF50' },
    { id: 'published', nama: 'Published', warna: '#9C27B0' },
    { id: 'archived', nama: 'Archived', warna: '#9E9E9E' }
  ],
  
  // Target Peserta Didik (Diferensiasi)
  TARGET_PESERTA_DIDIK: [
    'Reguler/Tipikal',
    'Kesulitan Belajar (Learning Disability)',
    'Cerdas Istimewa (Gifted)',
    'Berbakat Istimewa (Talented)',
    'Disabilitas Fisik',
    'Disabilitas Mental',
    'Slow Learner'
  ]
};

// --- FUNGSI HELPER CONFIG ---

/**
 * Mendapatkan nilai dari sheet SETTINGS
 * @param {string} key Key setting
 * @param {string} defaultValue Default value jika tidak ditemukan
 * @return {string} Value setting
 */
function getConfigValue(key, defaultValue) {
  try {
    var db = new Database();
    var result = db.findOne(APP_CONFIG.SHEETS.SETTINGS, { key: key });
    
    if (result && result.value) {
      return result.value;
    }
    
    return defaultValue || '';
  } catch (error) {
    Logger.log('Error getting config value: ' + error.toString());
    return defaultValue || '';
  }
}

/**
 * Menyimpan nilai ke sheet SETTINGS
 * @param {string} key Key setting
 * @param {string} value Value setting
 * @param {string} description Description setting
 * @return {Object} Result object
 */
function setConfigValue(key, value, description) {
  try {
    var db = new Database();
    var existing = db.findOne(APP_CONFIG.SHEETS.SETTINGS, { key: key });
    
    if (existing) {
      return db.update(APP_CONFIG.SHEETS.SETTINGS, 
        { key: key }, 
        { 
          value: value, 
          description: description || '', 
          updated_at: new Date().toISOString() 
        }
      );
    } else {
      return db.insert(APP_CONFIG.SHEETS.SETTINGS, {
        key: key,
        value: value,
        description: description || '',
        updated_at: new Date().toISOString()
      });
    }
  } catch (error) {
    Logger.log('Error setting config value: ' + error.toString());
    return { success: false, message: error.message };
  }
}

/**
 * Mendapatkan semua konfigurasi
 * @return {Object} Object berisi semua config
 */
function getAllConfig() {
  try {
    var db = new Database();
    var settings = db.findAll(APP_CONFIG.SHEETS.SETTINGS);
    
    var config = {};
    settings.forEach(function(setting) {
      config[setting.key] = setting.value;
    });
    
    return config;
  } catch (error) {
    Logger.log('Error getting all config: ' + error.toString());
    return {};
  }
}

/**
 * Inisialisasi default settings
 */
function initDefaultSettings() {
  var defaults = [
    ['APP_NAME', APP_CONFIG.NAME, 'Nama Aplikasi'],
    ['VERSION', APP_CONFIG.VERSION, 'Versi Aplikasi'],
    ['DEFAULT_THEME', 'light', 'Tema Default (light/dark)'],
    ['ALLOW_REGISTRATION', 'false', 'Izinkan registrasi user baru'],
    ['MAX_UPLOAD_SIZE', '10485760', 'Ukuran upload maksimal (bytes)'],
    ['DEFAULT_MAPLE', 'PJOK', 'Mata Pelajaran Default'],
    ['AI_ENABLED', 'true', 'Aktifkan fitur AI'],
    ['AUTO_SAVE', 'true', 'Auto save saat generate']
  ];
  
  var db = new Database();
  
  defaults.forEach(function(row) {
    var existing = db.findOne(APP_CONFIG.SHEETS.SETTINGS, { key: row[0] });
    if (!existing) {
      db.insert(APP_CONFIG.SHEETS.SETTINGS, {
        key: row[0],
        value: row[1],
        description: row[2],
        updated_at: new Date().toISOString()
      });
    }
  });
}

/**
 * Logging fungsi untuk audit trail
 * @param {string} userEmail Email user
 * @param {string} action Aksi yang dilakukan
 * @param {string} details Detail aksi
 */
function logActivity(userEmail, action, details) {
  try {
    var db = new Database();
    db.insert(APP_CONFIG.SHEETS.LOG, {
      id: Utilities.getUuid(),
      user_email: userEmail,
      action: action,
      details: details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    Logger.log('Error logging activity: ' + error.toString());
  }
}
