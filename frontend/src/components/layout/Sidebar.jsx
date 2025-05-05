import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CreditCard,
  Users,
  BarChart2,
  Calendar,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';
// Temporalmente comentamos la importación del logo hasta que se agregue el archivo
// import logo from '../../assets/img/lofinett-logo.png';

const menuItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/clientes', icon: Users, label: 'Clientes' },
  { path: '/operaciones', icon: CreditCard, label: 'Operaciones' },
  { path: '/cobranzas', icon: Calendar, label: 'Cobranzas' },
  { path: '/reportes', icon: BarChart2, label: 'Reportes', disabled: true },
  { path: '/caja', icon: DollarSign, label: 'Caja', disabled: true },
];

const Sidebar = ({ onToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  // Cuando cambia el estado de expanded, notifica al componente padre
  useEffect(() => {
    if (typeof onToggle === 'function') {
      onToggle(expanded);
    }
  }, [expanded, onToggle]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <aside
      className={`bg-white h-screen fixed left-0 top-0 shadow-soft transition-all duration-300 z-10
                 ${expanded ? 'w-64' : 'w-20'}`}
    >
      {/* Encabezado del sidebar */}
      <div className="flex flex-col items-center justify-center py-6 border-b border-gray-200">
        <div className="flex items-center justify-center">
          {/* <img 
            src={logo} 
            alt="LOFINETT Logo" 
            className={`${expanded ? 'h-12' : 'h-10'} transition-all duration-300`}
          /> */}
          <DollarSign 
            className="h-10 w-10 text-primary-800" 
            strokeWidth={2} 
          />
          {expanded && (
            <h1 className="ml-2 text-xl font-bold text-gray-800">
              <span className="text-primary-600">LOFINETT</span>
            </h1>
          )}
        </div>
      </div>

      {/* Botón para expandir/contraer */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
      >
        {expanded ?
          <ChevronLeft size={20} className="text-primary-600" /> :
          <ChevronRight size={20} className="text-primary-600" />
        }
      </button>

      {/* Menú de navegación */}
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.disabled ? '#' : item.path}
                  className={`
                    flex items-center py-3 px-4 rounded-xl transition-all duration-200
                    ${expanded ? '' : 'justify-center'}
                    ${isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-100'}
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  onClick={(e) => item.disabled && e.preventDefault()}
                >
                  <item.icon size={20} strokeWidth={1.5} />
                  {expanded && (
                    <span className={`ml-3 font-medium`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Configuración en la parte inferior */}
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <Link
          to="/configuracion"
          className={`
            flex items-center py-3 px-4 rounded-xl transition-all duration-200
            ${expanded ? '' : 'justify-center'}
            text-gray-600 hover:bg-gray-100
          `}
        >
          <Settings size={20} strokeWidth={1.5} />
          {expanded && (
            <span className="ml-3 font-medium">Configuración</span>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
