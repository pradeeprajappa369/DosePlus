import { useRef } from 'react';
import { ordersData } from '../../../mocks/ordersData';

interface InvoiceModalProps {
  order: typeof ordersData[0];
  onClose: () => void;
}

export default function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    alert('Download functionality would generate a PDF invoice');
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Invoice Preview</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Invoice Content */}
        <div ref={invoiceRef} className="p-8">
          {/* Invoice Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-teal-600 mb-2">PharmaCare</h1>
              <p className="text-sm text-gray-600">123 Medical Plaza, Suite 100</p>
              <p className="text-sm text-gray-600">Healthcare City, HC 12345</p>
              <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-sm text-gray-600">Email: billing@pharmacare.com</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">INVOICE</h2>
              <p className="text-sm text-gray-600">Invoice #: {order.id}</p>
              <p className="text-sm text-gray-600">Date: {order.date}</p>
              <p className="text-sm text-gray-600">Order Type: {order.orderType}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">Bill To:</h3>
            <p className="text-base font-semibold text-gray-900">{order.customerName}</p>
            <p className="text-sm text-gray-600">{order.customerEmail}</p>
            <p className="text-sm text-gray-600">{order.customerPhone}</p>
          </div>

          {/* Order Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Unit Price</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">Tax (8%):</span>
                <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-200">
                <span className="text-base font-bold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-teal-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-1">Payment Status</h3>
                <p className="text-sm text-gray-600">Order Status: {order.orderStatus}</p>
              </div>
              <div>
                <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${
                  order.paymentStatus === 'Paid' 
                    ? 'bg-green-100 text-green-700' 
                    : order.paymentStatus === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500 mb-2">
              <span className="font-semibold">Terms & Conditions:</span> Payment is due within 30 days. 
              Please include invoice number with payment.
            </p>
            <p className="text-xs text-gray-500">
              <span className="font-semibold">Note:</span> This is a computer-generated invoice and does not require a signature.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <i className="ri-download-line"></i>
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <i className="ri-printer-line"></i>
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
