import GlobalSearch from '../../../components/feature/GlobalSearch';

interface SuperAdminHeaderProps {
  isSidebarCollapsed: boolean;
}

export default function SuperAdminHeader({ isSidebarCollapsed }: SuperAdminHeaderProps) {
  return (
    <header
      className={`fixed top-0 right-0 h-20 bg-white border-b border-gray-200 z-30 transition-all duration-300 theme-dark:bg-gray-900 theme-dark:border-gray-800 ${
        isSidebarCollapsed ? 'left-20' : 'left-64'
      }`}
    >
      <div className="h-full px-8 flex items-center justify-between gap-6">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 theme-dark:text-gray-100">Super Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1 theme-dark:text-gray-400">Manage all pharmacy accounts and platform settings</p>
        </div>

        {/* Center Section - Global Search */}
        <GlobalSearch userRole="superadmin" />

        <div className="flex items-center gap-4 flex-shrink-0">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer theme-dark:hover:bg-gray-800">
            <i className="ri-notification-line text-xl text-gray-700 theme-dark:text-gray-300"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 theme-dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold">
              SA
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 theme-dark:text-gray-100">Super Admin</p>
              <p className="text-xs text-gray-500 theme-dark:text-gray-400">superadmin@doseplus.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
