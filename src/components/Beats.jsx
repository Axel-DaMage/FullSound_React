import { Link } from "react-router-dom";
import { datosBeats, generosBeats } from "../utils/datosMusica";
import Layout from "./Layout";

import React, { useState } from "react";
import { useCart } from "../utils/cartUtils";

export default function Beats() {
  const [categoria, setCategoria] = useState("Todos");
  const { addItem, items: cartItems } = useCart();

  const beatsFiltrados = categoria === "Todos"
    ? datosBeats
    : datosBeats.filter(beat => beat.genero === categoria);

  return (
    <Layout activeItem="beats">
      <section className="shop-section spad">
        <div className="container">
          <h2 className="mb-5 text-center">Tienda de Beats</h2>
          <div className="mb-4 d-flex justify-content-center">
            <select
              className="site-btn"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
              style={{ minWidth: 220, padding: '16px 20px', fontSize: 16, border: 'none', borderRadius: 50, cursor: 'pointer', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}
            >
              <option value="Todos">Todos los géneros</option>
              {generosBeats.map((gen) => (
                <option key={gen} value={gen}>{gen}</option>
              ))}
            </select>
          </div>
          <div className="row">
            {beatsFiltrados.map((beat, idx) => {
              const inCart = cartItems.some(item => item.id === beat.id);
              return (
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
                        <div className="card-button d-grid gap-2">
                          <button
                            type="button"
                            className="site-btn"
                            onClick={() => {
                              if (!inCart) {
                                addItem(beat, 1);
                                try { if (window?.navigator?.vibrate) navigator.vibrate(30); } catch {}
                              }
                            }}
                            disabled={inCart}
                          >
                            <i className="fa fa-cart-plus" /> {inCart ? "Agregado" : "Agregar al carrito"}
                          </button>
                          <Link to={beat.enlaceProducto || "/carrito"} className="site-btn sb-c2">
                            {beat.enlaceProducto ? 'Ver producto' : 'Ir al carrito'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
