import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  footer?: ReactNode;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  footer,
  isLoading = false,
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Card Header */}
      {(title || subtitle) && (
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      
      {/* Card Content */}
      <div className={`px-5 py-4 ${isLoading ? 'opacity-50' : ''}`}>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ) : (
          children
        )}
      </div>
      
      {/* Card Footer */}
      {footer && (
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;