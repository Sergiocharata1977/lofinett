import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, BarChart } from 'lucide-react';
import PagoRow from '../../components/pagos/PagoRow';
import FiltrosPago from '../../components/pagos/FiltrosPago';
import CobranzaModal from '../../components/pagos/CobranzaModal';
import Button from '../../components/ui/Button';

// Datos de ejemplo para pagos
const pagosMuestra = [
  {
    id: 1,
    numeroComprobante: "COB-0001",
    cliente: "Juan Pérez",
    operacion: "OP-001",
    monto: 10000,
    fecha: "2025-04-25",
    metodoPago: "Efectivo",
    estado: "Confirmado",
    clienteId: 1,
    operacionId: 1,
    operacionMonto: 50000,
    saldoRestante: 40000
  },
  {
    id: 2,
    numeroComprobante: "COB-0002",
    cliente: "María González",
    operacion: "OP-002",
    monto: 15000,
    fecha: "2025-05-01",
    metodoPago: "Transferencia",
    estado: "Confirmado",
    clienteId: 2,
    operacionId: 2,
    operacionMonto: 80000,
    saldoRestante: 65000
  },
  {
    id: 3,
    numeroComprobante: "COB-0003",
    cliente: "Carlos Rodríguez",
    operacion: "OP-003",
    monto: 5000,
    fecha: "2025-05-04",
    metodoPago: "Efectivo",
    estado: "Pendiente",
    clienteId: 3,
    operacionId: 3,
    operacionMonto: 20000,
    saldoRestante: 15000
  },
  {
    id: 4,
    numeroComprobante: "COB-0004",
    cliente: "Juan Pérez",
    operacion: "OP-004",
    monto: 8000,
    fecha: "2025-04-28",
    metodoPago: "Cheque",
    estado: "Rechazado",
    clienteId: 1,
    operacionId: 4,
    operacionMonto: 30000,
    saldoRestante: 30000
  },
  {
    id: 5,
    numeroComprobante: "COB-0005",
    cliente: "Laura Fernández",
    operacion: "OP-005",
    monto: 12000,
    fecha: "2025-05-03",
    metodoPago: "Tarjeta",
    estado: "Confirmado",
    clienteId: 4,
    operacionId: 5,
    operacionMonto: 60000,
    saldoRestante: 48000
  }
];

// Datos de ejemplo para clientes
const clientesMuestra = [
  { id: 1, nombre: 'Juan Pérez', documento: '12345678', limite: 100000 },
  { id: 2, nombre: 'María González', documento: '87654321', limite: 150000 },
  { id: 3, nombre: 'Carlos Rodríguez', documento: '23456789', limite: 200000 },
  { id: 4, nombre: 'Laura Fernández', documento: '34567890', limite: 120000 }
];

// Datos de ejemplo para operaciones
const operacionesMuestra = [
  { 
    id: 1, 
    clienteId: 1, 
    monto: 50000, 
    fechaInicio: '2025-04-01', 
    cuotas: 12 
  },
  { 
    id: 2, 
    clienteId: 2, 
    monto: 80000, 
    fechaInicio: '2025-03-15', 
    cuotas: 24 
  },
  { 
    id: 3, 
    clienteId: 3, 
    monto: 20000, 
    fechaInicio: '2025-04-10', 
    cuotas: 6 
  },
  { 
    id: 4, 
    clienteId: 1, 
    monto: 30000, 
    fechaInicio: '2025-02-20', 
    cuotas: 12 
  },
  { 
    id: 5, 
    clienteId: 4, 
    monto: 60000, 
    fechaInicio: '2025-04-05', 
    cuotas: 18 
  }
];

const PagosList = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    fechaDesde: '',
    fechaHasta: '',
    estado: '',
    metodoPago: ''
  });
  
  // Estado para el modal de nueva cobranza
  const [showModal, setShowModal] = useState(false);

  // Simular carga de datos y aplicar filtros iniciales
  useEffect(() => {
    // En un escenario real, aquí harías una llamada a la API
    // para obtener los pagos con los filtros aplicados
    setTimeout(() => {
      setPagos(pagosMuestra);
      setLoading(false);
    }, 1000);
  }, []);

  // Función para actualizar filtros y buscar pagos
  const handleFilterChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    setLoading(true);

    // En un escenario real, harías una llamada a la API con los filtros
    // Para este ejemplo, filtraremos los datos de muestra localmente
    setTimeout(() => {
      let pagosFiltrados = [...pagosMuestra];
      
      // Filtrar por búsqueda general
      if (nuevosFiltros.busqueda) {
        const busqueda = nuevosFiltros.busqueda.toLowerCase();
        pagosFiltrados = pagosFiltrados.filter(pago => 
          pago.numeroComprobante.toLowerCase().includes(busqueda) ||
          pago.cliente.toLowerCase().includes(busqueda) ||
          pago.operacion.toLowerCase().includes(busqueda) ||
          pago.monto.toString().includes(busqueda)
        );
      }
      
      // Filtrar por fecha desde
      if (nuevosFiltros.fechaDesde) {
        const fechaDesde = new Date(nuevosFiltros.fechaDesde);
        pagosFiltrados = pagosFiltrados.filter(pago => 
          new Date(pago.fecha) >= fechaDesde
        );
      }
      
      // Filtrar por fecha hasta
      if (nuevosFiltros.fechaHasta) {
        const fechaHasta = new Date(nuevosFiltros.fechaHasta);
        pagosFiltrados = pagosFiltrados.filter(pago => 
          new Date(pago.fecha) <= fechaHasta
        );
      }
      
      // Filtrar por estado
      if (nuevosFiltros.estado) {
        pagosFiltrados = pagosFiltrados.filter(pago => 
          pago.estado === nuevosFiltros.estado
        );
      }
      
      // Filtrar por método de pago
      if (nuevosFiltros.metodoPago) {
        pagosFiltrados = pagosFiltrados.filter(pago => 
          pago.metodoPago === nuevosFiltros.metodoPago
        );
      }
      
      // Filtrar por monto mínimo
      if (nuevosFiltros.montoMin) {
        pagosFiltrados = pagosFiltrados.filter(pago => 
          pago.monto >= parseFloat(nuevosFiltros.montoMin)
        );
      }
      
      // Filtrar por monto máximo
      if (nuevosFiltros.montoMax) {
        pagosFiltrados = pagosFiltrados.filter(pago => 
          pago.monto <= parseFloat(nuevosFiltros.montoMax)
        );
      }
      
      setPagos(pagosFiltrados);
      setLoading(false);
    }, 500);
  };

  // Función para eliminar un pago
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta cobranza?')) {
      // En un escenario real, aquí harías una llamada a la API para eliminar el pago
      setPagos(pagos.filter(pago => pago.id !== id));
    }
  };
  
  // Función para guardar una nueva cobranza desde el modal
  const handleSaveCobranza = (nuevaCobranza) => {
    // En un escenario real, aquí harías una llamada a la API para guardar la cobranza
    const id = pagos.length > 0 ? Math.max(...pagos.map(p => p.id)) + 1 : 1;
    const numeroComprobante = `COB-${String(id).padStart(4, '0')}`;
    
    const cobranzaCompleta = {
      ...nuevaCobranza,
      id,
      numeroComprobante,
      operacionMonto: operacionesMuestra.find(o => o.id === parseInt(nuevaCobranza.operacionId))?.monto || 0,
      saldoRestante: 0 // Esto debería calcularse en un caso real
    };
    
    setPagos([cobranzaCompleta, ...pagos]);
    setShowModal(false);
    
    // Mostrar mensaje de éxito
    alert(`Cobranza ${numeroComprobante} registrada correctamente.`);
  };

  // Función para calcular el total de los pagos filtrados
  const calcularTotalPagos = () => {
    return pagos.reduce((total, pago) => total + pago.monto, 0);
  };

  return (
    <div className="w-full">
      {/* Encabezado y botones de acción */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Cobranzas</h1>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
          <Link to="/cobranzas/reportes">
            <Button variant="outline" className="flex items-center">
              <BarChart size={18} className="mr-2" />
              Reportes
            </Button>
          </Link>
          <Link to="/cobranzas/exportar">
            <Button variant="outline" className="flex items-center">
              <FileText size={18} className="mr-2" />
              Exportar
            </Button>
          </Link>
          <Button 
            variant="primary" 
            className="flex items-center"
            onClick={() => setShowModal(true)}
          >
            <PlusCircle size={18} className="mr-2" />
            Nueva Cobranza
          </Button>
        </div>
      </div>

      {/* Filtros de búsqueda */}
      <FiltrosPago 
        onFilterChange={handleFilterChange} 
        initialFilters={filtros}
      />

      {/* Tabla de pagos */}
      <div className="bg-white rounded-xl shadow-soft w-full">
        {loading ? (
          <div className="py-8 px-6 text-center text-gray-500">
            Cargando cobranzas...
          </div>
        ) : pagos.length === 0 ? (
          <div className="py-8 px-6 text-center text-gray-500">
            No se encontraron cobranzas con los filtros aplicados
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Comprobante</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Cliente</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Operación</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600">Monto</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Fecha</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Método</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Estado</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pagos.map(pago => (
                  <PagoRow 
                    key={pago.id} 
                    pago={pago} 
                    onDelete={handleDelete} 
                  />
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t border-gray-200">
                  <td className="py-4 px-6 font-semibold text-gray-600 text-right" colSpan="3">
                    Total:
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800 text-right">
                    {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 0
                    }).format(calcularTotalPagos())}
                  </td>
                  <td colSpan="4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Mostrando {pagos.length} de {pagos.length} cobranzas
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Anterior
          </button>
          <button className="px-3 py-1 bg-primary-50 border border-primary-300 rounded-lg text-primary-700">
            1
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Siguiente
          </button>
        </div>
      </div>
      
      {/* Modal de nueva cobranza */}
      <CobranzaModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveCobranza}
        clientes={clientesMuestra}
        operaciones={operacionesMuestra}
      />
    </div>
  );
};

export default PagosList;
