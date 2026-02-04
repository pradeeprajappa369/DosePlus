interface Transaction {
  id: string;
  pharmacyName: string;
  plan: string;
  amount: number;
  paymentMethod: string;
  status: string;
  date: string;
  transactionId: string;
}

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionDetailsModal({ transaction, onClose }: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      Paid: 'text-green-600 bg-green-100',
      Pending: 'text-amber-600 bg-amber-100',
      Failed: 'text-red-600 bg-red-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
            <p className="text-sm text-gray-500 mt-1">{transaction.transactionId}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-center">
            <span className={`inline-flex items-center px-6 py-3 rounded-full text-base font-semibold ${getStatusColor(transaction.status)}`}>
              <span className={`w-2 h-2 rounded-full mr-3 ${
                transaction.status === 'Paid' ? 'bg-green-500' :
                transaction.status === 'Pending' ? 'bg-amber-500' :
                'bg-red-500'
              }`}></span>
              {transaction.status}
            </span>
          </div>

          {/* Amount */}
          <div className="text-center py-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Transaction Amount</p>
            <p className="text-4xl font-bold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Pharmacy Name</p>
              <p className="text-sm font-semibold text-gray-900">{transaction.pharmacyName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Subscription Plan</p>
              <p className="text-sm font-semibold text-gray-900">{transaction.plan}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Payment Method</p>
              <div className="flex items-center gap-2">
                <i className={`${
                  transaction.paymentMethod === 'Credit Card' ? 'ri-bank-card-line' :
                  transaction.paymentMethod === 'UPI' ? 'ri-smartphone-line' :
                  'ri-bank-line'
                } text-gray-600`}></i>
                <p className="text-sm font-semibold text-gray-900">{transaction.paymentMethod}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Transaction Date</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(transaction.date).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Transaction ID</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-mono font-semibold text-gray-900">{transaction.transactionId}</p>
              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                <i className="ri-file-copy-line mr-1"></i>
                Copy
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Additional Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Billing Cycle</span>
                <span className="font-medium text-gray-900">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Billing Date</span>
                <span className="font-medium text-gray-900">
                  {new Date(new Date(transaction.date).setMonth(new Date(transaction.date).getMonth() + 1)).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium text-gray-900">₹{(transaction.amount * 0.18).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 px-4 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-download-line mr-2"></i>
              Download Invoice
            </button>
            <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-mail-line mr-2"></i>
              Send Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
