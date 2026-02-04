export const supportTickets = [
  {
    id: 'TCKT-1001',
    pharmacyId: 'PH001',
    pharmacyName: 'DosePlus Pharmacy',
    subject: 'Payment not activated after subscription',
    description: 'We have subscribed to the Professional plan but payment gateway is still showing as disabled. Unable to process customer orders.',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-01-20T10:30:00',
    updatedAt: '2026-01-20T10:30:00',
    assignedTo: 'Support Team',
    messages: [
      {
        id: 'MSG-001',
        sender: 'DosePlus Pharmacy',
        message: 'We have subscribed to the Professional plan but payment gateway is still showing as disabled. Unable to process customer orders.',
        timestamp: '2026-01-20T10:30:00',
        isAdmin: false
      }
    ]
  },
  {
    id: 'TCKT-1002',
    pharmacyId: 'PH002',
    pharmacyName: 'HealthCare Pharmacy',
    subject: 'Unable to upload inventory bill',
    description: 'Getting error when trying to upload purchase bill PDF. Error message: "File format not supported"',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-01-19T14:20:00',
    updatedAt: '2026-01-21T09:15:00',
    assignedTo: 'Tech Support',
    messages: [
      {
        id: 'MSG-002',
        sender: 'HealthCare Pharmacy',
        message: 'Getting error when trying to upload purchase bill PDF. Error message: "File format not supported"',
        timestamp: '2026-01-19T14:20:00',
        isAdmin: false
      },
      {
        id: 'MSG-003',
        sender: 'Support Team',
        message: 'We are investigating this issue. Can you please share the file size and format details?',
        timestamp: '2026-01-21T09:15:00',
        isAdmin: true
      }
    ]
  },
  {
    id: 'TCKT-1003',
    pharmacyId: 'PH003',
    pharmacyName: 'MediCare Plus',
    subject: 'Online store not visible to customers',
    description: 'We enabled the online store but customers cannot see our products on the website.',
    priority: 'Critical',
    status: 'Open',
    createdAt: '2026-01-22T08:45:00',
    updatedAt: '2026-01-22T08:45:00',
    assignedTo: 'Tech Support',
    messages: [
      {
        id: 'MSG-004',
        sender: 'MediCare Plus',
        message: 'We enabled the online store but customers cannot see our products on the website.',
        timestamp: '2026-01-22T08:45:00',
        isAdmin: false
      }
    ]
  },
  {
    id: 'TCKT-1004',
    pharmacyId: 'PH004',
    pharmacyName: 'City Pharmacy',
    subject: 'GST report showing incorrect values',
    description: 'The GST report for December 2025 is showing incorrect tax calculations. Need urgent fix for filing.',
    priority: 'High',
    status: 'Resolved',
    createdAt: '2026-01-18T11:00:00',
    updatedAt: '2026-01-20T16:30:00',
    assignedTo: 'Support Team',
    messages: [
      {
        id: 'MSG-005',
        sender: 'City Pharmacy',
        message: 'The GST report for December 2025 is showing incorrect tax calculations. Need urgent fix for filing.',
        timestamp: '2026-01-18T11:00:00',
        isAdmin: false
      },
      {
        id: 'MSG-006',
        sender: 'Support Team',
        message: 'We have identified the issue and applied a fix. Please check the updated report.',
        timestamp: '2026-01-20T16:30:00',
        isAdmin: true
      }
    ]
  },
  {
    id: 'TCKT-1005',
    pharmacyId: 'PH005',
    pharmacyName: 'Wellness Pharmacy',
    subject: 'Staff login not working',
    description: 'Created a new staff account but they are unable to login. Getting "Invalid credentials" error.',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-01-21T13:20:00',
    updatedAt: '2026-01-22T10:00:00',
    assignedTo: 'Tech Support',
    messages: [
      {
        id: 'MSG-007',
        sender: 'Wellness Pharmacy',
        message: 'Created a new staff account but they are unable to login. Getting "Invalid credentials" error.',
        timestamp: '2026-01-21T13:20:00',
        isAdmin: false
      },
      {
        id: 'MSG-008',
        sender: 'Tech Support',
        message: 'Please verify the email address used for staff account creation and try resetting the password.',
        timestamp: '2026-01-22T10:00:00',
        isAdmin: true
      }
    ]
  },
  {
    id: 'TCKT-1006',
    pharmacyId: 'PH006',
    pharmacyName: 'Prime Pharmacy',
    subject: 'Request for plan upgrade',
    description: 'Want to upgrade from Starter to Enterprise plan. Please guide on the process.',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-01-17T09:30:00',
    updatedAt: '2026-01-18T14:00:00',
    assignedTo: 'Support Team',
    messages: [
      {
        id: 'MSG-009',
        sender: 'Prime Pharmacy',
        message: 'Want to upgrade from Starter to Enterprise plan. Please guide on the process.',
        timestamp: '2026-01-17T09:30:00',
        isAdmin: false
      },
      {
        id: 'MSG-010',
        sender: 'Support Team',
        message: 'Your plan has been upgraded to Enterprise. All features are now active.',
        timestamp: '2026-01-18T14:00:00',
        isAdmin: true
      }
    ]
  },
  {
    id: 'TCKT-1007',
    pharmacyId: 'PH007',
    pharmacyName: 'LifeCare Pharmacy',
    subject: 'Low stock alerts not working',
    description: 'Not receiving low stock alerts even though threshold is set correctly.',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-01-22T15:10:00',
    updatedAt: '2026-01-22T15:10:00',
    assignedTo: 'Tech Support',
    messages: [
      {
        id: 'MSG-011',
        sender: 'LifeCare Pharmacy',
        message: 'Not receiving low stock alerts even though threshold is set correctly.',
        timestamp: '2026-01-22T15:10:00',
        isAdmin: false
      }
    ]
  },
  {
    id: 'TCKT-1008',
    pharmacyId: 'PH008',
    pharmacyName: 'Green Cross Pharmacy',
    subject: 'Invoice printing issue',
    description: 'Invoice prints are cutting off the bottom section with total amount.',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-01-21T16:45:00',
    updatedAt: '2026-01-22T11:20:00',
    assignedTo: 'Tech Support',
    messages: [
      {
        id: 'MSG-012',
        sender: 'Green Cross Pharmacy',
        message: 'Invoice prints are cutting off the bottom section with total amount.',
        timestamp: '2026-01-21T16:45:00',
        isAdmin: false
      },
      {
        id: 'MSG-013',
        sender: 'Tech Support',
        message: 'We are working on fixing the print layout. Will update you soon.',
        timestamp: '2026-01-22T11:20:00',
        isAdmin: true
      }
    ]
  },
  {
    id: 'TCKT-1009',
    pharmacyId: 'PH009',
    pharmacyName: 'Apollo Pharmacy',
    subject: 'Customer data export not working',
    description: 'Unable to export customer list to Excel. Download button not responding.',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-01-16T10:00:00',
    updatedAt: '2026-01-17T12:30:00',
    assignedTo: 'Support Team',
    messages: [
      {
        id: 'MSG-014',
        sender: 'Apollo Pharmacy',
        message: 'Unable to export customer list to Excel. Download button not responding.',
        timestamp: '2026-01-16T10:00:00',
        isAdmin: false
      },
      {
        id: 'MSG-015',
        sender: 'Support Team',
        message: 'Issue has been fixed. You can now export customer data successfully.',
        timestamp: '2026-01-17T12:30:00',
        isAdmin: true
      }
    ]
  },
  {
    id: 'TCKT-1010',
    pharmacyId: 'PH010',
    pharmacyName: 'Sunrise Pharmacy',
    subject: 'Offer banner not displaying',
    description: 'Created promotional offer but banner is not showing on online store.',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-01-22T12:00:00',
    updatedAt: '2026-01-22T12:00:00',
    assignedTo: 'Support Team',
    messages: [
      {
        id: 'MSG-016',
        sender: 'Sunrise Pharmacy',
        message: 'Created promotional offer but banner is not showing on online store.',
        timestamp: '2026-01-22T12:00:00',
        isAdmin: false
      }
    ]
  }
];
