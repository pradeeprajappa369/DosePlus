import { inventoryReportData } from '../../../mocks/reportsData';

export default function InventoryReports() {
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
            <p className="text-sm text-gray-600">Total Stock Value</p>
            <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-lg">
              <i className="ri-stock-line text-xl text-teal-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(inventoryReportData.summary.totalStockValue)}</h3>
          <p className="text-xs text-teal-600 mt-1">Across all products</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Low Stock Items</p>
            <div className="w-10 h-10 flex items-center justify-center bg-orange-50 rounded-lg">
              <i className="ri-alert-line text-xl text-orange-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{inventoryReportData.summary.lowStockItems}</h3>
          <p className="text-xs text-orange-600 mt-1">Needs reordering</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Expiring Soon</p>
            <div className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-lg">
              <i className="ri-calendar-close-line text-xl text-red-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{inventoryReportData.summary.expiringSoonItems}</h3>
          <p className="text-xs text-red-600 mt-1">Within 90 days</p>
        </div>
      </div>

      {/* Low Stock Report */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Low Stock Report</h3>
          <p className="text-sm text-gray-600 mt-1">Items below reorder level</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryReportData.lowStockReport.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${
                  item.status === 'Critical' ? 'bg-red-50' : ''
                }`}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.medicineName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.currentStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.reorderLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Critical' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expiry Report */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Expiry Report</h3>
          <p className="text-sm text-gray-600 mt-1">Products expiring within 90 days</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Left</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryReportData.expiryReport.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${
                  item.status === 'Critical' ? 'bg-red-50' : ''
                }`}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.medicineName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.batch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.expiryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.daysLeft} days</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Critical' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
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
