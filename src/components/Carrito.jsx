import React, { useState } from "react";
import Layout from "./Layout";
import { useCart } from "../utils/cartUtils";
import { useNavigate } from "react-router-dom";
import { estaAutenticado } from "../services/authService";
import { descargarLicencia, descargarMP3, vaciarCarrito } from "../services/carritoService";
import { marcarBeatComoVendido } from "../services/beatsService";

export default function Carrito() {
  const { items, removeItem, total } = useCart();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const navigate = useNavigate();

  const finalizarCompra = async () => {
    if (!estaAutenticado()) {
      alert("Debes iniciar sesión para realizar una compra.");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    setProcesando(true);

    try {
      // Procesar cada beat comprado
      for (const item of items) {
        try {
          // 1. Marcar el beat como vendido
          await marcarBeatComoVendido(item.beatId || item.id);
          
          // 2. Descargar la licencia TXT
          descargarLicencia({
            titulo: item.titulo,
            artista: item.artista || 'Artista Desconocido'
          });
          
          // 3. Pequeña pausa para evitar bloqueo del navegador
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // 4. Descargar el archivo MP3
          await descargarMP3({
            titulo: item.titulo,
            audioUrl: item.audioUrl || item.audio || item.fuente
          });
          
          console.log(`✓ Beat "${item.titulo}" procesado correctamente`);
        } catch (error) {
          console.error(`Error procesando el beat "${item.titulo}":`, error);
          // Continuar con los demás beats aunque uno falle
        }
      }

      // Vaciar el carrito
      await vaciarCarrito();
      
      // Mostrar mensaje de éxito
      setMostrarMensaje(true);
      setTimeout(() => {
        setMostrarMensaje(false);
        // Recargar la página para actualizar el carrito
        window.location.reload();
      }, 3000);
      
    } catch (error) {
      console.error('Error durante el proceso de compra:', error);
      alert('Hubo un error al procesar la compra. Por favor, intenta nuevamente.');
    } finally {
      setProcesando(false);
    }
  };

  return (
    <Layout activeItem="carrito">
      <section className="cart-section spad">
        <div className="container">
          <h2 className="mb-4 text-white text-center">Carrito de Compras</h2>
          {items.length === 0 ? (
            <div className="empty-cart">
              <h3>Tu carrito está vacío</h3>
              <p>Agrega algunos beats desde la tienda para verlos aquí.</p>
            </div>
          ) : (
            <div className="table-responsive mb-5">
              <table className="table table-bordered table-cart" id="cart-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    {/* <th className="text-center" style={{width: 140}}>Cantidad</th> */}
                    <th className="text-right" style={{width: 140}}>Precio</th>
                    <th style={{width: 120}}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td>
                        <img src={it.imagen} alt={it.titulo} className="cart-product-img" />
                        <span style={{ marginLeft: 10 }}>{it.titulo}</span>
                      </td>
                      {/* Sin control de cantidad, solo se permite 1 por beat */}
                      <td className="text-right">${ (Number(it.precioNumerico || 0) * Number(it.cantidad || 0)).toLocaleString('es-CL') }</td>
                      <td>
                        <button className="btn-remove" onClick={() => removeItem(it.id)}>Quitar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="cart-summary p-4 rounded">
                <h4>Resumen</h4>
                <p>
                  Subtotal: <span className="float-right">${ total.toLocaleString('es-CL') }</span>
                </p>
                <p>
                  Envío: <span className="float-right">$0</span>
                </p>
                <hr />
                <h5>
                  Total: <span className="float-right">${ total.toLocaleString('es-CL') }</span>
                </h5>
                <div className="d-flex justify-content-center mt-4">
                  <button 
                    className="site-btn" 
                    onClick={finalizarCompra}
                    disabled={procesando}
                  >
                    {procesando ? 'Procesando...' : 'Finalizar compra'}
                  </button>
                </div>
                {mostrarMensaje && (
                  <div className="text-center mt-3">
                    <h4 style={{color: '#00bcd4'}}>¡Compra finalizada!</h4>
                    <p style={{color: '#fff', fontSize: '14px'}}>
                      Tus archivos se están descargando...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
