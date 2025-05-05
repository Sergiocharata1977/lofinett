import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import ClienteRow from '../../components/clientes/ClienteRow';
import Button from '../../components/ui/Button';
import ClienteModal from '../../components/clientes/ClienteModal';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Simular carga de datos desde API
  useEffect(() => {
    // En un escenario real, aquí se haría una llamada a la API
    setTimeout(() => {
      const clientesDummy = [
        { 
          id: 1, 
          nombre: 'Juan Pérez', 
          documento: '12345678', 
          telefono: '11-1234-5678',
          email: 'juan@example.com',
          limiteCredito: 100000,
          creditoDisponible: 85000,
          estado: 'Activo'
        },
        { 
          id: 2, 
          nombre: 'María González', 
          documento: '87654321', 
          telefono: '11-8765-4321',
          email: 'maria@example.com',
          limiteCredito: 150000,
          creditoDisponible: 150000,
          estado: 'Activo'
        },
        { 
          id: 3, 
          nombre: 'Carlos Rodríguez', 
          documento: '23456789', 
          telefono: '11-2345-6789',
          email: 'carlos@example.com',
          limiteCredito: 200000,
          creditoDisponible: 120000,
          estado: 'Activo'
        }
      ];
      
      setClientes(clientesDummy);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    
    // Filtrar clientes por búsqueda simple (nombre o documento)
    if (e.target.value === '') {
      setClientes([
        { 
          id: 1, 
          nombre: 'Juan Pérez', 
          documento: '12345678', 
          telefono: '11-1234-5678',
          email: 'juan@example.com',
          limiteCredito: 100000,
          creditoDisponible: 85000,
          estado: 'Activo'
        },
        { 
          id: 2, 
          nombre: 'María González', 
          documento: '87654321', 
          telefono: '11-8765-4321',
          email: 'maria@example.com',
          limiteCredito: 150000,
          creditoDisponible: 150000,
          estado: 'Activo'
        },
        { 
          id: 3, 
          nombre: 'Carlos Rodríguez', 
          documento: '23456789', 
          telefono: '11-2345-6789',
          email: 'carlos@example.com',
          limiteCredito: 200000,
          creditoDisponible: 120000,
          estado: 'Activo'
        }
      ]);
    } else {
      setClientes([
        { 
          id: 1, 
          nombre: 'Juan Pérez', 
          documento: '12345678', 
          telefono: '11-1234-5678',
          email: 'juan@example.com',
          limiteCredito: 100000,
          creditoDisponible: 85000,
          estado: 'Activo'
        },
        { 
          id: 2, 
          nombre: 'María González', 
          documento: '87654321', 
          telefono: '11-8765-4321',
          email: 'maria@example.com',
          limiteCredito: 150000,
          creditoDisponible: 150000,
          estado: 'Activo'
        },
        { 
          id: 3, 
          nombre: 'Carlos Rodríguez', 
          documento: '23456789', 
          telefono: '11-2345-6789',
          email: 'carlos@example.com',
          limiteCredito: 200000,
          creditoDisponible: 120000,
          estado: 'Activo'
        }
      ].filter(cliente => 
        cliente.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
        cliente.documento.includes(e.target.value)
      ));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      // En un escenario real, aquí se haría una llamada a la API
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
    }
  };

  // Función para manejar la creación de un nuevo cliente
  const handleSaveCliente = (nuevoCliente) => {
    // En un escenario real, aquí se haría una llamada a la API
    setClientes(prevClientes => [
      ...prevClientes,
      {
        ...nuevoCliente,
        // Adaptación de datos para la vista de tabla
        limiteCredito: nuevoCliente.limite,
        creditoDisponible: nuevoCliente.limite
      }
    ]);
  };

  return (
    <div className="w-full">
      {/* Encabezado y botón de nuevo cliente */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Clientes</h1>
        <div className="mt-4 sm:mt-0">
          <Button 
            variant="primary" 
            className="flex items-center"
            onClick={() => setModalOpen(true)}
          >
            <PlusCircle size={20} className="mr-2" />
            Nuevo Cliente
          </Button>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex items-center mb-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={busqueda}
            onChange={handleBusqueda}
            placeholder="Buscar por nombre o documento..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Tabla de clientes */}
      <div className="bg-white rounded-xl shadow-soft w-full">
        {loading ? (
          <div className="py-8 px-6 text-center text-gray-500">
            Cargando clientes...
          </div>
        ) : (
          clientes.length === 0 ? (
            <div className="py-8 px-6 text-center text-gray-500">
              No hay clientes registrados. ¡Crea un nuevo cliente!
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Nombre</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Documento</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Teléfono</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-600">Límite Crédito</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Estado</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clientes.map(cliente => (
                    <ClienteRow key={cliente.id} cliente={cliente} onDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* Modal para nuevo cliente */}
      <ClienteModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCliente}
      />
    </div>
  );
};

export default ClientesList;
