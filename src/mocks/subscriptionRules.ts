export const PLAN_FEATURES = {
  starter: {
    inventory: true,
    sales: true,
    customers: true,
    reports: false,
    onlineStore: false,
    purchase: true,
    suppliers: true,
    offers: false,
  },
  professional: {
    inventory: true,
    sales: true,
    customers: true,
    reports: true,
    onlineStore: false, // Requires add-on
    purchase: true,
    suppliers: true,
    offers: true,
  },
  enterprise: {
    inventory: true,
    sales: true,
    customers: true,
    reports: true,
    onlineStore: true, // Included
    purchase: true,
    suppliers: true,
    offers: true,
  },
};

export const PAYMENT_STATUS_EFFECTS = {
  paid: {
    lockModules: [],
    showWarning: false,
    message: '',
  },
  pending: {
    lockModules: [],
    showWarning: true,
    message: 'Payment pending. Please complete payment to avoid service interruption.',
  },
  disabled: {
    lockModules: ['sales', 'purchase', 'orders'],
    showWarning: true,
    message: 'Payments disabled by Super Admin. Contact support for assistance.',
  },
};

export interface PharmacySubscription {
  pharmacyId: string;
  pharmacyName: string;
  plan: 'starter' | 'professional' | 'enterprise';
  paymentStatus: 'paid' | 'pending' | 'disabled';
  onlineStoreAddon: boolean;
  expiryDate: string;
  lastPaymentDate: string;
}

// Mock current pharmacy subscription (in real app, fetch from API)
export const getCurrentPharmacySubscription = (): PharmacySubscription => {
  // This would be fetched from localStorage or API
  const stored = localStorage.getItem('pharmacySubscription');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default subscription
  return {
    pharmacyId: 'PH001',
    pharmacyName: 'City Care Pharmacy',
    plan: 'professional',
    paymentStatus: 'paid',
    onlineStoreAddon: true,
    expiryDate: '2025-12-31',
    lastPaymentDate: '2025-01-15',
  };
};

export const updatePharmacySubscription = (subscription: PharmacySubscription) => {
  localStorage.setItem('pharmacySubscription', JSON.stringify(subscription));
};

export const isFeatureAccessible = (feature: string): boolean => {
  const subscription = getCurrentPharmacySubscription();
  const planFeatures = PLAN_FEATURES[subscription.plan];
  const paymentEffects = PAYMENT_STATUS_EFFECTS[subscription.paymentStatus];
  
  // Check if payment status locks this module
  if (paymentEffects.lockModules.includes(feature)) {
    return false;
  }
  
  // Check plan features
  if (feature === 'onlineStore') {
    if (subscription.plan === 'enterprise') {
      return true;
    }
    return subscription.onlineStoreAddon;
  }
  
  return planFeatures[feature as keyof typeof planFeatures] || false;
};

export const getAccessDeniedMessage = (feature: string): string => {
  const subscription = getCurrentPharmacySubscription();
  const paymentEffects = PAYMENT_STATUS_EFFECTS[subscription.paymentStatus];
  
  if (paymentEffects.lockModules.includes(feature)) {
    return paymentEffects.message;
  }
  
  if (feature === 'onlineStore') {
    if (subscription.plan === 'starter') {
      return 'Online Store is not available in Starter plan. Upgrade to Professional or Enterprise plan.';
    }
    if (subscription.plan === 'professional' && !subscription.onlineStoreAddon) {
      return 'Online Store add-on is not active. Please purchase the add-on to enable this feature.';
    }
  }
  
  return `This feature is not available in your current ${subscription.plan} plan. Please upgrade to access this module.`;
};
