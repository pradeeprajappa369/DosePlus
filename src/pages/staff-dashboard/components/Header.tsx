import GlobalSearch from '../../../components/feature/GlobalSearch';

interface HeaderProps {
  isSidebarCollapsed: boolean;
}

const Header = ({ isSidebarCollapsed }: HeaderProps) => {
  return (
    <header
      className={`fixed top-0 right-0 h-20 bg-white border-b border-gray-200 z-30 transition-all duration-300 theme-dark:bg-gray-900 theme-dark:border-gray-800 ${
        isSidebarCollapsed ? 'left-20' : 'left-64'
      }`}
    >
      <div className="h-full px-8 flex items-center justify-between gap-6">
        {/* Left Section */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 theme-dark:text-gray-100">Staff Panel</h1>
          <p className="text-sm text-gray-500 theme-dark:text-gray-400">Quick access to daily pharmacy operations</p>
        </div>

        {/* Center Section - Global Search */}
        <GlobalSearch userRole="staff" />

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer theme-dark:hover:bg-gray-800">
            <i className="ri-notification-3-line text-xl text-gray-600 theme-dark:text-gray-300"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Staff Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 theme-dark:border-gray-700">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center theme-dark:bg-teal-900/30">
              <i className="ri-user-line text-teal-600 text-lg theme-dark:text-teal-400"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 theme-dark:text-gray-100">Staff User</p>
              <p className="text-xs text-gray-500 theme-dark:text-gray-400">staff@doseplus.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
