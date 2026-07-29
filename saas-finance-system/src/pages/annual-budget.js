/**
 * Annual Budget Page - Tabbed budget management
 */

const AnnualBudgetPage = {
  activeTab: 'revenue',
  
  render() {
    const data = DataStore.getData();
    const isAdmin = AuthStore.canWrite();
    
    return `
      ${Layout.renderHeader('الميزانية السنوية')}
      
      <main class="p-6 space-y-6">
        <!-- Tabs -->
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="flex border-b border-slate-200">
            <button onclick="AnnualBudgetPage.setTab('revenue')" 
                    class="flex-1 px-6 py-4 text-center font-medium transition-all ${this.activeTab === 'revenue' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-slate-600 hover:bg-slate-50'}">
              الإيرادات
            </button>
            <button onclick="AnnualBudgetPage.setTab('operating')" 
                    class="flex-1 px-6 py-4 text-center font-medium transition-all ${this.activeTab === 'operating' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-slate-600 hover:bg-slate-50'}">
              المصروفات التشغيلية
            </button>
            <button onclick="AnnualBudgetPage.setTab('other')" 
                    class="flex-1 px-6 py-4 text-center font-medium transition-all ${this.activeTab === 'other' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-slate-600 hover:bg-slate-50'}">
              المصروفات الأخرى
            </button>
          </div>
          
          <!-- Tab Content -->
          <div class="p-6">
            ${this.activeTab === 'revenue' ? this.renderRevenueTable(data.budgetRevenue, isAdmin) : ''}
            ${this.activeTab === 'operating' ? this.renderOperatingTable(data.budgetOperating, isAdmin) : ''}
            ${this.activeTab === 'other' ? this.renderOtherTable(data.budgetOther, isAdmin) : ''}
          </div>
        </div>
        
        ${isAdmin ? `
          <button onclick="showToast('خاصية إضافة بند - قريباً', 'info')" class="btn-primary flex items-center gap-2">
            ${Icons.get('plus', 'white')}
            إضافة بند جديد
          </button>
        ` : ''}
      </main>
    `;
  },
  
  setTab(tab) {
    this.activeTab = tab;
    App.renderPage('annual-budget');
  },
  
  renderRevenueTable(items, isAdmin) {
    const totalExpected = items.reduce((sum, i) => sum + i.expected, 0);
    const totalActual = items.reduce((sum, i) => sum + i.actual, 0);
    const totalRemaining = totalExpected - totalActual;
    
    return `
      <div class="overflow-x-auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>البند</th>
              <th>المتوقع</th>
              <th>الفعلي</th>
              <th>نسبة الإنجاز</th>
              <th>متأخر</th>
              <th>غير محصل</th>
              <th>إجمالي المستحق</th>
              <th>ملاحظات</th>
              ${isAdmin ? '<th>إجراءات</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${items.map(item => {
              const achievement = Helpers.calculateAchievement(item.actual, item.expected);
              const badgeClass = achievement >= 80 ? 'badge-success' : achievement >= 50 ? 'badge-warning' : 'badge-danger';
              
              return `
                <tr>
                  <td class="font-medium">${item.item}</td>
                  <td class="tabular-nums-custom">${Helpers.formatCurrency(item.expected)}</td>
                  <td class="tabular-nums-custom">${Helpers.formatCurrency(item.actual)}</td>
                  <td><span class="badge ${badgeClass}">${achievement.toFixed(1)}%</span></td>
                  <td class="tabular-nums-custom text-danger-600">${Helpers.formatCurrency(item.delayed || 0, false)}</td>
                  <td class="tabular-nums-custom text-warning-600">${Helpers.formatCurrency(item.uncollected || 0, false)}</td>
                  <td class="tabular-nums-custom font-semibold">${Helpers.formatCurrency((item.delayed || 0) + (item.uncollected || 0))}</td>
                  <td class="text-sm text-slate-600 max-w-xs truncate">${item.notes || '-'}</td>
                  ${isAdmin ? `
                    <td>
                      <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1.5 hover:bg-slate-100 rounded-lg" title="تعديل">${Icons.get('edit', 'slate', 16)}</button>
                        <button class="p-1.5 hover:bg-danger-50 rounded-lg" title="حذف">${Icons.get('trash', 'danger', 16)}</button>
                      </div>
                    </td>
                  ` : ''}
                </tr>
              `;
            }).join('')}
          </tbody>
          <tfoot>
            <tr class="bg-slate-900 text-white">
              <td class="font-bold">الإجمالي</td>
              <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(totalExpected)}</td>
              <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(totalActual)}</td>
              <td><span class="badge bg-white/20 text-white">${Helpers.calculateAchievement(totalActual, totalExpected).toFixed(1)}%</span></td>
              <td colspan="${isAdmin ? '5' : '4'}" class="tabular-nums-custom">المتبقي: ${Helpers.formatCurrency(totalRemaining)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  },
  
  renderOperatingTable(items, isAdmin) {
    const totalExpected = items.reduce((sum, i) => sum + i.expected, 0);
    const totalActual = items.reduce((sum, i) => sum + i.actual, 0);
    
    return `
      <div class="overflow-x-auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>البند</th>
              <th>المتوقع</th>
              <th>الفعلي</th>
              <th>نسبة الإنجاز</th>
              <th>الفرق</th>
              ${isAdmin ? '<th>إجراءات</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${items.map(item => {
              const achievement = Helpers.calculateAchievement(item.actual, item.expected);
              const diff = item.actual - item.expected;
              const badgeClass = achievement >= 80 ? 'badge-success' : achievement >= 50 ? 'badge-warning' : 'badge-danger';
              
              return `
                <tr>
                  <td class="font-medium">${item.item}</td>
                  <td class="tabular-nums-custom">${Helpers.formatCurrency(item.expected)}</td>
                  <td class="tabular-nums-custom">${Helpers.formatCurrency(item.actual)}</td>
                  <td><span class="badge ${badgeClass}">${achievement.toFixed(1)}%</span></td>
                  <td class="tabular-nums-custom ${diff > 0 ? 'text-danger-600' : diff < 0 ? 'text-primary-600' : ''}">
                    ${diff !== 0 ? (diff > 0 ? '+' : '') : ''}${Helpers.formatCurrency(diff, false)}
                  </td>
                  ${isAdmin ? `
                    <td>
                      <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1.5 hover:bg-slate-100 rounded-lg">${Icons.get('edit', 'slate', 16)}</button>
                        <button class="p-1.5 hover:bg-danger-50 rounded-lg">${Icons.get('trash', 'danger', 16)}</button>
                      </div>
                    </td>
                  ` : ''}
                </tr>
              `;
            }).join('')}
          </tbody>
          <tfoot>
            <tr class="bg-slate-900 text-white">
              <td class="font-bold">الإجمالي</td>
              <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(totalExpected)}</td>
              <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(totalActual)}</td>
              <td colspan="${isAdmin ? '3' : '2'}"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  },
  
  renderOtherTable(items, isAdmin) {
    return this.renderOperatingTable(items, isAdmin);
  }
};

window.AnnualBudgetPage = AnnualBudgetPage;
