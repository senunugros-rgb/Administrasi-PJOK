/**
 * Teacher Generator PJOK SD
 * File: Database.gs
 * Deskripsi: Database abstraction layer untuk Google Sheets
 * Author: Senior Google Apps Script Developer
 * Version: 1.0.0
 */

/**
 * Class Database - Wrapper untuk operasi CRUD Google Sheets
 */
var Database = (function() {
  
  /**
   * Constructor
   */
  function Database() {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  }
  
  /**
   * Mendapatkan sheet by name
   * @param {string} sheetName Nama sheet
   * @return {Sheet} Object Sheet
   */
  Database.prototype.getSheet = function(sheetName) {
    var sheet = this.spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('Sheet tidak ditemukan: ' + sheetName);
    }
    return sheet;
  };
  
  /**
   * Mendapatkan headers dari sheet
   * @param {string} sheetName Nama sheet
   * @return {Array} Array headers
   */
  Database.prototype.getHeaders = function(sheetName) {
    var sheet = this.getSheet(sheetName);
    var lastRow = sheet.getLastRow();
    
    if (lastRow === 0) {
      return [];
    }
    
    return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  };
  
  /**
   * Set headers untuk sheet
   * @param {string} sheetName Nama sheet
   * @param {Array} headers Array header names
   */
  Database.prototype.setHeader = function(sheetName, headers) {
    var sheet = this.getSheet(sheetName);
    
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285F4').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
  };
  
  /**
   * Generate unique ID
   * @return {string} Unique ID
   */
  Database.prototype.generateId = function() {
    return Utilities.getUuid();
  };
  
  /**
   * Convert row data to object based on headers
   * @param {Array} headers Column headers
   * @param {Array} row Row values
   * @return {Object} Object representation
   */
  Database.prototype.rowToObject = function(headers, row) {
    var obj = {};
    for (var i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i] !== undefined ? row[i] : null;
    }
    return obj;
  };
  
  /**
   * Convert object to row array based on headers
   * @param {Array} headers Column headers
   * @param {Object} obj Data object
   * @return {Array} Row array
   */
  Database.prototype.objectToRow = function(headers, obj) {
    var row = [];
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header === 'id' && !obj[header]) {
        row.push(this.generateId());
      } else if (obj[header] !== undefined) {
        row.push(obj[header]);
      } else if (header.indexOf('_at') !== -1) {
        row.push(new Date().toISOString());
      } else {
        row.push('');
      }
    }
    return row;
  };
  
  /**
   * INSERT - Menambahkan record baru
   * @param {string} sheetName Nama sheet
   * @param {Object} data Data object
   * @return {Object} Result dengan id record yang diinsert
   */
  Database.prototype.insert = function(sheetName, data) {
    try {
      var sheet = this.getSheet(sheetName);
      var headers = this.getHeaders(sheetName);
      
      if (headers.length === 0) {
        return { success: false, message: 'Sheet belum memiliki headers' };
      }
      
      var row = this.objectToRow(headers, data);
      sheet.appendRow(row);
      
      var newRow = sheet.getLastRow();
      var insertedData = this.rowToObject(headers, row);
      
      return {
        success: true,
        message: 'Data berhasil ditambahkan',
        id: insertedData.id || row[0],
        data: insertedData,
        row: newRow
      };
    } catch (error) {
      Logger.log('Database.insert error: ' + error.toString());
      return { success: false, message: error.message };
    }
  };
  
  /**
   * FIND ALL - Mengambil semua records
   * @param {string} sheetName Nama sheet
   * @return {Array} Array of objects
   */
  Database.prototype.findAll = function(sheetName) {
    try {
      var sheet = this.getSheet(sheetName);
      var lastRow = sheet.getLastRow();
      
      if (lastRow <= 1) {
        return [];
      }
      
      var headers = this.getHeaders(sheetName);
      var data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
      
      var result = [];
      for (var i = 0; i < data.length; i++) {
        result.push(this.rowToObject(headers, data[i]));
      }
      
      return result;
    } catch (error) {
      Logger.log('Database.findAll error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * FIND ONE - Mencari satu record berdasarkan criteria
   * @param {string} sheetName Nama sheet
   * @param {Object} criteria Criteria pencarian { field: value }
   * @return {Object|null} Record object atau null jika tidak ditemukan
   */
  Database.prototype.findOne = function(sheetName, criteria) {
    try {
      var all = this.findAll(sheetName);
      
      for (var i = 0; i < all.length; i++) {
        var match = true;
        for (var key in criteria) {
          if (all[i][key] != criteria[key]) {
            match = false;
            break;
          }
        }
        
        if (match) {
          return all[i];
        }
      }
      
      return null;
    } catch (error) {
      Logger.log('Database.findOne error: ' + error.toString());
      return null;
    }
  };
  
  /**
   * FIND - Mencari records berdasarkan criteria
   * @param {string} sheetName Nama sheet
   * @param {Object} criteria Criteria pencarian
   * @return {Array} Array of matching records
   */
  Database.prototype.find = function(sheetName, criteria) {
    try {
      var all = this.findAll(sheetName);
      var result = [];
      
      for (var i = 0; i < all.length; i++) {
        var match = true;
        for (var key in criteria) {
          if (all[i][key] != criteria[key]) {
            match = false;
            break;
          }
        }
        
        if (match) {
          result.push(all[i]);
        }
      }
      
      return result;
    } catch (error) {
      Logger.log('Database.find error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * UPDATE - Memperbarui record berdasarkan criteria
   * @param {string} sheetName Nama sheet
   * @param {Object} criteria Criteria untuk mencari record
   * @param {Object} newData Data baru yang akan diupdate
   * @return {Object} Result object
   */
  Database.prototype.update = function(sheetName, criteria, newData) {
    try {
      var sheet = this.getSheet(sheetName);
      var headers = this.getHeaders(sheetName);
      var allData = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
      
      var updated = false;
      var rowIndex = -1;
      
      for (var i = 0; i < allData.length; i++) {
        var rowObj = this.rowToObject(headers, allData[i]);
        var match = true;
        
        for (var key in criteria) {
          if (rowObj[key] != criteria[key]) {
            match = false;
            break;
          }
        }
        
        if (match) {
          rowIndex = i + 2; // +2 karena header dan index mulai dari 1
          
          // Update data
          for (var j = 0; j < headers.length; j++) {
            var header = headers[j];
            if (newData[header] !== undefined) {
              sheet.getRange(rowIndex, j + 1).setValue(newData[header]);
            }
          }
          
          // Update timestamp jika ada field updated_at
          var updatedAtIndex = headers.indexOf('updated_at');
          if (updatedAtIndex !== -1) {
            sheet.getRange(rowIndex, updatedAtIndex + 1).setValue(new Date().toISOString());
          }
          
          updated = true;
          break;
        }
      }
      
      if (updated) {
        return {
          success: true,
          message: 'Data berhasil diupdate',
          row: rowIndex
        };
      } else {
        return { success: false, message: 'Data tidak ditemukan' };
      }
    } catch (error) {
      Logger.log('Database.update error: ' + error.toString());
      return { success: false, message: error.message };
    }
  };
  
  /**
   * DELETE - Menghapus record berdasarkan criteria
   * @param {string} sheetName Nama sheet
   * @param {Object} criteria Criteria untuk mencari record
   * @return {Object} Result object
   */
  Database.prototype.delete = function(sheetName, criteria) {
    try {
      var sheet = this.getSheet(sheetName);
      var headers = this.getHeaders(sheetName);
      var allData = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
      
      var deletedCount = 0;
      
      // Loop backwards agar index tidak bergeser
      for (var i = allData.length - 1; i >= 0; i--) {
        var rowObj = this.rowToObject(headers, allData[i]);
        var match = true;
        
        for (var key in criteria) {
          if (rowObj[key] != criteria[key]) {
            match = false;
            break;
          }
        }
        
        if (match) {
          sheet.deleteRow(i + 2);
          deletedCount++;
        }
      }
      
      return {
        success: true,
        message: deletedCount + ' record(s) dihapus',
        deletedCount: deletedCount
      };
    } catch (error) {
      Logger.log('Database.delete error: ' + error.toString());
      return { success: false, message: error.message };
    }
  };
  
  /**
   * COUNT - Menghitung jumlah records
   * @param {string} sheetName Nama sheet
   * @param {Object} criteria Optional criteria
   * @return {number} Jumlah records
   */
  Database.prototype.count = function(sheetName, criteria) {
    if (criteria) {
      return this.find(sheetName, criteria).length;
    }
    
    var sheet = this.getSheet(sheetName);
    var lastRow = sheet.getLastRow();
    return lastRow > 1 ? lastRow - 1 : 0;
  };
  
  /**
   * QUERY - Pencarian advanced dengan multiple conditions
   * @param {string} sheetName Nama sheet
   * @param {Object} options Query options
   * @return {Array} Results
   */
  Database.prototype.query = function(sheetName, options) {
    try {
      var results = this.findAll(sheetName);
      
      // Filter
      if (options.where) {
        results = results.filter(function(row) {
          for (var key in options.where) {
            if (row[key] != options.where[key]) {
              return false;
            }
          }
          return true;
        });
      }
      
      // Sort
      if (options.sortBy) {
        var field = options.sortBy;
        var ascending = options.sortOrder !== 'desc';
        
        results.sort(function(a, b) {
          if (a[field] < b[field]) return ascending ? -1 : 1;
          if (a[field] > b[field]) return ascending ? 1 : -1;
          return 0;
        });
      }
      
      // Limit
      if (options.limit) {
        results = results.slice(0, options.limit);
      }
      
      // Offset
      if (options.offset) {
        results = results.slice(options.offset);
      }
      
      return results;
    } catch (error) {
      Logger.log('Database.query error: ' + error.toString());
      return [];
    }
  };
  
  /**
   * BATCH INSERT - Insert multiple records
   * @param {string} sheetName Nama sheet
   * @param {Array} dataArray Array of data objects
   * @return {Object} Result object
   */
  Database.prototype.batchInsert = function(sheetName, dataArray) {
    try {
      var sheet = this.getSheet(sheetName);
      var headers = this.getHeaders(sheetName);
      
      if (headers.length === 0) {
        return { success: false, message: 'Sheet belum memiliki headers' };
      }
      
      var rows = [];
      for (var i = 0; i < dataArray.length; i++) {
        rows.push(this.objectToRow(headers, dataArray[i]));
      }
      
      if (rows.length > 0) {
        var startRow = sheet.getLastRow() + 1;
        sheet.getRange(startRow, 1, rows.length, headers.length).setValues(rows);
      }
      
      return {
        success: true,
        message: dataArray.length + ' records berhasil ditambahkan',
        count: dataArray.length
      };
    } catch (error) {
      Logger.log('Database.batchInsert error: ' + error.toString());
      return { success: false, message: error.message };
    }
  };
  
  return Database;
})();

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Database;
}
