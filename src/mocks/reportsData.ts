export const salesReportData = {
  summary: {
    totalSales: 2847650,
    totalOrders: 1247,
    cashSales: 1124300,
    digitalPayments: 1723350
  },
  dailySales: [
    { date: '2024-01-01', amount: 45200 },
    { date: '2024-01-02', amount: 52300 },
    { date: '2024-01-03', amount: 48900 },
    { date: '2024-01-04', amount: 61200 },
    { date: '2024-01-05', amount: 55800 },
    { date: '2024-01-06', amount: 49300 },
    { date: '2024-01-07', amount: 58700 },
    { date: '2024-01-08', amount: 62400 },
    { date: '2024-01-09', amount: 54200 },
    { date: '2024-01-10', amount: 59800 },
    { date: '2024-01-11', amount: 67300 },
    { date: '2024-01-12', amount: 71200 },
    { date: '2024-01-13', amount: 64800 },
    { date: '2024-01-14', amount: 58900 }
  ],
  monthlySales: [
    { month: 'Jan', amount: 234500 },
    { month: 'Feb', amount: 289300 },
    { month: 'Mar', amount: 312400 },
    { month: 'Apr', amount: 298700 },
    { month: 'May', amount: 345600 },
    { month: 'Jun', amount: 321800 },
    { month: 'Jul', amount: 356200 },
    { month: 'Aug', amount: 289400 },
    { month: 'Sep', amount: 267800 },
    { month: 'Oct', amount: 298500 },
    { month: 'Nov', amount: 312700 },
    { month: 'Dec', amount: 320750 }
  ],
  salesTable: [
    { date: '2024-01-14', invoiceCount: 89, totalAmount: 58900, cash: 23400, digital: 35500 },
    { date: '2024-01-13', invoiceCount: 92, totalAmount: 64800, cash: 28900, digital: 35900 },
    { date: '2024-01-12', invoiceCount: 98, totalAmount: 71200, cash: 31200, digital: 40000 },
    { date: '2024-01-11', invoiceCount: 95, totalAmount: 67300, cash: 29800, digital: 37500 },
    { date: '2024-01-10', invoiceCount: 87, totalAmount: 59800, cash: 25600, digital: 34200 },
    { date: '2024-01-09', invoiceCount: 84, totalAmount: 54200, cash: 22100, digital: 32100 },
    { date: '2024-01-08', invoiceCount: 91, totalAmount: 62400, cash: 27800, digital: 34600 },
    { date: '2024-01-07', invoiceCount: 86, totalAmount: 58700, cash: 24900, digital: 33800 },
    { date: '2024-01-06', invoiceCount: 82, totalAmount: 49300, cash: 21200, digital: 28100 },
    { date: '2024-01-05', invoiceCount: 88, totalAmount: 55800, cash: 23700, digital: 32100 }
  ]
};

export const purchaseReportData = {
  summary: {
    totalPurchase: 1847250,
    numberOfBills: 342,
    pendingPayments: 234500
  },
  monthlyPurchase: [
    { month: 'Jan', amount: 145600 },
    { month: 'Feb', amount: 178900 },
    { month: 'Mar', amount: 198400 },
    { month: 'Apr', amount: 167800 },
    { month: 'May', amount: 189300 },
    { month: 'Jun', amount: 156700 },
    { month: 'Jul', amount: 201200 },
    { month: 'Aug', amount: 145800 },
    { month: 'Sep', amount: 134900 },
    { month: 'Oct', amount: 156700 },
    { month: 'Nov', amount: 178450 },
    { month: 'Dec', amount: 193500 }
  ],
  purchaseTable: [
    { id: 1, supplier: 'MedLife Pharma Distributors', billNo: 'PB-2024-0342', date: '2024-01-14', amount: 45600, status: 'Paid' },
    { id: 2, supplier: 'HealthCare Wholesale Ltd', billNo: 'PB-2024-0341', date: '2024-01-13', amount: 67800, status: 'Pending' },
    { id: 3, supplier: 'Apollo Medical Supplies', billNo: 'PB-2024-0340', date: '2024-01-12', amount: 89200, status: 'Paid' },
    { id: 4, supplier: 'Cipla Pharmaceuticals', billNo: 'PB-2024-0339', date: '2024-01-11', amount: 123400, status: 'Pending' },
    { id: 5, supplier: 'Sun Pharma Distributors', billNo: 'PB-2024-0338', date: '2024-01-10', amount: 56700, status: 'Paid' },
    { id: 6, supplier: 'Dr. Reddy\'s Laboratories', billNo: 'PB-2024-0337', date: '2024-01-09', amount: 78900, status: 'Paid' },
    { id: 7, supplier: 'Lupin Pharmaceuticals', billNo: 'PB-2024-0336', date: '2024-01-08', amount: 45300, status: 'Pending' },
    { id: 8, supplier: 'Torrent Pharma Supplies', billNo: 'PB-2024-0335', date: '2024-01-07', amount: 92100, status: 'Paid' },
    { id: 9, supplier: 'Zydus Healthcare', billNo: 'PB-2024-0334', date: '2024-01-06', amount: 67400, status: 'Paid' },
    { id: 10, supplier: 'Alkem Laboratories Ltd', billNo: 'PB-2024-0333', date: '2024-01-05', amount: 54800, status: 'Pending' }
  ]
};

export const inventoryReportData = {
  summary: {
    totalStockValue: 3456780,
    lowStockItems: 47,
    expiringSoonItems: 23
  },
  lowStockReport: [
    { id: 1, medicineName: 'Paracetamol 500mg', currentStock: 45, reorderLevel: 100, status: 'Critical' },
    { id: 2, medicineName: 'Amoxicillin 250mg', currentStock: 78, reorderLevel: 150, status: 'Low' },
    { id: 3, medicineName: 'Azithromycin 500mg', currentStock: 32, reorderLevel: 80, status: 'Critical' },
    { id: 4, medicineName: 'Ciprofloxacin 500mg', currentStock: 56, reorderLevel: 120, status: 'Low' },
    { id: 5, medicineName: 'Metformin 500mg', currentStock: 89, reorderLevel: 200, status: 'Low' },
    { id: 6, medicineName: 'Atorvastatin 10mg', currentStock: 41, reorderLevel: 100, status: 'Critical' },
    { id: 7, medicineName: 'Omeprazole 20mg', currentStock: 67, reorderLevel: 150, status: 'Low' },
    { id: 8, medicineName: 'Losartan 50mg', currentStock: 38, reorderLevel: 90, status: 'Critical' },
    { id: 9, medicineName: 'Amlodipine 5mg', currentStock: 72, reorderLevel: 140, status: 'Low' },
    { id: 10, medicineName: 'Levothyroxine 50mcg', currentStock: 54, reorderLevel: 120, status: 'Low' }
  ],
  expiryReport: [
    { id: 1, medicineName: 'Cefixime 200mg', batch: 'CF2401', expiryDate: '2024-02-15', daysLeft: 32, status: 'Critical' },
    { id: 2, medicineName: 'Doxycycline 100mg', batch: 'DX2402', expiryDate: '2024-03-10', daysLeft: 56, status: 'Warning' },
    { id: 3, medicineName: 'Pantoprazole 40mg', batch: 'PT2403', expiryDate: '2024-02-28', daysLeft: 45, status: 'Warning' },
    { id: 4, medicineName: 'Montelukast 10mg', batch: 'MT2401', expiryDate: '2024-02-20', daysLeft: 37, status: 'Critical' },
    { id: 5, medicineName: 'Cetirizine 10mg', batch: 'CT2404', expiryDate: '2024-03-25', daysLeft: 71, status: 'Warning' },
    { id: 6, medicineName: 'Ranitidine 150mg', batch: 'RN2402', expiryDate: '2024-02-18', daysLeft: 35, status: 'Critical' },
    { id: 7, medicineName: 'Diclofenac 50mg', batch: 'DC2403', expiryDate: '2024-03-15', daysLeft: 61, status: 'Warning' },
    { id: 8, medicineName: 'Ibuprofen 400mg', batch: 'IB2401', expiryDate: '2024-02-25', daysLeft: 42, status: 'Warning' },
    { id: 9, medicineName: 'Aspirin 75mg', batch: 'AS2402', expiryDate: '2024-02-12', daysLeft: 29, status: 'Critical' },
    { id: 10, medicineName: 'Gabapentin 300mg', batch: 'GB2403', expiryDate: '2024-03-20', daysLeft: 66, status: 'Warning' }
  ]
};

export const gstReportData = {
  summary: {
    totalTaxCollected: 456780,
    cgst: 228390,
    sgst: 228390,
    igst: 0
  },
  gstTable: [
    { id: 1, invoiceNo: 'INV-2024-1247', date: '2024-01-14', taxableAmount: 54200, gstAmount: 9756, cgst: 4878, sgst: 4878 },
    { id: 2, invoiceNo: 'INV-2024-1246', date: '2024-01-14', taxableAmount: 32800, gstAmount: 5904, cgst: 2952, sgst: 2952 },
    { id: 3, invoiceNo: 'INV-2024-1245', date: '2024-01-13', taxableAmount: 67900, gstAmount: 12222, cgst: 6111, sgst: 6111 },
    { id: 4, invoiceNo: 'INV-2024-1244', date: '2024-01-13', taxableAmount: 45600, gstAmount: 8208, cgst: 4104, sgst: 4104 },
    { id: 5, invoiceNo: 'INV-2024-1243', date: '2024-01-12', taxableAmount: 89300, gstAmount: 16074, cgst: 8037, sgst: 8037 },
    { id: 6, invoiceNo: 'INV-2024-1242', date: '2024-01-12', taxableAmount: 56700, gstAmount: 10206, cgst: 5103, sgst: 5103 },
    { id: 7, invoiceNo: 'INV-2024-1241', date: '2024-01-11', taxableAmount: 78400, gstAmount: 14112, cgst: 7056, sgst: 7056 },
    { id: 8, invoiceNo: 'INV-2024-1240', date: '2024-01-11', taxableAmount: 43200, gstAmount: 7776, cgst: 3888, sgst: 3888 },
    { id: 9, invoiceNo: 'INV-2024-1239', date: '2024-01-10', taxableAmount: 61800, gstAmount: 11124, cgst: 5562, sgst: 5562 },
    { id: 10, invoiceNo: 'INV-2024-1238', date: '2024-01-10', taxableAmount: 52900, gstAmount: 9522, cgst: 4761, sgst: 4761 }
  ]
};

export const customerReportData = {
  summary: {
    totalCustomers: 2847,
    repeatCustomers: 1456,
    topCustomerSpend: 234500
  },
  customerTable: [
    { id: 1, name: 'Rajesh Kumar', ordersCount: 47, totalSpend: 234500, lastPurchase: '2024-01-14', status: 'VIP' },
    { id: 2, name: 'Priya Sharma', ordersCount: 38, totalSpend: 189300, lastPurchase: '2024-01-13', status: 'Regular' },
    { id: 3, name: 'Amit Patel', ordersCount: 42, totalSpend: 198700, lastPurchase: '2024-01-14', status: 'Regular' },
    { id: 4, name: 'Sneha Reddy', ordersCount: 35, totalSpend: 167800, lastPurchase: '2024-01-12', status: 'Regular' },
    { id: 5, name: 'Vikram Singh', ordersCount: 51, totalSpend: 256900, lastPurchase: '2024-01-14', status: 'VIP' },
    { id: 6, name: 'Anita Desai', ordersCount: 29, totalSpend: 145600, lastPurchase: '2024-01-11', status: 'Regular' },
    { id: 7, name: 'Suresh Iyer', ordersCount: 44, totalSpend: 212300, lastPurchase: '2024-01-13', status: 'VIP' },
    { id: 8, name: 'Kavita Nair', ordersCount: 31, totalSpend: 156700, lastPurchase: '2024-01-10', status: 'Regular' },
    { id: 9, name: 'Rahul Verma', ordersCount: 39, totalSpend: 178900, lastPurchase: '2024-01-12', status: 'Regular' },
    { id: 10, name: 'Deepa Menon', ordersCount: 46, totalSpend: 223400, lastPurchase: '2024-01-14', status: 'VIP' }
  ]
};
