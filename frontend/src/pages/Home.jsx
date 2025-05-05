import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Users, 
  CreditCard, 
  BarChart2, 
  DollarSign, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, accentColor = 'primary' }) => {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };
  
  return (
    <Card hoverable className="w-full">
      <div className="flex items-center justify-start w-full">
        <div className={`rounded-xl p-3 flex-shrink-0 ${colorMap[accentColor]}`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div className="ml-4 flex-grow overflow-hidden">
          <h3 className="text-sm font-medium text-gray-500 whitespace-normal">{title}</h3>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        </div>
      </div>
    </Card>
  );
};

const Home = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div className="w-full sm:w-auto">
          <h1 className="text-3xl font-bold text-gray-800">Panel Principal</h1>
          <p className="text-gray-600 mt-1 whitespace-normal">Bienvenido al sistema de gestión de créditos</p>
        </div>
        <div className="mt-4 sm:mt-0 flex sm:flex-shrink-0 space-x-3">
          <Link to="/clientes/nuevo">
            <Button variant="primary" size="md" className="flex items-center">
              <Users size={18} className="mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">Nuevo Cliente</span>
            </Button>
          </Link>
          <Link to="/operaciones/nueva">
            <Button variant="outline" size="md" className="flex items-center">
              <CreditCard size={18} className="mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">Nueva Operación</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="w-full">
          <StatCard 
            title="Total Clientes" 
            value="24" 
            icon={Users} 
            accentColor="primary"
          />
        </div>
        <div className="w-full">
          <StatCard 
            title="Operaciones Activas" 
            value="18" 
            icon={CreditCard} 
            accentColor="green"
          />
        </div>
        <div className="w-full">
          <StatCard 
            title="A Cobrar Este Mes" 
            value="$45,850" 
            icon={DollarSign} 
            accentColor="blue"
          />
        </div>
        <div className="w-full">
          <StatCard 
            title="Cuotas Vencidas" 
            value="3" 
            icon={AlertCircle} 
            accentColor="red"
          />
        </div>
      </div>

      {/* Tarjetas de acceso rápido */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Accesos Rápidos</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="w-full flex">
          <Card
            title="Gestión de Clientes"
            bodyClassName="flex flex-col items-center text-center w-full"
            className="w-full flex-grow"
            hoverable
          >
            <div className="bg-primary-50 p-4 rounded-full mb-4 flex-shrink-0">
              <Users size={36} className="text-primary-600" strokeWidth={1.5} />
            </div>
            <p className="text-gray-600 mb-6 whitespace-normal break-words">Administre la información de sus clientes, establezca límites de crédito y visualice su historial.</p>
            <Link to="/clientes" className="mt-auto w-full">
              <Button variant="primary" className="w-full">Ver Clientes</Button>
            </Link>
          </Card>
        </div>
        
        <div className="w-full flex">
          <Card
            title="Operaciones Financieras"
            bodyClassName="flex flex-col items-center text-center w-full"
            className="w-full flex-grow"
            hoverable
          >
            <div className="bg-primary-50 p-4 rounded-full mb-4 flex-shrink-0">
              <CreditCard size={36} className="text-primary-600" strokeWidth={1.5} />
            </div>
            <p className="text-gray-600 mb-6 whitespace-normal break-words">Registre nuevas operaciones de crédito, establezca cuotas y calcule intereses automáticamente.</p>
            <Link to="/operaciones" className="mt-auto w-full">
              <Button variant="primary" className="w-full">Gestionar Operaciones</Button>
            </Link>
          </Card>
        </div>
        
        <div className="w-full flex">
          <Card
            title="Reportes y Estadísticas"
            bodyClassName="flex flex-col items-center text-center w-full"
            className="w-full flex-grow"
            hoverable
          >
            <div className="bg-primary-50 p-4 rounded-full mb-4 flex-shrink-0">
              <BarChart2 size={36} className="text-primary-600" strokeWidth={1.5} />
            </div>
            <p className="text-gray-600 mb-6 whitespace-normal break-words">Visualice resúmenes de operaciones, proyecciones de pagos y estado de las cuentas de clientes.</p>
            <Button variant="secondary" className="w-full mt-auto" disabled>Próximamente</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
