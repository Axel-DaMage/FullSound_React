import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Beats from '../components/Beats';

describe('Beats', () => {
  it('muestra acciones de compra: "Agregar al carrito" o "Ver producto"', () => {
    render(
      <MemoryRouter>
        <Beats />
      </MemoryRouter>
    );

    // Botones de "Agregar al carrito"
    const addToCartButtons = screen.queryAllByRole('button', { name: /agregar al carrito/i });
    // Links de "Ver producto"
    const viewProductLinks = screen.queryAllByRole('link', { name: /ver producto/i });

    // Debe existir al menos una de las dos opciones
    expect(addToCartButtons.length + viewProductLinks.length).toBeGreaterThan(0);

    // Si hay links de producto, al menos uno debe apuntar a una ruta de producto
    if (viewProductLinks.length > 0) {
      const hrefs = viewProductLinks.map(link => link.getAttribute('href'));
      const hasProduct = hrefs.some(h => h && /\/producto\//.test(h));
      expect(hasProduct).toBe(true);
    }
  });
});