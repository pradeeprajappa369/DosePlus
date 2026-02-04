interface ViewPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchase: any;
}

export default function ViewPurchaseModal({ isOpen, onClose, purchase }: ViewPurchaseModalProps) {
  if (!isOpen || !purchase) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const calculateItemTotal = (item: any) => {
    const baseAmount = item.quantity * item.purchasePrice;
    const gstAmount = (baseAmount * item.gst) / 100;
    return baseAmount + gstAmount;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Purchase Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Purchase ID</label>
              <p className="text-base font-semibold text-gray-900">{purchase.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Bill No</label>
              <p className="text-base font-semibold text-gray-900">{purchase.billNo}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Supplier Name</label>
              <p className="text-base text-gray-900">{purchase.supplierName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Bill Date</label>
              <p className="text-base text-gray-900">{formatDate(purchase.billDate)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Payment Status</label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  purchase.paymentStatus === 'Paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}
              >
                {purchase.paymentStatus}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Total Amount</label>
              <p className="text-base font-bold text-gray-900">
                ₹{purchase.totalAmount.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Purchased Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Medicine Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Batch No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Expiry
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Purchase Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      MRP
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      GST %
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {purchase.items.map((item: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.medicineName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.batchNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(item.expiry)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">₹{item.purchasePrice}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">₹{item.mrp}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.gst}%</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        ₹{calculateItemTotal(item).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
