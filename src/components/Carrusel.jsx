import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { datosSlides } from "../utils/datosMusica";
import { carruselSettings, resolveImg, handleImageError } from "../utils/carruselUtils";

export default function Carrusel() {
  return (
    <section className="hero-section">
      <Slider className="hero-slider" {...carruselSettings}>
        {datosSlides.map((slide) => (
          <div className="hs-item" key={slide.id || slide.imagen}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="hs-text">
                    <h2>
                      {slide.prefijoTitulo && <span>{slide.prefijoTitulo}</span>}
                      {slide.sufijoTitulo && ` ${slide.sufijoTitulo}`}
                    </h2>
                    {slide.texto && <p>{slide.texto}</p>}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="hr-img">
                    <img
                      src={resolveImg(slide.imagen)}
                      alt={slide.alt || "Slide"}
                      className="hero-img"
                      onError={(e) => handleImageError(e, slide)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
