import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Inicio from '../components/Inicio';

describe('Inicio', () => {
  it('verifica que el link "Comienza registrandote!" apunte a la ruta correcta', () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    // Busca el enlace con el texto "Comienza registrandote!"
    const registroLink = screen.getByRole('link', { name: /comienza registrandote!/i });

    // Verifica que el enlace exista y que su atributo href apunte a "/registro"
    expect(registroLink).toBeInTheDocument();
    expect(registroLink.getAttribute('href')).toBe('/registro');
  });
});