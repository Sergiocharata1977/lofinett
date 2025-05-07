import React from 'react';

const StatCard = ({ title, value, icon, change, description, className = "" }) => {
  const isPositiveChange = change > 0;
  
  return (
    <div className={`bg-white rounded-xl shadow-soft p-6 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        {icon && (
          <div className="p-3 rounded-full bg-primary-50 text-primary-500">
            {icon}
          </div>
        )}
      </div>
      
      {(change !== undefined || description) && (
        <div className="mt-2">
          {change !== undefined && (
            <span className={`inline-flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'} text-sm mr-2`}>
              {isPositiveChange ? '↑' : '↓'} {Math.abs(change)}%
            </span>
          )}
          {description && (
            <span className="text-gray-500 text-sm">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
