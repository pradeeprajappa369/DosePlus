import React, { useState } from 'react';
import { updatePharmacySubscription, getCurrentPharmacySubscription } from '../../../../mocks/subscriptionRules';

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  pharmacy: any;
  onSave: (pharmacyId: string, newPlan: string) => void;
}

const ChangePlanModal: React.FC<ChangePlanModalProps> = ({ isOpen, onClose, pharmacy, onSave }) => {
  const [selectedPlan, setSelectedPlan] = useState(pharmacy?.currentPlan || 'Basic');

  if (!isOpen || !pharmacy) return null;

  const plans = [
    {
      name: 'Trial',
      price: 0,
      duration: '30 Days',
      features: ['Basic inventory', 'Up to 2 staff', 'Email support']
    },
    {
      name: 'Basic',
      price: 999,
      duration: 'Monthly',
      features: ['Full inventory', 'Up to 5 staff', 'Email support', 'Basic reports']
    },
    {
      name: 'Professional',
      price: 2499,
      duration: 'Monthly',
      features: ['Full inventory', 'Up to 10 staff', 'Priority support', 'Advanced reports', 'Online store']
    },
    {
      name: 'Enterprise',
      price: 4999,
      duration: 'Monthly',
      features: ['Unlimited inventory', 'Unlimited staff', '24/7 support', 'Custom reports', 'Online store', 'API access']
    }
  ];

  const handleSave = () => {
    if (!selectedPlan) return;

    // Update the pharmacy's subscription in localStorage (mock)
    const currentSubscription = getCurrentPharmacySubscription();
    if (currentSubscription.pharmacyId === pharmacy.id) {
      updatePharmacySubscription({
        ...currentSubscription,
        plan: selectedPlan.toLowerCase() as 'starter' | 'professional' | 'enterprise',
        onlineStoreAddon: currentSubscription.onlineStoreAddon,
      });
    }

    onSave(pharmacy.id, selectedPlan);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-6 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">Change Subscription Plan</h2>
            <p className="text-teal-100 text-sm mt-1">{pharmacy.pharmacyName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <p className="text-gray-600">Current Plan: <span className="font-bold text-teal-600">{pharmacy.currentPlan}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.name
                    ? 'border-teal-600 bg-teal-50 shadow-lg'
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                    selectedPlan === plan.name
                      ? 'border-teal-600 bg-teal-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === plan.name && (
                      <i className="ri-check-line text-white text-sm"></i>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-600">/ {plan.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <i className="ri-check-line text-teal-600"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-8 py-4 flex justify-end gap-3 rounded-b-xl border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition-colors whitespace-nowrap"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePlanModal;
