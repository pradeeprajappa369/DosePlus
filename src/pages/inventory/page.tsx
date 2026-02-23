import { useState, useMemo, useEffect } from "react";
import Sidebar from "../home/components/Sidebar";
import Header from "../home/components/Header";
import InventoryTable from "./components/InventoryTable";
import InventoryFilters from "./components/InventoryFilters";
import AddStockModal from "../home/components/AddStockModal";
import { useSyncQueryParams } from "@/utils/useSyncQueryParams";
import { SearchProductsApi } from "@/API/authAPI's";

interface InventorySummary {
  totalProducts: number;
  totalValue: number;
  lowStock: number;
  expiringSoon: number;
}

export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockStatusFilter, setStockStatusFilter] = useState("all");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [summary, setSummary] = useState<InventorySummary | null>(null);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useSyncQueryParams(
    {
      search: searchTerm,
      category: categoryFilter,
      status: statusFilter,
      stock: stockStatusFilter,
      page,
      limit,
    },
    {
      search: setSearchTerm,
      category: setCategoryFilter,
      status: setStatusFilter,
      stock: setStockStatusFilter,
      page: (v) => setPage(Number(v) || 1),
      limit: (v) => setLimit(Number(v) || 10),
    }
  );



  useEffect(() => {
    setPage(1);
  }, [searchTerm, categoryFilter, statusFilter, stockStatusFilter]);

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };
  

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await SearchProductsApi({
          search: searchTerm,
          category: categoryFilter,
          status: statusFilter,
          stock: statusFilter,
          page,
          limit,
        });

        const response = res.data;

        const rawProducts = Array.isArray(response.data) ? response.data : [];
        const rawSummary = response.summary || {};

        setSummary({
          totalProducts: rawSummary.total_products || 0,
          totalValue: rawSummary.total_stock_value || 0,
          lowStock: rawSummary.low_stock_items || 0,
          expiringSoon: rawSummary.expiring_soon_items || 0,
        });

        const formatStatus = (status: string) => {
          switch (status) {
            case "in_stock":
              return "In Stock";
            case "low_stock":
              return "Low Stock";
            case "out_of_stock":
              return "Out of Stock";
            case "expired":
              return "Expired";
            case "expiring_soon":
              return "Expiring Soon";
            default:
              return "In Stock";
          }
        };

        // Map backend fields → frontend expected fields
        const formattedProducts = rawProducts.map((item: any) => ({
          id: item.product_id,
          medicineName: item.product_name,
          batchNo: item.batch_number,
          category: item.category,
          stockQuantity: item.stock_quantity,
          expiryDate: item.expiry_date,
          price: item.selling_price,
          status: formatStatus(item.status),
        }));

        setProducts(formattedProducts);
        setTotalItems(response.total || 0);
        setTotalPages(Math.ceil((response.total || 0) / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalItems(0);
        setTotalPages(1);
      }
    };

    fetchProducts();
  }, [
    searchTerm,
    categoryFilter,
    statusFilter,
    stockStatusFilter,
    page,
    limit,
  ]);

  console.log(summary);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header isCollapsed={isSidebarCollapsed} />

        <main className="flex-1 overflow-y-auto mt-20">
          <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Inventory Management
                </h1>
                <p className="text-base text-gray-600">
                  Track and manage your pharmacy stock levels
                </p>
              </div>
              <button
                // onClick={() => setIsAddProductModalOpen(true)}
                onClick={() => setActiveModal("add-stock")}
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
                    <p className="text-2xl font-bold text-gray-900">
                    {summary?.totalProducts || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg">
                    <i className="ri-medicine-bottle-line text-teal-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Total Stock Value
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                    ₹{summary?.totalValue?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                    <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Low Stock Items
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                    {summary?.lowStock || 0}
                    </p>
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
                    <p className="text-2xl font-bold text-gray-900">
                    {summary?.expiringSoon || 0}
                    </p>
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
            />

            {/* Inventory Table */}

            <InventoryTable
              products={products}
              page={page}
              limit={limit}
              totalItems={totalItems}
              totalPages={totalPages}
              onPageChange={setPage}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </main>
      </div>

      <AddStockModal
        isOpen={activeModal === "add-stock"}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
