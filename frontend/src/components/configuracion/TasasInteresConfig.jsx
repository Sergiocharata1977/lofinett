import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Save, PlusCircle, Trash2 } from 'lucide-react';

const TasasInteresConfig = ({ initialTasas = [], onSave }) => {
  const [tasas, setTasas] = useState(initialTasas.length > 0 ? initialTasas : [
    { id: 1, descripcion: 'Hasta 3 cuotas', min: 1, max: 3, tasa: 8.0 },
    { id: 2, descripcion: 'De 4 a 6 cuotas', min: 4, max: 6, tasa: 10.0 },
    { id: 3, descripcion: 'De 7 a 12 cuotas', min: 7, max: 12, tasa: 12.0 },
    { id: 4, descripcion: 'De 13 a 18 cuotas', min: 13, max: 18, tasa: 15.0 },
    { id: 5, descripcion: 'De 19 a 24 cuotas', min: 19, max: 24, tasa: 18.0 }
  ]);
  const [error, setError] = useState('');

  const handleInputChange = (id, field, value) => {
    // Para campos numéricos, convertir a número
    if (field === 'min' || field === 'max' || field === 'tasa') {
      value = Number(value);
    }
    
    setTasas(tasas.map(tasa => tasa.id === id ? { ...tasa, [field]: value } : tasa));
  };

  const agregarRango = () => {
    // Encontrar el ID más alto actual y sumar 1
    const newId = Math.max(...tasas.map(t => t.id), 0) + 1;
    
    setTasas([...tasas, {
      id: newId,
      descripcion: `Nuevo rango ${newId}`,
      min: 1,
      max: 12,
      tasa: 10.0
    }]);
  };

  const eliminarRango = (id) => {
    setTasas(tasas.filter(tasa => tasa.id !== id));
  };

  const validarConfiguracion = () => {
    // Verificar superposición de rangos
    for (let i = 0; i < tasas.length; i++) {
      const rango1 = tasas[i];
      
      // Validar que min sea menor o igual a max
      if (rango1.min > rango1.max) {
        setError(`Error en el rango "${rango1.descripcion}": El mínimo no puede ser mayor que el máximo.`);
        return false;
      }
      
      // Validar que la tasa sea positiva
      if (rango1.tasa < 0) {
        setError(`Error en el rango "${rango1.descripcion}": La tasa debe ser un valor positivo.`);
        return false;
      }
      
      // Verificar superposición con otros rangos
      for (let j = i + 1; j < tasas.length; j++) {
        const rango2 = tasas[j];
        
        // Verificar si hay superposición
        if ((rango1.min <= rango2.max && rango1.max >= rango2.min) || 
            (rango2.min <= rango1.max && rango2.max >= rango1.min)) {
          setError(`Superposición detectada entre "${rango1.descripcion}" y "${rango2.descripcion}". Los rangos no deben solaparse.`);
          return false;
        }
      }
    }
    
    setError('');
    return true;
  };

  const guardarConfiguracion = () => {
    if (validarConfiguracion()) {
      // Ordenar tasas por mínimo ascendente antes de guardar
      const tasasOrdenadas = [...tasas].sort((a, b) => a.min - b.min);
      onSave(tasasOrdenadas);
    }
  };

  return (
    <div>
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Configuración de Tasas por Cuotas</h3>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={agregarRango}
            >
              <PlusCircle size={18} className="mr-2" />
              Agregar Rango
            </Button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Descripción</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Mínimo (cuotas)</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Máximo (cuotas)</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Tasa (%)</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasas.map((tasa) => (
                  <tr key={tasa.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={tasa.descripcion}
                        onChange={(e) => handleInputChange(tasa.id, 'descripcion', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={tasa.min}
                        onChange={(e) => handleInputChange(tasa.id, 'min', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-center"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min={tasa.min}
                        max="99"
                        value={tasa.max}
                        onChange={(e) => handleInputChange(tasa.id, 'max', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-center"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={tasa.tasa}
                        onChange={(e) => handleInputChange(tasa.id, 'tasa', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-center"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => eliminarRango(tasa.id)}
                        className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition-colors"
                        disabled={tasas.length <= 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="primary" 
              className="flex items-center"
              onClick={guardarConfiguracion}
            >
              <Save size={18} className="mr-2" />
              Guardar Configuración
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TasasInteresConfig;
