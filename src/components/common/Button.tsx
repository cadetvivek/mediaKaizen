import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...rest
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-150 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'text-white bg-blue-600 border-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
    secondary: 'text-gray-700 bg-gray-200 border-gray-200 hover:bg-gray-300 focus:ring-gray-500 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600',
    success: 'text-white bg-green-600 border-green-600 hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400',
    danger: 'text-white bg-red-600 border-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
    warning: 'text-gray-900 bg-yellow-500 border-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 disabled:bg-yellow-400',
    outline: 'text-blue-600 bg-transparent border-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combined classes
  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    widthClasses,
    className
  ].join(' ');
  
  // Loading spinner
  const LoadingSpinner = () => (
    <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;