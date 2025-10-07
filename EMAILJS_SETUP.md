# Configuración de EmailJS para el Formulario de Contacto

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Crea una cuenta gratuita
- Confirma tu email

### 2. Configurar un servicio de email
- En el dashboard, ve a "Email Services"
- Haz clic en "Add New Service"
- Selecciona tu proveedor de email (Gmail, Outlook, etc.)
- Sigue las instrucciones para conectar tu cuenta de email
- **Copia el Service ID** (ej: `service_xxxxxxx`)

### 3. Crear un template de email
- Ve a "Email Templates"
- Haz clic en "Create New Template"
- Usa este template:

**Subject:** `Nueva consulta desde JEGASolutions - {{from_name}}`

**Content:**
```
Hola Jaime,

Has recibido una nueva consulta desde el brochure de JEGASolutions:

Nombre: {{from_name}}
Email: {{from_email}}
Mensaje: {{message}}

---
Enviado desde el formulario de contacto de JEGASolutions
```

- Guarda el template
- **Copia el Template ID** (ej: `template_xxxxxxx`)

### 4. Obtener la Public Key
- Ve a "Account" → "General"
- **Copia la Public Key** (ej: `xxxxxxxxxxxxxxxx`)

### 5. Configurar el proyecto
- Abre el archivo `src/config/emailjs.js`
- Reemplaza los valores:
  ```javascript
  export const EMAILJS_CONFIG = {
    serviceId: 'tu_service_id_aqui',
    templateId: 'tu_template_id_aqui', 
    publicKey: 'tu_public_key_aqui'
  };
  ```

### 6. Probar el formulario
- Ejecuta `npm run dev`
- Llena el formulario de contacto
- Verifica que recibas el email en `JaimeGallo@jegasolutions.co`

## Características del formulario:
- ✅ Validación de campos requeridos
- ✅ Estados de carga (botón deshabilitado durante envío)
- ✅ Mensajes de éxito/error
- ✅ Limpieza automática del formulario tras envío exitoso
- ✅ Envío directo al email configurado

## Límites de la cuenta gratuita:
- 200 emails por mes
- Suficiente para un brochure corporativo
