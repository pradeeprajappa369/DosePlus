import { useState, useEffect } from 'react';

interface Plan {
  id?: string;
  name: string;
  price: string;
  billingCycle: 'monthly' | 'yearly';
  maxStaff: string;
  features: {
    inventory: boolean;
    sales: boolean;
    purchases: boolean;
    suppliers: boolean;
    reports: boolean;
    onlineStore: boolean;
  };
  status: 'active' | 'inactive';
}

interface CreateEditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: Plan | null;
  onSave: (plan: Plan) => void;
}

export default function CreateEditPlanModal({
  isOpen,
  onClose,
  plan,
  onSave,
}: CreateEditPlanModalProps) {
  const [formData, setFormData] = useState<Plan>({
    name: '',
    price: '',
    billingCycle: 'monthly',
    maxStaff: '',
    features: {
      inventory: true,
      sales: true,
      purchases: false,
      suppliers: false,
      reports: false,
      onlineStore: false,
    },
    status: 'active',
  });

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    } else {
      setFormData({
        name: '',
        price: '',
        billingCycle: 'monthly',
        maxStaff: '',
        features: {
          inventory: true,
          sales: true,
          purchases: false,
          suppliers: false,
          reports: false,
          onlineStore: false,
        },
        status: 'active',
      });
    }
  }, [plan, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleFeatureToggle = (feature: keyof typeof formData.features) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [feature]: !formData.features[feature],
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {plan ? 'Edit Plan' : 'Create New Plan'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Plan Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Plan Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                placeholder="e.g., Professional Plan"
                required
              />
            </div>

            {/* Price and Billing Cycle */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="999"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Billing Cycle <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.billingCycle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billingCycle: e.target.value as 'monthly' | 'yearly',
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Max Staff */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Staff Count <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.maxStaff}
                onChange={(e) => setFormData({ ...formData, maxStaff: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                placeholder="e.g., 5 or Unlimited"
                required
              />
            </div>

            {/* Feature Toggles */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Features Included
              </label>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                {[
                  { key: 'inventory', label: 'Inventory Management', icon: 'ri-archive-line' },
                  { key: 'sales', label: 'Sales & Billing', icon: 'ri-shopping-cart-line' },
                  { key: 'purchases', label: 'Purchase Management', icon: 'ri-shopping-bag-line' },
                  { key: 'suppliers', label: 'Supplier Management', icon: 'ri-truck-line' },
                  { key: 'reports', label: 'Reports & Analytics', icon: 'ri-bar-chart-box-line' },
                  { key: 'onlineStore', label: 'Online Store Access', icon: 'ri-store-line' },
                ].map((feature) => (
                  <label
                    key={feature.key}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-teal-500 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.features[feature.key as keyof typeof formData.features]}
                      onChange={() =>
                        handleFeatureToggle(feature.key as keyof typeof formData.features)
                      }
                      className="w-5 h-5 text-teal-500 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
                    />
                    <i className={`${feature.icon} text-lg text-gray-600`}></i>
                    <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {plan && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line text-blue-600 text-lg mt-0.5"></i>
                  <p className="text-sm text-blue-800">
                    Changes will apply on the next billing cycle for existing subscribers.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              {plan ? 'Update Plan' : 'Create Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
