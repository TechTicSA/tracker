/**
 * Modal & Toast Components
 * Reusable dialog and notification system
 */

const Modals = {
  /**
   * Open modal with content
   * @param {string} content - HTML content
   * @param {string} title - Modal title
   * @param {object} options - { size: 'sm'|'md'|'lg'|'xl', showClose: boolean }
   */
  open(content, title = '', options = {}) {
    const { size = 'md', showClose = true } = options;
    
    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl'
    };

    const modalHTML = `
      <div id="modalOverlay" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="${sizeClasses[size]} w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
          <!-- Header -->
          ${title ? `
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 class="text-lg font-bold text-slate-900">${title}</h3>
              ${showClose ? `
                <button onclick="Modals.close()" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  ${Icons.get('close', 'slate')}
                </button>
              ` : ''}
            </div>
          ` : ''}
          
          <!-- Content -->
          <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
            ${content}
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.addEventListener('keydown', this.handleEscape);
  },

  /**
   * Close modal
   */
  close() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
      overlay.remove();
    }
    document.removeEventListener('keydown', this.handleEscape);
  },

  /**
   * Handle ESC key
   */
  handleEscape(e) {
    if (e.key === 'Escape') {
      Modals.close();
    }
  },

  /**
   * Show confirmation dialog
   * @param {string} message 
   * @param {Function} onConfirm 
   */
  confirm(message, onConfirm) {
    const content = `
      <div class="text-center">
        <div class="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
          ${Icons.get('trash', 'danger', 32)}
        </div>
        <p class="text-slate-700 mb-6">${message}</p>
        <div class="flex gap-3 justify-center">
          <button onclick="Modals.close()" class="btn-secondary">إلغاء</button>
          <button onclick="Modals.close(); (${onConfirm})()" class="btn-danger">تأكيد</button>
        </div>
      </div>
    `;
    this.open(content, 'تأكيد العملية', { size: 'sm' });
  },

  /**
   * Show toast notification
   * @param {string} message 
   * @param {string} type - 'success'|'error'|'info'|'warning'
   */
  toast(message, type = 'info') {
    const colors = {
      success: 'bg-primary-600',
      error: 'bg-danger-600',
      info: 'bg-info-600',
      warning: 'bg-warning-600'
    };

    const icons = {
      success: Icons.get('check', 'white'),
      error: Icons.get('close', 'white'),
      info: Icons.get('bell', 'white'),
      warning: Icons.get('eye', 'white')
    };

    const toastHTML = `
      <div class="fixed bottom-4 left-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-up">
        ${icons[type]}
        <span class="font-medium">${message}</span>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', toastHTML);
    
    setTimeout(() => {
      const toast = document.body.lastElementChild;
      if (toast) toast.remove();
    }, 3000);
  }
};

window.Modals = Modals;
window.showToast = Modals.toast;
window.openModal = Modals.open;
window.closeModal = Modals.close;
