import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isFeatureAccessible, getAccessDeniedMessage } from '../../../mocks/subscriptionRules';
import FeatureLockedModal from '../../home/components/FeatureLockedModal';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const StaffSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lockedFeature, setLockedFeature] = useState<{ feature: string; message: string } | null>(null);

  const menuItems = [
    { icon: 'ri-dashboard-line', label: 'Dashboard', path: '/staff-dashboard', feature: 'dashboard' },
    { icon: 'ri-shopping-cart-line', label: 'Sales', path: '/sales', feature: 'sales' },
    { icon: 'ri-shopping-basket-line', label: 'Orders', path: '/orders', feature: 'orders' },
    { icon: 'ri-group-line', label: 'Customers', path: '/customers', feature: 'customers' },
    { icon: 'ri-box-3-line', label: 'Inventory', path: '/inventory', feature: 'inventory' },
  ];

  const handleMenuClick = (e: React.MouseEvent, item: typeof menuItems[0]) => {
    const isAccessible = isFeatureAccessible(item.feature);
    
    if (!isAccessible) {
      e.preventDefault();
      const message = getAccessDeniedMessage(item.feature);
      setLockedFeature({ feature: item.feature, message });
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <i className="ri-capsule-line text-xl text-white"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Dose Plus</h2>
                <p className="text-xs text-gray-500">Staff Portal</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mx-auto">
              <i className="ri-capsule-line text-xl text-white"></i>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-24 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <i className={`${isCollapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'} text-gray-600 text-sm`}></i>
        </button>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isAccessible = isFeatureAccessible(item.feature);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleMenuClick(e, item)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-all group relative ${
                  isActive
                    ? 'bg-teal-50 text-teal-600'
                    : isAccessible
                    ? 'text-gray-700 hover:bg-gray-50'
                    : 'text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                <i className={`${item.icon} text-xl flex-shrink-0`}></i>
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap flex-1">{item.label}</span>
                )}
                {!isAccessible && !isCollapsed && (
                  <i className="ri-lock-fill text-sm"></i>
                )}
                {!isAccessible && isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <i className="ri-lock-fill mr-1"></i>
                    Locked
                  </div>
                )}
                {isCollapsed && isAccessible && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={() => handleNavigation('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-logout-box-line text-xl"></i>
            {!isCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      <FeatureLockedModal
        isOpen={lockedFeature !== null}
        onClose={() => setLockedFeature(null)}
        feature={lockedFeature?.feature || ''}
        message={lockedFeature?.message || ''}
      />
    </>
  );
};

export default StaffSidebar;
