import React from 'react';

const FormField = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  className = '',
  children,
  ...props
}) => {
  // Si hay children, renderizar un contenedor personalizado (útil para selects, etc.)
  if (children) {
    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label htmlFor={id} className="block text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {children}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  // Renderizar un campo de entrada estándar
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          {...props}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
