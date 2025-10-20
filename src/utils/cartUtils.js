import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "fs_cart_v1";
const CART_EVENT = "fs_cart_updated";

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function getCartItems() {
  return readStorage();
}

export function addItemToCart(beat, cantidad = 1) {
  const items = readStorage();
  const idx = items.findIndex((i) => i.id === beat.id);
  if (idx >= 0) {
    items[idx].cantidad = (items[idx].cantidad || 0) + cantidad;
  } else {
    items.push({
      id: beat.id,
      titulo: beat.titulo,
      precioNumerico: beat.precioNumerico || 0,
      precio: beat.precio,
      imagen: beat.imagen,
      cantidad,
    });
  }
  writeStorage(items);
  try { window.dispatchEvent(new CustomEvent(CART_EVENT)); } catch {}
  return items;
}

export function removeItemFromCart(id) {
  const items = readStorage().filter((i) => i.id !== id);
  writeStorage(items);
  try { window.dispatchEvent(new CustomEvent(CART_EVENT)); } catch {}
  return items;
}

export function updateItemQuantity(id, cantidad) {
  const items = readStorage().map((i) => (i.id === id ? { ...i, cantidad } : i)).filter(Boolean);
  writeStorage(items);
  try { window.dispatchEvent(new CustomEvent(CART_EVENT)); } catch {}
  return items;
}

export function clearCart() {
  writeStorage([]);
  try { window.dispatchEvent(new CustomEvent(CART_EVENT)); } catch {}
}

// Hook ligero que expone API para componentes sin provider
export function useCart() {
  const [items, setItems] = useState(() => readStorage());

  useEffect(() => {
    const refresh = () => setItems(readStorage());
    window.addEventListener(CART_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CART_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const addItem = useCallback((beat, cantidad = 1) => {
    const next = addItemToCart(beat, cantidad);
    setItems(next);
    return next;
  }, []);

  const removeItem = useCallback((id) => {
    const next = removeItemFromCart(id);
    setItems(next);
    return next;
  }, []);

  const updateQuantity = useCallback((id, cantidad) => {
    const next = updateItemQuantity(id, cantidad);
    setItems(next);
    return next;
  }, []);

  const clear = useCallback(() => {
    clearCart();
    setItems([]);
  }, []);

  const total = items.reduce((acc, it) => acc + (Number(it.precioNumerico || 0) * Number(it.cantidad || 0)), 0);

  return { items, addItem, removeItem, updateQuantity, clear, total };
}
