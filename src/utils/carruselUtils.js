/**
 * Utilidades para el componente Carrusel
 */

/**
 * Configuración para Slick Carousel que imita el comportamiento de Owl Carousel
 */
export const carruselSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: true,
  cssEase: 'linear',
  pauseOnHover: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

/**
 * Resuelve la ruta de una imagen importada
 * @param {string|object} img - Imagen importada o URL
 * @returns {string} URL de la imagen
 */
export const resolveImg = (img) => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object" && "default" in img) return img.default;
  // Si no es ninguno de los anteriores, retornar string vacío
  return "";
};

/**
 * Maneja el error de carga de imagen
 * @param {Event} e - Evento de error
 * @param {object} slide - Datos del slide
 */
export const handleImageError = (e, slide) => {
  console.error("Error cargando imagen del slide:", slide, e);
  e.currentTarget.style.opacity = 0.35;
};
