/**
 * Helper.gs - Fungsi-fungsi helper dan utility
 * Bagian dari Teacher Generator PJOK SD
 * 
 * @fileoverview Fungsi umum untuk formatting, validasi, dan operasi helper lainnya
 */

/**
 * Format tanggal ke format Indonesia
 * @param {Date|string} date - Tanggal yang diformat
 * @param {string} format - Format output (default: 'DD MMMM YYYY')
 * @return {string} Tanggal terformat
 */
function formatDateID(date, format) {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const days = [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ];
  
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const dayName = days[d.getDay()];
  
  if (!format || format === 'DD MMMM YYYY') {
    return `${day} ${month} ${year}`;
  } else if (format === 'YYYY-MM-DD') {
    return `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  } else if (format === 'DD/MM/YYYY') {
    return `${String(day).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${year}`;
  } else if (format === 'full') {
    return `${dayName}, ${day} ${month} ${year}`;
  }
  
  return `${day} ${month} ${year}`;
}

/**
 * Format angka ke format Rupiah
 * @param {number} number - Angka yang diformat
 * @param {boolean} withSymbol - Termasuk simbol Rp
 * @return {string} Angka terformat
 */
function formatRupiah(number, withSymbol = true) {
  if (number === null || number === undefined || isNaN(number)) return 'Rp 0';
  
  const formatted = new Intl.NumberFormat('id-ID').format(number);
  return withSymbol ? `Rp ${formatted}` : formatted;
}

/**
 * Generate ID unik
 * @param {string} prefix - Prefix untuk ID
 * @return {string} ID unik
 */
function generateUniqueId(prefix = 'ID') {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}_${timestamp}${random}`;
}

/**
 * Sanitize string untuk keamanan
 * @param {string} str - String yang disanitize
 * @return {string} String yang aman
 */
function sanitizeString(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Escape HTML entities
 * @param {string} html - HTML string
 * @return {string} Escaped string
 */
function escapeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Unescape HTML entities
 * @param {string} text - Text dengan HTML entities
 * @return {string} Unescaped string
 */
function unescapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

/**
 * Truncate text dengan ellipsis
 * @param {string} text - Text yang dipotong
 * @param {number} maxLength - Panjang maksimal
 * @return {string} Text terpotong
 */
function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength) + '...';
}

/**
 * Parse JSON dengan error handling
 * @param {string} jsonString - JSON string
 * @param {*} defaultValue - Default value jika parsing gagal
 * @return {*} Parsed object atau default value
 */
function safeJsonParse(jsonString, defaultValue = {}) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    Logger.log('JSON parse error: ' + e.toString());
    return defaultValue;
  }
}

/**
 * Stringify JSON dengan error handling
 * @param {*} obj - Object yang di-stringify
 * @param {string} defaultValue - Default value jika stringify gagal
 * @return {string} JSON string atau default
 */
function safeJsonStringify(obj, defaultValue = '{}') {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    Logger.log('JSON stringify error: ' + e.toString());
    return defaultValue;
  }
}

/**
 * Validasi email
 * @param {string} email - Email yang divalidasi
 * @return {boolean} True jika valid
 */
function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validasi nomor telepon Indonesia
 * @param {string} phone - Nomor telepon
 * @return {boolean} True jika valid
 */
function isValidPhone(phone) {
  if (!phone) return false;
  const re = /^(\+62|62|0)[8-9][0-9]{8,11}$/;
  return re.test(String(phone).replace(/[\s-]/g, ''));
}

/**
 * Get initials dari nama
 * @param {string} name - Nama lengkap
 * @return {string} Inisial
 */
function getInitials(name) {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

/**
 * Slugify string untuk URL
 * @param {string} text - Text yang dislugify
 * @return {string} Slug
 */
function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Capitalize first letter setiap kata
 * @param {string} str - String yang dikapitalisasi
 * @return {string} String terkapitalisasi
 */
function titleCase(str) {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

/**
 * Calculate selisih hari antara dua tanggal
 * @param {Date|string} date1 - Tanggal pertama
 * @param {Date|string} date2 - Tanggal kedua
 * @return {number} Selisih hari
 */
function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get semester dari bulan
 * @param {number} month - Bulan (1-12)
 * @return {number} Semester (1 atau 2)
 */
function getSemesterFromMonth(month) {
  if (!month) month = new Date().getMonth() + 1;
  return (month >= 7) ? 2 : 1;
}

/**
 * Get tahun ajaran dari tanggal
 * @param {Date|string} date - Tanggal
 * @return {string} Tahun ajaran (contoh: "2024/2025")
 */
function getTahunAjaran(date) {
  const d = new Date(date || new Date());
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  
  // Tahun ajaran dimulai Juli
  if (month >= 7) {
    return `${year}/${year + 1}`;
  } else {
    return `${year - 1}/${year}`;
  }
}

/**
 * Array shuffle (Fisher-Yates)
 * @param {Array} array - Array yang di-shuffle
 * @return {Array} Array teracak
 */
function shuffleArray(array) {
  if (!array || !Array.isArray(array)) return array;
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * Group array by key
 * @param {Array} array - Array of objects
 * @param {string} key - Key untuk grouping
 * @return {Object} Grouped object
 */
function groupBy(array, key) {
  if (!array || !Array.isArray(array)) return {};
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
}

/**
 * Deep clone object
 * @param {*} obj - Object yang di-clone
 * @return {*} Cloned object
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get file extension dari filename
 * @param {string} filename - Nama file
 * @return {string} Extension
 */
function getFileExtension(filename) {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

/**
 * Get filename tanpa extension
 * @param {string} filename - Nama file
 * @return {string} Filename tanpa extension
 */
function getFileNameWithoutExtension(filename) {
  if (!filename) return '';
  const parts = filename.split('.');
  if (parts.length > 1) {
    parts.pop();
  }
  return parts.join('.');
}

/**
 * Format bytes to human readable
 * @param {number} bytes - Bytes
 * @param {number} decimals - Decimal places
 * @return {string} Formatted size
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Sleep function untuk delay
 * @param {number} ms - Milliseconds
 * @return {void}
 */
function sleep(ms) {
  Utilities.sleep(ms);
}

/**
 * Retry function dengan exponential backoff
 * @param {Function} fn - Function yang diretry
 * @param {number} maxRetries - Maksimal retry
 * @param {number} delay - Delay awal (ms)
 * @return {*} Result dari function
 */
function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  let lastError;
  let currentDelay = delay;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return fn();
    } catch (e) {
      lastError = e;
      Logger.log(`Retry ${i + 1}/${maxRetries} failed: ${e.toString()}`);
      if (i < maxRetries - 1) {
        Utilities.sleep(currentDelay);
        currentDelay *= 2; // Exponential backoff
      }
    }
  }
  
  throw lastError;
}

/**
 * Batch array menjadi chunks
 * @param {Array} array - Array yang dibagi
 * @param {number} size - Ukuran chunk
 * @return {Array<Array>} Array of chunks
 */
function chunkArray(array, size) {
  if (!array || !Array.isArray(array)) return [];
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Remove duplicate dari array
 * @param {Array} array - Array dengan duplikat
 * @return {Array} Array tanpa duplikat
 */
function removeDuplicates(array) {
  if (!array || !Array.isArray(array)) return [];
  return [...new Set(array)];
}

/**
 * Flatten nested array
 * @param {Array} array - Nested array
 * @return {Array} Flattened array
 */
function flattenArray(array) {
  if (!array || !Array.isArray(array)) return [];
  return array.flat(Infinity);
}

/**
 * Compare two objects deeply
 * @param {*} obj1 - Object pertama
 * @param {*} obj2 - Object kedua
 * @return {boolean} True jika sama
 */
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Pick specific keys from object
 * @param {Object} obj - Object source
 * @param {Array<string>} keys - Keys yang diambil
 * @return {Object} Object dengan keys terpilih
 */
function pickKeys(obj, keys) {
  if (!obj || typeof obj !== 'object') return {};
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

/**
 * Omit specific keys from object
 * @param {Object} obj - Object source
 * @param {Array<string>} keys - Keys yang dihapus
 * @return {Object} Object tanpa keys tertentu
 */
function omitKeys(obj, keys) {
  if (!obj || typeof obj !== 'object') return {};
  return Object.keys(obj).reduce((acc, key) => {
    if (keys.indexOf(key) === -1) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

/**
 * Get current timestamp ISO format
 * @return {string} ISO timestamp
 */
function getCurrentTimestamp() {
  return new Date().toISOString();
}

/**
 * Get current datetime local format
 * @return {string} Local datetime
 */
function getCurrentDateTimeLocal() {
  const now = new Date();
  return now.toISOString().slice(0, 16);
}

/**
 * Parse datetime local string to Date
 * @param {string} datetimeLocal - Datetime dalam format lokal
 * @return {Date} Date object
 */
function parseDateTimeLocal(datetimeLocal) {
  if (!datetimeLocal) return new Date();
  return new Date(datetimeLocal);
}

/**
 * Add days to date
 * @param {Date|string} date - Tanggal awal
 * @param {number} days - Jumlah hari
 * @return {Date} Tanggal baru
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to date
 * @param {Date|string} date - Tanggal awal
 * @param {number} months - Jumlah bulan
 * @return {Date} Tanggal baru
 */
function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Get first day of month
 * @param {Date|string} date - Tanggal
 * @return {Date} First day of month
 */
function getFirstDayOfMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/**
 * Get last day of month
 * @param {Date|string} date - Tanggal
 * @return {Date} Last day of month
 */
function getLastDayOfMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

/**
 * Is leap year
 * @param {number} year - Tahun
 * @return {boolean} True jika kabisat
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Get week number from date
 * @param {Date|string} date - Tanggal
 * @return {number} Week number
 */
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Convert 24h time to 12h format
 * @param {string} time24 - Time in 24h format (HH:MM)
 * @return {string} Time in 12h format
 */
function time24to12(time24) {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

/**
 * Convert 12h time to 24h format
 * @param {string} time12 - Time in 12h format with AM/PM
 * @return {string} Time in 24h format
 */
function time12to24(time12) {
  if (!time12) return '';
  const [time, modifier] = time12.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);
  
  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

/**
 * Create range array
 * @param {number} start - Start value
 * @param {number} end - End value
 * @return {Array<number>} Array of numbers
 */
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Sum array values
 * @param {Array<number>} array - Array of numbers
 * @return {number} Sum
 */
function sumArray(array) {
  if (!array || !Array.isArray(array)) return 0;
  return array.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
}

/**
 * Average array values
 * @param {Array<number>} array - Array of numbers
 * @return {number} Average
 */
function averageArray(array) {
  if (!array || !Array.isArray(array) || array.length === 0) return 0;
  return sumArray(array) / array.length;
}

/**
 * Min value in array
 * @param {Array<number>} array - Array of numbers
 * @return {number} Min value
 */
function minArray(array) {
  if (!array || !Array.isArray(array) || array.length === 0) return 0;
  return Math.min(...array.map(v => parseFloat(v) || 0));
}

/**
 * Max value in array
 * @param {Array<number>} array - Array of numbers
 * @return {number} Max value
 */
function maxArray(array) {
  if (!array || !Array.isArray(array) || array.length === 0) return 0;
  return Math.max(...array.map(v => parseFloat(v) || 0));
}

/**
 * Round to specific decimal places
 * @param {number} value - Value to round
 * @param {number} decimals - Decimal places
 * @return {number} Rounded value
 */
function roundTo(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Clamp value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @return {number} Clamped value
 */
function clamp(value, min, max) {
  if (value === null || value === undefined || isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Map value from one range to another
 * @param {number} value - Value to map
 * @param {number} inMin - Input min
 * @param {number} inMax - Input max
 * @param {number} outMin - Output min
 * @param {number} outMax - Output max
 * @return {number} Mapped value
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
  if (value === null || value === undefined || isNaN(value)) return outMin;
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Debounce function execution
 * Note: GAS doesn't support async debounce well, this is for reference
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @return {Function} Debounced function
 */
function debounce(func, wait) {
  // This is a simplified version for GAS context
  return function(...args) {
    return func.apply(this, args);
  };
}

/**
 * Throttle function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in ms
 * @return {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      inThrottle = true;
      const result = func.apply(this, args);
      setTimeout(() => inThrottle = false, limit);
      return result;
    }
  };
}

/**
 * Memoize function results
 * @param {Function} func - Function to memoize
 * @return {Function} Memoized function
 */
function memoize(func) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = func.apply(this, args);
    cache[key] = result;
    return result;
  };
}

/**
 * Compose multiple functions
 * @param {...Function} funcs - Functions to compose
 * @return {Function} Composed function
 */
function compose(...funcs) {
  return function(x) {
    return funcs.reduceRight((acc, fn) => fn(acc), x);
  };
}

/**
 * Pipe multiple functions
 * @param {...Function} funcs - Functions to pipe
 * @return {Function} Piped function
 */
function pipe(...funcs) {
  return function(x) {
    return funcs.reduce((acc, fn) => fn(acc), x);
  };
}

/**
 * Check if value is empty
 * @param {*} value - Value to check
 * @return {boolean} True if empty
 */
function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Check if value is not empty
 * @param {*} value - Value to check
 * @return {boolean} True if not empty
 */
function isNotEmpty(value) {
  return !isEmpty(value);
}

/**
 * Coalesce multiple values, return first non-null/undefined
 * @param {...*} values - Values to coalesce
 * @return {*} First non-null value or null
 */
function coalesce(...values) {
  for (const val of values) {
    if (val !== null && val !== undefined) {
      return val;
    }
  }
  return null;
}

/**
 * Create object from keys and values
 * @param {Array<string>} keys - Keys
 * @param {Array<*>} values - Values
 * @return {Object} Created object
 */
function zipObject(keys, values) {
  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
}

/**
 * Invert object keys and values
 * @param {Object} obj - Object to invert
 * @return {Object} Inverted object
 */
function invertObject(obj) {
  const inverted = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      inverted[obj[key]] = key;
    }
  }
  return inverted;
}

/**
 * Merge objects deeply
 * @param {Object} target - Target object
 * @param {...Object} sources - Source objects
 * @return {Object} Merged object
 */
function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  
  const source = sources.shift();
  if (source === undefined) return target;
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key]) && isObject(target[key])) {
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  
  return deepMerge(target, ...sources);
}

/**
 * Check if value is object
 * @param {*} value - Value to check
 * @return {boolean} True if object
 */
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Create deferred promise-like object (for GAS context)
 * @return {Object} Deferred object with resolve/reject
 */
function createDeferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/**
 * Parallel execute functions (simulated for GAS)
 * @param {Array<Function>} funcs - Functions to execute
 * @return {Array<*>} Results
 */
function parallelExecute(funcs) {
  // GAS runs synchronously, so this just executes sequentially
  return funcs.map(fn => fn());
}

/**
 * Series execute functions
 * @param {Array<Function>} funcs - Functions to execute
 * @return {Array<*>} Results
 */
function seriesExecute(funcs) {
  const results = [];
  for (const fn of funcs) {
    results.push(fn());
  }
  return results;
}

/**
 * Timeout wrapper for functions
 * @param {Function} fn - Function to wrap
 * @param {number} timeout - Timeout in ms
 * @return {Function} Wrapped function
 */
function withTimeout(fn, timeout) {
  return function(...args) {
    const startTime = new Date().getTime();
    const result = fn.apply(this, args);
    const endTime = new Date().getTime();
    
    if (endTime - startTime > timeout) {
      throw new Error('Function execution timeout');
    }
    
    return result;
  };
}

/**
 * Log function execution time
 * @param {string} name - Function name
 * @param {Function} fn - Function to log
 * @return {Function} Wrapped function
 */
function withLogging(name, fn) {
  return function(...args) {
    const startTime = new Date().getTime();
    Logger.log(`Starting ${name}`);
    
    try {
      const result = fn.apply(this, args);
      const endTime = new Date().getTime();
      Logger.log(`Completed ${name} in ${endTime - startTime}ms`);
      return result;
    } catch (e) {
      const endTime = new Date().getTime();
      Logger.log(`Error in ${name} after ${endTime - startTime}ms: ${e.toString()}`);
      throw e;
    }
  };
}
