
import { expiringItems } from '../../../mocks/dashboardData';

const ExpiryList = () => {
  const urgentItems = expiringItems.filter(item => item.daysLeft <= 30);
  const soonItems = expiringItems.filter(item => item.daysLeft > 30 && item.daysLeft <= 60);

  const getExpiryStatus = (daysLeft: number) => {
    if (daysLeft <= 7) {
      return {
        label: 'Critical',
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        dotColor: 'bg-red-600',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
      };
    } else if (daysLeft <= 15) {
      return {
        label: 'Urgent',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
        dotColor: 'bg-orange-600',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
      };
    } else if (daysLeft <= 30) {
      return {
        label: 'Warning',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        dotColor: 'bg-yellow-600',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
      };
    }
    return {
      label: 'Monitor',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      dotColor: 'bg-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    };
  };

  const renderTable = (items: typeof expiringItems, title: string, description: string) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-4 last:mb-0">
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Medicine Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Batch Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Days Left
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
              {items.map((item) => {
                const status = getExpiryStatus(item.daysLeft);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${status.iconBg}`}>
                          <i className={`ri-medicine-bottle-line text-sm ${status.iconColor}`}></i>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-sm text-gray-600 font-mono">{item.batchNumber}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-sm text-gray-900">{item.expiryDate}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-sm font-semibold ${status.textColor}`}>
                        {item.daysLeft} days
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${status.bgColor} ${status.textColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`}></span>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-eye-line text-sm"></i>
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-alert-line text-xl text-red-600"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900">Expiry Alerts</h3>
            <p className="text-sm text-gray-500">{expiringItems.length} items nearing expiration</p>
          </div>
        </div>
      </div>

      <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 flex-1">
        {renderTable(urgentItems, 'Expiring within 30 days', `${urgentItems.length} items require immediate attention`)}
        {renderTable(soonItems, 'Expiring within 60 days', `${soonItems.length} items to monitor closely`)}
      </div>
    </div>
  );
};

export default ExpiryList;
