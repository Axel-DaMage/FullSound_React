import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { menuItems, getMenuItemClass } from "../utils/headerUtils";
import { 
  obtenerUsuarioActual, 
  estaAutenticado, 
  limpiarUsuario,
  esAdmin 
} from "../utils/rolesPermisos";
import { useCart } from "../utils/cartUtils";

export default function Header({ activeItem = "" }) {
  const [mobileActive, setMobileActive] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const { items } = useCart();
  
  const toggleMobile = () => setMobileActive((v) => !v);

  useEffect(() => {
    // Verificar si hay un usuario autenticado al cargar el header
    if (estaAutenticado()) {
      setUsuario(obtenerUsuarioActual());
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    limpiarUsuario();
    setUsuario(null);
    alert('Sesión cerrada exitosamente');
    navigate('/');
  };

  return (
    <header className="header-section clearfix">
      <Link to="/" className="site-logo">
        <div className="logo-text">FullSound</div>
      </Link>
      <div className="header-right">
        <div className="user-panel">
          {usuario ? (
            <>
              <div className="user-info" style={{ display: 'inline-block', marginRight: '15px', color: '#fff' }}>
                <i className="fa fa-user mr-2"></i>
                <span>{usuario.nombre || usuario.correo.split('@')[0]}</span>
                {esAdmin(usuario) && (
                  <span className="badge badge-success ml-2">Admin</span>
                )}
              </div>
              <a href="#" onClick={handleLogout} className="login">
                <i className="fa fa-sign-out mr-1"></i>
                Cerrar sesión
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="login">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="register">
                Crear una cuenta
              </Link>
            </>
          )}
        </div>
        <Link to="/carrito" className="login" style={{ position: 'relative', marginLeft: 12 }}>
          <i className="fa fa-shopping-cart"></i>
          <span className="cart-badge" style={{
            position: 'absolute', top: -4, right: -10, background: 'var(--highlight)', color: 'var(--bg)',
            borderRadius: 12, fontSize: 12, lineHeight: '16px', padding: '0 6px', minWidth: 18, textAlign: 'center'
          }}>
            {items.reduce((acc, it) => acc + (it.cantidad || 0), 0)}
          </span>
        </Link>
      </div>
      <ul className="main-menu">
        {menuItems.map((item) => {
          // Ocultar "Administración" si no es admin
          if (item.key === 'administracion' && (!usuario || !esAdmin(usuario))) {
            return null;
          }
          
          return (
            <li key={item.key}>
              <Link to={item.path} className={getMenuItemClass(item.key, activeItem)}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <button className="mobile-menu-btn" onClick={toggleMobile}>
        <span />
        <span />
        <span />
      </button>      <div className={`mobile-menu${mobileActive ? " active" : ""}`}>
        {menuItems.map((item) => {
          // Ocultar "Administración" si no es admin
          if (item.key === 'administracion' && (!usuario || !esAdmin(usuario))) {
            return null;
          }
          
          return (
            <Link key={item.key} to={item.path}>
              {item.label}
            </Link>
          );
        })}
        {usuario ? (
          <a href="#" onClick={handleLogout} style={{ color: '#ff4444' }}>
            <i className="fa fa-sign-out mr-1"></i> Cerrar sesión
          </a>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/registro" className="register">
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  activeItem: PropTypes.string
};

Header.defaultProps = {
  activeItem: ""
};
