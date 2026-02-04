import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SubscriptionBanner from './components/SubscriptionBanner';
import SubscriptionWarningBanner from './components/SubscriptionWarningBanner';
import KPISummary from './components/KPISummary';
import QuickActions from './components/QuickActions';
import RecentTransactions from './components/RecentTransactions';
import LowStockAlert from './components/LowStockAlert';
import ExpiryList from './components/ExpiryList';
import ChartsAnalytics from './components/ChartsAnalytics';

const DashboardPage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Subscription status - Change this to test different states: 'trial' | 'active' | 'expired'
  const subscriptionStatus = 'trial'; // Change to 'active' or 'expired' to see different banners
  const subscriptionData = {
    trial: { daysLeft: 5 },
    active: { planName: 'Standard', expiryDate: '31 May 2025' },
    expired: {}
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header />
        <main className="p-6 mt-20 max-w-[1600px] mx-auto">
          {/* Banners Section */}
          <div className="mb-6">
            <SubscriptionWarningBanner />
            <SubscriptionBanner 
              status={subscriptionStatus}
              daysLeft={subscriptionData.trial.daysLeft}
              planName={subscriptionData.active.planName}
              expiryDate={subscriptionData.active.expiryDate}
            />
          </div>

          {/* KPI Cards */}
          <div className="mb-6">
            <KPISummary />
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <QuickActions />
          </div>

          {/* Charts Section */}
          <div className="mb-6">
            <ChartsAnalytics />
          </div>

          {/* Alerts Section - Two Columns */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <LowStockAlert />
            <ExpiryList />
          </div>

          {/* Recent Transactions */}
          <div className="mb-6">
            <RecentTransactions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
