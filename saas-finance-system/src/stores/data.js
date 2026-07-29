/**
 * Data Store - Central data management with localStorage persistence
 * Contains all business logic, mock data, and CRUD operations
 */

const DataStore = {
  // Initial mock data for first-time users
  initialData: {
    users: [
      {
        id: '1',
        name: 'المدير العام',
        username: 'admin',
        password: 'admin',
        role: 'admin',
        allowedPages: ['dashboard', 'annual-budget', 'monthly-report', 'expense-tracking', 'bank-statements', 'account-balances', 'clinic-investment', 'loans', 'reports', 'users'],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'مستخدم عرض فقط',
        username: 'viewer1',
        password: 'viewer1',
        role: 'viewer',
        allowedPages: ['dashboard', 'annual-budget', 'monthly-report', 'expense-tracking', 'bank-statements', 'account-balances', 'clinic-investment', 'loans', 'reports'],
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'محاسب',
        username: 'accountant',
        password: 'accountant',
        role: 'viewer',
        allowedPages: ['dashboard', 'monthly-report', 'bank-statements', 'account-balances', 'reports'],
        createdAt: new Date().toISOString()
      }
    ],

    // Annual Budget - Revenue Items
    budgetRevenue: [
      { id: 'r1', item: 'إيرادات العيادة', expected: 1200000, actual: 890000, delayed: 50000, uncollected: 30000, notes: 'تحصيل قوي في الربع الثالث' },
      { id: 'r2', item: 'عقار الخبر', expected: 450000, actual: 450000, delayed: 0, uncollected: 0, notes: '' },
      { id: 'r3', item: 'عقار المنصورية', expected: 380000, actual: 365000, delayed: 15000, uncollected: 0, notes: 'تأجير جزئي' },
      { id: 'r4', item: 'عقار الشفاء', expected: 520000, actual: 480000, delayed: 40000, uncollected: 0, notes: '' },
      { id: 'r5', item: 'عقار الازدهار', expected: 290000, actual: 275000, delayed: 15000, uncollected: 0, notes: '' },
      { id: 'r6', item: 'الراتب الشهري', expected: 840000, actual: 840000, delayed: 0, uncollected: 0, notes: '12 شهر × 70,000' },
      { id: 'r7', item: 'أرباح الأسهم', expected: 180000, actual: 165000, delayed: 0, uncollected: 15000, notes: 'توزيعات نصف سنوية' },
      { id: 'r8', item: 'عوائد الاستثمار', expected: 95000, actual: 72000, delayed: 23000, uncollected: 0, notes: '' },
      { id: 'r9', item: 'إيرادات أخرى', expected: 45000, actual: 38000, delayed: 7000, uncollected: 0, notes: '' },
      { id: 'r10', item: 'إيجارات إضافية', expected: 60000, actual: 52000, delayed: 8000, uncollected: 0, notes: '' }
    ],

    // Operating Expenses
    budgetOperating: [
      { id: 'o1', item: 'رواتب الموظفين', expected: 480000, actual: 480000 },
      { id: 'o2', item: 'الصيانة والتشغيل', expected: 120000, actual: 135000 },
      { id: 'o3', item: 'التسويق والإعلان', expected: 85000, actual: 72000 },
      { id: 'o4', item: 'التأمينات', expected: 65000, actual: 65000 },
      { id: 'o5', item: 'أتعاب مهنية', expected: 95000, actual: 88000 },
      { id: 'o6', item: 'مصروفات إدارية', expected: 75000, actual: 68000 }
    ],

    // Other Expenses
    budgetOther: [
      { id: 'x1', item: 'أقساط القروض', expected: 420000, actual: 420000 },
      { id: 'x2', item: 'مصروفات المعيشة', expected: 360000, actual: 385000 },
      { id: 'x3', item: 'تعليم الأبناء', expected: 180000, actual: 180000 },
      { id: 'x4', item: 'رعاية صحية', expected: 95000, actual: 112000 },
      { id: 'x5', item: 'سيارات ونقل', expected: 72000, actual: 68000 },
      { id: 'x6', item: 'تبرعات وزكاة', expected: 125000, actual: 125000 },
      { id: 'x7', item: 'سفر وسياحة', expected: 85000, actual: 62000 },
      { id: 'x8', item: 'هدايا ومناسبات', expected: 48000, actual: 55000 },
      { id: 'x9', item: 'طوارئ واحتياطي', expected: 100000, actual: 45000 },
      { id: 'x10', item: 'مصروفات متنوعة', expected: 60000, actual: 52000 }
    ],

    // Monthly Report Data (Jan-Jul 2026)
    monthlyRevenue: [
      { id: 'mr1', item: 'العيادة', jan: 125000, feb: 138000, mar: 142000, apr: 148000, may: 155000, jun: 162000, jul: 120000 },
      { id: 'mr2', item: 'الخبر', jan: 37500, feb: 37500, mar: 37500, apr: 37500, may: 37500, jun: 37500, jul: 37500 },
      { id: 'mr3', item: 'المنصورية', jan: 30000, feb: 30000, mar: 30000, apr: 30000, may: 32000, jun: 32000, jul: 31000 },
      { id: 'mr4', item: 'الشفاء', jan: 40000, feb: 40000, mar: 40000, apr: 40000, may: 40000, jun: 40000, jul: 40000 },
      { id: 'mr5', item: 'الازدهار', jan: 22000, feb: 22000, mar: 22000, apr: 23000, may: 23000, jun: 23000, jul: 24000 },
      { id: 'mr6', item: 'الراتب', jan: 70000, feb: 70000, mar: 70000, apr: 70000, may: 70000, jun: 70000, jul: 70000 },
      { id: 'mr7', item: 'الأسهم', jan: 0, feb: 0, mar: 85000, apr: 0, may: 0, jun: 80000, jul: 0 },
      { id: 'mr8', item: 'استثمارات', jan: 8000, feb: 9000, mar: 10000, apr: 11000, may: 12000, jun: 11000, jul: 11000 },
      { id: 'mr9', item: 'أخرى', jan: 5000, feb: 6000, mar: 5500, apr: 7000, may: 6500, jun: 7000, jul: 6000 }
    ],

    monthlyExpenses: [
      { id: 'me1', item: 'تشغيل العيادة', jan: 45000, feb: 48000, mar: 52000, apr: 50000, may: 53000, jun: 55000, jul: 48000 },
      { id: 'me2', item: 'رواتب', jan: 40000, feb: 40000, mar: 40000, apr: 40000, may: 40000, jun: 40000, jul: 40000 },
      { id: 'me3', item: 'صيانة', jan: 8000, feb: 12000, mar: 15000, apr: 10000, may: 11000, jun: 9000, jul: 20000 },
      { id: 'me4', item: 'تسويق', jan: 6000, feb: 5000, mar: 7000, apr: 8000, may: 9000, jun: 10000, jul: 7000 },
      { id: 'me5', item: 'أقساط', jan: 35000, feb: 35000, mar: 35000, apr: 35000, may: 35000, jun: 35000, jul: 35000 },
      { id: 'me6', item: 'معيشة', jan: 32000, feb: 30000, mar: 35000, apr: 33000, may: 34000, jun: 36000, jul: 32000 },
      { id: 'me7', item: 'تعليم', jan: 15000, feb: 15000, mar: 45000, apr: 15000, may: 15000, jun: 40000, jul: 15000 },
      { id: 'me8', item: 'أخرى', jan: 12000, feb: 10000, mar: 14000, apr: 11000, may: 13000, jun: 12000, jul: 11000 }
    ],

    // Expense Tracking (July 2026)
    expenseTracking: [
      { id: 'et1', item: 'رواتب الموظفين', account: 'الحساب اليومي', planned: 40000, actual: 40000 },
      { id: 'et2', item: 'إيجار المكتب', account: 'الحساب اليومي', planned: 15000, actual: 15000 },
      { id: 'et3', item: 'كهرباء وماء', account: 'الحساب اليومي', planned: 3500, actual: 4200 },
      { id: 'et4', item: 'إنترنت واتصالات', account: 'الحساب اليومي', planned: 800, actual: 850 },
      { id: 'et5', item: 'وقود وسيارات', account: 'الحساب اليومي', planned: 2500, actual: 2800 },
      { id: 'et6', item: 'صيانة مركبات', account: 'الحساب اليومي', planned: 1500, actual: 3200 },
      { id: 'et7', item: 'تأمينات', account: 'حساب الرواتب', planned: 5500, actual: 5500 },
      { id: 'et8', item: 'مصروفات عيادة', account: 'حساب العيادة', planned: 15000, actual: 14500 },
      { id: 'et9', item: 'أدوية ومستلزمات', account: 'حساب العيادة', planned: 8000, actual: 9200 },
      { id: 'et10', item: 'تسويق إلكتروني', account: 'الحساب اليومي', planned: 3000, actual: 2500 },
      { id: 'et11', item: 'خدمات بنكية', account: 'الحساب اليومي', planned: 500, actual: 650 },
      { id: 'et12', item: 'قرطاسية', account: 'الحساب اليومي', planned: 800, actual: 450 },
      { id: 'et13', item: 'تنظيف وأمن', account: 'الحساب اليومي', planned: 2000, actual: 2000 },
      { id: 'et14', item: 'مصروفات طارئة', account: 'حساب التوفير', planned: 3000, actual: 1500 }
    ],

    // Bank Accounts & Transactions
    bankAccounts: [
      {
        id: 'ba1',
        name: 'حساب الراتب',
        type: 'salary',
        openingBalance: 285000,
        transactions: [
          { id: 't1', date: '2026-07-01', description: 'إيداع راتب شهري', deposit: 70000, withdraw: 0 },
          { id: 't2', date: '2026-07-05', description: 'تحويل لحساب التوفير', deposit: 0, withdraw: 25000 },
          { id: 't3', date: '2026-07-10', description: 'سداد قرض', deposit: 0, withdraw: 15000 },
          { id: 't4', date: '2026-07-15', description: 'مصروفات معيشة', deposit: 0, withdraw: 8000 }
        ]
      },
      {
        id: 'ba2',
        name: 'الحساب اليومي',
        type: 'daily',
        openingBalance: 125000,
        transactions: [
          { id: 't5', date: '2026-07-02', description: 'إيرادات عيادة', deposit: 45000, withdraw: 0 },
          { id: 't6', date: '2026-07-03', description: 'رواتب موظفين', deposit: 0, withdraw: 40000 },
          { id: 't7', date: '2026-07-08', description: 'إيجار مكتب', deposit: 0, withdraw: 15000 },
          { id: 't8', date: '2026-07-12', description: 'كهرباء وماء', deposit: 0, withdraw: 4200 },
          { id: 't9', date: '2026-07-18', description: 'إيرادات إيجار', deposit: 37500, withdraw: 0 }
        ]
      },
      {
        id: 'ba3',
        name: 'حساب التوفير',
        type: 'savings',
        openingBalance: 580000,
        transactions: [
          { id: 't10', date: '2026-07-05', description: 'تحويل من الراتب', deposit: 25000, withdraw: 0 },
          { id: 't11', date: '2026-07-20', description: 'استثمار جديد', deposit: 0, withdraw: 50000 }
        ]
      },
      {
        id: 'ba4',
        name: 'حساب الأبناء',
        type: 'children',
        openingBalance: 320000,
        transactions: [
          { id: 't12', date: '2026-07-01', description: 'مصروف جامعي', deposit: 0, withdraw: 12000 },
          { id: 't13', date: '2026-07-15', description: 'كتب دراسية', deposit: 0, withdraw: 3500 }
        ]
      }
    ],

    // Account Balances Views
    balanceViews: {
      expected: [
        { id: 'bv1', account: 'حساب الراتب', opening: 285000, incoming: 70000, expense: 48000, current: 307000 },
        { id: 'bv2', account: 'الحساب اليومي', opening: 125000, incoming: 150000, expense: 95000, current: 180000 },
        { id: 'bv3', account: 'حساب التوفير', opening: 580000, incoming: 25000, expense: 50000, current: 555000 },
        { id: 'bv4', account: 'حساب الأبناء', opening: 320000, incoming: 0, expense: 15500, current: 304500 }
      ],
      actual: [
        { id: 'bv5', account: 'حساب الراتب', opening: 285000, incoming: 70000, expense: 52300, current: 302700 },
        { id: 'bv6', account: 'الحساب اليومي', opening: 125000, incoming: 132500, expense: 103850, current: 153650 },
        { id: 'bv7', account: 'حساب التوفير', opening: 580000, incoming: 25000, expense: 50000, current: 555000 },
        { id: 'bv8', account: 'حساب الأبناء', opening: 320000, incoming: 0, expense: 15500, current: 304500 }
      ],
      clinic: [
        { id: 'bv9', account: 'حساب العيادة الرئيسي', opening: 450000, incoming: 162000, expense: 53000, current: 559000 },
        { id: 'bv10', account: 'حساب أجهزة طبية', opening: 180000, incoming: 0, expense: 25000, current: 155000 },
        { id: 'bv11', account: 'حساب صيانة', opening: 35000, incoming: 0, expense: 8500, current: 26500 }
      ]
    },

    // Clinic Investment
    clinicInvestment: {
      goal: 1250000,
      capitalRecovery: 1000000,
      profitTarget: 250000,
      monthlyData: [
        { id: 'ci1', month: 'يناير 2026', date: '2026-01-31', collected: 125000, capitalReturn: 100000, profit: 25000, status: 'actual' },
        { id: 'ci2', month: 'فبراير 2026', date: '2026-02-28', collected: 138000, capitalReturn: 110000, profit: 28000, status: 'actual' },
        { id: 'ci3', month: 'مارس 2026', date: '2026-03-31', collected: 142000, capitalReturn: 115000, profit: 27000, status: 'actual' },
        { id: 'ci4', month: 'أبريل 2026', date: '2026-04-30', collected: 148000, capitalReturn: 120000, profit: 28000, status: 'actual' },
        { id: 'ci5', month: 'مايو 2026', date: '2026-05-31', collected: 155000, capitalReturn: 125000, profit: 30000, status: 'actual' },
        { id: 'ci6', month: 'يونيو 2026', date: '2026-06-30', collected: 162000, capitalReturn: 130000, profit: 32000, status: 'actual' },
        { id: 'ci7', month: 'يوليو 2026', date: '2026-07-31', collected: 120000, capitalReturn: 95000, profit: 25000, status: 'projected' },
        { id: 'ci8', month: 'أغسطس 2026', date: '2026-08-31', collected: 145000, capitalReturn: 115000, profit: 30000, status: 'projected' },
        { id: 'ci9', month: 'سبتمبر 2026', date: '2026-09-30', collected: 150000, capitalReturn: 120000, profit: 30000, status: 'projected' },
        { id: 'ci10', month: 'أكتوبر 2026', date: '2026-10-31', collected: 155000, capitalReturn: 125000, profit: 30000, status: 'projected' },
        { id: 'ci11', month: 'نوفمبر 2026', date: '2026-11-30', collected: 160000, capitalReturn: 130000, profit: 30000, status: 'projected' },
        { id: 'ci12', month: 'ديسمبر 2026', date: '2026-12-31', collected: 165000, capitalReturn: 135000, profit: 30000, status: 'projected' },
        { id: 'ci13', month: 'يناير 2027', date: '2027-01-31', collected: 170000, capitalReturn: 140000, profit: 30000, status: 'projected' },
        { id: 'ci14', month: 'فبراير 2027', date: '2027-02-28', collected: 175000, capitalReturn: 145000, profit: 30000, status: 'projected' },
        { id: 'ci15', month: 'مارس 2027', date: '2027-03-31', collected: 180000, capitalReturn: 150000, profit: 30000, status: 'projected' }
      ]
    },

    // Loans & Obligations
    loans: [
      {
        id: 'l1',
        name: 'قرض عقار الخبر',
        totalFinancing: 850000,
        interestRate: 4.5,
        installments: [
          { id: 'li1', number: 1, dueDate: '2026-01-15', amount: 15000, status: 'paid' },
          { id: 'li2', number: 2, dueDate: '2026-02-15', amount: 15000, status: 'paid' },
          { id: 'li3', number: 3, dueDate: '2026-03-15', amount: 15000, status: 'paid' },
          { id: 'li4', number: 4, dueDate: '2026-04-15', amount: 15000, status: 'paid' },
          { id: 'li5', number: 5, dueDate: '2026-05-15', amount: 15000, status: 'paid' },
          { id: 'li6', number: 6, dueDate: '2026-06-15', amount: 15000, status: 'paid' },
          { id: 'li7', number: 7, dueDate: '2026-07-15', amount: 15000, status: 'pending' },
          { id: 'li8', number: 8, dueDate: '2026-08-15', amount: 15000, status: 'upcoming' }
        ]
      },
      {
        id: 'l2',
        name: 'قرض شخصي',
        totalFinancing: 450000,
        interestRate: 5.25,
        installments: [
          { id: 'li9', number: 1, dueDate: '2026-01-01', amount: 10000, status: 'paid' },
          { id: 'li10', number: 2, dueDate: '2026-02-01', amount: 10000, status: 'paid' },
          { id: 'li11', number: 3, dueDate: '2026-03-01', amount: 10000, status: 'paid' },
          { id: 'li12', number: 4, dueDate: '2026-04-01', amount: 10000, status: 'paid' },
          { id: 'li13', number: 5, dueDate: '2026-05-01', amount: 10000, status: 'paid' },
          { id: 'li14', number: 6, dueDate: '2026-06-01', amount: 10000, status: 'paid' },
          { id: 'li15', number: 7, dueDate: '2026-07-01', amount: 10000, status: 'pending' },
          { id: 'li16', number: 8, dueDate: '2026-08-01', amount: 10000, status: 'upcoming' }
        ]
      },
      {
        id: 'l3',
        name: 'تمويل عيادة',
        totalFinancing: 620000,
        interestRate: 3.8,
        installments: [
          { id: 'li17', number: 1, dueDate: '2026-02-01', amount: 20000, status: 'paid' },
          { id: 'li18', number: 2, dueDate: '2026-03-01', amount: 20000, status: 'paid' },
          { id: 'li19', number: 3, dueDate: '2026-04-01', amount: 20000, status: 'paid' },
          { id: 'li20', number: 4, dueDate: '2026-05-01', amount: 20000, status: 'paid' },
          { id: 'li21', number: 5, dueDate: '2026-06-01', amount: 20000, status: 'paid' },
          { id: 'li22', number: 6, dueDate: '2026-07-01', amount: 20000, status: 'pending' },
          { id: 'li23', number: 7, dueDate: '2026-08-01', amount: 20000, status: 'upcoming' }
        ]
      }
    ],

    // Reports Definitions
    reports: [
      { id: 'rep1', title: 'ملخص الميزانية السنوية', description: 'عرض شامل للإيرادات والمصروفات المتوقعة والفعلية', icon: 'budget', category: 'budget' },
      { id: 'rep2', title: 'قائمة الدخل الشهرية', description: 'تحليل الأرباح والخسائر لشهر محدد', icon: 'income', category: 'financial' },
      { id: 'rep3', title: 'تقرير التدفق النقدي', description: 'حركة النقد الداخلة والخارجة', icon: 'cashflow', category: 'financial' },
      { id: 'rep4', title: 'أداء الاستثمارات', description: 'متابعة عوائد المحافظ الاستثمارية', icon: 'investment', category: 'investment' },
      { id: 'rep5', title: 'جدول السداد', description: 'مواعيد وأقساط القروض المستحقة', icon: 'loan', category: 'loans' },
      { id: 'rep6', title: 'التوافق البنكي', description: 'مطابقة كشوف الحسابات', icon: 'bank', category: 'banking' }
    ]
  },

  /**
   * Initialize data in localStorage if not exists
   */
  init() {
    const existing = Helpers.storage.get('financeData');
    if (!existing) {
      this.saveData(this.initialData);
    }
  },

  /**
   * Get all data
   * @returns {object}
   */
  getData() {
    return Helpers.storage.get('financeData', this.initialData);
  },

  /**
   * Save all data
   * @param {object} data 
   */
  saveData(data) {
    Helpers.storage.set('financeData', data);
  },

  /**
   * Get specific collection
   * @param {string} collection 
   * @returns {Array|object}
   */
  getCollection(collection) {
    const data = this.getData();
    return data[collection] || [];
  },

  /**
   * Add item to collection
   * @param {string} collection 
   * @param {object} item 
   */
  addToCollection(collection, item) {
    const data = this.getData();
    if (!data[collection]) data[collection] = [];
    item.id = Helpers.generateId();
    item.createdAt = new Date().toISOString();
    data[collection].push(item);
    this.saveData(data);
    return item;
  },

  /**
   * Update item in collection
   * @param {string} collection 
   * @param {string} id 
   * @param {object} updates 
   */
  updateInCollection(collection, id, updates) {
    const data = this.getData();
    if (!data[collection]) return false;
    
    const index = data[collection].findIndex(item => item.id === id);
    if (index === -1) return false;
    
    data[collection][index] = { ...data[collection][index], ...updates, updatedAt: new Date().toISOString() };
    this.saveData(data);
    return true;
  },

  /**
   * Delete item from collection
   * @param {string} collection 
   * @param {string} id 
   */
  deleteFromCollection(collection, id) {
    const data = this.getData();
    if (!data[collection]) return false;
    
    data[collection] = data[collection].filter(item => item.id !== id);
    this.saveData(data);
    return true;
  },

  /**
   * Get users
   * @returns {Array}
   */
  getUsers() {
    return this.getCollection('users');
  },

  /**
   * Calculate totals for dashboard
   * @returns {object}
   */
  getDashboardTotals() {
    const data = this.getData();
    
    // Total Revenue (Actual)
    const revenueTotal = data.budgetRevenue.reduce((sum, item) => sum + (item.actual || 0), 0);
    const revenueExpected = data.budgetRevenue.reduce((sum, item) => sum + (item.expected || 0), 0);
    
    // Total Expenses (Actual)
    const operatingTotal = data.budgetOperating.reduce((sum, item) => sum + (item.actual || 0), 0);
    const otherTotal = data.budgetOther.reduce((sum, item) => sum + (item.actual || 0), 0);
    const expensesTotal = operatingTotal + otherTotal;
    
    const expensesExpected = data.budgetOperating.reduce((sum, item) => sum + (item.expected || 0), 0) +
                            data.budgetOther.reduce((sum, item) => sum + (item.expected || 0), 0);
    
    // Net Position
    const netPosition = revenueTotal - expensesTotal;
    
    // Achievement Rate
    const achievementRate = revenueExpected > 0 ? (revenueTotal / revenueExpected) * 100 : 0;
    
    return {
      revenue: revenueTotal,
      revenueExpected,
      expenses: expensesTotal,
      expensesExpected,
      netPosition,
      achievementRate,
      revenueDelta: ((revenueTotal - revenueExpected) / revenueExpected * 100).toFixed(1),
      expensesDelta: ((expensesTotal - expensesExpected) / expensesExpected * 100).toFixed(1)
    };
  },

  /**
   * Get revenue breakdown for donut chart
   * @returns {Array}
   */
  getRevenueBreakdown() {
    const data = this.getData();
    return data.budgetRevenue.map(item => ({
      label: item.item,
      value: item.actual,
      percentage: Helpers.calculateAchievement(item.actual, item.expected)
    })).filter(item => item.value > 0);
  },

  /**
   * Get monthly comparison data
   * @returns {Array}
   */
  getMonthlyComparison() {
    const data = this.getData();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul'];
    const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'];
    
    const revenue = months.map((m, i) => ({
      month: monthNames[i],
      revenue: Helpers.sumBy(data.monthlyRevenue, m),
      expenses: Helpers.sumBy(data.monthlyExpenses, m),
      net: Helpers.sumBy(data.monthlyRevenue, m) - Helpers.sumBy(data.monthlyExpenses, m)
    }));
    
    return revenue;
  },

  /**
   * Get loan summary
   * @returns {Array}
   */
  getLoansSummary() {
    const loans = this.getCollection('loans');
    return loans.map(loan => {
      const paid = loan.installments.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
      const remaining = loan.totalFinancing - paid;
      const progress = (paid / loan.totalFinancing) * 100;
      
      return {
        ...loan,
        paid,
        remaining,
        progress
      };
    });
  },

  /**
   * Reset data to initial state
   */
  resetData() {
    this.saveData(this.initialData);
  }
};

// Initialize on load
DataStore.init();
window.DataStore = DataStore;
