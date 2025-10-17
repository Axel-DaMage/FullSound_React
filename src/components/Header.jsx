import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { menuItems, getMenuItemClass } from "../utils/headerUtils";

export default function Header({ activeItem = "" }) {
  const [mobileActive, setMobileActive] = useState(false);
  
  const toggleMobile = () => setMobileActive((v) => !v);

  return (
    <header className="header-section clearfix">
      <Link to="/" className="site-logo">
        <div className="logo-text">FullSound</div>
      </Link>
      <div className="header-right">
        <div className="user-panel">
          <Link to="/login" className="login">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="register">
            Crear una cuenta
          </Link>
        </div>
      </div>
      <ul className="main-menu">
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link to={item.path} className={getMenuItemClass(item.key, activeItem)}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button className="mobile-menu-btn" onClick={toggleMobile}>
        <span />
        <span />
        <span />
      </button>
      <div className={`mobile-menu${mobileActive ? " active" : ""}`}>
        {menuItems.map((item) => (
          <Link key={item.key} to={item.path}>
            {item.label}
          </Link>
        ))}
    </header>
  );
}

Header.propTypes = {
  activeItem: PropTypes.string
};

Header.defaultProps = {
  activeItem: ""
};
