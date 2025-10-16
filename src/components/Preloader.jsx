import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      id="preloder" 
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.4s ease-out'
      }}
    >
      <div className="loader"></div>
    </div>
  );
}
