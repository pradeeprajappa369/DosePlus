
import React from "react";

interface EmptyStateProps {
  /** Callback invoked when the user wants to add a new staff member */
  onAddStaff: () => void;
}

/**
 * EmptyState – a simple presentation component that shows a placeholder
 * when no staff members have been added yet.
 *
 * The component is deliberately lightweight and only depends on the
 * `onAddStaff` callback. All styling is handled via Tailwind CSS classes.
 *
 * Robustness improvements:
 * - The `onAddStaff` prop is type‑checked as a required function.
 * - The click handler guards against accidental `null`/`undefined` calls.
 */
export default function EmptyState({ onAddStaff }: EmptyStateProps) {
  // Defensive guard: ensure the callback exists before calling it.
  const handleClick = () => {
    if (typeof onAddStaff === "function") {
      try {
        onAddStaff();
      } catch (err) {
        // In a real app you might want to report this error to a logging service.
        console.error("Error executing onAddStaff:", err);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
      <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="ri-team-line text-4xl text-teal-500"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No staff added yet
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        Start building your team by adding staff members. They will be able to
        access the system based on their assigned roles.
      </p>
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
      >
        <i className="ri-user-add-line text-lg"></i>
        Add Your First Staff
      </button>
    </div>
  );
}
