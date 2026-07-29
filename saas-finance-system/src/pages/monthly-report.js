/**
 * Monthly Report Page - Revenue and expense matrix with charts
 */

const MonthlyReportPage = {
  render() {
    const data = DataStore.getData();
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'];
    const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul'];
    
    // Calculate totals
    const totalRevenue = monthKeys.reduce((sum, m) => sum + Helpers.sumBy(data.monthlyRevenue, m), 0);
    const totalExpenses = monthKeys.reduce((sum, m) => sum + Helpers.sumBy(data.monthlyExpenses, m), 0);
    const netFlow = totalRevenue - totalExpenses;
    
    // Monthly data for chart
    const monthlyData = monthKeys.map((m, i) => ({
      month: months[i],
      values: [
        Helpers.sumBy(data.monthlyRevenue, m),
        Helpers.sumBy(data.monthlyExpenses, m),
        Helpers.sumBy(data.monthlyRevenue, m) - Helpers.sumBy(data.monthlyExpenses, m)
      ],
      labels: ['إيرادات', 'مصروفات', 'صافي']
    }));
    
    return `
      ${Layout.renderHeader('التقرير الشهري')}
      
      <main class="p-6 space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-primary-500">
            <p class="text-sm text-slate-600 mb-2">إجمالي الإيرادات (7 أشهر)</p>
            <p class="text-2xl font-bold text-primary-600 tabular-nums-custom">${Helpers.formatCurrency(totalRevenue)}</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-danger-500">
            <p class="text-sm text-slate-600 mb-2">إجمالي المصروفات</p>
            <p class="text-2xl font-bold text-danger-600 tabular-nums-custom">${Helpers.formatCurrency(totalExpenses)}</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-info-500">
            <p class="text-sm text-slate-600 mb-2">صافي التدفق</p>
            <p class="text-2xl font-bold ${netFlow >= 0 ? 'text-primary-600' : 'text-danger-600'} tabular-nums-custom">${Helpers.formatCurrency(netFlow)}</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-warning-500">
            <p class="text-sm text-slate-600 mb-2">الرصيد التراكمي</p>
            <p class="text-2xl font-bold text-slate-900 tabular-nums-custom">${Helpers.formatCurrency(netFlow)}</p>
          </div>
        </div>

        <!-- Revenue Matrix -->
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <h3 class="font-bold text-slate-900">الإيرادات الشهرية</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>البند</th>
                  ${months.map(m => `<th>${m}</th>`).join('')}
                  <th>الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                ${data.monthlyRevenue.map(item => {
                  const total = monthKeys.reduce((sum, m) => sum + item[m], 0);
                  return `
                    <tr>
                      <td class="font-medium">${item.item}</td>
                      ${monthKeys.map(m => `<td class="tabular-nums-custom">${Helpers.formatCurrency(item[m] || 0, false)}</td>`).join('')}
                      <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(total, false)}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Expense Matrix -->
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <h3 class="font-bold text-slate-900">المصروفات الشهرية</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>البند</th>
                  ${months.map(m => `<th>${m}</th>`).join('')}
                  <th>الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                ${data.monthlyExpenses.map(item => {
                  const total = monthKeys.reduce((sum, m) => sum + item[m], 0);
                  return `
                    <tr>
                      <td class="font-medium">${item.item}</td>
                      ${monthKeys.map(m => `<td class="tabular-nums-custom">${Helpers.formatCurrency(item[m] || 0, false)}</td>`).join('')}
                      <td class="tabular-nums-custom font-bold">${Helpers.formatCurrency(total, false)}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Cash Flow Chart -->
        <div class="bg-white rounded-xl p-6 shadow-soft">
          <h3 class="font-bold text-slate-900 mb-4">التدفق النقدي الشهري</h3>
          ${Charts.groupedBarChart(monthlyData, 250)}
        </div>
      </main>
    `;
  }
};

window.MonthlyReportPage = MonthlyReportPage;
