import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, AlertCircle } from 'lucide-react';
import DetallePago from '../../components/pagos/DetallePago';
import Button from '../../components/ui/Button';

// Datos de ejemplo para pagos (normalmente vendría de una API)
const pagosMuestra = [
  {
    id: 1,
    numeroComprobante: "PAG-0001",
    cliente: "Juan Pérez",
    clienteDocumento: "25.123.456",
    clienteEmail: "juan.perez@email.com",
    operacion: "OP-001",
    monto: 10000,
    fecha: "2025-04-25",
    metodoPago: "Efectivo",
    estado: "Confirmado",
    clienteId: 1,
    operacionId: 1,
    operacionMonto: 50000,
    saldoRestante: 40000,
    observaciones: "Pago de primera cuota realizado en término.",
    historial: [
      {
        accion: "Creación del pago",
        fecha: "2025-04-25T10:30:00",
        usuario: "admin@sistemacreditos.com",
        detalles: "Pago registrado inicialmente"
      },
      {
        accion: "Cambio de estado",
        fecha: "2025-04-25T14:15:00",
        usuario: "supervisor@sistemacreditos.com",
        detalles: "Pago verificado y confirmado"
      }
    ]
  },
  {
    id: 2,
    numeroComprobante: "PAG-0002",
    cliente: "María González",
    clienteDocumento: "27.654.321",
    clienteEmail: "maria.gonzalez@email.com",
    operacion: "OP-002",
    monto: 15000,
    fecha: "2025-05-01",
    metodoPago: "Transferencia",
    estado: "Confirmado",
    clienteId: 2,
    operacionId: 2,
    operacionMonto: 80000,
    saldoRestante: 65000,
    observaciones: "Transferencia realizada por homebanking.",
    historial: [
      {
        accion: "Creación del pago",
        fecha: "2025-05-01T09:45:00",
        usuario: "admin@sistemacreditos.com",
        detalles: "Pago registrado inicialmente"
      },
      {
        accion: "Cambio de estado",
        fecha: "2025-05-01T11:20:00",
        usuario: "admin@sistemacreditos.com",
        detalles: "Pago confirmado tras verificar transferencia"
      }
    ]
  },
  {
    id: 3,
    numeroComprobante: "PAG-0003",
    cliente: "Carlos Rodríguez",
    clienteDocumento: "30.987.654",
    clienteEmail: "carlos.rodriguez@email.com",
    operacion: "OP-003",
    monto: 5000,
    fecha: "2025-05-04",
    metodoPago: "Efectivo",
    estado: "Pendiente",
    clienteId: 3,
    operacionId: 3,
    operacionMonto: 20000,
    saldoRestante: 15000,
    observaciones: "Pendiente de verificación de caja.",
    historial: [
      {
        accion: "Creación del pago",
        fecha: "2025-05-04T16:30:00",
        usuario: "admin@sistemacreditos.com",
        detalles: "Pago registrado como pendiente"
      }
    ]
  },
  {
    id: 4,
    numeroComprobante: "PAG-0004",
    cliente: "Juan Pérez",
    clienteDocumento: "25.123.456",
    clienteEmail: "juan.perez@email.com",
    operacion: "OP-004",
    monto: 8000,
    fecha: "2025-04-28",
    metodoPago: "Cheque",
    estado: "Rechazado",
    clienteId: 1,
    operacionId: 4,
    operacionMonto: 30000,
    saldoRestante: 30000,
    observaciones: "Cheque rechazado por falta de fondos.",
    historial: [
      {
        accion: "Creación del pago",
        fecha: "2025-04-28T11:15:00",
        usuario: "admin@sistemacreditos.com",
        detalles: "Pago registrado con cheque"
      },
      {
        accion: "Cambio de estado",
        fecha: "2025-05-02T09:30:00",
        usuario: "supervisor@sistemacreditos.com",
        detalles: "Pago rechazado - cheque sin fondos"
      },
      {
        accion: "Envío de notificación",
        fecha: "2025-05-02T10:00:00",
        usuario: "sistema@sistemacreditos.com",
        detalles: "Notificación enviada al cliente"
      }
    ]
  }
];

const PagoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPago = async () => {
      setLoading(true);
      
      try {
        // En un sistema real, aquí harías una llamada a la API
        // para obtener los datos del pago por su ID
        setTimeout(() => {
          const pagoEncontrado = pagosMuestra.find(p => p.id === parseInt(id));
          
          if (pagoEncontrado) {
            setPago(pagoEncontrado);
          } else {
            setError('No se encontró la cobranza solicitada');
          }
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar los datos de la cobranza:', error);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
        setLoading(false);
      }
    };
    
    fetchPago();
  }, [id]);

  // Función para eliminar un pago
  const handleDelete = () => {
    if (window.confirm('¿Está seguro de que desea eliminar esta cobranza? Esta acción no se puede deshacer.')) {
      // En un escenario real, aquí harías una llamada a la API para eliminar el pago
      
      // Simular eliminación exitosa
      setTimeout(() => {
        alert('Cobranza eliminada correctamente');
        navigate('/cobranzas');
      }, 1000);
    }
  };

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="p-2 mr-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => navigate('/cobranzas')}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Detalle de Cobranza
          </h1>
        </div>
        
        {pago && (
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
            <Link to={`/cobranzas/editar/${pago.id}`}>
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

      {/* Contenido */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-soft p-8 text-center text-gray-500">
          Cargando datos de la cobranza...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">{error}</h2>
            <p className="text-red-600 mb-6">No se pudo encontrar la cobranza solicitada o hubo un error al cargar los datos.</p>
            <Link to="/cobranzas">
              <Button variant="primary">Volver a Cobranzas</Button>
            </Link>
          </div>
        </div>
      ) : (
        <DetallePago pago={pago} />
      )}
    </div>
  );
};

export default PagoDetalle;
