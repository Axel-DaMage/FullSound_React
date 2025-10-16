import React, { useEffect, useState } from "react";
import { inicializarPrecarga } from "../utils/ui";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, activeItem = "", showPreloader: showPreloaderProp = true }) {
  const [showPreloader, setShowPreloader] = useState(showPreloaderProp);
  
  useEffect(() => {
    if (showPreloaderProp) {
      return inicializarPrecarga(setShowPreloader);
    }
  }, [showPreloaderProp]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showPreloader && (
        <div id="preloder">
          <div className="loader" />
        </div>
      )}
      <Header activeItem={activeItem} />
      <main style={{ flex: '1 0 auto' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
