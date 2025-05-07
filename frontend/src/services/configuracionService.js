// Este servicio maneja la configuración de tasas de interés
// En un ambiente de producción, estos datos serían guardados en la base de datos

// Clave para almacenar las tasas en localStorage
const TASAS_STORAGE_KEY = 'lofinett_tasas_interes';

// Tasas de interés por defecto
const defaultTasas = [
  { id: 1, descripcion: 'Hasta 3 cuotas', min: 1, max: 3, tasa: 8.0 },
  { id: 2, descripcion: 'De 4 a 6 cuotas', min: 4, max: 6, tasa: 10.0 },
  { id: 3, descripcion: 'De 7 a 12 cuotas', min: 7, max: 12, tasa: 12.0 },
  { id: 4, descripcion: 'De 13 a 18 cuotas', min: 13, max: 18, tasa: 15.0 },
  { id: 5, descripcion: 'De 19 a 24 cuotas', min: 19, max: 24, tasa: 18.0 }
];

/**
 * Obtiene las tasas de interés configuradas
 * @returns {Array} Array de objetos de tasas de interés
 */
export const getTasasInteres = () => {
  try {
    const storedTasas = localStorage.getItem(TASAS_STORAGE_KEY);
    return storedTasas ? JSON.parse(storedTasas) : defaultTasas;
  } catch (error) {
    console.error('Error al obtener las tasas de interés:', error);
    return defaultTasas;
  }
};

/**
 * Guarda las tasas de interés configuradas
 * @param {Array} tasas Array de objetos de tasas de interés
 * @returns {boolean} True si la operación fue exitosa
 */
export const saveTasasInteres = (tasas) => {
  try {
    localStorage.setItem(TASAS_STORAGE_KEY, JSON.stringify(tasas));
    return true;
  } catch (error) {
    console.error('Error al guardar las tasas de interés:', error);
    return false;
  }
};

/**
 * Obtiene la tasa de interés correspondiente a un número de cuotas específico
 * @param {number} numCuotas Número de cuotas
 * @returns {number} Tasa de interés aplicable (en porcentaje)
 */
export const getTasaForCuotas = (numCuotas) => {
  const tasas = getTasasInteres();
  
  // Encontrar el rango que incluya el número de cuotas
  const rangoCuotas = tasas.find(
    rango => numCuotas >= rango.min && numCuotas <= rango.max
  );
  
  // Si no se encuentra un rango, devolver una tasa por defecto (puede personalizarse)
  return rangoCuotas ? rangoCuotas.tasa : 10.0;
};

/**
 * Resetea las tasas de interés a los valores por defecto
 * @returns {Array} Array de objetos de tasas de interés por defecto
 */
export const resetTasasInteres = () => {
  try {
    localStorage.setItem(TASAS_STORAGE_KEY, JSON.stringify(defaultTasas));
    return defaultTasas;
  } catch (error) {
    console.error('Error al resetear las tasas de interés:', error);
    return defaultTasas;
  }
};
