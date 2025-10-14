import React, { useEffect, useState } from "react";
import { inicializarPrecarga } from "../utilidades/interfaz";

export default function Creditos() {
  const [showPreloader, setShowPreloader] = useState(true);
  
  useEffect(() => {
    return inicializarPrecarga(setShowPreloader);
  }, []);

  return (
    <div>
      {showPreloader && (
        <div id="preloder">
          <div className="loader" />
        </div>
      )}
      <header className="header-section clearfix">
        <a href="index.html" className="site-logo">
          <div className="logo-text">FullSound</div>
        </a>
        <div className="header-right">
          <div className="user-panel">
            <a href="Sesion.html" className="login">Iniciar sesión</a>
            <a href="registro.html" className="register">Crear una cuenta</a>
          </div>
        </div>
        <ul className="main-menu">
          <li><a href="index.html">Inicio</a></li>
          <li><a href="Beats.html">Beats</a></li>
          <li><a href="carrito.html">Carrito</a></li>
          <li><a href="admin.html">Administracion</a></li>
        </ul>
        <button className="mobile-menu-btn">
          <span />
          <span />
          <span />
        </button>
        <div className="mobile-menu">
          <a href="index.html">Inicio</a>
          <a href="Beats.html">Beats</a>
          <a href="carrito.html">Carrito</a>
          <a href="admin.html">Administracion</a>
        </div>
      </header>
      <div className="credits-container">
        <h1 className="credits-title">Créditos</h1>
        <ul className="credits-list">
          <li>
            <strong>Proyecto:</strong> FullSound - Plataforma de Música
          </li>
          <li>
            <strong>Plantilla base:</strong>{" "}
            <a href="https://colorlib.com" target="_blank" rel="noreferrer">
              Colorlib
            </a>{" "}
            (SolMusic Template)
          </li>
          <li>
            <strong>Imágenes:</strong>{" "}
            <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
              Unsplash
            </a>{" "}
            y recursos libres
          </li>
          <li>
            <strong>Iconos:</strong>{" "}
            <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">
              FontAwesome
            </a>
          </li>
          <li>
            <strong>Audio:</strong> Archivos demo libres de derechos
          </li>
          <li>
            <strong>Frameworks:</strong> Bootstrap, jQuery, Owl Carousel
          </li>
          <li>
            <strong>Fuentes:</strong>{" "}
            <a
              href="https://fonts.google.com/specimen/Oxanium"
              target="_blank"
              rel="noreferrer"
            >
              Oxanium
            </a>{" "}
            (Google Fonts)
          </li>
          <li>
            <strong>Desarrollo:</strong> Axel Moraga y Luis Salazar
          </li>
        </ul>
      </div>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-text">
            <a href="creditos.html"> Creditos </a>
          </div>
          <div className="logo-text">FullSound</div>
          <div className="copyright">
            Copyright &copy;{new Date().getFullYear()} Todos los derechos
            reservados | Esta plantilla fue creada con <i className="fa fa-heart-o" aria-hidden="true" /> por
            <a href="https://colorlib.com" target="_blank" rel="noreferrer"> Colorlib</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
