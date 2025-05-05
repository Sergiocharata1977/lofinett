import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { X, AlertCircle } from 'lucide-react';

// Datos de ejemplo para clientes
const clientesMuestra = [
  { id: 1, nombre: 'Juan Pérez', documento: '25.123.456', limite: 100000, estado: 'Activo' },
  { id: 2, nombre: 'María González', documento: '27.987.654', limite: 150000, estado: 'Activo' },
  { id: 3, nombre: 'Carlos Rodríguez', documento: '20.456.789', limite: 200000, estado: 'Activo' },
  { id: 4, nombre: 'Laura Fernández', documento: '30.789.123', limite: 120000, estado: 'Inactivo' }
];

const OperacionModal = ({ isOpen, onClose, onSave, clienteIdPreseleccionado }) => {
  const initialForm = {
    clienteId: clienteIdPreseleccionado || '',
    monto: '',
    cuotas: 12,
    tasaInteres: 45,
    fechaInicio: new Date().toISOString().split('T')[0],
    observaciones: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [calculoOperacion, setCalculoOperacion] = useState({
    montoCuota: 0,
    totalAPagar: 0,
    fechaVencimiento: ''
  });

  // Cargar clientes al montar el componente
  useEffect(() => {
    // En un entorno real, aquí cargaríamos los clientes desde la API
    setClientes(clientesMuestra);
    
    // Si hay un cliente preseleccionado, actualizar el formulario
    if (clienteIdPreseleccionado) {
      const cliente = clientesMuestra.find(c => c.id === parseInt(clienteIdPreseleccionado));
      if (cliente) {
        setClienteSeleccionado(cliente);
        setFormData(prev => ({ ...prev, clienteId: cliente.id }));
      }
    }
  }, [clienteIdPreseleccionado]);

  // Calcular detalles de la operación cuando cambien los valores relevantes
  useEffect(() => {
    if (formData.monto && formData.cuotas && formData.tasaInteres) {
      // Calcular valores
      calcularOperacion();
    }
  }, [formData.monto, formData.cuotas, formData.tasaInteres, formData.fechaInicio]);

  // Calcular cuota, total y fecha de vencimiento
  const calcularOperacion = () => {
    try {
      const monto = parseFloat(formData.monto.toString().replace(/\./g, '').replace(',', '.'));
      const cuotas = parseInt(formData.cuotas);
      const tasaInteres = parseFloat(formData.tasaInteres) / 100;
      
      // Cálculo de interés simple para este ejemplo
      const interesTotal = monto * tasaInteres;
      const totalAPagar = monto + interesTotal;
      const montoCuota = Math.round(totalAPagar / cuotas);
      
      // Calcular fecha de vencimiento
      const fechaInicio = new Date(formData.fechaInicio);
      const fechaVencimiento = new Date(fechaInicio);
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + cuotas);
      
      setCalculoOperacion({
        montoCuota,
        totalAPagar,
        fechaVencimiento: fechaVencimiento.toISOString().split('T')[0]
      });
    } catch (error) {
      console.error("Error en el cálculo:", error);
    }
  };

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Si cambia el cliente, actualizar el cliente seleccionado
    if (name === 'clienteId' && value) {
      const cliente = clientes.find(c => c.id === parseInt(value));
      setClienteSeleccionado(cliente);
    }

    // Limpiar error cuando el usuario comienza a corregir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clienteId) {
      newErrors.clienteId = 'Debe seleccionar un cliente';
    } else {
      const cliente = clientes.find(c => c.id === parseInt(formData.clienteId));
      if (cliente && cliente.estado !== 'Activo') {
        newErrors.clienteId = 'El cliente seleccionado no está activo';
      }
    }
    
    if (!formData.monto) {
      newErrors.monto = 'El monto es obligatorio';
    } else {
      const montoNumerico = parseFloat(formData.monto.toString().replace(/\./g, '').replace(',', '.'));
      if (isNaN(montoNumerico) || montoNumerico <= 0) {
        newErrors.monto = 'El monto debe ser un número mayor a cero';
      } else if (clienteSeleccionado && montoNumerico > clienteSeleccionado.limite) {
        newErrors.monto = `El monto excede el límite de crédito del cliente (${formatCurrency(clienteSeleccionado.limite)})`;
      }
    }
    
    if (!formData.cuotas) {
      newErrors.cuotas = 'El número de cuotas es obligatorio';
    } else if (isNaN(formData.cuotas) || Number(formData.cuotas) <= 0) {
      newErrors.cuotas = 'El número de cuotas debe ser mayor a cero';
    }
    
    if (!formData.tasaInteres) {
      newErrors.tasaInteres = 'La tasa de interés es obligatoria';
    } else if (isNaN(formData.tasaInteres) || Number(formData.tasaInteres) <= 0) {
      newErrors.tasaInteres = 'La tasa de interés debe ser mayor a cero';
    }
    
    if (!formData.fechaInicio) {
      newErrors.fechaInicio = 'La fecha de inicio es obligatoria';
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
      
      // Crear nueva operación con ID generado
      const nuevaOperacion = {
        ...formData,
        id: Date.now(), // En un entorno real, el backend asignaría un ID
        monto: parseFloat(formData.monto.toString().replace(/\./g, '').replace(',', '.')),
        cliente: clienteSeleccionado ? clienteSeleccionado.nombre : 'Cliente',
        montoCuota: calculoOperacion.montoCuota,
        total: calculoOperacion.totalAPagar,
        fechaVencimiento: calculoOperacion.fechaVencimiento,
        estado: 'Activa'
      };
      
      onSave(nuevaOperacion);
      setFormData(initialForm);
      onClose();
    } catch (error) {
      console.error('Error al guardar la operación:', error);
      setErrors(prev => ({ ...prev, submit: 'Error al guardar la operación. Intente nuevamente.' }));
    } finally {
      setLoading(false);
    }
  };

  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Formatear input de valor monetario
  const formatCurrencyInput = (value) => {
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
    const newValue = formatCurrencyInput(oldValue);
    
    // Actualizar form data
    setFormData(prev => ({
      ...prev,
      monto: newValue ? parseInt(newValue.replace(/\./g, '')) : 0
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
    if (errors.monto) {
      setErrors(prev => ({ ...prev, monto: null }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Nueva Operación</h2>
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
              Cliente *
            </label>
            <select
              name="clienteId"
              value={formData.clienteId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.clienteId ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={!!clienteIdPreseleccionado}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} ({cliente.documento})
                </option>
              ))}
            </select>
            {errors.clienteId && (
              <p className="mt-1 text-sm text-red-600">{errors.clienteId}</p>
            )}
          </div>
          
          {clienteSeleccionado && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-medium text-gray-700 mb-1">Datos del cliente</h3>
              <div className="text-sm text-gray-600">
                <p>Límite de crédito: {formatCurrency(clienteSeleccionado.limite)}</p>
                <p className={`mt-1 ${clienteSeleccionado.estado !== 'Activo' ? 'text-red-600 font-medium' : ''}`}>
                  Estado: {clienteSeleccionado.estado}
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monto *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="text"
                  name="monto"
                  defaultValue={formData.monto ? formatCurrencyInput(formData.monto.toString()) : ''}
                  onInput={handleCurrencyInput}
                  className={`w-full pl-8 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.monto ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Monto"
                />
              </div>
              {errors.monto && (
                <p className="mt-1 text-sm text-red-600">{errors.monto}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.fechaInicio ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.fechaInicio && (
                <p className="mt-1 text-sm text-red-600">{errors.fechaInicio}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad de Cuotas *
              </label>
              <select
                name="cuotas"
                value={formData.cuotas}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.cuotas ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                {[3, 6, 12, 18, 24, 36].map(num => (
                  <option key={num} value={num}>{num} cuotas</option>
                ))}
              </select>
              {errors.cuotas && (
                <p className="mt-1 text-sm text-red-600">{errors.cuotas}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tasa de Interés Anual (%) *
              </label>
              <input
                type="number"
                name="tasaInteres"
                value={formData.tasaInteres}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.5"
                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.tasaInteres ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.tasaInteres && (
                <p className="mt-1 text-sm text-red-600">{errors.tasaInteres}</p>
              )}
            </div>
          </div>
          
          {formData.monto && formData.cuotas && formData.tasaInteres && (
            <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
              <h3 className="font-medium text-primary-800 mb-2">Resumen de la operación</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600">Valor de la cuota:</p>
                  <p className="font-medium text-primary-700">
                    {formatCurrency(calculoOperacion.montoCuota)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total a pagar:</p>
                  <p className="font-medium text-primary-700">
                    {formatCurrency(calculoOperacion.totalAPagar)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vencimiento final:</p>
                  <p className="font-medium text-gray-700">
                    {calculoOperacion.fechaVencimiento ? new Date(calculoOperacion.fechaVencimiento).toLocaleDateString('es-AR') : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interés:</p>
                  <p className="font-medium text-gray-700">
                    {formatCurrency(calculoOperacion.totalAPagar - parseFloat(formData.monto.toString().replace(/\./g, '').replace(',', '.')))}
                  </p>
                </div>
              </div>
            </div>
          )}
          
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
              placeholder="Detalles adicionales sobre la operación"
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
              {loading ? 'Guardando...' : 'Crear Operación'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperacionModal;
