import { useState, useEffect } from 'react';
import { getCurrentPharmacySubscription, updatePharmacySubscription } from '../../../mocks/subscriptionRules';

const OnlineSellingSettings = () => {
  const [subscription, setSubscription] = useState(getCurrentPharmacySubscription());
  const [isOnlineSellingEnabled, setIsOnlineSellingEnabled] = useState(subscription.onlineStoreAddon);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setIsOnlineSellingEnabled(subscription.onlineStoreAddon);
  }, [subscription]);

  const handleEnableOnlineSelling = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmPayment = () => {
    // Mock payment success
    const updatedSubscription = {
      ...subscription,
      onlineStoreAddon: true,
    };
    updatePharmacySubscription(updatedSubscription);
    setSubscription(updatedSubscription);
    setIsOnlineSellingEnabled(true);
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleToggle = () => {
    if (subscription.paymentStatus === 'disabled') {
      alert('Cannot modify online store settings. Payments are disabled by Super Admin.');
      return;
    }
    
    const newStatus = !isOnlineSellingEnabled;
    const updatedSubscription = {
      ...subscription,
      onlineStoreAddon: newStatus,
    };
    updatePharmacySubscription(updatedSubscription);
    setSubscription(updatedSubscription);
    setIsOnlineSellingEnabled(newStatus);
  };

  const canEnableOnlineStore = () => {
    if (subscription.plan === 'enterprise') return true;
    if (subscription.paymentStatus === 'disabled') return false;
    return true;
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-shopping-bag-3-line text-orange-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sell Your Products Online</h2>
              <p className="text-sm text-gray-500">Manage your online store settings</p>
            </div>
          </div>
          {isOnlineSellingEnabled && (
            <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Online Store Active
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* Payment Disabled Warning */}
          {subscription.paymentStatus === 'disabled' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <i className="ri-error-warning-line text-red-600 text-xl"></i>
                <div>
                  <p className="text-sm font-medium text-red-900 mb-1">
                    Payments Disabled by Super Admin
                  </p>
                  <p className="text-xs text-red-700">
                    Contact support to enable online store functionality
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Online Selling Add-on Plan Card */}
          {!isOnlineSellingEnabled && subscription.plan !== 'enterprise' && (
            <div className="border-2 border-orange-200 rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-white">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Online Store Add-on</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-orange-600">₹499</span>
                      <span className="text-sm text-gray-600">/ month</span>
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                    <i className="ri-store-3-line text-orange-600 text-2xl"></i>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-green-600 text-sm"></i>
                    </div>
                    <p className="text-sm text-gray-700">Customer Website &amp; App access</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-green-600 text-sm"></i>
                    </div>
                    <p className="text-sm text-gray-700">Online Orders Management</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-green-600 text-sm"></i>
                    </div>
                    <p className="text-sm text-gray-700">Home Delivery Support</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-green-600 text-sm"></i>
                    </div>
                    <p className="text-sm text-gray-700">Promotional Banners Visibility</p>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <i className="ri-information-line text-orange-600 text-sm mt-0.5"></i>
                    <p className="text-xs text-orange-800">
                      This add-on works only with active subscription. {subscription.plan === 'starter' && 'Upgrade to Professional or Enterprise plan to enable.'}
                    </p>
                  </div>
                </div>

                {/* Enable Button */}
                <button
                  onClick={handleEnableOnlineSelling}
                  disabled={!canEnableOnlineStore()}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap ${
                    canEnableOnlineStore()
                      ? 'bg-orange-600 text-white hover:bg-orange-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <i className="ri-shopping-cart-line mr-2"></i>
                  {subscription.plan === 'starter' ? 'Upgrade Plan to Enable' : 'Enable Online Store'}
                </button>
              </div>
            </div>
          )}

          {/* Enterprise Plan Info */}
          {subscription.plan === 'enterprise' && !isOnlineSellingEnabled && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <i className="ri-vip-crown-line text-blue-600 text-xl"></i>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Online Store Included in Enterprise Plan
                  </p>
                  <p className="text-xs text-blue-700">
                    Enable the toggle below to activate your online store
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Toggle */}
          {(isOnlineSellingEnabled || subscription.plan === 'enterprise') && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">Enable Online Store for Customers</p>
                </div>
                <p className="text-xs text-gray-500">
                  Sell your pharmacy products on customer app &amp; website
                </p>
              </div>
              <button
                onClick={handleToggle}
                disabled={subscription.paymentStatus === 'disabled'}
                className={`relative w-12 h-6 rounded-full transition-colors ml-4 ${
                  subscription.paymentStatus === 'disabled'
                    ? 'bg-gray-300 cursor-not-allowed'
                    : isOnlineSellingEnabled
                    ? 'bg-orange-600 cursor-pointer'
                    : 'bg-gray-300 cursor-pointer'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    isOnlineSellingEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          )}

          {/* When Toggle is ON */}
          {isOnlineSellingEnabled && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-checkbox-circle-line text-green-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900 mb-2">
                      Your online store is now active
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <i className="ri-check-line text-green-600 text-sm"></i>
                        <p className="text-xs text-green-700">
                          Products will sync to customer app
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-check-line text-green-600 text-sm"></i>
                        <p className="text-xs text-green-700">
                          Orders will appear in Orders module
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-check-line text-green-600 text-sm"></i>
                        <p className="text-xs text-green-700">
                          Promotional banners are visible to customers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Online Store Settings */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Online Store Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Accept Online Orders</p>
                      <p className="text-xs text-gray-500">Allow customers to place orders online</p>
                    </div>
                    <button
                      className="relative w-12 h-6 rounded-full transition-colors cursor-pointer bg-orange-600"
                    >
                      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform translate-x-6"></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Show Product Availability</p>
                      <p className="text-xs text-gray-500">Display stock status to customers</p>
                    </div>
                    <button
                      className="relative w-12 h-6 rounded-full transition-colors cursor-pointer bg-orange-600"
                    >
                      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform translate-x-6"></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Enable Home Delivery</p>
                      <p className="text-xs text-gray-500">Offer delivery service to customers</p>
                    </div>
                    <button
                      className="relative w-12 h-6 rounded-full transition-colors cursor-pointer bg-orange-600"
                    >
                      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform translate-x-6"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-store-3-line text-orange-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enable Online Store</h3>
              <p className="text-sm text-gray-600">
                Activate online selling for your pharmacy
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Online Store Add-on</span>
                <span className="text-lg font-bold text-gray-900">₹499/month</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">Total Amount</span>
                  <span className="text-xl font-bold text-orange-600">₹499</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <i className="ri-check-line text-green-600"></i>
                <span>Billed monthly</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <i className="ri-check-line text-green-600"></i>
                <span>Cancel anytime</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Online Store Activated!</h3>
              <p className="text-sm text-gray-600 mb-6">
                Your pharmacy is now visible to customers online. Start receiving orders today!
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnlineSellingSettings;
