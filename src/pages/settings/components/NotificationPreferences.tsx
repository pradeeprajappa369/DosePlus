import { useState } from 'react';

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    lowStockAlerts: true,
    expiryAlerts: true,
    orderNotifications: true,
    paymentAlerts: false,
    systemUpdates: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  const handleSave = () => {
    // Save logic here
    console.log('Notification preferences saved:', preferences);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <i className="ri-notification-3-line text-orange-600 text-xl"></i>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
            <p className="text-sm text-gray-500">Manage how you receive notifications</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
        >
          <i className="ri-save-line"></i>
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Alert Types */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Alert Types</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-alert-line text-red-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Low Stock Alerts</p>
                  <p className="text-xs text-gray-500">Get notified when inventory is running low</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('lowStockAlerts')}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences.lowStockAlerts ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.lowStockAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-close-line text-orange-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Expiry Alerts</p>
                  <p className="text-xs text-gray-500">Get notified about expiring medicines</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('expiryAlerts')}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences.expiryAlerts ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.expiryAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-shopping-cart-line text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Notifications</p>
                  <p className="text-xs text-gray-500">Get notified about new orders and updates</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('orderNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences.orderNotifications ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.orderNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-rupee-circle-line text-green-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Payment Alerts</p>
                  <p className="text-xs text-gray-500">Get notified about payment transactions</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('paymentAlerts')}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences.paymentAlerts ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.paymentAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-refresh-line text-purple-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">System Updates</p>
                  <p className="text-xs text-gray-500">Get notified about system updates and maintenance</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('systemUpdates')}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences.systemUpdates ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.systemUpdates ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Channels */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Notification Channels</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center">
                  <i className="ri-mail-line text-teal-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via email</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences.emailNotifications ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-message-3-line text-green-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via SMS</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('smsNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences.smsNotifications ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.smsNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-notification-badge-line text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive push notifications in browser</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences.pushNotifications ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
