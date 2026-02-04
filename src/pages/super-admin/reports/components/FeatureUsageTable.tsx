interface FeatureUsageTableProps {
  data: Array<{
    feature: string;
    enabled: number;
    disabled: number;
    percentage: number;
  }>;
}

export default function FeatureUsageTable({ data }: FeatureUsageTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Feature Usage Report</h3>
        <p className="text-sm text-gray-500 mt-1">Platform feature adoption rates</p>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-xl text-teal-600"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{item.feature}</h4>
                  <p className="text-xs text-gray-500">
                    {item.enabled} enabled / {item.disabled} disabled
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-teal-600">{item.percentage}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-teal-500 h-2 rounded-full transition-all"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
