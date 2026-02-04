
import React from 'react';

interface ViewOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: {
    id?: string | number;
    status?: string;
    createdAt?: string | Date;
    name?: string;
    description?: string;
    bannerText?: string;
    type?: string;
    discountValue?: number;
    applicableTo?: string;
    validFrom?: string | Date;
    validTo?: string | Date;
    products?: string[];
  };
}

/**
 * A modal that displays detailed information about an offer.
 * The component is defensive – it validates the required fields before
 * accessing them and falls back to sensible defaults to avoid runtime errors.
 */
const ViewOfferModal: React.FC<ViewOfferModalProps> = ({
  isOpen,
  onClose,
  offer,
}) => {
  // Guard: do not render anything if the modal is closed
  if (!isOpen) return null;

  /**
   * Returns Tailwind colour classes based on the offer status.
   * Handles unexpected status values gracefully.
   */
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'Expired':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Helper to safely format dates; returns an empty string if invalid.
  const formatDate = (date?: string | Date) => {
    if (!date) return '';
    const d = new Date(date);
    return isNaN(d.getTime())
      ? ''
      : d.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Offer Details</h2>
            <p className="text-sm text-gray-600 mt-1">{offer.id ?? ''}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <i className="ri-close-line text-xl text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                offer.status,
              )}`}
            >
              {offer.status ?? 'Unknown'}
            </span>
            <span className="text-sm text-gray-500">
              Created: {formatDate(offer.createdAt)}
            </span>
          </div>

          {/* Offer Name */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{offer.name ?? ''}</h3>
            <p className="text-gray-600 mt-2">{offer.description ?? ''}</p>
          </div>

          {/* Banner Preview */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="ri-price-tag-3-fill text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Banner Preview</p>
                <p className="font-bold text-lg">{offer.bannerText ?? ''}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Offer Type</p>
              <p className="text-lg font-semibold text-gray-900">{offer.type ?? ''}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Discount Value</p>
              <p className="text-lg font-semibold text-teal-600">
                {offer.type === 'Percentage'
                  ? `${offer.discountValue}%`
                  : offer.type === 'Flat'
                  ? `₹${offer.discountValue}`
                  : 'BOGO'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Applicable To</p>
              <p className="text-lg font-semibold text-gray-900">{offer.applicableTo ?? ''}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Validity Period</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(offer.validFrom)}
              </p>
              <p className="text-xs text-gray-600">
                to {formatDate(offer.validTo)}
              </p>
            </div>
          </div>

          {/* Products List */}
          {offer.products && offer.products.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Applicable Products
              </h4>
              <div className="flex flex-wrap gap-2">
                {offer.products.map((product, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOfferModal;
