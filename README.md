<!-- Badges de CI y despliegue -->
[![Tests](https://github.com/Axel-DaMage/FullSound_React/actions/workflows/test.yml/badge.svg)](https://github.com/Axel-DaMage/FullSound_React/actions/workflows/test.yml)
[![CI & Deploy](https://github.com/Axel-DaMage/FullSound_React/actions/workflows/ci-deploy.yml/badge.svg)](https://github.com/Axel-DaMage/FullSound_React/actions/workflows/ci-deploy.yml)
[![Pages Deployment](https://img.shields.io/github/deployments/Axel-DaMage/FullSound_React/pages?label=GitHub%20Pages&logo=github)](https://github.com/Axel-DaMage/FullSound_React/deployments)
[![Vitest Status](https://img.shields.io/badge/tests-vitest-blue.svg)](https://github.com/Axel-DaMage/FullSound_React/actions/workflows/test.yml)

# Proyecto FullSound

FullSound es una plataforma web para explorar, comprar y administrar beats musicales. Está construida con React + Vite y una estructura modular de CSS y utilidades.

## Dependencias
- Stack: React (v19) + Vite
- Tests: Vitest
- Linter: ESLint
- CI: GitHub Actions (tests → build → deploy a GitHub Pages)

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