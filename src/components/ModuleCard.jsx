export function ModuleCard({ icon, title, description, features, benefits, cta, ctaLink }) {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'}}>
      {/* Icon */}
      <div className="text-[var(--jega-blue-dark)] mb-2">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--jega-blue-dark)] mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 mb-3 leading-relaxed text-sm">
        {description}
      </p>
      
      {/* Features */}
      {features && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-[var(--jega-blue-dark)] mb-1">
            Características:
          </h4>
          <ul className="text-xs text-gray-600 space-y-0.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[var(--jega-gold)] mr-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Benefits */}
      {benefits && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-[var(--jega-blue-dark)] mb-1">
            Beneficios:
          </h4>
          <div className="flex flex-wrap gap-1">
            {benefits.map((benefit, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-[var(--jega-gold)]/10 text-[var(--jega-gold)] text-xs font-medium rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* CTA */}
      {cta && (
        <div className="mt-4 pt-4 border-t border-gray-100">
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

