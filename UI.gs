/**
 * UI.gs - Handler untuk rendering halaman HTML
 * Bagian dari Teacher Generator PJOK SD
 * 
 * @fileoverview Mengelola routing view dan rendering template HTML
 */

/**
 * Render halaman utama (Index)
 * @return {HtmlOutput} Halaman HTML yang dirender
 */
function getIndex() {
  try {
    const template = HtmlService.createHtmlOutputFromFile('UI');
    return template
      .setTitle('Teacher Generator PJOK SD')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .addMetaTag('theme-color', '#4285F4');
  } catch (e) {
    Logger.log('Error rendering index: ' + e.toString());
    throw e;
  }
}

/**
 * Render halaman Dashboard
 * @return {HtmlOutput} Halaman Dashboard
 */
function getDashboardView() {
  return HtmlService.createHtmlOutputFromFile('Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Generator
 * @return {HtmlOutput} Halaman Generator
 */
function getGeneratorView() {
  return HtmlService.createHtmlOutputFromFile('Generator')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Master Data
 * @return {HtmlOutput} Halaman Master Data
 */
function getMasterDataView() {
  return HtmlService.createHtmlOutputFromFile('MasterData')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Perangkat Ajar
 * @return {HtmlOutput} Halaman Perangkat Ajar
 */
function getPerangkatAjarView() {
  return HtmlService.createHtmlOutputFromFile('PerangkatAjar')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Asesmen
 * @return {HtmlOutput} Halaman Asesmen
 */
function getAsesmenView() {
  return HtmlService.createHtmlOutputFromFile('Asesmen')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Jurnal
 * @return {HtmlOutput} Halaman Jurnal
 */
function getJurnalView() {
  return HtmlService.createHtmlOutputFromFile('Jurnal')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Bank Permainan
 * @return {HtmlOutput} Halaman Bank Permainan
 */
function getBankPermainanView() {
  return HtmlService.createHtmlOutputFromFile('BankPermainan')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Administrasi
 * @return {HtmlOutput} Halaman Administrasi
 */
function getAdministrasiView() {
  return HtmlService.createHtmlOutputFromFile('Administrasi')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Export
 * @return {HtmlOutput} Halaman Export
 */
function getExportView() {
  return HtmlService.createHtmlOutputFromFile('Export')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Backup
 * @return {HtmlOutput} Halaman Backup
 */
function getBackupView() {
  return HtmlService.createHtmlOutputFromFile('Backup')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Setting
 * @return {HtmlOutput} Halaman Setting
 */
function getSettingView() {
  return HtmlService.createHtmlOutputFromFile('Setting')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Tentang
 * @return {HtmlOutput} Halaman Tentang
 */
function getTentangView() {
  return HtmlService.createHtmlOutputFromFile('Tentang')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Render halaman Login
 * @return {HtmlOutput} Halaman Login
 */
function getLoginView() {
  return HtmlService.createHtmlOutputFromFile('Login')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Include file HTML lain ke dalam template utama
 * @param {string} filename - Nama file HTML tanpa ekstensi
 * @return {string} Konten file HTML
 */
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (e) {
    Logger.log('Error including file: ' + filename + ' - ' + e.toString());
    return '<!-- Error loading ' + filename + ' -->';
  }
}

/**
 * Get common template parts
 * @param {string} part - Bagian template (sidebar, header, dll)
 * @return {string} HTML content
 */
function getTemplatePart(part) {
  const validParts = ['sidebar', 'header', 'footer', 'modals', 'scripts'];
  if (validParts.indexOf(part) === -1) {
    return '<!-- Invalid template part -->';
  }
  
  try {
    return HtmlService.createHtmlOutputFromFile('Template_' + part).getContent();
  } catch (e) {
    return '<!-- Error loading template part: ' + part + ' -->';
  }
}
