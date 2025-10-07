
export function ModuleCard({ icon, title, description, features, benefits, cta, ctaLink }) {
  return (
    <div 
      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-2xl p-4 border-2 border-gray-300 hover:shadow-2xl hover:border-[var(--jega-gold)]/50 transition-all duration-300" 
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#f8f9fa'
      }}
    >
      {/* Icon */}
      <div className="text-[var(--jega-gold)] mb-2">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--jega-blue-dark)] mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-800 mb-3 leading-relaxed text-sm font-semibold">
        {description}
      </p>
      
      {/* Features */}
      {features && (
        <div className="mb-3 bg-gradient-to-r from-[var(--jega-blue-dark)] to-[var(--jega-blue-medium)] rounded-md p-3 border border-[var(--jega-blue-light)] shadow-md">
          <h4 className="text-xs font-bold text-white mb-1.5">
            Características:
          </h4>
          <ul className="text-xs text-white space-y-0.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[var(--jega-gold)] mr-1 font-bold">•</span>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Benefits */}
      {benefits && (
        <div className="mb-3 bg-gradient-to-r from-[#b8941f] to-[#d4af37] rounded-md p-3 border border-[var(--jega-gold-light)] shadow-md">
          <h4 className="text-xs font-bold text-white mb-1.5">
            Beneficios:
          </h4>
          <ul className="text-xs text-white space-y-0.5">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[var(--jega-blue-dark)] mr-1 font-bold">•</span>
                <span className="font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* CTA */}
      {cta && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          {ctaLink ? (
            <a href={ctaLink}>
              <button className="w-full bg-gradient-to-r from-[var(--jega-gold)] to-[var(--jega-gold-light)] text-white font-semibold py-2 px-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                {cta}
              </button>
            </a>
          ) : (
            <button className="w-full bg-gradient-to-r from-[var(--jega-gold)] to-[var(--jega-gold-light)] text-white font-semibold py-2 px-4 rounded-lg hover:shadow-md transition-shadow duration-200">
              {cta}
            </button>
          )}
        </div>
      )}
    </div>
  );
}