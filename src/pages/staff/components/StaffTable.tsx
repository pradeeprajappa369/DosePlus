
import { useState } from 'react';
import { Staff } from '../../../mocks/staffData';

interface StaffTableProps {
  staff?: Staff[]; // made optional for robustness
  onView: (staff: Staff) => void;
  onEdit: (staff: Staff) => void;
  onToggleStatus: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
}

/**
 * StaffTable – displays a responsive table / card list of staff members.
 * Includes defensive checks and minimal error handling to avoid runtime crashes.
 */
export default function StaffTable({
  staff = [], // default to empty array if not provided
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: StaffTableProps) {
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  /** Formats an ISO date string to a readable format. Returns a fallback on invalid dates. */
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  /** Returns Tailwind colour classes based on role name. */
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Pharmacist':
        return 'bg-teal-100 text-teal-700';
      case 'Cashier':
        return 'bg-orange-100 text-orange-700';
      case 'Inventory Staff':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  /** Toggles the visibility of the mobile action menu for a particular staff member. */
  const handleActionClick = (staffId: string) => {
    setOpenActionMenu((prev) => (prev === staffId ? null : staffId));
  };

  /** Helper to safely generate initials from a name string. */
  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Staff Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Created Date
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-teal-600">
                        {getInitials(member.name)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{member.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                      member.role,
                    )}`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        member.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(member.createdDate)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onView(member)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      title="View"
                    >
                      <i className="ri-eye-line text-gray-500"></i>
                    </button>
                    <button
                      onClick={() => onEdit(member)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <i className="ri-edit-line text-gray-500"></i>
                    </button>
                    <button
                      onClick={() => onToggleStatus(member)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      title={member.status === 'Active' ? 'Disable' : 'Enable'}
                    >
                      <i
                        className={`${
                          member.status === 'Active' ? 'ri-toggle-fill text-green-500' : 'ri-toggle-line text-gray-400'
                        } text-xl`}
                      ></i>
                    </button>
                    <button
                      onClick={() => onDelete(member)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line text-red-500"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {staff.map((member) => (
          <div key={member.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-teal-600">{getInitials(member.name)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => handleActionClick(member.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <i className="ri-more-2-fill text-gray-500"></i>
                </button>
                {openActionMenu === member.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button
                      onClick={() => {
                        onView(member);
                        setOpenActionMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                    >
                      <i className="ri-eye-line"></i> View
                    </button>
                    <button
                      onClick={() => {
                        onEdit(member);
                        setOpenActionMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                    >
                      <i className="ri-edit-line"></i> Edit
                    </button>
                    <button
                      onClick={() => {
                        onToggleStatus(member);
                        setOpenActionMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                    >
                      <i className={member.status === 'Active' ? 'ri-toggle-fill' : 'ri-toggle-line'}></i>
                      {member.status === 'Active' ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => {
                        onDelete(member);
                        setOpenActionMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <i className="ri-delete-bin-line"></i> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                  member.role,
                )}`}
              >
                {member.role}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    member.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                {member.status}
              </span>
              <span className="text-xs text-gray-500">
                Added {formatDate(member.createdDate)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
