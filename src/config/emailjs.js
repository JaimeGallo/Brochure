// Configuración de EmailJS
// Para configurar EmailJS:
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta gratuita
// 3. Crea un servicio de email (Gmail, Outlook, etc.)
// 4. Crea un template de email
// 5. Reemplaza los valores abajo con tus credenciales

export const EMAILJS_CONFIG = {
  serviceId: 'service_jegasolutions', // Reemplaza con tu Service ID
  templateId: 'template_contacto', // Reemplaza con tu Template ID
  publicKey: 'tu_public_key' // Reemplaza con tu Public Key
};

// Template de email sugerido para EmailJS:
/*
Subject: Nueva consulta desde JEGASolutions - {{from_name}}

Hola Jaime,

Has recibido una nueva consulta desde el brochure de JEGASolutions:

Nombre: {{from_name}}
Email: {{from_email}}
Mensaje: {{message}}

---
Enviado desde el formulario de contacto de JEGASolutions
*/
