interface CustomerSummaryCardsProps {
  stats: {
    totalCustomers: number;
    newCustomers: number;
    repeatCustomers: number;
    totalSales: number;
  };
}

export default function CustomerSummaryCards({ stats }: CustomerSummaryCardsProps) {
  const cards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: 'ri-user-line',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      trend: null
    },
    {
      title: 'New Customers',
      value: stats.newCustomers,
      subtitle: 'This Month',
      icon: 'ri-user-add-line',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      trend: null
    },
    {
      title: 'Repeat Customers',
      value: stats.repeatCustomers,
      icon: 'ri-repeat-line',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      trend: null
    },
    {
      title: 'Total Sales',
      value: `₹${stats.totalSales.toLocaleString('en-IN')}`,
      subtitle: 'From Customers',
      icon: 'ri-money-rupee-circle-line',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      trend: null
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </h3>
              {card.subtitle && (
                <p className="text-xs text-gray-500">{card.subtitle}</p>
              )}
            </div>
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <i className={`${card.icon} text-xl ${card.iconColor}`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
