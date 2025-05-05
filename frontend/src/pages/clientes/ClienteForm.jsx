import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../../components/ui/FormField';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ClienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    email: '',
    limiteCredito: '',
    direccion: '',
    fechaNacimiento: '',
    observaciones: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos del cliente en caso de edición
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      // En un escenario real, aquí se cargarían datos desde la API
      // Ejemplo: fetch(`/api/clientes/${id}`).then(...)
      setTimeout(() => {
        // Simulamos la carga de datos para el ID 1
        if (id === '1') {
          setFormData({
            nombre: 'Juan Pérez',
            documento: '12345678',
            telefono: '11-1234-5678',
            email: 'juan@example.com',
            limiteCredito: '100000',
            direccion: 'Av. Siempreviva 742',
            fechaNacimiento: '1980-05-15',
            observaciones: 'Cliente frecuente'
          });
        }
        setLoading(false);
      }, 1000);
    }
  }, [id, isEditing]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validaciones básicas
    if (!formData.nombre || !formData.documento) {
      setError('El nombre y documento son campos obligatorios');
      setLoading(false);
      return;
    }

    // En un escenario real, aquí se enviarían los datos a la API
    // Ejemplo: 
    // const method = isEditing ? 'PUT' : 'POST';
    // const url = isEditing ? `/api/clientes/${id}` : '/api/clientes';
    // fetch(url, { method, body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } })

    // Simulamos un delay para la operación
    setTimeout(() => {
      setLoading(false);
      
      // Redirigir a la lista de clientes después de guardar
      navigate('/clientes');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
      </h1>

      {loading && !isEditing ? (
        <div className="text-center py-4">Cargando datos...</div>
      ) : (
        <Card>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información básica */}
              <FormField
                label="Nombre Completo"
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              <FormField
                label="Documento/DNI"
                id="documento"
                name="documento"
                type="text"
                value={formData.documento}
                onChange={handleChange}
                required
              />

              <FormField
                label="Teléfono"
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
              />

              <FormField
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <FormField
                label="Fecha de Nacimiento"
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />

              <FormField
                label="Límite de Crédito ($)"
                id="limiteCredito"
                name="limiteCredito"
                type="number"
                value={formData.limiteCredito}
                onChange={handleChange}
              />

              <FormField
                label="Dirección"
                id="direccion"
                name="direccion"
                type="text"
                value={formData.direccion}
                onChange={handleChange}
                className="md:col-span-2"
              />

              <FormField
                label="Observaciones"
                id="observaciones"
                name="observaciones"
                type="textarea"
                value={formData.observaciones}
                onChange={handleChange}
                className="md:col-span-2"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/clientes')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cliente'}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ClienteForm;
