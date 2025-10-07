import { Building2, Users, Clock, FileText, Check } from 'lucide-react';
import { GoldButton } from './GoldButton';
import logoSolo from '../assets/logoSolo.png';

const formatCOP = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export function StaticPricingTable() {
  // Precios de ejemplo para diferentes tamaños de empresa
  const pricingData = {
    saas: {
      micro: { monthly: 390000, annual: 4680000, setup: 0 },
      small: { monthly: 632000, annual: 7584000, setup: 0 },
      medium: { monthly: 801000, annual: 9612000, setup: 0 },
      large: { monthly: 2009000, annual: 24108000, setup: 0 }
    },
    onpremise: {
      micro: { license: 20130000, implementation: 8052000, maintenance: 4026000 },
      small: { license: 32208000, implementation: 12078000, maintenance: 7086000 },
      medium: { license: 60390000, implementation: 20130000, maintenance: 13890000 },
      large: { license: 100650000, implementation: 32208000, maintenance: 25160000 }
    }
  };

  const companySizes = [
    { key: 'micro', label: 'Micro', range: '1-10 empleados', icon: Users },
    { key: 'small', label: 'Pequeña', range: '11-50 empleados', icon: Users },
    { key: 'medium', label: 'Mediana', range: '51-200 empleados', icon: Users },
    { key: 'large', label: 'Grande', range: '201+ empleados', icon: Users }
  ];

  const modules = [
    {
      name: 'GestorHorasExtra',
      description: 'Control completo de horas extra, reportes automáticos y cumplimiento normativo',
      icon: Clock,
      color: 'text-green-400'
    },
    {
      name: 'ReportBuilder con IA',
      description: 'Generación automática de reportes con IA, análisis de Excel y exportación multi-formato',
      icon: FileText,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="relative bg-[var(--jega-blue-dark)] px-10 py-12 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-5 gap-12 h-full items-center py-8">
          {Array.from({ length: 15 }).map((_, i) => (
            <img key={i} src={logoSolo} alt="" className="w-16 h-16 object-contain mx-auto" />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-white mb-2">Tabla de Precios</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--jega-gold)] to-[var(--jega-gold-light)] mx-auto"></div>
          <p className="text-gray-300 mt-4">
            Precios transparentes para cada tamaño de empresa
          </p>
        </div>

        {/* Banner de Precios */}
        <div className="mb-8 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg shadow-md">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>💰 PRECIOS TRANSPARENTES:</strong> Precios fijos en pesos colombianos (COP) según el tamaño de tu empresa.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* SaaS Pricing */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-[var(--jega-gold)]" />
              <h3 className="text-2xl font-bold text-white">SaaS - Nube (Mensual)</h3>
            </div>
            
            <div className="space-y-4">
              {companySizes.map(({ key, label, range, icon: Icon }) => (
                <div key={key} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-[var(--jega-gold)]" />
                      <span className="font-semibold text-white">{label}</span>
                    </div>
                    <span className="text-sm text-gray-300">{range}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Mensual:</span>
                        <span className="font-bold text-white">{formatCOP(pricingData.saas[key].monthly)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Anual:</span>
                        <span className="font-semibold text-[var(--jega-gold)]">{formatCOP(pricingData.saas[key].annual)}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Setup:</span>
                        <span className="text-gray-300">{formatCOP(pricingData.saas[key].setup)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">3 años:</span>
                        <span className="font-bold text-[var(--jega-gold)]">{formatCOP(pricingData.saas[key].annual * 3)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* On-Premise Pricing */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-[var(--jega-gold)]" />
              <h3 className="text-2xl font-bold text-white">On-Premise - Licencia Perpetua</h3>
            </div>
            
            <div className="space-y-4">
              {companySizes.map(({ key, label, range, icon: Icon }) => (
                <div key={key} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-[var(--jega-gold)]" />
                      <span className="font-semibold text-white">{label}</span>
                    </div>
                    <span className="text-sm text-gray-300">{range}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Licencia:</span>
                        <span className="font-bold text-white">{formatCOP(pricingData.onpremise[key].license)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Implementación:</span>
                        <span className="font-semibold text-[var(--jega-gold)]">{formatCOP(pricingData.onpremise[key].implementation)}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Mantenimiento/año:</span>
                        <span className="text-gray-300">{formatCOP(pricingData.onpremise[key].maintenance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">3 años:</span>
                        <span className="font-bold text-[var(--jega-gold)]">{formatCOP(pricingData.onpremise[key].license + pricingData.onpremise[key].implementation + (pricingData.onpremise[key].maintenance * 3))}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Módulos Disponibles */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-[var(--jega-gold)]" />
            Módulos Disponibles
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <module.icon className={`w-6 h-6 ${module.color}`} />
                  <h4 className="font-semibold text-lg text-white">{module.name}</h4>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{module.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <div className="bg-[var(--jega-gold)]/20 rounded-lg p-6 border-2 border-[var(--jega-gold)]">
            <h3 className="text-xl font-bold text-white mb-2">¿Listo para comenzar?</h3>
            <p className="text-gray-300 mb-4">
              Contacta con nosotros para una cotización personalizada
            </p>
            <a href="https://www.jegasolutions.co/" target="_blank" rel="noopener noreferrer">
              <GoldButton variant="outline">
                Solicitar Cotización Personalizada
              </GoldButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
