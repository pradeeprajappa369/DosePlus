const RecentSales = () => {
  const recentSales = [
    { id: 'INV-2401', customer: 'Amit Kumar', amount: 1250, items: 5, time: '10:30 AM', paymentMethod: 'Cash' },
    { id: 'INV-2402', customer: 'Priya Sharma', amount: 890, items: 3, time: '11:15 AM', paymentMethod: 'UPI' },
    { id: 'INV-2403', customer: 'Rahul Verma', amount: 2340, items: 8, time: '12:00 PM', paymentMethod: 'Card' },
    { id: 'INV-2404', customer: 'Sneha Patel', amount: 560, items: 2, time: '12:45 PM', paymentMethod: 'Cash' },
    { id: 'INV-2405', customer: 'Vikram Singh', amount: 1780, items: 6, time: '01:20 PM', paymentMethod: 'UPI' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
            <p className="text-sm text-gray-500 mt-1">Latest transactions today</p>
          </div>
          <button
            onClick={() => window.REACT_APP_NAVIGATE('/sales')}
            className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{sale.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{sale.customer}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{sale.items}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">₹{sale.amount.toLocaleString('en-IN')}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{sale.time}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    sale.paymentMethod === 'Cash' ? 'bg-green-50 text-green-700' :
                    sale.paymentMethod === 'UPI' ? 'bg-blue-50 text-blue-700' :
                    'bg-purple-50 text-purple-700'
                  }`}>
                    {sale.paymentMethod}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSales;
