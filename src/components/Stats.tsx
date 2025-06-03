import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  className?: string;
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel = 'from last period',
  className = '',
}) => {
  const isPositive = change !== undefined && change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeBg = isPositive ? 'bg-green-50' : 'bg-red-50';
  
  return (
    <div className={`bg-white rounded-lg shadow-sm p-5 border border-gray-100 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1 text-gray-900">{value}</h3>
        </div>
        <div className="p-2 rounded-md bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      
      {change !== undefined && (
        <div className="mt-3 flex items-center">
          <div className={`flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${changeBg} ${changeColor}`}>
            {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            <span className="ml-1">{Math.abs(change)}%</span>
          </div>
          <span className="ml-2 text-xs text-gray-500">{changeLabel}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;