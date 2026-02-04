import { useLocation, useNavigate } from 'react-router-dom';

interface SuperAdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function SuperAdminSidebar({ isCollapsed, onToggle }: SuperAdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: 'ri-dashboard-line', label: 'Dashboard', path: '/super-admin/dashboard' },
    { icon: 'ri-hospital-line', label: 'Pharmacy Accounts', path: '/super-admin/pharmacies' },
    { icon: 'ri-vip-crown-line', label: 'Subscription Plans', path: '/super-admin/plans' },
    { icon: 'ri-money-dollar-circle-line', label: 'Payments & Billing', path: '/super-admin/payments' },
    { icon: 'ri-store-line', label: 'Online Store Control', path: '/super-admin/online-control' },
    { icon: 'ri-megaphone-line', label: 'Offers & Banners', path: '/super-admin/offers' },
    { icon: 'ri-bar-chart-box-line', label: 'Reports & Analytics', path: '/super-admin/reports' },
    { icon: 'ri-customer-service-line', label: 'Support & Tickets', path: '/super-admin/support' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-teal-400">Dose Plus</h1>
            <p className="text-xs text-gray-400 mt-1">SaaS Control Panel</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <i className={`${isCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} text-xl`}></i>
        </button>
      </div>

      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <i className={`${item.icon} text-xl w-6 h-6 flex items-center justify-center`}></i>
              {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
        >
          <i className="ri-logout-box-line text-xl w-6 h-6 flex items-center justify-center"></i>
          {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
