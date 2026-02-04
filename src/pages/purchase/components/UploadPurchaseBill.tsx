import { useState } from 'react';
import { supplierData } from '../../../mocks/purchaseData';

interface UploadPurchaseBillProps {
  onClose: () => void;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function UploadPurchaseBill({ onClose, onBack, onSubmit }: UploadPurchaseBillProps) {
  const [step, setStep] = useState<'upload' | 'scanning' | 'review'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  
  const [formData, setFormData] = useState({
    supplierId: '',
    supplierName: '',
    billNo: '',
    billDate: new Date().toISOString().split('T')[0],
    paymentStatus: 'Pending'
  });

  const [detectedItems, setDetectedItems] = useState([
    {
      medicineName: 'Paracetamol 500mg',
      batchNo: 'BATCH-2024-001',
      expiry: '2025-12-31',
      quantity: 500,
      purchasePrice: 30,
      mrp: 50,
      gst: 12,
      status: 'Detected'
    },
    {
      medicineName: 'Amoxicillin 250mg',
      batchNo: 'BATCH-2024-002',
      expiry: '2025-10-31',
      quantity: 300,
      purchasePrice: 80,
      mrp: 120,
      gst: 12,
      status: 'Detected'
    },
    {
      medicineName: 'Cetirizine 10mg',
      batchNo: 'BATCH-2024-003',
      expiry: '2025-11-30',
      quantity: 400,
      purchasePrice: 40,
      mrp: 65,
      gst: 12,
      status: 'Needs Review'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setStep('scanning');
      
      setTimeout(() => {
        setStep('review');
      }, 2000);
    }
  };

  const handleSupplierChange = (supplierId: string) => {
    const supplier = supplierData.find(s => s.id === supplierId);
    setFormData({
      ...formData,
      supplierId,
      supplierName: supplier?.name || ''
    });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...detectedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setDetectedItems(newItems);
  };

  const calculateTotal = () => {
    return detectedItems.reduce((total, item) => {
      const baseAmount = item.quantity * item.purchasePrice;
      const gstAmount = (baseAmount * item.gst) / 100;
      return total + baseAmount + gstAmount;
    }, 0);
  };

  const handleSubmit = () => {
    if (!confirmed) return;
    
    const purchaseData = {
      id: `PUR-${Date.now()}`,
      ...formData,
      totalAmount: calculateTotal(),
      items: detectedItems
    };
    onSubmit(purchaseData);
  };

  if (step === 'upload') {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <h2 className="text-xl font-bold text-gray-900">Upload Purchase Bill</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-upload-cloud-line text-4xl text-teal-600"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Purchase Bill</h3>
            <p className="text-sm text-gray-600 mb-6">
              Upload your purchase bill in PDF, JPG, or PNG format
            </p>
            <label className="inline-block px-6 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-file-upload-line mr-2"></i>Choose File
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: PDF, JPG, PNG (Max 10MB)
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'scanning') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Scanning Bill...</h3>
          <p className="text-sm text-gray-600">Extracting medicine details from your bill</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <h2 className="text-xl font-bold text-gray-900">Review Detected Items</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Purchase Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.supplierId}
                onChange={(e) => handleSupplierChange(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select Supplier</option>
                {supplierData.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.billNo}
                onChange={(e) => setFormData({ ...formData, billNo: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter bill number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.billDate}
                onChange={(e) => setFormData({ ...formData, billDate: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Detected Medicines</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Medicine Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Expiry</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Purchase Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">MRP</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">GST %</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detectedItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.medicineName}
                        onChange={(e) => handleItemChange(index, 'medicineName', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.batchNo}
                        onChange={(e) => handleItemChange(index, 'batchNo', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="date"
                        value={item.expiry}
                        onChange={(e) => handleItemChange(index, 'expiry', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.purchasePrice}
                        onChange={(e) => handleItemChange(index, 'purchasePrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.mrp}
                        onChange={(e) => handleItemChange(index, 'mrp', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.gst}
                        onChange={(e) => handleItemChange(index, 'gst', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          item.status === 'Detected'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-teal-600">
              ₹{calculateTotal().toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <input
              type="checkbox"
              id="confirm"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
            />
            <label htmlFor="confirm" className="text-sm text-gray-700 cursor-pointer">
              I confirm that the purchase details are correct
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onBack}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!confirmed}
            className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            Add to Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
