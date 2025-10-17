import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.js'],
    globals: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'public/**',
        '**/*.min.*',
        '**/proyecto antiguo/**',
        'proyecto antiguo/**',
        '**/setupTests.js',
      ],
    },
  },
});