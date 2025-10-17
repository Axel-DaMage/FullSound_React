import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { inicializarPrecarga } from "../utils/ui";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, activeItem = "", showPreloader: showPreloaderProp = true }) {
  const [showPreloader, setShowPreloader] = useState(showPreloaderProp);
  
  useEffect(() => {
    if (showPreloaderProp) {
      return inicializarPrecarga(setShowPreloader);
    }
  }, [showPreloaderProp]);  return (
    <div className="layout-container">
      {showPreloader && (
        <div id="preloder">
          <div className="loader" />
        </div>
      )}
      <Header activeItem={activeItem} />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  activeItem: PropTypes.string,
  showPreloader: PropTypes.bool
};
