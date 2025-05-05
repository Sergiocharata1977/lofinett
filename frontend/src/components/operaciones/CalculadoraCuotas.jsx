import React, { useState } from 'react';
import Button from '../ui/Button';

const CalculadoraCuotas = ({ 
  datos, 
  onCalculate, 
  resultados,
  isLoading,
  isEditing = false
}) => {
  // Estamos pasando los datos del formulario padre, pero podríamos tener un estado interno aquí
  // si fuera un componente independiente
  const { monto, cuotas, interesMensual, gastosAdicionales } = datos;

  // Manejar el botón de calcular
  const handleCalcular = () => {
    if (onCalculate) {
      onCalculate(datos);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">Calculadora de Financiamiento</h3>
      
      {!isEditing && (
        <div className="mb-6">
          <Button
            onClick={handleCalcular}
            disabled={isLoading || !monto || !cuotas}
            variant="success"
            className="w-full sm:w-auto"
          >
            {isLoading ? 'Calculando...' : 'Calcular Financiamiento'}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Complete los campos y haga clic en calcular para ver las cuotas
          </p>
        </div>
      )}
      
      {resultados && resultados.montoTotal > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="text-sm text-gray-500">Monto Solicitado</div>
              <div className="text-xl font-bold">${parseFloat(monto).toLocaleString()}</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="text-sm text-gray-500">Valor de Cuota</div>
              <div className="text-xl font-bold">
                ${resultados.valorCuota.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <div className="text-sm text-blue-700">Monto Total a Pagar</div>
              <div className="text-xl font-bold text-blue-700">
                ${resultados.montoTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraCuotas;
