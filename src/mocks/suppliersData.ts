export const suppliersData = [
  {
    id: 'SUP-001',
    name: 'MedLife Pharmaceuticals',
    contactPerson: 'Rajesh Kumar',
    mobile: '+91 98765 43210',
    email: 'rajesh@medlife.com',
    gstNumber: '27AABCU9603R1ZM',
    address: 'Plot No. 45, Andheri East, Mumbai, Maharashtra - 400069',
    status: 'Active',
    totalPurchases: 450000,
    pendingAmount: 45000,
    totalPaid: 405000,
    joinDate: '2023-01-15',
    purchaseHistory: [
      {
        billNo: 'BILL-2024-001',
        date: '2024-01-15',
        amount: 45000,
        status: 'Paid',
        items: 8
      },
      {
        billNo: 'BILL-2024-015',
        date: '2024-01-28',
        amount: 38000,
        status: 'Pending',
        items: 6
      },
      {
        billNo: 'BILL-2023-089',
        date: '2023-12-20',
        amount: 52000,
        status: 'Paid',
        items: 10
      }
    ],
    paymentHistory: [
      {
        id: 'PAY-001',
        date: '2024-01-20',
        amount: 45000,
        mode: 'Bank Transfer',
        reference: 'TXN123456789'
      },
      {
        id: 'PAY-002',
        date: '2023-12-25',
        amount: 52000,
        mode: 'Cheque',
        reference: 'CHQ987654'
      }
    ]
  },
  {
    id: 'SUP-002',
    name: 'HealthCare Distributors',
    contactPerson: 'Priya Sharma',
    mobile: '+91 98765 43211',
    email: 'priya@healthcare.com',
    gstNumber: '07AABCU9603R1ZN',
    address: 'Sector 18, Noida, Delhi NCR - 201301',
    status: 'Active',
    totalPurchases: 380000,
    pendingAmount: 72000,
    totalPaid: 308000,
    joinDate: '2023-02-20',
    purchaseHistory: [
      {
        billNo: 'BILL-2024-002',
        date: '2024-01-18',
        amount: 32000,
        status: 'Pending',
        items: 5
      },
      {
        billNo: 'BILL-2024-006',
        date: '2024-01-25',
        amount: 40000,
        status: 'Pending',
        items: 7
      },
      {
        billNo: 'BILL-2023-095',
        date: '2023-12-15',
        amount: 48000,
        status: 'Paid',
        items: 9
      }
    ],
    paymentHistory: [
      {
        id: 'PAY-003',
        date: '2023-12-20',
        amount: 48000,
        mode: 'UPI',
        reference: 'UPI987654321'
      }
    ]
  },
  {
    id: 'SUP-003',
    name: 'PharmaCorp India',
    contactPerson: 'Amit Patel',
    mobile: '+91 98765 43212',
    email: 'amit@pharmacorp.com',
    gstNumber: '29AABCU9603R1ZO',
    address: 'Whitefield, Bangalore, Karnataka - 560066',
    status: 'Active',
    totalPurchases: 520000,
    pendingAmount: 0,
    totalPaid: 520000,
    joinDate: '2023-03-10',
    purchaseHistory: [
      {
        billNo: 'BILL-2024-003',
        date: '2024-01-20',
        amount: 58000,
        status: 'Paid',
        items: 12
      },
      {
        billNo: 'BILL-2023-102',
        date: '2023-12-28',
        amount: 65000,
        status: 'Paid',
        items: 14
      }
    ],
    paymentHistory: [
      {
        id: 'PAY-004',
        date: '2024-01-22',
        amount: 58000,
        mode: 'Bank Transfer',
        reference: 'TXN456789123'
      },
      {
        id: 'PAY-005',
        date: '2023-12-30',
        amount: 65000,
        mode: 'Bank Transfer',
        reference: 'TXN789123456'
      }
    ]
  },
  {
    id: 'SUP-004',
    name: 'Global Meds Supply',
    contactPerson: 'Sunita Reddy',
    mobile: '+91 98765 43213',
    email: 'sunita@globalmeds.com',
    gstNumber: '36AABCU9603R1ZP',
    address: 'Banjara Hills, Hyderabad, Telangana - 500034',
    status: 'Active',
    totalPurchases: 410000,
    pendingAmount: 67000,
    totalPaid: 343000,
    joinDate: '2023-04-05',
    purchaseHistory: [
      {
        billNo: 'BILL-2024-005',
        date: '2024-01-25',
        amount: 67000,
        status: 'Pending',
        items: 11
      },
      {
        billNo: 'BILL-2023-108',
        date: '2023-12-18',
        amount: 55000,
        status: 'Paid',
        items: 9
      }
    ],
    paymentHistory: [
      {
        id: 'PAY-006',
        date: '2023-12-22',
        amount: 55000,
        mode: 'Cheque',
        reference: 'CHQ456789'
      }
    ]
  },
  {
    id: 'SUP-005',
    name: 'Wellness Pharma Traders',
    contactPerson: 'Vikram Singh',
    mobile: '+91 98765 43214',
    email: 'vikram@wellnesspharma.com',
    gstNumber: '24AABCU9603R1ZQ',
    address: 'Vastrapur, Ahmedabad, Gujarat - 380015',
    status: 'Active',
    totalPurchases: 295000,
    pendingAmount: 39000,
    totalPaid: 256000,
    joinDate: '2023-05-12',
    purchaseHistory: [
      {
        billNo: 'BILL-2024-008',
        date: '2024-01-22',
        amount: 39000,
        status: 'Pending',
        items: 6
      },
      {
        billNo: 'BILL-2023-115',
        date: '2023-12-10',
        amount: 42000,
        status: 'Paid',
        items: 7
      }
    ],
    paymentHistory: [
      {
        id: 'PAY-007',
        date: '2023-12-15',
        amount: 42000,
        mode: 'UPI',
        reference: 'UPI123456789'
      }
    ]
  },
  {
    id: 'SUP-006',
    name: 'Metro Medical Supplies',
    contactPerson: 'Neha Gupta',
    mobile: '+91 98765 43215',
    email: 'neha@metromedical.com',
    gstNumber: '33AABCU9603R1ZR',
    address: 'Anna Nagar, Chennai, Tamil Nadu - 600040',
    status: 'Inactive',
    totalPurchases: 180000,
    pendingAmount: 0,
    totalPaid: 180000,
    joinDate: '2023-06-20',
    purchaseHistory: [
      {
        billNo: 'BILL-2023-125',
        date: '2023-11-15',
        amount: 35000,
        status: 'Paid',
        items: 5
      }
    ],
    paymentHistory: [
      {
        id: 'PAY-008',
        date: '2023-11-20',
        amount: 35000,
        mode: 'Bank Transfer',
        reference: 'TXN321654987'
      }
    ]
  },
  {
    id: 'SUP-007',
    name: 'Prime Pharmaceuticals',
    contactPerson: 'Arjun Mehta',
    mobile: '+91 98765 43216',
    email: 'arjun@primepharma.com',
    gstNumber: '27AABCU9603R1ZS',
    address: 'Koramangala, Bangalore, Karnataka - 560034',
    status: 'Active',
    totalPurchases: 475000,
    pendingAmount: 58000,
    totalPaid: 417000,
    joinDate: '2023-07-08',
    purchaseHistory: [
      {
        billNo: 'BILL-2024-010',
        date: '2024-01-26',
        amount: 58000,
        status: 'Pending',
        items: 10
      },
      {
        billNo: 'BILL-2023-132',
        date: '2023-12-05',
        amount: 61000,
        status: 'Paid',
        items: 11
      }
    ],
    paymentHistory: [
      {
        id: 'PAY-009',
        date: '2023-12-10',
        amount: 61000,
        mode: 'Cheque',
        reference: 'CHQ789456'
      }
    ]
  },
  {
    id: 'SUP-008',
    name: 'Apex Drug Distributors',
    contactPerson: 'Kavita Joshi',
    mobile: '+91 98765 43217',
    email: 'kavita@apexdrug.com',
    gstNumber: '21AABCU9603R1ZT',
    address: 'Civil Lines, Jaipur, Rajasthan - 302006',
    status: 'Active',
    totalPurchases: 340000,
    pendingAmount: 0,
    totalPaid: 340000,
    joinDate: '2023-08-15',
    purchaseHistory: [
      {
        billNo: 'BILL-2024-012',
        date: '2024-01-24',
        amount: 44000,
        status: 'Paid',
        items: 8
      },
      {
        billNo: 'BILL-2023-140',
        date: '2023-12-12',
        amount: 50000,
        status: 'Paid',
        items: 9
      }
    ],
    paymentHistory: [
      {
        id: 'PAY-010',
        date: '2024-01-26',
        amount: 44000,
        mode: 'UPI',
        reference: 'UPI654321987'
      },
      {
        id: 'PAY-011',
        date: '2023-12-15',
        amount: 50000,
        mode: 'Bank Transfer',
        reference: 'TXN987654321'
      }
    ]
  }
];
