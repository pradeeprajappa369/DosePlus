interface PharmacyReport {
  id: string;
  pharmacyName: string;
  plan: string;
  subscriptionStatus: string;
  startDate: string;
  expiryDate: string;
  onlineStore: string;
  status: string;
  monthlyRevenue: number;
  loginFrequency: number;
}

interface PharmacyReportTableProps {
  data: PharmacyReport[];
  onViewPharmacy: (pharmacy: PharmacyReport) => void;
  onViewSubscription: (pharmacy: PharmacyReport) => void;
}

export default function PharmacyReportTable({
  data,
  onViewPharmacy,
  onViewSubscription
}: PharmacyReportTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Expired':
        return 'bg-red-100 text-red-700';
      case 'Trial':
        return 'bg-blue-100 text-blue-700';
      case 'Suspended':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Starter':
        return 'bg-teal-100 text-teal-700';
      case 'Professional':
        return 'bg-orange-100 text-orange-700';
      case 'Enterprise':
        return 'bg-purple-100 text-purple-700';
      case 'Trial':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Detailed Pharmacy Report</h3>
          <p className="text-sm text-gray-500 mt-1">Complete pharmacy analytics</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Pharmacy ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Pharmacy Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Plan
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Subscription Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Start Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Expiry Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Online Store
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((pharmacy) => (
              <tr key={pharmacy.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900 whitespace-nowrap">
                  {pharmacy.id}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {pharmacy.pharmacyName}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(
                      pharmacy.plan
                    )}`}
                  >
                    {pharmacy.plan}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      pharmacy.subscriptionStatus
                    )}`}
                  >
                    {pharmacy.subscriptionStatus}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                  {pharmacy.startDate}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                  {pharmacy.expiryDate}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                  {pharmacy.onlineStore === 'Yes' ? (
                    <span className="text-green-600 font-medium">
                      <i className="ri-check-line"></i> Yes
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      <i className="ri-close-line"></i> No
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pharmacy.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {pharmacy.status}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewPharmacy(pharmacy)}
                      className="text-teal-600 hover:text-teal-700 cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      onClick={() => onViewSubscription(pharmacy)}
                      className="text-purple-600 hover:text-purple-700 cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-file-list-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
