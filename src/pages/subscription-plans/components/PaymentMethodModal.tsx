import { useState } from 'react';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: number;
  } | null;
  onProceed: () => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | null;

export default function PaymentMethodModal({
  isOpen,
  onClose,
  selectedPlan,
  onProceed
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

  if (!isOpen || !selectedPlan) return null;

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

  const handleProceed = () => {
    if (selectedMethod) {
      onProceed();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Subscription
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-gray-600"></i>
          </button>
        </div>

        <div className="p-8">
          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select Payment Method
            </h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    selectedMethod === method.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
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
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Selected Plan</span>
                <span className="font-semibold text-gray-900">
                  {selectedPlan.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Amount</span>
                <span className="font-semibold text-gray-900">
                  ₹{baseAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">GST (18%)</span>
                <span className="font-semibold text-gray-900">
                  ₹{gstAmount.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-300 pt-3 mt-3">
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
          </div>

          {/* Security Note */}
          <div className="flex items-start bg-blue-50 rounded-lg p-4 mb-6">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-shield-check-line text-blue-600 text-xl"></i>
            </div>
            <p className="ml-3 text-sm text-blue-900">
              Your payment information is secure and encrypted. We never store your card details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={!selectedMethod}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                selectedMethod
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center justify-center">
                Proceed to Pay
                <i className="ri-arrow-right-line ml-2"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
