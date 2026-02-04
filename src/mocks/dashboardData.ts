export const kpiData = {
  todayOrders: {
    count: 47,
    trend: '+12%',
    trendUp: true
  },
  todayRevenue: {
    amount: 28450,
    trend: '+8%',
    trendUp: true
  },
  lowStockItems: {
    count: 12,
    trend: '+3',
    trendUp: false
  },
  expiringSoon: {
    count: 8,
    trend: '30 days',
    trendUp: false
  }
};

export const recentOrders = [
  {
    id: 'ORD-2024-1847',
    customerName: 'Rajesh Kumar',
    itemsCount: 5,
    totalAmount: 1250,
    status: 'New',
    time: '10:45 AM'
  },
  {
    id: 'ORD-2024-1846',
    customerName: 'Priya Sharma',
    itemsCount: 3,
    totalAmount: 890,
    status: 'Confirmed',
    time: '10:30 AM'
  },
  {
    id: 'ORD-2024-1845',
    customerName: 'Amit Patel',
    itemsCount: 8,
    totalAmount: 2340,
    status: 'Packed',
    time: '10:15 AM'
  },
  {
    id: 'ORD-2024-1844',
    customerName: 'Sneha Reddy',
    itemsCount: 2,
    totalAmount: 450,
    status: 'Delivered',
    time: '09:50 AM'
  },
  {
    id: 'ORD-2024-1843',
    customerName: 'Vikram Singh',
    itemsCount: 6,
    totalAmount: 1680,
    status: 'Confirmed',
    time: '09:30 AM'
  },
  {
    id: 'ORD-2024-1842',
    customerName: 'Anita Desai',
    itemsCount: 4,
    totalAmount: 920,
    status: 'Packed',
    time: '09:10 AM'
  }
];

export const lowStockItems = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    currentStock: 45,
    minStock: 100,
    unit: 'strips'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    currentStock: 28,
    minStock: 80,
    unit: 'strips'
  },
  {
    id: 3,
    name: 'Cetirizine 10mg',
    currentStock: 35,
    minStock: 100,
    unit: 'strips'
  },
  {
    id: 4,
    name: 'Metformin 500mg',
    currentStock: 52,
    minStock: 120,
    unit: 'strips'
  },
  {
    id: 5,
    name: 'Aspirin 75mg',
    currentStock: 18,
    minStock: 60,
    unit: 'strips'
  },
  {
    id: 6,
    name: 'Ibuprofen 400mg',
    currentStock: 22,
    minStock: 90,
    unit: 'strips'
  },
  {
    id: 7,
    name: 'Vitamin D3 1000IU',
    currentStock: 40,
    minStock: 150,
    unit: 'bottles'
  }
];

export const expiringItems = [
  {
    id: 1,
    name: 'Azithromycin 500mg',
    batchNumber: 'BTH-2024-A847',
    expiryDate: '2024-05-15',
    daysLeft: 12
  },
  {
    id: 2,
    name: 'Ciprofloxacin 500mg',
    batchNumber: 'BTH-2024-C293',
    expiryDate: '2024-05-20',
    daysLeft: 17
  },
  {
    id: 3,
    name: 'Omeprazole 20mg',
    batchNumber: 'BTH-2024-O156',
    expiryDate: '2024-05-28',
    daysLeft: 25
  },
  {
    id: 4,
    name: 'Pantoprazole 40mg',
    batchNumber: 'BTH-2024-P482',
    expiryDate: '2024-06-02',
    daysLeft: 30
  },
  {
    id: 5,
    name: 'Diclofenac 50mg',
    batchNumber: 'BTH-2024-D729',
    expiryDate: '2024-05-10',
    daysLeft: 7
  },
  {
    id: 6,
    name: 'Clopidogrel 75mg',
    batchNumber: 'BTH-2024-C891',
    expiryDate: '2024-06-15',
    daysLeft: 43
  },
  {
    id: 7,
    name: 'Atorvastatin 20mg',
    batchNumber: 'BTH-2024-A562',
    expiryDate: '2024-06-25',
    daysLeft: 53
  },
  {
    id: 8,
    name: 'Losartan 50mg',
    batchNumber: 'BTH-2024-L234',
    expiryDate: '2024-05-08',
    daysLeft: 5
  }
];

export const notifications = [
  {
    id: 1,
    text: '5 medicines expiring in next 7 days',
    time: '2 min ago',
    type: 'warning',
    icon: 'ri-alert-line'
  },
  {
    id: 2,
    text: 'New order #ORD-2024-1847 received',
    time: '5 min ago',
    type: 'info',
    icon: 'ri-shopping-cart-line'
  },
  {
    id: 3,
    text: 'Low stock alert for Aspirin 75mg',
    time: '15 min ago',
    type: 'alert',
    icon: 'ri-error-warning-line'
  },
  {
    id: 4,
    text: 'Purchase bill uploaded successfully',
    time: '1 hour ago',
    type: 'success',
    icon: 'ri-check-line'
  }
];
