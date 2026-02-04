
import { pharmaciesData } from '../../../mocks/pharmaciesData';

export default function PharmacySummaryCards() {
  const totalPharmacies = pharmaciesData.length;
  const activeAccounts = pharmaciesData.filter(p => p.accountStatus === 'active').length;
  const suspendedAccounts = pharmaciesData.filter(p => p.accountStatus === 'suspended').length;
  const premiumPlans = pharmaciesData.filter(p => p.planType === 'Premium').length;

  const cards = [
    {
      title: 'Total Pharmacies',
      value: totalPharmacies,
      icon: 'ri-store-2-line',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900'
    },
    {
      title: 'Active Accounts',
      value: activeAccounts,
      icon: 'ri-checkbox-circle-line',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      textColor: 'text-green-900'
    },
    {
      title: 'Suspended Accounts',
      value: suspendedAccounts,
      icon: 'ri-error-warning-line',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      textColor: 'text-red-900'
    },
    {
      title: 'Premium Plans',
      value: premiumPlans,
      icon: 'ri-vip-crown-line',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-900'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-lg p-6 border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
            </div>
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <i className={`${card.icon} text-2xl ${card.iconColor}`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
