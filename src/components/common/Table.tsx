import React, { ReactNode } from 'react';

interface Column<T> {
  key: string;
  title: string;
  render?: (item: T) => ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  rowKey: (item: T) => string;
  onRowClick?: (item: T) => void;
  selectedRows?: string[];
  selectable?: boolean;
  onSelectChange?: (selectedKeys: string[]) => void;
}

function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data found',
  rowKey,
  onRowClick,
  selectedRows = [],
  selectable = false,
  onSelectChange,
}: TableProps<T>) {
  // Handle row selection toggle
  const handleSelectRow = (item: T) => {
    if (!onSelectChange) return;
    
    const key = rowKey(item);
    if (selectedRows.includes(key)) {
      onSelectChange(selectedRows.filter(k => k !== key));
    } else {
      onSelectChange([...selectedRows, key]);
    }
  };
  
  // Handle select all toggle
  const handleSelectAll = () => {
    if (!onSelectChange) return;
    
    if (selectedRows.length === data.length) {
      onSelectChange([]);
    } else {
      onSelectChange(data.map(item => rowKey(item)));
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-750">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  {selectable && <th className="px-6 py-3 w-12"></th>}
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      style={{ width: column.width }}
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {selectable && (
                      <td className="px-6 py-4">
                        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{emptyMessage}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-750">
            <tr>
              {selectable && (
                <th className="px-6 py-3 w-12">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      checked={data.length > 0 && selectedRows.length === data.length}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item) => {
              const key = rowKey(item);
              const isSelected = selectedRows.includes(key);
              
              return (
                <tr
                  key={key}
                  className={`
                    ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750' : ''}
                    ${isSelected ? 'bg-blue-50 dark:bg-blue-900/10' : ''}
                  `}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                >
                  {selectable && (
                    <td className="px-6 py-4" onClick={(e) => { e.stopPropagation(); handleSelectRow(item); }}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                          checked={isSelected}
                          onChange={() => {}}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? column.render(item) : (item as any)[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;