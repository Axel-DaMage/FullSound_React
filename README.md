<!-- Badges de CI y despliegue -->
[![Tests](https://img.shields.io/github/actions/workflow/status/Axel-DaMage/FullSound_React/test.yml?style=for-the-badge&label=Tests&logo=vitest&logoColor=white&color=1db954&labelColor=000000)](https://github.com/Axel-DaMage/FullSound_React/actions/workflows/test.yml)
[![Deploy](https://img.shields.io/github/actions/workflow/status/Axel-DaMage/FullSound_React/deploy.yml?style=for-the-badge&label=Deploy&logo=github&color=1db954&labelColor=000000)](https://github.com/Axel-DaMage/FullSound_React/actions/workflows/deploy.yml)
[![Coverage](https://img.shields.io/badge/coverage-6.06%25-red?style=for-the-badge&logo=vitest&logoColor=white&labelColor=000000)](./coverage/lcov-report/index.html)

# Proyecto FullSound

FullSound es una plataforma web para explorar, comprar y administrar beats musicales. Está construida con React + Vite y una estructura modular de CSS y utilidades.

## Dependencias
- React (v19)
- Vite
- Vitest
- ESLint
- prop-types
- @testing-library/react
- @testing-library/jest-dom
- happy-dom

## Estructura del proyecto

src/
├── components/      # Componentes React (Header, Layout, Carrusel, Producto, etc.)
├── assets/          # CSS modular y recursos (css/, img/, audio/)
├── datos/           # Datos ficticios (beats, slides)
├── utils/           # Helpers y lógica separada
├── tests/           # Pruebas unitarias
├── App.jsx
└── main.jsx

public/              # Archivos estáticos
proyecto antiguo/     # Código original HTML/CSS/JS de referencia

Licencia: MIT