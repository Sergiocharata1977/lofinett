import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import OperacionRow from '../../components/operaciones/OperacionRow';
import Button from '../../components/ui/Button';

// Datos de muestra
const operacionesMuestra = [
  {
    id: 1,
    cliente: "Juan Pérez",
    monto: 50000,
    cuotas: 12,
    valorCuota: 6766.67,
    interes: 5.2,
    total: 72800,
    fechaInicio: "31/3/2023"
  },
  {
    id: 2,
    cliente: "Carlos Rodríguez",
    monto: 80000,
    cuotas: 24,
    valorCuota: 7173.33,
    interes: 4.8,
    total: 132000,
    fechaInicio: "14/4/2023"
  },
  {
    id: 3,
    cliente: "Juan Pérez",
    monto: 20000,
    cuotas: 6,
    valorCuota: 4433.33,
    interes: 5.5,
    total: 26600,
    fechaInicio: "9/3/2023"
  },
  {
    id: 4,
    cliente: "María López",
    monto: 100000,
    cuotas: 36,
    valorCuota: 5361.11,
    interes: 4.2,
    total: 193000,
    fechaInicio: "22/5/2023"
  },
  {
    id: 5,
    cliente: "Laura Fernández",
    monto: 30000,
    cuotas: 12,
    valorCuota: 3250,
    interes: 5.0,
    total: 39000,
    fechaInicio: "5/2/2023"
  }
];

const OperacionesList = () => {
  const [operaciones, setOperaciones] = useState(operacionesMuestra);
  const [busqueda, setBusqueda] = useState('');

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    
    // Filtrar operaciones por búsqueda simple (cliente)
    if (e.target.value === '') {
      setOperaciones(operacionesMuestra);
    } else {
      setOperaciones(
        operacionesMuestra.filter(op => 
          op.cliente.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="w-full">
      {/* Encabezado y botón de nueva operación */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Operaciones de Financiamiento</h1>
        <div className="mt-4 sm:mt-0">
          <Link to="/operaciones/nueva">
            <Button variant="primary" className="flex items-center">
              <PlusCircle size={20} className="mr-2" />
              Nueva Operación
            </Button>
          </Link>
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
            placeholder="Buscar por cliente..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Tabla de operaciones */}
      <div className="bg-white rounded-xl shadow-soft w-full">
        {operaciones.length === 0 ? (
          <div className="py-8 px-6 text-center text-gray-500">
            No hay operaciones registradas. ¡Crea una nueva operación!
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
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {operaciones.map(operacion => (
                  <OperacionRow key={operacion.id} operacion={operacion} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Mostrando {operaciones.length} de {operacionesMuestra.length} operaciones
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

export default OperacionesList;
