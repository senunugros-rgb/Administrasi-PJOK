/**
 * Config.gs - Konfigurasi Utama Aplikasi Teacher Generator PJOK SD
 * 
 * File ini berisi semua konfigurasi global aplikasi termasuk:
 * - Nama aplikasi dan versi
 * - ID Spreadsheet database
 * - Pengaturan API Google
 * - Konstanta sistem
 * - Pengaturan tema dan UI
 */

// ========================================
// KONFIGURASI APLIKASI
// ========================================
const APP_CONFIG = {
  NAME: "Teacher Generator PJOK SD",
  VERSION: "1.0.0",
  DESCRIPTION: "Aplikasi Generator Perangkat Pembelajaran PJOK SD Kurikulum Merdeka",
  AUTHOR: "Education Technology Team",
  BUILD_DATE: new Date(),
  
  // Mode aplikasi
  DEBUG_MODE: true,
  LOGGING_ENABLED: true,
  
  // Pengaturan default
  DEFAULT_THEME: "light", // light, dark
  DEFAULT_LANGUAGE: "id",
  ITEMS_PER_PAGE: 10,
  
  // Timeout settings (dalam milidetik)
  AI_GENERATION_TIMEOUT: 30000, // 30 detik
  EXPORT_TIMEOUT: 60000, // 60 detik
  BACKUP_TIMEOUT: 120000, // 2 menit
  
  // Batasan
  MAX_FILE_SIZE_MB: 10,
  MAX_UPLOAD_FILES: 5,
  MAX_GENERATE_PER_DAY: 50
};

// ========================================
// KONFIGURASI DATABASE
// ========================================
const DB_CONFIG = {
  // Nama-nama sheet dalam database
  SHEETS: {
    SETTING: "Setting",
    USER: "User",
    SEKOLAH: "Sekolah",
    GURU: "Guru",
    TAHUN_AJARAN: "Tahun_Ajaran",
    SEMESTER: "Semester",
    FASE: "Fase",
    CP: "CP",
    TP: "TP",
    ATP: "ATP",
    MATERI: "Materi",
    MODUL_AJAR: "Modul_Ajar",
    ASSESMEN: "Assesmen",
    KKTP: "KKTP",
    BANK_SOAL: "Bank_Soal",
    BANK_PERMAINAN: "Bank_Permainan",
    MEDIA: "Media",
    JURNAL: "Jurnal",
    LOG: "Log",
    BACKUP: "Backup",
    TEMPLATE: "Template"
  },
  
  // Prefix untuk nama kolom
  COLUMN_PREFIX: {
    ID: "id_",
    CREATED: "created_",
    UPDATED: "updated_",
    STATUS: "status_"
  },
  
  // Status record
  STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    DRAFT: "draft",
    PUBLISHED: "published",
    ARCHIVED: "archived"
  }
};

// ========================================
// KONFIGURASI GOOGLE API
// ========================================
const API_CONFIG = {
  // Scopes yang diperlukan
  SCOPES: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/script.container.ui"
  ],
  
  // MIME types untuk export
  MIME_TYPES: {
    PDF: "application/pdf",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    GOOGLE_DOC: "application/vnd.google-apps.document",
    GOOGLE_SHEET: "application/vnd.google-apps.spreadsheet",
    FOLDER: "application/vnd.google-apps.folder"
  },
  
  // Folder default di Google Drive
  DRIVE_FOLDER_NAME: "Teacher Generator PJOK",
  BACKUP_FOLDER_NAME: "Backups"
};

// ========================================
// KONFIGURASI PJOK SD
// ========================================
const PJOK_CONFIG = {
  // Jenjang sekolah dasar
  JENJANG: ["SD", "MI"],
  
  // Kelas dan Fase sesuai Kurikulum Merdeka
  KELAS_FASE: {
    "1": "A",
    "2": "A",
    "3": "B",
    "4": "B",
    "5": "C",
    "6": "C"
  },
  
  // Semester
  SEMESTER: ["1 (Ganjil)", "2 (Genap)"],
  
  // Komponen materi PJOK
  KOMPONEN_MATERI: [
    "Gerak Dasar Lokomotor",
    "Gerak Dasar Non-Lokomotor",
    "Gerak Dasar Manipulatif",
    "Aktivitas Permainan Bola Besar",
    "Aktivitas Permainan Bola Kecil",
    "Aktivitas Atletik",
    "Aktivitas Bela Diri",
    "Aktivitas Kebugaran Jasmani",
    "Aktivitas Senam Lantai",
    "Aktivitas Gerak Berirama",
    "Aktivitas Air",
    "Kesehatan Pribadi dan Sosial"
  ],
  
  // Model pembelajaran
  MODEL_PEMBELAJARAN: [
    "Problem Based Learning",
    "Project Based Learning",
    "Discovery Learning",
    "Inquiry Based Learning",
    "Cooperative Learning",
    "Direct Instruction",
    "Game Based Learning",
    "Blended Learning"
  ],
  
  // Pendekatan pembelajaran
  PENDEKATAN: [
    "Scientific Approach",
    "Deep Learning",
    "Contextual Teaching and Learning",
    "Whole Language",
    "Tematik Integratif",
    "Berbasis Kompetensi",
    "Student Centered"
  ],
  
  // Metode pembelajaran
  METODE: [
    "Ceramah Interaktif",
    "Demonstrasi",
    "Praktik Langsung",
    "Permainan",
    "Diskusi",
    "Simulasi",
    "Eksperimen",
    "Penugasan",
    "Peer Teaching"
  ],
  
  // Media pembelajaran
  MEDIA: [
    "Video Pembelajaran",
    "Gambar/Poster",
    "Audio/Musik",
    "Alat Peraga",
    "LKS/LKPD",
    "PowerPoint",
    "Aplikasi Digital",
    "Realia (Benda Nyata)"
  ],
  
  // Profil Pelajar Pancasila
  PROFIL_PANCASILA: [
    "Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia",
    "Berkebinekaan Global",
    "Bergotong Royong",
    "Mandiri",
    "Bernalar Kritis",
    "Kreatif"
  ],
  
  // Target peserta didik
  TARGET_PESERTA_DIDIK: [
    "Reguler/Tipikal",
    "Slow Learner",
    "Disabilitas Fisik",
    "Disabilitas Mental",
    "Gifted/Talented",
    "Kesulitan Belajar Spesifik"
  ]
};

// ========================================
// KONFIGURASI TEMA & UI
// ========================================
const UI_CONFIG = {
  // Warna tema
  COLORS: {
    PRIMARY: "#1976D2",
    SECONDARY: "#424242",
    ACCENT: "#FF5722",
    SUCCESS: "#4CAF50",
    WARNING: "#FF9800",
    ERROR: "#F44336",
    INFO: "#2196F3",
    
    // Dark mode
    DARK_BG: "#121212",
    DARK_SURFACE: "#1E1E1E",
    LIGHT_BG: "#FAFAFA",
    LIGHT_SURFACE: "#FFFFFF"
  },
  
  // Animasi
  ANIMATIONS: {
    DURATION_FAST: 200,
    DURATION_NORMAL: 300,
    DURATION_SLOW: 500,
    EASING: "ease-in-out"
  },
  
  // Toast notification
  TOAST: {
    DURATION_SUCCESS: 3000,
    DURATION_ERROR: 5000,
    DURATION_WARNING: 4000,
    DURATION_INFO: 3000
  },
  
  // Loading
  LOADING: {
    MIN_TIME: 500,
    MAX_TIME: 30000
  }
};

// ========================================
// KONFIGURASI EXPORT
// ========================================
const EXPORT_CONFIG = {
  // Format export yang didukung
  FORMATS: ["PDF", "DOCX", "GOOGLE_DOC", "GOOGLE_SHEET", "PRINT"],
  
  // Template folder name
  TEMPLATE_FOLDER: "Templates",
  
  // Output folder name
  OUTPUT_FOLDER: "Output",
  
  // Naming pattern
  FILE_NAMING_PATTERN: "{jenis}_{kelas}_{semester}_{tanggal}",
  
  // Default orientation
  PDF_ORIENTATION: "portrait",
  PDF_MARGIN: {
    top: "2cm",
    bottom: "2cm",
    left: "2cm",
    right: "2cm"
  }
};

// ========================================
// KONFIGURASI BACKUP
// ========================================
const BACKUP_CONFIG = {
  // Frekuensi backup otomatis
  AUTO_BACKUP_ENABLED: true,
  AUTO_BACKUP_INTERVAL_DAYS: 7,
  
  // Max backup files to keep
  MAX_BACKUP_FILES: 10,
  
  // Backup include
  INCLUDE_DATA: true,
  INCLUDE_LOGS: false,
  INCLUDE_TEMPLATES: true
};

// ========================================
// KONFIGURASI LOGGING
// ========================================
const LOG_CONFIG = {
  LEVELS: {
    DEBUG: 0,
    INFO: 1,
    WARNING: 2,
    ERROR: 3,
    CRITICAL: 4
  },
  
  CURRENT_LEVEL: 1, // INFO
  
  // Log retention
  RETENTION_DAYS: 30,
  
  // Log format
  FORMAT: "{timestamp} [{level}] {source}: {message}"
};

// ========================================
// FUNGSI HELPER KONFIGURASI
// ========================================

/**
 * Mendapatkan nilai dari Setting sheet
 * @param {string} key - Kunci setting
 * @param {any} defaultValue - Nilai default jika key tidak ditemukan
 * @returns {any} Nilai setting
 */
function getSetting(key, defaultValue = null) {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(DB_CONFIG.SHEETS.SETTING);
    
    if (!sheet) return defaultValue;
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const keyIndex = headers.indexOf("key");
    const valueIndex = headers.indexOf("value");
    
    if (keyIndex === -1 || valueIndex === -1) return defaultValue;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][keyIndex] === key) {
        return data[i][valueIndex];
      }
    }
    
    return defaultValue;
  } catch (e) {
    logError("getSetting", e);
    return defaultValue;
  }
}

/**
 * Menyimpan nilai ke Setting sheet
 * @param {string} key - Kunci setting
 * @param {any} value - Nilai setting
 * @returns {boolean} True jika berhasil
 */
function setSetting(key, value) {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(DB_CONFIG.SHEETS.SETTING);
    
    if (!sheet) {
      throw new Error("Sheet Setting tidak ditemukan");
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const keyIndex = headers.indexOf("key");
    const valueIndex = headers.indexOf("value");
    
    if (keyIndex === -1 || valueIndex === -1) {
      throw new Error("Kolom key/value tidak ditemukan");
    }
    
    // Cari dan update jika ada
    for (let i = 1; i < data.length; i++) {
      if (data[i][keyIndex] === key) {
        sheet.getRange(i + 1, valueIndex + 1).setValue(value);
        return true;
      }
    }
    
    // Jika tidak ada, tambah baru
    sheet.appendRow([key, value, new Date()]);
    return true;
  } catch (e) {
    logError("setSetting", e);
    return false;
  }
}

/**
 * Mendapatkan semua setting
 * @returns {Object} Object berisi semua setting
 */
function getAllSettings() {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(DB_CONFIG.SHEETS.SETTING);
    
    if (!sheet) return {};
    
    const data = sheet.getDataRange().getValues();
    const settings = {};
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) {
        settings[data[i][0]] = data[i][1];
      }
    }
    
    return settings;
  } catch (e) {
    logError("getAllSettings", e);
    return {};
  }
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
function generateId() {
  return Utilities.getUuid();
}

/**
 * Format tanggal ke format Indonesia
 * @param {Date} date - Tanggal
 * @returns {string} Tanggal terformat
 */
function formatDateIndonesian(date) {
  if (!date) return "";
  const d = new Date(date);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  };
  return d.toLocaleDateString('id-ID', options);
}

/**
 * Format timestamp untuk filename
 * @param {Date} date - Tanggal
 * @returns {string} Timestamp string
 */
function formatTimestamp(date) {
  const d = new Date(date || new Date());
  return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
}

/**
 * Sanitize string untuk filename
 * @param {string} str - String input
 * @returns {string} String sanitized
 */
function sanitizeFilename(str) {
  return str.replace(/[^a-zA-Z0-9_\-\s]/g, '_').replace(/\s+/g, '_');
}

/**
 * Logging function
 * @param {string} level - Level log
 * @param {string} source - Sumber log
 * @param {string} message - Pesan log
 */
function log(level, source, message) {
  if (LOG_CONFIG.CURRENT_LEVEL > LOG_CONFIG.LEVELS[level.toUpperCase()]) {
    return;
  }
  
  const timestamp = new Date().toISOString();
  const logMessage = LOG_CONFIG.FORMAT
    .replace("{timestamp}", timestamp)
    .replace("{level}", level.toUpperCase())
    .replace("{source}", source)
    .replace("{message}", message);
  
  console.log(logMessage);
  
  // Simpan ke log sheet jika enabled
  if (LOG_CONFIG.LOGGING_ENABLED) {
    try {
      saveToLog(level, source, message);
    } catch (e) {
      // Ignore log save errors
    }
  }
}

/**
 * Log info
 */
function logInfo(source, message) {
  log("INFO", source, message);
}

/**
 * Log error
 */
function logError(source, error) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : "";
  log("ERROR", source, `${message} ${stack}`);
}

/**
 * Log warning
 */
function logWarning(source, message) {
  log("WARNING", source, message);
}

/**
 * Log debug
 */
function logDebug(source, message) {
  if (APP_CONFIG.DEBUG_MODE) {
    log("DEBUG", source, message);
  }
}

/**
 * Simpan ke log sheet
 */
function saveToLog(level, source, message) {
  try {
    const ss = getDatabase();
    let sheet = ss.getSheetByName(DB_CONFIG.SHEETS.LOG);
    
    if (!sheet) {
      sheet = ss.insertSheet(DB_CONFIG.SHEETS.LOG);
      sheet.appendRow(["timestamp", "level", "source", "message"]);
    }
    
    sheet.appendRow([new Date(), level, source, message]);
  } catch (e) {
    // Silent fail for logging
  }
}
