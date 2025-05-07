// Este servicio proporciona datos mock para el dashboard
// En un entorno de producción, estos datos vendrían de la API

export const getDashboardData = () => {
  // Datos para las tarjetas de estadísticas
  const statsCards = {
    operacionesActivas: {
      value: 124,
      change: 12.5,
      description: "vs mes anterior"
    },
    montoCartera: {
      value: "$2,345,670",
      change: 8.3,
      description: "vs mes anterior"
    },
    clientesActivos: {
      value: 87,
      change: 5.2,
      description: "vs mes anterior"
    },
    tasaMorosidad: {
      value: "4.2%",
      change: -1.5,
      description: "vs mes anterior"
    }
  };

  // Datos para el gráfico de operaciones por mes
  const operacionesPorMes = [
    { name: 'Ene', activas: 65, nuevas: 18, canceladas: 5 },
    { name: 'Feb', activas: 70, nuevas: 20, canceladas: 4 },
    { name: 'Mar', activas: 82, nuevas: 24, canceladas: 6 },
    { name: 'Abr', activas: 90, nuevas: 16, canceladas: 8 },
    { name: 'May', activas: 96, nuevas: 15, canceladas: 9 },
    { name: 'Jun', activas: 105, nuevas: 22, canceladas: 7 },
    { name: 'Jul', activas: 115, nuevas: 25, canceladas: 10 },
    { name: 'Ago', activas: 124, nuevas: 18, canceladas: 8 },
  ];

  // Datos para el gráfico de montos por mes (en miles)
  const montosPorMes = [
    { name: 'Ene', monto: 1450 },
    { name: 'Feb', monto: 1580 },
    { name: 'Mar', monto: 1780 },
    { name: 'Abr', monto: 1920 },
    { name: 'May', monto: 2050 },
    { name: 'Jun', monto: 2180 },
    { name: 'Jul', monto: 2280 },
    { name: 'Ago', monto: 2345 },
  ];

  // Datos para el gráfico de distribución de créditos por tipo
  const distribucionCreditos = [
    { name: 'Personal', value: 45 },
    { name: 'Vehículo', value: 30 },
    { name: 'Hipotecario', value: 15 },
    { name: 'Pyme', value: 10 },
  ];

  // Datos para el gráfico de estado de pagos
  const estadoPagos = [
    { name: 'Al día', value: 75 },
    { name: '1-30 días', value: 15 },
    { name: '31-60 días', value: 6 },
    { name: '61-90 días', value: 3 },
    { name: '+90 días', value: 1 },
  ];

  // Datos para la tabla de clientes recientes
  const clientesRecientes = [
    { id: 1, nombre: 'Juan Pérez', operaciones: 3, estado: 'Activo', montoTotal: 120000 },
    { id: 2, nombre: 'María González', operaciones: 2, estado: 'Activo', montoTotal: 85000 },
    { id: 3, nombre: 'Carlos Rodríguez', operaciones: 1, estado: 'En mora', montoTotal: 45000 },
    { id: 4, nombre: 'Ana Martínez', operaciones: 2, estado: 'Activo', montoTotal: 92000 },
    { id: 5, nombre: 'Luis Gómez', operaciones: 1, estado: 'Pendiente', montoTotal: 30000 },
  ];

  // Datos para el análisis de riesgo
  const distribucionRiesgo = [
    { name: 'Bajo', value: 55 },
    { name: 'Medio', value: 32 },
    { name: 'Alto', value: 13 },
  ];

  return {
    statsCards,
    operacionesPorMes,
    montosPorMes,
    distribucionCreditos,
    estadoPagos,
    clientesRecientes,
    distribucionRiesgo
  };
};
