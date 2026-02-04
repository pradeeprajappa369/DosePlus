interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  offerName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  offerName,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-5 flex items-center gap-4 rounded-t-xl">
          <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full flex-shrink-0">
            <i className="ri-error-warning-line text-2xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold">Delete Offer</h2>
            <p className="text-red-100 text-sm mt-1">This action cannot be undone</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete the offer{' '}
            <span className="font-bold text-gray-900">"{offerName}"</span>?
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <i className="ri-alert-line text-red-600 text-xl flex-shrink-0 mt-0.5"></i>
              <div>
                <p className="text-sm text-red-800 font-semibold mb-1">Warning</p>
                <p className="text-sm text-red-700">
                  Deleting this offer will permanently remove it from the system. Pharmacies will no
                  longer see this offer during plan selection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-xl border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Delete Offer
          </button>
        </div>
      </div>
    </div>
  );
}
