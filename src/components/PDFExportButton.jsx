import { useState } from 'react';
import { Download, Printer, FileText, Bug } from 'lucide-react';
import { exportToPDF, printToPDF, generatePDFWithVisibleLinks } from '../utils/pdfGenerator';

export function PDFExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleExport = async (method = 'auto') => {
    setIsExporting(true);
    setShowOptions(false);
    
    try {
      let success = false;
      
      switch (method) {
        case 'auto':
          success = await exportToPDF();
          break;
        case 'print':
          printToPDF();
          success = true;
          break;
        case 'debug':
          success = await generatePDFWithVisibleLinks();
          break;
        default:
          success = await exportToPDF();
      }
      
      if (success) {
        console.log('✓ Exportación completada');
      }
    } catch (error) {
      console.error('Error en exportación:', error);
      alert('Hubo un error al generar el PDF. Por favor intenta el método de impresión.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]" style={{ position: 'fixed' }}>
      {/* Opciones de exportación */}
      {showOptions && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[240px]">
          <button
            onClick={() => handleExport('auto')}
            disabled={isExporting}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 transition-colors disabled:opacity-50"
          >
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-sm">Descarga Automática ⭐</div>
              <div className="text-xs text-gray-500">Recomendado - Con enlaces activos</div>
            </div>
          </button>
          
          <button
            onClick={() => handleExport('print')}
            disabled={isExporting}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 transition-colors disabled:opacity-50"
          >
            <Printer className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-sm">Imprimir a PDF</div>
              <div className="text-xs text-gray-500">100% confiable en móviles</div>
            </div>
          </button>
          
          <button
            onClick={() => handleExport('debug')}
            disabled={isExporting}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors disabled:opacity-50"
          >
            <Bug className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-sm">Modo Debug</div>
              <div className="text-xs text-gray-500">Ver áreas de enlaces</div>
            </div>
          </button>
        </div>
      )}

      {/* Botones principales */}
      <div className="flex gap-2 flex-col sm:flex-row">
        {/* Botón principal - Más grande en móviles */}
        <button
          onClick={() => handleExport('auto')}
          disabled={isExporting}
          className="bg-gradient-to-r from-[#0a2540] to-[#1e4d7b] text-white px-4 sm:px-6 py-3 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed min-h-[50px] sm:min-h-auto"
        >
          {isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm sm:text-base">Generando...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span className="text-sm sm:text-base">Descargar PDF</span>
            </>
          )}
        </button>

        {/* Botón de opciones */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          disabled={isExporting}
          className="bg-gradient-to-r from-[#0a2540] to-[#1e4d7b] text-white px-3 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[50px] sm:min-h-auto flex items-center justify-center"
          title="Más opciones"
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${showOptions ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Indicador de características */}
      {!isExporting && (
        <div className="absolute -top-12 right-0 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg flex items-center gap-2 whitespace-nowrap">
          <span className="hidden sm:inline">📄 A3</span>
          <span>🔗 Enlaces</span>
          <span className="hidden sm:inline">📱 Móvil</span>
        </div>
      )}
      
      {/* Ayuda flotante para móviles */}
      {!showOptions && !isExporting && (
        <div className="absolute -top-32 right-0 left-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto transition-opacity">
          <div className="font-semibold mb-1">✨ PDF con Enlaces Activos</div>
          <div className="text-gray-300 space-y-1">
            <div>• Formato A3 (297×420mm)</div>
            <div>• Todos los hipervínculos funcionales</div>
            <div>• Optimizado para móviles</div>
          </div>
          <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}