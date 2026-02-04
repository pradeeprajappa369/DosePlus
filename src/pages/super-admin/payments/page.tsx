import { useState } from 'react';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import SuperAdminHeader from '../components/SuperAdminHeader';
import PaymentKPICards from './components/PaymentKPICards';
import RevenueChart from './components/RevenueChart';
import SubscriptionDistributionChart from './components/SubscriptionDistributionChart';
import PaymentStatusChart from './components/PaymentStatusChart';
import TransactionsTable from './components/TransactionsTable';
import TransactionDetailsModal from './components/TransactionDetailsModal';
import {
  paymentsKPIData,
  revenueOverTimeData,
  subscriptionDistributionData,
  paymentStatusData,
  recentTransactionsData
} from '../../../mocks/paymentsData';

export default function PaymentsBilling() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <SuperAdminHeader isSidebarCollapsed={isSidebarCollapsed} />

      <main
        className={`transition-all duration-300 pt-20 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Payments & Revenue</h2>
            <p className="text-sm text-gray-600 mt-1">Monitor platform revenue and payment activities</p>
          </div>

          {/* KPI Cards */}
          <PaymentKPICards kpiData={paymentsKPIData} />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <RevenueChart data={revenueOverTimeData} />
            </div>
            <div>
              <PaymentStatusChart data={paymentStatusData} />
            </div>
          </div>

          {/* Subscription Distribution */}
          <div className="mb-8">
            <SubscriptionDistributionChart data={subscriptionDistributionData} />
          </div>

          {/* Transactions Table */}
          <TransactionsTable
            transactions={recentTransactionsData}
            onViewDetails={setSelectedTransaction}
          />
        </div>
      </main>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}
