# API Services - FullSound React

Servicios de API creados con Axios para el proyecto FullSound.

## Estructura

```
src/services/
├── api.js              # Configuración base de axios
├── authService.js      # Autenticación y registro
├── beatsService.js     # Gestión de beats
├── carritoService.js   # Carrito de compras
├── usuariosService.js  # Gestión de usuarios
└── index.js           # Exportaciones centralizadas
```

## Configuración

1. Copia `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configura la URL de tu API en `.env`:
```
VITE_API_URL=http://localhost:3000
```

## Uso

### Importación

```javascript
// Importar servicios específicos
import { login, registrar } from '@/services/authService';
import { obtenerBeats, obtenerBeatPorId } from '@/services/beatsService';

// O importar todo desde index
import { login, obtenerBeats, agregarAlCarrito } from '@/services';
```

### Ejemplos de uso

#### Autenticación

```javascript
// Login
try {
  const data = await login({
    correo: 'usuario@ejemplo.com',
    password: '12345'
  });
  console.log('Usuario logueado:', data.user);
} catch (error) {
  console.error('Error en login:', error);
}

// Registro
try {
  const usuario = await registrar({
    nombre: 'Juan Pérez',
    correo: 'juan@ejemplo.com',
    password: '12345'
  });
  console.log('Usuario registrado:', usuario);
} catch (error) {
  console.error('Error en registro:', error);
}

// Logout
await logout();
```

#### Beats

```javascript
// Obtener todos los beats
const beats = await obtenerBeats();

// Filtrar beats por género
const beatsJazz = await obtenerBeatsPorGenero('Jazz');

// Obtener beat específico
const beat = await obtenerBeatPorId(1);

// Crear beat (admin)
const nuevoBeat = await crearBeat({
  titulo: 'Nuevo Beat',
  artista: 'Artista',
  genero: 'Hip Hop',
  precio: '$100.000',
  precioNumerico: 100000
});
```

#### Carrito

```javascript
// Obtener carrito
const carrito = await obtenerCarrito();

// Agregar al carrito
await agregarAlCarrito({
  beatId: 1,
  cantidad: 1
});

// Actualizar cantidad
await actualizarCantidadItem(itemId, 2);

// Eliminar del carrito
await eliminarDelCarrito(itemId);

// Procesar compra
const orden = await procesarCheckout({
  metodoPago: 'tarjeta',
  // ... otros datos
});
```

#### Usuarios

```javascript
// Obtener perfil actual
const perfil = await obtenerPerfil();

// Actualizar perfil
await actualizarPerfil({
  nombre: 'Nuevo Nombre'
});

// Cambiar contraseña
await cambiarPassword('passwordActual', 'passwordNueva');
```

## Interceptors

### Request Interceptor
Agrega automáticamente el token de autenticación a todas las peticiones si existe en localStorage.

### Response Interceptor
Maneja errores globalmente:
- **401**: Redirige a login y limpia token
- **403**: Acceso denegado
- **404**: Recurso no encontrado
- **500**: Error del servidor

## Estructura de respuestas esperadas del backend

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Mensaje de error",
  "code": "ERROR_CODE"
}
```

## Próximos pasos

1. Configurar backend (JSON Server, Node.js, etc.)
2. Actualizar componentes para usar servicios
3. Implementar manejo de estados (Context API o Redux)
4. Añadir validaciones y feedback visual
