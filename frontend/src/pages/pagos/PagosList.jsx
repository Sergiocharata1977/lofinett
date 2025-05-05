import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, BarChart } from 'lucide-react';
import PagoRow from '../../components/pagos/PagoRow';
import FiltrosPago from '../../components/pagos/FiltrosPago';
import Button from '../../components/ui/Button';

// Datos de ejemplo para pagos
const pagosMuestra = [
  {
    id: 1,
    numeroComprobante: "PAG-0001",
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
    numeroComprobante: "PAG-0002",
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
    numeroComprobante: "PAG-0003",
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
    numeroComprobante: "PAG-0004",
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
    numeroComprobante: "PAG-0005",
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
    if (window.confirm('¿Está seguro de que desea eliminar este pago?')) {
      // En un escenario real, aquí harías una llamada a la API para eliminar el pago
      setPagos(pagos.filter(pago => pago.id !== id));
    }
  };

  // Función para calcular el total de los pagos filtrados
  const calcularTotalPagos = () => {
    return pagos.reduce((total, pago) => total + pago.monto, 0);
  };

  return (
    <div className="w-full">
      {/* Encabezado y botones de acción */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Pagos</h1>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
          <Link to="/pagos/reportes">
            <Button variant="outline" className="flex items-center">
              <BarChart size={18} className="mr-2" />
              Reportes
            </Button>
          </Link>
          <Link to="/pagos/exportar">
            <Button variant="outline" className="flex items-center">
              <FileText size={18} className="mr-2" />
              Exportar
            </Button>
          </Link>
          <Link to="/pagos/nuevo">
            <Button variant="primary" className="flex items-center">
              <PlusCircle size={18} className="mr-2" />
              Nuevo Pago
            </Button>
          </Link>
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
            Cargando pagos...
          </div>
        ) : pagos.length === 0 ? (
          <div className="py-8 px-6 text-center text-gray-500">
            No se encontraron pagos con los filtros aplicados
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
          Mostrando {pagos.length} de {pagos.length} pagos
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
    </div>
  );
};

export default PagosList;
