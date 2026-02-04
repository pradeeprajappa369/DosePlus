import { useState } from 'react';
import { supplierData } from '../../../mocks/purchaseData';

interface ManualPurchaseEntryProps {
  onClose: () => void;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function ManualPurchaseEntry({ onClose, onBack, onSubmit }: ManualPurchaseEntryProps) {
  const [formData, setFormData] = useState({
    supplierId: '',
    supplierName: '',
    billNo: '',
    billDate: new Date().toISOString().split('T')[0],
    paymentStatus: 'Pending'
  });

  const [items, setItems] = useState([
    {
      medicineName: '',
      batchNo: '',
      expiry: '',
      quantity: 0,
      purchasePrice: 0,
      mrp: 0,
      gst: 12
    }
  ]);

  const handleSupplierChange = (supplierId: string) => {
    const supplier = supplierData.find(s => s.id === supplierId);
    setFormData({
      ...formData,
      supplierId,
      supplierName: supplier?.name || ''
    });
  };

  const handleAddItem = () => {
    setItems([...items, {
      medicineName: '',
      batchNo: '',
      expiry: '',
      quantity: 0,
      purchasePrice: 0,
      mrp: 0,
      gst: 12
    }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const baseAmount = item.quantity * item.purchasePrice;
      const gstAmount = (baseAmount * item.gst) / 100;
      return total + baseAmount + gstAmount;
    }, 0);
  };

  const handleSubmit = () => {
    const purchaseData = {
      id: `PUR-${Date.now()}`,
      ...formData,
      totalAmount: calculateTotal(),
      items
    };
    onSubmit(purchaseData);
  };

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
          <h2 className="text-xl font-bold text-gray-900">Manual Purchase Entry</h2>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Medicine Items</h3>
            <button
              onClick={handleAddItem}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>Add Item
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Item {index + 1}</span>
                  {items.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-sm"></i>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={item.medicineName}
                      onChange={(e) => handleItemChange(index, 'medicineName', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Medicine Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={item.batchNo}
                      onChange={(e) => handleItemChange(index, 'batchNo', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Batch No"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      value={item.expiry}
                      onChange={(e) => handleItemChange(index, 'expiry', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Expiry"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Quantity"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={item.purchasePrice}
                      onChange={(e) => handleItemChange(index, 'purchasePrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Purchase Price"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={item.mrp}
                      onChange={(e) => handleItemChange(index, 'mrp', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="MRP"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={item.gst}
                      onChange={(e) => handleItemChange(index, 'gst', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="GST %"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-teal-600">
              ₹{calculateTotal().toLocaleString('en-IN')}
            </span>
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
            className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            Add to Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
