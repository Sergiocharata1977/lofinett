const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Sistema de Gestión de Créditos</p>
      </div>
    </footer>
  );
};

export default Footer;
