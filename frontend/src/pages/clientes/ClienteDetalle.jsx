import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, AlertCircle, Phone, Mail, MapPin, CreditCard, Clock, FileText, LineChart } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Datos de ejemplo para clientes
const clientesMuestra = [
  { 
    id: 1, 
    nombre: 'Juan Pérez', 
    documento: '25.123.456', 
    email: 'juan.perez@email.com',
    telefono: '11-2345-6789',
    direccion: 'Av. Corrientes 1234, CABA',
    fechaAlta: '2025-01-15',
    limite: 100000,
    estado: 'Activo',
    observaciones: 'Cliente preferencial con buen historial crediticio.'
  },
  { 
    id: 2, 
    nombre: 'María González', 
    documento: '27.987.654', 
    email: 'maria.gonzalez@email.com',
    telefono: '11-8765-4321',
    direccion: 'Calle Lavalle 567, CABA',
    fechaAlta: '2025-02-20',
    limite: 150000,
    estado: 'Activo',
    observaciones: 'Cliente recomendado por Juan Pérez.'
  },
  { 
    id: 3, 
    nombre: 'Carlos Rodríguez', 
    documento: '20.456.789', 
    email: 'carlos.rodriguez@email.com',
    telefono: '11-5678-1234',
    direccion: 'Av. Santa Fe 890, CABA',
    fechaAlta: '2025-03-10',
    limite: 200000,
    estado: 'Activo',
    observaciones: ''
  },
  { 
    id: 4, 
    nombre: 'Laura Fernández', 
    documento: '30.789.123', 
    email: 'laura.fernandez@email.com',
    telefono: '11-9012-3456',
    direccion: 'Calle Florida 432, CABA',
    fechaAlta: '2025-03-25',
    limite: 120000,
    estado: 'Inactivo',
    observaciones: 'Cliente temporalmente inactivo por cambio de domicilio.'
  }
];

// Datos de ejemplo para operaciones
const operacionesMuestra = [
  { 
    id: 1, 
    clienteId: 1, 
    monto: 50000, 
    fechaInicio: '2025-04-01', 
    plazo: '12 meses',
    cuotas: 12,
    estado: 'Activa'
  },
  { 
    id: 2, 
    clienteId: 2, 
    monto: 80000, 
    fechaInicio: '2025-03-15', 
    plazo: '24 meses',
    cuotas: 24,
    estado: 'Activa'
  },
  { 
    id: 3, 
    clienteId: 3, 
    monto: 20000, 
    fechaInicio: '2025-04-10', 
    plazo: '6 meses',
    cuotas: 6,
    estado: 'Activa'
  },
  { 
    id: 4, 
    clienteId: 1, 
    monto: 30000, 
    fechaInicio: '2025-02-20', 
    plazo: '12 meses',
    cuotas: 12,
    estado: 'Cancelada'
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

const ClienteDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [operaciones, setOperaciones] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClienteData = async () => {
      setLoading(true);
      
      try {
        // En un entorno real, aquí harías una llamada a la API
        
        // Simular búsqueda del cliente
        const clienteEncontrado = clientesMuestra.find(c => c.id === parseInt(id));
        
        if (!clienteEncontrado) {
          setError('Cliente no encontrado');
          setLoading(false);
          return;
        }
        
        setCliente(clienteEncontrado);
        
        // Buscar operaciones del cliente
        const operacionesCliente = operacionesMuestra.filter(
          op => op.clienteId === clienteEncontrado.id
        );
        setOperaciones(operacionesCliente);
        
        // Buscar pagos del cliente
        const pagosCliente = pagosMuestra.filter(
          p => p.clienteId === clienteEncontrado.id
        );
        setPagos(pagosCliente);
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
        setLoading(false);
      }
    };
    
    fetchClienteData();
  }, [id]);

  // Función para eliminar un cliente
  const handleDelete = () => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.')) {
      // En un entorno real, aquí harías una llamada a la API
      alert('Cliente eliminado correctamente');
      navigate('/clientes');
    }
  };

  // Formatear número con separador de miles
  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-AR').format(number);
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
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  };

  // Obtener el estado de la operación con su color
  const getEstadoOperacion = (estado) => {
    const estados = {
      'Activa': 'bg-green-100 text-green-800 border border-green-200',
      'Cancelada': 'bg-red-100 text-red-800 border border-red-200',
      'Completada': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Pendiente': 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    };
    return estados[estado] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };
  
  // Obtener el estado del pago con su color
  const getEstadoPago = (estado) => {
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/clientes')}
            className="mr-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Cliente: {cliente?.nombre || ''}
            </h1>
            <p className="text-gray-600 mt-1">
              Información detallada y operaciones del cliente
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to={`/documentos/cliente/${id}`}>
            <Button variant="outline" className="flex items-center">
              <FileText size={18} className="mr-2" />
              Documentos
            </Button>
          </Link>
          <Link to={`/analisis/cliente/${id}`}>
            <Button variant="outline" className="flex items-center">
              <LineChart size={18} className="mr-2" />
              Análisis de Riesgo
            </Button>
          </Link>
          <Link to={`/clientes/editar/${id}`}>
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
      </div>

      {/* Contenido principal */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-soft p-8 text-center text-gray-500">
          Cargando datos del cliente...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">{error}</h2>
            <p className="text-red-600 mb-6">No se pudo encontrar el cliente solicitado o hubo un error al cargar los datos.</p>
            <Link to="/clientes">
              <Button variant="primary">Volver a Clientes</Button>
            </Link>
          </div>
        </div>
      ) : cliente && (
        <div className="space-y-6">
          {/* Información general del cliente */}
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Dirección</p>
                      <p className="text-gray-600">{cliente.direccion}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-gray-600">{cliente.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Teléfono</p>
                      <p className="text-gray-600">{cliente.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Documento</p>
                      <p className="text-gray-600">{cliente.documento}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Crediticia</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CreditCard size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Límite de Crédito</p>
                      <p className="text-primary-600 font-semibold">{formatCurrency(cliente.limite)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Fecha de Alta</p>
                      <p className="text-gray-600">{formatDate(cliente.fechaAlta)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Estado</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      cliente.estado === 'Activo' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {cliente.estado}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-1/3">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Observaciones</h2>
                <p className="text-gray-600 whitespace-pre-line">{cliente.observaciones || 'Sin observaciones'}</p>
              </div>
            </div>
          </Card>

          {/* Operaciones del cliente */}
          <Card title="Operaciones">
            {operaciones.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Este cliente no tiene operaciones registradas
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">ID</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-600">Monto</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">Fecha Inicio</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">Plazo</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">Cuotas</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">Estado</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {operaciones.map(operacion => (
                      <tr key={operacion.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">OP-{operacion.id}</td>
                        <td className="py-3 px-4 text-right font-medium text-primary-600">{formatCurrency(operacion.monto)}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{formatDate(operacion.fechaInicio)}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{operacion.plazo}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{operacion.cuotas}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEstadoOperacion(operacion.estado)}`}>
                            {operacion.estado}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Link to={`/operaciones/${operacion.id}`} className="text-primary-600 hover:text-primary-800 font-medium">
                            Ver Detalles
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center px-4">
              <p className="text-sm text-gray-600">
                Mostrando {operaciones.length} operaciones
              </p>
              <Link to={`/operaciones/nuevo?clienteId=${cliente.id}`}>
                <Button variant="primary" size="sm">Nueva Operación</Button>
              </Link>
            </div>
          </Card>

          {/* Pagos del cliente */}
          <Card title="Últimos Pagos">
            {pagos.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Este cliente no tiene pagos registrados
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Comprobante</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Operación</th>
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
                        <td className="py-3 px-4 text-gray-600">OP-{pago.operacionId}</td>
                        <td className="py-3 px-4 text-right font-medium text-primary-600">{formatCurrency(pago.monto)}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{formatDate(pago.fecha)}</td>
                        <td className="py-3 px-4 text-gray-600">{pago.metodoPago}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEstadoPago(pago.estado)}`}>
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
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center px-4">
              <p className="text-sm text-gray-600">
                Mostrando {pagos.length} pagos recientes
              </p>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate('/cobranzas/nuevo?clienteId=' + cliente.id)}
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

export default ClienteDetalle;
