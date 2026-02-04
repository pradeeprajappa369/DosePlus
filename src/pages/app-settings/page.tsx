import { useState } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import { useTheme } from '../../contexts/ThemeContext';

const AppSettingsPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { themeMode, accentColor, setThemeMode, setAccentColor, resetTheme } = useTheme();
  
  const [notifications, setNotifications] = useState({
    lowStock: true,
    expiry: true,
    offers: false
  });

  const [system, setSystem] = useState({
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    language: 'English'
  });

  const accentColors = [
    { name: 'Blue', value: '#2563EB' as const, label: 'Default Blue' },
    { name: 'Green', value: '#16A34A' as const, label: 'Fresh Green' },
    { name: 'Purple', value: '#7C3AED' as const, label: 'Royal Purple' },
    { name: 'Orange', value: '#EA580C' as const, label: 'Vibrant Orange' },
    { name: 'Red', value: '#DC2626' as const, label: 'Bold Red' },
  ];

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleResetTheme = () => {
    resetTheme();
    setTimeout(() => {
      alert('Theme reset to default successfully!');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <Header isCollapsed={isSidebarCollapsed} />
      
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-8`}>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your application preferences</p>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-notification-3-line text-teal-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Notification Settings</h3>
              <p className="text-gray-600 text-sm">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">Low Stock Alerts</p>
                <p className="text-sm text-gray-600">Get notified when products are running low</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, lowStock: !notifications.lowStock })}
                className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                  notifications.lowStock ? 'bg-accent' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.lowStock ? 'translate-x-7' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">Expiry Alerts</p>
                <p className="text-sm text-gray-600">Get notified about expiring products</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, expiry: !notifications.expiry })}
                className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                  notifications.expiry ? 'bg-accent' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.expiry ? 'translate-x-7' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">Offer Notifications</p>
                <p className="text-sm text-gray-600">Get notified about new offers and promotions</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, offers: !notifications.offers })}
                className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                  notifications.offers ? 'bg-accent' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.offers ? 'translate-x-7' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-palette-line text-purple-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Appearance Settings</h3>
                <p className="text-gray-600 text-sm">Customize the look and feel of your dashboard</p>
              </div>
            </div>
            <button
              onClick={handleResetTheme}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <i className="ri-restart-line"></i>
              Reset to Default
            </button>
          </div>

          {/* Helper Text */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <i className="ri-information-line text-blue-600 text-lg mt-0.5"></i>
            <p className="text-sm text-blue-800">
              Appearance settings apply instantly and persist during your current session. Changes will be visible across all pages.
            </p>
          </div>

          <div className="space-y-8">
            {/* Theme Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">Theme Mode</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setThemeMode('light')}
                  className={`p-5 border-2 rounded-xl transition-all cursor-pointer ${
                    themeMode === 'light'
                      ? 'border-accent bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                      <i className="ri-sun-line text-yellow-500 text-2xl"></i>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-gray-800 text-base">Light Mode</p>
                      <p className="text-xs text-gray-600 mt-1">Bright and clean interface</p>
                    </div>
                    {themeMode === 'light' && (
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setThemeMode('dark')}
                  className={`p-5 border-2 rounded-xl transition-all cursor-pointer ${
                    themeMode === 'dark'
                      ? 'border-accent bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-800 border-2 border-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                      <i className="ri-moon-line text-blue-300 text-2xl"></i>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-gray-800 text-base">Dark Mode</p>
                      <p className="text-xs text-gray-600 mt-1">Easy on the eyes</p>
                    </div>
                    {themeMode === 'dark' && (
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">Accent Color</label>
              <p className="text-xs text-gray-600 mb-4">
                Choose a primary color for buttons, links, and active states
              </p>
              
              <div className="grid grid-cols-5 gap-4">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value)}
                    className={`relative p-4 border-2 rounded-xl transition-all cursor-pointer group ${
                      accentColor === color.value
                        ? 'border-gray-800 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-lg shadow-md transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color.value }}
                      ></div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-800">{color.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{color.label}</p>
                      </div>
                      {accentColor === color.value && (
                        <div 
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: color.value }}
                        >
                          <i className="ri-check-line text-white text-sm font-bold"></i>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Live Preview */}
              <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-4">Live Preview</p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-2.5 bg-accent text-white rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap">
                    Primary Button
                  </button>
                  <button className="px-6 py-2.5 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-white transition-all cursor-pointer whitespace-nowrap">
                    Outlined Button
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
                    <i className="ri-checkbox-circle-fill text-accent text-xl"></i>
                    <span className="text-sm text-gray-700">Active State</span>
                  </div>
                  <div className="relative w-14 h-7 bg-accent rounded-full cursor-pointer">
                    <span className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-settings-3-line text-orange-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">System Preferences</h3>
              <p className="text-gray-600 text-sm">Configure system-wide settings</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default Currency</label>
              <select
                value={system.currency}
                onChange={(e) => setSystem({ ...system, currency: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date Format</label>
              <select
                value={system.dateFormat}
                onChange={(e) => setSystem({ ...system, dateFormat: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
              <select
                value={system.language}
                onChange={(e) => setSystem({ ...system, language: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-8 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-semibold cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-md"
          >
            <i className="ri-save-line"></i>
            Save All Settings
          </button>
        </div>
      </main>
    </div>
  );
};

export default AppSettingsPage;
