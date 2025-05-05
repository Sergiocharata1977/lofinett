import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';

const OperacionRow = ({ operacion }) => {
  // Formatear valores monetarios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 text-left">
        <div className="font-medium text-gray-900 min-w-[120px]">{operacion.cliente}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[80px]">{formatCurrency(operacion.monto)}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="min-w-[40px]">{operacion.cuotas}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[80px]">{formatCurrency(operacion.valorCuota)}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[40px]">{operacion.interes}%</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[80px]">{formatCurrency(operacion.total)}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="min-w-[80px]">{operacion.fechaInicio}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="flex items-center justify-center space-x-2 min-w-[120px]">
          <Link 
            to={`/operaciones/ver/${operacion.id}`}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Eye size={18} />
          </Link>
          <Link 
            to={`/operaciones/editar/${operacion.id}`}
            className="p-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <Edit size={18} />
          </Link>
          <button 
            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            onClick={() => confirm('¿Está seguro de que desea eliminar esta operación?')}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OperacionRow;
