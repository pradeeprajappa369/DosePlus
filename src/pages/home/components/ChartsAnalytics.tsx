
import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function ChartsAnalytics() {
  const [salesPeriod, setSalesPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Sales Overview Data
  const dailySalesData = [
    { date: 'Mon', sales: 18500 },
    { date: 'Tue', sales: 22300 },
    { date: 'Wed', sales: 19800 },
    { date: 'Thu', sales: 25600 },
    { date: 'Fri', sales: 28400 },
    { date: 'Sat', sales: 31200 },
    { date: 'Sun', sales: 24800 },
  ];

  const weeklySalesData = [
    { date: 'Week 1', sales: 145000 },
    { date: 'Week 2', sales: 168000 },
    { date: 'Week 3', sales: 152000 },
    { date: 'Week 4', sales: 178000 },
  ];

  const monthlySalesData = [
    { date: 'Jan', sales: 580000 },
    { date: 'Feb', sales: 620000 },
    { date: 'Mar', sales: 710000 },
    { date: 'Apr', sales: 680000 },
    { date: 'May', sales: 750000 },
    { date: 'Jun', sales: 820000 },
  ];

  const getSalesData = () => {
    if (salesPeriod === 'monthly') return monthlySalesData;
    if (salesPeriod === 'weekly') return weeklySalesData;
    return dailySalesData;
  };

  // Orders vs Revenue Data
  const ordersRevenueData = [
    { month: 'Jan', orders: 245, revenue: 580000 },
    { month: 'Feb', orders: 268, revenue: 620000 },
    { month: 'Mar', orders: 312, revenue: 710000 },
    { month: 'Apr', orders: 289, revenue: 680000 },
    { month: 'May', orders: 335, revenue: 750000 },
    { month: 'Jun', orders: 368, revenue: 820000 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-sm text-gray-700">{entry.name}:</span>
              <span className="text-sm font-semibold text-gray-900">
                {entry.name === 'Orders' ? entry.value : `₹${entry.value.toLocaleString('en-IN')}`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Sales Overview Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <p className="text-sm text-gray-500 mt-1">Revenue performance tracking</p>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 flex-shrink-0">
            <button
              onClick={() => setSalesPeriod('daily')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                salesPeriod === 'daily'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setSalesPeriod('weekly')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                salesPeriod === 'weekly'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSalesPeriod('monthly')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                salesPeriod === 'monthly'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getSalesData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF" 
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#14B8A6"
              strokeWidth={2.5}
              dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#14B8A6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders vs Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Orders vs Revenue</h3>
          <p className="text-sm text-gray-500 mt-1">Monthly comparison analysis</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ordersRevenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF" 
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              yAxisId="left"
              stroke="#9CA3AF" 
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#9CA3AF" 
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar yAxisId="left" dataKey="orders" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Orders" />
            <Bar yAxisId="right" dataKey="revenue" fill="#14B8A6" radius={[6, 6, 0, 0]} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
