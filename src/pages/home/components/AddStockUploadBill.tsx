import { useState } from 'react';

interface UploadBillTabProps {
  onClose: () => void;
}

interface ExtractedProduct {
  id: string;
  name: string;
  batch: string;
  quantity: number;
  purchasePrice: number;
  mrp: number;
  gst: number;
  expiry: string;
  status: 'matched' | 'review';
  selected: boolean;
}

type Step = 'upload' | 'scanning' | 'review' | 'success';

export default function UploadBillTab({ onClose }: UploadBillTabProps) {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedProducts, setExtractedProducts] = useState<ExtractedProduct[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentStep('scanning');
    
    // Simulate scanning progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Simulate extracted data
          setExtractedProducts([
            {
              id: '1',
              name: 'Paracetamol 500mg',
              batch: 'BT2024001',
              quantity: 100,
              purchasePrice: 4.50,
              mrp: 5.50,
              gst: 12,
              expiry: '2025-12-31',
              status: 'matched',
              selected: true,
            },
            {
              id: '2',
              name: 'Amoxicillin 250mg',
              batch: 'BT2024002',
              quantity: 50,
              purchasePrice: 10.00,
              mrp: 12.00,
              gst: 12,
              expiry: '2025-10-15',
              status: 'matched',
              selected: true,
            },
            {
              id: '3',
              name: 'Ibuprofen 400mg',
              batch: 'BT2024003',
              quantity: 75,
              purchasePrice: 7.00,
              mrp: 8.25,
              gst: 12,
              expiry: '2026-03-20',
              status: 'review',
              selected: true,
            },
            {
              id: '4',
              name: 'Cetirizine 10mg',
              batch: 'BT2024004',
              quantity: 120,
              purchasePrice: 3.50,
              mrp: 4.80,
              gst: 12,
              expiry: '2025-08-22',
              status: 'matched',
              selected: true,
            },
            {
              id: '5',
              name: 'Azithromycin 500mg',
              batch: 'BT2024005',
              quantity: 30,
              purchasePrice: 15.00,
              mrp: 18.50,
              gst: 12,
              expiry: '2025-11-10',
              status: 'review',
              selected: true,
            },
          ]);
          setCurrentStep('review');
        }, 500);
      }
    }, 200);
  };

  const handleSelectAll = (checked: boolean) => {
    setExtractedProducts(products =>
      products.map(p => ({ ...p, selected: checked }))
    );
  };

  const handleSelectProduct = (id: string, checked: boolean) => {
    setExtractedProducts(products =>
      products.map(p => p.id === id ? { ...p, selected: checked } : p)
    );
  };

  const handleUpdateProduct = (id: string, field: string, value: string | number) => {
    setExtractedProducts(products =>
      products.map(p => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  const handleConfirm = () => {
    if (!isConfirmed) return;
    
    setCurrentStep('success');
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setUploadedFile(null);
    setExtractedProducts([]);
    setIsConfirmed(false);
    setScanProgress(0);
  };

  const selectedCount = extractedProducts.filter(p => p.selected).length;
  const totalQuantity = extractedProducts
    .filter(p => p.selected)
    .reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="p-8">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          {/* Step 1 */}
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
              currentStep === 'upload' ? 'bg-teal-500 text-white' : 
              currentStep === 'scanning' || currentStep === 'review' || currentStep === 'success' ? 'bg-teal-500 text-white' : 
              'bg-gray-200 text-gray-500'
            }`}>
              {currentStep === 'upload' ? '1' : <i className="ri-check-line"></i>}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Upload</span>
          </div>

          <div className={`w-16 h-0.5 ${
            currentStep === 'scanning' || currentStep === 'review' || currentStep === 'success' ? 'bg-teal-500' : 'bg-gray-300'
          }`}></div>

          {/* Step 2 */}
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
              currentStep === 'scanning' ? 'bg-teal-500 text-white' : 
              currentStep === 'review' || currentStep === 'success' ? 'bg-teal-500 text-white' : 
              'bg-gray-200 text-gray-500'
            }`}>
              {currentStep === 'scanning' ? '2' : currentStep === 'review' || currentStep === 'success' ? <i className="ri-check-line"></i> : '2'}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Scan</span>
          </div>

          <div className={`w-16 h-0.5 ${
            currentStep === 'review' || currentStep === 'success' ? 'bg-teal-500' : 'bg-gray-300'
          }`}></div>

          {/* Step 3 */}
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
              currentStep === 'review' ? 'bg-teal-500 text-white' : 
              currentStep === 'success' ? 'bg-teal-500 text-white' : 
              'bg-gray-200 text-gray-500'
            }`}>
              {currentStep === 'review' ? '3' : currentStep === 'success' ? <i className="ri-check-line"></i> : '3'}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Review</span>
          </div>

          <div className={`w-16 h-0.5 ${
            currentStep === 'success' ? 'bg-teal-500' : 'bg-gray-300'
          }`}></div>

          {/* Step 4 */}
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
              currentStep === 'success' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep === 'success' ? <i className="ri-check-line"></i> : '4'}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Confirm</span>
          </div>
        </div>
      </div>

      {/* Upload Step */}
      {currentStep === 'upload' && (
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-teal-400 transition-colors bg-gradient-to-br from-gray-50 to-white"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-file-upload-line text-5xl text-teal-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Upload Your Wholesale Purchase Bill
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Medicines will be scanned automatically from your bill. Supports PDF, JPG, and PNG formats.
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 shadow-lg">
                <i className="ri-folder-open-line text-lg"></i>
                Choose File
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-6">
              or drag and drop your file here
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <i className="ri-file-pdf-line text-red-500"></i>
                PDF
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-image-line text-blue-500"></i>
                JPG
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-image-line text-green-500"></i>
                PNG
              </span>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-scan-line text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Auto-Detection</h4>
                  <p className="text-xs text-gray-600">Automatically extracts medicine details</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Save Time</h4>
                  <p className="text-xs text-gray-600">No manual data entry required</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Accurate</h4>
                  <p className="text-xs text-gray-600">Review before adding to inventory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanning Step */}
      {currentStep === 'scanning' && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <i className="ri-scan-2-line text-5xl text-teal-600"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Scanning Bill... Extracting Medicines
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Analyzing: <strong>{uploadedFile?.name}</strong>
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-teal-600 mt-3">{scanProgress}%</p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <i className="ri-check-line text-green-500"></i>
              <span>Reading text</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-check-line text-green-500"></i>
              <span>Detecting medicines</span>
            </div>
            <div className="flex items-center gap-2">
              {scanProgress < 100 ? (
                <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <i className="ri-check-line text-green-500"></i>
              )}
              <span>Extracting details</span>
            </div>
          </div>
        </div>
      )}

      {/* Review Step */}
      {currentStep === 'review' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Detected Medicines from Bill
              </h3>
              <p className="text-sm text-gray-600">
                Review and edit extracted data before adding to inventory
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <i className="ri-upload-2-line"></i>
              Upload Different File
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <i className="ri-medicine-bottle-line text-white"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Total Products</p>
                  <p className="text-xl font-bold text-gray-800">{extractedProducts.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <i className="ri-check-double-line text-white"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Auto-Detected</p>
                  <p className="text-xl font-bold text-gray-800">
                    {extractedProducts.filter(p => p.status === 'matched').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <i className="ri-alert-line text-white"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Needs Review</p>
                  <p className="text-xl font-bold text-gray-800">
                    {extractedProducts.filter(p => p.status === 'review').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Select All */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="selectAll"
              checked={extractedProducts.every(p => p.selected)}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
            />
            <label htmlFor="selectAll" className="text-sm font-medium text-gray-700 cursor-pointer">
              Select All Products
            </label>
          </div>

          {/* Products Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 w-12"></th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Medicine Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Batch No</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Expiry Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Purchase Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">MRP</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">GST %</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {extractedProducts.map((product) => (
                    <tr key={product.id} className={product.selected ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={product.selected}
                          onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                          className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={product.batch}
                          onChange={(e) => handleUpdateProduct(product.id, 'batch', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="date"
                          value={product.expiry}
                          onChange={(e) => handleUpdateProduct(product.id, 'expiry', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleUpdateProduct(product.id, 'quantity', parseInt(e.target.value))}
                          className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">₹</span>
                          <input
                            type="number"
                            value={product.purchasePrice}
                            onChange={(e) => handleUpdateProduct(product.id, 'purchasePrice', parseFloat(e.target.value))}
                            step="0.01"
                            className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">₹</span>
                          <input
                            type="number"
                            value={product.mrp}
                            onChange={(e) => handleUpdateProduct(product.id, 'mrp', parseFloat(e.target.value))}
                            step="0.01"
                            className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={product.gst}
                          onChange={(e) => handleUpdateProduct(product.id, 'gst', parseFloat(e.target.value))}
                          className="w-16 px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3">
                        {product.status === 'matched' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                            <i className="ri-check-line"></i>
                            Auto-detected
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full whitespace-nowrap">
                            <i className="ri-alert-line"></i>
                            Needs Review
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="confirmReview"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500 cursor-pointer mt-0.5"
              />
              <label htmlFor="confirmReview" className="flex-1 cursor-pointer">
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  I have reviewed and confirmed the extracted data
                </p>
                <p className="text-xs text-gray-600">
                  You can edit any field before adding to stock. Please verify quantities, prices, and expiry dates.
                </p>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{selectedCount}</span> products selected
              <span className="mx-2">•</span>
              <span className="font-semibold text-gray-800">{totalQuantity}</span> total quantity
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!isConfirmed || selectedCount === 0}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-lg inline-flex items-center gap-2"
              >
                <i className="ri-add-circle-line"></i>
                Add to Inventory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Step */}
      {currentStep === 'success' && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <i className="ri-check-line text-5xl text-green-600"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Medicines Successfully Added!
          </h3>
          <p className="text-sm text-gray-600 mb-8">
            Your inventory has been updated with the extracted products
          </p>

          {/* Success Summary */}
          <div className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Products Added</p>
                <p className="text-3xl font-bold text-green-600">{selectedCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Quantity</p>
                <p className="text-3xl font-bold text-green-600">{totalQuantity}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Redirecting to inventory...
          </p>
        </div>
      )}
    </div>
  );
}
