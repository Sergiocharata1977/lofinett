import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const RecentClientsTable = ({ clients, title = "Clientes Recientes", className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-soft p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <Link 
          to="/clientes" 
          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
        >
          Ver todos
          <ArrowUpRight size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Operaciones</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto Total</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link to={`/clientes/${client.id}`} className="font-medium text-gray-800 hover:text-primary-600">
                    {client.nombre}
                  </Link>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {client.operaciones}
                </td>
                <td className="py-3 px-4">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${client.estado === 'Activo' ? 'bg-green-100 text-green-800' : 
                        client.estado === 'En mora' ? 'bg-red-100 text-red-800' :
                        client.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    `}
                  >
                    {client.estado}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  ${client.montoTotal.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {clients.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No hay clientes para mostrar.
        </div>
      )}
    </div>
  );
};

export default RecentClientsTable;
