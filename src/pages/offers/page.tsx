
import { useState } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import CreateOfferModal from './components/CreateOfferModal';
import EditOfferModal from './components/EditOfferModal';
import ViewOfferModal from './components/ViewOfferModal';
import PromotionCards from './components/PromotionCards';
import PromoBannerSlider from './components/PromoBannerSlider';
import OffersTable from './components/OffersTable';
import { offersData } from '../../mocks/offersData';

export default function OffersPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<typeof offersData[0] | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [offers, setOffers] = useState(offersData);

  const handleEdit = (offer: typeof offersData[0]) => {
    setSelectedOffer(offer);
    setIsEditModalOpen(true);
  };

  const handleView = (offer: typeof offersData[0]) => {
    setSelectedOffer(offer);
    setIsViewModalOpen(true);
  };

  const handleCreateSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Handler functions for OffersTable
  const handleViewOffer = (offer: typeof offersData[0]) => {
    setSelectedOffer(offer);
    setIsViewModalOpen(true);
  };

  const handleEditOffer = (offer: typeof offersData[0]) => {
    setSelectedOffer(offer);
    setIsEditModalOpen(true);
  };

  const handleDeleteOffer = (offerId: string) => {
    setOffers(offers.filter(offer => offer.id !== offerId));
  };

  const handleCreateOffer = (offerData: any) => {
    const newOffer = {
      id: `OFF${String(offers.length + 1).padStart(3, '0')}`,
      ...offerData,
      status: 'Active'
    };
    setOffers([newOffer, ...offers]);
    setIsCreateModalOpen(false);
    handleCreateSuccess();
  };

  const handleUpdateOffer = (updatedOffer: any) => {
    setOffers(offers.map(offer => 
      offer.id === updatedOffer.id ? updatedOffer : offer
    ));
    setIsEditModalOpen(false);
    setSelectedOffer(null);
  };

  // Filter and search logic
  const filteredOffers = offers.filter((offer) => {
    const matchesStatus = filterStatus === 'All' || offer.status === filterStatus;
    const matchesSearch = offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.bannerText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Separate offers by status
  const activeOffers = filteredOffers.filter(offer => offer.status === 'Active');
  const upcomingOffers = filteredOffers.filter(offer => offer.status === 'Scheduled');
  const expiredOffers = filteredOffers.filter(offer => offer.status === 'Expired');

  const allActiveCount = offers.filter(offer => offer.status === 'Active').length;
  const allUpcomingCount = offers.filter(offer => offer.status === 'Scheduled').length;
  const allExpiredCount = offers.filter(offer => offer.status === 'Expired').length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header isCollapsed={isSidebarCollapsed} />
        
        <main className="flex-1 overflow-y-auto mt-20">
          <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Offers &amp; Promotions</h1>
                <p className="text-base text-gray-600">Create and manage promotional campaigns</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
              >
                <i className="ri-add-line text-lg"></i>
                Create Offer
              </button>
            </div>

            {/* Promo Banner Slider */}
            <PromoBannerSlider offers={offers} />

            {/* Active Promotions */}
            <PromotionCards offers={filteredOffers} onEdit={handleEdit} onView={handleView} />

            {/* Offers Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">All Offers</h2>
              </div>
              <OffersTable
                offers={offers}
                onView={handleViewOffer}
                onEdit={handleEditOffer}
                onDelete={handleDeleteOffer}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <CreateOfferModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateOffer}
      />

      {selectedOffer && (
        <>
          <ViewOfferModal
            isOpen={isViewModalOpen}
            onClose={() => {
              setIsViewModalOpen(false);
              setSelectedOffer(null);
            }}
            offer={selectedOffer}
          />

          <EditOfferModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedOffer(null);
            }}
            offer={selectedOffer}
            onSubmit={handleUpdateOffer}
          />
        </>
      )}
    </div>
  );
}
