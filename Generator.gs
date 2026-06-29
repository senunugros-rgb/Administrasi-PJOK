/**
 * Teacher Generator PJOK SD
 * File: Generator.gs
 * Deskripsi: Core generator untuk menghasilkan perangkat pembelajaran dengan AI
 * Author: Senior Google Apps Script Developer
 * Version: 1.0.0
 */

/**
 * Class Generator - Menghasilkan perangkat pembelajaran otomatis
 */
var Generator = (function() {
  
  function Generator() {
    this.db = new Database();
    this.ai = new AI();
  }
  
  /**
   * Generate Modul Ajar lengkap berdasarkan parameter input
   * @param {Object} params Parameter input dari user
   * @return {Object} Hasil generate
   */
  Generator.prototype.generateModulAjar = function(params) {
    try {
      var startTime = new Date();
      
      // Validasi parameter wajib
      var requiredFields = ['guru_id', 'sekolah_id', 'kelas', 'semester_id', 'mapel', 'fase', 'materi'];
      for (var i = 0; i < requiredFields.length; i++) {
        if (!params[requiredFields[i]]) {
          return {
            success: false,
            message: 'Parameter wajib tidak lengkap: ' + requiredFields[i]
          };
        }
      }
      
      // Generate ID unik untuk modul ajar
      var modulId = Utilities.getUuid();
      
      // 1. Dapatkan CP berdasarkan Fase dan Mapel
      var cpData = this.getCpForFase(params.fase, params.mapel);
      
      // 2. Generate TP dari CP
      var tpData = this.generateTpFromCp(cpData, params.materi);
      
      // 3. Generate ATP (Alur Tujuan Pembelajaran)
      var atpData = this.generateAtp(tpData, params);
      
      // 4. Generate KKTP (Kriteria Ketercapaian Tujuan Pembelajaran)
      var kktpData = this.generateKktp(tpData);
      
      // 5. Generate konten Modul Ajar lengkap dengan AI
      var modulContent = this.generateModulContent(params, cpData, tpData, atpData);
      
      // 6. Generate Asesmen
      var assesmenData = this.generateAssesmen(params, tpData, modulContent);
      
      // 7. Simpan ke database
      var saveResult = this.saveModulAjar(modulId, params, modulContent, tpData, atpData, kktpData, assesmenData);
      
      if (!saveResult.success) {
        return saveResult;
      }
      
      var endTime = new Date();
      var duration = (endTime - startTime) / 1000;
      
      // Log activity
      logActivity(Session.getActiveUser().getEmail(), 'GENERATE_MODUL_AJAR', 
        'Modul ID: ' + modulId + ', Duration: ' + duration + 's');
      
      return {
        success: true,
        message: 'Modul Ajar berhasil digenerate',
        data: {
          modul_id: modulId,
          identitas: params,
          cp: cpData,
          tp: tpData,
          atp: atpData,
          kktp: kktpData,
          konten: modulContent,
          asesmen: assesmenData,
          duration_seconds: duration
        }
      };
      
    } catch (error) {
      Logger.log('Generator.generateModulAjar error: ' + error.toString());
      return { success: false, message: error.message };
    }
  };
  
  /**
   * Mendapatkan CP untuk Fase dan Mapel tertentu
   */
  Generator.prototype.getCpForFase = function(fase, mapel) {
    try {
      // Cari di database terlebih dahulu
      var existingCP = this.db.find(APP_CONFIG.SHEETS.CP, {
        fase_id: fase,
        mapel: mapel
      });
      
      if (existingCP && existingCP.length > 0) {
        return existingCP;
      }
      
      // Jika tidak ada, generate dengan AI
      var generatedCP = this.ai.generateCP(fase, mapel);
      
      // Simpan ke database
      if (generatedCP && generatedCP.length > 0) {
        this.db.batchInsert(APP_CONFIG.SHEETS.CP, generatedCP);
      }
      
      return generatedCP;
      
    } catch (error) {
      Logger.log('getCpForFase error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * Generate TP dari CP
   */
  Generator.prototype.generateTpFromCp = function(cpData, materi) {
    try {
      if (!cpData || cpData.length === 0) {
        return [];
      }
      
      // Cek database dulu
      var cpIds = cpData.map(function(cp) { return cp.id; });
      var existingTP = [];
      
      for (var i = 0; i < cpIds.length; i++) {
        var tp = this.db.find(APP_CONFIG.SHEETS.TP, { cp_id: cpIds[i] });
        existingTP = existingTP.concat(tp);
      }
      
      if (existingTP && existingTP.length > 0) {
        return existingTP;
      }
      
      // Generate dengan AI
      var generatedTP = this.ai.generateTP(cpData, materi);
      
      // Simpan ke database
      if (generatedTP && generatedTP.length > 0) {
        this.db.batchInsert(APP_CONFIG.SHEETS.TP, generatedTP);
      }
      
      return generatedTP;
      
    } catch (error) {
      Logger.log('generateTpFromCp error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * Generate ATP (Alur Tujuan Pembelajaran)
   */
  Generator.prototype.generateAtp = function(tpData, params) {
    try {
      if (!tpData || tpData.length === 0) {
        return [];
      }
      
      // ATP adalah urutan TP dalam satu semester
      var atpItems = tpData.map(function(tp, index) {
        return {
          id: Utilities.getUuid(),
          urutan: index + 1,
          tp_id: tp.id,
          deskripsi_tp: tp.deskripsi_tp,
          indikator: tp.indikator,
          alokasi_waktu: params.jam_pelajaran || 2,
          minggu_ke: Math.ceil((index + 1) / 2)
        };
      });
      
      return atpItems;
      
    } catch (error) {
      Logger.log('generateAtp error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * Generate KKTP (Kriteria Ketercapaian Tujuan Pembelajaran)
   */
  Generator.prototype.generateKktp = function(tpData) {
    try {
      if (!tpData || tpData.length === 0) {
        return [];
      }
      
      var kktpItems = tpData.map(function(tp) {
        return {
          id: Utilities.getUuid(),
          tp_id: tp.id,
          kriteria: [
            'Peserta didik dapat mendemonstrasikan keterampilan dasar dengan benar',
            'Peserta didik dapat memahami konsep dengan baik',
            'Peserta didik dapat menerapkan keterampilan dalam situasi permainan',
            'Peserta didik menunjukkan sikap sportif dan kerjasama'
          ],
          indikator_ketercapaian: [
            { level: 'Belum Berkembang', skor: 0, deskripsi: 'Perlu bimbingan penuh' },
            { level: 'Dasar', skor: 1, deskripsi: 'Dapat melakukan dengan bantuan' },
            { level: 'Cakap', skor: 2, deskripsi: 'Dapat melakukan secara mandiri' },
            { level: 'Mahir', skor: 3, deskripsi: 'Dapat melakukan dan mengajarkan teman' }
          ]
        };
      });
      
      return kktpItems;
      
    } catch (error) {
      Logger.log('generateKktp error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * Generate konten lengkap Modul Ajar dengan AI
   */
  Generator.prototype.generateModulContent = function(params, cpData, tpData, atpData) {
    try {
      // Gunakan AI untuk generate konten lengkap
      var aiContent = this.ai.generateModulAjarContent(params, cpData, tpData);
      
      // Struktur standar modul ajar
      var modulContent = {
        identitas: {
          nama_guru: params.nama_guru || '',
          sekolah: params.sekolah_id || '',
          kelas: params.kelas,
          semester: params.semester_id,
          mapel: params.mapel,
          fase: params.fase,
          materi: params.materi,
          alokasi_waktu: params.jam_pelajaran || 2,
          tahun_ajaran: params.tahun_ajaran || '2024/2025'
        },
        komponen_inti: {
          tujuan_pembelajaran: tpData.map(function(tp) { return tp.deskripsi_tp; }),
          pemahaman_bermakna: aiContent.pemahaman_bermakna || '',
          pertanyaan_pematik: aiContent.pertanyaan_pematik || [],
          persiapan_guru: aiContent.persiapan_guru || [],
          
          kegiatan_pembelajaran: {
            pendahuluan: aiContent.kegiatan_awal || {
              durasi: 10,
              aktivitas: [
                'Guru membuka pelajaran dengan salam dan doa',
                'Guru mengecek kehadiran peserta didik',
                'Guru menyampaikan tujuan pembelajaran',
                'Guru melakukan apersepsi dan motivasi',
                'Pemanasan dinamis sesuai materi'
              ]
            },
            inti: aiContent.kegiatan_inti || {
              durasi: params.jam_pelajaran * 35 - 20,
              langkah: [
                'Orientasi masalah/situasi',
                'Organisasi belajar',
                'Investigasi/praktik',
                'Pengembangan dan penyajian hasil',
                'Analisis dan evaluasi'
              ]
            },
            penutup: aiContent.kegiatan_penutup || {
              durasi: 10,
              aktivitas: [
                'Refleksi pembelajaran',
                'Kesimpulan materi',
                'Informasi pertemuan berikutnya',
                'Doa penutup'
              ]
            }
          },
          
          asesmen: {
            diagnostik: aiContent.asemen_diagnostik || [],
            formatif: aiContent.asemen_formatif || [],
            sumatif: aiContent.asemen_sumatif || []
          },
          
          pengayaan_remedial: {
            pengayaan: aiContent.pengayaan || [],
            remedial: aiContent.remedial || []
          },
          
          refleksi: {
            guru: aiContent.refleksi_guru || [],
            peserta_didik: aiContent.refleksi_siswa || []
          }
        },
        
        lampiran: {
          lkpd: aiContent.lkpd || [],
          media: aiContent.media || [],
          rubrik: aiContent.rubrik || {},
          daftar_pustaka: aiContent.daftar_pustaka || []
        }
      };
      
      return modulContent;
      
    } catch (error) {
      Logger.log('generateModulContent error: ' + error.toString());
      return null;
    }
  };
  
  /**
   * Generate Asesmen
   */
  Generator.prototype.generateAssesmen = function(params, tpData, modulContent) {
    try {
      var assesmen = {
        id: Utilities.getUuid(),
        modul_ajar_id: null, // Akan diisi setelah save modul
        jenis: APP_CONFIG.JENIS_ASSESMEN,
        instrumen: {
          diagnostik: this.ai.generateAsesmenDiagnostik(params),
          formatif: this.ai.generateAsesmenFormatif(params, tpData),
          sumatif: this.ai.generateAsesmenSumatif(params, tpData)
        },
        rubrik: this.ai.generateRubrikPenilaian(params, tpData)
      };
      
      return assesmen;
      
    } catch (error) {
      Logger.log('generateAssesmen error: ' + error.toString());
      return null;
    }
  };
  
  /**
   * Simpan Modul Ajar ke database
   */
  Generator.prototype.saveModulAjar = function(modulId, params, konten, tpData, atpData, kktpData, assesmenData) {
    try {
      var db = new Database();
      
      // 1. Simpan Modul Ajar utama
      var modulData = {
        id: modulId,
        guru_id: params.guru_id,
        sekolah_id: params.sekolah_id,
        kelas: params.kelas,
        semester_id: params.semester_id,
        mapel: params.mapel,
        fase: params.fase,
        materi: params.materi,
        model_pembelajaran: params.model_pembelajaran || '',
        metode: params.metode || '',
        media: params.media || '',
        profil_pancasila: params.profil_pancasila || [],
        konten_json: JSON.stringify(konten),
        status: 'Draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      var modulResult = db.insert(APP_CONFIG.SHEETS.MODUL_AJAR, modulData);
      
      if (!modulResult.success) {
        return modulResult;
      }
      
      // 2. Simpan TP jika belum ada
      if (tpData && tpData.length > 0) {
        tpData.forEach(function(tp) {
          if (!db.findOne(APP_CONFIG.SHEETS.TP, { id: tp.id })) {
            db.insert(APP_CONFIG.SHEETS.TP, tp);
          }
        });
      }
      
      // 3. Simpan KKTP
      if (kktpData && kktpData.length > 0) {
        db.batchInsert(APP_CONFIG.SHEETS.KKTP, kktpData);
      }
      
      // 4. Simpan Asesmen
      if (assesmenData) {
        assesmenData.modul_ajar_id = modulId;
        db.insert(APP_CONFIG.SHEETS.ASSESMEN, {
          id: assesmenData.id,
          modul_ajar_id: modulId,
          jenis_asemen: JSON.stringify(assesmenData.jenis),
          instrumen_json: JSON.stringify(assesmenData.instrumen),
          rubrik_json: JSON.stringify(assesmenData.rubrik),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
      
      return {
        success: true,
        message: 'Modul Ajar dan komponen terkait berhasil disimpan',
        modul_id: modulId
      };
      
    } catch (error) {
      Logger.log('saveModulAjar error: ' + error.toString());
      return { success: false, message: error.message };
    }
  };
  
  /**
   * Generate Bank Permainan
   */
  Generator.prototype.generateBankPermainan = function(kategori, fase) {
    try {
      var ai = new AI();
      var permainanData = ai.generatePermainan(kategori, fase);
      
      if (permainanData && permainanData.length > 0) {
        var db = new Database();
        db.batchInsert(APP_CONFIG.SHEETS.BANK_PERMAINAN, permainanData);
      }
      
      return {
        success: true,
        data: permainanData
      };
      
    } catch (error) {
      Logger.log('generateBankPermainan error: ' + error.toString());
      return { success: false, message: error.message };
    }
  };
  
  /**
   * Generate Bank Soal
   */
  Generator.prototype.generateBankSoal = function(mapel, fase, jenis, jumlah) {
    try {
      var ai = new AI();
      var soalData = ai.generateSoal(mapel, fase, jenis, jumlah || 10);
      
      if (soalData && soalData.length > 0) {
        var db = new Database();
        db.batchInsert(APP_CONFIG.SHEETS.BANK_SOAL, soalData);
      }
      
      return {
        success: true,
        data: soalData
      };
      
    } catch (error) {
      Logger.log('generateBankSoal error: ' + error.toString());
      return { success: false, message: error.message };
    }
  };
  
  return Generator;
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Generator;
}
