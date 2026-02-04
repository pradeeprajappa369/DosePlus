import React from 'react';
import { getCurrentPharmacySubscription } from '../../../mocks/subscriptionRules';

interface FeatureLockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  message: string;
}

const FeatureLockedModal: React.FC<FeatureLockedModalProps> = ({
  isOpen,
  onClose,
  feature,
  message,
}) => {
  const subscription = getCurrentPharmacySubscription();

  if (!isOpen) return null;

  const getUpgradeOptions = () => {
    if (subscription.paymentStatus === 'disabled') {
      return (
        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
            Contact Super Admin
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      );
    }

    if (subscription.paymentStatus === 'pending') {
      return (
        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors">
            Complete Payment
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <button className="w-full px-4 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
          Upgrade Plan
        </button>
        {feature === 'onlineStore' && subscription.plan === 'professional' && (
          <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Purchase Online Store Add-on
          </button>
        )}
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Maybe Later
        </button>
      </div>
    );
  };

  const getIcon = () => {
    if (subscription.paymentStatus === 'disabled') {
      return <i className="ri-error-warning-fill text-5xl text-red-500"></i>;
    }
    if (subscription.paymentStatus === 'pending') {
      return <i className="ri-alert-fill text-5xl text-amber-500"></i>;
    }
    return <i className="ri-lock-fill text-5xl text-gray-400"></i>;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        <div className="text-center mb-6">
          {getIcon()}
          <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
            {subscription.paymentStatus === 'disabled' ? 'Feature Restricted' : 'Feature Locked'}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Current Plan</span>
            <span className="font-semibold text-gray-900 capitalize">{subscription.plan}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Payment Status</span>
            <span className={`font-semibold capitalize ${
              subscription.paymentStatus === 'paid' ? 'text-green-600' :
              subscription.paymentStatus === 'pending' ? 'text-amber-600' :
              'text-red-600'
            }`}>
              {subscription.paymentStatus}
            </span>
          </div>
          {feature === 'onlineStore' && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Online Store Add-on</span>
              <span className={`font-semibold ${subscription.onlineStoreAddon ? 'text-green-600' : 'text-gray-400'}`}>
                {subscription.onlineStoreAddon ? 'Active' : 'Inactive'}
              </span>
            </div>
          )}
        </div>

        {getUpgradeOptions()}
      </div>
    </div>
  );
};

export default FeatureLockedModal;
