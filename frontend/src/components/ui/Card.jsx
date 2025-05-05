import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  footer,
  className = '',
  bodyClassName = '',
  hoverable = false,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white rounded-2xl shadow-soft w-full
        transition-all duration-300
        ${hoverable ? 'hover:shadow-lg transform hover:-translate-y-1' : ''}
        ${className}
      `}
      {...props}
    >
      {(title || subtitle) && (
        <div className="p-5 border-b border-gray-100 w-full">
          {title && <h3 className="text-lg font-semibold text-gray-800 break-words">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1 break-words">{subtitle}</p>}
        </div>
      )}
      
      <div className={`p-5 w-full ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className="p-5 bg-gray-50 border-t border-gray-100 w-full">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
