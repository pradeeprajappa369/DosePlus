import React from 'react';

interface SupportKPICardsProps {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  criticalTickets: number;
}

const SupportKPICards: React.FC<SupportKPICardsProps> = ({
  totalTickets,
  openTickets,
  resolvedTickets,
  criticalTickets
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Tickets</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalTickets}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <i className="ri-ticket-2-line text-2xl text-blue-600"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Open Tickets</p>
            <h3 className="text-2xl font-bold text-orange-600">{openTickets}</h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
            <i className="ri-alert-line text-2xl text-orange-600"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Resolved Tickets</p>
            <h3 className="text-2xl font-bold text-green-600">{resolvedTickets}</h3>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Critical Priority</p>
            <h3 className="text-2xl font-bold text-red-600">{criticalTickets}</h3>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
            <i className="ri-error-warning-line text-2xl text-red-600"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportKPICards;
