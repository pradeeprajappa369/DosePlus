interface KPICardProps {
  title: string;
  value: string;
  trend: number;
  isPositive: boolean;
  icon: string;
  iconBg: string;
}

export default function PaymentKPICards({ kpiData }: { kpiData: any }) {
  const formatCurrency = (value: number) => {
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  const cards: KPICardProps[] = [
    {
      title: 'Total Revenue',
      value: formatCurrency(kpiData.totalRevenue.value),
      trend: kpiData.totalRevenue.trend,
      isPositive: kpiData.totalRevenue.isPositive,
      icon: 'ri-money-rupee-circle-line',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: formatCurrency(kpiData.mrr.value),
      trend: kpiData.mrr.trend,
      isPositive: kpiData.mrr.isPositive,
      icon: 'ri-line-chart-line',
      iconBg: 'bg-gradient-to-br from-teal-500 to-teal-600'
    },
    {
      title: 'Active Paid Pharmacies',
      value: kpiData.activePaidPharmacies.value.toString(),
      trend: kpiData.activePaidPharmacies.trend,
      isPositive: kpiData.activePaidPharmacies.isPositive,
      icon: 'ri-hospital-line',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      title: 'Pending Payments',
      value: kpiData.pendingPayments.value.toString(),
      trend: kpiData.pendingPayments.trend,
      isPositive: kpiData.pendingPayments.isPositive,
      icon: 'ri-time-line',
      iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
              <i className={`${card.icon} text-2xl text-white`}></i>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              card.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <i className={`${card.isPositive ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} text-base`}></i>
              <span>{Math.abs(card.trend)}%</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
          <p className="text-3xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
