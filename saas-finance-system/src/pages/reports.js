/**
 * Reports Center Page - Report catalog with export options
 */
const ReportsPage = {
  render() {
    const data = DataStore.getData();
    
    return `
      ${Layout.renderHeader('مركز التقارير')}
      
      <main class="p-6 space-y-6">
        <!-- Report Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${data.reports.map(report => this.renderReportCard(report)).join('')}
        </div>
        
        <!-- Quick Actions -->
        <div class="bg-white rounded-xl p-6 shadow-soft">
          <h3 class="font-bold text-lg mb-4">إجراءات سريعة</h3>
          <div class="flex flex-wrap gap-3">
            <button onclick="showToast('تصدير البيانات - قريباً', 'info')" class="btn-secondary flex items-center gap-2">
              ${Icons.get('download', 'slate')}
              تصدير جميع البيانات CSV
            </button>
            <button onclick="showToast('طباعة التقارير - قريباً', 'info')" class="btn-secondary flex items-center gap-2">
              🖨️ طباعة التقارير
            </button>
            <button onclick="DataStore.resetData(); showToast('تم إعادة تعيين البيانات', 'success'); setTimeout(() => window.location.reload(), 500);" class="btn-danger flex items-center gap-2">
              🔄 إعادة تعيين البيانات
            </button>
          </div>
        </div>
      </main>
    `;
  },
  
  renderReportCard(report) {
    const iconMap = {
      budget: 'budget',
      income: 'money',
      cashflow: 'balance',
      investment: 'report',
      loan: 'loan',
      bank: 'bank'
    };
    
    return `
      <div class="bg-white rounded-xl p-6 shadow-soft card-hover border border-slate-200">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            ${Icons.get(iconMap[report.icon] || 'report', 'primary', 24)}
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-slate-900 mb-1">${report.title}</h4>
            <p class="text-sm text-slate-600 mb-3">${report.description}</p>
            <div class="flex items-center gap-2">
              <span class="badge badge-info">${report.category}</span>
              <button onclick="showToast('توليد التقرير - قريباً', 'info')" class="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                عرض التقرير ${Icons.get('chevronDown', 'primary', 16)}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
window.ReportsPage = ReportsPage;
