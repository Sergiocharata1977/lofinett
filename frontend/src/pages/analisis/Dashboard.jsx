import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Users, Wallet, CreditCard, AlertTriangle } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import LineChartWidget from '../../components/dashboard/LineChartWidget';
import BarChartWidget from '../../components/dashboard/BarChartWidget';
import PieChartWidget from '../../components/dashboard/PieChartWidget';
import RecentClientsTable from '../../components/dashboard/RecentClientsTable';
import { getDashboardData } from '../../services/dashboardService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulando carga de datos desde una API
    setLoading(true);
    setTimeout(() => {
      const data = getDashboardData();
      setDashboardData(data);
      setLoading(false);
    }, 800);
  }, []);

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Ejecutivo
        </h1>
        <p className="text-gray-600 mt-1">
          Monitoreo de métricas clave del negocio
        </p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Operaciones Activas" 
          value={dashboardData.statsCards.operacionesActivas.value} 
          icon={<CreditCard size={24} />}
          change={dashboardData.statsCards.operacionesActivas.change}
          description={dashboardData.statsCards.operacionesActivas.description}
        />
        <StatCard 
          title="Cartera Total" 
          value={dashboardData.statsCards.montoCartera.value} 
          icon={<Wallet size={24} />}
          change={dashboardData.statsCards.montoCartera.change}
          description={dashboardData.statsCards.montoCartera.description}
        />
        <StatCard 
          title="Clientes Activos" 
          value={dashboardData.statsCards.clientesActivos.value} 
          icon={<Users size={24} />}
          change={dashboardData.statsCards.clientesActivos.change}
          description={dashboardData.statsCards.clientesActivos.description}
        />
        <StatCard 
          title="Tasa de Morosidad" 
          value={dashboardData.statsCards.tasaMorosidad.value} 
          icon={<AlertTriangle size={24} />}
          change={dashboardData.statsCards.tasaMorosidad.change}
          description={dashboardData.statsCards.tasaMorosidad.description}
        />
      </div>

      {/* Fila 1 de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChartWidget 
          title="Evolución de Operaciones (últimos 8 meses)"
          data={dashboardData.operacionesPorMes}
          dataKey={[
            {key: 'activas', name: 'Activas', stroke: '#3b82f6'},
            {key: 'nuevas', name: 'Nuevas', stroke: '#10b981'},
            {key: 'canceladas', name: 'Canceladas', stroke: '#f59e0b'}
          ]}
        />
        <LineChartWidget 
          title="Monto de Cartera (últimos 8 meses, en miles)"
          data={dashboardData.montosPorMes}
          dataKey="monto"
          stroke="#8b5cf6"
        />
      </div>

      {/* Fila 2 de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <PieChartWidget 
          title="Distribución por Tipo de Crédito"
          data={dashboardData.distribucionCreditos}
        />
        <PieChartWidget 
          title="Estado de Pagos"
          data={dashboardData.estadoPagos}
        />
        <PieChartWidget 
          title="Distribución por Nivel de Riesgo"
          data={dashboardData.distribucionRiesgo}
        />
      </div>

      {/* Tabla de clientes recientes */}
      <div className="mb-8">
        <RecentClientsTable clients={dashboardData.clientesRecientes} />
      </div>
    </div>
  );
};

export default Dashboard;
