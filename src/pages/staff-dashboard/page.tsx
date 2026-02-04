import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StaffKPISummary from './components/StaffKPISummary';
import StaffQuickActions from './components/StaffQuickActions';
import RecentSales from './components/RecentSales';
import LowStockView from './components/LowStockView';
import SubscriptionWarningBanner from '../home/components/SubscriptionWarningBanner';

export default function StaffDashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header isCollapsed={isSidebarCollapsed} />
        
        <main className="flex-1 overflow-y-auto mt-20">
          <div className="p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Dashboard</h1>
              <p className="text-base text-gray-600">Quick access to daily pharmacy operations</p>
            </div>

            {/* KPI Summary */}
            <div className="mb-8">
              <SubscriptionWarningBanner />
              <StaffKPISummary />
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <StaffQuickActions />
            </div>

            {/* Recent Sales and Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <RecentSales />
              <LowStockView />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
