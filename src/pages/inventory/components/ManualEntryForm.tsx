
import { useState } from 'react';

interface ManualEntryFormProps {
  onClose: () => void;
}

export default function ManualEntryForm({ onClose }: ManualEntryFormProps) {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    batchNumber: '',
    stockQuantity: '',
    purchasePrice: '',
    sellingPrice: '',
    expiryDate: '',
    supplierName: '',
    invoiceNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.batchNumber.trim()) newErrors.batchNumber = 'Batch number is required';
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) <= 0) {
      newErrors.stockQuantity = 'Valid stock quantity is required';
    }
    if (!formData.purchasePrice || parseFloat(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = 'Valid purchase price is required';
    }
    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'Valid selling price is required';
    }
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.supplierName.trim()) newErrors.supplierName = 'Supplier name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (saveAndAddAnother: boolean = false) => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert(`Product "${formData.productName}" added successfully!`);

      if (saveAndAddAnother) {
        setFormData({
          productName: '',
          category: '',
          batchNumber: '',
          stockQuantity: '',
          purchasePrice: '',
          sellingPrice: '',
          expiryDate: '',
          supplierName: '',
          invoiceNumber: '',
        });
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i className="ri-medicine-bottle-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
                placeholder="Search or enter medicine name..."
                className={`w-full pl-11 pr-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                  errors.productName
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.productName && (
              <p className="text-xs text-red-500 mt-1">{errors.productName}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all cursor-pointer bg-white ${
                errors.category
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-teal-500'
              }`}
            >
              <option value="">Select category</option>
              <option value="Prescription">Prescription</option>
              <option value="Over-the-Counter">Over-the-Counter</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Batch Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Batch Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.batchNumber}
              onChange={(e) => handleChange('batchNumber', e.target.value)}
              placeholder="e.g., BT2024001"
              className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                errors.batchNumber
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-teal-500'
              }`}
            />
            {errors.batchNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.batchNumber}</p>
            )}
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.stockQuantity}
              onChange={(e) => handleChange('stockQuantity', e.target.value)}
              placeholder="Enter quantity"
              min="1"
              className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                errors.stockQuantity
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-teal-500'
              }`}
            />
            {errors.stockQuantity && (
              <p className="text-xs text-red-500 mt-1">{errors.stockQuantity}</p>
            )}
          </div>

          {/* Purchase Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Purchase Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₹</span>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => handleChange('purchasePrice', e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                  errors.purchasePrice
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.purchasePrice && (
              <p className="text-xs text-red-500 mt-1">{errors.purchasePrice}</p>
            )}
          </div>

          {/* Selling Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Selling Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₹</span>
              <input
                type="number"
                value={formData.sellingPrice}
                onChange={(e) => handleChange('sellingPrice', e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                  errors.sellingPrice
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.sellingPrice && (
              <p className="text-xs text-red-500 mt-1">{errors.sellingPrice}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i className="ri-calendar-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                className={`w-full pl-11 pr-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all cursor-pointer ${
                  errors.expiryDate
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.expiryDate && (
              <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>
            )}
            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
              <i className="ri-alert-line"></i>
              Please verify expiry date carefully
            </p>
          </div>

          {/* Supplier Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Supplier Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.supplierName}
              onChange={(e) => handleChange('supplierName', e.target.value)}
              placeholder="Enter supplier name"
              className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                errors.supplierName
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-teal-500'
              }`}
            />
            {errors.supplierName && (
              <p className="text-xs text-red-500 mt-1">{errors.supplierName}</p>
            )}
          </div>

          {/* Invoice Number */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Invoice Number <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => handleChange('invoiceNumber', e.target.value)}
              placeholder="Enter invoice number if available"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
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
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="px-6 py-3 text-sm font-medium text-teal-600 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            Save &amp; Add Another
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="px-6 py-3 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <i className="ri-check-line mr-2"></i>
            Add to Inventory
          </button>
        </div>
      </form>
    </div>
  );
}
