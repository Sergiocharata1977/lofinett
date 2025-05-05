import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Search, Filter, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DocumentoRow from '../../components/documentos/DocumentoRow';
import DocumentoModal from '../../components/documentos/DocumentoModal';

// Datos de ejemplo para documentos
const documentosMuestra = [
  {
    id: 1,
    clienteId: 1,
    clienteNombre: "Juan Pérez",
    tipoDocumento: "DNI",
    nombreArchivo: "dni_frente_juan_perez.jpg",
    fechaCarga: "2025-04-15",
    estado: "Aprobado",
    observaciones: "Documento válido y vigente"
  },
  {
    id: 2,
    clienteId: 1,
    clienteNombre: "Juan Pérez",
    tipoDocumento: "Comprobante de domicilio",
    nombreArchivo: "factura_luz_abril.pdf",
    fechaCarga: "2025-04-16",
    estado: "Pendiente",
    observaciones: "Pendiente de verificación"
  },
  {
    id: 3,
    clienteId: 2,
    clienteNombre: "María González",
    tipoDocumento: "Recibo de sueldo",
    nombreArchivo: "recibo_sueldo_marzo.pdf",
    fechaCarga: "2025-04-10",
    estado: "Aprobado",
    observaciones: "Sueldo verificado"
  }
];

const FiltrosDocumento = ({ onFilterChange, initialFilters = {} }) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    tipoDocumento: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: '',
    ...initialFilters
  });
  
  const [mostrarFiltrosAvanzados, setMostrarFiltrosAvanzados] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  const aplicarFiltros = () => {
    onFilterChange(filtros);
  };

  const limpiarFiltros = () => {
    const nuevosFiltros = {
      busqueda: '',
      tipoDocumento: '',
      estado: '',
      fechaDesde: '',
      fechaHasta: ''
    };
    
    setFiltros(nuevosFiltros);
    onFilterChange(nuevosFiltros);
  };

  const toggleFiltrosAvanzados = () => {
    setMostrarFiltrosAvanzados(!mostrarFiltrosAvanzados);
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
      {/* Barra de búsqueda principal */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            name="busqueda"
            value={filtros.busqueda}
            onChange={handleInputChange}
            placeholder="Buscar por nombre de archivo o tipo..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="primary" 
            className="flex items-center whitespace-nowrap"
            onClick={aplicarFiltros}
          >
            <Search size={18} className="mr-2" />
            Buscar
          </Button>
          <Button 
            variant={mostrarFiltrosAvanzados ? "primary" : "outline"} 
            className="flex items-center whitespace-nowrap"
            onClick={toggleFiltrosAvanzados}
          >
            <Filter size={18} className="mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Filtros avanzados (visibles solo cuando se activan) */}
      {mostrarFiltrosAvanzados && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Filtro por tipo de documento */}
            <div>
              <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de documento
              </label>
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={filtros.tipoDocumento}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todos</option>
                <option value="DNI">DNI</option>
                <option value="Comprobante de domicilio">Comprobante de domicilio</option>
                <option value="Recibo de sueldo">Recibo de sueldo</option>
                <option value="Declaración de impuestos">Declaración de impuestos</option>
                <option value="Estado de cuenta bancario">Estado de cuenta bancario</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Filtro por estado */}
            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={filtros.estado}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>

            {/* Filtro por fecha desde */}
            <div>
              <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha desde
              </label>
              <input
                type="date"
                id="fechaDesde"
                name="fechaDesde"
                value={filtros.fechaDesde}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filtro por fecha hasta */}
            <div>
              <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha hasta
              </label>
              <input
                type="date"
                id="fechaHasta"
                name="fechaHasta"
                value={filtros.fechaHasta}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Botones para aplicar o limpiar filtros */}
          <div className="flex justify-end mt-4 space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={limpiarFiltros}
            >
              <X size={18} className="mr-2" />
              Limpiar filtros
            </Button>
            <Button 
              variant="primary" 
              className="flex items-center"
              onClick={aplicarFiltros}
            >
              <Search size={18} className="mr-2" />
              Aplicar filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const DocumentosList = () => {
  const { clienteId } = useParams();
  const navigate = useNavigate();
  
  const [documentos, setDocumentos] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    tipoDocumento: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: ''
  });

  // Simulación de carga de datos
  useEffect(() => {
    // En un caso real, aquí haríamos una llamada a la API para obtener los documentos del cliente
    setLoading(true);
    
    setTimeout(() => {
      if (clienteId) {
        // Si tenemos un ID de cliente, filtramos los documentos de ese cliente
        const clienteDocs = documentosMuestra.filter(
          doc => doc.clienteId === parseInt(clienteId)
        );
        
        setDocumentos(clienteDocs);
        
        // Simulamos obtener datos del cliente
        if (clienteDocs.length > 0) {
          setCliente({
            id: parseInt(clienteId),
            nombre: clienteDocs[0].clienteNombre
          });
        } else {
          // Si no hay documentos, podríamos hacer otra llamada para obtener el cliente
          setCliente({
            id: parseInt(clienteId),
            nombre: "Cliente #" + clienteId
          });
        }
      } else {
        // Si no hay ID de cliente, mostramos todos los documentos
        setDocumentos(documentosMuestra);
      }
      
      setLoading(false);
    }, 1000);
  }, [clienteId]);

  // Aplicar filtros a los documentos
  const handleFilterChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    setLoading(true);

    // En un escenario real, haríamos una llamada a la API con los filtros
    // Para este ejemplo, filtraremos los datos de muestra localmente
    setTimeout(() => {
      let documentosFiltrados = clienteId 
        ? documentosMuestra.filter(doc => doc.clienteId === parseInt(clienteId))
        : [...documentosMuestra];
      
      // Filtrar por búsqueda general
      if (nuevosFiltros.busqueda) {
        const busqueda = nuevosFiltros.busqueda.toLowerCase();
        documentosFiltrados = documentosFiltrados.filter(doc => 
          doc.nombreArchivo.toLowerCase().includes(busqueda) ||
          doc.tipoDocumento.toLowerCase().includes(busqueda)
        );
      }
      
      // Filtrar por tipo de documento
      if (nuevosFiltros.tipoDocumento) {
        documentosFiltrados = documentosFiltrados.filter(doc => 
          doc.tipoDocumento === nuevosFiltros.tipoDocumento
        );
      }
      
      // Filtrar por estado
      if (nuevosFiltros.estado) {
        documentosFiltrados = documentosFiltrados.filter(doc => 
          doc.estado === nuevosFiltros.estado
        );
      }
      
      // Filtrar por fecha desde
      if (nuevosFiltros.fechaDesde) {
        const fechaDesde = new Date(nuevosFiltros.fechaDesde);
        documentosFiltrados = documentosFiltrados.filter(doc => 
          new Date(doc.fechaCarga) >= fechaDesde
        );
      }
      
      // Filtrar por fecha hasta
      if (nuevosFiltros.fechaHasta) {
        const fechaHasta = new Date(nuevosFiltros.fechaHasta);
        documentosFiltrados = documentosFiltrados.filter(doc => 
          new Date(doc.fechaCarga) <= fechaHasta
        );
      }
      
      setDocumentos(documentosFiltrados);
      setLoading(false);
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este documento?')) {
      // En un sistema real, aquí se haría una llamada a la API
      setDocumentos(documentos.filter(doc => doc.id !== id));
    }
  };

  const handleSaveDocumento = (nuevoDocumento) => {
    // En un sistema real, aquí se haría una llamada a la API
    const documentoCompleto = {
      ...nuevoDocumento,
      id: documentos.length > 0 ? Math.max(...documentos.map(d => d.id)) + 1 : 1,
      fechaCarga: new Date().toISOString().split('T')[0]
    };
    
    setDocumentos([documentoCompleto, ...documentos]);
    setModalOpen(false);
  };

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="flex items-center">
          {clienteId && (
            <button 
              onClick={() => navigate(`/clientes/${clienteId}`)}
              className="mr-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {cliente ? `Documentos de ${cliente.nombre}` : 'Documentos de Clientes'}
            </h1>
            {cliente && (
              <p className="text-gray-600 mt-1">
                Gestión de documentación requerida para análisis crediticio
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            variant="primary" 
            className="flex items-center"
            onClick={() => setModalOpen(true)}
          >
            <PlusCircle size={18} className="mr-2" />
            Nuevo Documento
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosDocumento 
        onFilterChange={handleFilterChange} 
        initialFilters={filtros}
      />

      {/* Lista de documentos */}
      <Card>
        {loading ? (
          <div className="py-8 px-6 text-center text-gray-500">
            Cargando documentos...
          </div>
        ) : documentos.length === 0 ? (
          <div className="py-8 px-6 text-center text-gray-500">
            No se encontraron documentos. {cliente ? 'Agregue nuevos documentos para este cliente.' : ''}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {!clienteId && (
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Cliente</th>
                  )}
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Tipo de Documento</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Nombre del Archivo</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Fecha de Carga</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Estado</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documentos.map(documento => (
                  <DocumentoRow
                    key={documento.id}
                    documento={documento}
                    onDelete={handleDelete}
                    showCliente={!clienteId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal para nuevo documento */}
      <DocumentoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveDocumento}
        clienteId={clienteId ? parseInt(clienteId) : null}
        clienteNombre={cliente ? cliente.nombre : null}
      />
    </div>
  );
};

export default DocumentosList;
