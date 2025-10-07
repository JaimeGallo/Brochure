export function PricingMessage() {
  return (
    <section className="relative px-8 py-6 bg-gradient-to-r from-[var(--jega-blue-dark)] to-[var(--jega-blue-medium)] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-6 gap-10 h-full items-center py-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-14 h-14 mx-auto" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-6">
          <h2 className="text-2xl text-white mb-2">
            Precios competitivos que ofrecen un gran retorno de inversión en poco tiempo
          </h2>
          <p className="text-gray-200 text-base max-w-4xl mx-auto">
            Nuestras soluciones están diseñadas para generar ahorros significativos desde el primer mes, 
            con un ROI positivo que se refleja en la eficiencia operativa y la reducción de costos administrativos.
          </p>
        </div>

        {/* Cards ROI e Implementación */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* ROI Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[var(--jega-gold)] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-3">
              ROI Garantizado
            </h3>
            <p className="text-gray-200 text-center text-sm">
              Recupera tu inversión en menos de 6 meses gracias a la automatización y optimización de procesos.
            </p>
          </div>

          {/* Implementación Rápida Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[var(--jega-gold)] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-3">
              Implementación Rápida
            </h3>
            <p className="text-gray-200 text-center text-sm">
              Comienza a ver resultados desde el primer mes con nuestra implementación ágil y eficiente.
            </p>
          </div>
        </div>

        {/* Sección ¿Por qué elegir? */}
        <div className="bg-gradient-to-r from-[var(--jega-gold)] to-[var(--jega-gold-light)] rounded-lg p-6">
          <h3 className="text-2xl font-bold text-[var(--jega-blue-dark)] text-center mb-6">
            ¿Por qué elegir JEGASolutions?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {/* Columna izquierda */}
            <div>
              <div className="mb-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--jega-blue-dark)] text-xl leading-none" style={{ marginTop: '0.1em' }}>•</span>
                  <span className="text-[var(--jega-blue-dark)] font-medium flex-1">
                    Reducción del 70% en tiempo de gestión administrativa
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--jega-blue-dark)] text-xl leading-none" style={{ marginTop: '0.1em' }}>•</span>
                  <span className="text-[var(--jega-blue-dark)] font-medium flex-1">
                    Eliminación de errores manuales y reprocesos
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--jega-blue-dark)] text-xl leading-none" style={{ marginTop: '0.1em' }}>•</span>
                  <span className="text-[var(--jega-blue-dark)] font-medium flex-1">
                    Cumplimiento normativo automático
                  </span>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div>
              <div className="mb-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--jega-blue-dark)] text-xl leading-none" style={{ marginTop: '0.1em' }}>•</span>
                  <span className="text-[var(--jega-blue-dark)] font-medium flex-1">
                    Ahorro promedio de $2-5 millones COP mensuales
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--jega-blue-dark)] text-xl leading-none" style={{ marginTop: '0.1em' }}>•</span>
                  <span className="text-[var(--jega-blue-dark)] font-medium flex-1">
                    Reportes automáticos con IA
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--jega-blue-dark)] text-xl leading-none" style={{ marginTop: '0.1em' }}>•</span>
                  <span className="text-[var(--jega-blue-dark)] font-medium flex-1">
                    Soporte técnico especializado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Llamado a la acción */}
        <div className="text-center mt-6">
          <p className="text-gray-300 text-sm mb-4">
            Comienza a transformar tus procesos hoy mismo
          </p>
          <a 
            href="https://www.jegasolutions.co/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[var(--jega-gold)] hover:bg-[var(--jega-gold-light)] text-[var(--jega-blue-dark)] font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Solicita Cotización Personalizada
          </a>
        </div>
      </div>
    </section>
  );
}