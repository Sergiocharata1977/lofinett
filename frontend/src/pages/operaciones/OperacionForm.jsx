import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../../components/ui/FormField';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import CalculadoraCuotas from '../../components/operaciones/CalculadoraCuotas';
import DetalleCuotas from '../../components/operaciones/DetalleCuotas';
import { getTasaForCuotas } from '../../services/configuracionService';

const OperacionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    clienteId: '',
    monto: '',
    cuotas: '12',
    interesMensual: '',
    gastosAdicionales: '0',
    fechaInicio: new Date().toISOString().split('T')[0]
  });
  
  // Estado para clientes disponibles
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculando, setCalculando] = useState(false);
  const [error, setError] = useState(null);
  
  // Resultados del cálculo
  const [resultados, setResultados] = useState({
    valorCuota: 0,
    montoTotal: 0,
    detalleCuotas: []
  });

  // Cargar clientes disponibles
  useEffect(() => {
    // En un escenario real, aquí se cargarían datos desde la API
    // Ejemplo: fetch('/api/clientes').then(...)
    
    // Simulamos la carga de clientes
    const clientesDummy = [
      { id: 1, nombre: 'Juan Pérez', documento: '12345678', limiteCredito: 100000, creditoDisponible: 85000 },
      { id: 2, nombre: 'María González', documento: '87654321', limiteCredito: 150000, creditoDisponible: 150000 },
      { id: 3, nombre: 'Carlos Rodríguez', documento: '23456789', limiteCredito: 200000, creditoDisponible: 120000 }
    ];
    
    setClientes(clientesDummy);
  }, []);

  // Cargar datos de la operación en caso de edición
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      // En un escenario real, aquí se cargarían datos desde la API
      // Ejemplo: fetch(`/api/operaciones/${id}`).then(...)
      
      setTimeout(() => {
        // Simulamos la carga de datos para el ID 1
        if (id === '1') {
          setFormData({
            clienteId: '1',
            monto: '50000',
            cuotas: '12',
            interesMensual: '5.2',
            gastosAdicionales: '500',
            fechaInicio: '2025-04-01'
          });
          
          // Calculamos los resultados
          calcularFinanciamiento({
            monto: 50000,
            cuotas: 12,
            interesMensual: 5.2,
            gastosAdicionales: 500
          });
        }
        setLoading(false);
      }, 1000);
    } else {
      // Para nuevas operaciones, establecer la tasa de interés según las cuotas seleccionadas
      const tasaInteres = getTasaForCuotas(parseInt(formData.cuotas));
      setFormData(prevState => ({
        ...prevState,
        interesMensual: tasaInteres.toString()
      }));
    }
  }, [id, isEditing]);

  // Actualizar tasa de interés basada en la cantidad de cuotas
  useEffect(() => {
    if (formData.cuotas) {
      const tasaInteres = getTasaForCuotas(parseInt(formData.cuotas));
      setFormData(prevState => ({
        ...prevState,
        interesMensual: tasaInteres.toString()
      }));
    }
  }, [formData.cuotas]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Calcular financiamiento (sistema francés simplificado)
  const calcularFinanciamiento = (datos) => {
    const { monto, cuotas, interesMensual, gastosAdicionales } = datos;
    
    // Convertir a números
    const montoNum = parseFloat(monto);
    const cuotasNum = parseInt(cuotas);
    const interesNum = parseFloat(interesMensual) / 100; // Convertir porcentaje a decimal
    const gastosNum = parseFloat(gastosAdicionales);
    
    // Validar datos
    if (isNaN(montoNum) || isNaN(cuotasNum) || isNaN(interesNum)) {
      setError('Por favor ingrese valores numéricos válidos');
      return;
    }
    
    // Cálculo simple del sistema francés
    // En un sistema real, habría que usar la fórmula exacta del sistema francés:
    // c = (P * i * (1 + i)^n) / ((1 + i)^n - 1)
    // donde c = valor cuota, P = principal, i = interés, n = número de cuotas
    
    // Cálculo simplificado para prototipo
    const montoConGastos = montoNum + gastosNum;
    const interesTotal = montoConGastos * interesNum * cuotasNum;
    const montoTotal = montoConGastos + interesTotal;
    const valorCuota = montoTotal / cuotasNum;
    
    // Generar detalle de cuotas
    const detalleCuotas = [];
    let fechaVencimiento = new Date(formData.fechaInicio);
    let saldoPendiente = montoTotal;
    
    for (let i = 1; i <= cuotasNum; i++) {
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);
      
      detalleCuotas.push({
        numero: i,
        fechaVencimiento: new Date(fechaVencimiento).toISOString().split('T')[0],
        monto: valorCuota,
        saldoPendiente: saldoPendiente - valorCuota
      });
      
      saldoPendiente -= valorCuota;
    }
    
    // Actualizar resultados
    setResultados({
      valorCuota,
      montoTotal,
      detalleCuotas
    });
  };
  
  // Calcular financiamiento al hacer clic en el botón
  const handleCalcular = () => {
    setError(null);
    setCalculando(true);
    
    // Simulamos un pequeño delay para la calculadora
    setTimeout(() => {
      calcularFinanciamiento({
        monto: formData.monto,
        cuotas: formData.cuotas,
        interesMensual: formData.interesMensual,
        gastosAdicionales: formData.gastosAdicionales
      });
      
      setCalculando(false);
    }, 500);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validaciones básicas
    if (!formData.clienteId || !formData.monto || !formData.cuotas) {
      setError('Todos los campos marcados con * son obligatorios');
      setLoading(false);
      return;
    }

    // En un escenario real, aquí se enviarían los datos a la API
    // con todos los detalles del cálculo
    // Ejemplo: 
    // const dataToSend = {
    //   ...formData,
    //   montoTotal: resultados.montoTotal,
    //   valorCuota: resultados.valorCuota,
    //   detalleCuotas: resultados.detalleCuotas
    // };
    // fetch('/api/operaciones', { 
    //   method: 'POST', 
    //   body: JSON.stringify(dataToSend), 
    //   headers: { 'Content-Type': 'application/json' }
    // })

    // Simulamos un delay para la operación
    setTimeout(() => {
      setLoading(false);
      
      // Redirigir a la lista de operaciones después de guardar
      navigate('/operaciones');
    }, 1500);
  };

  // Buscar cliente seleccionado
  const clienteSeleccionado = clientes.find(c => c.id.toString() === formData.clienteId);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Ver Operación' : 'Nueva Operación de Financiamiento'}
      </h1>

      {loading && isEditing ? (
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
              {/* Información del cliente */}
              <FormField
                label="Cliente"
                id="clienteId"
                name="clienteId"
                required
                disabled={isEditing}
              >
                <select
                  id="clienteId"
                  name="clienteId"
                  value={formData.clienteId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isEditing}
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre} - DNI: {cliente.documento}
                    </option>
                  ))}
                </select>
              </FormField>

              {clienteSeleccionado && (
                <div className="p-3 bg-blue-50 rounded-md flex items-center">
                  <div>
                    <p className="text-sm text-blue-800">
                      <strong>Límite de crédito:</strong> ${clienteSeleccionado.limiteCredito.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Disponible:</strong> ${clienteSeleccionado.creditoDisponible.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Campos del financiamiento */}
              <FormField
                label="Monto a Financiar ($)"
                id="monto"
                name="monto"
                type="number"
                value={formData.monto}
                onChange={handleChange}
                required
                disabled={isEditing}
              />

              <FormField
                label="Cantidad de Cuotas"
                id="cuotas"
                name="cuotas"
                required
                disabled={isEditing}
              >
                <select
                  id="cuotas"
                  name="cuotas"
                  value={formData.cuotas}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isEditing}
                >
                  <option value="3">3 cuotas</option>
                  <option value="6">6 cuotas</option>
                  <option value="12">12 cuotas</option>
                  <option value="18">18 cuotas</option>
                  <option value="24">24 cuotas</option>
                  <option value="36">36 cuotas</option>
                </select>
              </FormField>

              <FormField
                label="Interés Mensual (%)"
                id="interesMensual"
                name="interesMensual"
                type="number"
                value={formData.interesMensual}
                onChange={handleChange}
                step="0.1"
                required
                disabled={true}
                helpText="La tasa de interés se aplica automáticamente según la cantidad de cuotas seleccionada."
              />

              <FormField
                label="Gastos Adicionales ($)"
                id="gastosAdicionales"
                name="gastosAdicionales"
                type="number"
                value={formData.gastosAdicionales}
                onChange={handleChange}
                disabled={isEditing}
              />

              <FormField
                label="Fecha de Inicio"
                id="fechaInicio"
                name="fechaInicio"
                type="date"
                value={formData.fechaInicio}
                onChange={handleChange}
                required
                disabled={isEditing}
              />
            </div>

            {/* Calculadora de cuotas */}
            {!isEditing && (
              <CalculadoraCuotas
                datos={{
                  monto: formData.monto,
                  cuotas: formData.cuotas,
                  interesMensual: formData.interesMensual,
                  gastosAdicionales: formData.gastosAdicionales
                }}
                onCalculate={handleCalcular}
                resultados={resultados}
                isLoading={calculando}
              />
            )}

            {/* Detalle de cuotas */}
            {resultados.montoTotal > 0 && (
              <DetalleCuotas cuotas={resultados.detalleCuotas} maxCuotasVisibles={6} />
            )}

            <div className="mt-8 flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/operaciones')}
              >
                {isEditing ? 'Volver' : 'Cancelar'}
              </Button>
              
              {!isEditing && (
                <Button
                  type="submit"
                  disabled={loading || resultados.montoTotal === 0}
                  variant="primary"
                >
                  {loading ? 'Guardando...' : 'Confirmar Operación'}
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default OperacionForm;
