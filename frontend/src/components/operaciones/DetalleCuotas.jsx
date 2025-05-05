import React from 'react';

const DetalleCuotas = ({ cuotas, maxCuotasVisibles = 6 }) => {
  if (!cuotas || cuotas.length === 0) {
    return <p className="text-gray-500 italic">No hay información de cuotas disponible</p>;
  }

  return (
    <div className="mt-4">
      <h4 className="text-md font-medium mb-2">Detalle de Cuotas</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Cuota</th>
              <th className="py-2 px-3 text-left">Vencimiento</th>
              <th className="py-2 px-3 text-right">Monto</th>
              <th className="py-2 px-3 text-right">Saldo Pendiente</th>
            </tr>
          </thead>
          <tbody>
            {cuotas.slice(0, maxCuotasVisibles).map(cuota => (
              <tr key={cuota.numero} className="border-t border-gray-200">
                <td className="py-2 px-3">{cuota.numero}</td>
                <td className="py-2 px-3">
                  {new Date(cuota.fechaVencimiento).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 text-right">
                  ${cuota.monto.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>
                <td className="py-2 px-3 text-right">
                  ${cuota.saldoPendiente.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
            {cuotas.length > maxCuotasVisibles && (
              <tr className="border-t border-gray-200">
                <td colSpan="4" className="py-2 px-3 text-center text-gray-500">
                  ... {cuotas.length - maxCuotasVisibles} cuotas más ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetalleCuotas;
