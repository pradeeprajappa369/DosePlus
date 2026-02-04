interface PharmacyActivityChartProps {
  data: Array<{ status: string; count: number; percentage: number; color: string }>;
}

export default function PharmacyActivityChart({ data }: PharmacyActivityChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  let currentAngle = -90;

  const createArc = (startAngle: number, endAngle: number) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const x1 = 100 + 80 * Math.cos(start);
    const y1 = 100 + 80 * Math.sin(start);
    const x2 = 100 + 80 * Math.cos(end);
    const y2 = 100 + 80 * Math.sin(end);

    return `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Pharmacy Activity</h3>
        <p className="text-sm text-gray-500 mt-1">Active vs Inactive pharmacies</p>
      </div>

      <div className="flex items-center justify-center gap-8">
        {/* Donut Chart */}
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map((item, index) => {
              const angle = (item.count / total) * 360;
              const path = createArc(currentAngle, currentAngle + angle);
              currentAngle += angle;

              return (
                <path
                  key={index}
                  d={path}
                  fill={item.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
            {/* Center circle for donut effect */}
            <circle cx="100" cy="100" r="50" fill="white" />
            <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
              {total}
            </text>
            <text x="100" y="115" textAnchor="middle" className="text-xs fill-gray-500">
              Total
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.status}</p>
                <p className="text-xs text-gray-500">
                  {item.count} pharmacies ({item.percentage}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
