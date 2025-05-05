import React, { useState } from 'react';
import Button from '../ui/Button';
import { X } from 'lucide-react';

const ClienteModal = ({ isOpen, onClose, onSave }) => {
  const initialForm = {
    nombre: '',
    documento: '',
    email: '',
    telefono: '',
    direccion: '',
    limite: 50000,
    estado: 'Activo',
    observaciones: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error cuando el usuario comienza a corregir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.documento.trim()) {
      newErrors.documento = 'El documento es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    }
    
    if (!formData.limite) {
      newErrors.limite = 'El límite de crédito es obligatorio';
    } else if (isNaN(formData.limite) || Number(formData.limite) <= 0) {
      newErrors.limite = 'El límite debe ser un número mayor a cero';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simular retraso de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Crear nuevo cliente con ID generado
      const nuevoCliente = {
        ...formData,
        id: Date.now(), // En un entorno real, el backend asignaría un ID
        fechaAlta: new Date().toISOString().split('T')[0]
      };
      
      onSave(nuevoCliente);
      setFormData(initialForm);
      onClose();
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
      setErrors(prev => ({ ...prev, submit: 'Error al guardar el cliente. Intente nuevamente.' }));
    } finally {
      setLoading(false);
    }
  };

  // Formatear input de valor monetario
  const formatCurrency = (value) => {
    // Eliminar todo lo que no son números
    const onlyNums = value.replace(/[^\d]/g, '');
    // Formatear con separadores de miles
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Manejar input de valor monetario
  const handleCurrencyInput = (e) => {
    const input = e.target;
    const { value, selectionStart } = input;
    
    const cursorPosition = selectionStart;
    const oldValue = value.replace(/\./g, '');
    
    // Formatear nuevo valor
    const newValue = formatCurrency(oldValue);
    
    // Actualizar form data
    setFormData(prev => ({
      ...prev,
      limite: newValue ? parseInt(newValue.replace(/\./g, '')) : 0
    }));
    
    // Actualizar input
    input.value = newValue;
    
    // Ajustar posición del cursor
    setTimeout(() => {
      // Calcular nueva posición del cursor
      const newCursorPos = cursorPosition + (newValue.length - value.length);
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
    
    // Limpiar error cuando el usuario comienza a corregir
    if (errors.limite) {
      setErrors(prev => ({ ...prev, limite: null }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Nuevo Cliente</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.submit && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.nombre ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Nombre y apellido"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documento *
              </label>
              <input
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.documento ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="DNI, CUIT, etc."
              />
              {errors.documento && (
                <p className="mt-1 text-sm text-red-600">{errors.documento}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.telefono ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Número de teléfono"
              />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="email@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección *
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.direccion ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Dirección completa"
            />
            {errors.direccion && (
              <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Límite de Crédito *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="text"
                  name="limite"
                  defaultValue={formatCurrency(formData.limite.toString())}
                  onInput={handleCurrencyInput}
                  className={`w-full pl-8 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.limite ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Monto"
                />
              </div>
              {errors.limite && (
                <p className="mt-1 text-sm text-red-600">{errors.limite}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Notas adicionales sobre el cliente"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cliente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteModal;
