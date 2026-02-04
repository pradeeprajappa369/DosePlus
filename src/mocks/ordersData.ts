export const ordersData = [
  {
    id: 'ORD-2024-001',
    customerName: 'Sarah Johnson',
    itemsCount: 3,
    totalAmount: 245.50,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    orderStatus: 'Delivered',
    date: '2024-01-15',
    items: [
      { name: 'Paracetamol 500mg', quantity: 2, price: 12.50, total: 25.00 },
      { name: 'Amoxicillin 250mg', quantity: 1, price: 45.00, total: 45.00 },
      { name: 'Vitamin D3', quantity: 3, price: 62.50, total: 187.50 }
    ],
    customerEmail: 'sarah.j@email.com',
    customerPhone: '+1 234-567-8901',
    shippingAddress: '123 Main Street, Apt 4B, New York, NY 10001',
    subtotal: 257.50,
    tax: 18.00,
    discount: 30.00,
    timeline: [
      { status: 'Order Placed', date: '2024-01-15 10:30 AM', completed: true },
      { status: 'Confirmed', date: '2024-01-15 11:00 AM', completed: true },
      { status: 'Shipped', date: '2024-01-16 09:15 AM', completed: true },
      { status: 'Delivered', date: '2024-01-17 02:45 PM', completed: true }
    ]
  },
  {
    id: 'ORD-2024-002',
    customerName: 'Michael Chen',
    itemsCount: 3,
    totalAmount: 89.99,
    paymentStatus: 'COD',
    paymentMethod: 'Cash on Delivery',
    orderStatus: 'Confirmed',
    date: '2024-01-15',
    items: [
      { name: 'Ibuprofen 400mg', quantity: 2, price: 18.99, total: 37.98 },
      { name: 'Cough Syrup', quantity: 1, price: 25.00, total: 25.00 },
      { name: 'Hand Sanitizer', quantity: 2, price: 23.00, total: 46.00 }
    ],
    customerEmail: 'mchen@email.com',
    customerPhone: '+1 234-567-8902',
    shippingAddress: '456 Oak Avenue, Suite 12, Los Angeles, CA 90001',
    subtotal: 108.98,
    tax: 7.63,
    discount: 26.62,
    timeline: [
      { status: 'Order Placed', date: '2024-01-15 02:20 PM', completed: true },
      { status: 'Confirmed', date: '2024-01-15 03:00 PM', completed: true },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-2024-003',
    customerName: 'Emily Rodriguez',
    itemsCount: 3,
    totalAmount: 156.75,
    paymentStatus: 'Paid',
    paymentMethod: 'PayPal',
    orderStatus: 'New',
    date: '2024-01-14',
    items: [
      { name: 'Metformin 500mg', quantity: 3, price: 45.00, total: 135.00 },
      { name: 'Blood Pressure Monitor', quantity: 1, price: 89.99, total: 89.99 },
      { name: 'Glucose Test Strips', quantity: 1, price: 21.76, total: 21.76 }
    ],
    customerEmail: 'emily.r@email.com',
    customerPhone: '+1 234-567-8903',
    shippingAddress: '789 Pine Road, Building C, Chicago, IL 60601',
    subtotal: 246.75,
    tax: 17.27,
    discount: 107.27,
    timeline: [
      { status: 'Order Placed', date: '2024-01-14 04:15 PM', completed: true },
      { status: 'Confirmed', date: '', completed: false },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-2024-004',
    customerName: 'David Thompson',
    itemsCount: 3,
    totalAmount: 67.50,
    paymentStatus: 'Paid',
    paymentMethod: 'Debit Card',
    orderStatus: 'Delivered',
    date: '2024-01-14',
    items: [
      { name: 'Aspirin 100mg', quantity: 2, price: 15.00, total: 30.00 },
      { name: 'Multivitamin', quantity: 1, price: 35.00, total: 35.00 },
      { name: 'Face Mask (Box)', quantity: 1, price: 17.50, total: 17.50 }
    ],
    customerEmail: 'dthompson@email.com',
    customerPhone: '+1 234-567-8904',
    shippingAddress: '321 Elm Street, Houston, TX 77001',
    subtotal: 82.50,
    tax: 5.78,
    discount: 20.78,
    timeline: [
      { status: 'Order Placed', date: '2024-01-14 09:00 AM', completed: true },
      { status: 'Confirmed', date: '2024-01-14 09:30 AM', completed: true },
      { status: 'Shipped', date: '2024-01-14 02:00 PM', completed: true },
      { status: 'Delivered', date: '2024-01-15 11:20 AM', completed: true }
    ]
  },
  {
    id: 'ORD-2024-005',
    customerName: 'Jessica Martinez',
    itemsCount: 3,
    totalAmount: 312.00,
    paymentStatus: 'COD',
    paymentMethod: 'Cash on Delivery',
    orderStatus: 'Confirmed',
    date: '2024-01-13',
    items: [
      { name: 'Insulin Glargine', quantity: 2, price: 125.00, total: 250.00 },
      { name: 'Syringes (Pack of 10)', quantity: 3, price: 18.00, total: 54.00 },
      { name: 'Alcohol Swabs', quantity: 2, price: 8.00, total: 16.00 }
    ],
    customerEmail: 'jmartinez@email.com',
    customerPhone: '+1 234-567-8905',
    shippingAddress: '654 Maple Drive, Phoenix, AZ 85001',
    subtotal: 320.00,
    tax: 22.40,
    discount: 30.40,
    timeline: [
      { status: 'Order Placed', date: '2024-01-13 01:45 PM', completed: true },
      { status: 'Confirmed', date: '2024-01-13 02:30 PM', completed: true },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-2024-006',
    customerName: 'Robert Wilson',
    itemsCount: 3,
    totalAmount: 45.99,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    orderStatus: 'Delivered',
    date: '2024-01-13',
    items: [
      { name: 'Antibiotic Ointment', quantity: 1, price: 12.99, total: 12.99 },
      { name: 'Bandages (Box)', quantity: 2, price: 16.00, total: 32.00 },
      { name: 'Pain Relief Gel', quantity: 1, price: 17.00, total: 17.00 }
    ],
    customerEmail: 'rwilson@email.com',
    customerPhone: '+1 234-567-8906',
    shippingAddress: '987 Cedar Lane, Philadelphia, PA 19101',
    subtotal: 61.99,
    tax: 4.34,
    discount: 20.34,
    timeline: [
      { status: 'Order Placed', date: '2024-01-13 10:15 AM', completed: true },
      { status: 'Confirmed', date: '2024-01-13 10:45 AM', completed: true },
      { status: 'Shipped', date: '2024-01-13 03:30 PM', completed: true },
      { status: 'Delivered', date: '2024-01-14 09:00 AM', completed: true }
    ]
  },
  {
    id: 'ORD-2024-007',
    customerName: 'Amanda Lee',
    itemsCount: 3,
    totalAmount: 198.50,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    orderStatus: 'Cancelled',
    date: '2024-01-12',
    items: [
      { name: 'Omeprazole 20mg', quantity: 2, price: 28.00, total: 56.00 },
      { name: 'Probiotic Supplement', quantity: 2, price: 65.00, total: 130.00 },
      { name: 'Digestive Enzymes', quantity: 1, price: 35.50, total: 35.50 }
    ],
    customerEmail: 'alee@email.com',
    customerPhone: '+1 234-567-8907',
    shippingAddress: '147 Birch Street, San Antonio, TX 78201',
    subtotal: 221.50,
    tax: 15.51,
    discount: 38.51,
    timeline: [
      { status: 'Order Placed', date: '2024-01-12 03:00 PM', completed: true },
      { status: 'Cancelled', date: '2024-01-12 04:30 PM', completed: true }
    ]
  },
  {
    id: 'ORD-2024-008',
    customerName: 'Christopher Brown',
    itemsCount: 3,
    totalAmount: 125.00,
    paymentStatus: 'COD',
    paymentMethod: 'Cash on Delivery',
    orderStatus: 'Delivered',
    date: '2024-01-12',
    items: [
      { name: 'Lisinopril 10mg', quantity: 3, price: 35.00, total: 105.00 },
      { name: 'Atorvastatin 20mg', quantity: 2, price: 45.00, total: 90.00 },
      { name: 'Baby Aspirin', quantity: 1, price: 10.00, total: 10.00 }
    ],
    customerEmail: 'cbrown@email.com',
    customerPhone: '+1 234-567-8908',
    shippingAddress: '258 Willow Court, San Diego, CA 92101',
    subtotal: 205.00,
    tax: 14.35,
    discount: 94.35,
    timeline: [
      { status: 'Order Placed', date: '2024-01-12 11:00 AM', completed: true },
      { status: 'Confirmed', date: '2024-01-12 11:30 AM', completed: true },
      { status: 'Shipped', date: '2024-01-12 04:00 PM', completed: true },
      { status: 'Delivered', date: '2024-01-13 10:15 AM', completed: true }
    ]
  },
  {
    id: 'ORD-2024-009',
    customerName: 'Nicole Anderson',
    itemsCount: 3,
    totalAmount: 78.25,
    paymentStatus: 'Paid',
    paymentMethod: 'PayPal',
    orderStatus: 'Confirmed',
    date: '2024-01-11',
    items: [
      { name: 'Allergy Relief Tablets', quantity: 2, price: 22.50, total: 45.00 },
      { name: 'Nasal Spray', quantity: 1, price: 18.75, total: 18.75 },
      { name: 'Eye Drops', quantity: 2, price: 18.50, total: 37.00 }
    ],
    customerEmail: 'nanderson@email.com',
    customerPhone: '+1 234-567-8909',
    shippingAddress: '369 Spruce Avenue, Dallas, TX 75201',
    subtotal: 100.75,
    tax: 7.05,
    discount: 29.55,
    timeline: [
      { status: 'Order Placed', date: '2024-01-11 08:30 AM', completed: true },
      { status: 'Confirmed', date: '2024-01-11 09:00 AM', completed: true },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-2024-010',
    customerName: 'James Taylor',
    itemsCount: 2,
    totalAmount: 54.99,
    paymentStatus: 'Paid',
    paymentMethod: 'Debit Card',
    orderStatus: 'Delivered',
    date: '2024-01-11',
    items: [
      { name: 'Thermometer Digital', quantity: 1, price: 24.99, total: 24.99 },
      { name: 'First Aid Kit', quantity: 1, price: 30.00, total: 30.00 }
    ],
    customerEmail: 'jtaylor@email.com',
    customerPhone: '+1 234-567-8910',
    shippingAddress: '741 Ash Boulevard, San Jose, CA 95101',
    subtotal: 54.99,
    tax: 3.85,
    discount: 3.85,
    timeline: [
      { status: 'Order Placed', date: '2024-01-11 12:00 PM', completed: true },
      { status: 'Confirmed', date: '2024-01-11 12:30 PM', completed: true },
      { status: 'Shipped', date: '2024-01-11 05:00 PM', completed: true },
      { status: 'Delivered', date: '2024-01-12 01:30 PM', completed: true }
    ]
  },
  {
    id: 'ORD-2024-011',
    customerName: 'Sophia Garcia',
    itemsCount: 3,
    totalAmount: 267.80,
    paymentStatus: 'COD',
    paymentMethod: 'Cash on Delivery',
    orderStatus: 'New',
    date: '2024-01-10',
    items: [
      { name: 'Levothyroxine 50mcg', quantity: 3, price: 42.00, total: 126.00 },
      { name: 'Calcium Supplement', quantity: 2, price: 38.00, total: 76.00 },
      { name: 'Vitamin B Complex', quantity: 3, price: 62.40, total: 187.20 }
    ],
    customerEmail: 'sgarcia@email.com',
    customerPhone: '+1 234-567-8911',
    shippingAddress: '852 Poplar Street, Austin, TX 78701',
    subtotal: 389.20,
    tax: 27.24,
    discount: 148.64,
    timeline: [
      { status: 'Order Placed', date: '2024-01-10 05:45 PM', completed: true },
      { status: 'Confirmed', date: '', completed: false },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-2024-012',
    customerName: 'Daniel White',
    itemsCount: 4,
    totalAmount: 92.50,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    orderStatus: 'Delivered',
    date: '2024-01-10',
    items: [
      { name: 'Antihistamine Tablets', quantity: 2, price: 24.00, total: 48.00 },
      { name: 'Cough Drops', quantity: 3, price: 15.00, total: 45.00 },
      { name: 'Throat Spray', quantity: 1, price: 18.50, total: 18.50 },
      { name: 'Zinc Lozenges', quantity: 2, price: 17.50, total: 35.00 }
    ],
    customerEmail: 'dwhite@email.com',
    customerPhone: '+1 234-567-8912',
    shippingAddress: '963 Chestnut Drive, Jacksonville, FL 32099',
    subtotal: 146.50,
    tax: 10.26,
    discount: 64.26,
    timeline: [
      { status: 'Order Placed', date: '2024-01-10 07:20 AM', completed: true },
      { status: 'Confirmed', date: '2024-01-10 08:00 AM', completed: true },
      { status: 'Shipped', date: '2024-01-10 01:30 PM', completed: true },
      { status: 'Delivered', date: '2024-01-11 03:45 PM', completed: true }
    ]
  }
];
