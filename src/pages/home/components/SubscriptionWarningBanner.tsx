import React from 'react';
import { getCurrentPharmacySubscription, PAYMENT_STATUS_EFFECTS } from '../../../mocks/subscriptionRules';

const SubscriptionWarningBanner: React.FC = () => {
  const subscription = getCurrentPharmacySubscription();
  const paymentEffects = PAYMENT_STATUS_EFFECTS[subscription.paymentStatus];

  if (!paymentEffects.showWarning) {
    return null;
  }

  const getBannerColor = () => {
    if (subscription.paymentStatus === 'disabled') {
      return 'bg-red-50 border-red-200 text-red-800';
    }
    return 'bg-amber-50 border-amber-200 text-amber-800';
  };

  const getIcon = () => {
    if (subscription.paymentStatus === 'disabled') {
      return <i className="ri-error-warning-line text-xl"></i>;
    }
    return <i className="ri-alert-line text-xl"></i>;
  };

  return (
    <div className={`border-l-4 p-4 mb-6 rounded-lg ${getBannerColor()}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm mb-1">
                {subscription.paymentStatus === 'disabled' ? 'Account Restricted' : 'Payment Attention Required'}
              </p>
              <p className="text-sm">
                {paymentEffects.message}
              </p>
            </div>
            {subscription.paymentStatus === 'pending' && (
              <button className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap ml-4">
                Complete Payment
              </button>
            )}
            {subscription.paymentStatus === 'disabled' && (
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap ml-4">
                Contact Support
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionWarningBanner;
