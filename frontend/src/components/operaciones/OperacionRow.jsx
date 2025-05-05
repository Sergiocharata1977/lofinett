import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const OperacionRow = ({ operacion, onDelete }) => {
  const navigate = useNavigate();

  // Formatear valores monetarios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Navegación a la página de detalle
  const handleRowClick = () => {
    navigate(`/operaciones/${operacion.id}`);
  };

  return (
    <tr 
      className="hover:bg-gray-50 transition-colors cursor-pointer" 
      onClick={handleRowClick}
    >
      <td className="py-4 px-6">
        <div className="font-medium text-gray-800 min-w-[120px]">{operacion.cliente}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="text-primary-600 font-medium min-w-[80px]">{formatCurrency(operacion.monto)}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="min-w-[40px] text-gray-600">{operacion.cuotas}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[80px] text-gray-600">{formatCurrency(operacion.valorCuota)}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[40px] text-gray-600">{operacion.interes}%</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[80px] text-gray-600">{formatCurrency(operacion.total)}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="min-w-[80px] text-gray-600">{operacion.fechaInicio}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="flex justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
          <Link
            to={`/operaciones/editar/${operacion.id}`}
            className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit size={16} className="text-gray-600" />
          </Link>
          <button
            onClick={() => onDelete ? onDelete(operacion.id) : confirm('¿Está seguro de que desea eliminar esta operación?')}
            className="p-1.5 bg-gray-100 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} className="text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OperacionRow;
