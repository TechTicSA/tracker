/**
 * Authentication Store
 * Manages user sessions, permissions, and role-based access control
 */

const AuthStore = {
  currentUser: null,
  
  /**
   * Initialize auth state from localStorage
   */
  init() {
    const stored = Helpers.storage.get('currentUser');
    if (stored) {
      this.currentUser = stored;
    }
  },

  /**
   * Login with credentials
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<{success: boolean, user?: object, error?: string}>}
   */
  async login(username, password) {
    await Helpers.delay(300); // Simulate network delay
    
    const users = DataStore.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      return { success: false, error: 'بيانات الدخول غير صحيحة' };
    }
    
    // Create session without exposing password
    const { password: _, ...userWithoutPassword } = user;
    this.currentUser = userWithoutPassword;
    Helpers.storage.set('currentUser', userWithoutPassword);
    
    return { success: true, user: userWithoutPassword };
  },

  /**
   * Logout current user
   */
  logout() {
    this.currentUser = null;
    Helpers.storage.remove('currentUser');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.currentUser;
  },

  /**
   * Check if user has admin role
   * @returns {boolean}
   */
  isAdmin() {
    return this.currentUser?.role === 'admin';
  },

  /**
   * Check if user can access a page
   * @param {string} pageId - Page identifier
   * @returns {boolean}
   */
  canAccessPage(pageId) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'admin') return true;
    
    // Viewer users need explicit permission
    return this.currentUser.allowedPages?.includes(pageId) || false;
  },

  /**
   * Check if user can perform write operations
   * @returns {boolean}
   */
  canWrite() {
    return this.currentUser?.role === 'admin';
  },

  /**
   * Get current user data (without sensitive info)
   * @returns {object|null}
   */
  getCurrentUser() {
    return this.currentUser;
  },

  /**
   * Guard function for protected routes
   * @param {string} pageId - Page to check
   * @returns {boolean} true if allowed, false otherwise
   */
  guard(pageId) {
    if (!this.isAuthenticated()) {
      window.location.hash = '#login';
      return false;
    }
    
    if (pageId !== 'login' && !this.canAccessPage(pageId)) {
      // Redirect non-admin users trying to access admin pages
      if (pageId === 'users') {
        showToast('ليس لديك صلاحية الوصول لهذه الصفحة', 'error');
        window.location.hash = '#dashboard';
        return false;
      }
    }
    
    return true;
  }
};

window.AuthStore = AuthStore;
