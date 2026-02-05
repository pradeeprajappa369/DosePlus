import React from "react";

export interface InventoryItem {
  id: string;
  medicineName: string;
  batchNo: string;
  category: string;
  stockQuantity: number;
  expiryDate: string;
  price: number;
  status: "In Stock" | "Low Stock" | "Expired";
}

interface InventoryTableProps {
  products: InventoryItem[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (product: InventoryItem) => void;
  onDelete: (productId: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  page,
  limit,
  totalItems,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const [viewProduct, setViewProduct] = React.useState<InventoryItem | null>(
    null
  );

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Low Stock":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Expired":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock":
        return "ri-checkbox-circle-line";
      case "Low Stock":
        return "ri-error-warning-line";
      case "Expired":
        return "ri-close-circle-line";
      default:
        return "ri-information-line";
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const days = Math.floor(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days <= 30 && days > 0;
  };

  // 🔹 ADDED: pagination dots logic (isolated & safe)
  const getPageNumbers = () => {
    const pages: (number | "dots")[] = [];

    const delta = 2;
    const start = Math.max(2, page - delta);
    const end = Math.min(totalPages - 1, page + delta);

    pages.push(1);

    if (start > 2) pages.push("dots");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("dots");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {[
                "Medicine Name",
                "Batch No",
                "Category",
                "Stock",
                "Expiry",
                "Price",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products?.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 transition-colors ${
                  item.status === "Expired"
                    ? "bg-red-50/30"
                    : item.status === "Low Stock"
                    ? "bg-amber-50/30"
                    : ""
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                      <i className="ri-capsule-line text-teal-600 text-lg" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {item.medicineName}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                  {item.batchNo}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.category}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-semibold ${
                      item.stockQuantity < 50
                        ? "text-amber-600"
                        : "text-gray-800"
                    }`}
                  >
                    {item.stockQuantity}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">units</span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        item.status === "Expired"
                          ? "text-red-600 font-medium"
                          : isExpiringSoon(item.expiryDate)
                          ? "text-amber-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {item.expiryDate}
                    </span>
                    {isExpiringSoon(item.expiryDate) &&
                      item.status !== "Expired" && (
                        <i className="ri-alarm-warning-line text-amber-500 text-sm" />
                      )}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  ₹{item.price.toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyles(
                      item.status
                    )}`}
                  >
                    <i className={getStatusIcon(item.status)} />
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                    >
                      <i className="ri-edit-line text-gray-600 hover:text-teal-600" />
                    </button>
                    <button
                      onClick={() => setViewProduct(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                      <i className="ri-eye-line text-gray-600 group-hover:text-teal-600 text-base"></i>
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50"
                    >
                      <i className="ri-delete-bin-line text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {totalItems === 0 && (
        <div className="py-16 text-center">
          <i className="ri-inbox-line text-3xl text-gray-400 mb-2 block" />
          <p className="text-sm text-gray-500">No medicines found</p>
        </div>
      )}

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {(page - 1) * limit + 1}
            </span>{" "}
            –{" "}
            <span className="font-medium text-gray-800">
              {Math.min(page * limit, totalItems)}
            </span>{" "}
            of <span className="font-medium text-gray-800">{totalItems}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {getPageNumbers().map((p, i) =>
              p === "dots" ? (
                <span
                  key={`dots-${i}`}
                  className="px-2 text-gray-400 select-none"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`px-3 py-1.5 text-sm rounded-lg ${
                    page === p
                      ? "bg-teal-600 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            {/* View Product Modal */}
            {viewProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg mx-4">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Medicine Details
                    </h3>
                    <button
                      onClick={() => setViewProduct(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                    >
                      <i className="ri-close-line text-gray-600 text-lg" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center">
                        <i className="ri-capsule-line text-teal-600 text-2xl" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {viewProduct.medicineName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Batch No: {viewProduct.batchNo}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Category</p>
                        <p className="text-sm font-medium text-gray-900">
                          {viewProduct.category}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">
                          Stock Quantity
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {viewProduct.stockQuantity} units
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">
                          Expiry Date
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {viewProduct.expiryDate}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Price</p>
                        <p className="text-sm font-medium text-gray-900">
                          ₹{viewProduct.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 border">
                      <p className="text-sm text-gray-600 font-medium">
                        Status
                      </p>

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyles(
                          viewProduct.status
                        )}`}
                      >
                        <i className={getStatusIcon(viewProduct.status)} />
                        {viewProduct.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              disabled={page === totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
