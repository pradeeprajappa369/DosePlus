
import React from 'react';

interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  pharmacists: number;
}

interface StaffSummaryCardsProps {
  stats: StaffStats;
}

export default function StaffSummaryCards({ stats }: StaffSummaryCardsProps) {
  // Defensive check – ensure stats is defined and contains valid numbers.
  const safeStats = {
    totalStaff: Number(stats?.totalStaff) || 0,
    activeStaff: Number(stats?.activeStaff) || 0,
    inactiveStaff: Number(stats?.inactiveStaff) || 0,
    pharmacists: Number(stats?.pharmacists) || 0,
  };

  const cards = [
    {
      title: 'Total Staff',
      value: safeStats.totalStaff,
      icon: 'ri-team-line',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      valueColor: 'text-gray-900',
    },
    {
      title: 'Active Staff',
      value: safeStats.activeStaff,
      icon: 'ri-user-follow-line',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-green-600',
    },
    {
      title: 'Inactive Staff',
      value: safeStats.inactiveStaff,
      icon: 'ri-user-unfollow-line',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      valueColor: 'text-red-600',
    },
    {
      title: 'Pharmacists',
      value: safeStats.pharmacists,
      icon: 'ri-nurse-line',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      valueColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{card.title}</p>
              <h3 className={`text-2xl font-bold ${card.valueColor}`}>{card.value}</h3>
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
