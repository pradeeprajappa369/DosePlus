import { useState } from 'react';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import SuperAdminHeader from '../components/SuperAdminHeader';
import { useNavigate } from 'react-router-dom';

export default function SuperAdminDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: 'Total Pharmacies',
      value: '247',
      change: '+12 this month',
      icon: 'ri-hospital-line',
      color: 'from-blue-500 to-blue-600',
      trend: 'up',
    },
    {
      title: 'Active Subscriptions',
      value: '189',
      change: '76% active rate',
      icon: 'ri-vip-crown-line',
      color: 'from-purple-500 to-purple-600',
      trend: 'up',
    },
    {
      title: 'Monthly Revenue',
      value: '₹12,45,890',
      change: '+18% from last month',
      icon: 'ri-money-dollar-circle-line',
      color: 'from-green-500 to-green-600',
      trend: 'up',
    },
    {
      title: 'Online Stores Enabled',
      value: '134',
      change: '54% of total',
      icon: 'ri-store-line',
      color: 'from-teal-500 to-teal-600',
      trend: 'neutral',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Pharmacy',
      icon: 'ri-add-circle-line',
      color: 'bg-blue-500',
      action: () => navigate('/super-admin/pharmacies'),
    },
    {
      title: 'Enable/Disable Account',
      icon: 'ri-toggle-line',
      color: 'bg-orange-500',
      action: () => navigate('/super-admin/pharmacies'),
    },
    {
      title: 'Change Subscription',
      icon: 'ri-exchange-line',
      color: 'bg-purple-500',
      action: () => navigate('/super-admin/plans'),
    },
    {
      title: 'Disable Payments',
      icon: 'ri-close-circle-line',
      color: 'bg-red-500',
      action: () => navigate('/super-admin/payments'),
    },
  ];

  const recentActivities = [
    { pharmacy: 'MedPlus Pharmacy', action: 'Upgraded to Premium Plan', time: '2 hours ago', type: 'upgrade' },
    { pharmacy: 'Apollo Pharmacy', action: 'Payment received ₹2,499', time: '4 hours ago', type: 'payment' },
    { pharmacy: 'HealthCare Pharmacy', action: 'Account suspended', time: '6 hours ago', type: 'suspend' },
    { pharmacy: 'Wellness Pharmacy', action: 'Online store enabled', time: '8 hours ago', type: 'enable' },
    { pharmacy: 'City Pharmacy', action: 'New registration', time: '1 day ago', type: 'new' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <SuperAdminHeader isSidebarCollapsed={isSidebarCollapsed} />

      <main
        className={`transition-all duration-300 pt-20 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-8">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardCards.map((card, index) => (
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
                  {card.trend === 'up' && (
                    <span className="text-green-500 text-sm font-medium">
                      <i className="ri-arrow-up-line"></i>
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-xs text-gray-500">{card.change}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <i className={`${action.icon} text-2xl text-white`}></i>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-600 whitespace-nowrap">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer whitespace-nowrap">
                View All <i className="ri-arrow-right-line ml-1"></i>
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'upgrade'
                          ? 'bg-purple-100 text-purple-600'
                          : activity.type === 'payment'
                          ? 'bg-green-100 text-green-600'
                          : activity.type === 'suspend'
                          ? 'bg-red-100 text-red-600'
                          : activity.type === 'enable'
                          ? 'bg-teal-100 text-teal-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      <i
                        className={`${
                          activity.type === 'upgrade'
                            ? 'ri-arrow-up-circle-line'
                            : activity.type === 'payment'
                            ? 'ri-money-dollar-circle-line'
                            : activity.type === 'suspend'
                            ? 'ri-close-circle-line'
                            : activity.type === 'enable'
                            ? 'ri-check-circle-line'
                            : 'ri-add-circle-line'
                        } text-lg`}
                      ></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{activity.pharmacy}</p>
                      <p className="text-xs text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
