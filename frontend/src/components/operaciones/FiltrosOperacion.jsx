import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Button from '../ui/Button';

const FiltrosOperacion = ({ onFilterChange, initialFilters = {} }) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    clienteId: '',
    montoMin: '',
    montoMax: '',
    fechaInicioDesde: '',
    fechaInicioHasta: '',
    estado: '',
    tipoOperacion: '',
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
      clienteId: '',
      montoMin: '',
      montoMax: '',
      fechaInicioDesde: '',
      fechaInicioHasta: '',
      estado: '',
      tipoOperacion: ''
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
            placeholder="Buscar por número de operación, cliente o monto..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Filtro por tipo de operación */}
            <div>
              <label htmlFor="tipoOperacion" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de operación
              </label>
              <select
                id="tipoOperacion"
                name="tipoOperacion"
                value={filtros.tipoOperacion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todos</option>
                <option value="Préstamo">Préstamo</option>
                <option value="Crédito">Crédito</option>
                <option value="Refinanciación">Refinanciación</option>
                <option value="Adelanto">Adelanto</option>
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

            {/* Filtro por fecha de inicio desde */}
            <div>
              <label htmlFor="fechaInicioDesde" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha inicio desde
              </label>
              <input
                type="date"
                id="fechaInicioDesde"
                name="fechaInicioDesde"
                value={filtros.fechaInicioDesde}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filtro por fecha de inicio hasta */}
            <div>
              <label htmlFor="fechaInicioHasta" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha inicio hasta
              </label>
              <input
                type="date"
                id="fechaInicioHasta"
                name="fechaInicioHasta"
                value={filtros.fechaInicioHasta}
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
                <option value="Activo">Activo</option>
                <option value="Finalizado">Finalizado</option>
                <option value="En mora">En mora</option>
                <option value="Cancelado">Cancelado</option>
              </select>
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

export default FiltrosOperacion;
