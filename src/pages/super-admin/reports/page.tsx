import { useState } from 'react';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import SuperAdminHeader from '../components/SuperAdminHeader';
import PlatformKPICards from './components/PlatformKPICards';
import SubscriptionGrowthChart from './components/SubscriptionGrowthChart';
import RevenueByPlanChart from './components/RevenueByPlanChart';
import PharmacyActivityChart from './components/PharmacyActivityChart';
import FeatureUsageTable from './components/FeatureUsageTable';
import PharmacyReportTable from './components/PharmacyReportTable';
import {
  platformKPIData,
  subscriptionGrowthData,
  revenueByPlanData,
  pharmacyActivityData,
  featureUsageData,
  pharmacyReportData
} from '../../../mocks/reportsAnalyticsData';

export default function SuperAdminReports() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState('last30days');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const handleExportPDF = () => {
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleExportExcel = () => {
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleViewPharmacy = (pharmacy: any) => {
    console.log('View pharmacy:', pharmacy);
  };

  const handleViewSubscription = (pharmacy: any) => {
    console.log('View subscription:', pharmacy);
  };

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
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Platform Reports</h2>
            <p className="text-sm text-gray-600 mt-1">Overall system analytics & performance</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                >
                  <option value="today">Today</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Type
                </label>
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                >
                  <option value="all">All Plans</option>
                  <option value="starter">Starter</option>
                  <option value="professional">Professional</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={handleExportPDF}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-file-pdf-line mr-2"></i>
                  Export PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-file-excel-line mr-2"></i>
                  Export Excel
                </button>
              </div>
            </div>
          </div>

          {/* Export Success Toast */}
          {showExportSuccess && (
            <div className="fixed top-24 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in">
              <i className="ri-check-circle-line text-xl"></i>
              <span className="font-medium">Report exported successfully!</span>
            </div>
          )}

          {/* KPI Cards */}
          <PlatformKPICards kpiData={platformKPIData} />

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SubscriptionGrowthChart data={subscriptionGrowthData} />
            <PharmacyActivityChart data={pharmacyActivityData} />
          </div>

          {/* Charts Row 2 */}
          <div className="mb-8">
            <RevenueByPlanChart data={revenueByPlanData} />
          </div>

          {/* Feature Usage */}
          <div className="mb-8">
            <FeatureUsageTable data={featureUsageData} />
          </div>

          {/* Pharmacy Report Table */}
          <PharmacyReportTable
            data={pharmacyReportData}
            onViewPharmacy={handleViewPharmacy}
            onViewSubscription={handleViewSubscription}
          />
        </div>
      </main>
    </div>
  );
}
