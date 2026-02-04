
import { useState, useMemo } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import InventoryTable from './components/InventoryTable';
import InventoryFilters from './components/InventoryFilters';
// import AddProductModal from './components/AddProductModal';
import AddStockModal from '../home/components/AddStockModal';
import { inventoryData } from '../../mocks/inventoryData';
import { useSyncQueryParams } from '@/utils/useSyncQueryParams';

export default function InventoryPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all');
  // const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [products, setProducts] = useState(inventoryData);

  useSyncQueryParams(
    {
      search: searchTerm,
      category: categoryFilter,
      status: statusFilter,
      stock: stockStatusFilter
    },
    {
      search: setSearchTerm,
      category: setCategoryFilter,
      status: setStatusFilter,
      stock: setStockStatusFilter
    }
  );
  

  // Calculate statistics
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, item) => sum + (item.stockQuantity * item.price), 0);
    const lowStock = products.filter(item => item.status === 'Low Stock').length;
    const expiringSoon = products.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
    }).length;

    return { totalProducts, totalValue, lowStock, expiringSoon };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchesSearch = item.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesStockStatus = stockStatusFilter === 'all' || item.status === stockStatusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesStockStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter, stockStatusFilter]);

  const handleAddProduct = (productData: any) => {
    const newProduct = {
      id: `INV${String(products.length + 1).padStart(3, '0')}`,
      ...productData,
      status: productData.stockQuantity > 50 ? 'In Stock' : productData.stockQuantity > 10 ? 'Low Stock' : 'Expired'
    };
    setProducts([...products, newProduct]);
    setIsAddProductModalOpen(false);
  };

  const handleEditProduct = (product: any) => {
    // Handle edit product logic
    console.log('Edit product:', product);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
                <p className="text-base text-gray-600">Track and manage your pharmacy stock levels</p>
              </div>
              <button
                // onClick={() => setIsAddProductModalOpen(true)}
                onClick={() => setActiveModal('add-stock')}
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
              >
                <i className="ri-add-line text-lg"></i>
                Add Product
              </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg">
                    <i className="ri-medicine-bottle-line text-teal-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Stock Value</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                    <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Low Stock Items</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-lg">
                    <i className="ri-alert-line text-amber-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.expiringSoon}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg">
                    <i className="ri-calendar-close-line text-red-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <InventoryFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onAddProduct={() => setIsAddProductModalOpen(true)}
            />

            {/* Inventory Table */}
            <InventoryTable
              products={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {/* <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={handleAddProduct}
      /> */}
       <AddStockModal
isOpen={activeModal === 'add-stock'}
  onClose={() => setActiveModal(null)}
/>
    </div>
  );
}
