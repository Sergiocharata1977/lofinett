import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

const CobranzaModal = ({ isOpen, onClose, onSave, clientes = [], operaciones = [] }) => {
  const [cobranza, setCobranza] = useState({
    clienteId: '',
    operacionId: '',
    monto: '',
    fecha: new Date().toISOString().split('T')[0],
    metodoPago: 'Efectivo',
    numeroRecibo: '',
    observaciones: ''
  });

  const [operacionesFiltradas, setOperacionesFiltradas] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [operacionSeleccionada, setOperacionSeleccionada] = useState(null);
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCobranza({
        clienteId: '',
        operacionId: '',
        monto: '',
        fecha: new Date().toISOString().split('T')[0],
        metodoPago: 'Efectivo',
        numeroRecibo: '',
        observaciones: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  // Filter operations by selected client
  useEffect(() => {
    if (cobranza.clienteId) {
      const filtradas = operaciones.filter(op => op.clienteId === parseInt(cobranza.clienteId));
      setOperacionesFiltradas(filtradas);
      
      // Find selected client
      const cliente = clientes.find(c => c.id === parseInt(cobranza.clienteId));
      setClienteSeleccionado(cliente);
    } else {
      setOperacionesFiltradas([]);
      setClienteSeleccionado(null);
    }
  }, [cobranza.clienteId, operaciones, clientes]);

  // Update selected operation details
  useEffect(() => {
    if (cobranza.operacionId) {
      const operacion = operaciones.find(op => op.id === parseInt(cobranza.operacionId));
      setOperacionSeleccionada(operacion);
    } else {
      setOperacionSeleccionada(null);
    }
  }, [cobranza.operacionId, operaciones]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCobranza(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user fixes the field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!cobranza.clienteId) newErrors.clienteId = 'Seleccione un cliente';
    if (!cobranza.operacionId) newErrors.operacionId = 'Seleccione una operación';
    if (!cobranza.monto || parseFloat(cobranza.monto) <= 0) newErrors.monto = 'Ingrese un monto válido';
    if (!cobranza.fecha) newErrors.fecha = 'Seleccione una fecha';
    if (!cobranza.metodoPago) newErrors.metodoPago = 'Seleccione un método de pago';
    if (!cobranza.numeroRecibo) newErrors.numeroRecibo = 'Ingrese un número de recibo';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add client and operation names for display purposes
      const cobranzaConDetalles = {
        ...cobranza,
        cliente: clienteSeleccionado ? clienteSeleccionado.nombre : '',
        operacion: operacionSeleccionada ? `OP-${operacionSeleccionada.id}` : '',
        estado: 'Pendiente',
        monto: parseFloat(cobranza.monto)
      };
      
      onSave(cobranzaConDetalles);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Registrar Nueva Cobranza</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Cliente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente <span className="text-red-500">*</span>
              </label>
              <select
                name="clienteId"
                value={cobranza.clienteId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                  errors.clienteId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
              {errors.clienteId && (
                <p className="mt-1 text-sm text-red-500">{errors.clienteId}</p>
              )}
            </div>
            
            {/* Operación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operación <span className="text-red-500">*</span>
              </label>
              <select
                name="operacionId"
                value={cobranza.operacionId}
                onChange={handleChange}
                disabled={!cobranza.clienteId}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                  errors.operacionId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar operación</option>
                {operacionesFiltradas.map(op => (
                  <option key={op.id} value={op.id}>
                    OP-{op.id} - ${op.monto.toLocaleString('es-AR')}
                  </option>
                ))}
              </select>
              {errors.operacionId && (
                <p className="mt-1 text-sm text-red-500">{errors.operacionId}</p>
              )}
            </div>
          </div>
          
          {/* Detalles de operación seleccionada */}
          {operacionSeleccionada && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Detalles de la operación</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Monto total</p>
                  <p className="font-medium">${operacionSeleccionada.monto.toLocaleString('es-AR')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fecha inicio</p>
                  <p className="font-medium">{new Date(operacionSeleccionada.fechaInicio).toLocaleDateString('es-AR')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Cuotas</p>
                  <p className="font-medium">{operacionSeleccionada.cuotas}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Monto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monto <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="monto"
                  value={cobranza.monto}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.monto ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.monto && (
                <p className="mt-1 text-sm text-red-500">{errors.monto}</p>
              )}
            </div>
            
            {/* Fecha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={cobranza.fecha}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                  errors.fecha ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fecha && (
                <p className="mt-1 text-sm text-red-500">{errors.fecha}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Método de pago */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método de pago <span className="text-red-500">*</span>
              </label>
              <select
                name="metodoPago"
                value={cobranza.metodoPago}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                  errors.metodoPago ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Cheque">Cheque</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.metodoPago && (
                <p className="mt-1 text-sm text-red-500">{errors.metodoPago}</p>
              )}
            </div>
            
            {/* Número de recibo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de recibo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="numeroRecibo"
                value={cobranza.numeroRecibo}
                onChange={handleChange}
                placeholder="RC-0001"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                  errors.numeroRecibo ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.numeroRecibo && (
                <p className="mt-1 text-sm text-red-500">{errors.numeroRecibo}</p>
              )}
            </div>
          </div>
          
          {/* Observaciones */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={cobranza.observaciones}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Ingrese observaciones adicionales..."
            ></textarea>
          </div>
          
          {/* Disclaimer */}
          <div className="flex items-start mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <AlertCircle className="text-blue-500 mr-3 flex-shrink-0" size={20} />
            <p className="text-sm text-blue-700">
              Esta cobranza quedará en estado "Pendiente" hasta que sea confirmada por un supervisor. 
              Asegúrese de ingresar correctamente los datos del recibo.
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              className="flex items-center"
            >
              <X size={18} className="mr-2" />
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="flex items-center"
            >
              <Save size={18} className="mr-2" />
              Guardar Cobranza
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CobranzaModal;
