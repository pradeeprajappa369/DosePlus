import { useState } from 'react';

interface SalesTableProps {
  sales: any[];
  onViewInvoice: (sale: any) => void;
  onReturnSale: (saleId: string) => void;
}

export default function SalesTable({ sales, onViewInvoice, onReturnSale }: SalesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(sales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSales = sales.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    if (status === 'Completed') {
      return (
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
          Completed
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
        Returned
      </span>
    );
  };

  const getPaymentBadge = (mode: string) => {
    const colors: any = {
      Cash: 'bg-blue-50 text-blue-700',
      UPI: 'bg-purple-50 text-purple-700',
      Card: 'bg-orange-50 text-orange-700'
    };
    return (
      <span className={`px-3 py-1 ${colors[mode]} rounded-full text-sm font-medium`}>
        {mode}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Invoice No</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment Mode</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{sale.invoiceNo}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{sale.date}</div>
                  <div className="text-xs text-gray-500">{sale.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                  <div className="text-xs text-gray-500">{sale.customerMobile}</div>
                </td>
                <td className="px-6 py-4">
                  {getPaymentBadge(sale.paymentMode)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">₹{sale.grandTotal.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(sale.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewInvoice(sale)}
                      className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Invoice"
                    >
                      <i className="ri-file-text-line text-lg"></i>
                    </button>
                    {sale.status === 'Completed' && (
                      <button
                        onClick={() => onReturnSale(sale.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Return Sale"
                      >
                        <i className="ri-arrow-go-back-line text-lg"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, sales.length)} of {sales.length} sales
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}