
export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Pharmacist' | 'Cashier' | 'Inventory Staff';
  status: 'Active' | 'Inactive';
  createdDate: string;
  lastLogin: string;
}

export const staffData: Staff[] = [
  {
    id: 'STF001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@pharmacy.com',
    phone: '+91 98765 43210',
    role: 'Pharmacist',
    status: 'Active',
    createdDate: '2024-01-15',
    lastLogin: '2025-01-18 09:30 AM',
  },
  {
    id: 'STF002',
    name: 'Priya Patel',
    email: 'priya.patel@pharmacy.com',
    phone: '+91 87654 32109',
    role: 'Cashier',
    status: 'Active',
    createdDate: '2024-02-20',
    lastLogin: '2025-01-18 08:45 AM',
  },
  {
    id: 'STF003',
    name: 'Amit Kumar',
    email: 'amit.kumar@pharmacy.com',
    phone: '+91 76543 21098',
    role: 'Inventory Staff',
    status: 'Active',
    createdDate: '2024-03-10',
    lastLogin: '2025-01-17 06:00 PM',
  },
  {
    id: 'STF004',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@pharmacy.com',
    phone: '+91 65432 10987',
    role: 'Pharmacist',
    status: 'Inactive',
    createdDate: '2024-04-05',
    lastLogin: '2025-01-10 02:15 PM',
  },
  {
    id: 'STF005',
    name: 'Vikram Singh',
    email: 'vikram.singh@pharmacy.com',
    phone: '+91 54321 09876',
    role: 'Cashier',
    status: 'Active',
    createdDate: '2024-05-12',
    lastLogin: '2025-01-18 10:00 AM',
  },
  {
    id: 'STF006',
    name: 'Anjali Gupta',
    email: 'anjali.gupta@pharmacy.com',
    phone: '+91 43210 98765',
    role: 'Inventory Staff',
    status: 'Active',
    createdDate: '2024-06-18',
    lastLogin: '2025-01-17 04:30 PM',
  },
];
