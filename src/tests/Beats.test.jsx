import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Beats from '../components/Beats';

describe('Beats', () => {
  it('muestra acciones de compra: "Agregar al carrito" o "Ver producto"', async () => {
    render(
      <MemoryRouter>
        <Beats />
      </MemoryRouter>
    );

    // Esperar a que los datos se carguen y renderizen
    await waitFor(() => {
      // Botones de "Agregar al carrito"
      const addToCartButtons = screen.queryAllByRole('button', { name: /agregar al carrito/i });
      // Links de "Ver producto" o "Ir al carrito"
      const viewProductLinks = screen.queryAllByRole('link', { name: /(ver producto|ir al carrito)/i });

      // Debe existir al menos una de las dos opciones
      expect(addToCartButtons.length + viewProductLinks.length).toBeGreaterThan(0);
    });

    // Verificar que existen links de navegación
    const allLinks = screen.queryAllByRole('link');
    expect(allLinks.length).toBeGreaterThan(0);
  });
});