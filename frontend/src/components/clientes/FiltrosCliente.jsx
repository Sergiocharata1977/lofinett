import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Button from '../ui/Button';

const FiltrosCliente = ({ onFilterChange, initialFilters = {} }) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    tipoDocumento: '',
    categoriaCliente: '',
    fechaAltaDesde: '',
    fechaAltaHasta: '',
    estado: '',
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
      tipoDocumento: '',
      categoriaCliente: '',
      fechaAltaDesde: '',
      fechaAltaHasta: '',
      estado: ''
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
            placeholder="Buscar por nombre, documento o email..."
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
            {/* Filtro por tipo de documento */}
            <div>
              <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de documento
              </label>
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={filtros.tipoDocumento}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todos</option>
                <option value="DNI">DNI</option>
                <option value="CUIT">CUIT</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Filtro por categoría de cliente */}
            <div>
              <label htmlFor="categoriaCliente" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                id="categoriaCliente"
                name="categoriaCliente"
                value={filtros.categoriaCliente}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todas</option>
                <option value="A">A - Excelente</option>
                <option value="B">B - Bueno</option>
                <option value="C">C - Regular</option>
                <option value="D">D - Con riesgo</option>
              </select>
            </div>

            {/* Filtro por fecha de alta desde */}
            <div>
              <label htmlFor="fechaAltaDesde" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha alta desde
              </label>
              <input
                type="date"
                id="fechaAltaDesde"
                name="fechaAltaDesde"
                value={filtros.fechaAltaDesde}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filtro por fecha de alta hasta */}
            <div>
              <label htmlFor="fechaAltaHasta" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha alta hasta
              </label>
              <input
                type="date"
                id="fechaAltaHasta"
                name="fechaAltaHasta"
                value={filtros.fechaAltaHasta}
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
                <option value="Inactivo">Inactivo</option>
                <option value="Moroso">Moroso</option>
                <option value="Bloqueado">Bloqueado</option>
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

export default FiltrosCliente;
