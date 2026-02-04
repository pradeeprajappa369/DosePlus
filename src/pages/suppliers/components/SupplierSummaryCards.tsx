interface SupplierSummaryCardsProps {
  stats: {
    totalSuppliers: number;
    activeSuppliers: number;
    totalPendingPayments: number;
    totalPurchaseValue: number;
  };
}

export default function SupplierSummaryCards({ stats }: SupplierSummaryCardsProps) {
  const cards = [
    {
      title: 'Total Suppliers',
      value: stats.totalSuppliers,
      icon: 'ri-building-line',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Active Suppliers',
      value: stats.activeSuppliers,
      icon: 'ri-checkbox-circle-line',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Pending Payments',
      value: `₹${stats.totalPendingPayments.toLocaleString('en-IN')}`,
      icon: 'ri-time-line',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Total Purchase Value',
      value: `₹${stats.totalPurchaseValue.toLocaleString('en-IN')}`,
      icon: 'ri-shopping-cart-line',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
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
              <h3 className="text-2xl font-bold text-gray-900">
                {card.value}
              </h3>
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
