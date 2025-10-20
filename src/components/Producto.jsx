import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import {
  buscarProductoPorId,
  obtenerProductosRelacionados,
} from "../utils/productUtils";
import { useCart } from "../utils/cartUtils";

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad] = useState(1);

  useEffect(() => {
    const productoEncontrado = buscarProductoPorId(id);
    setProducto(productoEncontrado);
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

  if (!producto) {
    return (
      <Layout>
        <div className="container product-loading">
          <h2>Cargando producto...</h2>
        </div>
      </Layout>
    );
  }

  const productosRelacionados = obtenerProductosRelacionados(producto.id, producto.genero);

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
                <p className="mb-3">
                  <strong className="product-description">Descripción:</strong>{" "}
                  <span className="product-description-value">{producto.descripcion}</span>
                </p>
                <p className="mb-4">
                  <strong className="product-price-label">Precio:</strong>{" "}
                  <span className="h3 product-price">
                    {producto.precio}
                  </span>
                </p>
              </div>

              {/* Reproductor de audio */}
              <div className="audio-preview-section">
                <div className="audio-preview-label">
                  <i className="fa fa-music" /> Vista previa:
                </div>
                <audio controls className="w-100 audio-preview-player">
                  <source src={producto.fuente} type="audio/mpeg" />
                  <track kind="captions" srcLang="es" label="Spanish" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
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
                            <strong>{beat.precio}</strong>
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
