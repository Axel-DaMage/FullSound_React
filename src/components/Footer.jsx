import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-text">
          <Link to="/creditos"> Creditos </Link>
        </div>
        <div className="logo-text">FullSound</div>
        <div className="copyright">
          Copyright &copy;{new Date().getFullYear()} Todos los derechos
          reservados | Esta plantilla fue creada con <i className="fa fa-heart-o" aria-hidden="true" /> por
          <a href="https://colorlib.com" target="_blank" rel="noreferrer"> Colorlib</a>
        </div>
      </div>
    </footer>
  );
}
