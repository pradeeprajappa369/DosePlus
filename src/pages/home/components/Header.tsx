import { useState } from 'react';
import { notifications } from '../../../mocks/dashboardData';
import GlobalSearch from '../../../components/feature/GlobalSearch';

interface HeaderProps {
  isCollapsed: boolean;
}

const Header = ({ isCollapsed }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const unreadCount = notifications.filter(n => n.type === 'warning' || n.type === 'alert').length;

  const handleLogout = () => {
    setShowLogoutModal(false);
    setShowProfile(false);
    // Logout logic here
    alert('Logged out successfully!');
  };

  const handleNavigate = (path: string) => {
    setShowProfile(false);
    if (window.REACT_APP_NAVIGATE) {
      window.REACT_APP_NAVIGATE(path);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 h-20 bg-white border-b border-gray-200 z-40 transition-all duration-300 theme-dark:bg-gray-900 theme-dark:border-gray-800 ${
          isCollapsed ? 'left-20' : 'left-64'
        }`}
      >
        <div className="h-full px-8 flex items-center justify-between gap-6">
          {/* Left Section - Store Name */}
          <div className="flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-800 theme-dark:text-gray-100">Sri Lakshmi Medicals</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1 theme-dark:text-gray-400">
              <i className="ri-calendar-line"></i>
              {currentDate}
            </p>
          </div>

          {/* Center Section - Global Search Bar */}
          <GlobalSearch userRole="admin" />

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer theme-dark:hover:bg-gray-800"
              >
                <i className="ri-notification-3-line text-xl text-gray-600 theme-dark:text-gray-300"></i>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  ></div>
                  <div className="absolute right-0 top-14 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 theme-dark:bg-gray-800 theme-dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between theme-dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 text-base theme-dark:text-gray-100">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-2.5 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full theme-dark:bg-red-900/30 theme-dark:text-red-400">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors theme-dark:border-gray-700 theme-dark:hover:bg-gray-700/50 ${
                            notif.type === 'warning' || notif.type === 'alert' ? 'bg-orange-50/50 theme-dark:bg-orange-900/10' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                notif.type === 'warning'
                                  ? 'bg-orange-100 text-orange-600 theme-dark:bg-orange-900/30 theme-dark:text-orange-400'
                                  : notif.type === 'alert'
                                  ? 'bg-red-100 text-red-600 theme-dark:bg-red-900/30 theme-dark:text-red-400'
                                  : notif.type === 'success'
                                  ? 'bg-green-100 text-green-600 theme-dark:bg-green-900/30 theme-dark:text-green-400'
                                  : 'bg-blue-100 text-blue-600 theme-dark:bg-blue-900/30 theme-dark:text-blue-400'
                              }`}
                            >
                              <i className={`${notif.icon} text-base`}></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 leading-relaxed theme-dark:text-gray-200">{notif.text}</p>
                              <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1 theme-dark:text-gray-400">
                                <i className="ri-time-line"></i>
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-gray-200 bg-gray-50 theme-dark:border-gray-700 theme-dark:bg-gray-800/50">
                      <button className="text-sm text-accent hover:opacity-80 font-medium cursor-pointer whitespace-nowrap transition-opacity">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200 theme-dark:bg-gray-700"></div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors cursor-pointer theme-dark:hover:bg-gray-800"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  KK
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 whitespace-nowrap theme-dark:text-gray-100">Kalyan Kumar</p>
                  <p className="text-xs text-accent whitespace-nowrap font-medium">Admin</p>
                </div>
                <i className="ri-arrow-down-s-line text-gray-600 theme-dark:text-gray-400"></i>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfile(false)}
                  ></div>
                  <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 theme-dark:bg-gray-800 theme-dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-teal-50 to-white theme-dark:border-gray-700 theme-dark:from-gray-800 theme-dark:to-gray-800">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                          KK
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 theme-dark:text-gray-100">Kalyan Kumar</p>
                          <p className="text-xs text-accent font-medium">Admin</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 theme-dark:text-gray-400">kalyan@gmail.com</p>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={() => handleNavigate('/profile')}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer whitespace-nowrap transition-colors theme-dark:text-gray-300 theme-dark:hover:bg-gray-700/50"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg theme-dark:bg-gray-700">
                          <i className="ri-user-line text-gray-600 theme-dark:text-gray-300"></i>
                        </div>
                        <span>My Profile</span>
                      </button>
                      <button 
                        onClick={() => handleNavigate('/app-settings')}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer whitespace-nowrap transition-colors theme-dark:text-gray-300 theme-dark:hover:bg-gray-700/50"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg theme-dark:bg-gray-700">
                          <i className="ri-settings-3-line text-gray-600 theme-dark:text-gray-300"></i>
                        </div>
                        <span>Settings</span>
                      </button>
                      <button 
                        onClick={() => handleNavigate('/help-support')}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer whitespace-nowrap transition-colors theme-dark:text-gray-300 theme-dark:hover:bg-gray-700/50"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg theme-dark:bg-gray-700">
                          <i className="ri-question-line text-gray-600 theme-dark:text-gray-300"></i>
                        </div>
                        <span>Help &amp; Support</span>
                      </button>
                    </div>
                    <div className="border-t border-gray-200 py-2 theme-dark:border-gray-700">
                      <button 
                        onClick={() => {
                          setShowProfile(false);
                          setShowLogoutModal(true);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer whitespace-nowrap transition-colors theme-dark:hover:bg-red-900/20"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg theme-dark:bg-red-900/30">
                          <i className="ri-logout-box-line text-red-600 theme-dark:text-red-400"></i>
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowLogoutModal(false)}>
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 theme-dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 theme-dark:bg-red-900/30">
                <i className="ri-logout-box-line text-red-600 text-3xl theme-dark:text-red-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-2 theme-dark:text-gray-100">Logout</h3>
              <p className="text-gray-600 text-center mb-6 theme-dark:text-gray-400">Are you sure you want to logout?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold cursor-pointer whitespace-nowrap theme-dark:bg-gray-700 theme-dark:text-gray-300 theme-dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold cursor-pointer whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
