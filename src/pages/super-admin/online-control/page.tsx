import { useState } from 'react';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import SuperAdminHeader from '../components/SuperAdminHeader';
import { pharmaciesData } from '../../../mocks/pharmaciesData';

export default function OnlineStoreControl() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [pharmacies, setPharmacies] = useState(pharmaciesData);
  const [selectedPharmacy, setSelectedPharmacy] = useState<typeof pharmaciesData[0] | null>(null);
  const [showProductsModal, setShowProductsModal] = useState(false);

  const handleToggleOnlineStore = (pharmacyId: string) => {
    setPharmacies(prev =>
      prev.map(pharmacy => {
        if (pharmacy.id === pharmacyId) {
          return {
            ...pharmacy,
            onlineStore: !pharmacy.onlineStore,
          };
        }
        return pharmacy;
      })
    );
  };

  const handleOverridePayment = (pharmacyId: string) => {
    setPharmacies(prev =>
      prev.map(pharmacy => {
        if (pharmacy.id === pharmacyId) {
          return {
            ...pharmacy,
            onlineStore: true,
          };
        }
        return pharmacy;
      })
    );
  };

  const handleViewProducts = (pharmacy: typeof pharmaciesData[0]) => {
    setSelectedPharmacy(pharmacy);
    setShowProductsModal(true);
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
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Online Store Control</h2>
            <p className="text-sm text-gray-600">Manage online store access for all pharmacies</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-store-3-line text-green-600 text-xl"></i>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {pharmacies.filter(p => p.onlineStore).length}
              </p>
              <p className="text-sm text-gray-600">Active Online Stores</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-shopping-bag-3-line text-orange-600 text-xl"></i>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {pharmacies.filter(p => p.onlineStore && p.paymentStatus === 'Paid').length}
              </p>
              <p className="text-sm text-gray-600">Stores with Orders</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-close-circle-line text-red-600 text-xl"></i>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {pharmacies.filter(p => !p.onlineStore).length}
              </p>
              <p className="text-sm text-gray-600">Stores Disabled</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-blue-600 text-xl"></i>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                ₹{pharmacies.filter(p => p.onlineStore).reduce((sum, p) => sum + (p.totalRevenue || 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Online Revenue</p>
            </div>
          </div>

          {/* Pharmacies Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Pharmacy Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Online Store
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pharmacies.map((pharmacy) => {
                    const isOnlineStoreActive = pharmacy.onlineStore;
                    const paymentStatus = pharmacy.paymentStatus.toLowerCase();
                    const plan = pharmacy.currentPlan.toLowerCase();

                    return (
                      <tr key={pharmacy.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{pharmacy.pharmacyName}</p>
                            <p className="text-xs text-gray-500">{pharmacy.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            plan === 'enterprise'
                              ? 'bg-purple-100 text-purple-700'
                              : plan === 'professional'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {pharmacy.currentPlan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleOnlineStore(pharmacy.id)}
                              disabled={paymentStatus === 'disabled'}
                              className={`relative w-11 h-6 rounded-full transition-colors ${
                                paymentStatus === 'disabled'
                                  ? 'bg-gray-300 cursor-not-allowed'
                                  : isOnlineStoreActive
                                  ? 'bg-green-600 cursor-pointer'
                                  : 'bg-gray-300 cursor-pointer'
                              }`}
                            >
                              <span
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                  isOnlineStoreActive ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              ></span>
                            </button>
                            <span className={`text-xs font-medium ${
                              isOnlineStoreActive ? 'text-green-700' : 'text-gray-500'
                            }`}>
                              {isOnlineStoreActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : paymentStatus === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {pharmacy.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOverridePayment(pharmacy.id)}
                              disabled={isOnlineStoreActive || paymentStatus === 'disabled'}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                                isOnlineStoreActive || paymentStatus === 'disabled'
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer'
                              }`}
                            >
                              <i className="ri-vip-crown-line mr-1"></i>
                              Override
                            </button>
                            <button
                              onClick={() => handleViewProducts(pharmacy)}
                              className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-eye-line mr-1"></i>
                              View Products
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* View Products Modal */}
      {showProductsModal && selectedPharmacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedPharmacy.pharmacyName}</h3>
                  <p className="text-sm text-gray-600">Online Products Catalog</p>
                </div>
                <button
                  onClick={() => setShowProductsModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {selectedPharmacy.onlineStore ? (
                <div className="space-y-4">
                  {/* Mock Products */}
                  {[
                    { name: 'Paracetamol 500mg', category: 'Pain Relief', price: 45, stock: 250 },
                    { name: 'Amoxicillin 250mg', category: 'Antibiotics', price: 120, stock: 180 },
                    { name: 'Cetirizine 10mg', category: 'Allergy', price: 35, stock: 320 },
                    { name: 'Omeprazole 20mg', category: 'Digestive', price: 85, stock: 150 },
                    { name: 'Metformin 500mg', category: 'Diabetes', price: 95, stock: 200 },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <i className="ri-medicine-bottle-line text-orange-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
                        <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-store-3-line text-gray-400 text-3xl"></i>
                  </div>
                  <p className="text-gray-600 mb-2">Online Store Not Active</p>
                  <p className="text-sm text-gray-500">Enable online store to view products</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
