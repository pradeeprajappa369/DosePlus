import { useState, useEffect } from 'react';

interface Offer {
  id: string;
  name: string;
  description: string;
  type: 'PERCENTAGE' | 'FLAT';
  value: number;
  applicablePlans: string[];
  status: 'ACTIVE' | 'INACTIVE';
  validFrom: string;
  validTo: string;
  createdAt: string;
}

interface CreateEditOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (offerData: Omit<Offer, 'id' | 'createdAt'>) => void;
  offer: Offer | null;
  editMode: boolean;
}

export default function CreateEditOfferModal({
  isOpen,
  onClose,
  onSave,
  offer,
  editMode,
}: CreateEditOfferModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'PERCENTAGE' as 'PERCENTAGE' | 'FLAT',
    value: 0,
    applicablePlans: [] as string[],
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
    validFrom: '',
    validTo: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editMode && offer) {
      setFormData({
        name: offer.name,
        description: offer.description,
        type: offer.type,
        value: offer.value,
        applicablePlans: offer.applicablePlans,
        status: offer.status,
        validFrom: offer.validFrom,
        validTo: offer.validTo,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'PERCENTAGE',
        value: 0,
        applicablePlans: [],
        status: 'ACTIVE',
        validFrom: '',
        validTo: '',
      });
    }
    setErrors({});
  }, [isOpen, editMode, offer]);

  const handlePlanToggle = (plan: string) => {
    setFormData(prev => ({
      ...prev,
      applicablePlans: prev.applicablePlans.includes(plan)
        ? prev.applicablePlans.filter(p => p !== plan)
        : [...prev.applicablePlans, plan],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Offer name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.value <= 0) {
      newErrors.value = 'Discount value must be greater than 0';
    }

    if (formData.type === 'PERCENTAGE' && formData.value > 100) {
      newErrors.value = 'Percentage cannot exceed 100%';
    }

    if (formData.applicablePlans.length === 0) {
      newErrors.applicablePlans = 'Select at least one plan';
    }

    if (!formData.validFrom) {
      newErrors.validFrom = 'Start date is required';
    }

    if (!formData.validTo) {
      newErrors.validTo = 'End date is required';
    }

    if (formData.validFrom && formData.validTo && formData.validFrom > formData.validTo) {
      newErrors.validTo = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-6 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">
              {editMode ? 'Edit Offer' : 'Create New Offer'}
            </h2>
            <p className="text-teal-100 text-sm mt-1">
              {editMode ? 'Update offer details' : 'Set up a new promotional offer'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Offer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Offer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., New Year Special"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the offer details..."
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Offer Type and Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Offer Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'PERCENTAGE' | 'FLAT' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FLAT">Flat Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${
                    errors.value ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  {formData.type === 'PERCENTAGE' ? '%' : '₹'}
                </span>
              </div>
              {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
            </div>
          </div>

          {/* Applicable Plans */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Applicable Plans <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Basic', 'Professional', 'Enterprise'].map((plan) => (
                <button
                  key={plan}
                  type="button"
                  onClick={() => handlePlanToggle(plan)}
                  className={`flex items-center justify-between px-4 py-3 border-2 rounded-lg transition-all cursor-pointer ${
                    formData.applicablePlans.includes(plan)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-teal-300'
                  }`}
                >
                  <span className="font-semibold">{plan}</span>
                  {formData.applicablePlans.includes(plan) && (
                    <i className="ri-checkbox-circle-fill text-teal-600 text-xl"></i>
                  )}
                </button>
              ))}
            </div>
            {errors.applicablePlans && (
              <p className="text-red-500 text-xs mt-1">{errors.applicablePlans}</p>
            )}
          </div>

          {/* Valid Period */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Valid From <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer ${
                  errors.validFrom ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.validFrom && <p className="text-red-500 text-xs mt-1">{errors.validFrom}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Valid To <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.validTo}
                onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer ${
                  errors.validTo ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.validTo && <p className="text-red-500 text-xs mt-1">{errors.validTo}</p>}
            </div>
          </div>

          {/* Status Toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: formData.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
                  formData.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    formData.status === 'ACTIVE' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-semibold ${formData.status === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'}`}>
                {formData.status === 'ACTIVE' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-8 py-4 flex justify-end gap-3 rounded-b-xl border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            {editMode ? 'Update Offer' : 'Create Offer'}
          </button>
        </div>
      </div>
    </div>
  );
}
