import { InventoryItem } from "./InventoryTable";

interface DeleteInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: InventoryItem | null;
  loading?: boolean;
}

export default function DeleteInventoryModal({
  isOpen,
  onClose,
  onConfirm,
  product,
  loading = false,
}: DeleteInventoryModalProps) {
  if (!isOpen || !product) return null;

  const initials = product.medicineName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        
        {/* Header */}
        <div className="px-6 py-5 text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-delete-bin-line text-2xl text-red-600"></i>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Delete Medicine
          </h2>

          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-900">
              {product.medicineName}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Product Info */}
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-teal-600">
                {initials}
              </span>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                {product.medicineName}
              </p>
              <p className="text-xs text-gray-500">
                Batch No: {product.batchNo}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Medicine"}
          </button>
        </div>
      </div>
    </div>
  );
}
