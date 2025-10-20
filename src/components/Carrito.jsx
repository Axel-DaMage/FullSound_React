import React from "react";
import Layout from "./Layout";
import img15 from "../assets/img/15.jpg";
import img14 from "../assets/img/14.jpg";

export default function Carrito() {
  return (
    <Layout activeItem="carrito">
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
              </thead>              <tbody>
                <tr>
                  <td>
                    <img
                      src={img15}
                      alt="Producto 1"
                      className="cart-product-img"
                    />
                    <span>Álbum Jazz Clásico</span>
                  </td>
                  <td>$120.00</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src={img14}
                      alt="Producto 2"
                      className="cart-product-img"
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
                  <button className="site-btn">
                    Finalizar compra
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
