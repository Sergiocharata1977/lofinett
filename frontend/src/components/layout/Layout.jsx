import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Esta función será pasada al Sidebar para que pueda comunicar su estado
  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar onToggle={handleSidebarToggle} />
      
      {/* Contenido principal */}
      <main 
        className={`flex-1 flex flex-col p-6 transition-all duration-300 overflow-auto ${
          sidebarExpanded ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="w-full flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
