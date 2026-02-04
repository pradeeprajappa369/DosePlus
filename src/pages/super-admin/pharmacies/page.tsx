import React, { useState } from 'react';
import SuperAdminHeader from '../components/SuperAdminHeader';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import { pharmaciesData } from '../../../mocks/pharmaciesData';
import PharmacyDetailsModal from './components/PharmacyDetailsModal';
import ChangePlanModal from './components/ChangePlanModal';
import PaymentControlModal from './components/PaymentControlModal';

export default function PharmaciesPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [pharmacies, setPharmacies] = useState(pharmaciesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [paymentControlModal, setPaymentControlModal] = useState<{ isOpen: boolean; pharmacy: any }>({
    isOpen: false,
    pharmacy: null,
  });

  // Filter pharmacies
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'All' || pharmacy.currentPlan === filterPlan;
    const matchesStatus = filterStatus === 'All' || pharmacy.accountStatus === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Toggle functions
  const togglePayment = (pharmacyId: string) => {
    setPharmacies(prev => prev.map(p => 
      p.id === pharmacyId 
        ? { ...p, paymentStatus: p.paymentStatus === 'Disabled' ? 'Paid' : 'Disabled' }
        : p
    ));
  };

  const toggleOnlineStore = (pharmacyId: string) => {
    setPharmacies(prev => prev.map(p => 
      p.id === pharmacyId 
        ? { ...p, onlineStore: !p.onlineStore }
        : p
    ));
  };

  const toggleAccountStatus = (pharmacyId: string) => {
    setPharmacies(prev => prev.map(p => 
      p.id === pharmacyId 
        ? { ...p, accountStatus: p.accountStatus === 'Active' ? 'Suspended' : 'Active' }
        : p
    ));
  };

  const handleChangePlan = (pharmacyId: string, newPlan: string) => {
    setPharmacies(prev => prev.map(p => 
      p.id === pharmacyId 
        ? { ...p, currentPlan: newPlan }
        : p
    ));
  };

  const handleViewDetails = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy);
    setIsDetailsModalOpen(true);
    setOpenDropdown(null);
  };

  const handleChangePlanClick = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy);
    setIsChangePlanModalOpen(true);
    setOpenDropdown(null);
  };

  const handleLoginAsPharmacy = (pharmacy: any) => {
    alert(`Mock: Logging in as ${pharmacy.pharmacyName}...`);
    setOpenDropdown(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminHeader onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <SuperAdminSidebar isCollapsed={isSidebarCollapsed} />

      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-8`}>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pharmacy Accounts</h1>
          <p className="text-gray-600">Manage all pharmacy accounts, subscriptions, and access controls</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                <input
                  type="text"
                  placeholder="Search by pharmacy name, owner, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Plan Filter */}
            <div>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="All">All Plans</option>
                <option value="Trial">Trial</option>
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Pharmacy Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Owner Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">City</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Current Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Subscription</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Online Store</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Account</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPharmacies.map((pharmacy) => (
                  <tr key={pharmacy.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{pharmacy.pharmacyName}</div>
                      <div className="text-sm text-gray-500">{pharmacy.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pharmacy.ownerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pharmacy.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pharmacy.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-teal-600">{pharmacy.currentPlan}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        pharmacy.subscriptionStatus === 'Active' ? 'bg-green-100 text-green-700' :
                        pharmacy.subscriptionStatus === 'Trial' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {pharmacy.subscriptionStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => togglePayment(pharmacy.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          pharmacy.paymentStatus === 'Disabled' ? 'bg-red-500' : 'bg-green-500'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pharmacy.paymentStatus === 'Disabled' ? 'translate-x-1' : 'translate-x-6'
                        }`} />
                      </button>
                      <div className="text-xs text-gray-600 mt-1">
                        {pharmacy.paymentStatus === 'Disabled' ? 'Disabled' : 'Enabled'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleOnlineStore(pharmacy.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          pharmacy.onlineStore ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pharmacy.onlineStore ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                      <div className="text-xs text-gray-600 mt-1">
                        {pharmacy.onlineStore ? 'Enabled' : 'Disabled'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleAccountStatus(pharmacy.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          pharmacy.accountStatus === 'Active' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pharmacy.accountStatus === 'Active' ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                      <div className="text-xs text-gray-600 mt-1">
                        {pharmacy.accountStatus}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedPharmacy(pharmacy);
                            setIsDetailsModalOpen(true);
                          }}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <i className="ri-eye-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPharmacy(pharmacy);
                            setIsChangePlanModalOpen(true);
                          }}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Change Plan"
                        >
                          <i className="ri-refresh-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => setPaymentControlModal({ isOpen: true, pharmacy })}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Payment Control"
                        >
                          <i className="ri-bank-card-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPharmacies.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">No pharmacies found</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Pharmacies</p>
                <p className="text-2xl font-bold text-gray-900">{pharmacies.length}</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg">
                <i className="ri-store-line text-2xl text-teal-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Accounts</p>
                <p className="text-2xl font-bold text-green-600">
                  {pharmacies.filter(p => p.accountStatus === 'Active').length}
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
                <p className="text-sm text-gray-600 mb-1">Online Stores</p>
                <p className="text-2xl font-bold text-blue-600">
                  {pharmacies.filter(p => p.onlineStore).length}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                <i className="ri-shopping-cart-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {pharmacies.filter(p => p.accountStatus === 'Suspended').length}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg">
                <i className="ri-error-warning-line text-2xl text-red-600"></i>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <PharmacyDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        pharmacy={selectedPharmacy}
      />

      <ChangePlanModal
        isOpen={isChangePlanModalOpen}
        onClose={() => setIsChangePlanModalOpen(false)}
        pharmacy={selectedPharmacy}
        onSave={handleChangePlan}
      />

      <PaymentControlModal
        isOpen={paymentControlModal.isOpen}
        onClose={() => setPaymentControlModal({ isOpen: false, pharmacy: null })}
        pharmacy={paymentControlModal.pharmacy}
      />
    </div>
  );
}