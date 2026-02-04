import { useState } from 'react';
import { salesReportData } from '../../../mocks/reportsData';

export default function SalesReports() {
  const [dateRange] = useState({ from: '2024-01-01', to: '2024-01-14' });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Sales</p>
            <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-lg">
              <i className="ri-money-rupee-circle-line text-xl text-teal-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(salesReportData.summary.totalSales)}</h3>
          <p className="text-xs text-teal-600 mt-1">+12.5% from last period</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Orders</p>
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
              <i className="ri-shopping-bag-3-line text-xl text-blue-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{salesReportData.summary.totalOrders.toLocaleString()}</h3>
          <p className="text-xs text-blue-600 mt-1">+8.3% from last period</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Cash Sales</p>
            <div className="w-10 h-10 flex items-center justify-center bg-green-50 rounded-lg">
              <i className="ri-cash-line text-xl text-green-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(salesReportData.summary.cashSales)}</h3>
          <p className="text-xs text-gray-600 mt-1">39.5% of total</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Digital Payments</p>
            <div className="w-10 h-10 flex items-center justify-center bg-purple-50 rounded-lg">
              <i className="ri-bank-card-line text-xl text-purple-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(salesReportData.summary.digitalPayments)}</h3>
          <p className="text-xs text-gray-600 mt-1">60.5% of total</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Sales Trend</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {salesReportData.dailySales.map((day, index) => {
              const maxAmount = Math.max(...salesReportData.dailySales.map(d => d.amount));
              const height = (day.amount / maxAmount) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full">
                    <div
                      className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg transition-all duration-300 hover:from-teal-600 hover:to-teal-500 cursor-pointer"
                      style={{ height: `${height * 2}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatCurrency(day.amount)}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{day.date.split('-')[2]}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Sales Overview</h3>
          <div className="h-64 flex items-end justify-between gap-3">
            {salesReportData.monthlySales.map((month, index) => {
              const maxAmount = Math.max(...salesReportData.monthlySales.map(m => m.amount));
              const height = (month.amount / maxAmount) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                      style={{ height: `${height * 2}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatCurrency(month.amount)}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{month.month}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daily Sales Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cash</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digital</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesReportData.salesTable.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.invoiceCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(row.totalAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatCurrency(row.cash)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatCurrency(row.digital)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
