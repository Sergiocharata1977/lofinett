import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CalculadoraPrestamos from '../../components/calculadoras/CalculadoraPrestamos';

const CalculadoraPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/configuracion')}
          className="mr-3 p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Verificación Manual de Tasas
          </h1>
          <p className="text-gray-600 mt-1">
            Calculadora con sistema francés para verificar cálculos de financiamiento
          </p>
        </div>
      </div>
      
      <CalculadoraPrestamos />
    </div>
  );
};

export default CalculadoraPage;
