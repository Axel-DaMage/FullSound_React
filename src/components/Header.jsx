import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ activeItem = "" }) {
  const [mobileActive, setMobileActive] = useState(false);
  
  const toggleMobile = () => setMobileActive((v) => !v);

  return (
    <header className="header-section clearfix">
      <Link to="/" className="site-logo">
        <div className="logo-text">FullSound</div>
      </Link>
      <div className="header-right">
        <div className="user-panel">
          <Link to="/login" className="login">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="register">
            Crear una cuenta
          </Link>
        </div>
      </div>
      <ul className="main-menu">
        <li>
          <Link to="/" className={activeItem === "inicio" ? "active" : ""}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/beats" className={activeItem === "beats" ? "active" : ""}>
            Beats
          </Link>
        </li>
        <li>
          <Link to="/carrito" className={activeItem === "carrito" ? "active" : ""}>
            Carrito
          </Link>
        </li>
        <li>
          <Link to="/admin" className={activeItem === "administracion" ? "active" : ""}>
            Administracion
          </Link>
        </li>
      </ul>
      <button className="mobile-menu-btn" onClick={toggleMobile}>
        <span />
        <span />
        <span />
      </button>
      <div className={`mobile-menu${mobileActive ? " active" : ""}`}>
        <Link to="/">Inicio</Link>
        <Link to="/beats">Beats</Link>
        <Link to="/carrito">Carrito</Link>
        <Link to="/admin">Administracion</Link>
      </div>
    </header>
  );
}
