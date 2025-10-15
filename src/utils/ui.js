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
