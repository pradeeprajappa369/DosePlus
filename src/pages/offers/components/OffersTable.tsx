
import { useState } from 'react';
import { offersData } from '../../../mocks/offersData';
import EditOfferModal from './EditOfferModal';
import ViewOfferModal from './ViewOfferModal';

const OffersTable = () => {
  const [offers, setOffers] = useState(offersData);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Percentage':
        return 'ri-percent-line';
      case 'Flat':
        return 'ri-money-rupee-circle-line';
      case 'BOGO':
        return 'ri-gift-line';
      default:
        return 'ri-price-tag-3-line';
    }
  };

  const handleDisable = (offerId: string) => {
    setOffers(
      offers.map((offer) =>
        offer.id === offerId ? { ...offer, status: 'Expired' } : offer
      )
    );
  };

  const handleView = (offer: any) => {
    setSelectedOffer(offer);
    setIsViewModalOpen(true);
  };

  const handleEdit = (offer: any) => {
    setSelectedOffer(offer);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Offer Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applicable To
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Validity Period
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                        <i className="ri-price-tag-3-fill text-teal-600 text-lg"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{offer.name}</p>
                        <p className="text-xs text-gray-500">{offer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <i className={`${getTypeIcon(offer.type)} text-gray-600`}></i>
                      <span className="text-sm text-gray-700">{offer.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-teal-600">
                      {offer.type === 'Percentage'
                        ? `${offer.discountValue}%`
                        : offer.type === 'Flat'
                        ? `₹${offer.discountValue}`
                        : 'BOGO'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{offer.applicableTo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-700">
                        {new Date(offer.validFrom).toLocaleDateString('en-IN')}
                      </p>
                      <p className="text-gray-500 text-xs">
                        to {new Date(offer.validTo).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        offer.status
                      )}`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(offer)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        title="View"
                      >
                        <i className="ri-eye-line text-gray-600"></i>
                      </button>
                      <button
                        onClick={() => handleEdit(offer)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <i className="ri-edit-line text-blue-600"></i>
                      </button>
                      {offer.status === 'Active' && (
                        <button
                          onClick={() => handleDisable(offer.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Disable"
                        >
                          <i className="ri-close-circle-line text-red-600"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedOffer && (
        <>
          <ViewOfferModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            offer={selectedOffer}
          />
          <EditOfferModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            offer={selectedOffer}
          />
        </>
      )}
    </>
  );
};

export default OffersTable;
