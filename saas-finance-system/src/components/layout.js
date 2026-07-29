/**
 * Layout Components - Sidebar, Header, Breadcrumbs
 * Reusable UI components for consistent navigation
 */

const Layout = {
  /**
   * Navigation pages configuration
   */
  pages: [
    { id: 'dashboard', name: 'لوحة التحكم', icon: 'dashboard' },
    { id: 'annual-budget', name: 'الميزانية السنوية', icon: 'budget' },
    { id: 'monthly-report', name: 'التقرير الشهري', icon: 'report' },
    { id: 'expense-tracking', name: 'متابعة المصروفات', icon: 'expenses' },
    { id: 'bank-statements', name: 'الكشوف البنكية', icon: 'bank' },
    { id: 'account-balances', name: 'أرصدة الحسابات', icon: 'balance' },
    { id: 'clinic-investment', name: 'استثمار العيادة', icon: 'clinic' },
    { id: 'loans', name: 'القروض والالتزامات', icon: 'loan' },
    { id: 'reports', name: 'مركز التقارير', icon: 'reports' },
    { id: 'users', name: 'إدارة المستخدمين', icon: 'users', adminOnly: true }
  ],

  /**
   * Render sidebar navigation
   * @param {string} activePageId 
   * @returns {string} HTML
   */
  renderSidebar(activePageId) {
    const user = AuthStore.getCurrentUser();
    const isAdmin = user?.role === 'admin';
    
    const navItems = this.pages.filter(page => {
      if (page.adminOnly && !isAdmin) return false;
      return true;
    });

    const itemsHTML = navItems.map(page => {
      const isActive = page.id === activePageId;
      return `
        <a href="#${page.id}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}"
           data-page="${page.id}">
          ${Icons.get(page.icon, isActive ? 'white' : 'slate')}
          <span class="font-medium">${page.name}</span>
          ${page.adminOnly ? '<span class="badge badge-warning mr-auto text-xs">مدير</span>' : ''}
        </a>
      `;
    }).join('');

    return `
      <aside id="sidebar" class="fixed top-0 right-0 h-full w-72 bg-white border-l border-slate-200 z-40 
                                   transform transition-transform duration-300 ease-in-out lg:translate-x-0
                                   ${activePageId ? 'translate-x-0' : 'translate-x-full'}">
        <!-- Logo -->
        <div class="p-6 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              ${Icons.get('logo', 'white')}
            </div>
            <div>
              <h1 class="font-bold text-lg text-slate-900">النظام المالي</h1>
              <p class="text-xs text-slate-500">Family Office</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          ${itemsHTML}
        </nav>

        <!-- User Info -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-bold">
              ${user?.name?.charAt(0) || 'U'}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm text-slate-900 truncate">${user?.name || 'مستخدم'}</p>
              <p class="text-xs text-slate-500">${user?.role === 'admin' ? 'مدير النظام' : 'مستخدم'}</p>
            </div>
            <button onclick="AuthStore.logout(); window.location.hash = '#login'" 
                    class="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500 hover:text-danger-600">
              ${Icons.get('logout', 'slate')}
            </button>
          </div>
        </div>
      </aside>
    `;
  },

  /**
   * Render top header bar
   * @param {string} pageTitle 
   * @returns {string} HTML
   */
  renderHeader(pageTitle) {
    const user = AuthStore.getCurrentUser();
    const isViewer = user?.role === 'viewer';
    
    return `
      <header class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div class="flex items-center justify-between px-6 py-4">
          <!-- Mobile Menu Button -->
          <button id="mobileMenuBtn" class="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
            ${Icons.get('menu', 'slate')}
          </button>

          <!-- Page Title & Breadcrumb -->
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-slate-900">${pageTitle}</h1>
            <div id="breadcrumb" class="flex items-center gap-2 mt-1 text-sm text-slate-500">
              <span>الرئيسية</span>
              <span class="text-slate-300">/</span>
              <span class="text-slate-900 font-medium">${pageTitle}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            ${isViewer ? `
              <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-warning-50 border border-warning-200 rounded-lg">
                ${Icons.get('eye', 'warning')}
                <span class="text-sm font-medium text-warning-800">أنت في وضع المشاهدة فقط</span>
              </div>
            ` : ''}
            
            <button class="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              ${Icons.get('bell', 'slate')}
              <span class="absolute top-1.5 left-1.5 w-2 h-2 bg-danger-500 rounded-full"></span>
            </button>
            
            <button class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              ${Icons.get('settings', 'slate')}
            </button>
          </div>
        </div>
      </header>
    `;
  },

  /**
   * Set breadcrumb items
   * @param {Array} items - Array of breadcrumb items
   */
  setBreadcrumb(items) {
    const breadcrumbEl = document.getElementById('breadcrumb');
    if (!breadcrumbEl) return;
    
    const html = items.map((item, index) => `
      <span class="${index === items.length - 1 ? 'text-slate-900 font-medium' : ''}">${item}</span>
      ${index < items.length - 1 ? '<span class="text-slate-300">/</span>' : ''}
    `).join('');
    
    breadcrumbEl.innerHTML = html;
  },

  /**
   * Main content wrapper
   * @param {string} content 
   * @returns {string} HTML
   */
  wrapContent(content) {
    return `
      <div class="min-h-screen bg-slate-50">
        <div id="sidebarContainer"></div>
        <div class="lg:mr-72 transition-all duration-300">
          ${content}
        </div>
      </div>
    `;
  }
};

window.Layout = Layout;
