import React from 'react';
import { Eye, Download, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentoRow = ({ documento, onDelete, showCliente = true }) => {
  // Función para generar clase CSS según el estado
  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'Aprobado':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Pendiente':
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
  
  // Simular la visualización del documento
  const handleView = () => {
    window.alert(`Visualizando documento: ${documento.nombreArchivo}`);
  };
  
  // Simular la descarga del documento
  const handleDownload = (e) => {
    e.stopPropagation();
    window.alert(`Descargando documento: ${documento.nombreArchivo}`);
  };
  
  // Manejar la eliminación del documento
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(documento.id);
  };

  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={handleView}>
      {showCliente && (
        <td className="py-4 px-6">
          <Link to={`/clientes/${documento.clienteId}`} onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:text-blue-800 hover:underline">
            {documento.clienteNombre}
          </Link>
        </td>
      )}
      <td className="py-4 px-6">{documento.tipoDocumento}</td>
      <td className="py-4 px-6">{documento.nombreArchivo}</td>
      <td className="py-4 px-6 text-center">{formatDate(documento.fechaCarga)}</td>
      <td className="py-4 px-6 text-center">
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoClass(documento.estado)}`}>
          {documento.estado}
        </span>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="flex justify-center space-x-2">
          <button
            onClick={handleView}
            className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
            title="Ver documento"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={handleDownload}
            className="p-1 text-green-600 hover:text-green-800 rounded-full hover:bg-green-50"
            title="Descargar documento"
          >
            <Download size={18} />
          </button>
          <Link
            to={`/documentos/editar/${documento.id}`}
            onClick={(e) => e.stopPropagation()}
            className="p-1 text-orange-600 hover:text-orange-800 rounded-full hover:bg-orange-50"
            title="Editar documento"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
            title="Eliminar documento"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentoRow;
