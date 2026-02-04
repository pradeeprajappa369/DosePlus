interface SubscriptionBannerProps {
  status: 'trial' | 'active' | 'expired';
  daysLeft?: number;
  planName?: string;
  expiryDate?: string;
}

const SubscriptionBanner = ({ status, daysLeft, planName, expiryDate }: SubscriptionBannerProps) => {
  const handleUpgrade = () => {
    if (window.REACT_APP_NAVIGATE) {
      window.REACT_APP_NAVIGATE('/subscription-plans');
    }
  };

  if (status === 'trial') {
    return (
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 border-l-4 border-teal-700 shadow-md">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-2xl text-white"></i>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Free Trial – {daysLeft} Days Left</h3>
              <p className="text-teal-50 text-sm">Upgrade now to unlock all premium features</p>
            </div>
          </div>
          <button
            onClick={handleUpgrade}
            className="px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
          >
            <i className="ri-vip-crown-line mr-2"></i>
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className="bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-700 shadow-md">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-2xl text-white"></i>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Current Plan: {planName}</h3>
              <p className="text-green-50 text-sm">
                <i className="ri-calendar-line mr-1"></i>
                Expires on {expiryDate}
              </p>
            </div>
          </div>
          <button
            onClick={handleUpgrade}
            className="px-6 py-3 bg-white/10 text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-settings-3-line mr-2"></i>
            Manage Plan
          </button>
        </div>
      </div>
    );
  }

  if (status === 'expired') {
    return (
      <div className="bg-gradient-to-r from-red-500 to-red-600 border-l-4 border-red-700 shadow-md">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ri-error-warning-line text-2xl text-white"></i>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Subscription Expired</h3>
              <p className="text-red-50 text-sm">Renew your subscription to continue using premium features</p>
            </div>
          </div>
          <button
            onClick={handleUpgrade}
            className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap animate-pulse"
          >
            <i className="ri-refresh-line mr-2"></i>
            Renew Subscription
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SubscriptionBanner;
