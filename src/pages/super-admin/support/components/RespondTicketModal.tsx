import React, { useState } from 'react';

interface Ticket {
  id: string;
  pharmacyName: string;
  subject: string;
}

interface RespondTicketModalProps {
  ticket: Ticket | null;
  onClose: () => void;
  onSubmit: (ticketId: string, response: string) => void;
}

const RespondTicketModal: React.FC<RespondTicketModalProps> = ({
  ticket,
  onClose,
  onSubmit
}) => {
  const [response, setResponse] = useState('');

  if (!ticket) return null;

  const handleSubmit = () => {
    if (response.trim()) {
      onSubmit(ticket.id, response);
      setResponse('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Respond to Ticket</h2>
            <p className="text-sm text-gray-500 mt-1">{ticket.id} - {ticket.pharmacyName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{ticket.subject}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Your Response</label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Provide a clear and helpful response to resolve the issue
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!response.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            <i className="ri-send-plane-line mr-2"></i>
            Send Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default RespondTicketModal;
