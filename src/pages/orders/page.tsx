
import { useState, useMemo } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import OrdersFilters from './components/OrdersFilters';
import OrdersTable from './components/OrdersTable';
import OrderDetailDrawer from './components/OrderDetailDrawer';
import { ordersData } from '../../mocks/ordersData';

interface Order {
  id: string;
  customerName: string;
  itemsCount: number;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  orderStatus: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  subtotal: number;
  tax: number;
  discount: number;
  timeline: Array<{
    status: string;
    date: string;
    completed: boolean;
  }>;
}

export default function OrdersPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPaymentStatus =
        paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter;
      
      const matchesOrderStatus =
        orderStatusFilter === 'all' || order.orderStatus === orderStatusFilter;

      return matchesSearch && matchesPaymentStatus && matchesOrderStatus;
    });
  }, [searchTerm, paymentStatusFilter, orderStatusFilter]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  // Calculate statistics
  const totalOrders = ordersData.length;
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.totalAmount, 0);
  const paidOrders = ordersData.filter(order => order.paymentStatus === 'Paid').length;
  const pendingOrders = ordersData.filter(order => order.orderStatus === 'New' || order.orderStatus === 'Confirmed').length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header isCollapsed={isSidebarCollapsed} />
        
        <main className="flex-1 overflow-y-auto mt-20">
          <div className="p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders &amp; Billing</h1>
              <p className="text-base text-gray-600">Manage customer orders and billing information</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg">
                    <i className="ri-shopping-cart-line text-teal-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                    <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Paid Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{paidOrders}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                    <i className="ri-check-double-line text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-lg">
                    <i className="ri-time-line text-amber-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <OrdersFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              orderTypeFilter={orderTypeFilter}
              onOrderTypeChange={setOrderTypeFilter}
              paymentStatusFilter={paymentStatusFilter}
              onPaymentStatusChange={setPaymentStatusFilter}
              orderStatusFilter={orderStatusFilter}
              onOrderStatusChange={setOrderStatusFilter}
            />

            {/* Orders Table */}
            <OrdersTable orders={filteredOrders} onViewOrder={handleViewOrder} />
          </div>
        </main>
      </div>

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
