/**
 * Teacher Generator PJOK SD
 * File: Config.gs
 * Deskripsi: Konfigurasi aplikasi, constants, dan settings global
 * Author: Senior Google Apps Script Developer
 * Version: 1.0.0
 */

// --- KONSTANTA APLIKASI ---

const APP_CONFIG = {
  NAME: 'Teacher Generator PJOK SD',
  VERSION: '1.0.0',
  AUTHOR: 'Senior Development Team',
  COPYRIGHT: '2024',
  
  // Spreadsheet Configuration
  SPREADSHEET_ID: function() {
    return SpreadsheetApp.getActiveSpreadsheet().getId();
  },
  
  // Sheet Names
  SHEETS: {
    USERS: 'USERS',
    SEKOLAH: 'SEKOLAH',
    GURU: 'GURU',
    TAHUN_AJARAN: 'TAHUN_AJARAN',
    SEMESTER: 'SEMESTER',
    FASE: 'FASE',
    CP: 'CP',
    TP: 'TP',
    MATERI: 'MATERI',
    MODUL_AJAR: 'MODUL_AJAR',
    ASSESMEN: 'ASSESMEN',
    KKTP: 'KKTP',
    BANK_SOAL: 'BANK_SOAL',
    BANK_PERMAINAN: 'BANK_PERMAINAN',
    MEDIA: 'MEDIA',
    JURNAL: 'JURNAL',
    LOG: 'LOG',
    BACKUP: 'BACKUP',
    TEMPLATE: 'TEMPLATE',
    SETTINGS: 'SETTINGS'
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
  
  // Model Pembelajaran PJOK
  MODEL_PEMBELAJARAN: [
    'Direct Instruction',
    'Discovery Learning',
    'Problem Based Learning',
    'Project Based Learning',
    'Cooperative Learning',
    'Teaching Games for Understanding (TGfU)',
    'Sport Education Model',
    'Personalized System of Instruction'
  ],
  
  // Metode Pembelajaran PJOK
  METODE_PEMBELAJARAN: [
    'Ceramah Interaktif',
    'Demonstrasi',
    'Praktik Langsung',
    'Drill and Practice',
    'Permainan Kecil',
    'Turnamen',
    'Diskusi Kelompok',
    'Peer Teaching'
  ],
  
  // Media Pembelajaran PJOK
  MEDIA_PEMBELAJARAN: [
    'Bola berbagai ukuran',
    'Matras',
    'Cone/Marker',
    'Tali/Skiping',
    'Ring/Hoop',
    'Video Pembelajaran',
    'Gambar/Poster',
    'Audio/Musik',
    'Aplikasi Digital',
    'Alat Tradisional'
  ],
  
  // Profil Pelajar Pancasila
  PROFIL_PANCASILA: [
    'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia',
    'Berkebinekaan Global',
    'Bergotong Royong',
    'Mandiri',
    'Bernalar Kritis',
    'Kreatif'
  ],
  
  // Target Peserta Didik
  TARGET_PESERTA_DIDIK: [
    'Reguler/Tipikal',
    'Kesulitan Belajar',
    'Cerdas Istimewa',
    'Berbakat Istimewa',
    'Disabilitas Fisik',
    'Disabilitas Mental'
  ],
  
  // Jenis Asesmen
  JENIS_ASSESMEN: [
    'Diagnostik',
    'Formatif',
    'Sumatif'
  ],
  
  // Kategori Bank Permainan
  KATEGORI_PERMAINAN: [
    'Permainan Bola Besar',
    'Permainan Bola Kecil',
    'Atletik',
    'Senam Lantai',
    'Senam Irama',
    'Aktivitas Air',
    'Bela Diri',
    'Kebugaran Jasmani',
    'Ice Breaking',
    'Literasi Gerak',
    'Numerasi Gerak'
  ],
  
  // Level Kognitif Soal
  LEVEL_KOGNITIF: [
    'C1 - Mengingat',
    'C2 - Memahami',
    'C3 - Menerapkan',
    'C4 - Menganalisis',
    'C5 - Mengevaluasi',
    'C6 - Mencipta'
  ],
  
  // Status Modul Ajar
  STATUS_MODUL: [
    'Draft',
    'Review',
    'Approved',
    'Published',
    'Archived'
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
