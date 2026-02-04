interface Subscriber {
  pharmacyName: string;
  email: string;
  subscriptionDate: string;
  nextBilling: string;
  status: 'active' | 'cancelled';
}

interface ViewSubscribersModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  subscribers: Subscriber[];
}

export default function ViewSubscribersModal({
  isOpen,
  onClose,
  planName,
  subscribers,
}: ViewSubscribersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Subscribed Pharmacies</h3>
            <p className="text-sm text-gray-500 mt-1">
              {planName} - {subscribers.length} active subscribers
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {subscribers.map((subscriber, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                      <i className="ri-hospital-line text-xl text-white"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{subscriber.pharmacyName}</h4>
                      <p className="text-xs text-gray-500">{subscriber.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        subscriber.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {subscriber.status === 'active' ? 'Active' : 'Cancelled'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Subscription Date</p>
                    <p className="text-sm font-semibold text-gray-900">{subscriber.subscriptionDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Next Billing</p>
                    <p className="text-sm font-semibold text-gray-900">{subscriber.nextBilling}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium cursor-pointer whitespace-nowrap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
