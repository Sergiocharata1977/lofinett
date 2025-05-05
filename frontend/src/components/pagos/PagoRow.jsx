import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Download, Printer } from 'lucide-react';

const PagoRow = ({ pago, onDelete }) => {
  // Formatear valores monetarios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  };

  // Determinar estilo según el estado del pago
  const getEstadoStyle = (estado) => {
    switch (estado) {
      case 'Confirmado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rechazado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 text-left">
        <div className="font-medium text-gray-900 min-w-[140px]">{pago.numeroComprobante}</div>
      </td>
      <td className="py-4 px-6 text-left">
        <div className="min-w-[140px]">{pago.cliente}</div>
      </td>
      <td className="py-4 px-6 text-left">
        <div className="min-w-[100px]">{pago.operacion}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="min-w-[90px]">{formatCurrency(pago.monto)}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="min-w-[90px]">{formatDate(pago.fecha)}</div>
      </td>
      <td className="py-4 px-6 text-left">
        <div className="min-w-[100px]">{pago.metodoPago}</div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="min-w-[80px]">
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getEstadoStyle(pago.estado)}`}>
            {pago.estado}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="flex items-center justify-center space-x-2 min-w-[150px]">
          <Link 
            to={`/pagos/ver/${pago.id}`}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            title="Ver detalles"
          >
            <Eye size={18} />
          </Link>
          <Link 
            to={`/pagos/editar/${pago.id}`}
            className="p-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
            title="Editar pago"
          >
            <Edit size={18} />
          </Link>
          <button 
            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            onClick={() => onDelete && onDelete(pago.id)}
            title="Eliminar pago"
          >
            <Trash2 size={18} />
          </button>
          <button 
            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
            onClick={() => window.alert('Descargando comprobante...')}
            title="Descargar comprobante"
          >
            <Download size={18} />
          </button>
          <button 
            className="p-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            onClick={() => window.alert('Imprimiendo comprobante...')}
            title="Imprimir comprobante"
          >
            <Printer size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PagoRow;
