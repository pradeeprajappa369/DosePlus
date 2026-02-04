import { useState, useEffect } from 'react';

interface SalesSummaryCardsProps {
  sales: any[];
}

export default function SalesSummaryCards({ sales }: SalesSummaryCardsProps) {
  const [stats, setStats] = useState({
    todaySales: 0,
    monthSales: 0,
    totalOrders: 0,
    profit: 0
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const todaySales = sales
      .filter(sale => sale.date === today && sale.status === 'Completed')
      .reduce((sum, sale) => sum + sale.grandTotal, 0);

    const monthSales = sales
      .filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getMonth() === currentMonth && 
               saleDate.getFullYear() === currentYear &&
               sale.status === 'Completed';
      })
      .reduce((sum, sale) => sum + sale.grandTotal, 0);

    const totalOrders = sales.filter(sale => sale.status === 'Completed').length;

    const profit = sales
      .filter(sale => sale.status === 'Completed')
      .reduce((sum, sale) => sum + sale.profit, 0);

    setStats({ todaySales, monthSales, totalOrders, profit });
  }, [sales]);

  const cards = [
    {
      title: "Today's Sales",
      value: `₹${stats.todaySales.toFixed(2)}`,
      icon: 'ri-money-rupee-circle-line',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'This Month Sales',
      value: `₹${stats.monthSales.toFixed(2)}`,
      icon: 'ri-line-chart-line',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: 'ri-shopping-bag-3-line',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '+15.2%',
      trendUp: true
    },
    {
      title: 'Profit (Estimated)',
      value: `₹${stats.profit.toFixed(2)}`,
      icon: 'ri-funds-line',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+6.8%',
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <i className={`${card.icon} text-xl ${card.color}`}></i>
            </div>
            <span className={`text-sm font-medium ${card.trendUp ? 'text-emerald-600' : 'text-red-600'} flex items-center`}>
              <i className={`${card.trendUp ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
              {card.trend}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}