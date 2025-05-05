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
import ClienteDetalle from './pages/clientes/ClienteDetalle'

// Importar páginas de operaciones
import OperacionesList from './pages/operaciones/OperacionesList'
import OperacionForm from './pages/operaciones/OperacionForm'
import OperacionDetalle from './pages/operaciones/OperacionDetalle'

// Importar páginas de cobranzas (antes pagos)
import PagosList from './pages/pagos/PagosList'
import PagoForm from './pages/pagos/PagoForm'
import PagoDetalle from './pages/pagos/PagoDetalle'

// Importar páginas de documentos
import DocumentosList from './pages/documentos/DocumentosList'

// Importar páginas de análisis de riesgo
import AnalisisList from './pages/analisis/AnalisisList'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Rutas para el módulo de Clientes */}
          <Route path="clientes" element={<ClientesList />} />
          <Route path="clientes/nuevo" element={<ClienteForm />} />
          <Route path="clientes/editar/:id" element={<ClienteForm />} />
          <Route path="clientes/:id" element={<ClienteDetalle />} />
          
          {/* Rutas para el módulo de Operaciones */}
          <Route path="operaciones" element={<OperacionesList />} />
          <Route path="operaciones/nuevo" element={<OperacionForm />} />
          <Route path="operaciones/editar/:id" element={<OperacionForm />} />
          <Route path="operaciones/:id" element={<OperacionDetalle />} />
          
          {/* Rutas para el módulo de Cobranzas */}
          <Route path="cobranzas" element={<PagosList />} />
          <Route path="cobranzas/nuevo" element={<PagoForm />} />
          <Route path="cobranzas/editar/:id" element={<PagoForm />} />
          <Route path="cobranzas/:id" element={<PagoDetalle />} />
          
          {/* Rutas para el módulo de Documentos de Clientes */}
          <Route path="documentos" element={<DocumentosList />} />
          <Route path="documentos/cliente/:clienteId" element={<DocumentosList />} />
          
          {/* Rutas para el módulo de Análisis de Riesgo */}
          <Route path="analisis" element={<AnalisisList />} />
          <Route path="analisis/cliente/:clienteId" element={<AnalisisList />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
