import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FormField from '../ui/FormField';

const FormularioPago = ({ 
  initialData = {}, 
  onSubmit, 
  clientes = [], 
  operaciones = [], 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    cliente: '',
    operacion: '',
    monto: '',
    fecha: new Date().toISOString().split('T')[0],
    metodoPago: 'Efectivo',
    numeroComprobante: '',
    estado: 'Pendiente',
    observaciones: ''
  });
  
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [operacionSeleccionada, setOperacionSeleccionada] = useState(null);
  const [errors, setErrors] = useState({});

  // Cargar datos iniciales si se está editando un pago existente
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        ...initialData,
        fecha: initialData.fecha ? new Date(initialData.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
      
      // Buscar y establecer el cliente seleccionado
      const cliente = clientes.find(c => c.id === initialData.clienteId);
      setClienteSeleccionado(cliente || null);
      
      // Buscar y establecer la operación seleccionada
      const operacion = operaciones.find(o => o.id === initialData.operacionId);
      setOperacionSeleccionada(operacion || null);
    }
  }, [initialData, clientes, operaciones]);

  // Actualizar las operaciones disponibles cuando cambia el cliente seleccionado
  useEffect(() => {
    if (clienteSeleccionado) {
      // Filtrar operaciones por cliente seleccionado
      const operacionesCliente = operaciones.filter(
        op => op.clienteId === clienteSeleccionado.id
      );
      
      // Si hay operaciones disponibles y no hay una seleccionada, seleccionar la primera
      if (operacionesCliente.length > 0 && !operacionSeleccionada) {
        setOperacionSeleccionada(operacionesCliente[0]);
        setFormData(prev => ({
          ...prev,
          operacion: operacionesCliente[0].id,
          clienteId: clienteSeleccionado.id,
          operacionId: operacionesCliente[0].id
        }));
      }
    }
  }, [clienteSeleccionado, operaciones, operacionSeleccionada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar errores al cambiar un campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleClienteChange = (e) => {
    const clienteId = parseInt(e.target.value);
    const cliente = clientes.find(c => c.id === clienteId);
    
    setClienteSeleccionado(cliente || null);
    setOperacionSeleccionada(null);
    
    setFormData({
      ...formData,
      cliente: clienteId,
      clienteId: clienteId,
      operacion: '',
      operacionId: null
    });
  };

  const handleOperacionChange = (e) => {
    const operacionId = parseInt(e.target.value);
    const operacion = operaciones.find(o => o.id === operacionId);
    
    setOperacionSeleccionada(operacion || null);
    
    setFormData({
      ...formData,
      operacion: operacionId,
      operacionId: operacionId
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clienteId) newErrors.cliente = 'Debe seleccionar un cliente';
    if (!formData.operacionId) newErrors.operacion = 'Debe seleccionar una operación';
    if (!formData.monto || formData.monto <= 0) newErrors.monto = 'El monto debe ser mayor a 0';
    if (!formData.fecha) newErrors.fecha = 'La fecha es obligatoria';
    if (!formData.metodoPago) newErrors.metodoPago = 'Debe seleccionar un método de pago';
    if (!formData.numeroComprobante) newErrors.numeroComprobante = 'El número de comprobante es obligatorio';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Llamar a la función onSubmit pasada como prop
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Selección de cliente */}
          <FormField
            label="Cliente"
            name="cliente"
            error={errors.cliente}
            required
          >
            <select
              name="cliente"
              value={formData.clienteId || ''}
              onChange={handleClienteChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              disabled={isLoading}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </FormField>

          {/* Selección de operación */}
          <FormField
            label="Operación"
            name="operacion"
            error={errors.operacion}
            required
          >
            <select
              name="operacion"
              value={formData.operacionId || ''}
              onChange={handleOperacionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              disabled={!clienteSeleccionado || isLoading}
            >
              <option value="">Seleccione una operación</option>
              {operaciones
                .filter(op => !clienteSeleccionado || op.clienteId === clienteSeleccionado.id)
                .map(operacion => (
                  <option key={operacion.id} value={operacion.id}>
                    {operacion.id} - {new Date(operacion.fechaInicio).toLocaleDateString()} - {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(operacion.monto)}
                  </option>
                ))
              }
            </select>
          </FormField>

          {/* Monto del pago */}
          <FormField
            label="Monto"
            name="monto"
            error={errors.monto}
            required
          >
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Ingrese el monto del pago"
              min="0"
              step="0.01"
              disabled={isLoading}
            />
          </FormField>

          {/* Fecha de pago */}
          <FormField
            label="Fecha"
            name="fecha"
            error={errors.fecha}
            required
          >
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              disabled={isLoading}
            />
          </FormField>

          {/* Método de pago */}
          <FormField
            label="Método de pago"
            name="metodoPago"
            error={errors.metodoPago}
            required
          >
            <select
              name="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              disabled={isLoading}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia bancaria</option>
              <option value="Tarjeta">Tarjeta de crédito/débito</option>
              <option value="Cheque">Cheque</option>
              <option value="Otro">Otro</option>
            </select>
          </FormField>

          {/* Número de comprobante */}
          <FormField
            label="Número de comprobante"
            name="numeroComprobante"
            error={errors.numeroComprobante}
            required
          >
            <input
              type="text"
              name="numeroComprobante"
              value={formData.numeroComprobante}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Ingrese el número de comprobante"
              disabled={isLoading}
            />
          </FormField>

          {/* Estado del pago */}
          <FormField
            label="Estado"
            name="estado"
            error={errors.estado}
          >
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              disabled={isLoading}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </FormField>
        </div>

        {/* Observaciones */}
        <FormField
          label="Observaciones"
          name="observaciones"
          error={errors.observaciones}
        >
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder="Ingrese observaciones adicionales sobre el pago"
            rows={3}
            disabled={isLoading}
          />
        </FormField>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : initialData.id ? 'Actualizar pago' : 'Registrar pago'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FormularioPago;
