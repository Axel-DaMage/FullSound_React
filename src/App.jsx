import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Inicio from './components/Inicio'
import Beats from './components/Beats'
import Carrito from './components/Carrito'
import Administracion from './components/Administracion'
import Login from './components/Login'
import Registro from './components/Registro'
import Producto from './components/Producto'
import Creditos from './components/Creditos'
import Main from './components/Main'
import Preloader from './components/Preloader'
import Terminos from './components/Terminos'

function App() {
  return (
    <>
      <Preloader />
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/beats" element={<Beats />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<Administracion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/creditos" element={<Creditos />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
