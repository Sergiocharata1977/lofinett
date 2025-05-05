import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Button from '../ui/Button';

const FiltrosPago = ({ onFilterChange, initialFilters = {} }) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    fechaDesde: '',
    fechaHasta: '',
    estado: '',
    metodoPago: '',
    montoMin: '',
    montoMax: '',
    ...initialFilters
  });
  
  const [mostrarFiltrosAvanzados, setMostrarFiltrosAvanzados] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  const aplicarFiltros = () => {
    onFilterChange(filtros);
  };

  const limpiarFiltros = () => {
    const nuevosFiltros = {
      busqueda: '',
      fechaDesde: '',
      fechaHasta: '',
      estado: '',
      metodoPago: '',
      montoMin: '',
      montoMax: ''
    };
    
    setFiltros(nuevosFiltros);
    onFilterChange(nuevosFiltros);
  };

  const toggleFiltrosAvanzados = () => {
    setMostrarFiltrosAvanzados(!mostrarFiltrosAvanzados);
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
      {/* Barra de búsqueda principal */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            name="busqueda"
            value={filtros.busqueda}
            onChange={handleInputChange}
            placeholder="Buscar por comprobante, cliente o monto..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="primary" 
            className="flex items-center whitespace-nowrap"
            onClick={aplicarFiltros}
          >
            <Search size={18} className="mr-2" />
            Buscar
          </Button>
          <Button 
            variant={mostrarFiltrosAvanzados ? "primary" : "outline"} 
            className="flex items-center whitespace-nowrap"
            onClick={toggleFiltrosAvanzados}
          >
            <Filter size={18} className="mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Filtros avanzados (visibles solo cuando se activan) */}
      {mostrarFiltrosAvanzados && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Filtro por fecha desde */}
            <div>
              <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha desde
              </label>
              <input
                type="date"
                id="fechaDesde"
                name="fechaDesde"
                value={filtros.fechaDesde}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filtro por fecha hasta */}
            <div>
              <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha hasta
              </label>
              <input
                type="date"
                id="fechaHasta"
                name="fechaHasta"
                value={filtros.fechaHasta}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filtro por estado */}
            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={filtros.estado}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>

            {/* Filtro por método de pago */}
            <div>
              <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700 mb-1">
                Método de pago
              </label>
              <select
                id="metodoPago"
                name="metodoPago"
                value={filtros.metodoPago}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todos</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Cheque">Cheque</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Filtro por monto mínimo */}
            <div>
              <label htmlFor="montoMin" className="block text-sm font-medium text-gray-700 mb-1">
                Monto mínimo
              </label>
              <input
                type="number"
                id="montoMin"
                name="montoMin"
                value={filtros.montoMin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Monto mínimo"
                min="0"
              />
            </div>

            {/* Filtro por monto máximo */}
            <div>
              <label htmlFor="montoMax" className="block text-sm font-medium text-gray-700 mb-1">
                Monto máximo
              </label>
              <input
                type="number"
                id="montoMax"
                name="montoMax"
                value={filtros.montoMax}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Monto máximo"
                min="0"
              />
            </div>
          </div>

          {/* Botones para aplicar o limpiar filtros */}
          <div className="flex justify-end mt-4 space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={limpiarFiltros}
            >
              <X size={18} className="mr-2" />
              Limpiar filtros
            </Button>
            <Button 
              variant="primary" 
              className="flex items-center"
              onClick={aplicarFiltros}
            >
              <Search size={18} className="mr-2" />
              Aplicar filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltrosPago;
