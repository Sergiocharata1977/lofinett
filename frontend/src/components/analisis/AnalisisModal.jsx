import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

// Datos de muestra para clientes
const clientesMuestra = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María González' },
  { id: 3, nombre: 'Carlos Rodríguez' },
  { id: 4, nombre: 'Laura Fernández' }
];

const AnalisisModal = ({ isOpen, onClose, onSave, clienteId = null, clienteNombre = null }) => {
  const [analisis, setAnalisis] = useState({
    clienteId: clienteId || '',
    fechaAnalisis: new Date().toISOString().split('T')[0],
    analistaResponsable: '',
    resultado: 'En revisión',
    limiteCredito: '',
    puntaje: '',
    observaciones: ''
  });
  
  const [errors, setErrors] = useState({});
  const [clientes, setClientes] = useState([]);
  const [documentosCliente, setDocumentosCliente] = useState([]);
  
  // Cargar clientes al iniciar
  useEffect(() => {
    // En un caso real, haríamos una llamada a la API
    setClientes(clientesMuestra);
  }, []);
  
  // Reiniciar el formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      setAnalisis({
        clienteId: clienteId || '',
        fechaAnalisis: new Date().toISOString().split('T')[0],
        analistaResponsable: '',
        resultado: 'En revisión',
        limiteCredito: '',
        puntaje: '',
        observaciones: ''
      });
      setErrors({});
      
      // Si hay un cliente seleccionado, cargar sus documentos
      if (clienteId) {
        // En un caso real, haríamos una llamada a la API para obtener los documentos del cliente
        setDocumentosCliente([
          { id: 1, tipoDocumento: 'DNI', nombreArchivo: 'dni_cliente.jpg', estado: 'Aprobado' },
          { id: 2, tipoDocumento: 'Comprobante de domicilio', nombreArchivo: 'factura_luz.pdf', estado: 'Pendiente' }
        ]);
      } else {
        setDocumentosCliente([]);
      }
    }
  }, [isOpen, clienteId]);
  
  // Cuando cambia el cliente, actualizamos documentos
  useEffect(() => {
    if (analisis.clienteId && analisis.clienteId !== clienteId) {
      // En un caso real, haríamos una llamada a la API para obtener los documentos del cliente seleccionado
      // Simulamos diferentes documentos para diferentes clientes
      const clienteIdInt = parseInt(analisis.clienteId);
      if (clienteIdInt === 1) {
        setDocumentosCliente([
          { id: 1, tipoDocumento: 'DNI', nombreArchivo: 'dni_juan.jpg', estado: 'Aprobado' },
          { id: 2, tipoDocumento: 'Comprobante de domicilio', nombreArchivo: 'factura_luz_juan.pdf', estado: 'Pendiente' }
        ]);
      } else if (clienteIdInt === 2) {
        setDocumentosCliente([
          { id: 3, tipoDocumento: 'DNI', nombreArchivo: 'dni_maria.jpg', estado: 'Aprobado' },
          { id: 4, tipoDocumento: 'Recibo de sueldo', nombreArchivo: 'recibo_sueldo_maria.pdf', estado: 'Aprobado' }
        ]);
      } else {
        setDocumentosCliente([]);
      }
    }
  }, [analisis.clienteId, clienteId]);
  
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnalisis({
      ...analisis,
      [name]: value
    });
    
    // Limpiar errores cuando se corrige un campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!analisis.clienteId) newErrors.clienteId = 'Seleccione un cliente';
    if (!analisis.analistaResponsable) newErrors.analistaResponsable = 'Ingrese el nombre del analista';
    if (!analisis.limiteCredito) newErrors.limiteCredito = 'Ingrese el límite de crédito';
    if (analisis.limiteCredito <= 0) newErrors.limiteCredito = 'El límite debe ser mayor a 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Preparar datos para guardar
      const analisisGuardar = {
        ...analisis,
        // Si tenemos un cliente preseleccionado, aseguramos que se use el nombre correcto
        clienteNombre: clienteNombre || 
                      clientes.find(c => c.id === parseInt(analisis.clienteId))?.nombre || 
                      'Cliente desconocido',
        limiteCredito: parseFloat(analisis.limiteCredito),
        puntaje: analisis.puntaje ? parseInt(analisis.puntaje) : null
      };
      
      onSave(analisisGuardar);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {clienteId ? `Nuevo Análisis para ${clienteNombre}` : 'Nuevo Análisis de Riesgo'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* Cliente (si no está preseleccionado) */}
          {!clienteId && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente <span className="text-red-500">*</span>
              </label>
              <select
                name="clienteId"
                value={analisis.clienteId}
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
          )}
          
          {/* Documentos asociados */}
          {documentosCliente.length > 0 && (
            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Documentación verificada</h3>
              <ul className="space-y-1">
                {documentosCliente.map(doc => (
                  <li key={doc.id} className="flex items-center text-sm">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      doc.estado === 'Aprobado' ? 'bg-green-500' : 
                      doc.estado === 'Pendiente' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    <span className="text-gray-700">{doc.tipoDocumento}: </span>
                    <span className="ml-1 text-gray-900 font-medium">{doc.nombreArchivo}</span>
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-gray-100">
                      {doc.estado}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Fecha de análisis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de análisis <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fechaAnalisis"
                value={analisis.fechaAnalisis}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {/* Analista responsable */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Analista responsable <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="analistaResponsable"
                value={analisis.analistaResponsable}
                onChange={handleChange}
                placeholder="Nombre del analista"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                  errors.analistaResponsable ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.analistaResponsable && (
                <p className="mt-1 text-sm text-red-500">{errors.analistaResponsable}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Resultado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resultado del análisis
              </label>
              <select
                name="resultado"
                value={analisis.resultado}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="En revisión">En revisión</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>
            
            {/* Límite de crédito */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Límite de crédito asignado <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  name="limiteCredito"
                  value={analisis.limiteCredito}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.limiteCredito ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.limiteCredito && (
                <p className="mt-1 text-sm text-red-500">{errors.limiteCredito}</p>
              )}
            </div>
          </div>
          
          {/* Puntaje crediticio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Puntaje crediticio (0-1000)
            </label>
            <input
              type="number"
              name="puntaje"
              value={analisis.puntaje}
              onChange={handleChange}
              min="0"
              max="1000"
              placeholder="Puntaje asignado al cliente (ej: 750)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          {/* Observaciones */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={analisis.observaciones}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Ingrese observaciones y justificación del análisis..."
            ></textarea>
          </div>
          
          {/* Advertencia si no hay suficientes documentos */}
          {documentosCliente.length === 0 && analisis.clienteId && (
            <div className="flex items-start mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="text-yellow-500 mr-3 flex-shrink-0" size={20} />
              <p className="text-sm text-yellow-700">
                No se encontraron documentos para este cliente. Se recomienda solicitar la documentación necesaria 
                antes de realizar el análisis de riesgo.
              </p>
            </div>
          )}
          
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
              Guardar Análisis
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnalisisModal;
