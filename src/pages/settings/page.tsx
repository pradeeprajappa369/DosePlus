import { useState } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import PharmacyDetails from './components/PharmacyDetails';
import UserProfile from './components/UserProfile';
import NotificationPreferences from './components/NotificationPreferences';
import TaxInvoiceSettings from './components/TaxInvoiceSettings';
import OnlineSellingSettings from './components/OnlineSellingSettings';
import { isFeatureAccessible, getCurrentPharmacySubscription } from '../../mocks/subscriptionRules';

const SettingsPage = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const subscription = getCurrentPharmacySubscription();
  const canAccessOnlineStore = isFeatureAccessible('onlineStore');

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: 'ri-user-line' },
    { id: 'pharmacy', label: 'Pharmacy Details', icon: 'ri-hospital-line' },
    { id: 'tax', label: 'Tax & Invoice', icon: 'ri-file-text-line' },
    { id: 'notifications', label: 'Notifications', icon: 'ri-notification-line' },
    ...(canAccessOnlineStore ? [{ id: 'online', label: 'Online Selling', icon: 'ri-store-line' }] : []),
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Logout logic here
    console.log('User logged out');
    setShowLogoutModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className={`flex-1 overflow-y-auto mt-20 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-sm text-gray-600">Manage your pharmacy and account settings</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
              >
                <i className="ri-logout-box-line text-lg"></i>
                Logout
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-teal-600 text-teal-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      <i className={`${tab.icon} text-lg`}></i>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'profile' && <UserProfile />}
                {activeTab === 'pharmacy' && <PharmacyDetails />}
                {activeTab === 'tax' && <TaxInvoiceSettings />}
                {activeTab === 'notifications' && <NotificationPreferences />}
                {activeTab === 'online' && canAccessOnlineStore && <OnlineSellingSettings />}
                {activeTab === 'online' && !canAccessOnlineStore && (
                  <div className="text-center py-12">
                    <i className="ri-lock-fill text-5xl text-gray-300 mb-4"></i>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Store Not Available</h3>
                    <p className="text-gray-600 mb-4">
                      {subscription.plan === 'starter'
                        ? 'Upgrade to Professional or Enterprise plan to enable Online Store.'
                        : 'Purchase the Online Store add-on to enable this feature.'}
                    </p>
                    <button className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
                      {subscription.plan === 'starter' ? 'Upgrade Plan' : 'Purchase Add-on'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowLogoutModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <i className="ri-logout-box-line text-3xl text-red-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPage;
