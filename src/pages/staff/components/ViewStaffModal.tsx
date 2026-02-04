
import { Staff } from '../../../mocks/staffData';

interface ViewStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
}

export default function ViewStaffModal({
  isOpen,
  onClose,
  staff,
}: ViewStaffModalProps) {
  // Guard clause – render nothing if modal is closed or staff data is missing
  if (!isOpen || !staff) return null;

  // Helper: safely format ISO date strings
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Helper: colour class for role badge
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

  // Helper: list of permissions per role
  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'Pharmacist':
        return [
          'View & manage inventory',
          'Process sales',
          'View customer records',
          'Generate reports',
        ];
      case 'Cashier':
        return [
          'Process sales',
          'View inventory',
          'Handle payments',
          'Print invoices',
        ];
      case 'Inventory Staff':
        return [
          'Manage inventory',
          'Update stock levels',
          'Track expiry dates',
          'Generate stock reports',
        ];
      default:
        return [];
    }
  };

  // Derive initials safely – fallback to first two characters of name if split fails
  const getInitials = (name: string) => {
    if (!name) return '??';
    const parts = name.split(' ');
    const initials = parts.map((n) => n[0] ?? '').join('');
    return initials.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-teal-600">
                {getInitials(staff.name)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{staff.name}</h2>
              <p className="text-xs text-gray-500">Staff ID: {staff.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Status & Role */}
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getRoleBadgeColor(
                  staff.role
                )}`}
              >
                <i className="ri-user-settings-line mr-1.5"></i>
                {staff.role}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  staff.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-1.5 ${
                    staff.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                {staff.status}
              </span>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <i className="ri-mail-line text-gray-500"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{staff.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <i className="ri-phone-line text-gray-500"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{staff.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Activity Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Last Login</p>
                  <p className="text-sm font-medium text-gray-900">
                    {staff.lastLogin || 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Created Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(staff.createdDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Role Permissions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Role Permissions
              </h3>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <ul className="space-y-2">
                  {getRolePermissions(staff.role).map((permission, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-teal-800"
                    >
                      <i className="ri-checkbox-circle-fill text-teal-600"></i>
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
