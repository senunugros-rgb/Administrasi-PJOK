/**
 * Teacher Generator PJOK SD
 * File: AI.gs
 * Deskripsi: Engine AI untuk generate konten pembelajaran (CP, TP, ATP, Modul, Asesmen, dll)
 * Author: Senior AI Prompt Engineer & Google Apps Script Developer
 * Version: 1.0.0
 */

/**
 * Class AI - Menghandle semua generate konten dengan AI/Prompt Engineering
 * Menggunakan template prompt yang terstruktur untuk hasil konsisten
 */
var AI = (function() {
  
  function AI() {
    this.promptTemplates = this.initializePromptTemplates();
  }
  
  /**
   * Initialize Prompt Templates untuk berbagai keperluan
   */
  AI.prototype.initializePromptTemplates = function() {
    return {
      // Template untuk generate CP (Capaian Pembelajaran)
      CP: `Anda adalah ahli kurikulum PJOK SD Kurikulum Merdeka.
Buatlah Capaian Pembelajaran (CP) untuk:
- Fase: {{FASE}}
- Mata Pelajaran: PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)
- Fokus: {{FOKUS}}

Format output JSON array dengan struktur:
[{
  "id": "uuid",
  "fase": "{{FASE}}",
  "mapel": "PJOK",
  "elemen": ["Keterampilan Motorik", "Pengetahuan Gerak", "Pengalaman Gerak", "Kebugaran"],
  "deskripsi_cp": "Deskripsi lengkap CP...",
  "kompetensi_inti": ["Kompetensi 1", "Kompetensi 2"]
}]`,

      // Template untuk generate TP (Tujuan Pembelajaran)
      TP: `Anda adalah guru PJOK SD berpengalaman.
Berdasarkan CP berikut: {{CP_DESKRIPSI}}
Buatlah Tujuan Pembelajaran (TP) untuk materi: {{MATERI}}

Format output JSON array:
[{
  "id": "uuid",
  "cp_id": "{{CP_ID}}",
  "materi": "{{MATERI}}",
  "deskripsi_tp": "Tujuan pembelajaran spesifik...",
  "indikator": ["Indikator 1", "Indikator 2", "Indikator 3"],
  "kata_kerja_operasional": ["Menjelaskan", "Mendemonstrasikan", "Mempraktikkan"]
}]`,

      // Template untuk generate Konten Modul Ajar
      MODUL_AJAR: `Anda adalah guru PJOK SD kreatif yang menerapkan Deep Learning.
Buatlah konten Modul Ajar lengkap dengan spesifikasi:

IDENTITAS:
- Kelas: {{KELAS}}
- Semester: {{SEMESTER}}
- Materi: {{MATERI}}
- Alokasi Waktu: {{ALOKASI_WAKTU}} JP
- Model Pembelajaran: {{MODEL_PEMBELAJARAN}}
- Metode: {{METODE}}
- Media: {{MEDIA}}

KOMPONEN INTI:
1. Pemahaman Bermakna: Mengapa materi ini penting dalam kehidupan sehari-hari?
2. Pertanyaan Pemantik: 3-5 pertanyaan yang memicu rasa ingin tahu
3. Persiapan Guru: Apa yang harus disiapkan guru sebelum pembelajaran
4. Kegiatan Awal (10 menit): Langkah-langkah pendahuluan
5. Kegiatan Inti ({{DURASI_INTI}} menit): Langkah detail dengan sintaks {{MODEL_PEMBELAJARAN}}
6. Kegiatan Penutup (10 menit): Refleksi dan kesimpulan
7. Asesmen Diagnostik: Pertanyaan untuk mengukur pengetahuan awal
8. Asesmen Formatif: Teknik penilaian selama proses
9. Asesmen Sumatif: Instrumen penilaian akhir
10. Remedial: Strategi untuk siswa yang belum mencapai tujuan
11. Pengayaan: Aktivitas tambahan untuk siswa yang sudah mencapai tujuan
12. Refleksi Guru: Pertanyaan untuk guru merefleksikan pembelajaran
13. Refleksi Peserta Didik: Pertanyaan untuk siswa merefleksikan belajar mereka

PROFIL PELAJAR PANCASILA: {{PROFIL_PANCASILA}}
TARGET PESERTA DIDIK: {{TARGET_PESERTA_DIDIK}}

Format output JSON lengkap dengan semua komponen di atas.`,

      // Template untuk generate Asesmen Diagnostik
      ASESMEN_DIAGNOSTIK: `Buat asesmen diagnostik untuk materi PJOK: {{MATERI}}
Kelas: {{KELAS}}

Output JSON:
{
  "jenis": "Diagnostik",
  "teknik": "Tanya jawab & Observasi",
  "instrumen": [
    {"pertanyaan": "...", "tujuan": "..."}
  ],
  "rubrik": {
    "paham_utuh": "Kriteria...",
    "paham_sebagian": "Kriteria...",
    "tidak_paham": "Kriteria..."
  }
}`,

      // Template untuk generate Asesmen Formatif
      ASESMEN_FORMATIF: `Buat asesmen formatif untuk materi PJOK: {{MATERI}}
Kelas: {{KELAS}}
TP: {{TP_DESKRIPSI}}

Output JSON:
{
  "jenis": "Formatif",
  "teknik": "Observasi Kinerja",
  "instrumen": [
    {"aspek": "Keterampilan", "indikator": "...", "skor_maksimal": 4},
    {"aspek": "Sikap", "indikator": "...", "skor_maksimal": 4}
  ],
  "lembar_observasi": true
}`,

      // Template untuk generate Asesmen Sumatif
      ASESMEN_SUMATIF: `Buat asesmen sumatif untuk materi PJOK: {{MATERI}}
Kelas: {{KELAS}}

Output JSON:
{
  "jenis": "Sumatif",
  "bentuk": "Praktik & Tertulis",
  "soal_praktik": [
    {"instruksi": "...", "kriteria_penilaian": [...]}
  ],
  "soal_tertulis": [
    {"pertanyaan": "...", "kunci_jawaban": "...", "skor": 1}
  ],
  "total_skor": 100
}`,

      // Template untuk generate Rubrik Penilaian
      RUBRIK: `Buat rubrik penilaian komprehensif untuk PJOK
Materi: {{MATERI}}
Kelas: {{KELAS}}

Output JSON:
{
  "rubrik_keterampilan": {
    "level_4": "Mahir - Dapat melakukan dengan sempurna dan mengajarkan teman",
    "level_3": "Cakap - Dapat melakukan secara mandiri dengan benar",
    "level_2": "Dasar - Dapat melakukan dengan bantuan minimal",
    "level_1": "Perlu Bimbingan - Belum dapat melakukan tanpa bantuan penuh"
  },
  "rubrik_sikap": {
    "sportivitas": [...],
    "kerjasama": [...],
    "disiplin": [...]
  }
}`,

      // Template untuk generate LKPD
      LKPD: `Buat Lembar Kerja Peserta Didik (LKPD) untuk:
Materi: {{MATERI}}
Kelas: {{KELAS}}

Output JSON:
{
  "judul": "LKPD - {{MATERI}}",
  "identitas": ["Nama:", "Kelas:", "Tanggal:"],
  "tujuan": "...",
  "alat_bahan": [...],
  "langkah_kerja": ["Langkah 1", "Langkah 2", ...],
  "tabel_pengamatan": {"kolom": [...], "baris": [...]},
  "pertanyaan_refleksi": [...]
}`,

      // Template untuk generate Bank Permainan
      PERMAINAN: `Buat bank permainan PJOK untuk:
Kategori: {{KATEGORI}} (Pemanasan/Ice Breaking/Permainan Besar/Permainan Kecil)
Fase: {{FASE}} (A/B/C)
Fokus Keterampilan: {{FOKUS_KETERAMPILAN}}

Output JSON array:
[{
  "nama_permainan": "...",
  "kategori": "{{KATEGORI}}",
  "fase": "{{FASE}}",
  "tujuan": "...",
  "alat_bahan": [...],
  "aturan_permainan": [...],
  "langkah_pelaksanaan": [...],
  "variasi": [...],
  "keselamatan": [...]
}]`,

      // Template untuk generate Ice Breaking
      ICE_BREAKING: `Buat ice breaking untuk pembelajaran PJOK
Kelas: {{KELAS}}
Durasi: 5-10 menit
Tujuan: {{TUJUAN}} (Energizing/Focusing/Team Building)

Output JSON array:
[{
  "nama": "...",
  "durasi": "5-10 menit",
  "tujuan": "...",
  "langkah": [...],
  "tips": [...]
}]`
    };
  };
  
  /**
   * Generate CP (Capaian Pembelajaran)
   */
  AI.prototype.generateCP = function(fase, fokus) {
    try {
      var prompt = this.promptTemplates.CP
        .replace('{{FASE}}', fase)
        .replace('{{FOKUS}}', fokus || 'Umum');
      
      // Simulasi response AI (karena GAS tidak punya akses langsung ke AI API tanpa setup)
      // Dalam implementasi nyata, panggil API eksternal seperti OpenAI/Gemini
      var generatedCP = this.simulateAIResponse('CP', fase);
      
      return generatedCP;
      
    } catch (error) {
      Logger.log('AI.generateCP error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * Generate TP (Tujuan Pembelajaran)
   */
  AI.prototype.generateTP = function(cpData, materi) {
    try {
      if (!cpData || cpData.length === 0) {
        return [];
      }
      
      var tpList = [];
      
      for (var i = 0; i < cpData.length; i++) {
        var cp = cpData[i];
        
        // Generate 2-4 TP per CP
        var numTP = Math.floor(Math.random() * 3) + 2;
        
        for (var j = 0; j < numTP; j++) {
          tpList.push({
            id: Utilities.getUuid(),
            cp_id: cp.id,
            materi: materi,
            deskripsi_tp: this.generateTPDeskripsi(materi, cp.fase, j),
            indikator: this.generateIndikator(materi, cp.fase),
            kata_kerja_operasional: ['Menjelaskan', 'Mendemonstrasikan', 'Mempraktikkan', 'Menganalisis']
          });
        }
      }
      
      return tpList;
      
    } catch (error) {
      Logger.log('AI.generateTP error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * Generate deskripsi TP berdasarkan materi dan fase
   */
  AI.prototype.generateTPDeskripsi = function(materi, fase, index) {
    var templates = {
      'A': [
        'Peserta didik dapat mempraktikkan gerak dasar {{MATERI}} dengan benar',
        'Peserta didik dapat memahami konsep sederhana tentang {{MATERI}}',
        'Peserta didik dapat menunjukkan sikap sportif saat berlatih {{MATERI}}'
      ],
      'B': [
        'Peserta didik dapat mendemonstrasikan keterampilan {{MATERI}} dengan teknik yang benar',
        'Peserta didik dapat menganalisis gerakan {{MATERI}} secara sederhana',
        'Peserta didik dapat menerapkan strategi dasar dalam {{MATERI}}'
      ],
      'C': [
        'Peserta didik dapat memvariasikan keterampilan {{MATERI}} dalam situasi permainan',
        'Peserta didik dapat mengevaluasi teknik {{MATERI}} diri sendiri dan teman',
        'Peserta didik dapat mengembangkan taktik dalam {{MATERI}}'
      ]
    };
    
    var template = templates[fase] || templates['B'];
    var deskripsi = template[index % template.length] || template[0];
    return deskripsi.replace('{{MATERI}}', materi);
  };
  
  /**
   * Generate indikator pencapaian
   */
  AI.prototype.generateIndikator = function(materi, fase) {
    return [
      'Menjelaskan konsep ' + materi + ' dengan bahasa sendiri',
      'Mendemonstrasikan teknik dasar ' + materi + ' dengan benar',
      'Mempraktikkan ' + materi + ' dalam situasi sederhana',
      'Menunjukkan sikap kerjasama dan sportivitas'
    ];
  };
  
  /**
   * Generate konten lengkap Modul Ajar
   */
  AI.prototype.generateModulAjarContent = function(params, cpData, tpData) {
    try {
      // Generate setiap komponen secara terpisah
      return {
        pemahaman_bermakna: this.generatePemahamanBermakna(params.materi, params.kelas),
        pertanyaan_pematik: this.generatePertanyaanPemantik(params.materi, params.kelas),
        persiapan_guru: this.generatePersiapanGuru(params),
        kegiatan_awal: this.generateKegiatanAwal(params),
        kegiatan_inti: this.generateKegiatanInti(params),
        kegiatan_penutup: this.generateKegiatanPenutup(params),
        asmen_diagnostik: this.generateAsesmenDiagnostik(params),
        asmen_formatif: this.generateAsesmenFormatif(params, tpData),
        asmen_sumatif: this.generateAsesmenSumatif(params, tpData),
        pengayaan: this.generatePengayaan(params),
        remedial: this.generateRemedial(params),
        refleksi_guru: this.generateRefleksiGuru(),
        refleksi_siswa: this.generateRefleksiSiswa(params.kelas),
        lkpd: this.generateLKPD(params),
        media: this.generateMedia(params),
        rubrik: this.generateRubrikPenilaian(params, tpData),
        daftar_pustaka: this.generateDaftarPustaka()
      };
      
    } catch (error) {
      Logger.log('AI.generateModulAjarContent error: ' + error.toString());
      return null;
    }
  };
  
  /**
   * Generate Pemahaman Bermakna
   */
  AI.prototype.generatePemahamanBermakna = function(materi, kelas) {
    return 'Melalui pembelajaran ' + materi + ', peserta didik memahami bahwa aktivitas fisik penting untuk kesehatan tubuh, membentuk karakter sportif, dan membina hubungan sosial yang baik melalui kerjasama tim.';
  };
  
  /**
   * Generate Pertanyaan Pemantik
   */
  AI.prototype.generatePertanyaanPemantik = function(materi, kelas) {
    return [
      'Mengapa kita perlu melakukan pemanasan sebelum berolahraga?',
      'Bagaimana cara melakukan ' + materi + ' yang benar agar tidak cedera?',
      'Apa manfaat bermain ' + materi + ' bagi kesehatan tubuh kita?',
      'Bagaimana kerjasama tim dapat membantu kita memenangkan permainan?'
    ];
  };
  
  /**
   * Generate Persiapan Guru
   */
  AI.prototype.generatePersiapanGuru = function(params) {
    return [
      'Menyiapkan lapangan/area praktik yang aman',
      'Memeriksa kondisi alat olahraga (bola, cone, peluit, dll)',
      'Menyusun rencana pembagian kelompok',
      'Menyiapkan lembar observasi asesmen',
      'Memastikan ketersediaan P3K',
      'Mempelajari karakteristik peserta didik'
    ];
  };
  
  /**
   * Generate Kegiatan Awal (Pendahuluan)
   */
  AI.prototype.generateKegiatanAwal = function(params) {
    return {
      durasi: 10,
      aktivitas: [
        'Guru membuka pelajaran dengan salam dan berdoa bersama',
        'Guru mengecek kehadiran dan kesiapan peserta didik',
        'Guru menyampaikan tujuan pembelajaran dan manfaatnya',
        'Guru melakukan apersepsi dengan mengaitkan materi sebelumnya',
        'Guru memberikan motivasi dan semangat',
        'Pemanasan dinamis: lari kecil, skipping, peregangan statis-dinamis',
        'Permainan tradisional singkat sebagai ice breaking'
      ]
    };
  };
  
  /**
   * Generate Kegiatan Inti dengan model pembelajaran
   */
  AI.prototype.generateKegiatanInti = function(params) {
    var model = params.model_pembelajaran || 'Problem Based Learning';
    var durasi = (params.jam_pelajaran || 2) * 35 - 20;
    
    var langkahUmum = [
      'Guru menjelaskan konsep dan mendemonstrasikan teknik ' + params.materi,
      'Peserta didik dibagi dalam kelompok kecil (4-5 orang)',
      'Setiap kelompok berlatih teknik dasar dengan bimbingan guru',
      'Guru berkeliling memberikan feedback individual',
      'Peserta didik melakukan praktik dalam situasi permainan sederhana',
      'Presentasi hasil praktik setiap kelompok',
      'Diskusi kelas tentang kesulitan dan solusi'
    ];
    
    return {
      durasi: durasi,
      model: model,
      langkah: langkahUmum,
      diferensiasi: {
        konten: 'Menyediakan variasi tingkat kesulitan latihan',
        proses: 'Memberikan scaffolding berbeda sesuai kemampuan',
        produk: 'Membolehkan bentuk demonstrasi yang beragam'
      }
    };
  };
  
  /**
   * Generate Kegiatan Penutup
   */
  AI.prototype.generateKegiatanPenutup = function(params) {
    return {
      durasi: 10,
      aktivitas: [
        'Pendinginan (cooling down) dan peregangan statis',
        'Guru memandu refleksi pembelajaran',
        'Peserta didik menyampaikan kesan dan pesan',
        'Guru dan peserta didik menyimpulkan materi',
        'Guru menyampaikan rencana pertemuan berikutnya',
        'Informasi tugas rumah (jika ada)',
        'Doa penutup dan salam'
      ]
    };
  };
  
  /**
   * Generate Asesmen Diagnostik
   */
  AI.prototype.generateAsesmenDiagnostik = function(params) {
    return {
      jenis: 'Diagnostik',
      teknik: 'Tanya jawab & Observasi awal',
      waktu: 'Sebelum pembelajaran',
      instrumen: [
        { pertanyaan: 'Apakah kamu sudah pernah melakukan ' + params.materi + '?', tujuan: 'Mengetahui pengalaman awal' },
        { pertanyaan: 'Bagaimana cara melakukan gerakan dasar ' + params.materi + '?', tujuan: 'Mengukur pemahaman konsep' },
        { pertanyaan: 'Apa manfaat melakukan ' + params.materi + ' bagi kesehatan?', tujuan: 'Mengukur pengetahuan manfaat' }
      ],
      tindak_lanjut: 'Kelompokkan siswa berdasarkan tingkat pemahaman untuk diferensiasi'
    };
  };
  
  /**
   * Generate Asesmen Formatif
   */
  AI.prototype.generateAsesmenFormatif = function(params, tpData) {
    return {
      jenis: 'Formatif',
      teknik: 'Observasi Kinerja & Catatan Anekdot',
      waktu: 'Selama proses pembelajaran',
      aspek_yang_dinilai: [
        { aspek: 'Keterampilan Motorik', bobot: 40, indikator: 'Ketepatan teknik, Kelancaran gerakan' },
        { aspek: 'Pengetahuan Gerak', bobot: 30, indikator: 'Pemahaman konsep, Kemampuan menjelaskan' },
        { aspek: 'Sikap Sportif', bobot: 30, indikator: 'Kerjasama, Disiplin, Menghargai teman' }
      ],
      instrumen: 'Lembar Observasi Terstruktur',
      rubrik: {
        skala: '1-4',
        kriteria: {
          4: 'Sangat Baik - Melakukan dengan sempurna dan konsisten',
          3: 'Baik - Melakukan dengan benar sebagian besar',
          2: 'Cukup - Melakukan dengan beberapa kesalahan',
          1: 'Perlu Bimbingan - Belum dapat melakukan dengan benar'
        }
      }
    };
  };
  
  /**
   * Generate Asesmen Sumatif
   */
  AI.prototype.generateAsesmenSumatif = function(params, tpData) {
    return {
      jenis: 'Sumatif',
      bentuk: 'Praktik & Tertulis',
      waktu: 'Akhir lingkup materi',
      soal_praktik: [
        {
          instruksi: 'Demonstrasikan teknik dasar ' + params.materi + ' dengan benar',
          kriteria: ['Posisi awal', 'Pelaksanaan gerakan', 'Hasil akhir', 'Sikap tubuh'],
          skor_maksimal: 40
        },
        {
          instruksi: 'Terapkan keterampilan ' + params.materi + ' dalam permainan sederhana',
          kriteria: ['Pengambilan keputusan', 'Efektivitas gerakan', 'Kerjasama tim'],
          skor_maksimal: 40
        }
      ],
      soal_tertulis: [
        { pertanyaan: 'Jelaskan urutan teknik dasar ' + params.materi + '!', skor: 10 },
        { pertanyaan: 'Apa manfaat melakukan ' + params.materi + ' bagi kesehatan?', skor: 10 }
      ],
      total_skor: 100
    };
  };
  
  /**
   * Generate Program Pengayaan
   */
  AI.prototype.generatePengayaan = function(params) {
    return [
      'Memberikan tantangan tambahan dengan variasi gerakan lebih kompleks',
      'Menugaskan sebagai tutor sebaya untuk membantu teman',
      'Meminta membuat video analisis teknik ' + params.materi,
      'Mengikutsertakan dalam kompetisi/turnamen tingkat sekolah',
      'Memberikan proyek penelitian sederhana tentang olahraga'
    ];
  };
  
  /**
   * Generate Program Remedial
   */
  AI.prototype.generateRemedial = function(params) {
    return [
      'Pemberian bimbingan individual dengan pendekatan berbeda',
      'Latihan tambahan dengan intensitas lebih tinggi',
      'Penggunaan media visual (video) untuk pemahaman konsep',
      'Pemberian scaffolding bertahap dari sederhana ke kompleks',
      'Kolaborasi dengan orang tua untuk latihan di rumah'
    ];
  };
  
  /**
   * Generate Refleksi Guru
   */
  AI.prototype.generateRefleksiGuru = function() {
    return [
      'Apakah tujuan pembelajaran tercapai?',
      'Bagian mana dari pembelajaran yang berjalan efektif?',
      'Kesulitan apa yang dialami peserta didik?',
      'Apakah metode dan media yang digunakan sudah tepat?',
      'Apa yang perlu diperbaiki untuk pertemuan berikutnya?',
      'Bagaimana keterlibatan peserta didik selama pembelajaran?'
    ];
  };
  
  /**
   * Generate Refleksi Peserta Didik
   */
  AI.prototype.generateRefleksiSiswa = function(kelas) {
    return [
      'Apa yang kamu pelajari hari ini?',
      'Bagian mana yang paling kamu sukai? Mengapa?',
      'Apa kesulitan yang kamu alami?',
      'Bagaimana perasaanmu setelah mengikuti pembelajaran?',
      'Apa yang ingin kamu pelajari lebih lanjut?'
    ];
  };
  
  /**
   * Generate LKPD
   */
  AI.prototype.generateLKPD = function(params) {
    return {
      judul: 'Lembar Kerja Peserta Didik - ' + params.materi,
      identitas: ['Nama:', 'Kelas:', 'Hari/Tanggal:', 'Kelompok:'],
      tujuan: 'Peserta didik dapat mempraktikkan teknik dasar ' + params.materi + ' dengan benar',
      alat_bahan: ['Lapangan', 'Bola', 'Cone', 'Peluit', 'Stopwatch'],
      langkah_kerja: [
        'Lakukan pemanasan terlebih dahulu',
        'Perhatikan demonstrasi guru',
        'Praktikkan gerakan secara bertahap',
        'Lakukan pengamatan teman sekelompok',
        'Catat hasil pengamatan',
        'Diskusikan hasil dengan kelompok'
      ],
      tabel_pengamatan: {
        kolom: ['No', 'Nama Siswa', 'Teknik Dasar', 'Sikap Tubuh', 'Hasil', 'Catatan'],
        baris: 5
      },
      pertanyaan_refleksi: [
        'Apa yang sudah kamu lakukan dengan baik?',
        'Apa yang masih perlu diperbaiki?',
        'Bagaimana kerjasama dalam kelompokmu?'
      ]
    };
  };
  
  /**
   * Generate Media Pembelajaran
   */
  AI.prototype.generateMedia = function(params) {
    return [
      { jenis: 'Visual', nama: 'Poster Teknik ' + params.materi, format: 'Gambar/Diagram' },
      { jenis: 'Audio-Visual', nama: 'Video Demonstrasi', format: 'MP4' },
      { jenis: 'Alat Praktik', nama: 'Bola, Cone, Ring', format: 'Physical' },
      { jenis: 'Digital', nama: 'Aplikasi Analisis Gerakan', format: 'App' }
    ];
  };
  
  /**
   * Generate Rubrik Penilaian
   */
  AI.prototype.generateRubrikPenilaian = function(params, tpData) {
    return {
      rubrik_keterampilan: {
        level_4: { label: 'Mahir', deskripsi: 'Melakukan gerakan dengan sempurna, konsisten, dan dapat mengajarkan teman', skor: 4 },
        level_3: { label: 'Cakap', deskripsi: 'Melakukan gerakan dengan benar secara mandiri', skor: 3 },
        level_2: { label: 'Dasar', deskripsi: 'Melakukan gerakan dengan bantuan minimal', skor: 2 },
        level_1: { label: 'Perlu Bimbingan', deskripsi: 'Belum dapat melakukan gerakan tanpa bantuan penuh', skor: 1 }
      },
      rubrik_sikap: {
        sportivitas: [
          'Menerima kekalahan dengan lapang dada',
          'Menghargai keputusan wasit/guru',
          'Tidak menyombongkan kemenangan'
        ],
        kerjasama: [
          'Aktif berkomunikasi dengan tim',
          'Membantu teman yang kesulitan',
          'Berpartisipasi dalam tugas kelompok'
        ],
        disiplin: [
          'Hadir tepat waktu',
          'Mengenakan pakaian olahraga lengkap',
          'Mengikuti aturan permainan'
        ]
      }
    };
  };
  
  /**
   * Generate Daftar Pustaka
   */
  AI.prototype.generateDaftarPustaka = function() {
    return [
      'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2022). Capaian Pembelajaran PJOK SD.',
      'Mahendra, A. (2021). Pembelajaran Pendidikan Jasmani Berbasis Deep Learning. Bandung: UPI Press.',
      'Lumpkin, A. (2020). Introduction to Physical Education, Exercise Science, and Sport Studies. McGraw-Hill.',
      'SHAPE America. (2020). National Standards for K-12 Physical Education.',
      'Permendikbud No. 22 Tahun 2020 tentang Rencana Strategis Kementerian Pendidikan dan Kebudayaan.'
    ];
  };
  
  /**
   * Generate Bank Permainan
   */
  AI.prototype.generatePermainan = function(kategori, fase) {
    try {
      // Database permainan PJOK yang umum
      var permainanDB = this.getPermainanDatabase();
      
      // Filter berdasarkan kategori dan fase
      var filtered = permainanDB.filter(function(p) {
        return p.kategori === kategori && 
               (p.fase_target === fase || p.fase_target === 'Semua');
      });
      
      // Jika tidak ada, generate baru
      if (filtered.length === 0) {
        filtered = this.createPermainanBaru(kategori, fase);
      }
      
      return filtered;
      
    } catch (error) {
      Logger.log('AI.generatePermainan error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * Database mini permainan PJOK
   */
  AI.prototype.getPermainanDatabase = function() {
    return [
      {
        id: 'game-001',
        nama: 'Lari Estafet Bola',
        kategori: 'Pemanasan',
        fase_target: 'A',
        tujuan: 'Melatih kecepatan, kerjasama, dan koordinasi',
        alat: ['Bola kecil', 'Cone'],
        jumlah_pemain: '2 tim @ 5-8 siswa',
        durasi: '10 menit',
        aturan: [
          'Siswa berbaris dalam tim',
          'Siswa pertama lari membawa bola mengelilingi cone',
          'Serahkan bola ke teman berikutnya',
          'Tim yang selesai pertama menang'
        ],
        variasi: ['Gunakan 2 bola', 'Tambah rintangan'],
        keselamatan: 'Pastikan lintasan tidak licin'
      },
      {
        id: 'game-002',
        nama: 'Simon Says Gerak',
        kategori: 'Ice Breaking',
        fase_target: 'A',
        tujuan: 'Melatih konsentrasi dan reaksi cepat',
        alat: [],
        jumlah_pemain: 'Seluruh kelas',
        durasi: '5 menit',
        aturan: [
          'Guru memberi perintah dengan awalan "Simon says"',
          'Siswa hanya bergerak jika ada "Simon says"',
          'Yang salah keluar atau hukuman ringan'
        ],
        variasi: ['Siswa bergantian jadi Simon'],
        keselamatan: 'Ruang gerak cukup'
      },
      {
        id: 'game-003',
        nama: 'Bola Beracun',
        kategori: 'Permainan Kecil',
        fase_target: 'B',
        tujuan: 'Melatih kelincahan dan menghindar',
        alat: ['Bola lunak 3-5 buah'],
        jumlah_pemain: '10-20 siswa',
        durasi: '15 menit',
        aturan: [
          'Area persegi dibatasi cone',
          '2-3 penjaga di luar area melempar bola',
          'Siswa di dalam menghindari bola',
          'Yang terkena bola jadi penjaga'
        ],
        variasi: ['Tambah bola', 'Perkecil area'],
        keselamatan: 'Gunakan bola lunak, larang lempar ke kepala'
      },
      {
        id: 'game-004',
        nama: 'Sepak Bola Mini',
        kategori: 'Permainan Besar',
        fase_target: 'C',
        tujuan: 'Mengembangkan keterampilan sepak bola dan kerjasama tim',
        alat: ['Bola sepak', 'Gawang mini', 'Cone', 'Rompi'],
        jumlah_pemain: '2 tim @ 5-7 siswa',
        durasi: '20-30 menit',
        aturan: [
          'Area 30x20 meter',
          'Permainan 2 x 10 menit',
          'Tanpa offside',
          'Fair play'
        ],
        variasi: ['Gunakan tangan (handball)', 'Gol harus dari passing'],
        keselamatan: 'Peraturan ketat, tidak boleh tackle keras'
      }
    ];
  };
  
  /**
   * Create permainan baru jika tidak ada di database
   */
  AI.prototype.createPermainanBaru = function(kategori, fase) {
    // Template generate permainan baru
    return [{
      id: Utilities.getUuid(),
      nama: 'Permainan ' + kategori + ' - ' + fase,
      kategori: kategori,
      fase_target: fase,
      tujuan: 'Melatih keterampilan motorik dan kerjasama',
      alat: ['Bola', 'Cone'],
      jumlah_pemain: '10-15 siswa',
      durasi: '15 menit',
      aturan: ['Aturan standar permainan'],
      variasi: ['Variasi 1', 'Variasi 2'],
      keselamatan: 'Pastikan area aman'
    }];
  };
  
  /**
   * Generate Soal untuk Bank Soal
   */
  AI.prototype.generateSoal = function(mapel, fase, jenis, jumlah) {
    try {
      var soalList = [];
      
      for (var i = 0; i < jumlah; i++) {
        soalList.push({
          id: Utilities.getUuid(),
          mapel: mapel,
          fase: fase,
          jenis: jenis,
          pertanyaan: this.generateSoalPertanyaan(mapel, fase, jenis, i),
          pilihan: jenis === 'Pilihan Ganda' ? this.generatePilihanGanda() : null,
          kunci_jawaban: 'A',
          pembahasan: 'Pembahasan soal...',
          level_kognitif: ['C1', 'C2', 'C3'][Math.floor(Math.random() * 3)],
          created_at: new Date().toISOString()
        });
      }
      
      return soalList;
      
    } catch (error) {
      Logger.log('AI.generateSoal error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * Generate pertanyaan soal
   */
  AI.prototype.generateSoalPertanyaan = function(mapel, fase, jenis, index) {
    var questions = [
      'Gerak dasar dalam permainan bola besar meliputi, kecuali...',
      'Tujuan pemanasan sebelum olahraga adalah...',
      'Posisi tubuh yang benar saat melakukan passing bawah voli adalah...',
      'Manfaat latihan kebugaran jasmani secara teratur adalah...',
      'Dalam permainan sepak bola, pemain yang bertugas menjaga gawang disebut...'
    ];
    
    return questions[index % questions.length];
  };
  
  /**
   * Generate pilihan ganda
   */
  AI.prototype.generatePilihanGanda = function() {
    return [
      { key: 'A', text: 'Pilihan A' },
      { key: 'B', text: 'Pilihan B' },
      { key: 'C', text: 'Pilihan C' },
      { key: 'D', text: 'Pilihan D' }
    ];
  };
  
  /**
   * Simulasi response AI (placeholder untuk integrasi AI real)
   */
  AI.prototype.simulateAIResponse = function(type, context) {
    // Dalam implementasi production, ganti dengan call ke API AI
    // Contoh: UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', ...)
    
    Logger.log('Simulating AI response for: ' + type + ', context: ' + context);
    
    // Return dummy data yang realistis
    if (type === 'CP') {
      return [{
        id: Utilities.getUuid(),
        fase: context,
        mapel: 'PJOK',
        elemen: ['Keterampilan Motorik', 'Pengetahuan Gerak'],
        deskripsi_cp: 'Peserta didik menunjukkan kemampuan dalam berbagai gerak dasar...',
        kompetensi_inti: ['Memahami', 'Mempraktikkan']
      }];
    }
    
    return [];
  };
  
  return AI;
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AI;
}
