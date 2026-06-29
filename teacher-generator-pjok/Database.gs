/**
 * Database.gs - Manajemen Database Google Spreadsheet
 * 
 * File ini berisi semua fungsi untuk operasi database termasuk:
 * - Inisialisasi database dan sheet
 * - CRUD operations (Create, Read, Update, Delete)
 * - Query dan filter data
 * - Import/Export data
 * - Backup dan restore
 */

// ========================================
// INISIALISASI DATABASE
// ========================================

/**
 * Mendapatkan spreadsheet database
 * @returns {Spreadsheet} Spreadsheet object
 */
function getDatabase() {
  const dbId = getSetting("DATABASE_ID");
  
  if (!dbId) {
    // Jika belum ada database ID, gunakan spreadsheet aktif
    return SpreadsheetApp.getActiveSpreadsheet();
  }
  
  try {
    return SpreadsheetApp.openById(dbId);
  } catch (e) {
    logError("getDatabase", e);
    return SpreadsheetApp.getActiveSpreadsheet();
  }
}

/**
 * Inisialisasi semua sheet dalam database
 * @returns {boolean} True jika berhasil
 */
function initializeDatabase() {
  try {
    const ss = getDatabase();
    
    // Simpan database ID ke setting
    setSetting("DATABASE_ID", ss.getId());
    setSetting("DATABASE_INITIALIZED", true);
    setSetting("INITIALIZED_DATE", new Date());
    
    // Daftar semua sheet yang perlu dibuat
    const sheetsToCreate = Object.values(DB_CONFIG.SHEETS);
    
    sheetsToCreate.forEach(sheetName => {
      let sheet = ss.getSheetByName(sheetName);
      
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        logInfo("initializeDatabase", `Sheet ${sheetName} berhasil dibuat`);
      }
      
      // Inisialisasi struktur sheet berdasarkan nama
      initializeSheetStructure(sheetName, sheet);
    });
    
    logInfo("initializeDatabase", "Database initialization completed");
    return true;
  } catch (e) {
    logError("initializeDatabase", e);
    return false;
  }
}

/**
 * Inisialisasi struktur sheet berdasarkan nama
 * @param {string} sheetName - Nama sheet
 * @param {Sheet} sheet - Sheet object
 */
function initializeSheetStructure(sheetName, sheet) {
  switch (sheetName) {
    case DB_CONFIG.SHEETS.SETTING:
      sheet.appendRow(["key", "value", "updated_at"]);
      break;
      
    case DB_CONFIG.SHEETS.USER:
      sheet.appendRow([
        "id", "username", "password", "nama_lengkap", "email", 
        "role", "status", "created_at", "updated_at", "last_login"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.SEKOLAH:
      sheet.appendRow([
        "id", "npsn", "nama_sekolah", "alamat", "kelurahan", "kecamatan",
        "kota", "provinsi", "kode_pos", "telepon", "email", "website",
        "kepala_sekolah", "nip_kepala_sekolah", "status", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.GURU:
      sheet.appendRow([
        "id", "nip", "nama_lengkap", "gelar_depan", "gelar_belakang",
        "tempat_lahir", "tanggal_lahir", "jenis_kelamin", "agama",
        "alamat", "telepon", "email", "foto", "pendidikan_terakhir",
        "jurusan", "universitas", "tahun_lulus", "nomor_sertifikasi",
        "status", "sekolah_id", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.TAHUN_AJARAN:
      sheet.appendRow([
        "id", "nama_tahun", "tahun_mulai", "tahun_selesai",
        "semester_ganjil_mulai", "semester_ganjil_selesai",
        "semester_genap_mulai", "semester_genap_selesai",
        "status", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.SEMESTER:
      sheet.appendRow([
        "id", "nama_semester", "tahun_ajaran_id", "urutan",
        "tanggal_mulai", "tanggal_selesai", "status", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.FASE:
      sheet.appendRow([
        "id", "nama_fase", "kelas", "deskripsi", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.CP:
      sheet.appendRow([
        "id", "fase_id", "kompetensi", "elemen", "capaian_pembelajaran",
        "mata_pelajaran", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.TP:
      sheet.appendRow([
        "id", "cp_id", "tujuan_pembelajaran", "indikator",
        "mata_pelajaran", "fase_id", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.ATP:
      sheet.appendRow([
        "id", "tp_id", "alokasi_waktu", "urutan", "keterangan",
        "materi_pokok", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.MATERI:
      sheet.appendRow([
        "id", "nama_materi", "komponen", "kelas", "fase_id",
        "deskripsi", "tujuan", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.MODUL_AJAR:
      sheet.appendRow([
        "id", "judul", "guru_id", "sekolah_id", "kelas", "semester",
        "fase_id", "materi_id", "jam_pelajaran", "model_pembelajaran",
        "pendekatan", "metode", "media", "profil_pancasila",
        "target_peserta_didik", "cp", "tp", "atp", "kktp",
        "tujuan_pembelajaran", "pemahaman_bermakna", "pertanyaan_pemantik",
        "persiapan_guru", "kegiatan_awal", "kegiatan_inti", "kegiatan_penutup",
        "asesmen_diagnostik", "asesmen_formatif", "asesmen_sumatif",
        "rubrik", "pengayaan", "remedial", "refleksi_guru",
        "refleksi_peserta_didik", "lampiran", "lkpd", "daftar_pustaka",
        "status", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.ASSESMEN:
      sheet.appendRow([
        "id", "modul_ajar_id", "jenis_assesmen", "bentuk_assesmen",
        "instrumen", "rubrik", "kriteria", "skor_maksimal",
        "kktp", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.KKTP:
      sheet.appendRow([
        "id", "tp_id", "kriteria", "indikator", "deskripsi",
        "skor", "kategori", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.BANK_SOAL:
      sheet.appendRow([
        "id", "mata_pelajaran", "kelas", "fase_id", "materi",
        "kompetensi", "jenis_soal", "bentuk_soal", "soal",
        "pilihan_a", "pilihan_b", "pilihan_c", "pilihan_d",
        "pilihan_e", "kunci_jawaban", "pembahasan", "tingkat_kesulitan",
        "skor", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.BANK_PERMAINAN:
      sheet.appendRow([
        "id", "nama_permainan", "kategori", "kelas", "fase_id",
        "tujuan", "alat_bahan", "aturan_permainan", "langkah_langkah",
        "durasi", "jumlah_pemain", "variasi", "safety_tips",
        "nilai_pendidikan", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.MEDIA:
      sheet.appendRow([
        "id", "nama_media", "jenis", "kelas", "fase_id", "materi",
        "deskripsi", "file_url", "thumbnail_url", "durasi",
        "ukuran_file", "format", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.JURNAL:
      sheet.appendRow([
        "id", "jenis_jurnal", "guru_id", "tanggal", "kelas",
        "materi", "jam_ke", "kehadiran_siswa", "catatan",
        "refleksi", "tindak_lanjut", "created_at", "updated_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.LOG:
      sheet.appendRow(["timestamp", "level", "source", "message"]);
      break;
      
    case DB_CONFIG.SHEETS.BACKUP:
      sheet.appendRow([
        "id", "backup_name", "backup_date", "file_id", "file_url",
        "size", "status", "description", "created_at"
      ]);
      break;
      
    case DB_CONFIG.SHEETS.TEMPLATE:
      sheet.appendRow([
        "id", "nama_template", "jenis", "kategori", "deskripsi",
        "file_id", "file_url", "content", "variables",
        "status", "created_at", "updated_at"
      ]);
      break;
  }
  
  // Format header row
  if (sheet.getLastRow() > 0) {
    const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    headerRange.setBackground("#4285F4");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
  }
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

// ========================================
// CRUD OPERATIONS
// ========================================

/**
 * Create/Insert record baru
 * @param {string} sheetName - Nama sheet
 * @param {Object} data - Data object
 * @returns {string|null} ID record atau null jika gagal
 */
function createRecord(sheetName, data) {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      throw new Error(`Sheet ${sheetName} tidak ditemukan`);
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowData = [];
    
    // Generate ID jika kolom id ada
    const hasId = headers.includes("id");
    if (hasId && !data.id) {
      data.id = generateId();
    }
    
    // Auto timestamp
    const now = new Date();
    if (headers.includes("created_at") && !data.created_at) {
      data.created_at = now;
    }
    if (headers.includes("updated_at")) {
      data.updated_at = now;
    }
    
    // Map data ke urutan kolom
    headers.forEach(header => {
      rowData.push(data[header] || "");
    });
    
    sheet.appendRow(rowData);
    logDebug("createRecord", `Record created in ${sheetName} with ID: ${data.id}`);
    
    return data.id;
  } catch (e) {
    logError("createRecord", e);
    return null;
  }
}

/**
 * Read/Get record by ID
 * @param {string} sheetName - Nama sheet
 * @param {string} id - ID record
 * @returns {Object|null} Data record atau null
 */
function getRecordById(sheetName, id) {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) return null;
    
    const data = getAllRecords(sheetName);
    return data.find(record => record.id === id) || null;
  } catch (e) {
    logError("getRecordById", e);
    return null;
  }
}

/**
 * Get all records from sheet
 * @param {string} sheetName - Nama sheet
 * @param {Object} options - Options (limit, offset, sortBy, sortOrder)
 * @returns {Array} Array of records
 */
function getAllRecords(sheetName, options = {}) {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) return [];
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) return [];
    
    const headers = data[0];
    const records = [];
    
    for (let i = 1; i < data.length; i++) {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = data[i][index];
      });
      records.push(record);
    }
    
    // Apply sorting
    if (options.sortBy) {
      records.sort((a, b) => {
        const aVal = a[options.sortBy];
        const bVal = b[options.sortBy];
        
        if (options.sortOrder === "desc") {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      });
    }
    
    // Apply pagination
    const limit = options.limit || records.length;
    const offset = options.offset || 0;
    
    return records.slice(offset, offset + limit);
  } catch (e) {
    logError("getAllRecords", e);
    return [];
  }
}

/**
 * Update record by ID
 * @param {string} sheetName - Nama sheet
 * @param {string} id - ID record
 * @param {Object} data - Data to update
 * @returns {boolean} True if success
 */
function updateRecord(sheetName, id, data) {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      throw new Error(`Sheet ${sheetName} tidak ditemukan`);
    }
    
    const allData = sheet.getDataRange().getValues();
    const headers = allData[0];
    const idIndex = headers.indexOf("id");
    
    if (idIndex === -1) {
      throw new Error("Kolom id tidak ditemukan");
    }
    
    // Find row
    let rowIndex = -1;
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][idIndex] === id) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) {
      throw new Error("Record tidak ditemukan");
    }
    
    // Update fields
    data.updated_at = new Date();
    
    headers.forEach((header, colIndex) => {
      if (data.hasOwnProperty(header)) {
        sheet.getRange(rowIndex, colIndex + 1).setValue(data[header]);
      }
    });
    
    logDebug("updateRecord", `Record updated in ${sheetName} with ID: ${id}`);
    return true;
  } catch (e) {
    logError("updateRecord", e);
    return false;
  }
}

/**
 * Delete record by ID
 * @param {string} sheetName - Nama sheet
 * @param {string} id - ID record
 * @returns {boolean} True if success
 */
function deleteRecord(sheetName, id) {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      throw new Error(`Sheet ${sheetName} tidak ditemukan`);
    }
    
    const allData = sheet.getDataRange().getValues();
    const headers = allData[0];
    const idIndex = headers.indexOf("id");
    
    if (idIndex === -1) {
      throw new Error("Kolom id tidak ditemukan");
    }
    
    // Find row
    let rowIndex = -1;
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][idIndex] === id) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) {
      throw new Error("Record tidak ditemukan");
    }
    
    // Delete row
    sheet.deleteRow(rowIndex);
    
    logDebug("deleteRecord", `Record deleted in ${sheetName} with ID: ${id}`);
    return true;
  } catch (e) {
    logError("deleteRecord", e);
    return false;
  }
}

/**
 * Search records with filters
 * @param {string} sheetName - Nama sheet
 * @param {Object} filters - Filter object
 * @returns {Array} Filtered records
 */
function searchRecords(sheetName, filters = {}) {
  try {
    const records = getAllRecords(sheetName);
    
    if (Object.keys(filters).length === 0) {
      return records;
    }
    
    return records.filter(record => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === null || value === undefined) return true;
        return record[key] == value;
      });
    });
  } catch (e) {
    logError("searchRecords", e);
    return [];
  }
}

/**
 * Count records in sheet
 * @param {string} sheetName - Nama sheet
 * @param {Object} filters - Optional filters
 * @returns {number} Count of records
 */
function countRecords(sheetName, filters = {}) {
  try {
    const records = filters && Object.keys(filters).length > 0 
      ? searchRecords(sheetName, filters)
      : getAllRecords(sheetName);
    
    return records.length;
  } catch (e) {
    logError("countRecords", e);
    return 0;
  }
}

// ========================================
// IMPORT/EXPORT FUNCTIONS
// ========================================

/**
 * Export sheet data to CSV
 * @param {string} sheetName - Nama sheet
 * @returns {string} CSV content
 */
function exportToCsv(sheetName) {
  try {
    const records = getAllRecords(sheetName);
    
    if (records.length === 0) {
      return "";
    }
    
    const headers = Object.keys(records[0]);
    const csvRows = [];
    
    // Header row
    csvRows.push(headers.join(","));
    
    // Data rows
    records.forEach(record => {
      const row = headers.map(header => {
        const value = record[header];
        // Escape quotes and wrap in quotes if contains comma
        const strValue = String(value || "");
        if (strValue.includes(",") || strValue.includes('"') || strValue.includes("\n")) {
          return `"${strValue.replace(/"/g, '""')}"`;
        }
        return strValue;
      });
      csvRows.push(row.join(","));
    });
    
    return csvRows.join("\n");
  } catch (e) {
    logError("exportToCsv", e);
    return "";
  }
}

/**
 * Import data from CSV
 * @param {string} sheetName - Nama sheet
 * @param {string} csvContent - CSV content
 * @param {boolean} skipHeader - Skip header row
 * @returns {number} Number of imported records
 */
function importFromCsv(sheetName, csvContent, skipHeader = true) {
  try {
    const ss = getDatabase();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      throw new Error(`Sheet ${sheetName} tidak ditemukan`);
    }
    
    const lines = csvContent.split("\n");
    const headers = skipHeader ? null : lines[0].split(",");
    const startIndex = skipHeader ? 0 : 1;
    
    let importedCount = 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Simple CSV parsing (doesn't handle quoted commas)
      const values = line.split(",");
      
      if (skipHeader) {
        // First row becomes headers
        const rowData = values.map(v => v.replace(/^"|"$/g, "").replace(/""/g, '"'));
        sheet.appendRow(rowData);
      } else {
        // Map to existing headers
        const record = {};
        headers.forEach((header, index) => {
          record[header.trim()] = values[index] ? values[index].replace(/^"|"$/g, "").replace(/""/g, '"') : "";
        });
        
        createRecord(sheetName, record);
      }
      
      importedCount++;
    }
    
    logInfo("importFromCsv", `Imported ${importedCount} records to ${sheetName}`);
    return importedCount;
  } catch (e) {
    logError("importFromCsv", e);
    return 0;
  }
}

// ========================================
// BACKUP & RESTORE
// ========================================

/**
 * Create backup of entire database
 * @returns {Object} Backup info
 */
function createBackup() {
  try {
    const ss = getDatabase();
    const backupName = `Backup_${formatTimestamp(new Date())}`;
    
    // Create backup folder if not exists
    const folder = getOrCreateDriveFolder(API_CONFIG.DRIVE_FOLDER_NAME);
    const backupFolder = getOrCreateDriveFolder(API_CONFIG.BACKUP_FOLDER_NAME, folder.getId());
    
    // Create copy of spreadsheet
    const backupFile = DriveApp.getFileById(ss.getId()).makeCopy(backupName);
    backupFolder.addFile(backupFile);
    
    // Record backup info
    const backupInfo = {
      id: generateId(),
      backup_name: backupName,
      backup_date: new Date(),
      file_id: backupFile.getId(),
      file_url: backupFile.getUrl(),
      size: backupFile.getSize(),
      status: "completed",
      description: "Full database backup"
    };
    
    createRecord(DB_CONFIG.SHEETS.BACKUP, backupInfo);
    
    // Cleanup old backups
    cleanupOldBackups();
    
    logInfo("createBackup", `Backup created: ${backupName}`);
    return backupInfo;
  } catch (e) {
    logError("createBackup", e);
    return null;
  }
}

/**
 * Restore database from backup
 * @param {string} backupId - Backup ID
 * @returns {boolean} True if success
 */
function restoreBackup(backupId) {
  try {
    const backup = getRecordById(DB_CONFIG.SHEETS.BACKUP, backupId);
    
    if (!backup) {
      throw new Error("Backup tidak ditemukan");
    }
    
    const backupFile = DriveApp.getFileById(backup.file_id);
    const currentSs = getDatabase();
    
    // Create temporary copy
    const tempFile = backupFile.makeCopy("Temp_Restore");
    const tempSs = SpreadsheetApp.open(tempFile);
    
    // Copy all sheets
    const sheets = tempSs.getSheets();
    sheets.forEach(sheet => {
      const sheetName = sheet.getName();
      let targetSheet = currentSs.getSheetByName(sheetName);
      
      if (targetSheet) {
        currentSs.deleteSheet(targetSheet);
      }
      
      const newSheet = sheet.copyTo(currentSs);
      newSheet.setName(sheetName);
    });
    
    // Delete temp file
    DriveApp.getFileById(tempFile.getId()).setTrashed(true);
    
    logInfo("restoreBackup", `Database restored from backup: ${backup.backup_name}`);
    return true;
  } catch (e) {
    logError("restoreBackup", e);
    return false;
  }
}

/**
 * Cleanup old backups
 */
function cleanupOldBackups() {
  try {
    const backups = getAllRecords(DB_CONFIG.SHEETS.BACKUP, {
      sortBy: "backup_date",
      sortOrder: "desc"
    });
    
    if (backups.length > BACKUP_CONFIG.MAX_BACKUP_FILES) {
      const toDelete = backups.slice(BACKUP_CONFIG.MAX_BACKUP_FILES);
      
      toDelete.forEach(backup => {
        try {
          const file = DriveApp.getFileById(backup.file_id);
          file.setTrashed(true);
          deleteRecord(DB_CONFIG.SHEETS.BACKUP, backup.id);
        } catch (e) {
          logWarning("cleanupOldBackups", `Failed to delete backup: ${backup.id}`);
        }
      });
    }
  } catch (e) {
    logError("cleanupOldBackups", e);
  }
}

/**
 * Get or create Drive folder
 * @param {string} folderName - Folder name
 * @param {string} parentFolderId - Parent folder ID (optional)
 * @returns {Folder} Drive folder
 */
function getOrCreateDriveFolder(folderName, parentFolderId = null) {
  try {
    let folders;
    
    if (parentFolderId) {
      const parent = DriveApp.getFolderById(parentFolderId);
      folders = parent.getFoldersByName(folderName);
    } else {
      folders = DriveApp.getFoldersByName(folderName);
    }
    
    if (folders.hasNext()) {
      return folders.next();
    }
    
    // Create new folder
    if (parentFolderId) {
      const parent = DriveApp.getFolderById(parentFolderId);
      return parent.createFolder(folderName);
    }
    
    return DriveApp.createFolder(folderName);
  } catch (e) {
    logError("getOrCreateDriveFolder", e);
    return null;
  }
}
