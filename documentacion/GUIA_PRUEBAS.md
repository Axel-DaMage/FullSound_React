# 🚀 Guía Rápida de Pruebas - Sistema de Autenticación y CRUD

## ⚡ Inicio Rápido (5 minutos)

### 1. Ejecutar el Proyecto

```bash
# Terminal PowerShell
cd C:\Users\Diego\Documents\GitHub\FullSound_React
npm run dev
```

Abrir: `http://localhost:5173/FullSound_React`

---

## 🧪 Pruebas Paso a Paso

### Prueba 1: Registro de Administrador (2 min)

1. **Ir a Registro**
   - Click en "Crear una cuenta" en el header
   - O navegar a: `/registro`

2. **Completar formulario**
   ```
   Nombre:     Admin Full
   Email:      admin@admin.cl
   Password:   Admin123
   Confirmar:  Admin123
   ☑ Términos: Aceptar
   ```

3. **Verificar indicadores**
   - Debe aparecer: ✅ "✓ Correo de administrador (@admin.cl)"
   - Campo password muestra: "8-20 caracteres, letras y números"

4. **Crear cuenta**
   - Click "Crear Cuenta"
   - Alert: "¡Cuenta de administrador creada exitosamente!"
   - Redirige automáticamente a `/admin`

5. **Verificar header**
   - Debe mostrar: "👤 Admin Full [🛡️Admin]"
   - Opción "Cerrar sesión" visible
   - Menú "Administración" visible

✅ **Resultado esperado**: Acceso al panel de administración

---

### Prueba 2: Crear un Beat (2 min)

1. **En el Panel de Admin**
   - Verificar que estás en `/admin`
   - Ver sección "Gestión de Beats"

2. **Abrir formulario**
   - Click botón verde "Nuevo Beat"
   - Formulario se despliega inline

3. **Completar datos**
   ```
   Nombre:      Dark Trap
   Artista:     DJ Shadow
   Género:      Trap
   Precio:      25000
   URL Imagen:  (opcional)
   URL Audio:   (opcional)
   Descripción: Beat oscuro estilo trap
   ```

4. **Guardar**
   - Click "Guardar"
   - Alert: "Beat creado exitosamente"
   - Formulario se cierra
   - Beat aparece en la tabla

5. **Verificar en tabla**
   - Última fila debe mostrar "Dark Trap"
   - Precio formateado: "$25.000"
   - Botones de editar ✏️ y eliminar 🗑️ visibles

✅ **Resultado esperado**: Beat visible en la tabla

---

### Prueba 3: Editar un Beat (1 min)

1. **En la tabla de beats**
   - Localizar el beat "Dark Trap"
   - Click en botón ✏️ (editar)

2. **Formulario pre-cargado**
   - Verificar que todos los campos están llenos
   - Nombre: "Dark Trap"
   - Artista: "DJ Shadow"
   - etc.

3. **Modificar datos**
   ```
   Precio: 25000 → 22000
   ```

4. **Actualizar**
   - Click "Actualizar"
   - Alert: "Beat actualizado exitosamente"
   - Tabla se refresca

5. **Verificar cambios**
   - Precio ahora muestra: "$22.000"

✅ **Resultado esperado**: Precio actualizado en la tabla

---

### Prueba 4: Eliminar un Beat (1 min)

1. **En la tabla de beats**
   - Localizar el beat "Dark Trap"
   - Click en botón 🗑️ (eliminar)

2. **Confirmación**
   - Popup: "¿Estás seguro de eliminar el beat 'Dark Trap'?"
   - Click "Aceptar"

3. **Verificar eliminación**
   - Alert: "Beat eliminado exitosamente"
   - Beat desaparece de la tabla
   - Tabla se actualiza automáticamente

✅ **Resultado esperado**: Beat eliminado de la lista

---

### Prueba 5: Registro de Usuario Regular (2 min)

1. **Cerrar sesión**
   - Click "Cerrar sesión" en header
   - Alert: "Sesión cerrada exitosamente"
   - Redirige a `/`

2. **Ir a Registro**
   - Click "Crear una cuenta"

3. **Completar formulario**
   ```
   Nombre:     Usuario Test
   Email:      usuario@gmail.com
   Password:   User1234
   Confirmar:  User1234
   ☑ Términos: Aceptar
   ```

4. **Verificar indicadores**
   - Debe aparecer: "Correo de usuario regular"
   - NO debe decir "administrador"

5. **Crear cuenta**
   - Click "Crear Cuenta"
   - Alert: "¡Cuenta creada exitosamente!"
   - Redirige a `/beats` (NO a `/admin`)

6. **Verificar header**
   - Debe mostrar: "👤 Usuario Test"
   - NO debe mostrar badge "Admin"
   - Menú "Administración" NO debe estar visible

✅ **Resultado esperado**: Usuario regular sin acceso admin

---

### Prueba 6: Protección de Rutas (1 min)

1. **Con usuario regular (usuario@gmail.com)**
   - En la barra de direcciones escribir: `/admin`
   - Presionar Enter

2. **Verificar redirección**
   - Alert: "No tienes permisos de administrador..."
   - Redirige automáticamente a `/`

3. **Cerrar sesión y login como admin**
   - Logout
   - Login con: admin@admin.cl / Admin123
   - Navegar a `/admin`
   - Verificar: Acceso permitido ✅

✅ **Resultado esperado**: Protección de rutas funcional

---

### Prueba 7: Validaciones de Seguridad (2 min)

#### Test de Contraseña Débil

1. **Ir a Registro**
2. **Intentar password débil**
   ```
   Password: abc123
   ```
3. **Crear cuenta**
   - Alert: "La contraseña debe tener al menos 8 caracteres"

#### Test de Contraseña Sin Números

1. **Intentar solo letras**
   ```
   Password: Password
   ```
2. **Crear cuenta**
   - Alert: "La contraseña debe contener al menos una letra y un número"

#### Test de Email Inválido

1. **Intentar dominio no permitido**
   ```
   Email: usuario@yahoo.com
   ```
2. **Crear cuenta**
   - Alert: "El correo debe ser de un dominio permitido..."

#### Test de Passwords No Coinciden

1. **Passwords diferentes**
   ```
   Password:  User1234
   Confirmar: User5678
   ```
2. **Crear cuenta**
   - Alert: "Las contraseñas no coinciden"

✅ **Resultado esperado**: Todas las validaciones funcionan

---

## 🎯 Checklist de Pruebas

Marca cada prueba completada:

- [ ] ✅ Registro de admin exitoso
- [ ] ✅ Crear beat nuevo
- [ ] ✅ Editar beat existente
- [ ] ✅ Eliminar beat
- [ ] ✅ Registro de usuario regular
- [ ] ✅ Protección de rutas admin
- [ ] ✅ Validación de contraseña débil
- [ ] ✅ Validación de email inválido
- [ ] ✅ Validación de passwords diferentes
- [ ] ✅ Header dinámico según rol
- [ ] ✅ Logout funcional
- [ ] ✅ Login con detección de rol

---

## 🐛 Troubleshooting

### Problema: "Cannot read property 'data' of undefined"
**Solución**: Es normal, la API simulada falla y hace fallback a datos locales automáticamente.

### Problema: "Network Error"
**Solución**: Normal, no hay backend real. El sistema usa datos locales.

### Problema: No aparece el beat creado
**Solución**: Refresca la página (F5). En producción con API real no será necesario.

### Problema: El formulario no se cierra después de guardar
**Solución**: Verifica que no haya errores en la consola. Intenta cancelar y crear de nuevo.

---

## 📸 Capturas Esperadas

### Login como Admin
```
Debe mostrar:
- Email: admin@admin.cl
- Mensaje: "✓ Correo de administrador detectado"
- Al login → Redirige a /admin
```

### Panel de Admin
```
Debe mostrar:
- Header con "Administrador: admin@admin.cl"
- Badge "Admin" verde
- 4 tarjetas de estadísticas
- Tabla de beats con botones de acción
- Botón "Nuevo Beat" verde
```

### Formulario de Beat
```
Debe mostrar:
- 7 campos (Nombre, Artista, Género, Precio, Imagen, Audio, Descripción)
- Género como selector dropdown
- Botones "Cancelar" y "Guardar"
```

---

## 🎓 Casos de Uso Reales

### Caso 1: Admin agrega catálogo completo
```
1. Login como admin
2. Crear beat #1: "Summer Vibes" - Pop - $15,000
3. Crear beat #2: "Dark Bass" - Trap - $20,000
4. Crear beat #3: "Chill Flow" - R&B - $18,000
5. Verificar: 3 beats nuevos en tabla
```

### Caso 2: Admin corrige precio
```
1. Beat "Dark Bass" tiene precio incorrecto: $20,000
2. Click editar
3. Cambiar precio a $22,000
4. Actualizar
5. Verificar: Precio corregido
```

### Caso 3: Admin elimina beat duplicado
```
1. Hay 2 beats con mismo nombre
2. Click eliminar en uno
3. Confirmar
4. Verificar: Solo queda 1
```

---

## ⏱️ Tiempo Estimado Total

- **Pruebas básicas**: 10 minutos
- **Pruebas completas**: 15 minutos
- **Con troubleshooting**: 20 minutos

---

## ✅ Criterios de Éxito

Para considerar el sistema funcionando correctamente:

1. ✅ Admin puede registrarse con @admin.cl
2. ✅ Admin es redirigido a /admin
3. ✅ Admin puede crear beats
4. ✅ Admin puede editar beats
5. ✅ Admin puede eliminar beats
6. ✅ Usuario regular NO puede acceder a /admin
7. ✅ Validaciones de password funcionan
8. ✅ Header muestra info correcta según rol
9. ✅ Logout limpia la sesión
10. ✅ Login detecta rol automáticamente

---

## 🎉 ¡Todo Listo!

Si todas las pruebas pasan, el sistema está **100% funcional** y listo para:

- ✅ Demostración a clientes
- ✅ Integración con backend
- ✅ Despliegue en producción
- ✅ Expansión de funcionalidades

---

**Última actualización**: Octubre 2025  
**Versión del sistema**: 1.0.0  
**Tiempo de prueba**: ~15 minutos
