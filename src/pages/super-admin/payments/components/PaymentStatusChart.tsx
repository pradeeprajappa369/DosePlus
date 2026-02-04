interface PaymentStatusChartProps {
  data: Array<{ status: string; count: number; color: string }>;
}

export default function PaymentStatusChart({ data }: PaymentStatusChartProps) {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Payment Status Breakdown</h3>
        <p className="text-sm text-gray-500 mt-1">Current payment statuses</p>
      </div>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.status}</span>
              <span className="text-sm font-bold text-gray-900">{item.count}</span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-lg transition-all duration-500"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: item.color
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-700">
                  {((item.count / data.reduce((sum, d) => sum + d.count, 0)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
