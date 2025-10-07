import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { GoldButton } from './GoldButton';
import { EMAILJS_CONFIG } from '../config/emailjs';

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        message: formData.mensaje,
        to_email: 'JaimeGallo@jegasolutions.co'
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId, 
        EMAILJS_CONFIG.templateId, 
        templateParams, 
        EMAILJS_CONFIG.publicKey
      );
      
      setSubmitStatus('success');
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[var(--jega-gold)]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--jega-gold)]"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[var(--jega-gold)]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--jega-gold)]"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-white mb-2">Mensaje breve</label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows={4}
          placeholder="Cuéntanos sobre tu proyecto..."
          required
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[var(--jega-gold)]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--jega-gold)] resize-none"
        ></textarea>
      </div>
      
      {submitStatus === 'success' && (
        <div className="text-green-400 text-center py-2">
          ¡Mensaje enviado correctamente! Te contactaremos pronto.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="text-red-400 text-center py-2">
          Error al enviar el mensaje. Por favor, inténtalo de nuevo.
        </div>
      )}
      
      <div className="text-center">
        <GoldButton 
          type="submit" 
          variant="outline"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Envíanos tu consulta'}
        </GoldButton>
      </div>
    </form>
  );
}
