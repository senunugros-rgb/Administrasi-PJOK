/**
 * SIDEBAR.GS
 * Mengelola rendering sidebar dan navigasi
 */

// ========================================
// SIDEBAR RENDERING
// ========================================

/**
 * Mendapatkan HTML untuk sidebar navigation
 * @return {String} HTML sidebar
 */
function getSidebarHTML() {
  const template = HtmlService.createHtmlOutputFromFile('Sidebar');
  return template.getContent();
}

// ========================================
// PAGE CONTENT ROUTING
// ========================================

/**
 * Mendapatkan konten halaman berdasarkan nama page
 * @param {String} pageName - Nama halaman
 * @return {String} HTML konten halaman
 */
function getPageContent(pageName) {
  try {
    var user = getCurrentUser();
    
    if (!user) {
      throw new Error('User tidak terautentikasi');
    }
    
    var html = '';
    
    switch(pageName) {
      case 'dashboard':
        html = getDashboardPageHTML();
        break;
      case 'generator':
        html = getGeneratorPageHTML();
        break;
      case 'master-data':
        html = getMasterDataPageHTML();
        break;
      case 'perangkat-ajar':
        html = getPerangkatAjarPageHTML();
        break;
      case 'asesmen':
        html = getAsesmenPageHTML();
        break;
      case 'jurnal':
        html = getJurnalPageHTML();
        break;
      case 'bank-permainan':
        html = getBankPermainanPageHTML();
        break;
      case 'administrasi':
        html = getAdministrasiPageHTML();
        break;
      case 'export':
        html = getExportPageHTML();
        break;
      case 'backup':
        html = getBackupPageHTML();
        break;
      case 'setting':
        html = getSettingPageHTML();
        break;
      case 'about':
        html = getAboutPageHTML();
        break;
      default:
        html = getDashboardPageHTML();
    }
    
    Logger.log('Page loaded: ' + pageName);
    return html;
    
  } catch (error) {
    Logger.log('Error loading page ' + pageName + ': ' + error.toString());
    throw error;
  }
}

// ========================================
// PAGE HTML GENERATORS
// ========================================

/**
 * HTML untuk Dashboard Page
 */
function getDashboardPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">dashboard</i>Dashboard</h4>
        <button class="btn gradient-btn btn-sm" onclick="loadDashboardData()">
          <i class="material-icons-round me-1">refresh</i>Refresh
        </button>
      </div>
      
      <!-- Stats will be loaded by JavaScript -->
      <div id="dashboardStats">
        <div class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Memuat data dashboard...</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Generator Page
 */
function getGeneratorPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">auto_awesome</i>Teacher Generator</h4>
      </div>
      
      <!-- Form will be initialized by JavaScript -->
      <div id="generatorFormContainer">
        <div class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Memuat form generator...</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Master Data Page
 */
function getMasterDataPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">database</i>Master Data</h4>
        <button class="btn btn-outline-primary btn-sm" onclick="showAddMasterDataModal()">
          <i class="material-icons-round me-1">add</i>Tambah Data
        </button>
      </div>
      
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#md-guru">Guru</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#md-sekolah">Sekolah</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#md-fase">Fase</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#md-materi">Materi</button>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="md-guru">
              <!-- Guru table will be loaded here -->
              <p class="text-muted">Data guru akan ditampilkan di sini</p>
            </div>
            <div class="tab-pane fade" id="md-sekolah">
              <!-- Sekolah table will be loaded here -->
              <p class="text-muted">Data sekolah akan ditampilkan di sini</p>
            </div>
            <div class="tab-pane fade" id="md-fase">
              <!-- Fase table will be loaded here -->
              <p class="text-muted">Data fase akan ditampilkan di sini</p>
            </div>
            <div class="tab-pane fade" id="md-materi">
              <!-- Materi table will be loaded here -->
              <p class="text-muted">Data materi akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Perangkat Ajar Page
 */
function getPerangkatAjarPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">menu_book</i>Perangkat Ajar</h4>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm">
            <i class="material-icons-round me-1">file_download</i>Export
          </button>
          <button class="btn btn-outline-primary btn-sm">
            <i class="material-icons-round me-1">print</i>Print
          </button>
        </div>
      </div>
      
      <div class="row g-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span><i class="material-icons-round me-2">list</i>Daftar Modul Ajar</span>
              <input type="text" class="form-control form-control-sm" placeholder="Cari modul..." style="width: 200px;">
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Judul Modul</th>
                      <th>Kelas</th>
                      <th>Semester</th>
                      <th>Materi</th>
                      <th>Guru</th>
                      <th>Tanggal</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="8" class="text-center py-4 text-muted">Belum ada modul ajar. Silakan buat modul baru melalui Teacher Generator.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Asesmen Page
 */
function getAsesmenPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">assignment</i>Asesmen</h4>
        <button class="btn gradient-btn btn-sm">
          <i class="material-icons-round me-1">add</i>Buat Asesmen
        </button>
      </div>
      
      <div class="row g-4">
        <div class="col-md-6 col-lg-3">
          <div class="card stat-card">
            <div class="stat-icon" style="background: rgba(66, 133, 244, 0.1);">
              <i class="material-icons-round" style="color: var(--primary-color);">quiz</i>
            </div>
            <div class="stat-value">0</div>
            <div class="stat-label">Asesmen Diagnostik</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card stat-card">
            <div class="stat-icon" style="background: rgba(52, 168, 83, 0.1);">
              <i class="material-icons-round" style="color: var(--success);">fact_check</i>
            </div>
            <div class="stat-value">0</div>
            <div class="stat-label">Asesmen Formatif</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card stat-card">
            <div class="stat-icon" style="background: rgba(251, 188, 4, 0.1);">
              <i class="material-icons-round" style="color: var(--warning);">grading</i>
            </div>
            <div class="stat-value">0</div>
            <div class="stat-label">Asesmen Sumatif</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card stat-card">
            <div class="stat-icon" style="background: rgba(234, 67, 53, 0.1);">
              <i class="material-icons-round" style="color: var(--accent-color);">analytics</i>
            </div>
            <div class="stat-value">0</div>
            <div class="stat-label">Total Asesmen</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Jurnal Page
 */
function getJurnalPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">book</i>Jurnal</h4>
        <button class="btn gradient-btn btn-sm">
          <i class="material-icons-round me-1">add</i>Isi Jurnal
        </button>
      </div>
      
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#jurnal-mengajar">Jurnal Mengajar</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#jurnal-harian">Jurnal Harian</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#jurnal-refleksi">Jurnal Refleksi</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#jurnal-kehadiran">Jurnal Kehadiran</button>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="jurnal-mengajar">
              <p class="text-muted">Jurnal mengajar akan ditampilkan di sini</p>
            </div>
            <div class="tab-pane fade" id="jurnal-harian">
              <p class="text-muted">Jurnal harian akan ditampilkan di sini</p>
            </div>
            <div class="tab-pane fade" id="jurnal-refleksi">
              <p class="text-muted">Jurnal refleksi akan ditampilkan di sini</p>
            </div>
            <div class="tab-pane fade" id="jurnal-kehadiran">
              <p class="text-muted">Jurnal kehadiran akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Bank Permainan Page
 */
function getBankPermainanPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">sports_soccer</i>Bank Permainan PJOK</h4>
        <button class="btn gradient-btn btn-sm">
          <i class="material-icons-round me-1">add</i>Tambah Permainan
        </button>
      </div>
      
      <div class="row g-4">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body text-center">
              <i class="material-icons-round" style="font-size: 48px; color: var(--primary-color);">sports_soccer</i>
              <h6 class="mt-3">Permainan Bola Besar</h6>
              <p class="text-muted small">0 permainan</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body text-center">
              <i class="material-icons-round" style="font-size: 48px; color: var(--success);">sports_tennis</i>
              <h6 class="mt-3">Permainan Bola Kecil</h6>
              <p class="text-muted small">0 permainan</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body text-center">
              <i class="material-icons-round" style="font-size: 48px; color: var(--warning);">pool</i>
              <h6 class="mt-3">Permainan Akuatik</h6>
              <p class="text-muted small">0 permainan</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body text-center">
              <i class="material-icons-round" style="font-size: 48px; color: var(--accent-color);">fitness_center</i>
              <h6 class="mt-3">Senam & Kebugaran</h6>
              <p class="text-muted small">0 permainan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Administrasi Page
 */
function getAdministrasiPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">folder</i>Administrasi Guru</h4>
      </div>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card animate-hover">
            <div class="card-body text-center p-4">
              <i class="material-icons-round" style="font-size: 48px; color: var(--primary-color);">event_note</i>
              <h6 class="mt-3">Agenda Guru</h6>
              <p class="text-muted small mb-3">Kelola agenda dan jadwal mengajar</p>
              <button class="btn btn-outline-primary btn-sm">Buka</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card animate-hover">
            <div class="card-body text-center p-4">
              <i class="material-icons-round" style="font-size: 48px; color: var(--success);">supervisor_account</i>
              <h6 class="mt-3">Program Supervisi</h6>
              <p class="text-muted small mb-3">Monitoring dan supervisi pembelajaran</p>
              <button class="btn btn-outline-success btn-sm">Buka</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card animate-hover">
            <div class="card-body text-center p-4">
              <i class="material-icons-round" style="font-size: 48px; color: var(--warning);">how_to_reg</i>
              <h6 class="mt-3">Daftar Hadir</h6>
              <p class="text-muted small mb-3">Rekap kehadiran peserta didik</p>
              <button class="btn btn-outline-warning btn-sm">Buka</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card animate-hover">
            <div class="card-body text-center p-4">
              <i class="material-icons-round" style="font-size: 48px; color: var(--accent-color);">leaderboard</i>
              <h6 class="mt-3">Buku Nilai</h6>
              <p class="text-muted small mb-3">Input dan kelola nilai siswa</p>
              <button class="btn btn-outline-danger btn-sm">Buka</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card animate-hover">
            <div class="card-body text-center p-4">
              <i class="material-icons-round" style="font-size: 48px; color: var(--info);">insights</i>
              <h6 class="mt-3">Analisis Nilai</h6>
              <p class="text-muted small mb-3">Analisis dan statistik nilai</p>
              <button class="btn btn-outline-info btn-sm">Buka</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card animate-hover">
            <div class="card-body text-center p-4">
              <i class="material-icons-round" style="font-size: 48px; color: var(--secondary-color);">description</i>
              <h6 class="mt-3">Rapor</h6>
              <p class="text-muted small mb-3">Cetak rapor peserta didik</p>
              <button class="btn btn-outline-secondary btn-sm">Buka</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Export Page
 */
function getExportPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">file_download</i>Export Data</h4>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body">
                  <h6 class="card-title"><i class="material-icons-round me-2">picture_as_pdf</i>Export PDF</h6>
                  <p class="text-muted small">Export perangkat pembelajaran ke format PDF</p>
                  <select class="form-select mb-3">
                    <option>Pilih dokumen...</option>
                    <option>Modul Ajar</option>
                    <option>ATP</option>
                    <option>Prosem</option>
                    <option>Promes</option>
                  </select>
                  <button class="btn btn-outline-danger btn-sm w-100">
                    <i class="material-icons-round me-1">download</i>Download PDF
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body">
                  <h6 class="card-title"><i class="material-icons-round me-2">description</i>Export Word</h6>
                  <p class="text-muted small">Export perangkat pembelajaran ke format DOCX</p>
                  <select class="form-select mb-3">
                    <option>Pilih dokumen...</option>
                    <option>Modul Ajar</option>
                    <option>ATP</option>
                    <option>Prosem</option>
                    <option>Promes</option>
                  </select>
                  <button class="btn btn-outline-primary btn-sm w-100">
                    <i class="material-icons-round me-1">download</i>Download Word
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body">
                  <h6 class="card-title"><i class="material-icons-round me-2">table_chart</i>Export Spreadsheet</h6>
                  <p class="text-muted small">Export data ke Google Sheets atau Excel</p>
                  <select class="form-select mb-3">
                    <option>Pilih data...</option>
                    <option>Data Guru</option>
                    <option>Data Siswa</option>
                    <option>Data Nilai</option>
                    <option>Data Kehadiran</option>
                  </select>
                  <button class="btn btn-outline-success btn-sm w-100">
                    <i class="material-icons-round me-1">download</i>Download Excel
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body">
                  <h6 class="card-title"><i class="material-icons-round me-2">cloud_upload</i>Google Drive</h6>
                  <p class="text-muted small">Sinkronisasi dengan Google Drive</p>
                  <div class="alert alert-info small">
                    <i class="material-icons-round me-1">info</i>
                    Semua dokumen akan otomatis tersimpan di Google Drive Anda
                  </div>
                  <button class="btn btn-outline-secondary btn-sm w-100">
                    <i class="material-icons-round me-1">sync</i>Sinkronisasi Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Backup Page
 */
function getBackupPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">backup</i>Backup & Restore</h4>
      </div>
      
      <div class="row g-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-success text-white">
              <i class="material-icons-round me-2">backup</i>Backup Database
            </div>
            <div class="card-body">
              <p class="text-muted">Buat salinan lengkap database aplikasi</p>
              <button class="btn btn-success w-100" onclick="createBackup()">
                <i class="material-icons-round me-2">cloud_upload</i>Buat Backup Sekarang
              </button>
              <small class="text-muted d-block mt-2">Backup akan disimpan di Google Drive</small>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-warning">
              <i class="material-icons-round me-2">restore</i>Restore Database
            </div>
            <div class="card-body">
              <p class="text-muted">Kembalikan database dari file backup</p>
              <div class="mb-3">
                <label class="form-label">Pilih File Backup</label>
                <input type="file" class="form-control" accept=".json,.csv">
              </div>
              <button class="btn btn-warning w-100" onclick="restoreBackup()">
                <i class="material-icons-round me-2">restore</i>Restore Sekarang
              </button>
              <small class="text-muted d-block mt-2">Pastikan file backup valid sebelum restore</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card mt-4">
        <div class="card-header">
          <i class="material-icons-round me-2">history</i>Riwayat Backup
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Ukuran</th>
                  <th>Lokasi</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="5" class="text-center py-4 text-muted">Belum ada riwayat backup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk Setting Page
 */
function getSettingPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">settings</i>Pengaturan</h4>
      </div>
      
      <div class="card">
        <div class="card-body">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#setting-umum">Umum</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#setting-sekolah">Sekolah</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#setting-user">User</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#setting-tahun">Tahun Ajaran</button>
            </li>
          </ul>
          
          <div class="tab-content mt-3">
            <div class="tab-pane fade show active" id="setting-umum">
              <form>
                <div class="mb-3">
                  <label class="form-label">Nama Aplikasi</label>
                  <input type="text" class="form-control" value="Teacher Generator PJOK SD">
                </div>
                <div class="mb-3">
                  <label class="form-label">Tema</label>
                  <select class="form-select">
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Bahasa</label>
                  <select class="form-select">
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <button type="submit" class="btn gradient-btn">Simpan Pengaturan</button>
              </form>
            </div>
            <div class="tab-pane fade" id="setting-sekolah">
              <p class="text-muted">Pengaturan data sekolah akan ditampilkan di sini</p>
            </div>
            <div class="tab-pane fade" id="setting-user">
              <p class="text-muted">Pengaturan profil user akan ditampilkan di sini</p>
            </div>
            <div class="tab-pane fade" id="setting-tahun">
              <p class="text-muted">Pengaturan tahun ajaran akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * HTML untuk About Page
 */
function getAboutPageHTML() {
  return `
    <div class="animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 fw-bold"><i class="material-icons-round me-2">info</i>Tentang Aplikasi</h4>
      </div>
      
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="logo-container mb-3">
            <i class="material-icons-round logo-icon" style="font-size: 80px;">school</i>
          </div>
          <h3 class="fw-bold">Teacher Generator PJOK SD</h3>
          <p class="text-muted">Versi 1.0.0</p>
          <hr class="my-4">
          <div class="row g-4 justify-content-center">
            <div class="col-md-6">
              <p class="mb-2"><strong>Dikembangkan untuk:</strong></p>
              <p>Guru PJOK Sekolah Dasar</p>
              <p class="mb-2"><strong>Kurikulum:</strong></p>
              <p>Kurikulum Merdeka (Deep Learning)</p>
              <p class="mb-2"><strong>Teknologi:</strong></p>
              <p>Google Apps Script, Google Spreadsheet, Bootstrap 5</p>
            </div>
          </div>
          <div class="mt-5">
            <p class="text-muted small">© 2024 Teacher Generator PJOK SD. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Include HTML file sebagai string
 * @param {String} filename - Nama file tanpa ekstensi
 * @return {String} Konten file HTML
 */
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (error) {
    Logger.log('Error including file ' + filename + ': ' + error.toString());
    return '';
  }
}
