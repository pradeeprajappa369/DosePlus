export const salesData = [
  {
    id: 'INV-2024-001',
    invoiceNo: 'INV-2024-001',
    date: '2024-01-15',
    time: '10:30 AM',
    customerName: 'Rajesh Kumar',
    customerMobile: '+91 98765 43210',
    paymentMode: 'UPI',
    items: [
      { id: 1, name: 'Paracetamol 500mg', quantity: 2, price: 15, total: 30 },
      { id: 2, name: 'Crocin Advance', quantity: 1, price: 45, total: 45 }
    ],
    subtotal: 75,
    gst: 9,
    discount: 5,
    grandTotal: 79,
    status: 'Completed',
    profit: 15
  },
  {
    id: 'INV-2024-002',
    invoiceNo: 'INV-2024-002',
    date: '2024-01-15',
    time: '11:15 AM',
    customerName: 'Priya Sharma',
    customerMobile: '+91 98765 43211',
    paymentMode: 'Cash',
    items: [
      { id: 1, name: 'Dolo 650mg', quantity: 3, price: 25, total: 75 },
      { id: 2, name: 'Vicks Vaporub', quantity: 1, price: 120, total: 120 }
    ],
    subtotal: 195,
    gst: 23.4,
    discount: 10,
    grandTotal: 208.4,
    status: 'Completed',
    profit: 35
  },
  {
    id: 'INV-2024-003',
    invoiceNo: 'INV-2024-003',
    date: '2024-01-15',
    time: '12:45 PM',
    customerName: 'Amit Patel',
    customerMobile: '+91 98765 43212',
    paymentMode: 'Card',
    items: [
      { id: 1, name: 'Azithromycin 500mg', quantity: 1, price: 180, total: 180 },
      { id: 2, name: 'Vitamin D3', quantity: 2, price: 250, total: 500 }
    ],
    subtotal: 680,
    gst: 81.6,
    discount: 0,
    grandTotal: 761.6,
    status: 'Completed',
    profit: 120
  },
  {
    id: 'INV-2024-004',
    invoiceNo: 'INV-2024-004',
    date: '2024-01-15',
    time: '02:20 PM',
    customerName: 'Sneha Reddy',
    customerMobile: '+91 98765 43213',
    paymentMode: 'UPI',
    items: [
      { id: 1, name: 'Cetrizine 10mg', quantity: 2, price: 12, total: 24 },
      { id: 2, name: 'Cough Syrup', quantity: 1, price: 85, total: 85 }
    ],
    subtotal: 109,
    gst: 13.08,
    discount: 0,
    grandTotal: 122.08,
    status: 'Completed',
    profit: 22
  },
  {
    id: 'INV-2024-005',
    invoiceNo: 'INV-2024-005',
    date: '2024-01-15',
    time: '03:50 PM',
    customerName: 'Vikram Singh',
    customerMobile: '+91 98765 43214',
    paymentMode: 'Cash',
    items: [
      { id: 1, name: 'Insulin Glargine', quantity: 1, price: 1200, total: 1200 }
    ],
    subtotal: 1200,
    gst: 144,
    discount: 50,
    grandTotal: 1294,
    status: 'Completed',
    profit: 180
  },
  {
    id: 'INV-2024-006',
    invoiceNo: 'INV-2024-006',
    date: '2024-01-14',
    time: '09:30 AM',
    customerName: 'Meera Iyer',
    customerMobile: '+91 98765 43215',
    paymentMode: 'UPI',
    items: [
      { id: 1, name: 'Omeprazole 20mg', quantity: 2, price: 35, total: 70 },
      { id: 2, name: 'Pantoprazole', quantity: 1, price: 55, total: 55 }
    ],
    subtotal: 125,
    gst: 15,
    discount: 0,
    grandTotal: 140,
    status: 'Completed',
    profit: 28
  },
  {
    id: 'INV-2024-007',
    invoiceNo: 'INV-2024-007',
    date: '2024-01-14',
    time: '11:00 AM',
    customerName: 'Arjun Mehta',
    customerMobile: '+91 98765 43216',
    paymentMode: 'Card',
    items: [
      { id: 1, name: 'Metformin 500mg', quantity: 3, price: 45, total: 135 },
      { id: 2, name: 'Glimepiride 2mg', quantity: 2, price: 65, total: 130 }
    ],
    subtotal: 265,
    gst: 31.8,
    discount: 15,
    grandTotal: 281.8,
    status: 'Returned',
    profit: 0
  },
  {
    id: 'INV-2024-008',
    invoiceNo: 'INV-2024-008',
    date: '2024-01-14',
    time: '01:15 PM',
    customerName: 'Kavya Nair',
    customerMobile: '+91 98765 43217',
    paymentMode: 'Cash',
    items: [
      { id: 1, name: 'Amoxicillin 500mg', quantity: 2, price: 95, total: 190 },
      { id: 2, name: 'Paracetamol Syrup', quantity: 1, price: 65, total: 65 }
    ],
    subtotal: 255,
    gst: 30.6,
    discount: 10,
    grandTotal: 275.6,
    status: 'Completed',
    profit: 45
  },
  {
    id: 'INV-2024-009',
    invoiceNo: 'INV-2024-009',
    date: '2024-01-13',
    time: '10:45 AM',
    customerName: 'Rohit Gupta',
    customerMobile: '+91 98765 43218',
    paymentMode: 'UPI',
    items: [
      { id: 1, name: 'Aspirin 75mg', quantity: 3, price: 18, total: 54 },
      { id: 2, name: 'Atorvastatin 10mg', quantity: 2, price: 85, total: 170 }
    ],
    subtotal: 224,
    gst: 26.88,
    discount: 0,
    grandTotal: 250.88,
    status: 'Completed',
    profit: 42
  },
  {
    id: 'INV-2024-010',
    invoiceNo: 'INV-2024-010',
    date: '2024-01-13',
    time: '02:30 PM',
    customerName: 'Ananya Das',
    customerMobile: '+91 98765 43219',
    paymentMode: 'Card',
    items: [
      { id: 1, name: 'Levothyroxine 50mcg', quantity: 2, price: 120, total: 240 },
      { id: 2, name: 'Calcium Tablets', quantity: 1, price: 180, total: 180 }
    ],
    subtotal: 420,
    gst: 50.4,
    discount: 20,
    grandTotal: 450.4,
    status: 'Completed',
    profit: 75
  },
  {
    id: 'INV-2024-011',
    invoiceNo: 'INV-2024-011',
    date: '2024-01-13',
    time: '04:00 PM',
    customerName: 'Karthik Rao',
    customerMobile: '+91 98765 43220',
    paymentMode: 'Cash',
    items: [
      { id: 1, name: 'Ciprofloxacin 500mg', quantity: 2, price: 110, total: 220 }
    ],
    subtotal: 220,
    gst: 26.4,
    discount: 0,
    grandTotal: 246.4,
    status: 'Completed',
    profit: 38
  },
  {
    id: 'INV-2024-012',
    invoiceNo: 'INV-2024-012',
    date: '2024-01-12',
    time: '09:15 AM',
    customerName: 'Divya Krishnan',
    customerMobile: '+91 98765 43221',
    paymentMode: 'UPI',
    items: [
      { id: 1, name: 'Montelukast 10mg', quantity: 1, price: 145, total: 145 },
      { id: 2, name: 'Salbutamol Inhaler', quantity: 1, price: 280, total: 280 }
    ],
    subtotal: 425,
    gst: 51,
    discount: 25,
    grandTotal: 451,
    status: 'Completed',
    profit: 68
  }
];

export const availableMedicines = [
  { id: 1, name: 'Paracetamol 500mg', stock: 250, price: 15, mrp: 18 },
  { id: 2, name: 'Crocin Advance', stock: 180, price: 45, mrp: 52 },
  { id: 3, name: 'Dolo 650mg', stock: 320, price: 25, mrp: 30 },
  { id: 4, name: 'Vicks Vaporub', stock: 95, price: 120, mrp: 135 },
  { id: 5, name: 'Azithromycin 500mg', stock: 75, price: 180, mrp: 210 },
  { id: 6, name: 'Vitamin D3', stock: 140, price: 250, mrp: 285 },
  { id: 7, name: 'Cetrizine 10mg', stock: 280, price: 12, mrp: 15 },
  { id: 8, name: 'Cough Syrup', stock: 110, price: 85, mrp: 98 },
  { id: 9, name: 'Insulin Glargine', stock: 45, price: 1200, mrp: 1380 },
  { id: 10, name: 'Omeprazole 20mg', stock: 200, price: 35, mrp: 42 },
  { id: 11, name: 'Pantoprazole', stock: 165, price: 55, mrp: 65 },
  { id: 12, name: 'Metformin 500mg', stock: 290, price: 45, mrp: 55 },
  { id: 13, name: 'Glimepiride 2mg', stock: 135, price: 65, mrp: 78 },
  { id: 14, name: 'Amoxicillin 500mg', stock: 185, price: 95, mrp: 115 },
  { id: 15, name: 'Paracetamol Syrup', stock: 125, price: 65, mrp: 75 },
  { id: 16, name: 'Aspirin 75mg', stock: 240, price: 18, mrp: 22 },
  { id: 17, name: 'Atorvastatin 10mg', stock: 155, price: 85, mrp: 102 },
  { id: 18, name: 'Levothyroxine 50mcg', stock: 98, price: 120, mrp: 145 },
  { id: 19, name: 'Calcium Tablets', stock: 175, price: 180, mrp: 215 },
  { id: 20, name: 'Ciprofloxacin 500mg', stock: 145, price: 110, mrp: 132 },
  { id: 21, name: 'Montelukast 10mg', stock: 88, price: 145, mrp: 175 },
  { id: 22, name: 'Salbutamol Inhaler', stock: 62, price: 280, mrp: 335 },
  { id: 23, name: 'Ibuprofen 400mg', stock: 310, price: 22, mrp: 28 },
  { id: 24, name: 'Diclofenac Gel', stock: 92, price: 95, mrp: 115 },
  { id: 25, name: 'Ranitidine 150mg', stock: 205, price: 38, mrp: 45 }
];
