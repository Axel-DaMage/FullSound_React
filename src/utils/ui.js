export function inicializarPrecarga(callback) {
  const timer = setTimeout(() => {
    if (callback) callback(false);
  }, 400);
  return () => clearTimeout(timer);
}

export function toggleMobileMenu(isActive) {
  return !isActive;
}

export function inicializarSlider(slidesLength, callback) {
  const interval = setInterval(() => {
    callback((currentIndex) => (currentIndex + 1) % slidesLength);
  }, 4000);
  return () => clearInterval(interval);
}

// Normaliza un asset importado (string directo o módulo con default/src)
export function resolveAsset(asset) {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  if (typeof asset === "object") {
    if (asset.default && typeof asset.default === "string") return asset.default;
    if (asset.src && typeof asset.src === "string") return asset.src;
  }
  try {
    return String(asset);
  } catch {
    return "";
  }
}
