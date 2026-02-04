import { useState, useEffect } from 'react';
import SuperAdminHeader from '../components/SuperAdminHeader';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import CreateEditOfferModal from './components/CreateEditOfferModal';
import ViewOfferModal from './components/ViewOfferModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

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

export default function OffersControlPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlan, setFilterPlan] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load offers from localStorage
  useEffect(() => {
    const storedOffers = localStorage.getItem('superAdminOffers');
    if (storedOffers) {
      setOffers(JSON.parse(storedOffers));
    } else {
      // Initialize with mock data
      const mockOffers: Offer[] = [
        {
          id: 'OFF001',
          name: 'New Year Special',
          description: 'Get 20% off on all Professional plans',
          type: 'PERCENTAGE',
          value: 20,
          applicablePlans: ['Professional'],
          status: 'ACTIVE',
          validFrom: '2024-01-01',
          validTo: '2024-01-31',
          createdAt: '2023-12-15',
        },
        {
          id: 'OFF002',
          name: 'Enterprise Launch Offer',
          description: 'Flat ₹5000 discount on Enterprise plan',
          type: 'FLAT',
          value: 5000,
          applicablePlans: ['Enterprise'],
          status: 'ACTIVE',
          validFrom: '2024-01-01',
          validTo: '2024-03-31',
          createdAt: '2023-12-20',
        },
        {
          id: 'OFF003',
          name: 'Basic Plan Starter',
          description: '15% off for first-time subscribers',
          type: 'PERCENTAGE',
          value: 15,
          applicablePlans: ['Basic'],
          status: 'INACTIVE',
          validFrom: '2023-11-01',
          validTo: '2023-12-31',
          createdAt: '2023-10-25',
        },
        {
          id: 'OFF004',
          name: 'All Plans Mega Sale',
          description: 'Flat ₹1000 off on all subscription plans',
          type: 'FLAT',
          value: 1000,
          applicablePlans: ['Basic', 'Professional', 'Enterprise'],
          status: 'ACTIVE',
          validFrom: '2024-01-15',
          validTo: '2024-02-15',
          createdAt: '2024-01-10',
        },
      ];
      setOffers(mockOffers);
      localStorage.setItem('superAdminOffers', JSON.stringify(mockOffers));
    }
  }, []);

  // Save offers to localStorage
  const saveOffers = (updatedOffers: Offer[]) => {
    setOffers(updatedOffers);
    localStorage.setItem('superAdminOffers', JSON.stringify(updatedOffers));
  };

  // Filter offers
  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || offer.status === filterStatus;
    const matchesPlan = filterPlan === 'All' || offer.applicablePlans.includes(filterPlan);
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Show toast
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle create offer
  const handleCreateOffer = (offerData: Omit<Offer, 'id' | 'createdAt'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: `OFF${String(offers.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updatedOffers = [...offers, newOffer];
    saveOffers(updatedOffers);
    setIsCreateModalOpen(false);
    showToast('Offer created successfully', 'success');
  };

  // Handle edit offer
  const handleEditOffer = (offerData: Omit<Offer, 'id' | 'createdAt'>) => {
    if (!selectedOffer) return;
    const updatedOffers = offers.map(offer =>
      offer.id === selectedOffer.id
        ? { ...offer, ...offerData }
        : offer
    );
    saveOffers(updatedOffers);
    setIsCreateModalOpen(false);
    setEditMode(false);
    setSelectedOffer(null);
    showToast('Offer updated successfully', 'success');
  };

  // Handle toggle status
  const handleToggleStatus = (offerId: string) => {
    const updatedOffers = offers.map(offer =>
      offer.id === offerId
        ? { ...offer, status: offer.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' as 'ACTIVE' | 'INACTIVE' }
        : offer
    );
    saveOffers(updatedOffers);
    const offer = offers.find(o => o.id === offerId);
    showToast(
      `Offer ${offer?.status === 'ACTIVE' ? 'disabled' : 'enabled'} successfully`,
      'success'
    );
  };

  // Handle delete offer
  const handleDeleteOffer = () => {
    if (!selectedOffer) return;
    const updatedOffers = offers.filter(offer => offer.id !== selectedOffer.id);
    saveOffers(updatedOffers);
    setIsDeleteModalOpen(false);
    setSelectedOffer(null);
    showToast('Offer deleted successfully', 'success');
  };

  // Handle view offer
  const handleViewOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsViewModalOpen(true);
  };

  // Handle edit click
  const handleEditClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setEditMode(true);
    setIsCreateModalOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsDeleteModalOpen(true);
  };

  // Check if offer is valid
  const isOfferValid = (offer: Offer) => {
    const today = new Date().toISOString().split('T')[0];
    return offer.validFrom <= today && offer.validTo >= today;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <SuperAdminHeader isSidebarCollapsed={isSidebarCollapsed} />

      <main
        className={`transition-all duration-300 pt-20 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Offers & Promotions</h1>
              <p className="text-gray-600">Manage global and pharmacy-level offers</p>
            </div>
            <button
              onClick={() => {
                setEditMode(false);
                setSelectedOffer(null);
                setIsCreateModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line text-xl"></i>
              Create New Offer
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Offers</p>
                  <p className="text-2xl font-bold text-gray-900">{offers.length}</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg">
                  <i className="ri-megaphone-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Offers</p>
                  <p className="text-2xl font-bold text-green-600">
                    {offers.filter(o => o.status === 'ACTIVE').length}
                  </p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                  <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valid Today</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {offers.filter(o => o.status === 'ACTIVE' && isOfferValid(o)).length}
                  </p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                  <i className="ri-calendar-check-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Inactive Offers</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {offers.filter(o => o.status === 'INACTIVE').length}
                  </p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <i className="ri-close-circle-line text-2xl text-gray-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <div className="relative">
                  <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                  <input
                    type="text"
                    placeholder="Search offers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              {/* Plan Filter */}
              <div>
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                >
                  <option value="All">All Plans</option>
                  <option value="Basic">Basic</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          {/* Offers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {filteredOffers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Offer Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Discount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Applicable Plans
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Valid Period
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOffers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{offer.name}</p>
                            <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            offer.type === 'PERCENTAGE'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {offer.type === 'PERCENTAGE' ? (
                              <i className="ri-percent-line"></i>
                            ) : (
                              <i className="ri-money-rupee-circle-line"></i>
                            )}
                            {offer.type === 'PERCENTAGE' ? 'Percentage' : 'Flat Amount'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-lg font-bold text-teal-600">
                            {offer.type === 'PERCENTAGE' ? `${offer.value}%` : `₹${offer.value}`}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {offer.applicablePlans.map((plan, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                              >
                                {plan}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <p className="text-gray-900 font-medium">
                              {new Date(offer.validFrom).toLocaleDateString('en-IN')}
                            </p>
                            <p className="text-gray-500">to</p>
                            <p className="text-gray-900 font-medium">
                              {new Date(offer.validTo).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(offer.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                              offer.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                offer.status === 'ACTIVE' ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <div className="text-xs text-gray-600 mt-1">
                            {offer.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewOffer(offer)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                              title="View Details"
                            >
                              <i className="ri-eye-line text-lg"></i>
                            </button>
                            <button
                              onClick={() => handleEditClick(offer)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit Offer"
                            >
                              <i className="ri-edit-line text-lg"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(offer)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Offer"
                            >
                              <i className="ri-delete-bin-line text-lg"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                  <i className="ri-megaphone-line text-6xl text-gray-300"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No offers created yet</h3>
                <p className="text-gray-500 mb-6">Create your first offer to start promoting plans</p>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setSelectedOffer(null);
                    setIsCreateModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-add-line text-xl"></i>
                  Create New Offer
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateEditOfferModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditMode(false);
          setSelectedOffer(null);
        }}
        onSave={editMode ? handleEditOffer : handleCreateOffer}
        offer={editMode ? selectedOffer : null}
        editMode={editMode}
      />

      <ViewOfferModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedOffer(null);
        }}
        offer={selectedOffer}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedOffer(null);
        }}
        onConfirm={handleDeleteOffer}
        offerName={selectedOffer?.name || ''}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <i
              className={`${
                toast.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'
              } text-2xl`}
            ></i>
            <p className="font-semibold">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
