import { useState } from 'react';
import { Calculator, Users, Building2, Clock, FileText, Check } from 'lucide-react';
import { GoldButton } from './GoldButton';
import logoSolo from '../assets/logoSolo.png';

const formatCOP = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export function PricingSection() {
  const [deploymentType, setDeploymentType] = useState("saas");
  const [companySize, setCompanySize] = useState("small");
  const [employeeCount, setEmployeeCount] = useState(50);
  const [customEmployeeCount, setCustomEmployeeCount] = useState("");
  const [selectedModules, setSelectedModules] = useState({
    extraHours: false,
    reports: false,
  });

  // Precios reales
  const USD_TO_COP_RATE = 4026;
  
  const basePricingUSD = {
    saas: {
      micro: { min: 97, max: 139 },
      small: { min: 157, max: 189 },
      medium: { min: 199, max: 349 },
      large: { min: 499, max: 1999 },
    },
    onpremise: {
      micro: { license: 5000, maintenance: 0.2, implementation: 2000 },
      small: { license: 8000, maintenance: 0.22, implementation: 3000 },
      medium: { license: 15000, maintenance: 0.23, implementation: 5000 },
      large: { license: 25000, maintenance: 0.25, implementation: 8000 },
    },
  };

  const convertPricingToCOP = (pricingUSD, rate) => {
    const converted = JSON.parse(JSON.stringify(pricingUSD));
    for (const type in converted) {
      for (const size in converted[type]) {
        for (const key in converted[type][size]) {
          if (key !== "maintenance") {
            converted[type][size][key] *= rate;
          }
        }
      }
    }
    return converted;
  };

  const basePricing = convertPricingToCOP(basePricingUSD, USD_TO_COP_RATE);

  const moduleMultipliers = {
    extraHours: { saas: 1.0, onpremise: 1.0 },
    reports: { saas: 1.3, onpremise: 1.4 },
  };

  const companySizes = {
    micro: { label: "Micro (hasta 10 empleados)", range: [1, 10] },
    small: { label: "Pequeña (11-50 empleados)", range: [11, 50] },
    medium: { label: "Mediana (51-200 empleados)", range: [51, 200] },
    large: { label: "Grande (201+ empleados)", range: [201, 5000] },
  };

  const getCompanySizeForEmployees = (count) => {
    if (count <= 10) return "micro";
    if (count <= 50) return "small";
    if (count <= 200) return "medium";
    return "large";
  };

  const calculatePrice = () => {
    const selectedModulesCount = Object.values(selectedModules).filter(Boolean).length;
    if (selectedModulesCount === 0) {
      return { monthly: 0, annual: 0, setup: 0, total3Years: 0 };
    }

    const actualEmployeeCount = customEmployeeCount
      ? parseInt(customEmployeeCount) || 0
      : employeeCount;

    if (actualEmployeeCount <= 0) {
      return { monthly: 0, annual: 0, setup: 0, total3Years: 0 };
    }

    const sizeForPricing = getCompanySizeForEmployees(actualEmployeeCount);
    const pricing = basePricing[deploymentType][sizeForPricing];
    const sizeInfo = companySizes[sizeForPricing];

    let moduleMultiplier = 0;
    if (selectedModules.extraHours)
      moduleMultiplier += moduleMultipliers.extraHours[deploymentType];
    if (selectedModules.reports)
      moduleMultiplier += moduleMultipliers.reports[deploymentType];

    if (deploymentType === "saas") {
      const [minEmployees, maxEmployees] = sizeInfo.range;
      let monthlyPrice;

      if (actualEmployeeCount <= minEmployees) {
        monthlyPrice = pricing.min;
      } else if (actualEmployeeCount >= maxEmployees && sizeForPricing !== "large") {
        monthlyPrice = pricing.max;
      } else {
        const progress = (actualEmployeeCount - minEmployees) / (maxEmployees - minEmployees);
        monthlyPrice = pricing.min + (pricing.max - pricing.min) * progress;
      }

      monthlyPrice *= moduleMultiplier;
      const annualPrice = monthlyPrice * 12;
      const setupFee = 0; // Sin setup fee para simplificar

      return {
        monthly: Math.round(monthlyPrice),
        annual: Math.round(annualPrice),
        setup: setupFee,
        total3Years: Math.round(annualPrice * 3 + setupFee),
      };
    } else {
      const licensePrice = pricing.license * moduleMultiplier;
      const maintenanceAnnual = licensePrice * pricing.maintenance;
      const implementation = pricing.implementation;

      return {
        license: Math.round(licensePrice),
        maintenance: Math.round(maintenanceAnnual),
        implementation: Math.round(implementation),
        total3Years: Math.round(licensePrice + maintenanceAnnual * 3 + implementation),
      };
    }
  };

  const price = calculatePrice();

  const handleModuleChange = (module) => {
    setSelectedModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

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
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-white mb-2">Calculadora de Precios</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--jega-gold)] to-[var(--jega-gold-light)] mx-auto"></div>
          <p className="text-gray-300 mt-4">
            Personaliza tu solución según las necesidades de tu empresa
          </p>
        </div>

        {/* Banner de Precios Reales */}
        <div className="mb-8 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg shadow-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                 Calculadora interactiva con precios en pesos colombianos (COP).
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Panel Izquierdo - Configuración */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tipo de Despliegue */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                <Building2 className="w-5 h-5 text-[var(--jega-gold)]" />
                Tipo de Despliegue
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDeploymentType("saas")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    deploymentType === "saas"
                      ? "border-[var(--jega-gold)] bg-[var(--jega-gold)]/20 text-white"
                      : "border-white/30 text-white hover:border-[var(--jega-gold)]/50"
                  }`}
                >
                  <Building2 className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">SaaS</p>
                  <p className="text-sm opacity-80">Nube (mensual)</p>
                </button>
                <button
                  onClick={() => setDeploymentType("onpremise")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    deploymentType === "onpremise"
                      ? "border-[var(--jega-gold)] bg-[var(--jega-gold)]/20 text-white"
                      : "border-white/30 text-white hover:border-[var(--jega-gold)]/50"
                  }`}
                >
                  <Building2 className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">On-Premise</p>
                  <p className="text-sm opacity-80">Licencia perpetua</p>
                </button>
              </div>
            </div>

            {/* Tamaño de Empresa */}
            {deploymentType === "saas" && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-[var(--jega-gold)]" />
                  Tamaño de Empresa
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Número de empleados
                    </label>
                    <input
                      type="number"
                      value={customEmployeeCount || employeeCount}
                      onChange={(e) => setCustomEmployeeCount(e.target.value)}
                      min="1"
                      max="5000"
                      className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--jega-gold)] focus:border-transparent"
                      placeholder="Ingrese número de empleados"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(companySizes).map(([key, { label }]) => (
                      <button
                        key={key}
                        onClick={() => {
                          const representativeCounts = {
                            micro: 5,
                            small: 25,
                            medium: 100,
                            large: 500,
                          };
                          setCompanySize(key);
                          setEmployeeCount(representativeCounts[key]);
                          setCustomEmployeeCount("");
                        }}
                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                          companySize === key
                            ? "bg-[var(--jega-gold)] text-white border-[var(--jega-gold)]"
                            : "bg-white/10 text-white border-white/30 hover:border-[var(--jega-gold)]/50"
                        }`}
                      >
                        {label.split("(")[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Selección de Módulos */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                <FileText className="w-5 h-5 text-[var(--jega-gold)]" />
                Módulos Disponibles
              </h3>
              <div className="space-y-4">
                {/* Módulo Extra Hours */}
                <div
                  onClick={() => handleModuleChange("extraHours")}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedModules.extraHours
                      ? "border-[var(--jega-gold)] bg-[var(--jega-gold)]/20"
                      : "border-white/30 hover:border-[var(--jega-gold)]/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[var(--jega-gold)]" />
                        <h4 className="font-semibold text-lg text-white">
                          GestorHorasExtra
                        </h4>
                        {selectedModules.extraHours && (
                          <Check className="w-5 h-5 text-[var(--jega-gold)]" />
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        Control completo de horas extra, reportes automáticos y cumplimiento normativo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Módulo Reports */}
                <div
                  onClick={() => handleModuleChange("reports")}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedModules.reports
                      ? "border-[var(--jega-gold)] bg-[var(--jega-gold)]/20"
                      : "border-white/30 hover:border-[var(--jega-gold)]/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[var(--jega-gold)]" />
                        <h4 className="font-semibold text-lg text-white">
                          ReportBuilder con IA
                        </h4>
                        {selectedModules.reports && (
                          <Check className="w-5 h-5 text-[var(--jega-gold)]" />
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        Generación automática de reportes con IA, análisis de Excel y exportación multi-formato
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho - Resumen de Precio */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 sticky top-6">
              <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-white">
                <Calculator className="w-6 h-6 text-[var(--jega-gold)]" />
                Cotización
              </h3>

              {Object.values(selectedModules).some((v) => v) ? (
                <div className="space-y-6">
                  {/* Módulos Seleccionados */}
                  <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                    <h4 className="font-semibold text-sm text-white mb-2">
                      Módulos seleccionados:
                    </h4>
                    <div className="space-y-1 text-sm">
                      {selectedModules.extraHours && (
                        <div className="flex items-center gap-2 text-[var(--jega-gold)]">
                          <Check className="w-4 h-4" />
                          <span>GestorHorasExtra</span>
                        </div>
                      )}
                      {selectedModules.reports && (
                        <div className="flex items-center gap-2 text-[var(--jega-gold)]">
                          <Check className="w-4 h-4" />
                          <span>ReportBuilder con IA</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="bg-[var(--jega-gold)]/20 rounded-lg p-4 border-2 border-[var(--jega-gold)]">
                    {deploymentType === "saas" ? (
                      <div className="space-y-3">
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Mensual:</span>
                            <span className="font-bold text-xl text-white break-all">
                              {formatCOP(price.monthly)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[var(--jega-gold)]">
                            <span className="text-sm">Anual:</span>
                            <span className="font-semibold text-base break-all">
                              {formatCOP(price.annual)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-300">
                            <span>Setup único:</span>
                            <span className="break-all">{formatCOP(price.setup)}</span>
                          </div>
                        </div>
                        <hr className="my-2 border-[var(--jega-gold)]/30" />
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm font-semibold">Total 3 años:</span>
                            <span className="text-[var(--jega-gold)] font-bold text-base break-all">
                              {formatCOP(price.total3Years)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Licencia:</span>
                            <span className="font-bold text-xl text-white break-all">
                              {formatCOP(price.license)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Implementación:</span>
                            <span className="font-semibold text-base text-white break-all">
                              {formatCOP(price.implementation)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-300">
                            <span>Mantenimiento/año:</span>
                            <span className="break-all">{formatCOP(price.maintenance)}</span>
                          </div>
                        </div>
                        <hr className="my-2 border-[var(--jega-gold)]/30" />
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm font-semibold">Total 3 años:</span>
                            <span className="text-[var(--jega-gold)] font-bold text-base break-all">
                              {formatCOP(price.total3Years)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botón de Contacto */}
                  <div className="text-center">
                    <a href="https://www.jegasolutions.co/" target="_blank" rel="noopener noreferrer">
                      <GoldButton variant="outline">
                        Solicitar Cotización
                      </GoldButton>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎯</div>
                  <p className="text-gray-300">
                    Selecciona al menos un módulo para ver la cotización
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
