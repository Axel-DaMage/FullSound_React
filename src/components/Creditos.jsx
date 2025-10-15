import React from "react";
import Layout from "./Layout";

export default function Creditos() {
  return (
    <Layout>
      <div className="credits-container">
        <h1 className="credits-title">Créditos</h1>
        <ul className="credits-list">
          <li>
            <strong>Proyecto:</strong> FullSound - Plataforma de Música
          </li>
          <li>
            <strong>Plantilla base:</strong>{" "}
            <a href="https://colorlib.com" target="_blank" rel="noreferrer">
              Colorlib
            </a>{" "}
            (SolMusic Template)
          </li>
          <li>
            <strong>Imágenes:</strong>{" "}
            <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
              Unsplash
            </a>{" "}
            y recursos libres
          </li>
          <li>
            <strong>Iconos:</strong>{" "}
            <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">
              FontAwesome
            </a>
          </li>
          <li>
            <strong>Audio:</strong> Archivos demo libres de derechos
          </li>
          <li>
            <strong>Frameworks:</strong> Bootstrap, jQuery, Owl Carousel
          </li>
          <li>
            <strong>Fuentes:</strong>{" "}
            <a
              href="https://fonts.google.com/specimen/Oxanium"
              target="_blank"
              rel="noreferrer"
            >
              Oxanium
            </a>{" "}
            (Google Fonts)
          </li>          <li>
            <strong>Desarrollo:</strong> Axel Moraga y Luis Salazar
          </li>        </ul>
      </div>
    </Layout>
  );
}
