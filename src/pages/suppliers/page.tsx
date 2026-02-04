import { useState, useMemo } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import SupplierSummaryCards from './components/SupplierSummaryCards';
import SuppliersTable from './components/SuppliersTable';
import AddSupplierModal from './components/AddSupplierModal';
import SupplierProfileModal from './components/SupplierProfileModal';
import { suppliersData } from '../../mocks/suppliersData';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  mobile: string;
  email: string;
  gstNumber: string;
  address: string;
  status: string;
  totalPurchases: number;
  pendingAmount: number;
  totalPaid: number;
  joinDate: string;
  purchaseHistory: Array<{
    billNo: string;
    date: string;
    amount: number;
    status: string;
    items: number;
  }>;
  paymentHistory: Array<{
    id: string;
    date: string;
    amount: number;
    mode: string;
    reference: string;
  }>;
}

export default function SuppliersPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>(suppliersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Calculate stats
  const stats = useMemo(() => {
    const activeSuppliers = suppliers.filter(s => s.status === 'Active').length;
    const totalPendingPayments = suppliers.reduce((sum, s) => sum + s.pendingAmount, 0);
    const totalPurchaseValue = suppliers.reduce((sum, s) => sum + s.totalPurchases, 0);

    return {
      totalSuppliers: suppliers.length,
      activeSuppliers,
      totalPendingPayments,
      totalPurchaseValue
    };
  }, [suppliers]);

  // Filter suppliers
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.mobile.includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || supplier.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [suppliers, searchTerm, statusFilter]);

  const handleAddSupplier = (newSupplier: Omit<Supplier, 'id' | 'totalPurchases' | 'pendingAmount' | 'totalPaid' | 'joinDate' | 'purchaseHistory' | 'paymentHistory'>) => {
    const supplier: Supplier = {
      ...newSupplier,
      id: `SUP-${String(suppliers.length + 1).padStart(3, '0')}`,
      totalPurchases: 0,
      pendingAmount: 0,
      totalPaid: 0,
      joinDate: new Date().toISOString().split('T')[0],
      purchaseHistory: [],
      paymentHistory: []
    };
    setSuppliers([supplier, ...suppliers]);
  };

  const handleEditSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(suppliers.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
  };

  const handleViewProfile = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsEditMode(false);
    setIsProfileModalOpen(true);
  };

  const handleEditClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  const handleRecordPayment = (supplierId: string, amount: number) => {
    setSuppliers(suppliers.map(s => {
      if (s.id === supplierId) {
        const newPayment = {
          id: `PAY-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          amount,
          mode: 'Bank Transfer',
          reference: `TXN${Date.now()}`
        };
        return {
          ...s,
          pendingAmount: Math.max(0, s.pendingAmount - amount),
          totalPaid: s.totalPaid + amount,
          paymentHistory: [newPayment, ...s.paymentHistory]
        };
      }
      return s;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <Header />

      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-8`}>
        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Suppliers</h1>
            <p className="text-sm text-gray-600">Manage medicine suppliers and wholesalers</p>
          </div>
          <button
            onClick={() => {
              setSelectedSupplier(null);
              setIsEditMode(false);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            <i className="ri-user-add-line text-lg"></i>
            Add Supplier
          </button>
        </div>

        {/* Summary Cards */}
        <SupplierSummaryCards stats={stats} />

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by supplier name or contact..."
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Suppliers Table */}
        <SuppliersTable 
          suppliers={filteredSuppliers} 
          onViewProfile={handleViewProfile}
          onEdit={handleEditClick}
        />
      </main>

      {/* Modals */}
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedSupplier(null);
          setIsEditMode(false);
        }}
        onAdd={handleAddSupplier}
        onEdit={handleEditSupplier}
        supplier={isEditMode ? selectedSupplier : null}
      />

      <SupplierProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedSupplier(null);
        }}
        supplier={selectedSupplier}
        onRecordPayment={handleRecordPayment}
      />
    </div>
  );
}
