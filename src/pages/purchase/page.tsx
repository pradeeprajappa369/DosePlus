import { useState, useEffect } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import PurchaseSummaryCards from './components/PurchaseSummaryCards';
import PurchaseFilters from './components/PurchaseFilters';
import PurchaseTable from './components/PurchaseTable';
import ViewPurchaseModal from './components/ViewPurchaseModal';
import NewPurchaseFlow from './components/NewPurchaseFlow';
import { purchaseData } from '../../mocks/purchaseData';

export default function PurchasePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [purchases, setPurchases] = useState(purchaseData);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isNewPurchaseOpen, setIsNewPurchaseOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = 
      purchase.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.billNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPaymentStatus = 
      paymentStatusFilter === 'all' || purchase.paymentStatus === paymentStatusFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const purchaseDate = new Date(purchase.billDate);
      const today = new Date();
      
      switch (dateFilter) {
        case 'today':
          matchesDate = purchaseDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = purchaseDate >= weekAgo;
          break;
        case 'month':
          matchesDate = 
            purchaseDate.getMonth() === today.getMonth() &&
            purchaseDate.getFullYear() === today.getFullYear();
          break;
        case 'year':
          matchesDate = purchaseDate.getFullYear() === today.getFullYear();
          break;
      }
    }

    return matchesSearch && matchesPaymentStatus && matchesDate;
  });

  const handleView = (purchase: any) => {
    setSelectedPurchase(purchase);
    setIsViewModalOpen(true);
  };

  const handleEdit = (purchase: any) => {
    console.log('Edit purchase:', purchase);
  };

  const handleNewPurchase = (purchaseData: any) => {
    setPurchases([purchaseData, ...purchases]);
    setIsNewPurchaseOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <Header 
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-8`}>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Purchase</h1>
              <p className="text-sm text-gray-600 mt-1">Manage medicine purchases from wholesalers</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsNewPurchaseOpen(true)}
                className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>New Purchase
              </button>
              <button
                onClick={() => setIsNewPurchaseOpen(true)}
                className="px-6 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-upload-cloud-line mr-2"></i>Upload Purchase Bill
              </button>
            </div>
          </div>
        </div>

        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-xl text-green-600"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-900">Purchase Added Successfully!</p>
              <p className="text-xs text-green-700">Stock has been updated and purchase record added.</p>
            </div>
          </div>
        )}

        <PurchaseSummaryCards purchases={purchases} />

        <PurchaseFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          paymentStatusFilter={paymentStatusFilter}
          setPaymentStatusFilter={setPaymentStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <PurchaseTable
          purchases={filteredPurchases}
          onView={handleView}
          onEdit={handleEdit}
        />
      </main>

      <ViewPurchaseModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        purchase={selectedPurchase}
      />

      <NewPurchaseFlow
        isOpen={isNewPurchaseOpen}
        onClose={() => setIsNewPurchaseOpen(false)}
        onSubmit={handleNewPurchase}
      />
    </div>
  );
}
