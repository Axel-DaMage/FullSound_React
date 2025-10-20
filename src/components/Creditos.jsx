import React from "react";
import Layout from "./Layout";

export default function Creditos() {
  return (
    <Layout>
      <section className="credits-section">
        <div className="credits-card">
          <h1>Créditos</h1>
          <ul>
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
            </li>
            <li>
              <strong>Desarrollo:</strong> Axel Moraga, Samuel Canchaya y Luis Salazar
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
