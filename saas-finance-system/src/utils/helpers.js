/**
 * Helper Utilities for Financial Management System
 * Professional-grade utility functions for formatting, validation, and data manipulation
 */

const Helpers = {
  /**
   * Format numbers as Saudi Riyal currency
   * @param {number} amount - The amount to format
   * @param {boolean} showSymbol - Whether to show ر.س symbol
   * @returns {string} Formatted currency string
   */
  formatCurrency(amount, showSymbol = true) {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return showSymbol ? '0 ر.س' : '0';
    }
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return showSymbol ? `${formatted} ر.س` : formatted;
  },

  /**
   * Format percentage with color coding
   * @param {number} value - Percentage value (0-100)
   * @returns {object} { text, class }
   */
  formatPercentage(value) {
    if (value === null || value === undefined || isNaN(value)) {
      return { text: '0%', class: 'text-slate-400' };
    }
    const numValue = parseFloat(value);
    let cssClass = 'text-slate-600';
    if (numValue >= 80) cssClass = 'text-primary-600';
    else if (numValue >= 50) cssClass = 'text-warning-600';
    else cssClass = 'text-danger-600';
    
    return {
      text: `${numValue.toFixed(1)}%`,
      class: cssClass
    };
  },

  /**
   * Format date in Arabic
   * @param {Date|string} date - Date to format
   * @param {string} format - 'short' | 'long' | 'month-year'
   * @returns {string} Formatted date
   */
  formatDate(date, format = 'short') {
    if (!date) return '';
    const d = new Date(date);
    const options = {
      short: { day: 'numeric', month: 'numeric', year: 'numeric' },
      long: { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' },
      'month-year': { month: 'long', year: 'numeric' }
    };
    return d.toLocaleDateString('ar-SA', options[format] || options.short);
  },

  /**
   * Calculate achievement percentage
   * @param {number} actual - Actual value
   * @param {number} expected - Expected/target value
   * @returns {number} Achievement percentage
   */
  calculateAchievement(actual, expected) {
    if (!expected || expected === 0) return 0;
    return Math.min((actual / expected) * 100, 999);
  },

  /**
   * Generate unique ID
   * @returns {string} Unique identifier
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Deep clone an object
   * @param {object} obj - Object to clone
   * @returns {object} Cloned object
   */
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function} Debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Validate required fields
   * @param {object} data - Data object
   * @param {Array} requiredFields - Array of required field names
   * @returns {object} { valid, errors }
   */
  validateRequired(data, requiredFields) {
    const errors = [];
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        errors.push(field);
      }
    });
    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Calculate running balance
   * @param {number} openingBalance - Starting balance
   * @param {Array} transactions - Array of transactions with deposit/withdraw
   * @returns {Array} Transactions with running balance
   */
  calculateRunningBalance(openingBalance, transactions) {
    let balance = openingBalance;
    return transactions.map(t => {
      const deposit = parseFloat(t.deposit) || 0;
      const withdraw = parseFloat(t.withdraw) || 0;
      balance += deposit - withdraw;
      return { ...t, runningBalance: balance };
    });
  },

  /**
   * Group array by key
   * @param {Array} array - Array to group
   * @param {string} key - Key to group by
   * @returns {object} Grouped object
   */
  groupBy(array, key) {
    return array.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) result[group] = [];
      result[group].push(item);
      return result;
    }, {});
  },

  /**
   * Sort array by key
   * @param {Array} array - Array to sort
   * @param {string} key - Key to sort by
   * @param {string} order - 'asc' or 'desc'
   * @returns {Array} Sorted array
   */
  sortBy(array, key, order = 'asc') {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  },

  /**
   * Calculate sum of array property
   * @param {Array} array - Array of objects
   * @param {string} key - Property to sum
   * @returns {number} Sum
   */
  sumBy(array, key) {
    return array.reduce((sum, item) => sum + (parseFloat(item[key]) || 0), 0);
  },

  /**
   * Get status badge configuration
   * @param {string} status - Status value
   * @returns {object} { text, class }
   */
  getStatusBadge(status) {
    const config = {
      'active': { text: 'نشط', class: 'badge-success' },
      'inactive': { text: 'غير نشط', class: 'badge-danger' },
      'pending': { text: 'قيد الانتظار', class: 'badge-warning' },
      'completed': { text: 'مكتمل', class: 'badge-success' },
      'overdue': { text: 'متأخر', class: 'badge-danger' },
      'within_budget': { text: 'ضمن الميزانية', class: 'badge-success' },
      'over_budget': { text: 'تجاوز', class: 'badge-danger' },
      'actual': { text: 'فعلي', class: 'badge-success' },
      'projected': { text: 'تقديري', class: 'bg-slate-100 text-slate-700' },
    };
    return config[status] || { text: status, class: 'badge-info' };
  },

  /**
   * LocalStorage wrapper with error handling
   */
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.error(`Error reading from localStorage: ${key}`, e);
        return defaultValue;
      }
    },
    
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error(`Error writing to localStorage: ${key}`, e);
        return false;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error(`Error removing from localStorage: ${key}`, e);
        return false;
      }
    }
  },

  /**
   * Simulate async operation with delay
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Export data to CSV
   * @param {Array} data - Array of objects
   * @param {string} filename - Output filename
   */
  exportToCSV(data, filename = 'export.csv') {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => 
          `"${String(row[header]).replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
};

// Make available globally
window.Helpers = Helpers;
