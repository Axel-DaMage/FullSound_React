// Importar imágenes locales para el carrusel
import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpg';
import img3 from '../assets/img/3.jpg';

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL || 'https://kivpcepyhfpqjfoycwel.supabase.co';
const IMAGES_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET_IMAGES || 'Imagenes';
const AUDIO_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET_AUDIO || 'audios';

const getImageUrl = (filename) => `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${IMAGES_BUCKET}/${filename}`;
const getAudioUrl = (filename) => `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${AUDIO_BUCKET}/${filename}`;

export const datosBeats = [
  {
    id: 1,
    titulo: "La melodia de Lampa",
    artista: "Ismael Rivas",
    genero: "Electrónica",
    precio: "$250.000",
    precioNumerico: 250000,
    descripcion: "Disfruta de un clásico de la Electrónica en este beat exclusivo, ideal para ambientar cualquier momento.",
    fuente: getAudioUrl('1.mp3'),
    imagen: getImageUrl('16.jpg'),
    enlaceProducto: "/producto/1",
  },
  {
    id: 2,
    titulo: "Baby girl",
    artista: "Samuel Canchaya Smith",
    genero: "Pop",
    precio: "$999.999",
    precioNumerico: 999999,
    descripcion: "Un beat pop pegajoso perfecto para crear hits modernos y comerciales.",
    fuente: getAudioUrl('2.mp3'),
    imagen: getImageUrl('2.jpg'),
    enlaceProducto: "/producto/2",
  },
  {
    id: 3,
    titulo: "Renquiña",
    artista: "Axel Moraga",
    genero: "Chill",
    precio: "Gratis",
    precioNumerico: 0,
    descripcion: "Un beat chill relajante para momentos de tranquilidad y reflexión.",
    fuente: getAudioUrl('3.mp3'),
    imagen: getImageUrl('3.jpg'),
    enlaceProducto: "/producto/3",
  },
  {
     id: 4,
     artista: "Carlos Santana",
     titulo: "Funky Town",
     genero: "Funk",
     precio: "$500.000",
     precioNumerico: 500000,
     descripcion: "Un beat funky con mucho groove para animar cualquier fiesta.",
     fuente: getAudioUrl('4.mp3'),
     imagen: getImageUrl('4.jpg'),
     enlaceProducto: "/producto/4",
    },
     {
       id: 5,
       titulo: "Jazz in the Park",
       artista: "John Coltrane",
       genero: "Jazz",
       precio: "$750.000",
       precioNumerico: 750000,
       descripcion: "Un beat jazzístico perfecto para una tarde relajada en el parque.",
       fuente: getAudioUrl('5.mp3'),
       imagen: getImageUrl('6.jpg'),
       enlaceProducto: "/producto/5",
     },
     {
       id: 6,
       titulo: "Rock On",
       artista: "Jimi Hendrix",
       genero: "Rock",
       precio: "$1.000.000",
       precioNumerico: 1000000,
       descripcion: "Un beat rockero lleno de energía y poder para los amantes del rock.",
       fuente: getAudioUrl('6.mp3'),
       imagen: getImageUrl('7.jpg'),
       enlaceProducto: "/producto/6",
     },
     {
       id: 7,
       titulo: "Classical Symphony",
       artista: "Ludwig van Beethoven",
       genero: "Clásica",
       precio: "$1.500.000",
       precioNumerico: 1500000,
       descripcion: "Un beat clásico con la majestuosidad de una sinfonía de Beethoven.",
       fuente: getAudioUrl('7.mp3'),
       imagen: getImageUrl('8.jpg'),
       enlaceProducto: "/producto/7",
     },
     {
       id: 8,
       titulo: "Hip Hop Vibes",
       artista: "Kendrick Lamar",
       genero: "Hip Hop",
       precio: "$2.000.000",
       precioNumerico: 2000000,
       descripcion: "Un beat hip hop con mucho flow y estilo para los amantes del género.",
       fuente: getAudioUrl('8.mp3'),
       imagen: getImageUrl('10.jpg'),
       enlaceProducto: "/producto/8",
     },
     {
       id: 9,
       titulo: "Reggae Roots",
       artista: "Bob Marley",
       genero: "Reggae",
       precio: "$1.200.000",
       precioNumerico: 1200000,
       descripcion: "Un beat reggae con las raíces del legendario Bob Marley.",
       fuente: getAudioUrl('1.mp3'),
       imagen: getImageUrl('11.jpg'),
       enlaceProducto: "/producto/9",
     },
   ];
  
export const generosBeats = Array.from(new Set(datosBeats.map(b => b.genero)));
export const datosSlides = [
  {
    id: 1,
    prefijoTitulo: "Escucha",
    sufijoTitulo: "Lo nuevo",
    texto: "Descubre beats exclusivos y productores emergentes.",
    imagen: img1,
    alt: "Slide 1",
  },
  {
    id: 2,
    prefijoTitulo: "Explora",
    sufijoTitulo: "Nuestro catálogo",
    texto: "Beats de todos los géneros listos para tu próximo proyecto.",
    imagen: img2,
    alt: "Slide 2",
  },
  {
    id: 3,
    prefijoTitulo: "Conecta",
    sufijoTitulo: "Con artistas",
    texto: "Comparte, colabora y crea música desde cualquier lugar.",
    imagen: img3,
    alt: "Slide 3",
  },
];