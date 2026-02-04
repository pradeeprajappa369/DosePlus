import React, { useState, useEffect } from 'react';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import SuperAdminHeader from '../components/SuperAdminHeader';
import SupportKPICards from './components/SupportKPICards';
import SupportTicketsTable from './components/SupportTicketsTable';
import TicketDetailsModal from './components/TicketDetailsModal';
import RespondTicketModal from './components/RespondTicketModal';
import { supportTickets as initialTickets } from '../../../mocks/supportTicketsData';

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

const SuperAdminSupportPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
  const [respondTicket, setRespondTicket] = useState<Ticket | null>(null);

  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedTickets = localStorage.getItem('supportTickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      setTickets(initialTickets);
      localStorage.setItem('supportTickets', JSON.stringify(initialTickets));
    }
  }, []);

  useEffect(() => {
    let filtered = [...tickets];

    if (statusFilter !== 'All') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (priorityFilter !== 'All') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, statusFilter, priorityFilter, searchQuery]);

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
  const criticalTickets = tickets.filter(t => t.priority === 'Critical').length;

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDetailsModalOpen(true);
  };

  const handleRespondTicket = (ticket: Ticket) => {
    setRespondTicket(ticket);
    setIsRespondModalOpen(true);
  };

  const handleCloseTicket = (ticketId: string) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, status: 'Closed', updatedAt: new Date().toISOString() }
        : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
  };

  const handleChangeStatus = (ticketId: string, newStatus: string) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
        : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus, updatedAt: new Date().toISOString() });
    }
  };

  const handleChangePriority = (ticketId: string, newPriority: string) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, priority: newPriority, updatedAt: new Date().toISOString() }
        : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, priority: newPriority, updatedAt: new Date().toISOString() });
    }
  };

  const handleSubmitResponse = (ticketId: string, response: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const newMessage: Message = {
          id: `MSG-${Date.now()}`,
          sender: 'Support Team',
          message: response,
          timestamp: new Date().toISOString(),
          isAdmin: true
        };
        return {
          ...ticket,
          status: 'In Progress',
          updatedAt: new Date().toISOString(),
          messages: [...ticket.messages, newMessage]
        };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SuperAdminSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <SuperAdminHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
              <p className="text-sm text-gray-600 mt-1">Manage pharmacy support tickets & issues</p>
            </div>

            <SupportKPICards
              totalTickets={totalTickets}
              openTickets={openTickets}
              resolvedTickets={resolvedTickets}
              criticalTickets={criticalTickets}
            />

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                  <div className="relative">
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tickets..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="All">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setStatusFilter('All');
                      setPriorityFilter('All');
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-refresh-line mr-2"></i>
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            <SupportTicketsTable
              tickets={filteredTickets}
              onViewTicket={handleViewTicket}
              onRespondTicket={handleRespondTicket}
              onCloseTicket={handleCloseTicket}
            />
          </div>
        </main>
      </div>

      {isDetailsModalOpen && (
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedTicket(null);
          }}
          onChangeStatus={handleChangeStatus}
          onChangePriority={handleChangePriority}
        />
      )}

      {isRespondModalOpen && (
        <RespondTicketModal
          ticket={respondTicket}
          onClose={() => {
            setIsRespondModalOpen(false);
            setRespondTicket(null);
          }}
          onSubmit={handleSubmitResponse}
        />
      )}
    </div>
  );
};

export default SuperAdminSupportPage;
