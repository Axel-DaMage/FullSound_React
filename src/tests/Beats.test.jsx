import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Beats from '../components/Beats';

describe('Beats', () => {
  it('muestra links "Comprar" y apuntan a producto o carrito', () => {
    render(
      <MemoryRouter>
        <Beats />
      </MemoryRouter>
    );

    // Busca todos los enlaces con el texto "Comprar"
    const comprarLinks = screen.getAllByRole('link', { name: /comprar/i });
    // Debe haber al menos uno
    expect(comprarLinks.length).toBeGreaterThan(0);

    // Extrae los hrefs y verifica que al menos uno apunte a '/carrito'
    // o a una ruta de producto (p. ej. '/producto/...' o '/product/...')
    const hrefs = comprarLinks.map(link => link.getAttribute('href'));
    const hasCarrito = hrefs.some(h => h === '/carrito');
    const hasProduct = hrefs.some(h => h && /\/producto\/?|\/product\/?/.test(h));

    expect(hasCarrito || hasProduct).toBe(true);
  });
});