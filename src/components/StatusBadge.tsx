import React from 'react';

type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

type StatusBadgeProps = {
  variant?: StatusVariant;
  label: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ variant = 'default', label }) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${variantClasses[variant]}`}>
      {label}
    </span>
  );
};

export default StatusBadge;