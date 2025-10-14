import React, { useEffect, useState } from "react";
import { inicializarPrecarga } from "../utilidades/interfaz";

export default function Producto() {
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
      </header>
      <section className="product-detail-section spad">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 mb-4 mb-md-0">
              <img src="img/16.jpg" alt="Álbum Jazz Clásico" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-7">
              <h2>La melodia de Lampa</h2>
              <p className="mb-2">
                <strong>Artista:</strong> Ismael Rivas
              </p>
              <p className="mb-2">
                <strong>Género:</strong> Electrónica
              </p>
              <p className="mb-2">
                <strong>Descripción:</strong> Disfruta de un clásico de la Electrónica en este beat exclusivo, ideal para ambientar cualquier momento.
              </p>
              <p className="mb-3">
                <strong>Precio:</strong> <span className="h4 text-success">$250.000</span>
              </p>
              <audio controls className="w-100 mb-3">
                <source src="audio/1.mp3" type="audio/mpeg" />
              </audio>
              <a href="carrito.html" className="site-btn">
                <i className="fa fa-shopping-cart" /> Agregar al carrito
              </a>
            </div>
          </div>
        </div>
      </section>
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
