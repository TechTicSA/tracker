/**
 * Clinic Investment Page - Track clinic investment recovery and profit
 */
const ClinicInvestmentPage = {
  render() {
    const data = DataStore.getData();
    const clinic = data.clinicInvestment;
    
    // Calculate totals
    const totalCollected = Helpers.sumBy(clinic.monthlyData, 'collected');
    const totalCapitalReturn = Helpers.sumBy(clinic.monthlyData, 'capitalReturn');
    const totalProfit = Helpers.sumBy(clinic.monthlyData, 'profit');
    const capitalProgress = (totalCapitalReturn / clinic.capitalRecovery) * 100;
    
    return `
      ${Layout.renderHeader('استثمار العيادة')}
      
      <main class="p-6 space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-primary-500">
            <p class="text-sm text-slate-600 mb-2">الهدف الكلي</p>
            <p class="text-2xl font-bold text-slate-900 tabular-nums-custom">${Helpers.formatCurrency(clinic.goal)}</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-info-500">
            <p class="text-sm text-slate-600 mb-2">استرداد رأس المال</p>
            <p class="text-2xl font-bold text-info-600 tabular-nums-custom">${Helpers.formatCurrency(totalCapitalReturn)}</p>
            <p class="text-xs text-slate-500 mt-1">من ${Helpers.formatCurrency(clinic.capitalRecovery, false)} (${capitalProgress.toFixed(1)}%)</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-success-500">
            <p class="text-sm text-slate-600 mb-2">إجمالي الأرباح</p>
            <p class="text-2xl font-bold text-primary-600 tabular-nums-custom">${Helpers.formatCurrency(totalProfit)}</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 border-warning-500">
            <p class="text-sm text-slate-600 mb-2">الإجمالي المحصل</p>
            <p class="text-2xl font-bold text-slate-900 tabular-nums-custom">${Helpers.formatCurrency(totalCollected)}</p>
          </div>
        </div>
        
        <!-- Progress Section -->
        <div class="bg-white rounded-xl p-6 shadow-soft">
          <h3 class="font-bold text-lg mb-4">تقدم استرداد رأس المال</h3>
          <div class="flex items-center gap-8">
            ${Charts.progressRing(capitalProgress, 150, capitalProgress >= 80 ? '#22c55e' : '#f59e0b')}
            <div class="flex-1 space-y-4">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm text-slate-600">رأس المال المسترد</span>
                  <span class="text-sm font-bold">${Helpers.formatCurrency(totalCapitalReturn, false)}</span>
                </div>
                ${Charts.progressBar(capitalProgress, 'bg-info-600', false)}
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm text-slate-600">الأرباح المتحققة</span>
                  <span class="text-sm font-bold">${Helpers.formatCurrency(totalProfit, false)}</span>
                </div>
                ${Charts.progressBar((totalProfit / clinic.profitTarget) * 100, 'bg-primary-600', false)}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Monthly Data Table -->
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <h3 class="font-bold text-lg">البيانات الشهرية</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>الشهر</th>
                  <th>التاريخ</th>
                  <th>المحصل</th>
                  <th>عائد رأس المال</th>
                  <th>الربح</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                ${clinic.monthlyData.map(item => {
                  const badgeClass = item.status === 'actual' ? 'badge-success' : 'badge-info';
                  const statusText = item.status === 'actual' ? 'فعلي' : 'تقديري';
                  return `
                    <tr>
                      <td class="font-medium">${item.month}</td>
                      <td>${Helpers.formatDate(item.date)}</td>
                      <td class="tabular-nums-custom">${Helpers.formatCurrency(item.collected, false)}</td>
                      <td class="tabular-nums-custom text-info-600">${Helpers.formatCurrency(item.capitalReturn, false)}</td>
                      <td class="tabular-nums-custom text-primary-600">${Helpers.formatCurrency(item.profit, false)}</td>
                      <td><span class="badge ${badgeClass}">${statusText}</span></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }
};
window.ClinicInvestmentPage = ClinicInvestmentPage;
