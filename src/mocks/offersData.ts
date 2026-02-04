export const offersData = [
  {
    id: 'OFF001',
    name: 'Weekend Wellness Sale',
    type: 'Percentage',
    discountValue: 20,
    applicableTo: 'Vitamins & Supplements',
    validFrom: '2024-01-15',
    validTo: '2024-01-21',
    status: 'Active',
    bannerText: 'Get 20% OFF on All Vitamins & Supplements',
    description: 'Boost your immunity this weekend with our special vitamin sale',
    products: ['Vitamin C 1000mg', 'Multivitamin Complex', 'Omega-3 Fish Oil'],
    createdAt: '2024-01-10'
  },
  {
    id: 'OFF002',
    name: 'Pain Relief Combo',
    type: 'BOGO',
    discountValue: 100,
    applicableTo: 'Pain Relief',
    validFrom: '2024-01-10',
    validTo: '2024-01-31',
    status: 'Active',
    bannerText: 'Buy 1 Get 1 Free on Pain Relief Medicines',
    description: 'Stock up on essential pain relief medications',
    products: ['Ibuprofen 400mg', 'Paracetamol 500mg', 'Aspirin 75mg'],
    createdAt: '2024-01-08'
  },
  {
    id: 'OFF003',
    name: 'New Year Health Boost',
    type: 'Flat',
    discountValue: 150,
    applicableTo: 'All Products',
    validFrom: '2024-01-01',
    validTo: '2024-01-15',
    status: 'Expired',
    bannerText: 'Flat ₹150 OFF on Orders Above ₹999',
    description: 'Start your year with better health and savings',
    products: ['All Products'],
    createdAt: '2023-12-28'
  },
  {
    id: 'OFF004',
    name: 'Diabetes Care Package',
    type: 'Percentage',
    discountValue: 15,
    applicableTo: 'Diabetes Care',
    validFrom: '2024-01-25',
    validTo: '2024-02-10',
    status: 'Scheduled',
    bannerText: '15% OFF on Diabetes Care Products',
    description: 'Special discount on glucometers, test strips, and diabetic care',
    products: ['Glucometer', 'Test Strips', 'Diabetic Supplements'],
    createdAt: '2024-01-12'
  },
  {
    id: 'OFF005',
    name: 'Skin Care Special',
    type: 'Percentage',
    discountValue: 25,
    applicableTo: 'Skin Care',
    validFrom: '2024-01-18',
    validTo: '2024-01-28',
    status: 'Active',
    bannerText: 'Glow Up! 25% OFF on Skin Care Range',
    description: 'Premium skin care products at unbeatable prices',
    products: ['Moisturizers', 'Sunscreen', 'Anti-aging Creams'],
    createdAt: '2024-01-15'
  },
  {
    id: 'OFF006',
    name: 'Baby Care Bundle',
    type: 'Flat',
    discountValue: 200,
    applicableTo: 'Baby Care',
    validFrom: '2024-01-20',
    validTo: '2024-02-05',
    status: 'Active',
    bannerText: 'Save ₹200 on Baby Care Essentials',
    description: 'Everything your little one needs at special prices',
    products: ['Baby Diapers', 'Baby Wipes', 'Baby Lotion', 'Baby Powder'],
    createdAt: '2024-01-16'
  }
];

export const activeOffers = offersData.filter(offer => offer.status === 'Active');
