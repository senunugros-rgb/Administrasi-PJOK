/**
 * Code.gs - Entry Point dan Main Controller
 * 
 * File ini adalah titik masuk utama aplikasi yang berisi:
 * - Fungsi doGet untuk Web App
 * - Routing dan navigation
 * - Fungsi helper global
 * - Inisialisasi aplikasi
 */

// ========================================
// WEB APP ENTRY POINT
// ========================================

/**
 * Handler untuk HTTP GET request
 * @param {Object} e - Event object
 * @returns {HtmlOutput} HTML output
 */
function doGet(e) {
  try {
    // Check if database is initialized
    const isInitialized = getSetting("DATABASE_INITIALIZED", false);
    
    if (!isInitialized) {
      initializeDatabase();
    }
    
    // Get page parameter
    const page = e.parameter.page || "dashboard";
    
    // Serve appropriate HTML based on page
    return servePage(page);
  } catch (e) {
    logError("doGet", e);
    return HtmlService.createHtmlOutput(`
      <div style="padding: 20px; font-family: Arial;">
        <h1>Error</h1>
        <p>Terjadi kesalahan saat memuat aplikasi: ${e.message}</p>
        <button onclick="location.reload()">Refresh</button>
      </div>
    `);
  }
}

/**
 * Serve halaman HTML berdasarkan nama page
 * @param {string} page - Nama halaman
 * @returns {HtmlOutput} HTML output
 */
function servePage(page) {
  const template = HtmlService.createTemplateFromFile("UI");
  
  // Set page context
  template.page = page;
  template.appConfig = APP_CONFIG;
  template.uiConfig = UI_CONFIG;
  template.pjokConfig = PJOK_CONFIG;
  
  // Create HTML output
  const html = template.evaluate()
    .setTitle(APP_CONFIG.NAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .addMetaTag('theme-color', UI_CONFIG.COLORS.PRIMARY);
  
  return html;
}

/**
 * Include file HTML lain ke dalam template utama
 * @param {string} filename - Nama file HTML tanpa ekstensi
 * @returns {string} HTML content
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ========================================
// NAVIGATION & ROUTING
// ========================================

/**
 * Mendapatkan daftar menu sidebar
 * @returns {Array} Menu items
 */
function getMenuItems() {
  return [
    { id: "dashboard", label: "Dashboard", icon: "dashboard", order: 1 },
    { id: "generator", label: "Teacher Generator", icon: "auto_awesome", order: 2 },
    { id: "master-data", label: "Master Data", icon: "database", order: 3 },
    { id: "perangkat-ajar", label: "Perangkat Ajar", icon: "description", order: 4 },
    { id: "asesmen", label: "Asesmen", icon: "assignment", order: 5 },
    { id: "jurnal", label: "Jurnal", icon: "book", order: 6 },
    { id: "bank-permainan", label: "Bank Permainan", icon: "sports_soccer", order: 7 },
    { id: "administrasi", label: "Administrasi", icon: "folder_shared", order: 8 },
    { id: "export", label: "Export", icon: "file_download", order: 9 },
    { id: "backup", label: "Backup", icon: "backup", order: 10 },
    { id: "setting", label: "Setting", icon: "settings", order: 11 },
    { id: "tentang", label: "Tentang", icon: "info", order: 12 }
  ];
}

/**
 * Mendapatkan data untuk dashboard
 * @returns {Object} Dashboard data
 */
function getDashboardData() {
  try {
    const data = {
      summary: {
        total_modul: countRecords(DB_CONFIG.SHEETS.MODUL_AJAR),
        total_guru: countRecords(DB_CONFIG.SHEETS.GURU),
        total_kelas: countRecords(DB_CONFIG.SHEETS.MATERI, { status: DB_CONFIG.STATUS.ACTIVE }),
        total_tp: countRecords(DB_CONFIG.SHEETS.TP),
        total_cp: countRecords(DB_CONFIG.SHEETS.CP),
        total_permainan: countRecords(DB_CONFIG.SHEETS.BANK_PERMAINAN),
        total_jurnal: countRecords(DB_CONFIG.SHEETS.JURNAL),
        total_soal: countRecords(DB_CONFIG.SHEETS.BANK_SOAL)
      },
      recent_moduls: getAllRecords(DB_CONFIG.SHEETS.MODUL_AJAR, {
        sortBy: "created_at",
        sortOrder: "desc",
        limit: 5
      }),
      recent_journals: getAllRecords(DB_CONFIG.SHEETS.JURNAL, {
        sortBy: "tanggal",
        sortOrder: "desc",
        limit: 5
      }),
      statistics: {
        modul_by_class: getClassDistribution(),
        modul_by_month: getMonthlyDistribution(),
        jurnal_by_type: getJurnalDistribution()
      }
    };
    
    return { success: true, data: data };
  } catch (e) {
    logError("getDashboardData", e);
    return { success: false, error: e.message };
  }
}

/**
 * Get distribusi modul per kelas
 * @returns {Array} Distribution data
 */
function getClassDistribution() {
  const moduls = getAllRecords(DB_CONFIG.SHEETS.MODUL_AJAR);
  const distribution = {};
  
  moduls.forEach(modul => {
    const kelas = modul.kelas || "Lainnya";
    distribution[kelas] = (distribution[kelas] || 0) + 1;
  });
  
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
}

/**
 * Get distribusi modul per bulan
 * @returns {Array} Monthly distribution
 */
function getMonthlyDistribution() {
  const moduls = getAllRecords(DB_CONFIG.SHEETS.MODUL_AJAR);
  const distribution = {};
  
  moduls.forEach(modul => {
    const date = new Date(modul.created_at);
    const monthKey = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM");
    distribution[monthKey] = (distribution[monthKey] || 0) + 1;
  });
  
  return Object.entries(distribution)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([name, value]) => ({ name, value }));
}

/**
 * Get distribusi jurnal per jenis
 * @returns {Array} Journal distribution
 */
function getJurnalDistribution() {
  const journals = getAllRecords(DB_CONFIG.SHEETS.JURNAL);
  const distribution = {};
  
  journals.forEach(journal => {
    const type = journal.jenis_jurnal || "Lainnya";
    distribution[type] = (distribution[type] || 0) + 1;
  });
  
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
}

// ========================================
// MASTER DATA FUNCTIONS
// ========================================

/**
 * Get semua data master
 * @returns {Object} Master data
 */
function getMasterData() {
  try {
    return {
      success: true,
      data: {
        sekolah: getAllRecords(DB_CONFIG.SHEETS.SEKOLAH),
        guru: getAllRecords(DB_CONFIG.SHEETS.GURU),
        tahun_ajaran: getAllRecords(DB_CONFIG.SHEETS.TAHUN_AJARAN),
        semester: getAllRecords(DB_CONFIG.SHEETS.SEMESTER),
        fase: getAllRecords(DB_CONFIG.SHEETS.FASE),
        cp: getAllRecords(DB_CONFIG.SHEETS.CP),
        tp: getAllRecords(DB_CONFIG.SHEETS.TP),
        atp: getAllRecords(DB_CONFIG.SHEETS.ATP),
        materi: getAllRecords(DB_CONFIG.SHEETS.MATERI)
      }
    };
  } catch (e) {
    logError("getMasterData", e);
    return { success: false, error: e.message };
  }
}

/**
 * Save data master
 * @param {string} sheetName - Nama sheet
 * @param {Object} data - Data to save
 * @returns {Object} Result
 */
function saveMasterData(sheetName, data) {
  try {
    const id = createRecord(sheetName, data);
    
    if (id) {
      return { success: true, id: id, message: "Data berhasil disimpan" };
    }
    
    return { success: false, message: "Gagal menyimpan data" };
  } catch (e) {
    logError("saveMasterData", e);
    return { success: false, error: e.message };
  }
}

/**
 * Update data master
 * @param {string} sheetName - Nama sheet
 * @param {string} id - Record ID
 * @param {Object} data - Data to update
 * @returns {Object} Result
 */
function updateMasterData(sheetName, id, data) {
  try {
    const success = updateRecord(sheetName, id, data);
    
    if (success) {
      return { success: true, message: "Data berhasil diupdate" };
    }
    
    return { success: false, message: "Gagal mengupdate data" };
  } catch (e) {
    logError("updateMasterData", e);
    return { success: false, error: e.message };
  }
}

/**
 * Delete data master
 * @param {string} sheetName - Nama sheet
 * @param {string} id - Record ID
 * @returns {Object} Result
 */
function deleteMasterData(sheetName, id) {
  try {
    const success = deleteRecord(sheetName, id);
    
    if (success) {
      return { success: true, message: "Data berhasil dihapus" };
    }
    
    return { success: false, message: "Gagal menghapus data" };
  } catch (e) {
    logError("deleteMasterData", e);
    return { success: false, error: e.message };
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Get konfigurasi untuk dropdown/options
 * @returns {Object} Config options
 */
function getConfigOptions() {
  return {
    jenjang: PJOK_CONFIG.JENJANG,
    kelas_fase: PJOK_CONFIG.KELAS_FASE,
    semester: PJOK_CONFIG.SEMESTER,
    komponen_materi: PJOK_CONFIG.KOMPONEN_MATERI,
    model_pembelajaran: PJOK_CONFIG.MODEL_PEMBELAJARAN,
    pendekatan: PJOK_CONFIG.PENDEKATAN,
    metode: PJOK_CONFIG.METODE,
    media: PJOK_CONFIG.MEDIA,
    profil_pancasila: PJOK_CONFIG.PROFIL_PANCASILA,
    target_peserta_didik: PJOK_CONFIG.TARGET_PESERTA_DIDIK
  };
}

/**
 * Format response untuk client
 * @param {boolean} success - Success flag
 * @param {any} data - Response data
 * @param {string} message - Message
 * @returns {Object} Formatted response
 */
function formatResponse(success, data = null, message = "") {
  const response = {
    success: success,
    timestamp: new Date().toISOString()
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  if (message) {
    response.message = message;
  }
  
  return response;
}

/**
 * Validate required fields
 * @param {Object} data - Data object
 * @param {Array} requiredFields - Required field names
 * @returns {Object} Validation result
 */
function validateRequired(data, requiredFields) {
  const missing = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === "") {
      missing.push(field);
    }
  });
  
  return {
    valid: missing.length === 0,
    missing: missing
  };
}

// ========================================
// AUTHENTICATION (Simple)
// ========================================

/**
 * Login user
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Object} Login result
 */
function login(username, password) {
  try {
    const users = getAllRecords(DB_CONFIG.SHEETS.USER);
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      if (user.status !== DB_CONFIG.STATUS.ACTIVE) {
        return { success: false, message: "User tidak aktif" };
      }
      
      // Update last login
      updateRecord(DB_CONFIG.SHEETS.USER, user.id, {
        last_login: new Date()
      });
      
      // Create simple session (in production, use proper session management)
      const sessionData = {
        user_id: user.id,
        username: user.username,
        nama_lengkap: user.nama_lengkap,
        role: user.role,
        login_time: new Date()
      };
      
      PropertiesService.getUserProperties().setProperty(
        "current_session",
        JSON.stringify(sessionData)
      );
      
      return {
        success: true,
        message: "Login berhasil",
        data: sessionData
      };
    }
    
    return { success: false, message: "Username atau password salah" };
  } catch (e) {
    logError("login", e);
    return { success: false, error: e.message };
  }
}

/**
 * Logout user
 * @returns {Object} Logout result
 */
function logout() {
  try {
    PropertiesService.getUserProperties().deleteProperty("current_session");
    return { success: true, message: "Logout berhasil" };
  } catch (e) {
    logError("logout", e);
    return { success: false, error: e.message };
  }
}

/**
 * Get current session
 * @returns {Object|null} Session data
 */
function getCurrentSession() {
  try {
    const sessionData = PropertiesService.getUserProperties().getProperty("current_session");
    
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    
    return null;
  } catch (e) {
    logError("getCurrentSession", e);
    return null;
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean} Is authenticated
 */
function isAuthenticated() {
  return getCurrentSession() !== null;
}

// ========================================
// APP INITIALIZATION
// ========================================

/**
 * Initialize app (called on first run)
 * @returns {Object} Init result
 */
function initializeApp() {
  try {
    const success = initializeDatabase();
    
    if (success) {
      // Seed default data if needed
      seedDefaultData();
      
      return {
        success: true,
        message: "Aplikasi berhasil diinisialisasi"
      };
    }
    
    return {
      success: false,
      message: "Gagal menginisialisasi aplikasi"
    };
  } catch (e) {
    logError("initializeApp", e);
    return {
      success: false,
      error: e.message
    };
  }
}

/**
 * Seed default data
 */
function seedDefaultData() {
  try {
    // Seed Fase
    const fases = [
      { id: "fase_a", nama_fase: "Fase A", kelas: "1-2", deskripsi: "Kelas 1 dan 2 SD" },
      { id: "fase_b", nama_fase: "Fase B", kelas: "3-4", deskripsi: "Kelas 3 dan 4 SD" },
      { id: "fase_c", nama_fase: "Fase C", kelas: "5-6", deskripsi: "Kelas 5 dan 6 SD" }
    ];
    
    fases.forEach(fase => {
      if (countRecords(DB_CONFIG.SHEETS.FASE, { id: fase.id }) === 0) {
        createRecord(DB_CONFIG.SHEETS.FASE, fase);
      }
    });
    
    // Seed default admin user
    const adminExists = countRecords(DB_CONFIG.SHEETS.USER, { username: "admin" });
    if (adminExists === 0) {
      createRecord(DB_CONFIG.SHEETS.USER, {
        username: "admin",
        password: "admin123", // Should be changed on first login
        nama_lengkap: "Administrator",
        email: "admin@school.com",
        role: "admin",
        status: DB_CONFIG.STATUS.ACTIVE
      });
    }
    
    logInfo("seedDefaultData", "Default data seeded successfully");
  } catch (e) {
    logError("seedDefaultData", e);
  }
}
