import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Producto from '../components/Producto';

describe('Producto', () => {
  it('verifica que el enlace "Volver a Beats" apunte a la ruta correcta', () => {
    render(
      <MemoryRouter>
        <Producto />
      </MemoryRouter>
    );

    // Busca el enlace con el texto "Volver a Beats"
    const volverLink = screen.getByRole('link', { name: /volver a beats/i });

    // Verifica que el enlace exista y que su atributo href apunte a "/beats"
    expect(volverLink).toBeInTheDocument();
    expect(volverLink.getAttribute('href')).toBe('/beats');
  });
});