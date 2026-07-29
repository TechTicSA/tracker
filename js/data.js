/* ============================================
   FINANCIAL MANAGEMENT SYSTEM - DATA MODULE
   Complete Mock Database with Sample Data
   ============================================ */

const defaultData = {
  // Users (3 users: 1 admin, 2 viewers)
  users: [
    {
      id: 1,
      name: "المدير العام",
      username: "admin",
      password: "admin",
      role: "admin",
      allowedPages: ["all"],
      createdAt: "2026-01-01"
    },
    {
      id: 2,
      name: "مستخدم عرض 1",
      username: "viewer1",
      password: "viewer1",
      role: "viewer",
      allowedPages: ["dashboard", "annual-budget", "monthly-report", "expense-tracking", "bank-statements", "account-balances", "clinic-investment", "loans", "reports"],
      createdAt: "2026-01-15"
    },
    {
      id: 3,
      name: "مستخدم عرض 2",
      username: "viewer2",
      password: "viewer2",
      role: "viewer",
      allowedPages: ["dashboard", "monthly-report", "reports"],
      createdAt: "2026-02-01"
    }
  ],

  // Annual Budget - Revenue Items (10 items)
  budgetRevenue: [
    { id: 1, item: "راتب شهري", expected: 45000, actual: 44500, delayed: 500, uncollected: 0, notes: "خصم تأمينات" },
    { id: 2, item: "عائد العيادة", expected: 35000, actual: 36200, delayed: 0, uncollected: 0, notes: "" },
    { id: 3, item: "إيجار الخبر", expected: 25000, actual: 25000, delayed: 0, uncollected: 0, notes: "" },
    { id: 4, item: "إيجار المنصورية", expected: 18000, actual: 17500, delayed: 500, uncollected: 0, notes: "تأخير مستأجر" },
    { id: 5, item: "إيجار الشفاء", expected: 22000, actual: 22000, delayed: 0, uncollected: 0, notes: "" },
    { id: 6, item: "إيجار الازدهار", expected: 20000, actual: 19000, delayed: 1000, uncollected: 0, notes: "" },
    { id: 7, item: "أرباح أسهم", expected: 15000, actual: 12300, delayed: 0, uncollected: 2700, notes: "تراجع السوق" },
    { id: 8, item: "عوائد بنكية", expected: 5000, actual: 4800, delayed: 0, uncollected: 200, notes: "" },
    { id: 9, item: "استثمارات أخرى", expected: 10000, actual: 8500, delayed: 0, uncollected: 1500, notes: "" },
    { id: 10, item: "إيرادات متنوعة", expected: 3000, actual: 2700, delayed: 0, uncollected: 300, notes: "" }
  ],

  // Annual Budget - Operating Expenses (6 items)
  budgetOperating: [
    { id: 1, item: "رواتب موظفين", expected: 80000, actual: 80000 },
    { id: 2, item: "إيجار مكتب", expected: 25000, actual: 25000 },
    { id: 3, item: "كهرباء وماء", expected: 12000, actual: 13500 },
    { id: 4, item: "صيانة", expected: 8000, actual: 6200 },
    { id: 5, item: "تأمينات", expected: 15000, actual: 15000 },
    { id: 6, item: "مصروفات إدارية", expected: 10000, actual: 9800 }
  ],

  // Annual Budget - Other Expenses (10 items)
  budgetOther: [
    { id: 1, item: "أقساط قروض", expected: 45000, actual: 45000 },
    { id: 2, item: "تعليم أطفال", expected: 30000, actual: 30000 },
    { id: 3, item: "سيارات", expected: 8000, actual: 7500 },
    { id: 4, item: "سفر", expected: 15000, actual: 12000 },
    { id: 5, item: "هدايا ومناسبات", expected: 10000, actual: 8500 },
    { id: 6, item: "تبرعات", expected: 20000, actual: 20000 },
    { id: 7, item: "استثمارات جديدة", expected: 50000, actual: 35000 },
    { id: 8, item: "طوارئ", expected: 10000, actual: 5000 },
    { id: 9, item: "مصروفات شخصية", expected: 25000, actual: 27000 },
    { id: 10, item: "أخرى", expected: 5000, actual: 4200 }
  ],

  // Monthly Report Data (7 months: Jan-Jul 2026)
  monthlyRevenue: [
    { id: 1, item: "راتب", jan: 45000, feb: 45000, mar: 45000, apr: 45000, may: 45000, jun: 45000, jul: 44500 },
    { id: 2, item: "العيادة", jan: 32000, feb: 33500, mar: 34000, apr: 35000, may: 35500, jun: 36000, jul: 36200 },
    { id: 3, item: "الخبر", jan: 25000, feb: 25000, mar: 25000, apr: 25000, may: 25000, jun: 25000, jul: 25000 },
    { id: 4, item: "المنصورية", jan: 18000, feb: 18000, mar: 18000, apr: 17500, may: 17500, jun: 17500, jul: 17500 },
    { id: 5, item: "الشفاء", jan: 22000, feb: 22000, mar: 22000, apr: 22000, may: 22000, jun: 22000, jul: 22000 },
    { id: 6, item: "الازدهار", jan: 20000, feb: 20000, mar: 20000, apr: 19000, may: 19000, jun: 19000, jul: 19000 },
    { id: 7, item: "أسهم", jan: 10000, feb: 11000, mar: 12000, apr: 11500, may: 12000, jun: 13000, jul: 12300 },
    { id: 8, item: "عوائد بنكية", jan: 4500, feb: 4600, mar: 4700, apr: 4750, may: 4800, jun: 4850, jul: 4800 },
    { id: 9, item: "أخرى", jan: 8000, feb: 8200, mar: 8500, apr: 8300, may: 8400, jun: 8600, jul: 8500 }
  ],

  monthlyExpenses: [
    { id: 1, item: "رواتب", jan: 80000, feb: 80000, mar: 80000, apr: 80000, may: 80000, jun: 80000, jul: 80000 },
    { id: 2, item: "إيجار", jan: 25000, feb: 25000, mar: 25000, apr: 25000, may: 25000, jun: 25000, jul: 25000 },
    { id: 3, item: "كهرباء", jan: 15000, feb: 14000, mar: 12000, apr: 11000, may: 13000, jun: 14500, jul: 13500 },
    { id: 4, item: "صيانة", jan: 5000, feb: 3000, mar: 8000, apr: 2000, may: 4000, jun: 6000, jul: 6200 },
    { id: 5, item: "تأمينات", jan: 15000, feb: 15000, mar: 15000, apr: 15000, may: 15000, jun: 15000, jul: 15000 },
    { id: 6, item: "قروض", jan: 45000, feb: 45000, mar: 45000, apr: 45000, may: 45000, jun: 45000, jul: 45000 },
    { id: 7, item: "تعليم", jan: 30000, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0 },
    { id: 8, item: "أخرى", jan: 20000, feb: 18000, mar: 22000, apr: 19000, may: 21000, jun: 20000, jul: 19500 }
  ],

  // Expense Tracking (14 items for July 2026)
  expenseTracking: [
    { id: 1, item: "بقالة وطعام", account: "يومي", planned: 3000, actual: 3200 },
    { id: 2, item: "وقود", account: "يومي", planned: 1500, actual: 1450 },
    { id: 3, item: "مطاعم", account: "يومي", planned: 2000, actual: 2300 },
    { id: 4, item: "أدوية", account: "يومي", planned: 500, actual: 650 },
    { id: 5, item: "ترفيه", account: "يومي", planned: 1000, actual: 800 },
    { id: 6, item: "تسوق", account: "يومي", planned: 2500, actual: 2800 },
    { id: 7, item: "صيانة منزل", account: "توفير", planned: 1000, actual: 0 },
    { id: 8, item: "خدمات منزلية", account: "يومي", planned: 800, actual: 800 },
    { id: 9, item: "إنترنت واتصالات", account: "راتب", planned: 600, actual: 600 },
    { id: 10, item: "اشتراكات", account: "راتب", planned: 400, actual: 400 },
    { id: 11, item: "هدايا", account: "توفير", planned: 500, actual: 700 },
    { id: 12, item: "صدقات", account: "توفير", planned: 1000, actual: 1000 },
    { id: 13, item: "نوادي", account: "يومي", planned: 300, actual: 300 },
    { id: 14, item: "أخرى", account: "يومي", planned: 500, actual: 420 }
  ],

  // Bank Accounts & Transactions
  bankAccounts: [
    {
      id: 1,
      name: "حساب الراتب",
      openingBalance: 125000,
      transactions: [
        { id: 1, date: "2026-07-01", description: "إيداع راتب", deposit: 45000, withdraw: 0 },
        { id: 2, date: "2026-07-05", description: "تحويل لتوفير", deposit: 0, withdraw: 10000 },
        { id: 3, date: "2026-07-10", description: "سداد قرض", deposit: 0, withdraw: 15000 },
        { id: 4, date: "2026-07-15", description: "مصروفات معيشة", deposit: 0, withdraw: 8000 }
      ]
    },
    {
      id: 2,
      name: "حساب المصروفات اليومية",
      openingBalance: 15000,
      transactions: [
        { id: 1, date: "2026-07-01", description: "تحويل من الراتب", deposit: 5000, withdraw: 0 },
        { id: 2, date: "2026-07-03", description: "بقالة", deposit: 0, withdraw: 1200 },
        { id: 3, date: "2026-07-08", description: "وقود", deposit: 0, withdraw: 450 },
        { id: 4, date: "2026-07-12", description: "مطعم", deposit: 0, withdraw: 350 }
      ]
    },
    {
      id: 3,
      name: "حساب التوفير",
      openingBalance: 250000,
      transactions: [
        { id: 1, date: "2026-07-05", description: "تحويل من الراتب", deposit: 10000, withdraw: 0 },
        { id: 2, date: "2026-07-20", description: "عائد استثماري", deposit: 5000, withdraw: 0 },
        { id: 3, date: "2026-07-25", description: "شراء أسهم", deposit: 0, withdraw: 8000 }
      ]
    },
    {
      id: 4,
      name: "حساب الأولاد",
      openingBalance: 50000,
      transactions: [
        { id: 1, date: "2026-07-01", description: "مصروف جيب", deposit: 0, withdraw: 2000 },
        { id: 2, date: "2026-07-15", description: "أنشطة", deposit: 0, withdraw: 1500 },
        { id: 3, date: "2026-07-20", description: "هدية عيد ميلاد", deposit: 3000, withdraw: 0 }
      ]
    }
  ],

  // Account Balances (3 views)
  accountBalancesExpected: [
    { id: 1, account: "حساب الراتب", opening: 125000, incoming: 50000, expense: 35000, current: 140000 },
    { id: 2, account: "حساب التوفير", opening: 250000, incoming: 15000, expense: 8000, current: 257000 },
    { id: 3, account: "حساب الأولاد", opening: 50000, incoming: 3000, expense: 5000, current: 48000 }
  ],

  accountBalancesActual: [
    { id: 1, account: "حساب الراتب", opening: 125000, incoming: 45000, expense: 33000, current: 137000 },
    { id: 2, account: "حساب التوفير", opening: 250000, incoming: 15000, expense: 8000, current: 257000 },
    { id: 3, account: "حساب الأولاد", opening: 50000, incoming: 3000, expense: 3500, current: 49500 }
  ],

  accountBalancesClinic: [
    { id: 1, account: "رصيد العيادة", opening: 180000, incoming: 36200, expense: 12000, current: 204200 },
    { id: 2, account: "احتياطي العيادة", opening: 100000, incoming: 0, expense: 5000, current: 95000 },
    { id: 3, account: "مستحقات العيادة", opening: 25000, incoming: 8000, expense: 0, current: 33000 }
  ],

  // Clinic Investment (6 actual + 9 projected months)
  clinicInvestment: {
    totalGoal: 1250000,
    capitalRecovery: 1000000,
    profitTarget: 250000,
    monthlyData: [
      { month: "يناير", date: "2026-01-31", collected: 32000, capitalReturn: 25600, profit: 6400, status: "actual" },
      { month: "فبراير", date: "2026-02-28", collected: 33500, capitalReturn: 26800, profit: 6700, status: "actual" },
      { month: "مارس", date: "2026-03-31", collected: 34000, capitalReturn: 27200, profit: 6800, status: "actual" },
      { month: "أبريل", date: "2026-04-30", collected: 35000, capitalReturn: 28000, profit: 7000, status: "actual" },
      { month: "مايو", date: "2026-05-31", collected: 35500, capitalReturn: 28400, profit: 7100, status: "actual" },
      { month: "يونيو", date: "2026-06-30", collected: 36000, capitalReturn: 28800, profit: 7200, status: "actual" },
      { month: "يوليو", date: "2026-07-31", collected: 36200, capitalReturn: 28960, profit: 7240, status: "projected" },
      { month: "أغسطس", date: "2026-08-31", collected: 36500, capitalReturn: 29200, profit: 7300, status: "projected" },
      { month: "سبتمبر", date: "2026-09-30", collected: 37000, capitalReturn: 29600, profit: 7400, status: "projected" },
      { month: "أكتوبر", date: "2026-10-31", collected: 37500, capitalReturn: 30000, profit: 7500, status: "projected" },
      { month: "نوفمبر", date: "2026-11-30", collected: 38000, capitalReturn: 30400, profit: 7600, status: "projected" },
      { month: "ديسمبر", date: "2026-12-31", collected: 38500, capitalReturn: 30800, profit: 7700, status: "projected" },
      { month: "يناير 2027", date: "2027-01-31", collected: 39000, capitalReturn: 31200, profit: 7800, status: "projected" },
      { month: "فبراير 2027", date: "2027-02-28", collected: 39500, capitalReturn: 31600, profit: 7900, status: "projected" },
      { month: "مارس 2027", date: "2027-03-31", collected: 40000, capitalReturn: 32000, profit: 8000, status: "projected" }
    ]
  },

  // Loans & Obligations (3 loans)
  loans: [
    {
      id: 1,
      name: "قرض السيارة",
      totalFinancing: 120000,
      interestRate: 3.5,
      installments: [
        { id: 1, number: 1, dueDate: "2026-01-15", amount: 5000, status: "paid" },
        { id: 2, number: 2, dueDate: "2026-02-15", amount: 5000, status: "paid" },
        { id: 3, number: 3, dueDate: "2026-03-15", amount: 5000, status: "paid" },
        { id: 4, number: 4, dueDate: "2026-04-15", amount: 5000, status: "paid" },
        { id: 5, number: 5, dueDate: "2026-05-15", amount: 5000, status: "paid" },
        { id: 6, number: 6, dueDate: "2026-06-15", amount: 5000, status: "paid" },
        { id: 7, number: 7, dueDate: "2026-07-15", amount: 5000, status: "pending" }
      ]
    },
    {
      id: 2,
      name: "قرض شخصي",
      totalFinancing: 200000,
      interestRate: 4.0,
      installments: [
        { id: 1, number: 1, dueDate: "2026-01-20", amount: 10000, status: "paid" },
        { id: 2, number: 2, dueDate: "2026-02-20", amount: 10000, status: "paid" },
        { id: 3, number: 3, dueDate: "2026-03-20", amount: 10000, status: "paid" },
        { id: 4, number: 4, dueDate: "2026-04-20", amount: 10000, status: "paid" },
        { id: 5, number: 5, dueDate: "2026-05-20", amount: 10000, status: "paid" },
        { id: 6, number: 6, dueDate: "2026-06-20", amount: 10000, status: "paid" },
        { id: 7, number: 7, dueDate: "2026-07-20", amount: 10000, status: "pending" },
        { id: 8, number: 8, dueDate: "2026-08-20", amount: 10000, status: "pending" }
      ]
    },
    {
      id: 3,
      name: "تمويل عقاري",
      totalFinancing: 500000,
      interestRate: 5.0,
      installments: [
        { id: 1, number: 1, dueDate: "2026-01-25", amount: 15000, status: "paid" },
        { id: 2, number: 2, dueDate: "2026-02-25", amount: 15000, status: "paid" },
        { id: 3, number: 3, dueDate: "2026-03-25", amount: 15000, status: "paid" },
        { id: 4, number: 4, dueDate: "2026-04-25", amount: 15000, status: "paid" },
        { id: 5, number: 5, dueDate: "2026-05-25", amount: 15000, status: "paid" },
        { id: 6, number: 6, dueDate: "2026-06-25", amount: 15000, status: "paid" },
        { id: 7, number: 7, dueDate: "2026-07-25", amount: 15000, status: "pending" }
      ]
    }
  ],

  // Report Definitions
  reports: [
    {
      id: 1,
      title: "ملخص الميزانية السنوية",
      description: "عرض شامل للإيرادات والمصروفات المتوقعة والفعلية",
      icon: "chart-pie",
      type: "budget"
    },
    {
      id: 2,
      title: "قائمة الأرباح والخسائر",
      description: "تحليل شهري للأداء المالي وصافي التدفق",
      icon: "document-text",
      type: "pl"
    },
    {
      id: 3,
      title: "تقرير التدفق النقدي",
      description: "متابعة حركة الدخول والخروج للحسابات",
      icon: "cash",
      type: "cashflow"
    },
    {
      id: 4,
      title: "أداء الاستثمارات",
      description: "تقييم عوائد العيادة والاستثمارات الأخرى",
      icon: "trending-up",
      type: "investment"
    },
    {
      id: 5,
      title: "جدول القروض",
      description: "متابعة أقساط القروض والمدفوعات المتبقية",
      icon: "clipboard-list",
      type: "loans"
    },
    {
      id: 6,
      title: "تسوية الحسابات البنكية",
      description: "مطابقة الأرصدة والحركات المصرفية",
      icon: "bank",
      type: "reconciliation"
    }
  ]
};

// Initialize localStorage with default data if not exists
function initializeData() {
  if (!localStorage.getItem('fmsData')) {
    localStorage.setItem('fmsData', JSON.stringify(defaultData));
  }
}

// Get all data from localStorage
function getData() {
  return JSON.parse(localStorage.getItem('fmsData') || JSON.stringify(defaultData));
}

// Save data to localStorage
function saveData(data) {
  localStorage.setItem('fmsData', JSON.stringify(data));
}

// Get specific table
function getTable(tableName) {
  const data = getData();
  return data[tableName] || [];
}

// Update specific table
function updateTable(tableName, newData) {
  const data = getData();
  data[tableName] = newData;
  saveData(data);
}

// Add item to table
function addItem(tableName, item) {
  const data = getData();
  if (!data[tableName]) data[tableName] = [];
  item.id = Date.now();
  item.createdAt = new Date().toISOString().split('T')[0];
  data[tableName].push(item);
  saveData(data);
  return item;
}

// Update item in table
function updateItem(tableName, itemId, updates) {
  const data = getData();
  const index = data[tableName]?.findIndex(item => item.id === itemId);
  if (index !== undefined && index !== -1) {
    data[tableName][index] = { ...data[tableName][index], ...updates };
    saveData(data);
    return data[tableName][index];
  }
  return null;
}

// Delete item from table
function deleteItem(tableName, itemId) {
  const data = getData();
  const initialLength = data[tableName]?.length || 0;
  data[tableName] = data[tableName]?.filter(item => item.id !== itemId) || [];
  if (data[tableName].length < initialLength) {
    saveData(data);
    return true;
  }
  return false;
}

// Format currency (SAR)
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Format percentage
function formatPercentage(value) {
  return `${value.toFixed(1)}%`;
}

// Calculate achievement percentage
function calculateAchievement(actual, expected) {
  if (expected === 0) return 0;
  return (actual / expected) * 100;
}

// Get achievement badge class
function getAchievementBadgeClass(percentage) {
  if (percentage >= 80) return 'badge-success';
  if (percentage >= 50) return 'badge-warning';
  return 'badge-danger';
}

// Initialize on load
initializeData();

// Export for use in other modules
window.FMSData = {
  getData,
  saveData,
  getTable,
  updateTable,
  addItem,
  updateItem,
  deleteItem,
  formatCurrency,
  formatPercentage,
  calculateAchievement,
  getAchievementBadgeClass,
  defaultData
};
