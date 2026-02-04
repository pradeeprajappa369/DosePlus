import { useState } from 'react';
import ManualEntryTab from './AddStockManualEntry';
import UploadBillTab from './AddStockUploadBill';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStockModal({ isOpen, onClose }: AddStockModalProps) {
  const [selectedOption, setSelectedOption] = useState<'manual' | 'upload' | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setSelectedOption(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Add Products to Inventory</h2>
              <p className="text-sm text-teal-50">
                {selectedOption === null && 'Choose how you want to add medicines'}
                {selectedOption === 'manual' && 'Manually add medicines to inventory'}
                {selectedOption === 'upload' && 'Upload bill to automatically extract products'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-white text-xl"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {selectedOption === null ? (
            // Option Selection Screen
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  How would you like to add products?
                </h3>
                <p className="text-sm text-gray-600">
                  Choose the method that works best for you
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Manual Entry Option */}
                <button
                  onClick={() => setSelectedOption('manual')}
                  className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer text-left"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-teal-50 transition-colors">
                      <i className="ri-edit-line text-4xl text-gray-600 group-hover:text-teal-500 transition-colors"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Manual Entry
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Manually add medicines one by one with complete details
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <i className="ri-time-line"></i>
                      <span>Best for single products</span>
                    </div>
                  </div>
                </button>

                {/* Upload Bill Option - Recommended */}
                <button
                  onClick={() => setSelectedOption('upload')}
                  className="group relative bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-8 hover:border-orange-400 hover:shadow-xl transition-all cursor-pointer text-left"
                >
                  {/* Recommended Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
                      <i className="ri-star-fill"></i>
                      Recommended
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                      <i className="ri-file-upload-line text-4xl text-orange-600 group-hover:text-orange-700 transition-colors"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Upload Purchase Bill
                    </h4>
                    <p className="text-sm text-gray-700 mb-4 font-medium">
                      Upload wholesale bill and auto-detect medicines instantly
                    </p>
                    <div className="flex items-center gap-2 text-xs text-orange-700 font-medium">
                      <i className="ri-flashlight-fill"></i>
                      <span>Fast & Accurate</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Info Banner */}
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-lightbulb-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">
                      Pro Tip
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Upload your wholesale purchase bill to save time. Our system will automatically extract medicine names, batch numbers, quantities, prices, and expiry dates for quick review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedOption === 'manual' ? (
            <div>
              {/* Back Button */}
              <div className="px-8 pt-6 pb-4 border-b border-gray-200">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-arrow-left-line"></i>
                  Back to Options
                </button>
              </div>
              <ManualEntryTab onClose={onClose} />
            </div>
          ) : (
            <div>
              {/* Back Button */}
              <div className="px-8 pt-6 pb-4 border-b border-gray-200">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-arrow-left-line"></i>
                  Back to Options
                </button>
              </div>
              <UploadBillTab onClose={onClose} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
