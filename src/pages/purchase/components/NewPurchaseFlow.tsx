import { useState } from 'react';
import ManualPurchaseEntry from './ManualPurchaseEntry';
import UploadPurchaseBill from './UploadPurchaseBill';

interface NewPurchaseFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (purchaseData: any) => void;
}

export default function NewPurchaseFlow({ isOpen, onClose, onSubmit }: NewPurchaseFlowProps) {
  const [selectedOption, setSelectedOption] = useState<'manual' | 'upload' | null>(null);

  if (!isOpen) return null;

  const handleBack = () => {
    setSelectedOption(null);
  };

  const handleSubmit = (data: any) => {
    onSubmit(data);
    setSelectedOption(null);
  };

  if (selectedOption === 'manual') {
    return <ManualPurchaseEntry onClose={onClose} onBack={handleBack} onSubmit={handleSubmit} />;
  }

  if (selectedOption === 'upload') {
    return <UploadPurchaseBill onClose={onClose} onBack={handleBack} onSubmit={handleSubmit} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">New Purchase</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-8">
          <p className="text-center text-gray-600 mb-8">Choose how you want to add purchase</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setSelectedOption('manual')}
              className="group p-8 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i className="ri-edit-line text-3xl text-gray-600 group-hover:text-teal-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Manual Entry</h3>
              <p className="text-sm text-gray-600">
                Enter purchase details manually with full control
              </p>
            </button>

            <button
              onClick={() => setSelectedOption('upload')}
              className="group p-8 border-2 border-teal-500 bg-teal-50 rounded-xl hover:bg-teal-100 transition-all cursor-pointer relative"
            >
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-600 text-white whitespace-nowrap">
                  Recommended
                </span>
              </div>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-upload-cloud-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Purchase Bill</h3>
              <p className="text-sm text-gray-600">
                Upload bill and auto-extract medicine details
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
