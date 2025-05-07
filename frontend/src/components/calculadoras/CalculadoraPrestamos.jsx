import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getTasaForCuotas } from '../../services/configuracionService';

/**
 * Calcula el plan de amortización usando el sistema francés
 * @param {number} principal - Monto del préstamo
 * @param {number} interestRate - Tasa de interés mensual (en porcentaje)
 * @param {number} numPayments - Cantidad de cuotas
 * @param {number} additionalFees - Gastos adicionales
 * @returns {Object} - Objeto con la cuota fija y el detalle de amortización
 */
function calculateFrenchSystem(principal, interestRate, numPayments, additionalFees = 0) {
  // Convertir porcentaje a decimal
  const r = interestRate / 100;
  
  // Sumar gastos adicionales al principal
  const totalPrincipal = principal + additionalFees;
  
  // Calcular cuota usando la fórmula del sistema francés
  const cuota = totalPrincipal * (r * Math.pow(1 + r, numPayments)) / (Math.pow(1 + r, numPayments) - 1);
  
  // Crear tabla de amortización
  const schedule = [];
  let remaining = totalPrincipal;
  
  for (let i = 1; i <= numPayments; i++) {
    // Calcular interés sobre saldo pendiente
    const interest = remaining * r;
    
    // Calcular porción de capital en la cuota
    const capital = cuota - interest;
    
    // Actualizar saldo pendiente
    remaining -= capital;
    if (remaining < 0.01) remaining = 0; // Para evitar errores de redondeo
    
    // Guardar detalles de esta cuota
    schedule.push({
      numero: i,
      cuota: cuota,
      interes: interest,
      capital: capital,
      saldo: remaining
    });
  }
  
  // Calcular totales
  const totalPagado = cuota * numPayments;
  const totalInteres = totalPagado - totalPrincipal;
  
  return {
    cuotaFija: cuota,
    totalPagado: totalPagado,
    totalInteres: totalInteres,
    detalleCuotas: schedule
  };
}

const CalculadoraPrestamos = () => {
  const [formValues, setFormValues] = useState({
    monto: 100000,
    cuotas: 12,
    tasaInteres: 8,
    gastosAdicionales: 0
  });
  
  const [resultado, setResultado] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  
  // Actualizar tasa de interés cuando cambia el número de cuotas
  useEffect(() => {
    if (formValues.cuotas) {
      const tasaInteres = getTasaForCuotas(parseInt(formValues.cuotas));
      setFormValues(prevState => ({
        ...prevState,
        tasaInteres: tasaInteres
      }));
    }
  }, [formValues.cuotas]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  const handleCalcular = () => {
    const { monto, cuotas, tasaInteres, gastosAdicionales } = formValues;
    
    // Validar datos
    if (!monto || !cuotas || !tasaInteres) {
      alert('Por favor complete todos los campos');
      return;
    }
    
    // Calcular usando el sistema francés
    const result = calculateFrenchSystem(
      parseFloat(monto),
      parseFloat(tasaInteres),
      parseInt(cuotas),
      parseFloat(gastosAdicionales)
    );
    
    setResultado(result);
  };
  
  const formatCurrency = (value) => {
    return value.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  return (
    <div className="container mx-auto p-4">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Calculadora de Préstamos - Sistema Francés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monto del Préstamo
              </label>
              <input
                type="number"
                name="monto"
                value={formValues.monto}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad de Cuotas
              </label>
              <select
                name="cuotas"
                value={formValues.cuotas}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="3">3 cuotas</option>
                <option value="6">6 cuotas</option>
                <option value="12">12 cuotas</option>
                <option value="18">18 cuotas</option>
                <option value="24">24 cuotas</option>
                <option value="36">36 cuotas</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tasa de Interés Mensual (%)
              </label>
              <input
                type="number"
                name="tasaInteres"
                value={formValues.tasaInteres}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Esta tasa se actualiza automáticamente según el número de cuotas seleccionado
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gastos Adicionales
              </label>
              <input
                type="number"
                name="gastosAdicionales"
                value={formValues.gastosAdicionales}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <Button
            variant="primary"
            className="w-full mb-6"
            onClick={handleCalcular}
          >
            Calcular Préstamo
          </Button>
          
          {resultado && (
            <div className="mt-6">
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Resultados del Cálculo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Cuota Mensual Fija</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatCurrency(resultado.cuotaFija)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Total a Pagar</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatCurrency(resultado.totalPagado)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Total de Intereses</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatCurrency(resultado.totalInteres)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Detalle de Amortización</h3>
                <Button
                  variant="outline"
                  onClick={() => setMostrarDetalle(!mostrarDetalle)}
                >
                  {mostrarDetalle ? 'Ocultar Detalle' : 'Mostrar Detalle'}
                </Button>
              </div>
              
              {mostrarDetalle && (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 border-b text-left">Cuota #</th>
                        <th className="py-2 px-4 border-b text-right">Importe Cuota</th>
                        <th className="py-2 px-4 border-b text-right">Capital</th>
                        <th className="py-2 px-4 border-b text-right">Interés</th>
                        <th className="py-2 px-4 border-b text-right">Saldo Pendiente</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.detalleCuotas.map((cuota) => (
                        <tr key={cuota.numero} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{cuota.numero}</td>
                          <td className="py-2 px-4 border-b text-right">{formatCurrency(cuota.cuota)}</td>
                          <td className="py-2 px-4 border-b text-right">{formatCurrency(cuota.capital)}</td>
                          <td className="py-2 px-4 border-b text-right">{formatCurrency(cuota.interes)}</td>
                          <td className="py-2 px-4 border-b text-right">{formatCurrency(cuota.saldo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CalculadoraPrestamos;
