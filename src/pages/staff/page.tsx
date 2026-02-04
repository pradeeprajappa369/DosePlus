
import { useState, useMemo } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import StaffSummaryCards from './components/StaffSummaryCards';
import StaffTable from './components/StaffTable';
import AddEditStaffModal from './components/AddEditStaffModal';
import ViewStaffModal from './components/ViewStaffModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import { staffData, Staff } from '../../mocks/staffData';

export default function StaffPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [staff, setStaff] = useState<Staff[]>(staffData);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal states
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      totalStaff: staff.length,
      activeStaff: staff.filter(s => s.status === 'Active').length,
      inactiveStaff: staff.filter(s => s.status === 'Inactive').length,
      pharmacists: staff.filter(s => s.role === 'Pharmacist').length,
    };
  }, [staff]);

  // Filter staff
  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        member.name.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.phone.includes(searchTerm);

      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [staff, searchTerm, roleFilter, statusFilter]);

  const handleAddStaff = (newStaff: Omit<Staff, 'id' | 'createdDate' | 'lastLogin'>) => {
    const staffMember: Staff = {
      id: `STF${String(staff.length + 1).padStart(3, '0')}`,
      ...newStaff,
      createdDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
    };
    setStaff([staffMember, ...staff]);
  };

  const handleEditStaff = (updatedStaff: Omit<Staff, 'id' | 'createdDate' | 'lastLogin'>) => {
    if (selectedStaff) {
      setStaff(
        staff.map(s =>
          s.id === selectedStaff.id ? { ...s, ...updatedStaff } : s
        )
      );
    }
  };

  const handleToggleStatus = (member: Staff) => {
    setStaff(
      staff.map(s =>
        s.id === member.id
          ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
          : s
      )
    );
  };

  const handleDeleteStaff = () => {
    if (selectedStaff) {
      setStaff(staff.filter(s => s.id !== selectedStaff.id));
      setIsDeleteModalOpen(false);
      setSelectedStaff(null);
    }
  };

  const openViewModal = (member: Staff) => {
    setSelectedStaff(member);
    setIsViewModalOpen(true);
  };

  const openEditModal = (member: Staff) => {
    setSelectedStaff(member);
    setIsAddEditModalOpen(true);
  };

  const openDeleteModal = (member: Staff) => {
    setSelectedStaff(member);
    setIsDeleteModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedStaff(null);
    setIsAddEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <Header />

      <main
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        } mt-20 p-8`}
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Staff Management
            </h1>
            <p className="text-sm text-gray-600">
              Manage your pharmacy staff and their access
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            <i className="ri-user-add-line text-lg"></i>
            Add Staff
          </button>
        </div>

        {/* Summary Cards */}
        <StaffSummaryCards stats={stats} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer bg-white min-w-[150px]"
          >
            <option value="all">All Roles</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Cashier">Cashier</option>
            <option value="Inventory Staff">Inventory Staff</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer bg-white min-w-[140px]"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Staff Table or Empty State */}
        {staff.length === 0 ? (
          <EmptyState onAddStaff={openAddModal} />
        ) : filteredStaff.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-search-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <StaffTable
            staff={filteredStaff}
            onView={openViewModal}
            onEdit={openEditModal}
            onToggleStatus={handleToggleStatus}
            onDelete={openDeleteModal}
          />
        )}
      </main>

      {/* Modals */}
      <AddEditStaffModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setSelectedStaff(null);
        }}
        onSave={selectedStaff ? handleEditStaff : handleAddStaff}
        editStaff={selectedStaff}
      />

      <ViewStaffModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedStaff(null);
        }}
        staff={selectedStaff}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStaff(null);
        }}
        onConfirm={handleDeleteStaff}
        staff={selectedStaff}
      />
    </div>
  );
}
