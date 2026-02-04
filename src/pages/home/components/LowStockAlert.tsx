
import { lowStockItems } from '../../../mocks/dashboardData';

const LowStockAlert = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-error-warning-line text-xl text-orange-600"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900">Low Stock Alerts</h3>
            <p className="text-sm text-gray-500">{lowStockItems.length} items requiring attention</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Medicine Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Min Required
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lowStockItems.map((item) => {
                const stockPercentage = (item.currentStock / item.minStock) * 100;
                const isCritical = stockPercentage < 30;
                const isLow = stockPercentage >= 30 && stockPercentage < 50;
                
                return (
                  <tr 
                    key={item.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      isCritical ? 'bg-red-50/30' : isLow ? 'bg-orange-50/30' : ''
                    }`}
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isCritical ? 'bg-red-100' : 'bg-orange-100'
                        }`}>
                          <i className={`ri-medicine-bottle-line text-sm ${
                            isCritical ? 'text-red-600' : 'text-orange-600'
                          }`}></i>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-sm font-semibold ${
                        isCritical ? 'text-red-700' : isLow ? 'text-orange-700' : 'text-gray-900'
                      }`}>
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-sm text-gray-600">{item.minStock} {item.unit}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        isCritical 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isCritical ? 'bg-red-600' : 'bg-orange-600'
                        }`}></span>
                        {isCritical ? 'Critical' : 'Low Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-add-line text-sm"></i>
                        Add Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LowStockAlert;
