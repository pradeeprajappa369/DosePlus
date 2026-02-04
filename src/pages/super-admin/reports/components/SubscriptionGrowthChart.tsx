interface SubscriptionGrowthChartProps {
  data: Array<{ month: string; starter: number; professional: number; enterprise: number }>;
}

export default function SubscriptionGrowthChart({ data }: SubscriptionGrowthChartProps) {
  const maxValue = Math.max(
    ...data.map(d => d.starter + d.professional + d.enterprise)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Subscription Growth</h3>
          <p className="text-sm text-gray-500 mt-1">Plan-wise subscription trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-teal-500"></div>
            <span className="text-xs text-gray-600">Starter</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-500"></div>
            <span className="text-xs text-gray-600">Professional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-purple-500"></div>
            <span className="text-xs text-gray-600">Enterprise</span>
          </div>
        </div>
      </div>

      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue}</span>
          <span>{Math.floor(maxValue * 0.66)}</span>
          <span>{Math.floor(maxValue * 0.33)}</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-16 right-0 top-0 bottom-8 flex items-end justify-between gap-4">
          {data.map((item, index) => {
            const total = item.starter + item.professional + item.enterprise;
            const starterHeight = (item.starter / maxValue) * 100;
            const professionalHeight = (item.professional / maxValue) * 100;
            const enterpriseHeight = (item.enterprise / maxValue) * 100;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: '280px' }}>
                  <div className="w-full flex flex-col justify-end" style={{ height: '100%' }}>
                    <div
                      className="w-full bg-purple-500 rounded-t-lg hover:bg-purple-600 transition-colors cursor-pointer relative group"
                      style={{ height: `${enterpriseHeight}%` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-semibold text-white">{item.enterprise}</span>
                      </div>
                    </div>
                    <div
                      className="w-full bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer relative group"
                      style={{ height: `${professionalHeight}%` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-semibold text-white">{item.professional}</span>
                      </div>
                    </div>
                    <div
                      className="w-full bg-teal-500 hover:bg-teal-600 transition-colors cursor-pointer relative group"
                      style={{ height: `${starterHeight}%` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-semibold text-white">{item.starter}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
