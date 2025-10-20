// Import audio files
import audio1 from '../assets/audio/1.mp3';
import audio2 from '../assets/audio/2.mp3';
import audio3 from '../assets/audio/3.mp3';
import audio4 from '../assets/audio/4.mp3';
import audio5 from '../assets/audio/5.mp3';
import audio6 from '../assets/audio/6.mp3';
import audio7 from '../assets/audio/7.mp3';
import audio8 from '../assets/audio/8.mp3';
import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpg';
import img3 from '../assets/img/3.jpg';
import img4 from '../assets/img/4.jpg';
import img6 from '../assets/img/6.jpg';
import img7 from '../assets/img/7.jpg';
import img8 from '../assets/img/8.jpg';
import img10 from '../assets/img/10.jpg';
import img11 from '../assets/img/11.jpg';
import img16 from '../assets/img/16.jpg';

export const datosBeats = [
  {
    id: 1,
    titulo: "La melodia de Lampa",
    artista: "Ismael Rivas",
    genero: "Electrónica",
    precio: "$250.000",
    precioNumerico: 250000,
    descripcion: "Disfruta de un clásico de la Electrónica en este beat exclusivo, ideal para ambientar cualquier momento.",
    fuente: audio1,
    imagen: img16,
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
    fuente: audio2,
    imagen: img2,
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
    fuente: audio3,
    imagen: img3,
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
     fuente: audio4,
     imagen: img4,
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
       fuente: audio5,
       imagen: img6,
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
       fuente: audio6,
       imagen: img7,
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
       fuente: audio7,
       imagen: img8,
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
       fuente: audio8,
       imagen: img10,
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
       fuente: audio1,
       imagen: img11,
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
    imagen: img16,
    alt: "Slide 1",
  },
  {
    id: 2,
    prefijoTitulo: "Explora",
    sufijoTitulo: "Nuestro catálogo",
    texto: "Beats de todos los géneros listos para tu próximo proyecto.",
    imagen: img10,
    alt: "Slide 2",
  },
  {
    id: 3,
    prefijoTitulo: "Conecta",
    sufijoTitulo: "Con artistas",
    texto: "Comparte, colabora y crea música desde cualquier lugar.",
    imagen: img11,
    alt: "Slide 3",
  },
];