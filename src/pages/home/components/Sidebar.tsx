import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isFeatureAccessible, getAccessDeniedMessage } from '../../../mocks/subscriptionRules';
import FeatureLockedModal from './FeatureLockedModal';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [lockedFeature, setLockedFeature] = useState<{ feature: string; message: string } | null>(null);

  const menuItems = [
    { icon: 'ri-dashboard-line', label: 'Dashboard', path: '/dashboard', feature: 'dashboard' },
    { icon: 'ri-shopping-cart-line', label: 'Sales', path: '/sales', feature: 'sales' },
    { icon: 'ri-shopping-bag-line', label: 'Purchase', path: '/purchase', feature: 'purchase' },
    { icon: 'ri-box-3-line', label: 'Inventory', path: '/inventory', feature: 'inventory' },
    { icon: 'ri-group-line', label: 'Customers', path: '/customers', feature: 'customers' },
    { icon: 'ri-truck-line', label: 'Suppliers', path: '/suppliers', feature: 'suppliers' },
    { icon: 'ri-team-line', label: 'Staff', path: '/staff', feature: 'dashboard' },
    { icon: 'ri-shopping-basket-line', label: 'Orders', path: '/orders', feature: 'orders' },
    { icon: 'ri-price-tag-3-line', label: 'Offers', path: '/offers', feature: 'offers' },
    { icon: 'ri-file-chart-line', label: 'Reports', path: '/reports', feature: 'reports' },
    { icon: 'ri-upload-cloud-line', label: 'Upload Bills', path: '/upload', feature: 'inventory' },
    { icon: 'ri-settings-3-line', label: 'Settings', path: '/settings', feature: 'dashboard' },
  ];

  // const handleMenuClick = (e: React.MouseEvent, item: typeof menuItems[0]) => {
  //   const isAccessible = isFeatureAccessible(item.feature);
    
  //   if (!isAccessible) {
  //     e.preventDefault();
  //     const message = getAccessDeniedMessage(item.feature);
  //     setLockedFeature({ feature: item.feature, message });
  //   }
  // };

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-gray-200 px-6">
          {!isCollapsed ? (
            <img 
              alt="Dose Plus" 
              className="h-8 sm:h-10 w-auto" 
              src="https://public.readdy.ai/ai/img_res/11d4d049-45a1-42fc-ad9d-44d87caf2525.png"
            />
          ) : (
            <img 
              alt="Dose Plus" 
              className="h-8 w-auto" 
              src="https://public.readdy.ai/ai/img_res/11d4d049-45a1-42fc-ad9d-44d87caf2525.png"
            />
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-24 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-600 transition-colors cursor-pointer shadow-lg z-10"
        >
          <i className={`${isCollapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'} text-sm`}></i>
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

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-3 flex-shrink-0">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all cursor-pointer whitespace-nowrap group">
            <i className="ri-logout-box-line text-xl flex-shrink-0"></i>
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
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

export default Sidebar;
