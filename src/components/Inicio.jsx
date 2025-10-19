import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import imgConcept1 from "../assets/img/concept/1.jpg";
import imgConcept2 from "../assets/img/concept/2.jpg";
import imgConcept3 from "../assets/img/concept/3.jpg";
import imgConcept4 from "../assets/img/concept/4.jpg";
import Carrusel from "./Carrusel";

export default function Inicio() {
  return (
    <Layout activeItem="inicio">
      <Carrusel />
      <section className="intro-section spad">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Acceso ilimitado a 100,000 pistas</h2>
              </div>
            </div>
            <div className="col-lg-8 intro-texto">
              <p>
                Fullsound es una plataforma creada para unir a beatmakers y
                artistas en un mismo espacio. Aquí podrás encontrar beats de
                distintos estilos y géneros, ya sea de forma gratuita o mediante
                licencias de pago, listos para dar vida a tus proyectos
                musicales. Nuestro objetivo es ayudarte a compartir, descubrir y
                crear música desde cero, conectando el talento de los
                productores con las voces y la creatividad de los artistas.
              </p>
              <Link to="/registro" className="site-btn">
                Comienza registrandote!
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="how-section spad set-bg">
        <div className="container text-white">
          <div className="section-title">
            <h2>¿Cómo funciona?</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="how-item">
                <div className="hi-icon" />
                <h4>Crea una cuenta</h4>
                <p>
                 Regístrate gratis y comienza a disfrutar de todas las
                  funciones de FullSound. Comparte tu música y conecta con otros
                  artistas.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="how-item">
                <div className="hi-icon" />
                <h4>Elige un plan</h4>
                <p>
                  Selecciona el plan que mejor se adapte a ti. Accede a
                  funciones premium y disfruta de la mejor calidad de audio.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="how-item">
                <div className="hi-icon" />
                <h4>Descarga música</h4>
                <p>
                  Descarga tus canciones favoritas y escúchalas donde quieras,
                  incluso sin conexión a internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="concept-section spad">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Nuestro concepto y artistas</h2>
              </div>
            </div>
            <div className="col-lg-8 concepto-texto">
              <p>
                SolMusic es una plataforma dedicada a la música y a los artistas.
                Descubre nuevos talentos, géneros y vive la experiencia musical
                al máximo.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="concept-item">
                <img src={imgConcept1} alt="Musica" />
                <h5>Música Soul</h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="concept-item">
                <img src={imgConcept2} alt="Musica" />
                <h5>Conciertos en vivo</h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="concept-item">
                <img src={imgConcept3} alt="Musica" />
                <h5>Sets de DJ</h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="concept-item">
                <img src={imgConcept4} alt="Musica" />
                <h5>Transmisiones en vivo</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
