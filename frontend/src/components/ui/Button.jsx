import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  fullWidth = false,
  ...props
}) => {
  // Definir estilos según la variante
  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow',
    outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50'
  };

  // Definir estilos según el tamaño
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg'
  };

  const buttonStyles = `
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    rounded-xl font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5
    flex items-center justify-center
    ${fullWidth ? 'w-full' : 'min-w-max'}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <span className="inline-flex items-center">{children}</span>
    </button>
  );
};

export default Button;
