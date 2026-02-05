import { ReactNode } from "react";

interface PaginatedTableProps {
  headers: string[];
  children: ReactNode;
  page: number;
  limit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  emptyText?: string;
}

export default function PaginatedTable({
  headers,
  children,
  page,
  limit,
  totalItems,
  onPageChange,
  emptyText = "No records found",
}: PaginatedTableProps) {
  const totalPages = Math.ceil(totalItems / limit);

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {totalItems > 0 ? (
              children
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="py-16 text-center text-sm text-gray-500"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {start} to {end} of {totalItems}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-10 h-10 rounded-lg text-sm font-medium ${
                  page === p ? "bg-teal-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
