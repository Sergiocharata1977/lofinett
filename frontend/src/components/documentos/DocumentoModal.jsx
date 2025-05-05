import React, { useState, useEffect } from 'react';
import { X, Save, Upload } from 'lucide-react';
import Button from '../ui/Button';

// Datos de muestra para clientes
const clientesMuestra = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María González' },
  { id: 3, nombre: 'Carlos Rodríguez' },
  { id: 4, nombre: 'Laura Fernández' }
];

const DocumentoModal = ({ isOpen, onClose, onSave, clienteId = null, clienteNombre = null }) => {
  const [documento, setDocumento] = useState({
    clienteId: clienteId || '',
    tipoDocumento: '',
    nombreArchivo: '',
    archivo: null,
    observaciones: '',
    estado: 'Pendiente'
  });
  
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [clientes, setClientes] = useState([]);
  
  // Cargar clientes al iniciar
  useEffect(() => {
    // En un caso real, haríamos una llamada a la API
    setClientes(clientesMuestra);
  }, []);
  
  // Reiniciar el formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      setDocumento({
        clienteId: clienteId || '',
        tipoDocumento: '',
        nombreArchivo: '',
        archivo: null,
        observaciones: '',
        estado: 'Pendiente'
      });
      setSelectedFile(null);
      setErrors({});
    }
  }, [isOpen, clienteId]);
  
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumento({
      ...documento,
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
  
  // Manejar la selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setDocumento({
        ...documento,
        nombreArchivo: file.name,
        archivo: file
      });
      
      // Limpiar error de archivo si existe
      if (errors.archivo) {
        setErrors({
          ...errors,
          archivo: null
        });
      }
    }
  };
  
  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!documento.clienteId) newErrors.clienteId = 'Seleccione un cliente';
    if (!documento.tipoDocumento) newErrors.tipoDocumento = 'Seleccione un tipo de documento';
    if (!documento.nombreArchivo) newErrors.archivo = 'Seleccione un archivo';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Preparar datos para guardar
      const documentoGuardar = {
        ...documento,
        // Si tenemos un cliente preseleccionado, aseguramos que se use el nombre correcto
        clienteNombre: clienteNombre || 
                      clientes.find(c => c.id === parseInt(documento.clienteId))?.nombre || 
                      'Cliente desconocido'
      };
      
      onSave(documentoGuardar);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {clienteId ? `Nuevo Documento para ${clienteNombre}` : 'Nuevo Documento'}
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
                value={documento.clienteId}
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
          
          {/* Tipo de documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de documento <span className="text-red-500">*</span>
            </label>
            <select
              name="tipoDocumento"
              value={documento.tipoDocumento}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                errors.tipoDocumento ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar tipo</option>
              <option value="DNI">DNI</option>
              <option value="Comprobante de domicilio">Comprobante de domicilio</option>
              <option value="Recibo de sueldo">Recibo de sueldo</option>
              <option value="Declaración de impuestos">Declaración de impuestos</option>
              <option value="Estado de cuenta bancario">Estado de cuenta bancario</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.tipoDocumento && (
              <p className="mt-1 text-sm text-red-500">{errors.tipoDocumento}</p>
            )}
          </div>
          
          {/* Cargar archivo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Archivo <span className="text-red-500">*</span>
            </label>
            <div 
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 ${
                errors.archivo ? 'border-red-500' : 'border-gray-300'
              }`}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              {selectedFile ? (
                <div className="flex items-center justify-center">
                  <div className="bg-green-100 text-green-800 p-2 rounded-full mr-2">
                    <Upload size={18} />
                  </div>
                  <span className="text-sm">{selectedFile.name}</span>
                </div>
              ) : (
                <div className="text-gray-500">
                  <Upload size={24} className="mx-auto mb-2" />
                  <p className="text-sm">Haga clic para seleccionar un archivo o arrastre y suelte aquí</p>
                </div>
              )}
            </div>
            {errors.archivo && (
              <p className="mt-1 text-sm text-red-500">{errors.archivo}</p>
            )}
          </div>
          
          {/* Estado */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="estado"
              value={documento.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
          
          {/* Observaciones */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={documento.observaciones}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Ingrese observaciones adicionales..."
            ></textarea>
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
              Guardar Documento
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentoModal;
