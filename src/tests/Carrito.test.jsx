import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carrito from '../components/Carrito';

describe('Carrito', () => {
  it('muestra el título principal del carrito', () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );
    // Busca el título único del carrito
    expect(
      screen.getByText(/carrito de compras/i)
    ).toBeInTheDocument();
  });
});