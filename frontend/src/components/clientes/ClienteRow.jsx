import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';

const ClienteRow = ({ cliente, onDelete }) => {
  // Formatear valores monetarios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Generar el estilo para el estado
  const getEstadoStyle = (estado) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactivo':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Suspendido':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 text-left">
        <div className="font-medium text-gray-900 min-w-[140px]">{cliente.nombre}</div>
      </td>
      <td className="py-4 px-6 text-left">
        <div className="min-w-[90px]">{cliente.documento}</div>
      </td>
      <td className="py-4 px-6 text-left">
        <div className="min-w-[100px]">{cliente.telefono}</div>
      </td>
      <td className="py-4 px-6 text-left">
        <div className="min-w-[180px] break-words">{cliente.email}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[90px]">{formatCurrency(cliente.limiteCredito)}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[90px]">{formatCurrency(cliente.creditoDisponible)}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="min-w-[80px]">
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getEstadoStyle(cliente.estado)}`}>
            {cliente.estado}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="flex items-center justify-center space-x-2 min-w-[120px]">
          <Link 
            to={`/clientes/ver/${cliente.id}`}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Eye size={18} />
          </Link>
          <Link 
            to={`/clientes/editar/${cliente.id}`}
            className="p-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <Edit size={18} />
          </Link>
          <button 
            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            onClick={() => onDelete && onDelete(cliente.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClienteRow;
