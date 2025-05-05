import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ClienteRow = ({ cliente, onDelete }) => {
  const navigate = useNavigate();

  // Formatear número con separador de miles
  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-AR').format(number);
  };

  // Navegación a la página de detalle
  const handleRowClick = () => {
    navigate(`/clientes/${cliente.id}`);
  };

  return (
    <tr 
      className="hover:bg-gray-50 transition-colors cursor-pointer" 
      onClick={handleRowClick}
    >
      <td className="py-4 px-6 min-w-[100px]">
        <div className="font-medium text-gray-800">{cliente.nombre}</div>
      </td>
      <td className="py-4 px-6 min-w-[100px]">
        <div className="text-gray-600">{cliente.documento}</div>
      </td>
      <td className="py-4 px-6 min-w-[150px]">
        <div className="text-gray-600">{cliente.email}</div>
      </td>
      <td className="py-4 px-6 min-w-[120px]">
        <div className="text-gray-600">{cliente.telefono}</div>
      </td>
      <td className="py-4 px-6 text-right min-w-[100px]">
        <div className="font-medium text-primary-600">${formatNumber(cliente.limite)}</div>
      </td>
      <td className="py-4 px-6 text-center min-w-[100px]">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            cliente.estado === 'Activo'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {cliente.estado}
        </span>
      </td>
      <td className="py-4 px-6 text-center min-w-[100px]">
        <div className="flex justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
          <Link
            to={`/clientes/editar/${cliente.id}`}
            className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit size={16} className="text-gray-600" />
          </Link>
          <button
            onClick={() => onDelete(cliente.id)}
            className="p-1.5 bg-gray-100 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} className="text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClienteRow;
