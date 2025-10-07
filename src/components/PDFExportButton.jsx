import { useState } from 'react';
import { Download, Printer, FileText } from 'lucide-react';
import { exportToPDF, printToPDF, generatePDF } from '../utils/pdfGenerator';

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
           success = await generatePDF();
           break;
         case 'direct':
           success = await generatePDF();
           break;
         case 'print':
           printToPDF();
           success = true;
           break;
         default:
           success = await generatePDF();
       }
      
      if (success) {
        console.log('✓ Exportación completada');
        console.log('📄 Formato del PDF: A3 (297mm x 420mm)');
      }
    } catch (error) {
      console.error('Error en exportación:', error);
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]" style={{ position: 'fixed' }}>
      {/* Opciones de exportación */}
      {showOptions && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[220px]">
          <button
            onClick={() => handleExport('auto')}
            disabled={isExporting}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <div>
              <div className="font-medium text-sm">PDF con Enlaces ✓</div>
              <div className="text-xs text-gray-500">Recomendado - jsPDF</div>
            </div>
          </button>
          
          <button
            onClick={() => handleExport('direct')}
            disabled={isExporting}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 transition-colors"
          >
            <Download className="w-4 h-4 text-green-600" />
            <div>
              <div className="font-medium text-sm">PDF Directo ✓</div>
              <div className="text-xs text-gray-500">Con hipervínculos</div>
            </div>
          </button>
          
           <button
             onClick={() => handleExport('print')}
             disabled={isExporting}
             className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
           >
             <Printer className="w-4 h-4 text-purple-600" />
             <div>
               <div className="font-medium text-sm">Imprimir a PDF ✓</div>
               <div className="text-xs text-gray-500">100% enlaces funcionales</div>
             </div>
           </button>
        </div>
      )}

      {/* Botón principal */}
      <div className="flex gap-2">
        <button
          onClick={() => handleExport('auto')}
          disabled={isExporting}
          className="bg-gradient-to-r from-[#0a2540] to-[#1e4d7b] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generando PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Descargar PDF</span>
            </>
          )}
        </button>

        {/* Botón de opciones */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          disabled={isExporting}
          className="bg-gradient-to-r from-[#0a2540] to-[#1e4d7b] text-white px-3 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Tooltip informativo */}
      {!showOptions && !isExporting && (
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          A3 (297×420mm) con enlaces funcionales ✓
          <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
      
      {/* Indicador de formato en la esquina */}
      <div className="absolute -top-10 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg flex items-center gap-1">
        📄 A3 · 🔗 Enlaces
      </div>
    </div>
  );
}