/**
 * Account Balances Page - Expected vs Actual balance comparison
 */
const AccountBalancesPage = {
  render() {
    const data = DataStore.getData();
    
    return `
      ${Layout.renderHeader('أرصدة الحسابات')}
      <main class="p-6 space-y-6">
        <!-- Tabs for views -->
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <h3 class="font-bold text-lg">المتوقع</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>الحساب</th>
                  <th>الرصيد الافتتاحي</th>
                  <th>الواردات</th>
                  <th>المصروفات</th>
                  <th>الرصيد الحالي</th>
                </tr>
              </thead>
              <tbody>
                ${data.balanceViews.expected.map(item => this.renderRow(item)).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <h3 class="font-bold text-lg">الفعلي</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>الحساب</th>
                  <th>الرصيد الافتتاحي</th>
                  <th>الواردات</th>
                  <th>المصروفات</th>
                  <th>الرصيد الحالي</th>
                </tr>
              </thead>
              <tbody>
                ${data.balanceViews.actual.map(item => this.renderRow(item)).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <h3 class="font-bold text-lg">حسابات العيادة</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>الحساب</th>
                  <th>الرصيد الافتتاحي</th>
                  <th>الواردات</th>
                  <th>المصروفات</th>
                  <th>الرصيد الحالي</th>
                </tr>
              </thead>
              <tbody>
                ${data.balanceViews.clinic.map(item => this.renderRow(item)).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  },
  
  renderRow(item) {
    return `
      <tr>
        <td class="font-medium">${item.account}</td>
        <td class="tabular-nums-custom">${Helpers.formatCurrency(item.opening, false)}</td>
        <td class="tabular-nums-custom text-primary-600">${Helpers.formatCurrency(item.incoming, false)}</td>
        <td class="tabular-nums-custom text-danger-600">${Helpers.formatCurrency(item.expense, false)}</td>
        <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(item.current)}</td>
      </tr>
    `;
  }
};
window.AccountBalancesPage = AccountBalancesPage;
