import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import OperacionRow from '../../components/operaciones/OperacionRow';
import Button from '../../components/ui/Button';
import OperacionModal from '../../components/operaciones/OperacionModal';
import FiltrosOperacion from '../../components/operaciones/FiltrosOperacion';

// Datos de muestra
const operacionesMuestra = [
  {
    id: 1,
    cliente: "Juan Pérez",
    clienteId: 1,
    monto: 50000,
    cuotas: 12,
    valorCuota: 6766.67,
    interes: 5.2,
    total: 72800,
    fechaInicio: "2023-03-31",
    estado: "Activo",
    tipoOperacion: "Préstamo"
  },
  {
    id: 2,
    cliente: "Carlos Rodríguez",
    clienteId: 3,
    monto: 80000,
    cuotas: 24,
    valorCuota: 7173.33,
    interes: 4.8,
    total: 132000,
    fechaInicio: "2023-04-14",
    estado: "Activo",
    tipoOperacion: "Crédito"
  },
  {
    id: 3,
    cliente: "Juan Pérez",
    clienteId: 1,
    monto: 20000,
    cuotas: 6,
    valorCuota: 4433.33,
    interes: 5.5,
    total: 26600,
    fechaInicio: "2023-03-09",
    estado: "Finalizado",
    tipoOperacion: "Adelanto"
  },
  {
    id: 4,
    cliente: "María López",
    clienteId: 2,
    monto: 100000,
    cuotas: 36,
    valorCuota: 5361.11,
    interes: 4.2,
    total: 193000,
    fechaInicio: "2023-05-22",
    estado: "En mora",
    tipoOperacion: "Préstamo"
  },
  {
    id: 5,
    cliente: "Laura Fernández",
    clienteId: 4,
    monto: 30000,
    cuotas: 12,
    valorCuota: 3250,
    interes: 5.0,
    total: 39000,
    fechaInicio: "2023-02-05",
    estado: "Activo",
    tipoOperacion: "Refinanciación"
  }
];

const OperacionesList = () => {
  const [operaciones, setOperaciones] = useState(operacionesMuestra);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    clienteId: '',
    montoMin: '',
    montoMax: '',
    fechaInicioDesde: '',
    fechaInicioHasta: '',
    estado: '',
    tipoOperacion: ''
  });
  const [modalOpen, setModalOpen] = useState(false);

  // Aplicar filtros a las operaciones
  const handleFilterChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    setLoading(true);

    // En un escenario real, haríamos una llamada a la API con los filtros
    // Para este ejemplo, filtraremos los datos de muestra localmente
    setTimeout(() => {
      let operacionesFiltradas = [...operacionesMuestra];
      
      // Filtrar por búsqueda general
      if (nuevosFiltros.busqueda) {
        const busqueda = nuevosFiltros.busqueda.toLowerCase();
        operacionesFiltradas = operacionesFiltradas.filter(op => 
          op.cliente.toLowerCase().includes(busqueda) ||
          op.id.toString().includes(busqueda) ||
          op.monto.toString().includes(busqueda)
        );
      }
      
      // Filtrar por cliente ID
      if (nuevosFiltros.clienteId) {
        operacionesFiltradas = operacionesFiltradas.filter(op => 
          op.clienteId.toString() === nuevosFiltros.clienteId
        );
      }
      
      // Filtrar por tipo de operación
      if (nuevosFiltros.tipoOperacion) {
        operacionesFiltradas = operacionesFiltradas.filter(op => 
          op.tipoOperacion === nuevosFiltros.tipoOperacion
        );
      }
      
      // Filtrar por monto mínimo
      if (nuevosFiltros.montoMin) {
        operacionesFiltradas = operacionesFiltradas.filter(op => 
          op.monto >= parseFloat(nuevosFiltros.montoMin)
        );
      }
      
      // Filtrar por monto máximo
      if (nuevosFiltros.montoMax) {
        operacionesFiltradas = operacionesFiltradas.filter(op => 
          op.monto <= parseFloat(nuevosFiltros.montoMax)
        );
      }
      
      // Filtrar por fecha de inicio desde
      if (nuevosFiltros.fechaInicioDesde) {
        const fechaDesde = new Date(nuevosFiltros.fechaInicioDesde);
        operacionesFiltradas = operacionesFiltradas.filter(op => 
          new Date(op.fechaInicio) >= fechaDesde
        );
      }
      
      // Filtrar por fecha de inicio hasta
      if (nuevosFiltros.fechaInicioHasta) {
        const fechaHasta = new Date(nuevosFiltros.fechaInicioHasta);
        operacionesFiltradas = operacionesFiltradas.filter(op => 
          new Date(op.fechaInicio) <= fechaHasta
        );
      }
      
      // Filtrar por estado
      if (nuevosFiltros.estado) {
        operacionesFiltradas = operacionesFiltradas.filter(op => 
          op.estado === nuevosFiltros.estado
        );
      }
      
      setOperaciones(operacionesFiltradas);
      setLoading(false);
    }, 500);
  };

  // Función para manejar la creación de una nueva operación
  const handleSaveOperacion = (nuevaOperacion) => {
    // En un escenario real, aquí se haría una llamada a la API
    setOperaciones(prevOperaciones => [
      ...prevOperaciones,
      {
        ...nuevaOperacion,
        valorCuota: nuevaOperacion.montoCuota,
      }
    ]);
  };

  // Función para manejar la eliminación de una operación
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta operación?')) {
      // En un escenario real, aquí se haría una llamada a la API
      setOperaciones(prevOperaciones => prevOperaciones.filter(op => op.id !== id));
    }
  };

  return (
    <div className="w-full">
      {/* Encabezado y botón de nueva operación */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Operaciones de Financiamiento</h1>
        <div className="mt-4 sm:mt-0">
          <Button 
            variant="primary" 
            className="flex items-center"
            onClick={() => setModalOpen(true)}
          >
            <PlusCircle size={20} className="mr-2" />
            Nueva Operación
          </Button>
        </div>
      </div>

      {/* Componente de filtros */}
      <FiltrosOperacion 
        onFilterChange={handleFilterChange} 
        initialFilters={filtros}
      />

      {/* Tabla de operaciones */}
      <div className="bg-white rounded-xl shadow-soft w-full">
        {loading ? (
          <div className="py-8 px-6 text-center text-gray-500">
            Cargando operaciones...
          </div>
        ) : operaciones.length === 0 ? (
          <div className="py-8 px-6 text-center text-gray-500">
            No hay operaciones registradas o no se encontraron operaciones con los filtros aplicados.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Cliente</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600">Monto</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Cuotas</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600">Valor Cuota</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600">Interés</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600">Total</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Fecha Inicio</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Estado</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {operaciones.map(operacion => (
                  <OperacionRow 
                    key={operacion.id} 
                    operacion={operacion} 
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal para nueva operación */}
      <OperacionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveOperacion}
      />
    </div>
  );
};

export default OperacionesList;
