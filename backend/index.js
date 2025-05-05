const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API del Sistema de Créditos funcionando correctamente');
});

// Importar rutas
const clientesRoutes = require('./routes/clientes');
const operacionesRoutes = require('./routes/operaciones');

// Usar rutas
app.use('/api/clientes', clientesRoutes);
app.use('/api/operaciones', operacionesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
