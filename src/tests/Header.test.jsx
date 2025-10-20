import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header', () => {
  it('muestra los links de navegación a Iniciar sesión y Crear una cuenta', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Puede haber múltiples enlaces (desktop + mobile), comprobar que al menos uno apunte a /login
    const loginLinks = screen.getAllByRole('link', { name: /iniciar sesión/i });
    expect(loginLinks.length).toBeGreaterThan(0);
    expect(loginLinks.some(l => l.getAttribute('href') === '/login')).toBe(true);

    // Aceptar "Crear una cuenta" o "Crear cuenta" (desktop vs mobile)
    const registerLinks = screen.getAllByRole('link', { name: /crear (una )?cuenta/i });
    expect(registerLinks.length).toBeGreaterThan(0);
    expect(registerLinks.some(l => l.getAttribute('href') === '/registro')).toBe(true);
  });
});