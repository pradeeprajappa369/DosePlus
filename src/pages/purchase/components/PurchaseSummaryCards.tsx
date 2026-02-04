import { useState, useEffect } from 'react';

interface PurchaseSummaryCardsProps {
  purchases: any[];
}

export default function PurchaseSummaryCards({ purchases }: PurchaseSummaryCardsProps) {
  const [stats, setStats] = useState({
    totalPurchases: 0,
    totalAmount: 0,
    pendingBills: 0,
    suppliersCount: 0
  });

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyPurchases = purchases.filter(p => {
      const purchaseDate = new Date(p.billDate);
      return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
    });

    const totalAmount = monthlyPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
    const pendingBills = purchases.filter(p => p.paymentStatus === 'Pending').length;
    const uniqueSuppliers = new Set(purchases.map(p => p.supplierId)).size;

    setStats({
      totalPurchases: monthlyPurchases.length,
      totalAmount,
      pendingBills,
      suppliersCount: uniqueSuppliers
    });
  }, [purchases]);

  const cards = [
    {
      title: 'Total Purchases',
      value: stats.totalPurchases,
      subtitle: 'This Month',
      icon: 'ri-shopping-cart-line',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Purchase Amount',
      value: `₹${stats.totalAmount.toLocaleString('en-IN')}`,
      subtitle: 'This Month',
      icon: 'ri-money-rupee-circle-line',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Pending Bills',
      value: stats.pendingBills,
      subtitle: 'Awaiting Payment',
      icon: 'ri-file-list-3-line',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Suppliers Count',
      value: stats.suppliersCount,
      subtitle: 'Active Suppliers',
      icon: 'ri-building-line',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-xs text-gray-500">{card.subtitle}</p>
            </div>
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <i className={`${card.icon} text-xl ${card.iconColor}`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
