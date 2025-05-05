import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Search, Filter, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import AnalisisRow from '../../components/analisis/AnalisisRow';
import AnalisisModal from '../../components/analisis/AnalisisModal';

// Datos de ejemplo para análisis de riesgo
const analisisMuestra = [
  {
    id: 1,
    clienteId: 1,
    clienteNombre: "Juan Pérez",
    fechaAnalisis: "2025-04-20",
    analistaResponsable: "Ana Martínez",
    resultado: "Aprobado",
    limiteCredito: 100000,
    puntaje: 750,
    observaciones: "Cliente con buen historial crediticio y documentación completa."
  },
  {
    id: 2,
    clienteId: 2,
    clienteNombre: "María González",
    fechaAnalisis: "2025-04-15",
    analistaResponsable: "Juan Fernández",
    resultado: "Aprobado",
    limiteCredito: 80000,
    puntaje: 680,
    observaciones: "Se aprueba con un límite reducido debido a compromisos financieros existentes."
  },
  {
    id: 3,
    clienteId: 3,
    clienteNombre: "Carlos Rodríguez",
    fechaAnalisis: "2025-04-10",
    analistaResponsable: "Luis Gómez",
    resultado: "En revisión",
    limiteCredito: 50000,
    puntaje: 600,
    observaciones: "Pendiente de verificación de ingresos adicionales."
  },
  {
    id: 4,
    clienteId: 1,
    clienteNombre: "Juan Pérez",
    fechaAnalisis: "2025-03-05",
    analistaResponsable: "Ana Martínez",
    resultado: "Rechazado",
    limiteCredito: 0,
    puntaje: 450,
    observaciones: "Historial crediticio negativo en aquel momento. Se realizó nuevo análisis (ID: 1) con resultado favorable."
  }
];

const FiltrosAnalisis = ({ onFilterChange, initialFilters = {} }) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    resultado: '',
    analistaResponsable: '',
    fechaDesde: '',
    fechaHasta: '',
    limiteMin: '',
    limiteMax: '',
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
      resultado: '',
      analistaResponsable: '',
      fechaDesde: '',
      fechaHasta: '',
      limiteMin: '',
      limiteMax: ''
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
            placeholder="Buscar por cliente o analista..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Filtro por resultado */}
            <div>
              <label htmlFor="resultado" className="block text-sm font-medium text-gray-700 mb-1">
                Resultado
              </label>
              <select
                id="resultado"
                name="resultado"
                value={filtros.resultado}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todos</option>
                <option value="Aprobado">Aprobado</option>
                <option value="En revisión">En revisión</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>

            {/* Filtro por analista */}
            <div>
              <label htmlFor="analistaResponsable" className="block text-sm font-medium text-gray-700 mb-1">
                Analista
              </label>
              <input
                type="text"
                id="analistaResponsable"
                name="analistaResponsable"
                value={filtros.analistaResponsable}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Nombre del analista"
              />
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

            {/* Filtro por límite mínimo */}
            <div>
              <label htmlFor="limiteMin" className="block text-sm font-medium text-gray-700 mb-1">
                Límite mínimo
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  id="limiteMin"
                  name="limiteMin"
                  value={filtros.limiteMin}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Filtro por límite máximo */}
            <div>
              <label htmlFor="limiteMax" className="block text-sm font-medium text-gray-700 mb-1">
                Límite máximo
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  id="limiteMax"
                  name="limiteMax"
                  value={filtros.limiteMax}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="1000000"
                  min="0"
                />
              </div>
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

const AnalisisList = () => {
  const { clienteId } = useParams();
  const navigate = useNavigate();
  
  const [analisis, setAnalisis] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    resultado: '',
    analistaResponsable: '',
    fechaDesde: '',
    fechaHasta: '',
    limiteMin: '',
    limiteMax: ''
  });

  // Simulación de carga de datos
  useEffect(() => {
    // En un caso real, aquí haríamos una llamada a la API para obtener los análisis del cliente
    setLoading(true);
    
    setTimeout(() => {
      if (clienteId) {
        // Si tenemos un ID de cliente, filtramos los análisis de ese cliente
        const clienteAnalisis = analisisMuestra.filter(
          a => a.clienteId === parseInt(clienteId)
        );
        
        setAnalisis(clienteAnalisis);
        
        // Simulamos obtener datos del cliente
        if (clienteAnalisis.length > 0) {
          setCliente({
            id: parseInt(clienteId),
            nombre: clienteAnalisis[0].clienteNombre
          });
        } else {
          // Si no hay análisis, podríamos hacer otra llamada para obtener el cliente
          setCliente({
            id: parseInt(clienteId),
            nombre: "Cliente #" + clienteId
          });
        }
      } else {
        // Si no hay ID de cliente, mostramos todos los análisis
        setAnalisis(analisisMuestra);
      }
      
      setLoading(false);
    }, 1000);
  }, [clienteId]);

  // Aplicar filtros a los análisis
  const handleFilterChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    setLoading(true);

    // En un escenario real, haríamos una llamada a la API con los filtros
    // Para este ejemplo, filtraremos los datos de muestra localmente
    setTimeout(() => {
      let analisisFiltrados = clienteId 
        ? analisisMuestra.filter(a => a.clienteId === parseInt(clienteId))
        : [...analisisMuestra];
      
      // Filtrar por búsqueda general
      if (nuevosFiltros.busqueda) {
        const busqueda = nuevosFiltros.busqueda.toLowerCase();
        analisisFiltrados = analisisFiltrados.filter(a => 
          a.clienteNombre.toLowerCase().includes(busqueda) ||
          a.analistaResponsable.toLowerCase().includes(busqueda)
        );
      }
      
      // Filtrar por resultado
      if (nuevosFiltros.resultado) {
        analisisFiltrados = analisisFiltrados.filter(a => 
          a.resultado === nuevosFiltros.resultado
        );
      }
      
      // Filtrar por analista
      if (nuevosFiltros.analistaResponsable) {
        const busquedaAnalista = nuevosFiltros.analistaResponsable.toLowerCase();
        analisisFiltrados = analisisFiltrados.filter(a => 
          a.analistaResponsable.toLowerCase().includes(busquedaAnalista)
        );
      }
      
      // Filtrar por fecha desde
      if (nuevosFiltros.fechaDesde) {
        const fechaDesde = new Date(nuevosFiltros.fechaDesde);
        analisisFiltrados = analisisFiltrados.filter(a => 
          new Date(a.fechaAnalisis) >= fechaDesde
        );
      }
      
      // Filtrar por fecha hasta
      if (nuevosFiltros.fechaHasta) {
        const fechaHasta = new Date(nuevosFiltros.fechaHasta);
        analisisFiltrados = analisisFiltrados.filter(a => 
          new Date(a.fechaAnalisis) <= fechaHasta
        );
      }
      
      // Filtrar por límite mínimo
      if (nuevosFiltros.limiteMin) {
        analisisFiltrados = analisisFiltrados.filter(a => 
          a.limiteCredito >= parseFloat(nuevosFiltros.limiteMin)
        );
      }
      
      // Filtrar por límite máximo
      if (nuevosFiltros.limiteMax) {
        analisisFiltrados = analisisFiltrados.filter(a => 
          a.limiteCredito <= parseFloat(nuevosFiltros.limiteMax)
        );
      }
      
      setAnalisis(analisisFiltrados);
      setLoading(false);
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este análisis de riesgo?')) {
      // En un sistema real, aquí se haría una llamada a la API
      setAnalisis(analisis.filter(a => a.id !== id));
    }
  };

  const handleSaveAnalisis = (nuevoAnalisis) => {
    // En un sistema real, aquí se haría una llamada a la API
    const analisisCompleto = {
      ...nuevoAnalisis,
      id: analisis.length > 0 ? Math.max(...analisis.map(a => a.id)) + 1 : 1
    };
    
    setAnalisis([analisisCompleto, ...analisis]);
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
              {cliente ? `Análisis de Riesgo: ${cliente.nombre}` : 'Análisis de Riesgo Crediticio'}
            </h1>
            {cliente && (
              <p className="text-gray-600 mt-1">
                Historial de evaluaciones crediticias y límites asignados
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
            Nuevo Análisis
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosAnalisis 
        onFilterChange={handleFilterChange} 
        initialFilters={filtros}
      />

      {/* Lista de análisis */}
      <Card>
        {loading ? (
          <div className="py-8 px-6 text-center text-gray-500">
            Cargando análisis de riesgo...
          </div>
        ) : analisis.length === 0 ? (
          <div className="py-8 px-6 text-center text-gray-500">
            No se encontraron análisis de riesgo. {cliente ? 'Realice un nuevo análisis para este cliente.' : ''}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {!clienteId && (
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Cliente</th>
                  )}
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Fecha</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Analista</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Resultado</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600">Límite Asignado</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analisis.map(item => (
                  <AnalisisRow
                    key={item.id}
                    analisis={item}
                    onDelete={handleDelete}
                    showCliente={!clienteId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal para nuevo análisis */}
      <AnalisisModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAnalisis}
        clienteId={clienteId ? parseInt(clienteId) : null}
        clienteNombre={cliente ? cliente.nombre : null}
      />
    </div>
  );
};

export default AnalisisList;
