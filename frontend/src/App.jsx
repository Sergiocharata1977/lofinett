import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Importar componente de Layout
import Layout from './components/layout/Layout'

// Importar páginas
import Home from './pages/Home'

// Importar páginas de clientes
import ClientesList from './pages/clientes/ClientesList'
import ClienteForm from './pages/clientes/ClienteForm'

// Importar páginas de operaciones
import OperacionesList from './pages/operaciones/OperacionesList'
import OperacionForm from './pages/operaciones/OperacionForm'

// Importar páginas de pagos
import PagosList from './pages/pagos/PagosList'
import PagoForm from './pages/pagos/PagoForm'
import PagoDetalle from './pages/pagos/PagoDetalle'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="clientes" element={<ClientesList />} />
          <Route path="clientes/nuevo" element={<ClienteForm />} />
          <Route path="clientes/editar/:id" element={<ClienteForm />} />
          <Route path="operaciones" element={<OperacionesList />} />
          <Route path="operaciones/nuevo" element={<OperacionForm />} />
          <Route path="operaciones/editar/:id" element={<OperacionForm />} />
          {/* Rutas para el módulo de Pagos */}
          <Route path="pagos" element={<PagosList />} />
          <Route path="pagos/nuevo" element={<PagoForm />} />
          <Route path="pagos/editar/:id" element={<PagoForm />} />
          <Route path="pagos/:id" element={<PagoDetalle />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
