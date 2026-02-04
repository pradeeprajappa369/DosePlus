import { useState } from 'react';
import ManualEntryForm from './ManualEntryForm';
import UploadBillForm from './UploadBillForm';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [activeTab, setActiveTab] = useState<'manual' | 'upload'>('manual');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Add Products</h2>
              <p className="text-sm text-teal-50">
                {activeTab === 'manual' 
                  ? 'Manually add medicines to inventory' 
                  : 'Upload invoice to automatically extract products'}
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

        {/* Tab Switcher */}
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <i className="ri-edit-line mr-2"></i>
              Manual Entry
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <i className="ri-upload-cloud-line mr-2"></i>
              Upload Bill
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {activeTab === 'manual' ? (
            <ManualEntryForm onClose={onClose} />
          ) : (
            <UploadBillForm onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
