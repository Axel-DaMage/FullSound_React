import React, { useEffect, useState } from "react";
import { inicializarPrecarga } from "../utils/ui";

export default function Carrito() {
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
      <section className="cart-section spad">
        <div className="container">
          <h2 className="mb-4 text-white text-center">Carrito de Compras</h2>
          <div className="table-responsive mb-5">
            <table className="table table-bordered table-cart" id="cart-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      src="img/15.jpg"
                      alt="Producto 1"
                      style={{ width: 60, height: 60, objectFit: "cover", marginRight: 10 }}
                    />
                    <span>Álbum Jazz Clásico</span>
                  </td>
                  <td>$120.00</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="img/14.jpg"
                      alt="Producto 2"
                      style={{ width: 60, height: 60, objectFit: "cover", marginRight: 10 }}
                    />
                    <span>Single Electrónico</span>
                  </td>
                  <td>$30.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="cart-summary p-4 rounded">
                <h4>Resumen</h4>
                <p>
                  Subtotal: <span className="float-right">$150.00</span>
                </p>
                <p>
                  Envío: <span className="float-right">$0.00</span>
                </p>
                <hr />
                <h5>
                  Total: <span className="float-right">$150.00</span>
                </h5>
                <div className="text-center mt-4">
                  <a href="#" className="site-btn">
                    Finalizar compra
                  </a>
                </div>
              </div>
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
