/**
 * GerakPintar - Platform Administrasi PJOK SD Berbasis Kurikulum Merdeka
 * Author: Principal Software Architect Team
 * 
 * Konfigurasi Awal:
 * 1. Buat Google Sheet baru.
 * 2. Buat Sheet bernama: "Siswa", "Kelas", "ModulAjar", "Asesmen".
 * 3. Salin ID Spreadsheet ke variabel SPREADSHEET_ID di bawah.
 * 4. Aktifkan Advanced Service "Google Sheets API" dan "AI Service" (jika tersedia) atau gunakan UrlFetchApp untuk Gemini API.
 */

const SPREADSHEET_ID = 'GANTI_DENGAN_ID_SPREADSHEET_ANDA'; 
const GEMINI_API_KEY = 'GANTI_DENGAN_API_KEY_GEMINI_ANDA'; // Dapatkan dari aistudio.google.com

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('GerakPintar - Admin PJOK')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * API Endpoint: Mengambil Data Dashboard
 * Digunakan oleh frontend untuk memuat statistik awal
 */
function getDashboardData() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetSiswa = ss.getSheetByName('Siswa');
    const sheetModul = ss.getSheetByName('ModulAjar');
    
    // Hitung statistik sederhana
    const totalSiswa = sheetSiswa ? sheetSiswa.getLastRow() - 1 : 0;
    const totalModul = sheetModul ? sheetModul.getLastRow() - 1 : 0;
    
    // Ambil data grafik sederhana (contoh: distribusi nilai terbaru)
    // Logika real akan lebih kompleks dengan query data
    
    return {
      success: true,
      data: {
        totalSiswa: totalSiswa,
        totalModul: totalModul,
        kelasAktif: ['1A', '2B', '3A', '4C', '5B', '6A'], // Dummy data for now
        recentActivity: [
          { action: 'Modul Ajar Dibuat', time: '10 menit lalu', user: 'Bu Guru' },
          { action: 'Nilai Lari 50m Input', time: '1 jam lalu', user: 'Pak Guru' }
        ]
      }
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

/**
 * AI Feature: Generator Modul Ajar Kurikulum Merdeka
 * Menerima parameter tujuan pembelajaran dan menghasilkan draf modul.
 */
function generateModulAjarAI(topik, kelas, alokasiWaktu) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'GANTI_DENGAN_API_KEY_GEMINI_ANDA') {
    throw new Error("API Key Gemini belum dikonfigurasi di Code.gs");
  }

  const prompt = `
    Bertindaklah sebagai ahli kurikulum PJOK SD Indonesia (Kurikulum Merdeka).
    Buatkan draf Modul Ajar singkat untuk:
    - Topik: ${topik}
    - Kelas: ${kelas} SD
    - Alokasi Waktu: ${alokasiWaktu}
    
    Format output dalam JSON dengan struktur:
    {
      "tujuanPembelajaran": "...",
      "langkahKegiatan": ["...", "...", "..."],
      "asesmenFormatif": "...",
      "saranaPrasarana": ["...", "..."]
    }
    Pastikan bahasa Indonesia yang digunakan santai namun profesional untuk guru SD.
  `;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  if (jsonResponse.candidates && jsonResponse.candidates[0].content) {
    let textResponse = jsonResponse.candidates[0].content.parts[0].text;
    // Bersihkan markdown code block jika ada
    textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(textResponse);
  } else {
    throw new Error("Gagal menghasilkan konten AI: " + JSON.stringify(jsonResponse));
  }
}

/**
 * Database Operation: Simpan Modul Ajar ke Sheet
 */
function saveModulAjarToSheet(modulData) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('ModulAjar');
    
    // Jika sheet belum ada, buat baru dengan header
    if (!sheet) {
      sheet = ss.insertSheet('ModulAjar');
      sheet.appendRow(['Tanggal', 'Kelas', 'Topik', 'Tujuan', 'Kegiatan', 'Asesmen', 'Sarana', 'Status']);
    }

    const row = [
      new Date(),
      modulData.kelas,
      modulData.topik,
      modulData.tujuanPembelajaran,
      JSON.stringify(modulData.langkahKegiatan), // Simpan array sebagai string JSON
      modulData.asesmenFormatif,
      JSON.stringify(modulData.saranaPrasarana),
      'Draft'
    ];

    sheet.appendRow(row);
    return { success: true, message: 'Modul ajar berhasil disimpan!' };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

/* 
  Fungsi Helper untuk Inisialisasi Database (Jalankan sekali manual dari editor)
*/
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetsConfig = [
    { name: 'Siswa', headers: ['ID', 'Nama', 'Kelas', 'L/P', 'Tanggal Lahir', 'Catatan Kesehatan'] },
    { name: 'Kelas', headers: ['Nama Kelas', 'Wali Kelas', 'Jumlah Siswa'] },
    { name: 'ModulAjar', headers: ['Tanggal', 'Kelas', 'Topik', 'Tujuan', 'Kegiatan', 'Asesmen', 'Sarana', 'Status'] },
    { name: 'Asesmen', headers: ['ID Siswa', 'Tanggal', 'Materi', 'Nilai Praktik', 'Nilai Sikap', 'Catatan'] }
  ];

  sheetsConfig.forEach(config => {
    let sheet = ss.getSheetByName(config.name);
    if (!sheet) {
      sheet = ss.insertSheet(config.name);
      sheet.appendRow(config.headers);
      // Format header
      sheet.getRange(1, 1, 1, config.headers.length).setFontWeight('bold').setBackground('#4F46E5').setFontColor('#ffffff');
    }
  });
  
  Browser.msgBox('Database GerakPintar berhasil diinisialisasi!');
}