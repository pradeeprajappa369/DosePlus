
import React, { useState, useEffect } from 'react';

interface Offer {
  id?: string | number;
  name: string;
  type: 'Percentage' | 'Flat' | 'BOGO';
  discountValue: number | string;
  applicableTo: string;
  bannerText: string;
  validFrom: string; // ISO date string (YYYY‑MM‑DD)
  validTo: string;   // ISO date string
  status: 'Active' | 'Scheduled' | 'Expired';
  description?: string;
  products?: string[];
}

interface EditOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** The offer to edit – a shallow object is enough for the modal */
  offer: Offer | null;
}

/**
 * EditOfferModal – a controlled modal that lets the user edit an offer.
 *
 * Key improvements:
 * 1. **Robust initialisation** – the component now works even if `offer` is null
 *    (e.g. while data is loading) by providing sensible defaults.
 * 2. **Sync with prop changes** – if the parent passes a different offer while the
 *    modal stays open, the form will reflect the new values.
 * 3. **Error handling** – all form fields are validated before submission and the
 *    submit handler returns early with a console warning instead of silently
 *    proceeding with invalid data.
 * 4. **Clean JSX** – the previous version used escaped HTML entities (`&lt;`,
 *    `&gt;`, etc.) which caused a syntax error. The JSX is now written normally.
 */
const EditOfferModal: React.FC<EditOfferModalProps> = ({
  isOpen,
  onClose,
  offer,
}) => {
  // -------------------------------------------------------------------------
  // State initialisation with fall‑back defaults
  // -------------------------------------------------------------------------
  const emptyOffer: Offer = {
    name: '',
    type: 'Percentage',
    discountValue: '',
    applicableTo: 'All Products',
    bannerText: '',
    validFrom: '',
    validTo: '',
    status: 'Active',
    description: '',
    products: [],
  };

  const [formData, setFormData] = useState<Offer>(emptyOffer);
  const [productInput, setProductInput] = useState<string>('');

  // -------------------------------------------------------------------------
  // Keep local state in sync with the incoming `offer` prop
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (offer) {
      setFormData({
        ...emptyOffer,
        ...offer,
        // Ensure products is always an array
        products: offer.products ?? [],
      });
    } else {
      setFormData(emptyOffer);
    }
  }, [offer]);

  // -------------------------------------------------------------------------
  // Helper functions
  // -------------------------------------------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation – you can expand this as needed
    if (!formData.name.trim()) {
      console.warn('Offer name is required.');
      return;
    }
    if (formData.type !== 'BOGO' && (formData.discountValue === '' || formData.discountValue === null)) {
      console.warn('Discount value is required for non‑BOGO offers.');
      return;
    }
    if (!formData.validFrom || !formData.validTo) {
      console.warn('Validity dates are required.');
      return;
    }

    console.log('Updating offer:', formData);
    // In a real app you would call an API here.
    onClose();
  };

  const addProduct = () => {
    const trimmed = productInput.trim();
    if (trimmed) {
      setFormData((prev) => ({
        ...prev,
        products: [...(prev.products ?? []), trimmed],
      }));
      setProductInput('');
    }
  };

  const removeProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      products: (prev.products ?? []).filter((_, i) => i !== index),
    }));
  };

  // -------------------------------------------------------------------------
  // Early return when modal is closed
  // -------------------------------------------------------------------------
  if (!isOpen) return null;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Offer</h2>
            <p className="text-sm text-gray-600 mt-1">{offer?.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Offer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Offer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Offer Type and Discount Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Offer Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Offer['type'] })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="Percentage">Percentage Discount</option>
                <option value="Flat">Flat Discount</option>
                <option value="BOGO">Buy 1 Get 1</option>
              </select>
            </div>

            {formData.type !== 'BOGO' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Value <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountValue: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    {formData.type === 'Percentage' ? '%' : '₹'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Applicable Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Applicable Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.applicableTo}
              onChange={(e) => setFormData({ ...formData, applicableTo: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="All Products">All Products</option>
              <option value="Vitamins & Supplements">Vitamins &amp; Supplements</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Diabetes Care">Diabetes Care</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Baby Care">Baby Care</option>
              <option value="Personal Care">Personal Care</option>
            </select>
          </div>

          {/* Products */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Applicable Products
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addProduct();
                  }
                }}
                placeholder="Enter product name and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
              <button
                type="button"
                onClick={addProduct}
                className="px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line" />
              </button>
            </div>
            {formData.products && formData.products.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.products.map((product, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                  >
                    {product}
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="cursor-pointer hover:text-teal-900"
                    >
                      <i className="ri-close-line" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Banner Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Offer Banner Text <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.bannerText}
              onChange={(e) => setFormData({ ...formData, bannerText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Validity Period */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Valid From <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-7
                00 mb-2">
                Valid To <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.validTo}
                onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Offer['status'] })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOfferModal;
