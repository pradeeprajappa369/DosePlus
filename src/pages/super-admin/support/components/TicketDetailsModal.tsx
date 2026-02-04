import React from 'react';

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isAdmin: boolean;
}

interface Ticket {
  id: string;
  pharmacyId: string;
  pharmacyName: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  messages: Message[];
}

interface TicketDetailsModalProps {
  ticket: Ticket | null;
  onClose: () => void;
  onChangeStatus: (ticketId: string, newStatus: string) => void;
  onChangePriority: (ticketId: string, newPriority: string) => void;
}

const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({
  ticket,
  onClose,
  onChangeStatus,
  onChangePriority
}) => {
  if (!ticket) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-700';
      case 'High':
        return 'bg-orange-100 text-orange-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-orange-100 text-orange-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      case 'Closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ticket Details</h2>
            <p className="text-sm text-gray-500 mt-1">{ticket.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Pharmacy</label>
              <p className="text-sm text-gray-900">{ticket.pharmacyName}</p>
              <p className="text-xs text-gray-500">{ticket.pharmacyId}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Assigned To</label>
              <p className="text-sm text-gray-900">{ticket.assignedTo}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
              <select
                value={ticket.priority}
                onChange={(e) => onChangePriority(ticket.id, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
              <select
                value={ticket.status}
                onChange={(e) => onChangeStatus(ticket.id, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
              <p className="text-sm text-gray-900">{ticket.subject}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
              <p className="text-sm text-gray-600 leading-relaxed">{ticket.description}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation Timeline</h3>
            <div className="space-y-4">
              {ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.isAdmin ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isAdmin ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        <i className={`${message.isAdmin ? 'ri-admin-line' : 'ri-user-line'} text-white text-sm`}></i>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{message.sender}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed ml-10">{message.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Created:</span>
                <span className="ml-2 text-gray-900">{formatDate(ticket.createdAt)}</span>
              </div>
              <div>
                <span className="text-gray-500">Last Updated:</span>
                <span className="ml-2 text-gray-900">{formatDate(ticket.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;
