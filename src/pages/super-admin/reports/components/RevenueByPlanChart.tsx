interface RevenueByPlanChartProps {
  data: Array<{ month: string; starter: number; professional: number; enterprise: number }>;
}

export default function RevenueByPlanChart({ data }: RevenueByPlanChartProps) {
  const maxRevenue = Math.max(
    ...data.map(d => d.starter + d.professional + d.enterprise)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Revenue by Plan</h3>
          <p className="text-sm text-gray-500 mt-1">Monthly revenue breakdown</p>
        </div>
      </div>

      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between text-xs text-gray-500">
          <span>₹{(maxRevenue / 1000).toFixed(0)}K</span>
          <span>₹{(maxRevenue * 0.66 / 1000).toFixed(0)}K</span>
          <span>₹{(maxRevenue * 0.33 / 1000).toFixed(0)}K</span>
          <span>₹0</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-20 right-0 top-0 bottom-8">
          <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="600" y2="0" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="0" y1="100" x2="600" y2="100" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="0" y1="200" x2="600" y2="200" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="0" y1="300" x2="600" y2="300" stroke="#E5E7EB" strokeWidth="1" />

            {/* Starter line */}
            <path
              d={`M 0 ${300 - (data[0].starter / maxRevenue) * 300} ${data.map((d, i) => 
                `L ${(i * 600) / (data.length - 1)} ${300 - (d.starter / maxRevenue) * 300}`
              ).join(' ')}`}
              fill="none"
              stroke="#14B8A6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Professional line */}
            <path
              d={`M 0 ${300 - (data[0].professional / maxRevenue) * 300} ${data.map((d, i) => 
                `L ${(i * 600) / (data.length - 1)} ${300 - (d.professional / maxRevenue) * 300}`
              ).join(' ')}`}
              fill="none"
              stroke="#F97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Enterprise line */}
            <path
              d={`M 0 ${300 - (data[0].enterprise / maxRevenue) * 300} ${data.map((d, i) => 
                `L ${(i * 600) / (data.length - 1)} ${300 - (d.enterprise / maxRevenue) * 300}`
              ).join(' ')}`}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {data.map((d, i) => (
              <g key={i}>
                <circle
                  cx={(i * 600) / (data.length - 1)}
                  cy={300 - (d.starter / maxRevenue) * 300}
                  r="5"
                  fill="#14B8A6"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx={(i * 600) / (data.length - 1)}
                  cy={300 - (d.professional / maxRevenue) * 300}
                  r="5"
                  fill="#F97316"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx={(i * 600) / (data.length - 1)}
                  cy={300 - (d.enterprise / maxRevenue) * 300}
                  r="5"
                  fill="#8B5CF6"
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
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
