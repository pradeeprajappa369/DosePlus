
import { kpiData } from '../../../mocks/dashboardData';

const KPISummary = () => {
  const kpiCards = [
    {
      title: 'Total Sales Today',
      value: `₹${kpiData.todayRevenue.amount.toLocaleString('en-IN')}`,
      trend: kpiData.todayRevenue.trend,
      trendUp: kpiData.todayRevenue.trendUp,
      icon: 'ri-money-rupee-circle-line',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      accentColor: 'bg-teal-500',
    },
    {
      title: 'Total Orders',
      value: kpiData.todayOrders.count,
      trend: kpiData.todayOrders.trend,
      trendUp: kpiData.todayOrders.trendUp,
      icon: 'ri-shopping-cart-line',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      accentColor: 'bg-blue-500',
    },
    {
      title: 'Low Stock Items',
      value: kpiData.lowStockItems.count,
      trend: kpiData.lowStockItems.trend,
      trendUp: kpiData.lowStockItems.trendUp,
      icon: 'ri-error-warning-line',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      accentColor: 'bg-orange-500',
    },
    {
      title: 'Expiring Medicines',
      value: kpiData.expiringSoon.count,
      trend: kpiData.expiringSoon.trend,
      trendUp: kpiData.expiringSoon.trendUp,
      icon: 'ri-alert-line',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      accentColor: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <div className={`h-1 ${card.accentColor}`}></div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <i className={`${card.icon} text-xl ${card.iconColor}`}></i>
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  card.trendUp
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                <i className={`${card.trendUp ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} text-xs`}></i>
                {card.trend}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1.5">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-xs text-gray-500">vs yesterday</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPISummary;
