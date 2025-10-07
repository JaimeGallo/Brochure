import { Clock, Brain, Settings, Search, Lightbulb, Code, HeadphonesIcon, Mail, Phone, MapPin, Linkedin, MessageCircle } from 'lucide-react';
import { ModuleCard } from './components/ModuleCard';
import { ProcessStep } from './components/ProcessStep';
import { GoldButton } from './components/GoldButton';
import { PricingMessage } from './components/PricingMessage';
import { PDFExportButton } from './components/PDFExportButton';
import logoMain from './assets/logo6.png';
import logoWhiteText from './assets/logo-white-text.svg';
import logoSolo from './assets/logoSolo.png';
import heroImage from './assets/hero-image.svg';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--jega-gray-light)] to-white">
      {/* A3 Page Container */}
      <div className="brochure-container max-w-[297mm] mx-auto bg-white shadow-2xl">
        
        {/* Header */}
        <header className="relative bg-gradient-to-r from-[var(--jega-blue-dark)] to-[var(--jega-blue-medium)] px-8 py-6 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-8 h-full items-center py-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <img key={i} src={logoSolo} alt="" className="w-12 h-12 object-contain mx-auto" />
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            {/* Logo centrado */}
            <div className="flex justify-center mb-3">
              <a href="https://www.jegasolutions.co/" target="_blank" rel="noopener noreferrer">
                <img 
                  src={logoMain} 
                  alt="JEGASolutions" 
                  className="h-24 hover:scale-105 hover:drop-shadow-2xl transition-all duration-300 ease-in-out filter drop-shadow-lg" 
                />
              </a>
            </div>
            
            {/* Datos de contacto centrados */}
            <div className="flex justify-center">
              <div className="flex flex-wrap justify-center gap-6 text-white">
                <a 
                  href="mailto:JaimeGallo@jegasolutions.co" 
                  className="flex items-center gap-2 text-sm hover:text-[var(--jega-gold)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="w-4 h-4 text-[var(--jega-gold)]" />
                  <span>JaimeGallo@jegasolutions.co</span>
                </a>
                <a 
                  href="https://wa.me/573136093516" 
                  className="flex items-center gap-2 text-sm hover:text-[var(--jega-gold)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--jega-gold)]" />
                  <span>+57 313 609 3516</span>
                </a>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-[var(--jega-gold)]" />
                  <span>Medellín, Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[var(--jega-blue-dark)] via-[var(--jega-blue-medium)] to-[#1a4a7a] px-8 py-6 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-6 gap-12 h-full items-center py-8">
              {Array.from({ length: 18 }).map((_, i) => (
                <img key={i} src={logoSolo} alt="" className="w-16 h-16 object-contain mx-auto" />
              ))}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-[var(--jega-gold)] opacity-20 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-[var(--jega-gold)] opacity-20 rounded-full"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl mb-3 text-white">
              Transformamos procesos administrativos repetitivos en procesos que generan valor
            </h1>
            <p className="text-lg text-gray-200 mb-4">
              Suite digital modular que automatiza, optimiza y digitaliza la gestión empresarial.
            </p>
            <div className="flex justify-center">
              <a href="https://www.jegasolutions.co/" target="_blank" rel="noopener noreferrer">
                <GoldButton variant="outline">Visita nuestro sitio</GoldButton>
              </a>
            </div>
          </div>
          
          {/* Technical illustration */}
          <div className="absolute right-0 bottom-0 opacity-10">
            <img src={heroImage} alt="Technical illustration" className="w-80 h-52" />
          </div>
        </section>

        {/* Suite Digital Modular Section */}
        <section className="relative px-8 py-4 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="grid grid-cols-7 gap-10 h-full items-center py-6">
              {Array.from({ length: 28 }).map((_, i) => (
                <img key={i} src={logoSolo} alt="" className="w-14 h-14 object-contain mx-auto" />
              ))}
            </div>
          </div>
          
        <div className="relative z-10 text-center mb-4">
          <h2 className="text-2xl text-[var(--jega-blue-dark)] mb-2">Suite Digital Modular</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--jega-gold)] to-[var(--jega-gold-light)] mx-auto mt-2"></div>
        </div>
          
          <div className="relative z-10 grid md:grid-cols-3 gap-6">
            <ModuleCard
              icon={<Clock className="w-10 h-10" />}
              title="Gestión de Horas Extra"
              description="Automatiza el registro, cálculo y aprobación con cumplimiento normativo garantizado."
              features={[
                'Registro automático por empleados',
                'Cálculo categorizado (diurna/nocturna/festiva)',
                'Aprobación por managers',
                'Reportes y exportación Excel'
              ]}
              benefits={['Eficiencia', 'Cumplimiento', 'Reportes automáticos']}
            />
            
            <ModuleCard
              icon={<Brain className="w-10 h-10" />}
              title="Reportes con IA"
              description="Consolidación de plantillas y análisis inteligente con AI."
              features={[
                'Narrativas automáticas',
                'Plantillas consolidadas',
                'Exportación PDF/Word',
                'Insights en tiempo real'
              ]}
              benefits={['Generación inteligente', 'Análisis avanzado', 'Velocidad', 'Estandarización']}
            />
            
            <ModuleCard
              icon={<Settings className="w-10 h-10" />}
              title="Consultoría Tecnológica"
              description="Acompañamos tu transformación digital con soluciones reales y cumplimiento normativo."
              features={[
                'Diagnóstico y análisis',
                'Diseño y optimización',
                'Implementación y soporte',
                'Acompañamiento continuo'
              ]}
              benefits={['Personalizado', 'Experto', 'Confiable']}
            />
          </div>
        </section>

        {/* Process Section */}
        <section className="relative bg-gradient-to-r from-[var(--jega-blue-dark)] to-[var(--jega-blue-medium)] px-8 py-4 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-6 gap-10 h-full items-center py-6">
              {Array.from({ length: 18 }).map((_, i) => (
                <img key={i} src={logoSolo} alt="" className="w-14 h-14 object-contain mx-auto" />
              ))}
            </div>
          </div>
          
        <div className="relative z-10 text-center mb-6">
          <h2 className="text-2xl text-white mb-2">Proceso de Consultoría</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--jega-gold)] to-[var(--jega-gold-light)] mx-auto mt-2"></div>
        </div>
          
          <div className="relative z-10 grid md:grid-cols-4 gap-8">
            <ProcessStep
              number="01"
              icon={<Search className="w-8 h-8" />}
              title="Análisis"
              description="Evaluación de procesos y necesidades"
            />
            
            <ProcessStep
              number="02"
              icon={<Lightbulb className="w-8 h-8" />}
              title="Diseño"
              description="Solución personalizada y estratégica"
            />
            
            <ProcessStep
              number="03"
              icon={<Code className="w-8 h-8" />}
              title="Implementación"
              description="Desarrollo e instalación profesional"
            />
            
            <ProcessStep
              number="04"
              icon={<HeadphonesIcon className="w-8 h-8" />}
              title="Soporte"
              description="Acompañamiento continuo"
              isLast
            />
          </div>
        </section>

        {/* Pricing Section */}
        <PricingMessage />


        {/* Footer */}
        <footer className="relative bg-gradient-to-r from-[var(--jega-blue-dark)] to-[var(--jega-blue-medium)] px-8 py-3 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-8 h-full items-center">
              {Array.from({ length: 16 }).map((_, i) => (
                <img key={i} src={logoSolo} alt="" className="w-10 h-10 object-contain mx-auto" />
              ))}
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <a href="https://www.jegasolutions.co/" target="_blank" rel="noopener noreferrer">
                <img src={logoSolo} alt="JEGASolutions" className="h-8 hover:opacity-80 transition-opacity" />
              </a>
              <div className="text-[var(--jega-gold)] text-xs">
                Soluciones que nacen del corazón
              </div>
            </div>
            
            <div className="text-gray-400 text-xs text-center">
              © 2025 JEGASolutions — Todos los derechos reservados<br />
              <a href="https://www.jegasolutions.co/" target="_blank" rel="noopener noreferrer" className="text-[var(--jega-gold)] hover:underline">
                www.jegasolutions.co
              </a>
            </div>
          </div>
        </footer>
        
      </div>
      
      {/* PDF Export Button */}
      <PDFExportButton />
    </div>
  );
}