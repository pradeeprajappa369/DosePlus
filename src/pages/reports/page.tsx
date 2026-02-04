import { useState } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import SalesReports from './components/SalesReports';
import PurchaseReports from './components/PurchaseReports';
import InventoryReports from './components/InventoryReports';
import GSTReports from './components/GSTReports';
import CustomerReports from './components/CustomerReports';

export default function ReportsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-01-14' });
  const [isExporting, setIsExporting] = useState(false);

  const tabs = [
    { id: 'sales', label: 'Sales Reports', icon: 'ri-line-chart-line' },
    { id: 'purchase', label: 'Purchase Reports', icon: 'ri-shopping-cart-line' },
    { id: 'inventory', label: 'Inventory Reports', icon: 'ri-stock-line' },
    { id: 'gst', label: 'GST / Tax Reports', icon: 'ri-file-text-line' },
    { id: 'customer', label: 'Customer Reports', icon: 'ri-group-line' }
  ];

  const handleExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Report exported as ${format}`);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        } mt-20 p-8`}>
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
              <p className="text-sm text-gray-600">View sales, purchase, inventory and tax reports</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Date Range Picker */}
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5">
                <i className="ri-calendar-line text-gray-500"></i>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  className="text-sm text-gray-700 outline-none cursor-pointer"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  className="text-sm text-gray-700 outline-none cursor-pointer"
                />
              </div>

              {/* Export Buttons */}
              <button
                onClick={() => handleExport('PDF')}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                <i className="ri-file-pdf-line text-lg"></i>
                {isExporting ? 'Exporting...' : 'PDF'}
              </button>
              <button
                onClick={() => handleExport('Excel')}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                <i className="ri-file-excel-2-line text-lg"></i>
                {isExporting ? 'Exporting...' : 'Excel'}
              </button>
            </div>
          </div>

          {/* Report Category Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 p-2 mb-8">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Report Content */}
          <div>
            {activeTab === 'sales' && <SalesReports />}
            {activeTab === 'purchase' && <PurchaseReports />}
            {activeTab === 'inventory' && <InventoryReports />}
            {activeTab === 'gst' && <GSTReports />}
            {activeTab === 'customer' && <CustomerReports />}
          </div>
        </main>
      </div>
    </div>
  );
}
