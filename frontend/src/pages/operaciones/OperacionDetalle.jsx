import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, AlertCircle, Calendar, DollarSign, User, FileText, Clock } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Datos de ejemplo para operaciones
const operacionesMuestra = [
  { 
    id: 1, 
    clienteId: 1,
    clienteNombre: 'Juan Pérez',
    monto: 50000, 
    fechaInicio: '2025-04-01',
    fechaVencimiento: '2026-04-01',
    plazo: '12 meses',
    cuotas: 12,
    tasaInteres: 45,
    montoCuota: 5500,
    estado: 'Activa',
    observaciones: 'Préstamo personal para refacción de vivienda.'
  },
  { 
    id: 2, 
    clienteId: 2,
    clienteNombre: 'María González',
    monto: 80000, 
    fechaInicio: '2025-03-15',
    fechaVencimiento: '2027-03-15',
    plazo: '24 meses',
    cuotas: 24,
    tasaInteres: 42,
    montoCuota: 4800,
    estado: 'Activa',
    observaciones: 'Préstamo para compra de equipamiento de oficina.'
  },
  { 
    id: 3, 
    clienteId: 3,
    clienteNombre: 'Carlos Rodríguez',
    monto: 20000, 
    fechaInicio: '2025-04-10',
    fechaVencimiento: '2025-10-10',
    plazo: '6 meses',
    cuotas: 6,
    tasaInteres: 50,
    montoCuota: 4200,
    estado: 'Activa',
    observaciones: 'Préstamo de corto plazo para gastos inmediatos.'
  },
  { 
    id: 4, 
    clienteId: 1,
    clienteNombre: 'Juan Pérez',
    monto: 30000, 
    fechaInicio: '2025-02-20',
    fechaVencimiento: '2026-02-20',
    plazo: '12 meses',
    cuotas: 12,
    tasaInteres: 48,
    montoCuota: 3400,
    estado: 'Cancelada',
    observaciones: 'Operación cancelada anticipadamente en el tercer mes.'
  }
];

// Datos de ejemplo para pagos
const pagosMuestra = [
  {
    id: 1,
    numeroComprobante: "COB-0001",
    clienteId: 1,
    operacionId: 1,
    monto: 10000,
    fecha: "2025-04-25",
    metodoPago: "Efectivo",
    estado: "Confirmado"
  },
  {
    id: 2,
    numeroComprobante: "COB-0002",
    clienteId: 2,
    operacionId: 2,
    monto: 15000,
    fecha: "2025-05-01",
    metodoPago: "Transferencia",
    estado: "Confirmado"
  },
  {
    id: 3,
    numeroComprobante: "COB-0003",
    clienteId: 3,
    operacionId: 3,
    monto: 5000,
    fecha: "2025-05-04",
    metodoPago: "Efectivo",
    estado: "Pendiente"
  },
  {
    id: 4,
    numeroComprobante: "COB-0004",
    clienteId: 1,
    operacionId: 4,
    monto: 8000,
    fecha: "2025-04-28",
    metodoPago: "Cheque",
    estado: "Rechazado"
  }
];

// Generar datos de ejemplo para las cuotas
const generarCuotasEjemplo = (operacion) => {
  const cuotas = [];
  const fechaInicio = new Date(operacion.fechaInicio);
  
  for (let i = 0; i < operacion.cuotas; i++) {
    const fechaVencimiento = new Date(fechaInicio);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + i + 1);
    
    let estado = 'Pendiente';
    let fechaPago = null;
    
    // Las primeras cuotas están pagas para operaciones activas
    if (operacion.estado === 'Activa' && i < 2) {
      estado = 'Pagada';
      const tempFechaPago = new Date(fechaVencimiento);
      tempFechaPago.setDate(tempFechaPago.getDate() - 5);
      fechaPago = tempFechaPago.toISOString().split('T')[0];
    }
    
    // Si la operación está cancelada, todas las cuotas están pagadas
    if (operacion.estado === 'Cancelada') {
      estado = 'Pagada';
      const tempFechaPago = new Date(fechaVencimiento);
      tempFechaPago.setDate(tempFechaPago.getDate() - 3);
      fechaPago = tempFechaPago.toISOString().split('T')[0];
    }
    
    cuotas.push({
      numero: i + 1,
      monto: operacion.montoCuota,
      fechaVencimiento: fechaVencimiento.toISOString().split('T')[0],
      estado,
      fechaPago
    });
  }
  
  return cuotas;
};

const OperacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [operacion, setOperacion] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOperacionData = async () => {
      setLoading(true);
      
      try {
        // En un entorno real, aquí harías una llamada a la API
        const operacionEncontrada = operacionesMuestra.find(op => op.id === parseInt(id));
        
        if (!operacionEncontrada) {
          setError('Operación no encontrada');
          setLoading(false);
          return;
        }
        
        setOperacion(operacionEncontrada);
        
        // Generar cuotas de ejemplo
        const cuotasGeneradas = generarCuotasEjemplo(operacionEncontrada);
        setCuotas(cuotasGeneradas);
        
        // Buscar pagos de la operación
        const pagosOperacion = pagosMuestra.filter(
          p => p.operacionId === operacionEncontrada.id
        );
        setPagos(pagosOperacion);
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
        setLoading(false);
      }
    };
    
    fetchOperacionData();
  }, [id]);

  // Función para eliminar una operación
  const handleDelete = () => {
    if (window.confirm('¿Está seguro de que desea eliminar esta operación? Esta acción no se puede deshacer.')) {
      // En un entorno real, aquí harías una llamada a la API
      alert('Operación eliminada correctamente');
      navigate('/operaciones');
    }
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  };

  // Obtener el color del estado de la cuota
  const getEstadoCuotaColor = (estado) => {
    const estados = {
      'Pagada': 'bg-green-100 text-green-800 border border-green-200',
      'Pendiente': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'Vencida': 'bg-red-100 text-red-800 border border-red-200'
    };
    return estados[estado] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };
  
  // Obtener el color del estado de la operación
  const getEstadoOperacionColor = (estado) => {
    const estados = {
      'Activa': 'bg-green-100 text-green-800 border border-green-200',
      'Cancelada': 'bg-red-100 text-red-800 border border-red-200',
      'Completada': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Pendiente': 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    };
    return estados[estado] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };
  
  // Obtener el color del estado del pago
  const getEstadoPagoColor = (estado) => {
    const estados = {
      'Confirmado': 'bg-green-100 text-green-800 border border-green-200',
      'Pendiente': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'Rechazado': 'bg-red-100 text-red-800 border border-red-200'
    };
    return estados[estado] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="p-2 mr-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => navigate('/operaciones')}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {loading ? 'Cargando...' : `Operación OP-${operacion?.id}` || 'Operación no encontrada'}
          </h1>
        </div>
        
        {operacion && (
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
            <Link to={`/operaciones/editar/${operacion.id}`}>
              <Button variant="outline" className="flex items-center">
                <Edit size={18} className="mr-2" />
                Editar
              </Button>
            </Link>
            <Button 
              variant="danger" 
              className="flex items-center"
              onClick={handleDelete}
            >
              <Trash2 size={18} className="mr-2" />
              Eliminar
            </Button>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-soft p-8 text-center text-gray-500">
          Cargando datos de la operación...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">{error}</h2>
            <p className="text-red-600 mb-6">No se pudo encontrar la operación solicitada o hubo un error al cargar los datos.</p>
            <Link to="/operaciones">
              <Button variant="primary">Volver a Operaciones</Button>
            </Link>
          </div>
        </div>
      ) : operacion && (
        <div className="space-y-6">
          {/* Información general de la operación */}
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalles</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <DollarSign size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Monto Total</p>
                      <p className="text-primary-600 font-semibold">{formatCurrency(operacion.monto)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Fecha Inicio</p>
                      <p className="text-gray-600">{formatDate(operacion.fechaInicio)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Vencimiento</p>
                      <p className="text-gray-600">{formatDate(operacion.fechaVencimiento)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Estado</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getEstadoOperacionColor(operacion.estado)}`}>
                      {operacion.estado}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Financiación</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Plazo</p>
                    <p className="text-gray-800">{operacion.plazo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Cuotas</p>
                    <p className="text-gray-800">{operacion.cuotas}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tasa de Interés</p>
                    <p className="text-gray-800">{operacion.tasaInteres}% anual</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Monto por Cuota</p>
                    <p className="text-primary-600 font-semibold">{formatCurrency(operacion.montoCuota)}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Cliente</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Nombre</p>
                      <Link to={`/clientes/${operacion.clienteId}`} className="text-primary-600 hover:text-primary-800">
                        {operacion.clienteNombre}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">ID Cliente</p>
                      <p className="text-gray-600">{operacion.clienteId}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-1/4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Observaciones</h2>
                <p className="text-gray-600 whitespace-pre-line">{operacion.observaciones || 'Sin observaciones'}</p>
              </div>
            </div>
          </Card>

          {/* Plan de pagos (cuotas) */}
          <Card title="Plan de Pagos">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Cuota</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">Monto</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Vencimiento</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Estado</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Fecha de Pago</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cuotas.map(cuota => (
                    <tr key={cuota.numero} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-center text-gray-800">{cuota.numero}</td>
                      <td className="py-3 px-4 text-right font-medium text-primary-600">{formatCurrency(cuota.monto)}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{formatDate(cuota.fechaVencimiento)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEstadoCuotaColor(cuota.estado)}`}>
                          {cuota.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">{formatDate(cuota.fechaPago)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Historial de pagos */}
          <Card title="Historial de Pagos">
            {pagos.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Esta operación no tiene pagos registrados
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Comprobante</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-600">Monto</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">Fecha</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Método</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">Estado</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pagos.map(pago => (
                      <tr key={pago.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{pago.numeroComprobante}</td>
                        <td className="py-3 px-4 text-right font-medium text-primary-600">{formatCurrency(pago.monto)}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{formatDate(pago.fecha)}</td>
                        <td className="py-3 px-4 text-gray-600">{pago.metodoPago}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEstadoPagoColor(pago.estado)}`}>
                            {pago.estado}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Link to={`/cobranzas/${pago.id}`} className="text-primary-600 hover:text-primary-800 font-medium">
                            Ver Detalle
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end px-4">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate('/cobranzas/nuevo?operacionId=' + operacion.id)}
              >
                Registrar Pago
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OperacionDetalle;
