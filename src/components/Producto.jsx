import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

export default function Producto() {
  return (
    <Layout>
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
              </p>              <audio controls className="w-100 mb-3">
                <source src="audio/1.mp3" type="audio/mpeg" />
              </audio>
              <Link to="/carrito" className="site-btn">
                <i className="fa fa-shopping-cart" /> Agregar al carrito
              </Link></div>
          </div>        </div>
      </section>
    </Layout>
  );
}
