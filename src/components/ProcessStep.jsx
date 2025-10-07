export function ProcessStep({ number, icon, title, description, isLast = false }) {
  return (
    <div className="relative text-center">
      {/* Icon only - sin números */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--jega-gold)] to-[var(--jega-gold-light)] rounded-full flex items-center justify-center text-white shadow-lg">
          {/* Icon centered */}
          <div className="flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-200 text-sm leading-relaxed">
        {description}
      </p>
      
      {/* Connector line (except for last step) */}
      {!isLast && (
        <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-[var(--jega-gold)]/30"></div>
      )}
    </div>
  );
}