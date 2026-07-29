/**
 * Main Application Entry Point
 * Router, initialization, and global event handlers
 */

// App State
const App = {
  currentPage: null,
  
  /**
   * Initialize application
   */
  init() {
    // Initialize stores
    AuthStore.init();
    
    // Setup router
    this.setupRouter();
    
    // Handle initial route
    this.handleRoute();
    
    // Setup mobile menu handler
    this.setupMobileMenu();
    
    console.log('✅ Financial Management System initialized');
  },

  /**
   * Setup hash-based router
   */
  setupRouter() {
    window.addEventListener('hashchange', () => this.handleRoute());
  },

  /**
   * Handle route changes
   */
  handleRoute() {
    const hash = window.location.hash.slice(1) || 'login';
    this.currentPage = hash;
    
    // Auth guard
    if (hash !== 'login' && !AuthStore.isAuthenticated()) {
      window.location.hash = '#login';
      return;
    }
    
    // Redirect logged-in users from login page
    if (hash === 'login' && AuthStore.isAuthenticated()) {
      window.location.hash = '#dashboard';
      return;
    }
    
    // Check page access permissions
    if (hash !== 'login' && !AuthStore.canAccessPage(hash)) {
      showToast('ليس لديك صلاحية الوصول لهذه الصفحة', 'error');
      window.location.hash = '#dashboard';
      return;
    }
    
    // Render page
    this.renderPage(hash);
  },

  /**
   * Render page based on route
   * @param {string} pageId 
   */
  renderPage(pageId) {
    const appEl = document.getElementById('app');
    if (!appEl) return;
    
    let pageHTML = '';
    
    switch(pageId) {
      case 'login':
        pageHTML = LoginPage.render();
        break;
      case 'dashboard':
        pageHTML = Layout.wrapContent(DashboardPage.render());
        break;
      case 'annual-budget':
        pageHTML = Layout.wrapContent(AnnualBudgetPage ? AnnualBudgetPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      case 'monthly-report':
        pageHTML = Layout.wrapContent(MonthlyReportPage ? MonthlyReportPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      case 'expense-tracking':
        pageHTML = Layout.wrapContent(ExpenseTrackingPage ? ExpenseTrackingPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      case 'bank-statements':
        pageHTML = Layout.wrapContent(BankStatementsPage ? BankStatementsPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      case 'account-balances':
        pageHTML = Layout.wrapContent(AccountBalancesPage ? AccountBalancesPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      case 'clinic-investment':
        pageHTML = Layout.wrapContent(ClinicInvestmentPage ? ClinicInvestmentPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      case 'loans':
        pageHTML = Layout.wrapContent(LoansPage ? LoansPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      case 'reports':
        pageHTML = Layout.wrapContent(ReportsPage ? ReportsPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      case 'users':
        pageHTML = Layout.wrapContent(UsersPage ? UsersPage.render() : '<main class="p-6"><h1 class="text-2xl font-bold">قريباً...</h1></main>');
        break;
      default:
        pageHTML = Layout.wrapContent(DashboardPage.render());
    }
    
    appEl.innerHTML = pageHTML;
    
    // Initialize sidebar for non-login pages
    if (pageId !== 'login') {
      const sidebarContainer = document.getElementById('sidebarContainer');
      if (sidebarContainer) {
        sidebarContainer.innerHTML = Layout.renderSidebar(pageId);
      }
      
      // Set breadcrumb
      const currentPage = Layout.pages.find(p => p.id === pageId);
      if (currentPage) {
        Layout.setBreadcrumb(['الرئيسية', currentPage.name]);
      }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  },

  /**
   * Setup mobile menu toggle
   */
  setupMobileMenu() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('#mobileMenuBtn')) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
          const isClosed = sidebar.classList.contains('translate-x-full');
          if (isClosed) {
            sidebar.classList.remove('translate-x-full');
          } else {
            sidebar.classList.add('translate-x-full');
          }
        }
      }
      
      // Close sidebar when clicking outside on mobile
      if (window.innerWidth < 1024) {
        const sidebar = document.getElementById('sidebar');
        const mobileBtn = document.getElementById('mobileMenuBtn');
        if (sidebar && !sidebar.contains(e.target) && !mobileBtn?.contains(e.target)) {
          sidebar.classList.add('translate-x-full');
        }
      }
    });
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

window.App = App;
