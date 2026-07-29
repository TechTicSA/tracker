/**
 * Dashboard Page - Main overview with KPIs and charts
 */

const DashboardPage = {
  render() {
    const totals = DataStore.getDashboardTotals();
    const revenueBreakdown = DataStore.getRevenueBreakdown();
    const monthlyData = DataStore.getMonthlyComparison();
    
    // Calculate achievement for ring chart
    const achievementRate = totals.achievementRate;
    
    return `
      ${Layout.renderHeader('لوحة التحكم')}
      
      <main class="p-6 space-y-6">
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Total Revenue -->
          <div class="bg-white rounded-xl p-6 shadow-soft card-hover border-t-4 border-primary-500">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-slate-600">إجمالي الإيرادات</h3>
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                ${Icons.get('money', 'primary')}
              </div>
            </div>
            <p class="text-2xl font-bold text-slate-900 tabular-nums-custom mb-2">
              ${Helpers.formatCurrency(totals.revenue)}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">المتوقع: ${Helpers.formatCurrency(totals.revenueExpected, false)}</span>
              <span class="text-xs font-medium ${parseFloat(totals.revenueDelta) >= 0 ? 'text-primary-600' : 'text-danger-600'}">
                ${parseFloat(totals.revenueDelta) >= 0 ? '▲' : '▼'} ${Math.abs(totals.revenueDelta)}%
              </span>
            </div>
          </div>

          <!-- Total Expenses -->
          <div class="bg-white rounded-xl p-6 shadow-soft card-hover border-t-4 border-danger-500">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-slate-600">إجمالي المصروفات</h3>
              <div class="w-10 h-10 bg-danger-100 rounded-lg flex items-center justify-center">
                ${Icons.get('expenses', 'danger')}
              </div>
            </div>
            <p class="text-2xl font-bold text-slate-900 tabular-nums-custom mb-2">
              ${Helpers.formatCurrency(totals.expenses)}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">المتوقع: ${Helpers.formatCurrency(totals.expensesExpected, false)}</span>
              <span class="text-xs font-medium ${parseFloat(totals.expensesDelta) <= 0 ? 'text-primary-600' : 'text-danger-600'}">
                ${parseFloat(totals.expensesDelta) <= 0 ? '▲' : '▼'} ${Math.abs(totals.expensesDelta)}%
              </span>
            </div>
          </div>

          <!-- Net Position -->
          <div class="bg-white rounded-xl p-6 shadow-soft card-hover border-t-4 border-info-500">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-slate-600">صافي المركز</h3>
              <div class="w-10 h-10 bg-info-100 rounded-lg flex items-center justify-center">
                ${Icons.get('balance', 'info')}
              </div>
            </div>
            <p class="text-2xl font-bold ${totals.netPosition >= 0 ? 'text-primary-600' : 'text-danger-600'} tabular-nums-custom mb-2">
              ${Helpers.formatCurrency(totals.netPosition)}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">فائض / عجز</span>
              <span class="text-xs font-medium ${totals.netPosition >= 0 ? 'text-primary-600' : 'text-danger-600'}">
                ${totals.netPosition >= 0 ? 'فائض' : 'عجز'}
              </span>
            </div>
          </div>

          <!-- Achievement Rate -->
          <div class="bg-white rounded-xl p-6 shadow-soft card-hover border-t-4 border-warning-500">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-slate-600">نسبة الإنجاز</h3>
              <div class="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                ${Icons.get('report', 'warning')}
              </div>
            </div>
            <p class="text-2xl font-bold text-slate-900 tabular-nums-custom mb-2">
              ${achievementRate.toFixed(1)}%
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">من المستهدف</span>
              <span class="text-xs font-medium ${achievementRate >= 80 ? 'text-primary-600' : achievementRate >= 50 ? 'text-warning-600' : 'text-danger-600'}">
                ${achievementRate >= 80 ? 'ممتاز' : achievementRate >= 50 ? 'جيد' : 'يحتاج تحسين'}
              </span>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Donut Chart - Revenue Breakdown -->
          <div class="lg:col-span-1 bg-white rounded-xl p-6 shadow-soft">
            <h3 class="text-lg font-bold text-slate-900 mb-4">توزيع الإيرادات</h3>
            <div class="flex flex-col items-center">
              ${Charts.donut(revenueBreakdown, totals.revenue, 180)}
              <div class="mt-6 space-y-2 w-full">
                ${revenueBreakdown.slice(0, 5).map((item, i) => `
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-sm" style="background-color: ${['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][i]}"></div>
                      <span class="text-slate-600">${item.label}</span>
                    </div>
                    <span class="font-semibold tabular-nums-custom text-slate-900">${Helpers.formatCurrency(item.value, false)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Achievement Ring -->
          <div class="lg:col-span-1 bg-white rounded-xl p-6 shadow-soft">
            <h3 class="text-lg font-bold text-slate-900 mb-4">تحقيق الهدف السنوي</h3>
            <div class="flex flex-col items-center justify-center py-8">
              ${Charts.progressRing(achievementRate, 160, achievementRate >= 80 ? '#22c55e' : achievementRate >= 50 ? '#f59e0b' : '#ef4444')}
              <div class="grid grid-cols-2 gap-8 mt-8 w-full">
                <div class="text-center">
                  <p class="text-xs text-slate-500 mb-1">منجز</p>
                  <p class="text-xl font-bold text-primary-600 tabular-nums-custom">${Helpers.formatCurrency(totals.revenue, false)}</p>
                </div>
                <div class="text-center">
                  <p class="text-xs text-slate-500 mb-1">متبقي</p>
                  <p class="text-xl font-bold text-slate-600 tabular-nums-custom">${Helpers.formatCurrency(Math.max(totals.revenueExpected - totals.revenue, 0), false)}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Monthly Comparison -->
          <div class="lg:col-span-1 bg-white rounded-xl p-6 shadow-soft">
            <h3 class="text-lg font-bold text-slate-900 mb-4">مقارنة شهريّة</h3>
            <div class="overflow-x-auto">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>البند</th>
                    <th>يوليو</th>
                    <th>يونيو</th>
                    <th>الفرق</th>
                  </tr>
                </thead>
                <tbody>
                  ${monthlyData.slice(-1)[0] && Object.keys(monthlyData.slice(-1)[0]).filter(k => k !== 'month').map(key => {
                    const julValue = monthlyData[6]?.[key] || 0;
                    const junValue = monthlyData[5]?.[key] || 0;
                    const diff = julValue - junValue;
                    return `
                      <tr>
                        <td class="font-medium">${key === 'revenue' ? 'الإيرادات' : key === 'expenses' ? 'المصروفات' : 'صافي'}</td>
                        <td class="tabular-nums-custom">${Helpers.formatCurrency(julValue, false)}</td>
                        <td class="tabular-nums-custom">${Helpers.formatCurrency(junValue, false)}</td>
                        <td class="tabular-nums-custom ${diff >= 0 ? 'text-primary-600' : 'text-danger-600'}">
                          ${diff >= 0 ? '+' : ''}${Helpers.formatCurrency(diff, false)}
                        </td>
                      </tr>
                    `;
                  }).join('') || '<tr><td colspan="4" class="text-center text-slate-500">لا توجد بيانات</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Monthly Cash Flow Chart -->
        <div class="bg-white rounded-xl p-6 shadow-soft">
          <h3 class="text-lg font-bold text-slate-900 mb-4">التدفق النقدي الشهري</h3>
          ${Charts.barChart(
            monthlyData.map(d => d.month),
            monthlyData.map(d => d.net),
            monthlyData.map(d => d.net >= 0 ? '#22c55e' : '#ef4444'),
            200
          )}
        </div>
      </main>
    `;
  }
};

window.DashboardPage = DashboardPage;
