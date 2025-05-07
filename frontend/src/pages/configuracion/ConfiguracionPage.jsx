import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { Settings, Sliders, AlertTriangle } from 'lucide-react';
import TasasInteresConfig from '../../components/configuracion/TasasInteresConfig';
import { getTasasInteres, saveTasasInteres, resetTasasInteres } from '../../services/configuracionService';

const ConfiguracionPage = () => {
  const [tasasInteres, setTasasInteres] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('tasas');

  useEffect(() => {
    // Cargar las tasas al montar el componente
    const tasas = getTasasInteres();
    setTasasInteres(tasas);
  }, []);

  const handleSaveTasas = (nuevasTasas) => {
    const resultado = saveTasasInteres(nuevasTasas);
    if (resultado) {
      setTasasInteres(nuevasTasas);
      setSuccessMessage('Configuración de tasas guardada correctamente');
      
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleResetTasas = () => {
    if (window.confirm('¿Está seguro que desea restablecer las tasas a sus valores predeterminados?')) {
      const tasasDefault = resetTasasInteres();
      setTasasInteres(tasasDefault);
      setSuccessMessage('Tasas restablecidas a valores predeterminados');
      
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="flex items-center mb-6">
        <Settings size={24} className="mr-3 text-gray-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Configuración del Sistema</h1>
          <p className="text-gray-600 mt-1">
            Personalice los parámetros y valores predeterminados de la aplicación
          </p>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Tabs de configuración */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="tasas" className="flex items-center">
            <Sliders size={18} className="mr-2" />
            Tasas de Interés
          </TabsTrigger>
          <TabsTrigger value="general" disabled className="flex items-center opacity-60 cursor-not-allowed">
            <Settings size={18} className="mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="limites" disabled className="flex items-center opacity-60 cursor-not-allowed">
            <AlertTriangle size={18} className="mr-2" />
            Límites y Alertas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasas" className="w-full">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">Tasas de Interés por Cuotas</h2>
              <button
                onClick={handleResetTasas}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Restablecer valores predeterminados
              </button>
            </div>
            
            <TasasInteresConfig 
              initialTasas={tasasInteres} 
              onSave={handleSaveTasas} 
            />

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">¿Cómo funciona?</h3>
              <p className="text-blue-700 text-sm">
                Configure diferentes tasas de interés según el número de cuotas. La tasa
                correspondiente se aplicará automáticamente al calcular las cuotas de los créditos.
                Asegúrese de no dejar ningún rango de cuotas sin cubrir para evitar errores en los cálculos.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="general">
          <div className="p-4 text-center text-gray-500">
            Configuración general (próximamente)
          </div>
        </TabsContent>
        
        <TabsContent value="limites">
          <div className="p-4 text-center text-gray-500">
            Configuración de límites y alertas (próximamente)
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracionPage;
