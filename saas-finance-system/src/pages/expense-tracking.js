/**
 * Expense Tracking Page - Budget vs Actual tracking
 */
const ExpenseTrackingPage = {
  render() {
    const data = DataStore.getData();
    const isAdmin = AuthStore.canWrite();
    
    const totalPlanned = Helpers.sumBy(data.expenseTracking, 'planned');
    const totalActual = Helpers.sumBy(data.expenseTracking, 'actual');
    const difference = totalPlanned - totalActual;
    
    return `
      ${Layout.renderHeader('متابعة المصروفات')}
      <main class="p-6 space-y-6">
        <!-- Header Summary -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-soft">
            <p class="text-sm text-slate-600 mb-2">شهر يوليو 2026</p>
            <p class="text-lg font-bold text-slate-900">يوليو</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-primary-500">
            <p class="text-sm text-slate-600 mb-2">المخطط</p>
            <p class="text-2xl font-bold text-primary-600 tabular-nums-custom">${Helpers.formatCurrency(totalPlanned)}</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-danger-500">
            <p class="text-sm text-slate-600 mb-2">الفعلي</p>
            <p class="text-2xl font-bold text-danger-600 tabular-nums-custom">${Helpers.formatCurrency(totalActual)}</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 ${difference >= 0 ? 'border-primary-500' : 'border-danger-500'}">
            <p class="text-sm text-slate-600 mb-2">الفرق</p>
            <p class="text-2xl font-bold ${difference >= 0 ? 'text-primary-600' : 'text-danger-600'} tabular-nums-custom">
              ${difference >= 0 ? '+' : ''}${Helpers.formatCurrency(difference)}
            </p>
          </div>
        </div>
        
        <!-- Table -->
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="overflow-x-auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>البند</th>
                  <th>الحساب</th>
                  <th>المخطط</th>
                  <th>الفعلي</th>
                  <th>الفرق</th>
                  <th>الحالة</th>
                  ${isAdmin ? '<th>إجراءات</th>' : ''}
                </tr>
              </thead>
              <tbody>
                ${data.expenseTracking.map(item => {
                  const diff = item.planned - item.actual;
                  const isOverBudget = item.actual > item.planned;
                  return `
                    <tr>
                      <td class="font-medium">${item.item}</td>
                      <td>${item.account}</td>
                      <td class="tabular-nums-custom">${Helpers.formatCurrency(item.planned, false)}</td>
                      <td class="tabular-nums-custom">${Helpers.formatCurrency(item.actual, false)}</td>
                      <td class="tabular-nums-custom ${diff >= 0 ? 'text-primary-600' : 'text-danger-600'}">
                        ${diff >= 0 ? '+' : ''}${Helpers.formatCurrency(diff, false)}
                      </td>
                      <td><span class="badge ${isOverBudget ? 'badge-danger' : 'badge-success'}">${isOverBudget ? 'تجاوز' : 'ضمن الميزانية'}</span></td>
                      ${isAdmin ? `<td><button class="p-1.5 hover:bg-slate-100 rounded-lg">${Icons.get('edit', 'slate', 16)}</button></td>` : ''}
                    </tr>
                  `;
                }).join('')}
              </tbody>
              <tfoot>
                <tr class="bg-slate-900 text-white">
                  <td class="font-bold">الإجمالي</td>
                  <td></td>
                  <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(totalPlanned, false)}</td>
                  <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(totalActual, false)}</td>
                  <td class="tabular-nums-custom font-bold ${difference >= 0 ? 'text-primary-300' : 'text-danger-300'}">
                    ${difference >= 0 ? '+' : ''}${Helpers.formatCurrency(difference, false)}
                  </td>
                  <td colspan="${isAdmin ? '2' : '1'}"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>
    `;
  }
};
window.ExpenseTrackingPage = ExpenseTrackingPage;
