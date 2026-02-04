import { purchaseReportData } from '../../../mocks/reportsData';

export default function PurchaseReports() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Purchase</p>
            <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 rounded-lg">
              <i className="ri-shopping-cart-line text-xl text-indigo-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(purchaseReportData.summary.totalPurchase)}</h3>
          <p className="text-xs text-indigo-600 mt-1">+15.2% from last period</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Number of Bills</p>
            <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-lg">
              <i className="ri-file-list-3-line text-xl text-teal-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{purchaseReportData.summary.numberOfBills}</h3>
          <p className="text-xs text-teal-600 mt-1">+23 from last period</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pending Payments</p>
            <div className="w-10 h-10 flex items-center justify-center bg-orange-50 rounded-lg">
              <i className="ri-time-line text-xl text-orange-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(purchaseReportData.summary.pendingPayments)}</h3>
          <p className="text-xs text-orange-600 mt-1">Requires attention</p>
        </div>
      </div>

      {/* Monthly Purchase Trend Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Purchase Trend</h3>
        <div className="h-64 flex items-end justify-between gap-3">
          {purchaseReportData.monthlyPurchase.map((month, index) => {
            const maxAmount = Math.max(...purchaseReportData.monthlyPurchase.map(m => m.amount));
            const height = (month.amount / maxAmount) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all duration-300 hover:from-indigo-600 hover:to-indigo-500 cursor-pointer"
                    style={{ height: `${height * 2}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatCurrency(month.amount)}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{month.month}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Purchase Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Purchase Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchaseReportData.purchaseTable.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.billNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(row.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      row.status === 'Paid' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
