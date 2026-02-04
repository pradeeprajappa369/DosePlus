import { useState, useMemo } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import CustomerSummaryCards from './components/CustomerSummaryCards';
import CustomersTable from './components/CustomersTable';
import AddCustomerModal from './components/AddCustomerModal';
import CustomerProfileModal from './components/CustomerProfileModal';
import { customersData } from '../../mocks/customersData';

interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  totalOrders: number;
  totalSpend: number;
  lastPurchaseDate: string;
  joinDate: string;
  lifetimeValue: number;
  purchaseHistory: Array<{
    invoiceId: string;
    date: string;
    amount: number;
    items: number;
    status: string;
  }>;
  notes: string;
}

export default function CustomersPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(customersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Calculate stats
  const stats = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const newCustomers = customers.filter(customer => {
      const joinDate = new Date(customer.joinDate);
      return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
    }).length;

    const repeatCustomers = customers.filter(customer => customer.totalOrders > 1).length;
    const totalSales = customers.reduce((sum, customer) => sum + customer.totalSpend, 0);

    return {
      totalCustomers: customers.length,
      newCustomers,
      repeatCustomers,
      totalSales
    };
  }, [customers]);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const searchLower = searchTerm.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.mobile.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchLower)
      );
    });
  }, [customers, searchTerm]);

  const handleAddCustomer = (newCustomer: { name: string; mobile: string; email: string }) => {
    const customer: Customer = {
      id: `CUST${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomer.name,
      mobile: newCustomer.mobile,
      email: newCustomer.email,
      totalOrders: 0,
      totalSpend: 0,
      lastPurchaseDate: new Date().toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0],
      lifetimeValue: 0,
      purchaseHistory: [],
      notes: ''
    };
    setCustomers([customer, ...customers]);
  };

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <Header />

      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-8`}>
        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Customers</h1>
            <p className="text-sm text-gray-600">Manage pharmacy customers and purchase history</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            <i className="ri-user-add-line text-lg"></i>
            Add Customer
          </button>
        </div>

        {/* Summary Cards */}
        <CustomerSummaryCards stats={stats} />

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or mobile number..."
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Customers Table */}
        <CustomersTable customers={filteredCustomers} onViewProfile={handleViewProfile} />
      </main>

      {/* Modals */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCustomer}
      />

      <CustomerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
      />
    </div>
  );
}
