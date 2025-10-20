import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Login from '../components/Login';
import { MemoryRouter } from 'react-router-dom';

// Mock de useNavigate para capturar redirecciones
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

// Mock de utilidades que Login usa
vi.mock('../utils/authValidation', () => ({
  validarCredenciales: vi.fn(),
  obtenerRolPorCorreo: vi.fn(),
  esCorreoAdmin: vi.fn()
}));

// Mock parcial para rolesPermisos: importa todo el módulo real y overridea guardarUsuario
vi.mock('../utils/rolesPermisos', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    guardarUsuario: vi.fn()
  };
});

import { validarCredenciales, obtenerRolPorCorreo } from '../utils/authValidation';
import { guardarUsuario } from '../utils/rolesPermisos';

describe('Login - flujo y efectos secundarios', () => {
  let setItemSpy;
  let alertSpy;

  beforeEach(() => {
    // Espiar llamadas a localStorage.setItem (Storage.prototype es la forma genérica)
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    // Espiar alert global para evitar UI real
    alertSpy = vi.spyOn(globalThis, 'alert').mockImplementation(() => {});
    // limpiar mocks externos
    mockNavigate.mockClear();
    validarCredenciales.mockReset();
    obtenerRolPorCorreo.mockReset();
    guardarUsuario.mockReset();
  });

  afterEach(() => {
    setItemSpy.mockRestore();
    alertSpy.mockRestore();
  });

  it('muestra alerta y no navega cuando las credenciales son inválidas', async () => {
    validarCredenciales.mockReturnValue({ isValid: false, error: 'Credenciales inválidas' });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simular completar inputs
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'foo@bar.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123' } });

    // Enviar formulario
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // Expect: alerta llamada con el error, no hay navegación ni guardado
    expect(alertSpy).toHaveBeenCalledWith('Credenciales inválidas');
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(setItemSpy).not.toHaveBeenCalled();
    expect(guardarUsuario).not.toHaveBeenCalled();
  });

  it('redirige a /admin y guarda usuario cuando el rol es admin', async () => {
    validarCredenciales.mockReturnValue({ isValid: true, error: null });
    obtenerRolPorCorreo.mockReturnValue('admin');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const email = 'admin@admin.cl';
    const password = 'password123';

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: email } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: password } });

    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // Se llamó setItem para token y guardarUsuario con objeto usuario
    expect(setItemSpy).toHaveBeenCalled(); // al menos una llamada (token)
    expect(guardarUsuario).toHaveBeenCalled();
    const usuarioGuardado = guardarUsuario.mock.calls[0][0];
    expect(usuarioGuardado.correo).toBe(email);
    expect(usuarioGuardado.rol).toBe('admin');

    // Alerta y navegación correctas
    expect(alertSpy).toHaveBeenCalledWith('Bienvenido Administrador');
    expect(mockNavigate).toHaveBeenCalledWith('/admin');
  });

  it('redirige a /beats cuando el rol es user', async () => {
    validarCredenciales.mockReturnValue({ isValid: true, error: null });
    obtenerRolPorCorreo.mockReturnValue('user');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const email = 'user@example.com';
    const password = 'password123';

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: email } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: password } });

    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // El guardado del usuario, la alerta y la navegación son los efectos observables relevantes
    expect(guardarUsuario).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Inicio de sesión exitoso');
    expect(mockNavigate).toHaveBeenCalledWith('/beats');
  });
});