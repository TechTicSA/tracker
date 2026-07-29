/**
 * Users Management Page - Admin only user management
 */
const UsersPage = {
  render() {
    if (!AuthStore.isAdmin()) {
      return `
        ${Layout.renderHeader('إدارة المستخدمين')}
        <main class="p-6">
          <div class="bg-white rounded-xl p-8 shadow-soft text-center">
            <div class="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
              ${Icons.get('eye', 'danger', 32)}
            </div>
            <h3 class="font-bold text-lg mb-2">غير مصرح</h3>
            <p class="text-slate-600">ليس لديك صلاحية الوصول لهذه الصفحة</p>
            <button onclick="window.location.hash = '#dashboard'" class="btn-primary mt-4">العودة للرئيسية</button>
          </div>
        </main>
      `;
    }
    
    const users = DataStore.getUsers();
    
    return `
      ${Layout.renderHeader('إدارة المستخدمين')}
      
      <main class="p-6 space-y-6">
        <!-- Add User Button -->
        <button onclick="showToast('إضافة مستخدم جديد - قريباً', 'info')" class="btn-primary flex items-center gap-2">
          ${Icons.get('plus', 'white')}
          إضافة مستخدم جديد
        </button>
        
        <!-- Users Table -->
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="overflow-x-auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>المستخدم</th>
                  <th>اسم المستخدم</th>
                  <th>الدور</th>
                  <th>الصفحات المسموحة</th>
                  <th>تاريخ الإنشاء</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(user => `
                  <tr>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-bold">
                          ${user.name.charAt(0)}
                        </div>
                        <span class="font-medium">${user.name}</span>
                      </div>
                    </td>
                    <td class="font-mono text-sm">${user.username}</td>
                    <td>
                      <span class="badge ${user.role === 'admin' ? 'badge-warning' : 'badge-info'}">
                        ${user.role === 'admin' ? 'مدير' : 'مستخدم'}
                      </span>
                    </td>
                    <td class="text-xs text-slate-500 max-w-xs truncate">
                      ${user.allowedPages?.length || 0} صفحات
                    </td>
                    <td>${Helpers.formatDate(user.createdAt)}</td>
                    <td>
                      <div class="flex items-center gap-2">
                        <button onclick="showToast('تعديل المستخدم - قريباً', 'info')" class="p-1.5 hover:bg-slate-100 rounded-lg">
                          ${Icons.get('edit', 'slate', 16)}
                        </button>
                        <button onclick="UsersPage.deleteUser('${user.id}')" class="p-1.5 hover:bg-danger-50 rounded-lg">
                          ${Icons.get('trash', 'danger', 16)}
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Info Card -->
        <div class="bg-info-50 border border-info-200 rounded-xl p-4">
          <div class="flex items-start gap-3">
            ${Icons.get('eye', 'info')}
            <div>
              <h4 class="font-bold text-info-900 mb-1">بيانات الدخول التجريبية</h4>
              <ul class="text-sm text-info-800 space-y-1">
                <li><strong>مدير النظام:</strong> admin / admin</li>
                <li><strong>مستخدم عرض:</strong> viewer1 / viewer1</li>
                <li><strong>محاسب:</strong> accountant / accountant</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    `;
  },
  
  deleteUser(userId) {
    if (userId === '1') {
      showToast('لا يمكن حذف المدير العام', 'error');
      return;
    }
    
    Modals.confirm('هل أنت متأكد من حذف هذا المستخدم؟', () => {
      DataStore.deleteFromCollection('users', userId);
      showToast('تم حذف المستخدم بنجاح', 'success');
      App.renderPage('users');
    });
  }
};
window.UsersPage = UsersPage;
