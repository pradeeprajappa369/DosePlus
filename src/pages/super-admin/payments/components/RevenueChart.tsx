interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const minRevenue = Math.min(...data.map(d => d.revenue));
  const range = maxRevenue - minRevenue;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Revenue Over Time</h3>
          <p className="text-sm text-gray-500 mt-1">Monthly revenue trend</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Last 6 months</span>
        </div>
      </div>

      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between text-xs text-gray-500">
          <span>₹{(maxRevenue / 1000).toFixed(0)}K</span>
          <span>₹{((maxRevenue + minRevenue) / 2000).toFixed(0)}K</span>
          <span>₹{(minRevenue / 1000).toFixed(0)}K</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-20 right-0 top-0 bottom-8">
          <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="600" y2="0" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="0" y1="150" x2="600" y2="150" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="0" y1="300" x2="600" y2="300" stroke="#E5E7EB" strokeWidth="1" />

            {/* Area gradient */}
            <defs>
              <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Area path */}
            <path
              d={`M 0 ${300 - ((data[0].revenue - minRevenue) / range) * 300} ${data.map((d, i) => 
                `L ${(i * 600) / (data.length - 1)} ${300 - ((d.revenue - minRevenue) / range) * 300}`
              ).join(' ')} L 600 300 L 0 300 Z`}
              fill="url(#revenueGradient)"
            />

            {/* Line path */}
            <path
              d={`M 0 ${300 - ((data[0].revenue - minRevenue) / range) * 300} ${data.map((d, i) => 
                `L ${(i * 600) / (data.length - 1)} ${300 - ((d.revenue - minRevenue) / range) * 300}`
              ).join(' ')}`}
              fill="none"
              stroke="#F97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {data.map((d, i) => (
              <circle
                key={i}
                cx={(i * 600) / (data.length - 1)}
                cy={300 - ((d.revenue - minRevenue) / range) * 300}
                r="5"
                fill="#F97316"
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-20 right-0 bottom-0 h-8 flex justify-between items-center text-xs text-gray-500">
          {data.map((d, i) => (
            <span key={i}>{d.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
