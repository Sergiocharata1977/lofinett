import React from 'react';
import { Printer, Download, Share2, Mail } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DetallePago = ({ pago }) => {
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
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Rechazado':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Si no hay pago, mostrar mensaje
  if (!pago) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontró información de la cobranza</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado del comprobante */}
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Comprobante de Cobranza</h2>
            <p className="text-gray-600">N° {pago.numeroComprobante}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${getEstadoStyle(pago.estado)}`}>
              {pago.estado}
            </span>
          </div>
        </div>

        {/* Información principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Información del Cliente</h3>
            <p className="text-lg font-semibold text-gray-800">{pago.cliente}</p>
            {pago.clienteDocumento && (
              <p className="text-gray-600">DNI/CUIT: {pago.clienteDocumento}</p>
            )}
            {pago.clienteEmail && (
              <p className="text-gray-600">{pago.clienteEmail}</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Detalles de la Cobranza</h3>
            <p className="text-lg font-semibold text-primary-600">{formatCurrency(pago.monto)}</p>
            <p className="text-gray-600">Fecha: {formatDate(pago.fecha)}</p>
            <p className="text-gray-600">Método: {pago.metodoPago}</p>
          </div>
        </div>

        {/* Detalles de la operación */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Detalles de la Operación</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Operación</p>
                <p className="font-medium">{pago.operacion}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monto Original</p>
                <p className="font-medium">{formatCurrency(pago.operacionMonto || 0)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Saldo Restante</p>
                <p className="font-medium">{formatCurrency(pago.saldoRestante || 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Observaciones */}
        {pago.observaciones && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Observaciones</h3>
            <p className="text-gray-600 whitespace-pre-line">{pago.observaciones}</p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="border-t border-gray-200 pt-6 flex flex-wrap gap-3 justify-end">
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => window.alert('Imprimiendo comprobante...')}
          >
            <Printer size={18} className="mr-2" />
            Imprimir
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => window.alert('Descargando comprobante...')}
          >
            <Download size={18} className="mr-2" />
            Descargar PDF
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => window.alert('Enviando por email...')}
          >
            <Mail size={18} className="mr-2" />
            Enviar por Email
          </Button>
          <Button 
            variant="primary" 
            className="flex items-center" 
            onClick={() => window.alert('Compartiendo comprobante...')}
          >
            <Share2 size={18} className="mr-2" />
            Compartir
          </Button>
        </div>
      </Card>

      {/* Historial de cambios (opcional) */}
      {pago.historial && pago.historial.length > 0 && (
        <Card title="Historial de Cambios">
          <div className="space-y-4">
            {pago.historial.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{item.accion}</p>
                  <p className="text-sm text-gray-500">{formatDate(item.fecha)}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.usuario}</p>
                {item.detalles && <p className="text-sm text-gray-500 mt-1">{item.detalles}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DetallePago;
