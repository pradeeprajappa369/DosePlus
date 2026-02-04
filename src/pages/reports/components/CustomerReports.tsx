import { customerReportData } from '../../../mocks/reportsData';

export default function CustomerReports() {
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
            <p className="text-sm text-gray-600">Total Customers</p>
            <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-lg">
              <i className="ri-group-line text-xl text-teal-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{customerReportData.summary.totalCustomers.toLocaleString()}</h3>
          <p className="text-xs text-teal-600 mt-1">+234 this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Repeat Customers</p>
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
              <i className="ri-user-heart-line text-xl text-blue-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{customerReportData.summary.repeatCustomers.toLocaleString()}</h3>
          <p className="text-xs text-gray-600 mt-1">51.2% retention rate</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Top Customer Spend</p>
            <div className="w-10 h-10 flex items-center justify-center bg-purple-50 rounded-lg">
              <i className="ri-vip-crown-line text-xl text-purple-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(customerReportData.summary.topCustomerSpend)}</h3>
          <p className="text-xs text-purple-600 mt-1">Highest spender</p>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Customers by Spend</h3>
          <p className="text-sm text-gray-600 mt-1">Customers ranked by total purchase value</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Purchase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerReportData.customerTable.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-full text-teal-700 font-semibold">
                        {customer.name.charAt(0)}
                      </div>
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.ordersCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(customer.totalSpend)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.lastPurchase}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      customer.status === 'VIP' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
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
