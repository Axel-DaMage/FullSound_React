import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { datosSlides } from "../datos/datosMusica";

export default function Carrusel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const resolveImg = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    if (typeof img === "object" && "default" in img) return img.default;
    return String(img);
  };

  return (
    <div className="mi-carrusel">
      <Slider {...settings}>
        {datosSlides.map((slide, index) => (
          <div key={index} style={{ padding: 8 }}>
            <img
              src={resolveImg(slide.imagen)}
              alt={slide.alt || `slide-${index}`}
              style={{
                width: "100%",
                maxHeight: 500,
                objectFit: "cover",
                borderRadius: 8,
              }}
              onError={(e) => {
                console.error("Error cargando imagen del slide:", slide, e);
                e.currentTarget.style.opacity = 0.35;
              }}
            />
            <div style={{ padding: "8px 0" }}>
              <h3 style={{ margin: 0 }}>
                {slide.prefijoTitulo ?? ""} {slide.sufijoTitulo ?? ""}
              </h3>
              {slide.texto && <p style={{ margin: "6px 0 0" }}>{slide.texto}</p>}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
