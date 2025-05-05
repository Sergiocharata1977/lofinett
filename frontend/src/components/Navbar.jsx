import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Sistema de Créditos
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Inicio
              </Link>
              <Link
                to="/clientes"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Clientes
              </Link>
              <Link
                to="/operaciones"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Operaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
