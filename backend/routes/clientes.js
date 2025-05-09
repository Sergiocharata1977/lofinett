const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rutas para clientes
router.get('/', clientesController.getAllClientes);
router.get('/:id', clientesController.getClienteById);
router.post('/', clientesController.createCliente);
router.put('/:id', clientesController.updateCliente);
router.delete('/:id', clientesController.deleteCliente);

module.exports = router;
