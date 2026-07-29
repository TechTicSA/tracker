/**
 * Bank Statements Page - Account transactions with running balance
 */
const BankStatementsPage = {
  render() {
    const data = DataStore.getData();
    
    return `
      ${Layout.renderHeader('الكشوف البنكية')}
      <main class="p-6 space-y-6">
        ${data.bankAccounts.map(account => this.renderAccountCard(account)).join('')}
      </main>
    `;
  },
  
  renderAccountCard(account) {
    const transactions = Helpers.calculateRunningBalance(account.openingBalance, account.transactions);
    const closingBalance = transactions[transactions.length - 1]?.runningBalance || account.openingBalance;
    const totalDeposits = Helpers.sumBy(transactions, 'deposit');
    const totalWithdraws = Helpers.sumBy(transactions, 'withdraw');
    
    return `
      <div class="bg-white rounded-xl shadow-soft overflow-hidden">
        <!-- Account Header -->
        <div class="gradient-primary px-6 py-4 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-lg">${account.name}</h3>
              <p class="text-sm opacity-80">الرصيد الافتتاحي: ${Helpers.formatCurrency(account.openingBalance)}</p>
            </div>
            <div class="text-left">
              <p class="text-xs opacity-80">الرصيد الختامي</p>
              <p class="text-2xl font-bold tabular-nums-custom">${Helpers.formatCurrency(closingBalance)}</p>
            </div>
          </div>
        </div>
        
        <!-- Summary Stats -->
        <div class="grid grid-cols-3 gap-4 p-4 bg-slate-50 border-b border-slate-200">
          <div class="text-center">
            <p class="text-xs text-slate-500 mb-1">الواردات</p>
            <p class="text-lg font-bold text-primary-600 tabular-nums-custom">${Helpers.formatCurrency(totalDeposits, false)}</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-500 mb-1">الصادرات</p>
            <p class="text-lg font-bold text-danger-600 tabular-nums-custom">${Helpers.formatCurrency(totalWithdraws, false)}</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-500 mb-1">صافي التغير</p>
            <p class="text-lg font-bold ${totalDeposits - totalWithdraws >= 0 ? 'text-primary-600' : 'text-danger-600'} tabular-nums-custom">
              ${Helpers.formatCurrency(totalDeposits - totalWithdraws, false)}
            </p>
          </div>
        </div>
        
        <!-- Transactions Table -->
        <div class="overflow-x-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>البيان</th>
                <th>إيداع</th>
                <th>سحب</th>
                <th>الرصيد التراكمي</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(t => `
                <tr>
                  <td>${Helpers.formatDate(t.date)}</td>
                  <td class="font-medium">${t.description}</td>
                  <td class="tabular-nums-custom text-primary-600">${t.deposit > 0 ? Helpers.formatCurrency(t.deposit, false) : '-'}</td>
                  <td class="tabular-nums-custom text-danger-600">${t.withdraw > 0 ? Helpers.formatCurrency(t.withdraw, false) : '-'}</td>
                  <td class="tabular-nums-custom font-semibold">${Helpers.formatCurrency(t.runningBalance)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
window.BankStatementsPage = BankStatementsPage;
