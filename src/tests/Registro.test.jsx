import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Registro from '../components/Registro';

describe('Registro', () => {
  it('verifica que el enlace "Inicia sesión aquí" apunte a la ruta correcta', () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Busca el enlace con el texto "Inicia sesión aquí"
    const loginLink = screen.getByRole('link', { name: /inicia sesión aquí/i });

    // Verifica que el enlace exista y que su atributo href apunte a "/login"
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute('href')).toBe('/login');
  });
});