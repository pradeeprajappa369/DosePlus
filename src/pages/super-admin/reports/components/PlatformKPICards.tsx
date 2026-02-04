interface KPICardData {
  totalPharmacies: { value: number; trend: number; isPositive: boolean; change: string };
  activeSubscriptions: { value: number; trend: number; isPositive: boolean; change: string };
  monthlyRevenue: { value: number; trend: number; isPositive: boolean; change: string };
  expiredSubscriptions: { value: number; trend: number; isPositive: boolean; change: string };
  onlineStoresEnabled: { value: number; trend: number; isPositive: boolean; change: string };
  averagePlanValue: { value: number; trend: number; isPositive: boolean; change: string };
}

interface PlatformKPICardsProps {
  kpiData: KPICardData;
}

export default function PlatformKPICards({ kpiData }: PlatformKPICardsProps) {
  const cards = [
    {
      title: 'Total Pharmacies',
      value: kpiData.totalPharmacies.value,
      change: kpiData.totalPharmacies.change,
      trend: kpiData.totalPharmacies.trend,
      isPositive: kpiData.totalPharmacies.isPositive,
      icon: 'ri-hospital-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Subscriptions',
      value: kpiData.activeSubscriptions.value,
      change: kpiData.activeSubscriptions.change,
      trend: kpiData.activeSubscriptions.trend,
      isPositive: kpiData.activeSubscriptions.isPositive,
      icon: 'ri-vip-crown-line',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${(kpiData.monthlyRevenue.value / 1000).toFixed(0)}K`,
      change: kpiData.monthlyRevenue.change,
      trend: kpiData.monthlyRevenue.trend,
      isPositive: kpiData.monthlyRevenue.isPositive,
      icon: 'ri-money-dollar-circle-line',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Expired Subscriptions',
      value: kpiData.expiredSubscriptions.value,
      change: kpiData.expiredSubscriptions.change,
      trend: kpiData.expiredSubscriptions.trend,
      isPositive: kpiData.expiredSubscriptions.isPositive,
      icon: 'ri-time-line',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Online Stores Enabled',
      value: kpiData.onlineStoresEnabled.value,
      change: kpiData.onlineStoresEnabled.change,
      trend: kpiData.onlineStoresEnabled.trend,
      isPositive: kpiData.onlineStoresEnabled.isPositive,
      icon: 'ri-store-line',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Average Plan Value',
      value: `₹${kpiData.averagePlanValue.value}`,
      change: kpiData.averagePlanValue.change,
      trend: kpiData.averagePlanValue.trend,
      isPositive: kpiData.averagePlanValue.isPositive,
      icon: 'ri-line-chart-line',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
            >
              <i className={`${card.icon} text-2xl text-white`}></i>
            </div>
            <span
              className={`text-sm font-medium ${
                card.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              <i
                className={`${
                  card.isPositive ? 'ri-arrow-up-line' : 'ri-arrow-down-line'
                }`}
              ></i>
              {card.trend}%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
          <p className="text-xs text-gray-500">{card.change}</p>
        </div>
      ))}
    </div>
  );
}
