/**
 * Teacher Generator PJOK SD
 * File: Code.gs
 * Deskripsi: Entry point aplikasi, menangani doGet, doPost, dan inisialisasi
 * Author: Senior Google Apps Script Developer
 * Version: 1.0.0
 */

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
    
    var template;
    if (page === 'login') {
      template = HtmlService.createHtmlOutputFromFile('Login');
    } else {
      template = HtmlService.createHtmlOutputFromFile('UI');
    }
    
    return template
      .setTitle('Teacher Generator PJOK SD')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
      
  } catch (error) {
    Logger.log('Error on doGet: ' + error.toString());
    return HtmlService.createHtmlOutput('<h1>Error</h1><p>' + error.message + '</p>');
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
 */
function initDatabase() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    var sheets = [
      'USERS', 'SEKOLAH', 'GURU', 'TAHUN_AJARAN', 'SEMESTER', 
      'FASE', 'CP', 'TP', 'MATERI', 'MODUL_AJAR', 
      'ASSESMEN', 'KKTP', 'BANK_SOAL', 'BANK_PERMAINAN', 
      'MEDIA', 'JURNAL', 'LOG', 'BACKUP', 'TEMPLATE', 'SETTINGS'
    ];
    
    sheets.forEach(function(sheetName) {
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        ss.insertSheet(sheetName);
        Logger.log('Sheet created: ' + sheetName);
      }
    });
    
    initHeaders();
    initDefaultSettings();
    
    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    Logger.log('Error initializing database: ' + error.toString());
    return { success: false, message: error.message };
  }
}