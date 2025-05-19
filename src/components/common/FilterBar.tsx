import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from './Button';

interface FilterOption {
  id: string;
  label: string;
  options?: {
    value: string;
    label: string;
  }[];
  type: 'select' | 'date' | 'search' | 'checkbox';
}

interface FilterBarProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, any>) => void;
  activeFilters: Record<string, any>;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  activeFilters,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<Record<string, any>>(activeFilters);

  const handleFilterChange = (id: string, value: any) => {
    const newFilters = {
      ...localFilters,
      [id]: value,
    };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const clearFilters = () => {
    const emptyFilters = filters.reduce((acc, filter) => {
      acc[filter.id] = filter.type === 'select' ? '' : filter.type === 'checkbox' ? [] : '';
      return acc;
    }, {} as Record<string, any>);
    
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).filter(
    key => activeFilters[key] && 
    (Array.isArray(activeFilters[key]) ? activeFilters[key].length > 0 : activeFilters[key] !== '')
  ).length;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 ${className}`}>
      {/* Filter Bar Header */}
      <div className="px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={clearFilters}
          >
            Clear
          </Button>
          <Button
            size="sm"
            variant={isExpanded ? 'secondary' : 'primary'}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Close' : 'Edit Filters'}
          </Button>
        </div>
      </div>

      {/* Filter Options */}
      {isExpanded && (
        <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filters.map((filter) => (
              <div key={filter.id} className="space-y-1">
                <label htmlFor={filter.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {filter.label}
                </label>
                
                {filter.type === 'select' && (
                  <select
                    id={filter.id}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    value={localFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  >
                    <option value="">All</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {filter.type === 'search' && (
                  <input
                    type="text"
                    id={filter.id}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    value={localFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    placeholder={`Search ${filter.label.toLowerCase()}`}
                  />
                )}

                {filter.type === 'date' && (
                  <input
                    type="date"
                    id={filter.id}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    value={localFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  />
                )}

                {filter.type === 'checkbox' && filter.options && (
                  <div className="mt-1 space-y-2">
                    {filter.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          checked={(localFilters[filter.id] || []).includes(option.value)}
                          onChange={(e) => {
                            const currentValues = localFilters[filter.id] || [];
                            const newValues = e.target.checked
                              ? [...currentValues, option.value]
                              : currentValues.filter((v: string) => v !== option.value);
                            handleFilterChange(filter.id, newValues);
                          }}
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button
              variant="primary"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && !isExpanded && (
        <div className="p-3 flex flex-wrap gap-2">
          {Object.keys(activeFilters).map((key) => {
            const filter = filters.find((f) => f.id === key);
            if (!filter) return null;
            
            if (!activeFilters[key] || 
                (Array.isArray(activeFilters[key]) && activeFilters[key].length === 0) || 
                activeFilters[key] === '') {
              return null;
            }
            
            if (Array.isArray(activeFilters[key])) {
              return activeFilters[key].map((value: string) => {
                const option = filter.options?.find((o) => o.value === value);
                return (
                  <div
                    key={`${key}-${value}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {filter.label}: {option?.label || value}
                    <button
                      type="button"
                      className="ml-1 inline-flex text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none"
                      onClick={() => {
                        const newValues = activeFilters[key].filter((v: string) => v !== value);
                        const newFilters = { ...activeFilters, [key]: newValues };
                        setLocalFilters(newFilters);
                        onFilterChange(newFilters);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              });
            }
            
            return (
              <div
                key={key}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              >
                {filter.label}: {filter.options?.find((o) => o.value === activeFilters[key])?.label || activeFilters[key]}
                <button
                  type="button"
                  className="ml-1 inline-flex text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none"
                  onClick={() => {
                    const newFilters = { ...activeFilters, [key]: filter.type === 'select' ? '' : filter.type === 'checkbox' ? [] : '' };
                    setLocalFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterBar;