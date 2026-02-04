import { useState } from 'react';
import { gstReportData } from '../../../mocks/reportsData';

export default function GSTReports() {
  const [isExporting, setIsExporting] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`GST Report exported as ${format}`);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Tax Collected</p>
            <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-lg">
              <i className="ri-file-text-line text-xl text-teal-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(gstReportData.summary.totalTaxCollected)}</h3>
          <p className="text-xs text-teal-600 mt-1">Current period</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">CGST</p>
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
              <i className="ri-government-line text-xl text-blue-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(gstReportData.summary.cgst)}</h3>
          <p className="text-xs text-gray-600 mt-1">Central GST</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">SGST</p>
            <div className="w-10 h-10 flex items-center justify-center bg-green-50 rounded-lg">
              <i className="ri-building-line text-xl text-green-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(gstReportData.summary.sgst)}</h3>
          <p className="text-xs text-gray-600 mt-1">State GST</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">IGST</p>
            <div className="w-10 h-10 flex items-center justify-center bg-purple-50 rounded-lg">
              <i className="ri-global-line text-xl text-purple-600"></i>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(gstReportData.summary.igst)}</h3>
          <p className="text-xs text-gray-600 mt-1">Integrated GST</p>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Export GST Report</h3>
            <p className="text-sm text-gray-600 mt-1">Download GST-ready reports for filing</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport('Excel')}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              <i className="ri-file-excel-2-line text-lg"></i>
              {isExporting ? 'Exporting...' : 'Export Excel'}
            </button>
            <button
              onClick={() => handleExport('PDF')}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              <i className="ri-file-pdf-line text-lg"></i>
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* GST Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">GST Transaction Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxable Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGST</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SGST</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gstReportData.gstTable.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.invoiceNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.taxableAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">{formatCurrency(row.gstAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatCurrency(row.cgst)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatCurrency(row.sgst)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
