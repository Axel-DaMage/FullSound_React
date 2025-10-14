import React, { useEffect, useState } from "react";
import { inicializarPrecarga } from "../utils/interfaz";
import { datosBeats } from "../datos/datosMusica";

export default function Beats() {
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
      <section className="shop-section spad">        <div className="container">
          <h2 className="mb-5 text-center">Tienda de Beats</h2>
          <div className="row">
            {datosBeats.map((beat, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{beat.titulo}</h5>
                    <div className="card-content">
                      <div className="card-info">
                        <p className="card-text mb-1"><strong>Artista:</strong> {beat.artista}</p>
                        <p className="card-text mb-1"><strong>Género:</strong> {beat.genero}</p>
                        <p className="card-text mb-2"><strong>Precio:</strong> {beat.precio}</p>
                      </div>
                      <div className="card-audio">
                        <audio controls className="w-100 mb-2">
                          <source src={beat.fuente} type="audio/mpeg" />
                        </audio>
                      </div>
                      <div className="card-button">
                        {beat.enlaceProducto ? (
                          <a href={beat.enlaceProducto} className="site-btn btn-block mt-auto">
                            <i className="fa fa-shopping-cart" /> Comprar
                          </a>
                        ) : (
                          <a href="#" className="site-btn btn-block mt-auto">
                            <i className="fa fa-shopping-cart" /> Comprar
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
