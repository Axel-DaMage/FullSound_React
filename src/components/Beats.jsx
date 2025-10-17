import React from "react";
import { Link } from "react-router-dom";
import { datosBeats } from "../utils/datosMusica";
import Layout from "./Layout";

export default function Beats() {
  return (
    <Layout activeItem="beats">
      <section className="shop-section spad"><div className="container">
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
                      </div>                      <div className="card-button">
                        {beat.enlaceProducto ? (
                          <Link to={beat.enlaceProducto} className="site-btn btn-block mt-auto">
                            <i className="fa fa-shopping-cart" /> Comprar
                          </Link>
                        ) : (
                          <Link to="/carrito" className="site-btn btn-block mt-auto">
                            <i className="fa fa-shopping-cart" /> Comprar
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>            ))}
          </div>        </div>
      </section>
    </Layout>
  );
}
