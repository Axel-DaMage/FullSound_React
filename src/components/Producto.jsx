import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useCart } from "../utils/cartUtils";
import { obtenerBeatPorId, obtenerBeats } from "../services/beatsService";
import WaveformPlayer from "./WaveformPlayer";

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [cantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProducto() {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener el beat específico desde la base de datos
        const { data: beatData } = await obtenerBeatPorId(id);
        setProducto(beatData);
        
        // Obtener todos los beats para filtrar los relacionados
        const { data: todosBeats } = await obtenerBeats();
        const relacionados = todosBeats
          .filter((beat) => beat.id !== beatData.id && beat.genero === beatData.genero)
          .slice(0, 3);
        setProductosRelacionados(relacionados);
      } catch (err) {
        console.error('[ERROR] No se pudo cargar el producto:', err);
        setError('No se pudo cargar el producto. Verifica que el backend esté ejecutándose.');
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      cargarProducto();
    }
  }, [id]);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(producto, cantidad);
    // Feedback silencioso; el contador del carrito en el header refleja la acción
  };

  const handleBuyNow = () => {
    navigate('/carrito');
  };

  // Cantidad fija en 1 (sin selector, acorde al proyecto)

  if (loading) {
    return (
      <Layout>
        <div className="container product-loading text-center py-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando producto...</span>
          </div>
          <p className="mt-3">Cargando producto desde la base de datos...</p>
        </div>
      </Layout>
    );
  }

  if (error || !producto) {
    return (
      <Layout>
        <div className="container py-5">
          <div className="alert alert-danger text-center" role="alert">
            <h4 className="alert-heading">Error al cargar el producto</h4>
            <p>{error || 'Producto no encontrado'}</p>
            <hr />
            <Link to="/beats" className="btn btn-primary">
              Volver a Beats
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="beats">
      <section className="product-detail-section">
        <div className="container">
          {/* Breadcrumb */}
          <div className="row mb-4">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb product-breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/" className="breadcrumb-link">
                      <i className="fa fa-home" /> Inicio
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/beats" className="breadcrumb-link">Beats</Link>
                  </li>
                  <li className="breadcrumb-item active breadcrumb-current" aria-current="page">
                    {producto.titulo}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Producto Detail */}
          <div className="row align-items-center">
            {/* Imagen del producto */}
            <div className="col-md-5 mb-4 mb-md-0">
              <div className="product-image-wrapper">
                <img 
                  src={producto.imagen} 
                  alt={producto.titulo} 
                  className="img-fluid rounded shadow-lg" 
                />
              </div>
            </div>

            {/* Información del producto */}
            <div className="col-md-7">
              <h2 className="mb-3 product-title">
                {producto.titulo}
              </h2>
              
              <div className="product-info mb-3">
                <p className="mb-2">
                  <strong className="product-artist">Artista:</strong>{" "}
                  <span className="product-artist-value">{producto.artista}</span>
                </p>
                <p className="mb-2">
                  <strong className="product-genre">Género:</strong>{" "}
                  <span className="product-genre-badge">
                    {producto.genero}
                  </span>
                </p>
                {producto.emocion && (
                  <p className="mb-2">
                    <strong className="product-emotion">Emoción:</strong>{" "}
                    <span className="product-emotion-badge">
                      {producto.emocion}
                    </span>
                  </p>
                )}
                <p className="mb-3">
                  <strong className="product-description">Descripción:</strong>{" "}
                  <span className="product-description-value">{producto.descripcion}</span>
                </p>
                <p className="mb-4">
                  <strong className="product-price-label">Precio:</strong>{" "}
                  <span className="h3 product-price">
                    ${Number(producto.precioNumerico || producto.precio).toLocaleString('es-CL')}
                  </span>
                </p>
              </div>

              {/* Reproductor de audio */}
              <div className="audio-preview-section">
                <div className="audio-preview-label mb-2">
                  <i className="fa fa-music" /> Vista previa:
                </div>
                <WaveformPlayer 
                  audioUrl={producto.fuente}
                  height={100}
                  waveColor="#00bcd4"
                  progressColor="#0097a7"
                />
              </div>

              {/* Sin selector de cantidad; por defecto 1 */}

              {/* Botones de acción */}
              <div className="product-actions">
                <button 
                  onClick={handleAddToCart}
                  className="site-btn btn-add-to-cart"
                >
                  <i className="fa fa-shopping-cart" /> Agregar al carrito
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="site-btn btn-buy-now"
                >
                  <i className="fa fa-credit-card" /> Comprar ahora
                </button>
              </div>

              {/* Volver a Beats */}
              <div className="mt-4">
                <Link 
                  to="/beats" 
                  className="back-to-beats-link"
                >
                  <i className="fa fa-arrow-left" /> Volver a Beats
                </Link>
              </div>
            </div>
          </div>

          {/* Productos relacionados */}
          {productosRelacionados.length > 0 && (
            <div className="row related-products-section">
              <div className="col-12">
                <h3 className="related-products-title">
                  Productos relacionados
                </h3>
                <div className="row">
                  {productosRelacionados.map(beat => (
                    <div key={beat.id} className="col-md-4 mb-4">
                      <div className="card related-product-card">
                        <img src={beat.imagen} className="card-img-top" alt={beat.titulo} />
                        <div className="card-body">
                          <h5 className="card-title related-product-title">{beat.titulo}</h5>
                          <p className="card-text related-product-artist">{beat.artista}</p>
                          <p className="card-text related-product-price">
                            <strong>${Number(beat.precioNumerico || beat.precio).toLocaleString('es-CL')}</strong>
                          </p>
                          <Link 
                            to={`/producto/${beat.id}`} 
                            className="site-btn btn-sm"
                          >
                            Ver producto
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
