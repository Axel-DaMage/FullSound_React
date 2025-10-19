# Sistema de Autenticación y Roles - FullSound

## Descripción General

Este documento describe el sistema de autenticación y autorización basado en roles implementado en FullSound React.

## Características Principales

### 1. Detección Automática de Roles por Email

El sistema detecta automáticamente el rol del usuario basándose en el dominio de su correo electrónico:

- **Administrador**: Correos que terminan en `@admin.cl`
- **Usuario Regular**: Correos que terminan en `@gmail.com` o `@duocuc.cl`

#### Ejemplo:
```javascript
admin@admin.cl        → Rol: admin
usuario@gmail.com     → Rol: user
estudiante@duocuc.cl  → Rol: user
```

### 2. Validaciones de Seguridad

#### Validación de Contraseña
- **Mínimo**: 8 caracteres
- **Máximo**: 20 caracteres
- **Requisitos**: Debe contener al menos una letra y un número
- **Ejemplos válidos**: `Password123`, `MiClave2024`, `Admin999`

#### Validación de Email
- Formato válido de correo electrónico
- Dominios permitidos: `@gmail.com`, `@duocuc.cl`, `@admin.cl`
- Ejemplos válidos: `user@gmail.com`, `admin@admin.cl`

#### Validación de Nombre
- Mínimo: 3 caracteres
- Máximo: 100 caracteres
- Solo letras y espacios

### 3. Flujo de Registro

1. Usuario completa el formulario de registro
2. Sistema valida todos los campos (nombre, email, contraseña, confirmación, términos)
3. Sistema detecta automáticamente el rol basándose en el dominio del email
4. Usuario es registrado y se genera un token simulado
5. Usuario es redirigido según su rol:
   - Admin → `/admin`
   - Usuario → `/beats`

### 4. Flujo de Login

1. Usuario ingresa correo y contraseña
2. Sistema valida las credenciales
3. Sistema detecta el rol automáticamente
4. Muestra indicador visual si es correo de administrador
5. Usuario es redirigido según su rol:
   - Admin → `/admin`
   - Usuario → `/beats`

### 5. Protección de Rutas

El sistema protege automáticamente las rutas sensibles:

#### Rutas Públicas (sin autenticación)
- `/` - Inicio
- `/beats` - Catálogo de beats
- `/login` - Inicio de sesión
- `/registro` - Registro
- `/creditos` - Créditos

#### Rutas Protegidas (requieren autenticación)
- `/carrito` - Carrito de compras
- `/perfil` - Perfil de usuario
- `/producto/:id` - Detalles de producto

#### Rutas de Administrador (requieren rol admin)
- `/admin` - Panel de administración
  - Gestión de Beats
  - Gestión de Usuarios
  - Estadísticas

### 6. Componentes del Sistema

#### `authValidation.js`
Funciones de validación:
- `validarCorreo(correo)` - Valida formato y dominio
- `validarPassword(password)` - Valida requisitos de seguridad
- `validarNombre(nombre)` - Valida nombre
- `validarConfirmacionPassword(password, confirmPassword)` - Valida coincidencia
- `validarTerminos(terminos)` - Valida aceptación de términos
- `validarFormularioRegistro(...)` - Validación completa del registro
- `validarCredenciales(correo, password)` - Validación de login
- `esCorreoAdmin(correo)` - Detecta si es correo de admin
- `obtenerRolPorCorreo(correo)` - Extrae el rol del email

#### `rolesPermisos.js`
Gestión de roles y permisos:
- `ROLES` - Constantes de roles (admin, user)
- `PERMISOS` - Permisos por rol
- `tieneRol(usuario, rol)` - Verifica rol
- `esAdmin(usuario)` - Verifica si es admin
- `tienePermiso(usuario, permiso)` - Verifica permiso específico
- `puedeAccederARuta(usuario, ruta)` - Verifica acceso a ruta
- `obtenerUsuarioActual()` - Obtiene usuario de localStorage
- `guardarUsuario(usuario)` - Guarda usuario en localStorage
- `limpiarUsuario()` - Elimina usuario y token
- `estaAutenticado()` - Verifica si hay sesión activa
- `requiereAutenticacion(navigate)` - Hook de protección
- `requiereAdmin(navigate)` - Hook de protección admin

#### `ProtectedRoute.jsx`
Componente HOC para proteger rutas:
```jsx
<ProtectedRoute requireAdmin={true}>
  <Administracion />
</ProtectedRoute>
```

### 7. Permisos por Rol

#### Administrador
- ✅ Crear, editar y eliminar beats
- ✅ Ver y gestionar usuarios
- ✅ Eliminar usuarios
- ✅ Ver estadísticas
- ✅ Gestionar órdenes de compra
- ✅ Todas las funciones de usuario regular

#### Usuario Regular
- ✅ Ver catálogo de beats
- ✅ Comprar beats
- ✅ Gestionar carrito de compras
- ✅ Ver y editar perfil
- ❌ Acceso al panel de administración

### 8. Indicadores Visuales

#### En Login
Cuando el usuario ingresa un correo con `@admin.cl`, aparece el mensaje:
```
✓ Correo de administrador detectado
```

#### En Registro
- Si el correo es `@admin.cl`: "✓ Correo de administrador (@admin.cl)"
- Si es otro dominio: "Correo de usuario regular"

#### En Header
- Muestra el nombre del usuario autenticado
- Badge verde con texto "Admin" para administradores
- Opción de cerrar sesión
- Menú "Administración" visible solo para admins

### 9. Estructura de Usuario en localStorage

```javascript
{
  id: 1234567890,
  nombre: "Juan Pérez",
  correo: "admin@admin.cl",
  rol: "admin", // o "user"
  fechaRegistro: "2024-01-15T10:30:00.000Z"
}
```

Token de autenticación:
```javascript
localStorage.getItem('token') // "token_simulado_1234567890"
```

### 10. Ejemplos de Uso

#### Verificar si es Admin en un Componente
```jsx
import { obtenerUsuarioActual, esAdmin } from '../utils/rolesPermisos';

function MiComponente() {
  const usuario = obtenerUsuarioActual();
  
  if (esAdmin(usuario)) {
    // Mostrar funcionalidad de admin
    return <PanelAdmin />;
  }
  
  return <VistaUsuario />;
}
```

#### Proteger una Ruta
```jsx
import ProtectedRoute from './components/ProtectedRoute';
import Administracion from './components/Administracion';

function App() {
  return (
    <Routes>
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <Administracion />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

#### Verificar Permisos Específicos
```jsx
import { obtenerUsuarioActual, tienePermiso } from '../utils/rolesPermisos';

function BeatCard({ beat }) {
  const usuario = obtenerUsuarioActual();
  
  return (
    <div>
      <h3>{beat.nombre}</h3>
      {tienePermiso(usuario, 'eliminar_beat') && (
        <button onClick={() => eliminarBeat(beat.id)}>
          Eliminar
        </button>
      )}
    </div>
  );
}
```

### 11. Seguridad

⚠️ **Importante**: Este sistema actualmente usa validación del lado del cliente y tokens simulados. 

Para producción, se debe:
1. Integrar con el backend real (API REST)
2. Usar JWT tokens reales firmados por el servidor
3. Validar permisos en el servidor (nunca confiar solo en el cliente)
4. Implementar refresh tokens
5. Agregar HTTPS obligatorio
6. Implementar rate limiting
7. Sanitizar todas las entradas de usuario

### 12. Próximos Pasos

- [ ] Integrar con API backend real
- [ ] Implementar recuperación de contraseña
- [ ] Agregar autenticación de dos factores (2FA)
- [ ] Implementar tokens JWT reales
- [ ] Agregar logs de actividad de admin
- [ ] Implementar paginación en tablas de admin
- [ ] Agregar filtros y búsqueda en panel de admin

### 13. Dominios de Email Permitidos

Puedes modificar los dominios permitidos editando `src/utils/authValidation.js`:

```javascript
const DOMINIOS_PERMITIDOS = ['gmail.com', 'duocuc.cl', 'admin.cl'];
const DOMINIO_ADMIN = 'admin.cl';
```

Para agregar más dominios, simplemente añádelos al array `DOMINIOS_PERMITIDOS`.

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2024  
**Desarrollado para**: FullSound React
