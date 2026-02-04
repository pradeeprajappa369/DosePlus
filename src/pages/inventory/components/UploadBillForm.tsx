import { useState } from 'react';
import ExtractedProductsTable from './ExtractedProductsTable';

interface UploadBillFormProps {
  onClose: () => void;
}

// Helper function to generate random medicines dynamically
const generateRandomMedicines = () => {
  const medicineNames = [
    'Paracetamol 500mg', 'Amoxicillin 250mg', 'Ibuprofen 400mg', 
    'Vitamin C 1000mg', 'Omeprazole 20mg', 'Cetirizine 10mg',
    'Azithromycin 500mg', 'Metformin 500mg', 'Aspirin 75mg',
    'Ciprofloxacin 500mg', 'Doxycycline 100mg', 'Losartan 50mg',
    'Atorvastatin 10mg', 'Pantoprazole 40mg', 'Montelukast 10mg'
  ];

  const categories = ['Prescription', 'Over-the-Counter'];
  const suppliers = ['MediSupply Co.', 'PharmaCorp Ltd.', 'HealthPlus Distributors', 'MedEx Solutions'];
  
  const count = Math.floor(Math.random() * 6) + 5; // 5-10 medicines
  const medicines = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name;
    do {
      name = medicineNames[Math.floor(Math.random() * medicineNames.length)];
    } while (usedNames.has(name));
    usedNames.add(name);

    const quantity = Math.floor(Math.random() * 500) + 100;
    const price = parseFloat((Math.random() * 15 + 2).toFixed(2));
    const monthsToExpiry = Math.floor(Math.random() * 24) + 6;
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + monthsToExpiry);
    
    // 70% chance of being fully detected, 30% needs review
    const needsReview = Math.random() > 0.7;

    medicines.push({
      id: `med-${Date.now()}-${i}`,
      productName: name,
      category: categories[Math.floor(Math.random() * categories.length)],
      stockQuantity: quantity,
      sellingPrice: price,
      expiryDate: expiryDate.toISOString().split('T')[0],
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
      batchNumber: `BT${new Date().getFullYear()}${String(Math.floor(Math.random() * 999) + 100).padStart(3, '0')}`,
      status: needsReview ? 'review' : 'matched',
      isValid: !needsReview
    });
  }

  return medicines;
};

export default function UploadBillForm({ onClose }: UploadBillFormProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showExtractedProducts, setShowExtractedProducts] = useState(false);
  const [extractedData, setExtractedData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateExtraction();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const isSupported =
      file.type === 'application/pdf' || file.type.startsWith('image/');
    if (!isSupported) {
      alert('Unsupported file type. Please upload a PDF, JPG, or PNG.');
      return;
    }

    setUploadedFile(file);
    simulateExtraction();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const simulateExtraction = () => {
    setIsExtracting(true);
    
    // Simulate realistic extraction time (2-3 seconds)
    setTimeout(() => {
      const medicines = generateRandomMedicines();
      setExtractedData(medicines);
      setIsExtracting(false);
      setShowExtractedProducts(true);
    }, 2500);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setShowExtractedProducts(false);
    setIsExtracting(false);
    setExtractedData([]);
  };

  if (showExtractedProducts) {
    return (
      <ExtractedProductsTable 
        onClose={onClose} 
        onBack={handleReset}
        initialProducts={extractedData}
      />
    );
  }

  return (
    <div className="p-8">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-teal-400 transition-colors cursor-pointer bg-gray-50"
      >
        {!uploadedFile && !isExtracting ? (
          <div>
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-upload-cloud-2-line text-teal-500 text-4xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Upload Invoice
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Upload an invoice from your wholesaler to automatically extract
              products. Supports PDF, JPG, and PNG formats.
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="px-6 py-3 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-2 shadow-sm">
                <i className="ri-folder-open-line"></i>
                Choose File
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-4">
              or drag and drop your file here
            </p>
          </div>
        ) : isExtracting ? (
          <div>
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <i className="ri-file-search-line text-teal-500 text-4xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Extracting Products...
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              AI is analyzing your invoice:{' '}
              <strong>{uploadedFile?.name}</strong>
            </p>
            <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-progress"></div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              This usually takes a few seconds...
            </p>
          </div>
        ) : (
          <div>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-check-line text-green-500 text-4xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              File Uploaded Successfully
            </h3>
            <p className="text-sm text-gray-600">
              <strong>{uploadedFile?.name}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5 mt-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-information-line text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              How It Works
            </h3>
            <ul className="text-sm text-gray-600 leading-relaxed space-y-1">
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill text-blue-500 mt-0.5"></i>
                <span>
                  Upload your wholesaler invoice in PDF, JPG, or PNG format
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill text-blue-500 mt-0.5"></i>
                <span>
                  Our AI extracts product names, quantities, prices, and expiry
                  dates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill text-blue-500 mt-0.5"></i>
                <span>
                  Review and edit extracted data before adding to inventory
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          Cancel
        </button>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
