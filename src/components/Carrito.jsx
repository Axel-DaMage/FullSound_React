import React from "react";
import Layout from "./Layout";
import { useCart } from "../utils/cartUtils";
import { resolveAsset } from "../utils/ui";

export default function Carrito() {
  const { items, removeItem, updateQuantity, total } = useCart();

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
                        <img src={resolveAsset?.(it.imagen) || it.imagen} alt={it.titulo} className="cart-product-img" />
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
                  <button className="site-btn">Finalizar compra</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
