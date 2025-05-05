import React from 'react';
import { Eye, FileText, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnalisisRow = ({ analisis, onDelete, showCliente = true }) => {
  // Función para generar clase CSS según el resultado
  const getResultadoClass = (resultado) => {
    switch (resultado) {
      case 'Aprobado':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'En revisión':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Rechazado':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };
  
  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  };
  
  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };
  
  // Simular la visualización del análisis detallado
  const handleView = () => {
    window.alert(`Visualizando análisis de riesgo ID: ${analisis.id}`);
  };
  
  // Manejar la eliminación del análisis
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(analisis.id);
  };

  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={handleView}>
      {showCliente && (
        <td className="py-4 px-6">
          <Link to={`/clientes/${analisis.clienteId}`} onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:text-blue-800 hover:underline">
            {analisis.clienteNombre}
          </Link>
        </td>
      )}
      <td className="py-4 px-6">{formatDate(analisis.fechaAnalisis)}</td>
      <td className="py-4 px-6">{analisis.analistaResponsable}</td>
      <td className="py-4 px-6 text-center">
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getResultadoClass(analisis.resultado)}`}>
          {analisis.resultado}
        </span>
      </td>
      <td className="py-4 px-6 text-right font-medium">{formatCurrency(analisis.limiteCredito)}</td>
      <td className="py-4 px-6 text-center">
        <div className="flex justify-center space-x-2">
          <button
            onClick={handleView}
            className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
            title="Ver análisis"
          >
            <Eye size={18} />
          </button>
          <Link
            to={`/documentos/cliente/${analisis.clienteId}`}
            onClick={(e) => e.stopPropagation()}
            className="p-1 text-purple-600 hover:text-purple-800 rounded-full hover:bg-purple-50"
            title="Ver documentos asociados"
          >
            <FileText size={18} />
          </Link>
          <Link
            to={`/analisis/editar/${analisis.id}`}
            onClick={(e) => e.stopPropagation()}
            className="p-1 text-orange-600 hover:text-orange-800 rounded-full hover:bg-orange-50"
            title="Editar análisis"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
            title="Eliminar análisis"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AnalisisRow;
