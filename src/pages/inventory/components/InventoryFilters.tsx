interface InventoryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onAddProduct?: () => void;
}
import InputField from "@/CommonComponents/InputField";
import { PHARMACY_CATEGORIES } from "../../../mocks/pharmacyCategories";

export const STOCK_STATUS = [
  { value: "all", label: "All Status" },
  { value: "in_stock", label: "In Stock" },
  { value: "low_stock", label: "Low Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
  { value: "expired", label: "Expired" },
  { value: "expiring_soon", label: "Expiring Soon" },
];

export default function InventoryFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  onAddProduct,
}: InventoryFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[280px]">
          <div className="relative">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
            <input
              type="text"
              placeholder="Search by medicine name or batch number..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="min-w-[180px]">
          <InputField
            label=""
            placeholder="Select Category"
            value={categoryFilter}
            onChange={onCategoryChange}
            options={[
              { value: "all", label: "All Categories" },
              ...PHARMACY_CATEGORIES,
            ]}
          />
        </div>

        {/* Status Filter */}
        <div className="min-w-[180px]">
          <InputField
            label=""
            placeholder="All Status"
            value={statusFilter}
            onChange={onStatusChange}
            options={STOCK_STATUS}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 ml-auto">
          <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2">
            <i className="ri-upload-2-line text-base"></i>
            Import Stock
          </button>
          <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2">
            <i className="ri-download-2-line text-base"></i>
            Export CSV
          </button>
          {/* <button 
            onClick={onAddProduct}
            className="px-5 py-2.5 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-sm"
          >
            <i className="ri-add-line text-base"></i>
            Add New Medicine
          </button> */}
        </div>
      </div>
    </div>
  );
}
