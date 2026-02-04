export const platformKPIData = {
  totalPharmacies: {
    value: 247,
    trend: 12.5,
    isPositive: true,
    change: '+12 this month'
  },
  activeSubscriptions: {
    value: 189,
    trend: 8.3,
    isPositive: true,
    change: '76% active rate'
  },
  monthlyRevenue: {
    value: 1245890,
    trend: 18.2,
    isPositive: true,
    change: '+18% from last month'
  },
  expiredSubscriptions: {
    value: 34,
    trend: -5.2,
    isPositive: true,
    change: '-5.2% from last month'
  },
  onlineStoresEnabled: {
    value: 134,
    trend: 15.8,
    isPositive: true,
    change: '54% of total'
  },
  averagePlanValue: {
    value: 6589,
    trend: 7.4,
    isPositive: true,
    change: '+7.4% growth'
  }
};

export const subscriptionGrowthData = [
  { month: 'Jan', starter: 45, professional: 32, enterprise: 18 },
  { month: 'Feb', starter: 52, professional: 38, enterprise: 21 },
  { month: 'Mar', starter: 58, professional: 42, enterprise: 23 },
  { month: 'Apr', starter: 62, professional: 46, enterprise: 25 },
  { month: 'May', starter: 65, professional: 50, enterprise: 26 },
  { month: 'Jun', starter: 68, professional: 52, enterprise: 27 }
];

export const revenueByPlanData = [
  { month: 'Jan', starter: 135000, professional: 256000, enterprise: 405000 },
  { month: 'Feb', starter: 156000, professional: 304000, enterprise: 472500 },
  { month: 'Mar', starter: 174000, professional: 336000, enterprise: 517500 },
  { month: 'Apr', starter: 186000, professional: 368000, enterprise: 562500 },
  { month: 'May', starter: 195000, professional: 400000, enterprise: 585000 },
  { month: 'Jun', starter: 204000, professional: 416000, enterprise: 607500 }
];

export const pharmacyActivityData = [
  { status: 'Active', count: 189, percentage: 76.5, color: '#10B981' },
  { status: 'Inactive', count: 34, percentage: 13.8, color: '#F59E0B' },
  { status: 'Suspended', count: 24, percentage: 9.7, color: '#EF4444' }
];

export const featureUsageData = [
  { feature: 'Online Store', enabled: 134, disabled: 113, percentage: 54.3 },
  { feature: 'AI Search', enabled: 178, disabled: 69, percentage: 72.1 },
  { feature: 'WhatsApp Notifications', enabled: 156, disabled: 91, percentage: 63.2 },
  { feature: 'Multi-location', enabled: 89, disabled: 158, percentage: 36.0 },
  { feature: 'Advanced Reports', enabled: 142, disabled: 105, percentage: 57.5 }
];

export const pharmacyReportData = [
  {
    id: 'PH001',
    pharmacyName: 'MedCare Pharmacy',
    plan: 'Professional',
    subscriptionStatus: 'Active',
    startDate: '2024-01-15',
    expiryDate: '2025-01-15',
    onlineStore: 'Yes',
    status: 'Active',
    monthlyRevenue: 45000,
    loginFrequency: 28
  },
  {
    id: 'PH002',
    pharmacyName: 'HealthPlus Chemist',
    plan: 'Enterprise',
    subscriptionStatus: 'Active',
    startDate: '2023-11-20',
    expiryDate: '2024-11-20',
    onlineStore: 'Yes',
    status: 'Active',
    monthlyRevenue: 78000,
    loginFrequency: 30
  },
  {
    id: 'PH003',
    pharmacyName: 'Apollo Pharmacy',
    plan: 'Starter',
    subscriptionStatus: 'Expired',
    startDate: '2023-12-01',
    expiryDate: '2024-12-01',
    onlineStore: 'No',
    status: 'Active',
    monthlyRevenue: 22000,
    loginFrequency: 12
  },
  {
    id: 'PH004',
    pharmacyName: 'WellCare Drugstore',
    plan: 'Professional',
    subscriptionStatus: 'Active',
    startDate: '2024-02-10',
    expiryDate: '2025-02-10',
    onlineStore: 'Yes',
    status: 'Active',
    monthlyRevenue: 52000,
    loginFrequency: 26
  },
  {
    id: 'PH005',
    pharmacyName: 'LifeLine Pharmacy',
    plan: 'Trial',
    subscriptionStatus: 'Trial',
    startDate: '2024-03-01',
    expiryDate: '2024-04-01',
    onlineStore: 'No',
    status: 'Active',
    monthlyRevenue: 8500,
    loginFrequency: 15
  },
  {
    id: 'PH006',
    pharmacyName: 'CureWell Pharmacy',
    plan: 'Enterprise',
    subscriptionStatus: 'Active',
    startDate: '2023-10-15',
    expiryDate: '2024-10-15',
    onlineStore: 'Yes',
    status: 'Suspended',
    monthlyRevenue: 65000,
    loginFrequency: 8
  },
  {
    id: 'PH007',
    pharmacyName: 'MediQuick Store',
    plan: 'Starter',
    subscriptionStatus: 'Active',
    startDate: '2024-01-20',
    expiryDate: '2025-01-20',
    onlineStore: 'No',
    status: 'Active',
    monthlyRevenue: 18000,
    loginFrequency: 22
  },
  {
    id: 'PH008',
    pharmacyName: 'HealthFirst Chemist',
    plan: 'Professional',
    subscriptionStatus: 'Expired',
    startDate: '2023-09-10',
    expiryDate: '2024-09-10',
    onlineStore: 'No',
    status: 'Active',
    monthlyRevenue: 38000,
    loginFrequency: 10
  },
  {
    id: 'PH009',
    pharmacyName: 'QuickMed Pharmacy',
    plan: 'Trial',
    subscriptionStatus: 'Trial',
    startDate: '2024-03-10',
    expiryDate: '2024-04-10',
    onlineStore: 'Yes',
    status: 'Active',
    monthlyRevenue: 6200,
    loginFrequency: 18
  },
  {
    id: 'PH010',
    pharmacyName: 'MedExpress Store',
    plan: 'Enterprise',
    subscriptionStatus: 'Active',
    startDate: '2023-12-15',
    expiryDate: '2024-12-15',
    onlineStore: 'Yes',
    status: 'Active',
    monthlyRevenue: 72000,
    loginFrequency: 29
  },
  {
    id: 'PH011',
    pharmacyName: 'CarePlus Pharmacy',
    plan: 'Starter',
    subscriptionStatus: 'Active',
    startDate: '2024-02-01',
    expiryDate: '2025-02-01',
    onlineStore: 'No',
    status: 'Active',
    monthlyRevenue: 15000,
    loginFrequency: 20
  },
  {
    id: 'PH012',
    pharmacyName: 'TrustMed Chemist',
    plan: 'Professional',
    subscriptionStatus: 'Active',
    startDate: '2024-01-05',
    expiryDate: '2025-01-05',
    onlineStore: 'No',
    status: 'Active',
    monthlyRevenue: 42000,
    loginFrequency: 24
  }
];
