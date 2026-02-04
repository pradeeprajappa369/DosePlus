export const purchaseData = [
  {
    id: 'PUR-001',
    supplierId: 'SUP-001',
    supplierName: 'MedLife Pharmaceuticals',
    billNo: 'BILL-2024-001',
    billDate: '2024-01-15',
    totalAmount: 45000,
    paymentStatus: 'Paid',
    items: [
      {
        medicineName: 'Paracetamol 500mg',
        batchNo: 'BATCH-001',
        expiry: '2025-12-31',
        quantity: 500,
        purchasePrice: 30,
        mrp: 50,
        gst: 12
      },
      {
        medicineName: 'Amoxicillin 250mg',
        batchNo: 'BATCH-002',
        expiry: '2025-10-31',
        quantity: 300,
        purchasePrice: 80,
        mrp: 120,
        gst: 12
      }
    ]
  },
  {
    id: 'PUR-002',
    supplierId: 'SUP-002',
    supplierName: 'HealthCare Distributors',
    billNo: 'BILL-2024-002',
    billDate: '2024-01-18',
    totalAmount: 32000,
    paymentStatus: 'Pending',
    items: [
      {
        medicineName: 'Cetirizine 10mg',
        batchNo: 'BATCH-003',
        expiry: '2025-11-30',
        quantity: 400,
        purchasePrice: 40,
        mrp: 65,
        gst: 12
      }
    ]
  },
  {
    id: 'PUR-003',
    supplierId: 'SUP-003',
    supplierName: 'PharmaCorp India',
    billNo: 'BILL-2024-003',
    billDate: '2024-01-20',
    totalAmount: 58000,
    paymentStatus: 'Paid',
    items: [
      {
        medicineName: 'Azithromycin 500mg',
        batchNo: 'BATCH-004',
        expiry: '2025-09-30',
        quantity: 200,
        purchasePrice: 150,
        mrp: 220,
        gst: 12
      },
      {
        medicineName: 'Omeprazole 20mg',
        batchNo: 'BATCH-005',
        expiry: '2025-08-31',
        quantity: 350,
        purchasePrice: 60,
        mrp: 95,
        gst: 12
      }
    ]
  },
  {
    id: 'PUR-004',
    supplierId: 'SUP-001',
    supplierName: 'MedLife Pharmaceuticals',
    billNo: 'BILL-2024-004',
    billDate: '2024-01-22',
    totalAmount: 41000,
    paymentStatus: 'Pending',
    items: [
      {
        medicineName: 'Metformin 500mg',
        batchNo: 'BATCH-006',
        expiry: '2025-07-31',
        quantity: 450,
        purchasePrice: 45,
        mrp: 70,
        gst: 12
      }
    ]
  },
  {
    id: 'PUR-005',
    supplierId: 'SUP-004',
    supplierName: 'Global Meds Supply',
    billNo: 'BILL-2024-005',
    billDate: '2024-01-25',
    totalAmount: 67000,
    paymentStatus: 'Paid',
    items: [
      {
        medicineName: 'Atorvastatin 10mg',
        batchNo: 'BATCH-007',
        expiry: '2025-06-30',
        quantity: 300,
        purchasePrice: 110,
        mrp: 165,
        gst: 12
      },
      {
        medicineName: 'Losartan 50mg',
        batchNo: 'BATCH-008',
        expiry: '2025-05-31',
        quantity: 250,
        purchasePrice: 95,
        mrp: 140,
        gst: 12
      }
    ]
  },
  {
    id: 'PUR-006',
    supplierId: 'SUP-002',
    supplierName: 'HealthCare Distributors',
    billNo: 'BILL-2024-006',
    billDate: '2024-01-28',
    totalAmount: 39000,
    paymentStatus: 'Pending',
    items: [
      {
        medicineName: 'Ciprofloxacin 500mg',
        batchNo: 'BATCH-009',
        expiry: '2025-04-30',
        quantity: 280,
        purchasePrice: 70,
        mrp: 105,
        gst: 12
      }
    ]
  }
];

export const supplierData = [
  {
    id: 'SUP-001',
    name: 'MedLife Pharmaceuticals',
    contact: '+91 98765 43210',
    email: 'contact@medlife.com',
    address: 'Mumbai, Maharashtra'
  },
  {
    id: 'SUP-002',
    name: 'HealthCare Distributors',
    contact: '+91 98765 43211',
    email: 'info@healthcare.com',
    address: 'Delhi, NCR'
  },
  {
    id: 'SUP-003',
    name: 'PharmaCorp India',
    contact: '+91 98765 43212',
    email: 'sales@pharmacorp.com',
    address: 'Bangalore, Karnataka'
  },
  {
    id: 'SUP-004',
    name: 'Global Meds Supply',
    contact: '+91 98765 43213',
    email: 'support@globalmeds.com',
    address: 'Hyderabad, Telangana'
  }
];
