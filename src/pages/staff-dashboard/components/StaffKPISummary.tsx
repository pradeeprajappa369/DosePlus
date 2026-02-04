const StaffKPISummary = () => {
  const kpiCards = [
    {
      title: "Today's Sales",
      value: '₹45,280',
      subtitle: '32 bills generated',
      icon: 'ri-money-rupee-circle-line',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      accentColor: 'bg-teal-500',
    },
    {
      title: 'Pending Orders',
      value: '8',
      subtitle: 'Online orders to process',
      icon: 'ri-file-list-3-line',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      accentColor: 'bg-blue-500',
    },
    {
      title: 'Low Stock Items',
      value: '12',
      subtitle: 'View only access',
      icon: 'ri-error-warning-line',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      accentColor: 'bg-orange-500',
    },
    {
      title: 'Customers Served',
      value: '28',
      subtitle: 'Today',
      icon: 'ri-user-smile-line',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      accentColor: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpiCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <div className={`h-1 ${card.accentColor}`}></div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <i className={`${card.icon} text-xl ${card.iconColor}`}></i>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
              <p className="text-xs text-gray-500 mt-2">{card.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffKPISummary;
