import { Link } from "react-router-dom";
import Layout from "./Layout";
import React, { useState, useEffect } from "react";
import { useCart } from "../utils/cartUtils";
import { obtenerBeats } from "../services/beatsService";
import WaveformPlayer from "./WaveformPlayer";

export default function Beats() {
  const [categoria, setCategoria] = useState("Todos");
  const [emocionFiltro, setEmocionFiltro] = useState("Todas");
  const [beats, setBeats] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [emociones, setEmociones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem, items: cartItems } = useCart();

  useEffect(() => {
    async function cargarBeats() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await obtenerBeats();
        setBeats(data);
        // Extrae géneros únicos
        setGeneros(Array.from(new Set(data.map(b => b.genero).filter(Boolean))));
        // Extrae emociones únicas
        setEmociones(Array.from(new Set(data.map(b => b.emocion).filter(Boolean))));
      } catch (err) {
        console.error('[ERROR] No se pudieron cargar los beats:', err);
        setError('No se pudo conectar con el servidor. Por favor, verifica que el backend esté ejecutándose.');
      } finally {
        setLoading(false);
      }
    }
    cargarBeats();
  }, []);

  const beatsFiltrados = beats
    .filter(beat => categoria === "Todos" || beat.genero === categoria)
    .filter(beat => emocionFiltro === "Todas" || beat.emocion === emocionFiltro);

  return (
    <Layout activeItem="beats">
      <section className="shop-section spad">
        <div className="container">
          <h2 className="mb-5 text-center">Tienda de Beats</h2>
          
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Cargando beats...</span>
              </div>
              <p className="mt-3">Cargando beats desde la base de datos...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              <h4 className="alert-heading">Error de Conexión</h4>
              <p>{error}</p>
              <hr />
              <p className="mb-0">Por favor, intenta nuevamente más tarde.</p>
            </div>
          )}

          {!loading && !error && beats.length === 0 && (
            <div className="alert alert-info text-center" role="alert">
              <h4 className="alert-heading">No hay beats disponibles</h4>
              <p>Aún no hay beats en la base de datos.</p>
            </div>
          )}

          {!loading && !error && beats.length > 0 && (
            <>
              <div className="mb-4 d-flex justify-content-center gap-3 flex-wrap">
                <select
                  className="site-btn"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                  style={{ minWidth: 220, padding: '16px 20px', fontSize: 16, border: 'none', borderRadius: 50, cursor: 'pointer', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}
                >
                  <option value="Todos">Todos los géneros</option>
                  {generos.map((gen) => (
                    <option key={gen} value={gen}>{gen}</option>
                  ))}
                </select>
                <select
                  className="site-btn"
                  value={emocionFiltro}
                  onChange={e => setEmocionFiltro(e.target.value)}
                  style={{ minWidth: 220, padding: '16px 20px', fontSize: 16, border: 'none', borderRadius: 50, cursor: 'pointer', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}
                >
                  <option value="Todas">Todas las emociones</option>
                  {emociones.map((emo) => (
                    <option key={emo} value={emo}>{emo}</option>
                  ))}
                </select>
              </div>
              <div className="row">
            {beatsFiltrados.map((beat, idx) => {
              const inCart = cartItems.some(item => item.id === beat.id);
              return (
                <div className="col-md-4 mb-4" key={beat.id || idx}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{beat.titulo || beat.nombre}</h5>
                      <div className="card-content">
                        <div className="card-info">
                          <p className="card-text mb-1"><strong>Artista:</strong> {beat.artista}</p>
                          <p className="card-text mb-1"><strong>Género:</strong> {beat.genero}</p>
                          {beat.emocion && <p className="card-text mb-1"><strong>Emoción:</strong> {beat.emocion}</p>}
                          <p className="card-text mb-2"><strong>Precio:</strong> ${Number(beat.precioNumerico || beat.precio).toLocaleString('es-CL')}</p>
                        </div>
                        <div className="card-audio">
                          {beat.fuente || beat.audio ? (
                            <WaveformPlayer 
                              audioUrl={beat.fuente || beat.audio}
                              height={60}
                              waveColor="#00bcd4"
                              progressColor="#0097a7"
                            />
                          ) : null}
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
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
