import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw } from 'lucide-react';
import FormularioPago from '../../components/pagos/FormularioPago';
import Button from '../../components/ui/Button';

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
    observaciones: "Pago de primera cuota"
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
    observaciones: ""
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
    observaciones: "Pendiente de confirmación"
  }
];

const PagoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pago, setPago] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [operaciones, setOperaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // En un escenario real, aquí harías llamadas a la API
        setClientes(clientesMuestra);
        setOperaciones(operacionesMuestra);
        
        // Si estamos editando, cargar los datos del pago
        if (id) {
          // Simular carga de un pago existente
          const pagoExistente = pagosMuestra.find(p => p.id === parseInt(id));
          
          if (pagoExistente) {
            setPago(pagoExistente);
          } else {
            setError('No se encontró el pago solicitado');
            navigate('/pagos');
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setError('Error al cargar datos. Por favor, intente nuevamente.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate]);

  // Manejar envío del formulario
  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      // En un escenario real, aquí harías una llamada a la API para guardar el pago
      console.log('Datos del pago a guardar:', formData);
      
      // Simular guardado exitoso
      setTimeout(() => {
        // Generar numero de comprobante si es nuevo pago
        if (!id) {
          // En un sistema real, esto vendría del backend
          formData.numeroComprobante = `PAG-${Math.floor(1000 + Math.random() * 9000)}`;
        }
        
        setSaving(false);
        
        // Mostrar mensaje de éxito y redireccionar
        alert(`Pago ${id ? 'actualizado' : 'registrado'} correctamente.`);
        navigate('/pagos');
      }, 1500);
      
    } catch (error) {
      console.error('Error al guardar pago:', error);
      setError('Error al guardar los datos. Por favor, intente nuevamente.');
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="p-2 mr-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => navigate('/pagos')}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {id ? 'Editar Pago' : 'Nuevo Pago'}
          </h1>
        </div>
        
        {id && (
          <div className="mt-4 sm:mt-0">
            <Button variant="outline" className="flex items-center">
              <RefreshCw size={18} className="mr-2" />
              Actualizar Estado
            </Button>
          </div>
        )}
      </div>

      {/* Mensajes de error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Formulario de pago */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-soft p-8 text-center text-gray-500">
          Cargando datos...
        </div>
      ) : (
        <FormularioPago
          initialData={pago}
          onSubmit={handleSubmit}
          clientes={clientes}
          operaciones={operaciones}
          isLoading={saving}
        />
      )}
    </div>
  );
};

export default PagoForm;
