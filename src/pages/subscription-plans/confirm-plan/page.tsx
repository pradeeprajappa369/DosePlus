import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export default function ConfirmPlanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    // Get plan from location state
    const plan = location.state?.plan;
    if (!plan) {
      // If no plan selected, redirect back to plans page
      navigate('/subscription-plans');
      return;
    }
    setSelectedPlan(plan);
  }, [location, navigate]);

  const handleContinueToPayment = () => {
    if (selectedPlan) {
      navigate('/subscription-plans/payment', { state: { plan: selectedPlan } });
    }
  };

  const handleChangePlan = () => {
    navigate('/subscription-plans');
  };

  if (!selectedPlan) {
    return null;
  }

  const hasTrial = true; // All plans have 30 days trial

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {/* Step 1 - Completed */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white text-xl"></i>
                </div>
                <span className="text-xs font-medium text-green-600 mt-2 whitespace-nowrap">Select Plan</span>
              </div>
            </div>

            {/* Connector */}
            <div className="w-16 h-1 bg-orange-500 mx-2"></div>

            {/* Step 2 - Current */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <span className="text-xs font-medium text-orange-600 mt-2 whitespace-nowrap">Confirm Plan</span>
              </div>
            </div>

            {/* Connector */}
            <div className="w-16 h-1 bg-gray-300 mx-2"></div>

            {/* Step 3 - Upcoming */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">3</span>
                </div>
                <span className="text-xs font-medium text-gray-500 mt-2 whitespace-nowrap">Payment</span>
              </div>
            </div>

            {/* Connector */}
            <div className="w-16 h-1 bg-gray-300 mx-2"></div>

            {/* Step 4 - Upcoming */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">4</span>
                </div>
                <span className="text-xs font-medium text-gray-500 mt-2 whitespace-nowrap">Success</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Confirm Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Review your selection before proceeding to payment
          </p>
        </div>

        {/* Selected Plan Card */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-orange-500 p-8 mb-8 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-transparent rounded-full -mr-32 -mt-32 opacity-50"></div>

          {/* Popular Badge */}
          {selectedPlan.isPopular && (
            <div className="absolute top-6 right-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                Most Popular
              </span>
            </div>
          )}

          <div className="relative">
            {/* Plan Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <i className="ri-vip-crown-line text-white text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedPlan.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {selectedPlan.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 mb-6">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">
                      ₹{selectedPlan.price}
                    </span>
                    <span className="text-gray-600 ml-2 text-lg">
                      / {selectedPlan.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Billing Cycle: <span className="font-semibold text-gray-900">Monthly</span>
                  </p>
                </div>
              </div>

              {/* Trial Info */}
              {hasTrial && (
                <div className="flex items-center gap-2 bg-white rounded-lg p-4 border border-orange-200">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="ri-gift-line text-white text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      30 Days Free Trial
                    </p>
                    <p className="text-xs text-gray-600">
                      No payment required during trial period
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-checkbox-circle-line text-green-600 mr-2"></i>
                Included Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedPlan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-gray-50 rounded-lg p-3"
                  >
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                      <i className="ri-check-line text-green-600 text-lg"></i>
                    </div>
                    <span className="ml-3 text-gray-700 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-information-line text-blue-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-900 font-medium mb-1">
                    What happens next?
                  </p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Complete payment securely</li>
                    <li>• Instant activation of your plan</li>
                    <li>• Access all features immediately</li>
                    <li>• Cancel anytime during trial period</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleChangePlan}
            className="flex-1 py-4 px-6 rounded-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <span className="flex items-center justify-center">
              <i className="ri-arrow-left-line mr-2"></i>
              Change Plan
            </span>
          </button>
          <button
            onClick={handleContinueToPayment}
            className="flex-1 py-4 px-6 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <span className="flex items-center justify-center">
              Continue to Payment
              <i className="ri-arrow-right-line ml-2"></i>
            </span>
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center">
            <i className="ri-shield-check-line text-green-600 mr-2"></i>
            Secure payment powered by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
}
