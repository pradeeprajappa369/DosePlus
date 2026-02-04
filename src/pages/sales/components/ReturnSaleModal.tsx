interface ReturnSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  saleId: string;
}

export default function ReturnSaleModal({ isOpen, onClose, onConfirm, saleId }: ReturnSaleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-arrow-go-back-line text-3xl text-red-600"></i>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Return Sale</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Are you sure you want to return this sale? This action will mark the sale as returned and adjust the totals.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 text-center">Invoice Number</div>
            <div className="text-lg font-bold text-gray-900 text-center">{saleId}</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}