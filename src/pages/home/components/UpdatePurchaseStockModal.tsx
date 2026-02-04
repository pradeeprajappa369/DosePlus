import { useState } from 'react';

interface UpdatePurchaseStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatePurchaseStockModal({ isOpen, onClose }: UpdatePurchaseStockModalProps) {
  const [formData, setFormData] = useState({
    supplier: '',
    product: '',
    batchNumber: '',
    purchaseQuantity: '',
    purchasePrice: '',
    expiryDate: '',
    invoiceReference: '',
  });

  const [currentStock] = useState(150); // Mock current stock

  const suppliers = ['MedSupply Co.', 'PharmaDist Ltd.', 'HealthCare Wholesale', 'MediPlus Distributors'];
  const products = ['Paracetamol 500mg', 'Amoxicillin 250mg', 'Ibuprofen 400mg', 'Aspirin 75mg'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating purchase stock:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Update Purchase Stock</h2>
              <p className="text-sm text-blue-50">
                Update inventory from new purchase
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
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <div className="space-y-6">
            {/* Supplier */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Supplier <span className="text-red-500">*</span>
              </label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="">Choose supplier...</option>
                {suppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>

            {/* Product */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product <span className="text-red-500">*</span>
              </label>
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="">Choose product...</option>
                {products.map((product) => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>

            {/* Current Stock Info */}
            {formData.product && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-information-line text-blue-600"></i>
                  <span className="text-gray-700">
                    Current Stock: <strong className="text-blue-600">{currentStock} units</strong>
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Batch Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  required
                  placeholder="e.g., BT2024001"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Purchase Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="purchaseQuantity"
                  value={formData.purchaseQuantity}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter quantity"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Purchase Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Updated Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Invoice Reference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Reference <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="invoiceReference"
                value={formData.invoiceReference}
                onChange={handleChange}
                required
                placeholder="Enter invoice number"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line mr-2"></i>
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
