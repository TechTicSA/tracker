/* ============================================
   FINANCIAL MANAGEMENT SYSTEM - APP MODULE
   Core Utilities, Auth, UI Helpers, Charts
   ============================================ */

// Icon Registry (SVG paths)
const Icons = {
  dashboard: '<path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z"/>',
  budget: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>',
  report: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
  expense: '<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.15c-1.8.56-3.5 1.8-3.5 3.55 0 2.22 2.16 3.22 4.77 3.91 2.39.63 2.99 1.28 2.99 2.31 0 1.22-1.11 1.96-2.9 1.96-2.08 0-3.06-1.06-3.14-2.31H5.9c.1 2.17 1.51 3.68 3.6 4.09V21h3v-2.15c1.96-.53 3.6-1.8 3.6-3.55 0-2.34-2.13-3.37-4.3-3.9z"/>',
  bank: '<path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>',
  balance: '<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.15c-1.8.56-3.5 1.8-3.5 3.55 0 2.22 2.16 3.22 4.77 3.91 2.39.63 2.99 1.28 2.99 2.31 0 1.22-1.11 1.96-2.9 1.96-2.08 0-3.06-1.06-3.14-2.31H5.9c.1 2.17 1.51 3.68 3.6 4.09V21h3v-2.15c1.96-.53 3.6-1.8 3.6-3.55 0-2.34-2.13-3.37-4.3-3.9z"/>',
  clinic: '<path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>',
  loan: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 2.11.51 2.55 1.25 2.55 2.09 0 .95-.88 1.6-2.29 1.6-1.77 0-2.63-.94-2.73-1.96H7.69c.15 1.83 1.36 3.17 3.21 3.54V20h2.19v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.51-3.42z"/>',
  users: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
  settings: '<path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>',
  logout: '<path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>',
  edit: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
  delete: '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
  add: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>',
  close: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
  check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  menu: '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
  chartPie: '<path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm.5-2c-6.08.53-10.79 5.64-10.79 12s4.71 11.47 10.79 12c.17 0 .33-.01.5-.02V.02c-.17-.01-.33-.02-.5-.02z"/>',
  documentText: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
  cash: '<path d="M12.75 3.04c.46.03.75.45.75.91v1.1c2.43.22 4.41 2.01 4.93 4.37h1.12c.46 0 .88.29.91.75.03.49-.36.91-.86.91h-1.17c-.22 2.43-2.01 4.41-4.37 4.93v1.12c0 .46-.29.88-.75.91-.49.03-.91-.36-.91-.86v-1.17c-2.43-.22-4.41-2.01-4.93-4.37H6.45c-.46 0-.88-.29-.91-.75-.03-.49.36-.91.86-.91h1.17c.22-2.43 2.01-4.41 4.37-4.93V3.95c0-.46.29-.88.75-.91.06 0 .06 0 .06 0zM12 7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>',
  trendingUp: '<path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>',
  clipboardList: '<path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>',
  download: '<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>'
};

// Authentication Module
const Auth = {
  // Login user
  login(username, password) {
    const users = FMSData.getTable('users');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
  },

  // Logout user
  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },

  // Check if user is admin
  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },

  // Check if user can access page
  canAccessPage(pageId) {
    const user = this.getCurrentUser();
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.allowedPages?.includes(pageId) || user.allowedPages?.includes('all');
  },

  // Require auth, redirect to login if not
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  },

  // Require admin, redirect to dashboard if not
  requireAdmin() {
    if (!this.isAdmin()) {
      window.location.href = 'dashboard.html';
      return false;
    }
    return true;
  }
};

// UI Utilities
const UI = {
  // Render sidebar navigation
  renderSidebar(activePageId) {
    const user = Auth.getCurrentUser();
    const isAdmin = user?.role === 'admin';
    
    const navItems = [
      { id: 'dashboard', label: 'لوحة التحكم', icon: 'dashboard' },
      { id: 'annual-budget', label: 'الميزانية السنوية', icon: 'budget' },
      { id: 'monthly-report', label: 'التقرير الشهري', icon: 'report' },
      { id: 'expense-tracking', label: 'متابعة المصروفات', icon: 'expense' },
      { id: 'bank-statements', label: 'الكشوف البنكية', icon: 'bank' },
      { id: 'account-balances', label: 'أرصدة الحسابات', icon: 'balance' },
      { id: 'clinic-investment', label: 'استثمار العيادة', icon: 'clinic' },
      { id: 'loans', label: 'القروض والالتزامات', icon: 'loan' },
      { id: 'reports', label: 'مركز التقارير', icon: 'clipboard-list' },
      { id: 'users', label: 'إدارة المستخدمين', icon: 'users', adminOnly: true }
    ];

    const filteredItems = navItems.filter(item => {
      if (item.adminOnly && !isAdmin) return false;
      if (isAdmin) return true;
      return user?.allowedPages?.includes(item.id) || user?.allowedPages?.includes('all');
    });

    return `
      <div class="sidebar-header">
        <div class="sidebar-logo">م</div>
        <div>
          <div class="sidebar-title">النظام المالي</div>
          <div class="text-sm text-muted">Family Office</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${filteredItems.map(item => `
          <a href="${item.id}.html" class="nav-item ${item.id === activePageId ? 'active' : ''}">
            <svg viewBox="0 0 24 24" fill="currentColor">${Icons[item.icon]}</svg>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
    `;
  },

  // Set breadcrumb
  setBreadcrumb(items) {
    const breadcrumbEl = document.getElementById('breadcrumb');
    if (breadcrumbEl) {
      breadcrumbEl.innerHTML = items.map((item, index) => `
        ${index > 0 ? '<span class="breadcrumb-separator">/</span>' : ''}
        <span class="${index === items.length - 1 ? 'font-semibold' : ''}">${item}</span>
      `).join('');
    }
  },

  // Build table head
  buildTableHead(headers) {
    return `
      <thead>
        <tr>
          ${headers.map(h => `<th data-sort="${h.sortKey || ''}">${h.label}</th>`).join('')}
        </tr>
      </thead>
    `;
  },

  // Build money cell
  buildMoneyCell(value, bold = false) {
    return `<td class="tabular-nums ${bold ? 'font-bold' : ''}">${FMSData.formatCurrency(value)}</td>`;
  },

  // Build badge
  buildBadge(text, type) {
    return `<span class="badge badge-${type}">${text}</span>`;
  },

  // Show toast notification
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer') || this.createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        ${type === 'success' ? Icons.check : type === 'error' ? Icons.close : Icons.documentText}
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  },

  // Open modal
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  // Close modal
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // Format date
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  },

  // Escape HTML
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Chart Helpers
const Charts = {
  // Render donut chart
  renderDonut(data, total, radius = 80, thickness = 20) {
    const colors = ['#40c057', '#fa5252', '#fab005', '#339af0', '#845ef7', '#f06595', '#ff922b', '#20c997'];
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    
    const segments = data.map((item, index) => {
      const percentage = item.value / total;
      const strokeDasharray = `${percentage * circumference} ${circumference}`;
      const strokeDashoffset = -offset;
      offset += percentage * circumference;
      
      return `
        <circle
          cx="${radius + thickness}"
          cy="${radius + thickness}"
          r="${radius}"
          fill="none"
          stroke="${colors[index % colors.length]}"
          stroke-width="${thickness}"
          stroke-dasharray="${strokeDasharray}"
          stroke-dashoffset="${strokeDashoffset}"
          class="donut-segment"
        />
      `;
    }).join('');

    const legend = data.map((item, index) => `
      <div class="legend-item">
        <div class="legend-color" style="background: ${colors[index % colors.length]}"></div>
        <span>${item.label}: ${FMSData.formatCurrency(item.value)}</span>
      </div>
    `).join('');

    return `
      <div class="donut-chart">
        <svg width="${(radius + thickness) * 2}" height="${(radius + thickness) * 2}" class="donut-svg">
          <circle
            cx="${radius + thickness}"
            cy="${radius + thickness}"
            r="${radius}"
            fill="none"
            stroke="#e9ecef"
            stroke-width="${thickness}"
          />
          ${segments}
        </svg>
        <div class="donut-legend">
          ${legend}
        </div>
      </div>
    `;
  },

  // Render progress ring
  renderRing(percentage, size = 120, thickness = 10, color = 'info') {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    return `
      <div class="ring-chart">
        <svg width="${size}" height="${size}" class="ring-svg">
          <circle
            cx="${size/2}"
            cy="${size/2}"
            r="${radius}"
            fill="none"
            stroke="#e9ecef"
            stroke-width="${thickness}"
          />
          <circle
            cx="${size/2}"
            cy="${size/2}"
            r="${radius}"
            fill="none"
            stroke="var(--color-${color})"
            stroke-width="${thickness}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
            stroke-linecap="round"
          />
        </svg>
        <div class="ring-center">
          <div class="ring-value">${percentage.toFixed(1)}%</div>
          <div class="ring-label">منجز</div>
        </div>
      </div>
    `;
  },

  // Render bar chart
  renderBarChart(labels, values, colors, height = 200) {
    const maxValue = Math.max(...values);
    
    return `
      <div class="bar-chart" style="height: ${height}px;">
        ${labels.map((label, index) => {
          const heightPercent = (values[index] / maxValue) * 100;
          const value = values[index];
          const isNegative = value < 0;
          
          return `
            <div class="bar-group">
              <div class="bar" 
                   style="height: ${heightPercent}%; background: ${isNegative ? 'var(--color-danger)' : colors[index % colors.length]};"
                   title="${FMSData.formatCurrency(Math.abs(value))}">
              </div>
              <div class="bar-label">${label}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // Render sparkline
  renderSparkline(values, width = 100, height = 30, color = '#40c057') {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    
    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return `
      <svg width="${width}" height="${height}">
        <polyline
          points="${points}"
          fill="none"
          stroke="${color}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;
  }
};

// Table Builder
const TableBuilder = {
  // Create sortable table
  createSortableTable(containerId, data, columns, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let sortKey = options.defaultSort || null;
    let sortDir = 'asc';

    const render = () => {
      let sortedData = [...data];
      
      if (sortKey) {
        sortedData.sort((a, b) => {
          const aVal = a[sortKey];
          const bVal = b[sortKey];
          const dir = sortDir === 'asc' ? 1 : -1;
          return typeof aVal === 'string' 
            ? aVal.localeCompare(bVal) * dir 
            : (aVal - bVal) * dir;
        });
      }

      const html = `
        <div class="table-container">
          <table class="data-table">
            ${UI.buildTableHead(columns)}
            <tbody>
              ${sortedData.map(row => options.renderRow(row)).join('')}
            </tbody>
          </table>
        </div>
      `;
      
      container.innerHTML = html;

      // Add sort handlers
      container.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
          const key = th.dataset.sort;
          if (!key) return;
          
          if (sortKey === key) {
            sortDir = sortDir === 'asc' ? 'desc' : 'asc';
          } else {
            sortKey = key;
            sortDir = 'asc';
          }
          render();
        });
      });
    };

    render();
  }
};

// Form Helpers
const FormHelper = {
  // Get form values
  getFormValues(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    
    const formData = new FormData(form);
    const values = {};
    for (let [key, value] of formData.entries()) {
      values[key] = value;
    }
    return values;
  },

  // Validate required fields
  validateRequired(formId, fields) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    fields.forEach(field => {
      const input = form.querySelector(`[name="${field}"]`);
      if (input && !input.value.trim()) {
        input.style.borderColor = 'var(--color-danger)';
        isValid = false;
      } else if (input) {
        input.style.borderColor = '';
      }
    });
    
    return isValid;
  },

  // Reset form
  resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) form.reset();
  }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Setup mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // Setup modal close handlers
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) UI.closeModal(modal.id);
    });
  });

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        UI.closeModal(overlay.id);
      }
    });
  });

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        UI.closeModal(modal.id);
      });
    }
  });

  // Auto-hide viewer banner after 5 seconds
  const viewerBanner = document.querySelector('.viewer-banner');
  if (viewerBanner) {
    setTimeout(() => {
      viewerBanner.style.transition = 'opacity 0.3s';
      viewerBanner.style.opacity = '0';
      setTimeout(() => viewerBanner.remove(), 300);
    }, 5000);
  }
});

// Export modules
window.FMS = {
  Icons,
  Auth,
  UI,
  Charts,
  TableBuilder,
  FormHelper
};
