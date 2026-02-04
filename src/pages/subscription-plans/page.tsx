import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 999,
    period: 'month',
    description: 'Best for small pharmacies',
    features: [
      'Billing & Invoices',
      'Inventory Management',
      'Low Stock Alerts',
      'Expiry Alerts'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: 1999,
    period: 'month',
    description: 'Perfect for growing pharmacies',
    features: [
      'All Basic features',
      'Purchase & Supplier Module',
      'Offers & Promotions',
      'Reports & Analytics'
    ],
    isPopular: true
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 2999,
    period: 'month',
    description: 'For established pharmacies',
    features: [
      'All Standard features',
      'Multiple staff accounts',
      'Customer management',
      'Priority Support'
    ]
  }
];

export default function SubscriptionPlansPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      // Navigate to confirmation page with plan data
      navigate('/subscription-plans/confirm-plan', { state: { plan } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Simple pricing for every pharmacy
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.isPopular ? 'border-2 border-orange-500' : 'border border-gray-200'
              } ${selectedPlan === plan.id ? 'ring-4 ring-orange-300' : ''}`}
            >
              {/* Most Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      / {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-check-line text-green-600 text-xl"></i>
                      </div>
                      <span className="ml-3 text-gray-700 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center">
            <i className="ri-shield-check-line text-green-600 mr-2"></i>
            All plans include GST compliant billing
          </p>
        </div>
      </div>
    </div>
  );
}
