export function GoldButton({ children, variant = "solid", className = "", disabled = false, ...props }) {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    solid: disabled 
      ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
      : "bg-gradient-to-r from-[var(--jega-gold)] to-[var(--jega-gold-light)] text-white hover:shadow-lg hover:shadow-[var(--jega-gold)]/25 focus:ring-[var(--jega-gold)]",
    outline: disabled
      ? "border-2 border-gray-400 text-gray-400 cursor-not-allowed"
      : "border-2 border-[var(--jega-gold)] text-[var(--jega-gold)] hover:bg-[var(--jega-gold)] hover:text-white focus:ring-[var(--jega-gold)]"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

