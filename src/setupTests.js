// Asegura que `expect` esté definido globalmente antes de cargar jest-dom
import { expect } from 'vitest';
globalThis.expect = expect;

// Usa la entrada específica para Vitest (extiende expect correctamente)
import '@testing-library/jest-dom/vitest';
