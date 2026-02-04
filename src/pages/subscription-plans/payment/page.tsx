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

type PaymentMethod = 'upi' | 'card' | 'netbanking' | null;

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleProceedPayment = () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to success page or dashboard
      navigate('/home', { 
        state: { 
          paymentSuccess: true,
          plan: selectedPlan 
        } 
      });
    }, 2000);
  };

  if (!selectedPlan) {
    return null;
  }

  const gstRate = 0.18;
  const baseAmount = selectedPlan.price;
  const gstAmount = baseAmount * gstRate;
  const totalAmount = baseAmount + gstAmount;

  const paymentMethods = [
    {
      id: 'upi' as PaymentMethod,
      name: 'UPI',
      icon: 'ri-smartphone-line',
      description: 'Pay using any UPI app'
    },
    {
      id: 'card' as PaymentMethod,
      name: 'Credit / Debit Card',
      icon: 'ri-bank-card-line',
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'netbanking' as PaymentMethod,
      name: 'Net Banking',
      icon: 'ri-bank-line',
      description: 'All major banks supported'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
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
            <div className="w-16 h-1 bg-green-500 mx-2"></div>

            {/* Step 2 - Completed */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white text-xl"></i>
                </div>
                <span className="text-xs font-medium text-green-600 mt-2 whitespace-nowrap">Confirm Plan</span>
              </div>
            </div>

            {/* Connector */}
            <div className="w-16 h-1 bg-orange-500 mx-2"></div>

            {/* Step 3 - Current */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <span className="text-xs font-medium text-orange-600 mt-2 whitespace-nowrap">Payment</span>
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
            Complete Your Payment
          </h1>
          <p className="text-lg text-gray-600">
            Secure payment for your subscription
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Payment Method
              </h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    disabled={isProcessing}
                    className={`w-full p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      selectedMethod === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                          selectedMethod === method.id
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <i className={`${method.icon} text-2xl`}></i>
                      </div>
                      <div className="ml-4 flex-1 text-left">
                        <div className="font-semibold text-gray-900">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {method.description}
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                          selectedMethod === method.id
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedMethod === method.id && (
                          <i className="ri-check-line text-white text-sm"></i>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Security Note */}
              <div className="flex items-start bg-blue-50 rounded-lg p-4 mt-6 border border-blue-200">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-shield-check-line text-blue-600 text-xl"></i>
                </div>
                <p className="ml-3 text-sm text-blue-900">
                  Your payment information is secure and encrypted. We never store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h3>

              {/* Selected Plan */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 mb-6 border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <i className="ri-vip-crown-line text-white text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {selectedPlan.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {selectedPlan.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Plan Amount</span>
                  <span className="font-semibold text-gray-900">
                    ₹{baseAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold text-gray-900">
                    ₹{gstAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total Payable
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trial Info */}
              <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                <div className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-gift-line text-green-600 text-lg"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-green-900">
                      30 Days Free Trial
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      No charges during trial period
                    </p>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handleProceedPayment}
                disabled={!selectedMethod || isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedMethod && !isProcessing
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="ri-secure-payment-line mr-2"></i>
                    Pay ₹{totalAmount.toFixed(2)}
                  </span>
                )}
              </button>

              {/* Back Button */}
              <button
                onClick={() => navigate('/subscription-plans/confirm-plan', { state: { plan: selectedPlan } })}
                disabled={isProcessing}
                className="w-full mt-3 py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="flex items-center justify-center">
                  <i className="ri-arrow-left-line mr-2"></i>
                  Back
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
