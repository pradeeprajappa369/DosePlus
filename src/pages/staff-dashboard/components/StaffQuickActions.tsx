const StaffQuickActions = () => {
  const actions = [
    {
      id: 'new-sale',
      title: 'Create New Sale',
      description: 'Generate Bill',
      icon: 'ri-add-circle-line',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      hoverColor: 'hover:bg-teal-100',
      path: '/sales',
    },
    {
      id: 'view-orders',
      title: 'View Orders',
      description: 'Process Orders',
      icon: 'ri-file-list-3-line',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100',
      path: '/orders',
    },
    {
      id: 'view-customers',
      title: 'View Customers',
      description: 'Customer Info',
      icon: 'ri-user-line',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      hoverColor: 'hover:bg-purple-100',
      path: '/customers',
    },
    {
      id: 'view-inventory',
      title: 'View Inventory',
      description: 'Check Stock',
      icon: 'ri-archive-line',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      hoverColor: 'hover:bg-orange-100',
      path: '/inventory',
    },
  ];

  const handleActionClick = (path: string) => {
    window.REACT_APP_NAVIGATE(path);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.path)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-left transition-all duration-200 cursor-pointer hover:shadow-md whitespace-nowrap"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center transition-colors ${action.hoverColor}`}>
                <i className={`${action.icon} text-xl ${action.iconColor}`}></i>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{action.title}</h4>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffQuickActions;
