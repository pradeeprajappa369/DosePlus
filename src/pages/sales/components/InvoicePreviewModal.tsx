interface InvoicePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: any;
}

export default function InvoicePreviewModal({ isOpen, onClose, sale }: InvoicePreviewModalProps) {
  if (!isOpen || !sale) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Invoice Preview</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-teal-600 mb-2">Dose Plus</h1>
                <p className="text-sm text-gray-600">Your Trusted Pharmacy</p>
                <p className="text-sm text-gray-600">123 Medical Street, Healthcare City</p>
                <p className="text-sm text-gray-600">Phone: +91 98765 43210</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Invoice No</div>
                <div className="text-xl font-bold text-gray-900">{sale.invoiceNo}</div>
                <div className="text-sm text-gray-600 mt-2">{sale.date}</div>
                <div className="text-sm text-gray-600">{sale.time}</div>
              </div>
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-700 mb-2">Customer Details</div>
              <div className="text-sm text-gray-900">{sale.customerName}</div>
              <div className="text-sm text-gray-600">{sale.customerMobile}</div>
            </div>

            <table className="w-full mb-8">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sale.items.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">₹{item.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">₹{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mb-8">
              <div className="w-80 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{sale.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">GST (12%)</span>
                  <span className="font-medium text-gray-900">₹{sale.gst.toFixed(2)}</span>
                </div>
                {sale.discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-red-600">-₹{sale.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-3 border-t-2 border-gray-300 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-bold text-teal-600">₹{sale.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Payment Mode</span>
                <span className="font-semibold text-gray-900">{sale.paymentMode}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>Thank you for your purchase!</p>
              <p className="mt-1">For any queries, please contact us at support@doseplus.com</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2 border border-teal-600 text-teal-600 rounded-lg text-sm font-medium hover:bg-teal-50 transition-colors whitespace-nowrap"
          >
            <i className="ri-download-line mr-2"></i>
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-printer-line mr-2"></i>
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}