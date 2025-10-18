import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('verifica que el link "Creditos" apunte a la ruta correcta', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Busca el enlace con el texto "Creditos"
    const creditosLink = screen.getByRole('link', { name: /creditos/i });

    // Verifica que el enlace apunte a "/creditos"
    expect(creditosLink).toBeInTheDocument();
    expect(creditosLink.getAttribute('href')).toBe('/creditos');
  });
});