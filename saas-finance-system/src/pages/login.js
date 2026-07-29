/**
 * Login Page Component
 * Professional authentication interface
 */

const LoginPage = {
  render() {
    return `
      <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-20 w-96 h-96 bg-info-500 rounded-full blur-3xl"></div>
        </div>

        <!-- Login Card -->
        <div class="relative w-full max-w-md">
          <!-- Logo & Title -->
          <div class="text-center mb-8">
            <div class="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary-600/30">
              ${Icons.get('logo', 'white', 40)}
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">النظام المالي</h1>
            <p class="text-slate-400">Family Office Financial Management</p>
          </div>

          <!-- Login Form -->
          <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <form id="loginForm" onsubmit="LoginPage.handleSubmit(event)" class="space-y-6">
              <!-- Username Field -->
              <div>
                <label class="block text-sm font-medium text-white mb-2">اسم المستخدم</label>
                <div class="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="أدخل اسم المستخدم"
                    autocomplete="username"
                  />
                </div>
              </div>

              <!-- Password Field -->
              <div>
                <label class="block text-sm font-medium text-white mb-2">كلمة المرور</label>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="أدخل كلمة المرور"
                    autocomplete="current-password"
                  />
                </div>
              </div>

              <!-- Error Message -->
              <div id="errorMessage" class="hidden bg-danger-500/20 border border-danger-500/50 rounded-lg p-3 text-danger-200 text-sm"></div>

              <!-- Submit Button -->
              <button
                type="submit"
                id="submitBtn"
                class="w-full btn-primary py-3 text-lg gradient-primary shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50"
              >
                تسجيل الدخول
              </button>
            </form>

            <!-- Demo Credentials -->
            <div class="mt-8 pt-6 border-t border-white/10">
              <p class="text-xs text-slate-400 text-center mb-3">بيانات تجريبية للعرض:</p>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-white/5 rounded-lg p-3 text-center">
                  <p class="text-xs text-slate-400 mb-1">مدير النظام</p>
                  <p class="text-sm font-mono text-primary-300">admin / admin</p>
                </div>
                <div class="bg-white/5 rounded-lg p-3 text-center">
                  <p class="text-xs text-slate-400 mb-1">مستخدم عرض</p>
                  <p class="text-sm font-mono text-info-300">viewer1 / viewer1</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <p class="text-center text-slate-500 text-sm mt-8">
            © 2026 النظام المالي - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    `;
  },

  async handleSubmit(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        جاري التحقق...
      </span>
    `;

    // Attempt login
    const result = await AuthStore.login(username, password);

    if (result.success) {
      showToast('تم تسجيل الدخول بنجاح', 'success');
      window.location.hash = '#dashboard';
    } else {
      errorEl.textContent = result.error;
      errorEl.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'تسجيل الدخول';
    }
  }
};

window.LoginPage = LoginPage;
