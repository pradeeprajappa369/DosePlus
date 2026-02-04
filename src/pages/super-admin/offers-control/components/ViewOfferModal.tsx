interface Offer {
  id: string;
  name: string;
  description: string;
  type: 'PERCENTAGE' | 'FLAT';
  value: number;
  applicablePlans: string[];
  status: 'ACTIVE' | 'INACTIVE';
  validFrom: string;
  validTo: string;
  createdAt: string;
}

interface ViewOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer | null;
}

export default function ViewOfferModal({ isOpen, onClose, offer }: ViewOfferModalProps) {
  if (!isOpen || !offer) return null;

  const isOfferValid = () => {
    const today = new Date().toISOString().split('T')[0];
    return offer.validFrom <= today && offer.validTo >= today;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-6 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">{offer.name}</h2>
            <p className="text-teal-100 text-sm mt-1">Offer ID: {offer.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Status Banner */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              offer.status === 'ACTIVE' && isOfferValid()
                ? 'bg-green-50 border border-green-200'
                : offer.status === 'ACTIVE'
                ? 'bg-orange-50 border border-orange-200'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  offer.status === 'ACTIVE' && isOfferValid()
                    ? 'bg-green-500'
                    : offer.status === 'ACTIVE'
                    ? 'bg-orange-500'
                    : 'bg-gray-500'
                }`}
              >
                <i
                  className={`${
                    offer.status === 'ACTIVE' && isOfferValid()
                      ? 'ri-checkbox-circle-line'
                      : offer.status === 'ACTIVE'
                      ? 'ri-time-line'
                      : 'ri-close-circle-line'
                  } text-2xl text-white`}
                ></i>
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {offer.status === 'ACTIVE' && isOfferValid()
                    ? 'Active & Valid'
                    : offer.status === 'ACTIVE'
                    ? 'Active (Not in valid period)'
                    : 'Inactive'}
                </p>
                <p className="text-sm text-gray-600">
                  {offer.status === 'ACTIVE' && isOfferValid()
                    ? 'This offer is currently available to pharmacies'
                    : offer.status === 'ACTIVE'
                    ? 'Offer is active but outside valid date range'
                    : 'This offer is currently disabled'}
                </p>
              </div>
            </div>
          </div>

          {/* Offer Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-information-line text-teal-600"></i>
              Offer Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-gray-900 font-medium">{offer.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Offer Type</p>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      offer.type === 'PERCENTAGE'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {offer.type === 'PERCENTAGE' ? (
                      <i className="ri-percent-line"></i>
                    ) : (
                      <i className="ri-money-rupee-circle-line"></i>
                    )}
                    {offer.type === 'PERCENTAGE' ? 'Percentage' : 'Flat Amount'}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Discount Value</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {offer.type === 'PERCENTAGE' ? `${offer.value}%` : `₹${offer.value}`}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Applicable Plans</p>
                <div className="flex flex-wrap gap-2">
                  {offer.applicablePlans.map((plan, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold bg-teal-100 text-teal-700"
                    >
                      <i className="ri-vip-crown-line"></i>
                      {plan}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Validity Period */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-calendar-line text-teal-600"></i>
              Validity Period
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valid From</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(offer.validFrom).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valid To</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(offer.validTo).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Created On</p>
                <p className="text-gray-900 font-medium">
                  {new Date(offer.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Usage Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-lg flex-shrink-0">
                <i className="ri-information-line text-xl text-white"></i>
              </div>
              <div>
                <p className="font-semibold text-blue-900 mb-1">How This Offer Works</p>
                <p className="text-sm text-blue-800">
                  This offer will be automatically displayed to pharmacies during plan selection and
                  payment. The discount will be applied only if the offer is active, the selected plan
                  matches, and the current date falls within the validity period.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-8 py-4 flex justify-end gap-3 rounded-b-xl border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
