/**
 * Loans Page - Track loans and installment schedules
 */
const LoansPage = {
  render() {
    const loansSummary = DataStore.getLoansSummary();
    
    return `
      ${Layout.renderHeader('القروض والالتزامات')}
      
      <main class="p-6 space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${loansSummary.map(loan => this.renderLoanCard(loan)).join('')}
        </div>
        
        <!-- Detailed Installments -->
        ${loansSummary.map(loan => this.renderInstallmentTable(loan)).join('')}
      </main>
    `;
  },
  
  renderLoanCard(loan) {
    const statusColor = loan.progress >= 80 ? 'border-primary-500' : loan.progress >= 50 ? 'border-warning-500' : 'border-danger-500';
    
    return `
      <div class="bg-white rounded-xl p-6 shadow-soft border-t-4 ${statusColor}">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg">${loan.name}</h3>
          <span class="text-xs text-slate-500">${loan.interestRate}% فائدة</span>
        </div>
        
        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-slate-600">إجمالي التمويل</span>
            <span class="font-semibold tabular-nums-custom">${Helpers.formatCurrency(loan.totalFinancing, false)}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-600">تم سداده</span>
            <span class="font-semibold text-primary-600 tabular-nums-custom">${Helpers.formatCurrency(loan.paid, false)}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-600">المتبقي</span>
            <span class="font-semibold text-danger-600 tabular-nums-custom">${Helpers.formatCurrency(loan.remaining, false)}</span>
          </div>
          
          <div class="mt-4">
            ${Charts.progressBar(loan.progress, 'bg-primary-600', true)}
          </div>
        </div>
      </div>
    `;
  },
  
  renderInstallmentTable(loan) {
    return `
      <div class="bg-white rounded-xl shadow-soft overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 class="font-bold text-lg">${loan.name} - جدول الأقساط</h3>
          <span class="text-sm text-slate-500">${loan.installments.filter(i => i.status === 'paid').length} / ${loan.installments.length} قسط مدفوع</span>
        </div>
        <div class="overflow-x-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>تاريخ الاستحقاق</th>
                <th>المبلغ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${loan.installments.map(installment => {
                const badgeClass = installment.status === 'paid' ? 'badge-success' : 
                                  installment.status === 'pending' ? 'badge-warning' : 'badge-info';
                const statusText = installment.status === 'paid' ? 'مدفوع' : 
                                  installment.status === 'pending' ? 'قيد الانتظار' : 'قادم';
                return `
                  <tr>
                    <td class="font-medium">${installment.number}</td>
                    <td>${Helpers.formatDate(installment.dueDate)}</td>
                    <td class="tabular-nums-custom font-semibold">${Helpers.formatCurrency(installment.amount, false)}</td>
                    <td><span class="badge ${badgeClass}">${statusText}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
window.LoansPage = LoansPage;
