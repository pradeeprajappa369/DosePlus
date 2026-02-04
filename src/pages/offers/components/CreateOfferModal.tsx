import { useState } from 'react';

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateOfferModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateOfferModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Percentage' as 'Percentage' | 'Flat' | 'BOGO',
    discountValue: '',
    applicableTo: '',
    bannerText: '',
    validFrom: '',
    validTo: '',
    status: 'Active' as 'Active' | 'Scheduled',
    description: '',
    products: [] as string[],
    minOrderValue: '',
    showOnHomepage: true,
  });

  const [productInput, setProductInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Offer name is required.');
      return;
    }
    if (formData.type !== 'BOGO' && !formData.discountValue) {
      alert('Discount value is required for non‑BOGO offers.');
      return;
    }
    if (!formData.applicableTo) {
      alert('Please select an applicable category.');
      return;
    }
    if (!formData.bannerText.trim()) {
      alert('Banner text is required.');
      return;
    }
    if (!formData.validFrom || !formData.validTo) {
      alert('Validity period is required.');
      return;
    }

    console.log('Creating offer:', formData);
    
    // Reset form
    setFormData({
      name: '',
      type: 'Percentage',
      discountValue: '',
      applicableTo: '',
      bannerText: '',
      validFrom: '',
      validTo: '',
      status: 'Active',
      description: '',
      products: [],
      minOrderValue: '',
      showOnHomepage: true,
    });
    setProductInput('');
    
    if (onSuccess) onSuccess();
    onClose();
  };

  const addProduct = () => {
    const trimmed = productInput.trim();
    if (trimmed && !formData.products.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        products: [...prev.products, trimmed],
      }));
    }
    setProductInput('');
  };

  const removeProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scaleIn" style={{
        animation: 'scaleIn 0.3s ease-out'
      }}>
        {/* Premium Orange Header */}
        <div className="relative bg-gradient-to-r from-[#FF8A00] via-[#FF7A00] to-[#FF6A00] px-8 py-8 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Icon Illustration */}
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-price-tag-3-line text-3xl text-white"></i>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Create Promotion Offer</h2>
                <p className="text-white/90 text-sm">
                  Set up a new promotional offer to attract and reward your customers
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all cursor-pointer"
            >
              <i className="ri-close-line text-2xl text-white"></i>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-8 space-y-8">
            {/* Section 1: Offer Details */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-text-line text-xl text-orange-600"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Offer Details</h3>
                  <p className="text-xs text-gray-500">Basic information about your promotion</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Offer Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Offer Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g., Weekend Wellness Sale"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Brief description of the offer and its benefits"
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm resize-none transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                {/* Offer Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Offer Type <span className="text-orange-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'Percentage', label: 'Percentage %', icon: 'ri-percent-line' },
                      { value: 'Flat', label: 'Flat Amount ₹', icon: 'ri-money-rupee-circle-line' },
                      { value: 'BOGO', label: 'Buy X Get Y', icon: 'ri-gift-line' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            type: type.value as typeof formData.type,
                          }))
                        }
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          formData.type === type.value
                            ? 'border-orange-500 bg-orange-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-orange-300'
                        }`}
                      >
                        <i className={`${type.icon} text-2xl ${formData.type === type.value ? 'text-orange-600' : 'text-gray-400'}`}></i>
                        <p className={`text-sm font-semibold mt-2 ${formData.type === type.value ? 'text-orange-700' : 'text-gray-700'}`}>
                          {type.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Banner Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Offer Headline Text <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bannerText}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bannerText: e.target.value }))
                    }
                    placeholder="e.g., Get 20% OFF on All Vitamins & Supplements"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">This text will appear on promotional banners</p>
                </div>
              </div>
            </div>

            {/* Section 2: Discount Configuration */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <i className="ri-discount-percent-line text-xl text-amber-600"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Discount Configuration</h3>
                  <p className="text-xs text-gray-500">Set discount value and conditions</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Discount Value */}
                {formData.type !== 'BOGO' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Discount Value <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        value={formData.discountValue}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            discountValue: e.target.value,
                          }))
                        }
                        placeholder={formData.type === 'Percentage' ? '20' : '150'}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 font-bold text-lg">
                        {formData.type === 'Percentage' ? '%' : '₹'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Minimum Order Value */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Order Value
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.minOrderValue}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          minOrderValue: e.target.value,
                        }))
                      }
                      placeholder="500"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      ₹
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Optional: Set minimum cart value</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-orange-200 my-6"></div>

              {/* Applicable Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Applicable Category <span className="text-orange-500">*</span>
                </label>
                <select
                  value={formData.applicableTo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      applicableTo: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm cursor-pointer transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                >
                  <option value="">Select Category</option>
                  <option value="All Products">All Products</option>
                  <option value="Vitamins & Supplements">Vitamins & Supplements</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Diabetes Care">Diabetes Care</option>
                  <option value="Skin Care">Skin Care</option>
                  <option value="Baby Care">Baby Care</option>
                  <option value="Personal Care">Personal Care</option>
                </select>
              </div>

              {/* Products */}
              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Applicable Products
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addProduct())
                    }
                    placeholder="Enter product name and press Enter"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                  />
                  <button
                    type="button"
                    onClick={addProduct}
                    className="px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    <i className="ri-add-line text-lg"></i>
                  </button>
                </div>
                {formData.products.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.products.map((product, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm border border-orange-200"
                      >
                        {product}
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="cursor-pointer hover:text-orange-900 transition-colors"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Validity Period */}
            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-check-line text-xl text-red-600"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Validity Period</h3>
                  <p className="text-xs text-gray-500">Set when this offer will be active</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valid From <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.validFrom}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, validFrom: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm cursor-pointer transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valid To <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.validTo}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, validTo: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm cursor-pointer transition-all hover:border-orange-300 shadow-sm focus:shadow-orange-200"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Visibility Settings */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-eye-line text-xl text-orange-600"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Visibility Settings</h3>
                  <p className="text-xs text-gray-500">Control offer status and display</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Status Toggle */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-toggle-line text-xl text-orange-600"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Offer Status</p>
                      <p className="text-xs text-gray-500">Set offer as active or scheduled</p>
                    </div>
                  </div>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as typeof formData.status,
                      }))
                    }
                    className="px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm cursor-pointer font-semibold"
                  >
                    <option value="Active">Active</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>

                {/* Homepage Banner Toggle */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <i className="ri-home-line text-xl text-amber-600"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Show on Homepage Banner</p>
                      <p className="text-xs text-gray-500">Display this offer prominently on homepage</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        showOnHomepage: !prev.showOnHomepage,
                      }))
                    }
                    className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                      formData.showOnHomepage ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        formData.showOnHomepage ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-5 flex items-center justify-end gap-3 shadow-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-all cursor-pointer whitespace-nowrap font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] text-white rounded-lg hover:from-[#FF7A00] hover:to-[#FF5A00] transition-all cursor-pointer whitespace-nowrap font-semibold shadow-lg hover:shadow-xl"
            >
              <i className="ri-check-line mr-2"></i>
              Create Offer
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateOfferModal;
