// Script optimizado para generar PDF en formato A3 con enlaces funcionales
import html2pdf from 'html2pdf.js';

/**
 * Genera PDF con todo el contenido en una sola página A3
 * NOTA: Este método NO preserva hipervínculos perfectamente
 */
export const generatePDF = async () => {
  try {
    const element = document.querySelector('.brochure-container');
    
    if (!element) {
      throw new Error('No se encontró el contenedor del brochure');
    }

    // Calcular la escala necesaria para ajustar a una página A3
    const a3HeightMM = 420; // A3 altura en mm
    const a3WidthMM = 297;  // A3 ancho en mm
    
    // Obtener dimensiones del elemento
    const elementHeight = element.scrollHeight;
    const elementWidth = element.scrollWidth;
    
    // Calcular escala necesaria (con margen de seguridad)
    const scaleHeight = (a3HeightMM * 3.7795275591) / elementHeight; // 3.779 px/mm aprox
    const scaleWidth = (a3WidthMM * 3.7795275591) / elementWidth;
    const optimalScale = Math.min(scaleHeight, scaleWidth) * 0.95; // 95% para margen

    console.log('Dimensiones:', { elementHeight, elementWidth, optimalScale });

    const opt = {
      margin: 0,
      filename: 'JEGASolutions-Brochure.pdf',
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: optimalScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: elementWidth,
        windowHeight: elementHeight,
        onclone: function(clonedDoc) {
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .brochure-container {
              transform-origin: top left;
              box-shadow: none !important;
            }
            /* Preservar colores y estilos */
            a[href] {
              color: #d4af37 !important;
            }
          `;
          clonedDoc.head.appendChild(style);
          
          // Remover sombras del contenedor para PDF más limpio
          const container = clonedDoc.querySelector('.brochure-container');
          if (container) {
            container.style.boxShadow = 'none';
          }
        }
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a3', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { 
        mode: 'avoid-all'
      }
    };

    await html2pdf().set(opt).from(element).save();
    
    console.log('✓ PDF generado exitosamente');
    console.log('📄 Formato: A3 (297mm x 420mm)');
    console.log('📐 Orientación: Portrait (Vertical)');
    console.log('⚠️ Nota: Este método puede no preservar todos los hipervínculos');
    
    return true;
    
  } catch (error) {
    console.error('✗ Error al generar PDF:', error);
    return false;
  }
};

/**
 * Genera PDF con jsPDF directamente - PRESERVA ENLACES
 * Este es el método RECOMENDADO para mantener hipervínculos funcionales
 */
export const generatePDFDirect = async () => {
  try {
    const element = document.querySelector('.brochure-container');
    
    if (!element) {
      throw new Error('No se encontró el contenedor del brochure');
    }

    // Importar jsPDF y html2canvas dinámicamente
    const { default: jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    // Recolectar todos los enlaces ANTES de capturar
    const links = [];
    element.querySelectorAll('a[href]').forEach((link) => {
      const rect = link.getBoundingClientRect();
      const containerRect = element.getBoundingClientRect();
      
      links.push({
        url: link.href,
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height,
        text: link.textContent.trim()
      });
    });

    console.log(`📎 ${links.length} enlaces encontrados para preservar`);

    // Capturar el elemento como canvas
    const canvas = await html2canvas(element, {
      scale: 2.5, // Aumentar escala para mejor calidad de texto
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      letterRendering: true, // Mejor renderizado de texto
      allowTaint: false,
      imageTimeout: 15000,
      removeContainer: true,
      ignoreElements: function(element) {
        // No ignorar ningún elemento
        return false;
      },
      onclone: function(clonedDoc) {
        // Asegurar que los z-index se preserven
        const elementsWithZIndex = clonedDoc.querySelectorAll('[style*="zIndex"]');
        elementsWithZIndex.forEach(el => {
          const zIndex = el.style.zIndex;
          if (zIndex) {
            el.style.zIndex = zIndex;
            el.style.position = 'absolute';
          }
        });
      }
    });

    // Dimensiones A3 en mm
    const pdfWidth = 297;
    const pdfHeight = 420;

    // Calcular dimensiones de la imagen
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Crear PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a3',
      compress: true
    });

    // Calcular escala para los enlaces
    let scale = 1;
    let yOffset = 0;
    let xOffset = 0;

    // Agregar imagen al PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    if (imgHeight <= pdfHeight) {
      // Si cabe en una página, centrarlo verticalmente
      yOffset = (pdfHeight - imgHeight) / 2;
      scale = pdfWidth / element.scrollWidth;
      pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight);
    } else {
      // Si no cabe, ajustar proporcionalmente
      const scaleRatio = pdfHeight / imgHeight;
      const scaledWidth = imgWidth * scaleRatio;
      const scaledHeight = pdfHeight;
      xOffset = (pdfWidth - scaledWidth) / 2;
      scale = (scaledWidth / element.scrollWidth);
      pdf.addImage(imgData, 'JPEG', xOffset, 0, scaledWidth, scaledHeight);
    }

    // AGREGAR ENLACES AL PDF (esto es lo importante!)
    let linksAdded = 0;
    links.forEach((link, index) => {
      const linkX = xOffset + (link.x * scale * 0.264583); // Convertir px a mm
      const linkY = yOffset + (link.y * scale * 0.264583);
      const linkWidth = link.width * scale * 0.264583;
      const linkHeight = link.height * scale * 0.264583;

      // Agregar el enlace al PDF
      pdf.link(linkX, linkY, linkWidth, linkHeight, { url: link.url });
      
      // OPCIONAL: Dibujar un rectángulo semi-transparente para visualizar el área del enlace
      // Descomenta las siguientes líneas si quieres ver dónde están los enlaces
      // pdf.setDrawColor(255, 215, 0); // Color dorado
      // pdf.setLineWidth(0.5);
      // pdf.rect(linkX, linkY, linkWidth, linkHeight);
      
      linksAdded++;
      console.log(`✓ Enlace ${index + 1}/${links.length}: "${link.text}" → ${link.url}`);
      console.log(`  Posición: X=${linkX.toFixed(2)}mm, Y=${linkY.toFixed(2)}mm, W=${linkWidth.toFixed(2)}mm, H=${linkHeight.toFixed(2)}mm`);
    });

    console.log(`\n📎 Total de enlaces agregados al PDF: ${linksAdded}/${links.length}`);

    // Guardar PDF
    pdf.save('JEGASolutions-Brochure.pdf');
    
    console.log('✓ PDF generado exitosamente con jsPDF');
    console.log(`📎 ${links.length} enlaces preservados en el PDF`);
    console.log('📄 Formato: A3 (297mm x 420mm)');
    console.log('📐 Orientación: Portrait (Vertical)');
    
    // Mostrar notificación
    setTimeout(() => {
      alert(`✓ PDF generado en formato A3 con ${links.length} enlaces funcionales\n\nTamaño: 297mm × 420mm\nOrientación: Vertical\n\n✓ Todos los hipervínculos están activos`);
    }, 500);
    
    return true;
    
  } catch (error) {
    console.error('✗ Error al generar PDF con jsPDF:', error);
    return false;
  }
};

/**
 * Método usando window.print() - PRESERVA ENLACES PERFECTAMENTE
 * Este método abre el diálogo de impresión nativo del navegador
 * RECOMENDADO ESPECIALMENTE para preservar hipervínculos
 */
export const printToPDF = () => {
  // Agregar estilos específicos para impresión
  const printStyles = document.createElement('style');
  printStyles.id = 'print-styles';
  printStyles.textContent = `
    @media print {
      @page {
        size: A3 portrait;
        margin: 0;
      }
      
      body {
        margin: 0;
        padding: 0;
      }
      
      .brochure-container {
        box-shadow: none !important;
        max-width: 100% !important;
        width: 297mm !important;
        height: 420mm !important;
        page-break-after: avoid;
        page-break-inside: avoid;
      }
      
      /* Ocultar el botón de exportar PDF */
      .fixed, button {
        display: none !important;
      }
      
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      /* PRESERVAR ENLACES - MUY IMPORTANTE */
      a[href] {
        color: #d4af37 !important;
        text-decoration: underline !important;
        pointer-events: auto !important;
      }
      
      /* Ajustar todo el contenido */
      section {
        page-break-inside: avoid;
      }
    }
  `;
  
  document.head.appendChild(printStyles);
  
  console.log('📄 Abriendo diálogo de impresión...');
  console.log('💡 Consejo: Selecciona "Guardar como PDF" como destino');
  console.log('📎 Los enlaces se preservarán automáticamente');
  
  // Mostrar instrucciones antes de abrir el diálogo
  alert('📄 Exportar a PDF con enlaces funcionales\n\n' +
        '1. En el diálogo que se abrirá, selecciona:\n' +
        '   - Destino: "Guardar como PDF"\n' +
        '   - Tamaño: A3\n' +
        '   - Orientación: Vertical\n\n' +
        '2. Haz clic en "Guardar"\n\n' +
        '✓ Todos los enlaces se preservarán correctamente');
  
  // Abrir diálogo de impresión
  window.print();
  
  // Limpiar estilos después de cerrar el diálogo
  setTimeout(() => {
    const styles = document.getElementById('print-styles');
    if (styles) {
      styles.remove();
    }
  }, 1000);
};

/**
 * Función principal que usa el mejor método para preservar enlaces
 * Prioriza generatePDFDirect que preserva enlaces automáticamente
 */
export const exportToPDF = async () => {
  console.log('Iniciando exportación a PDF con enlaces...');
  
  try {
    // Usar el método directo que preserva enlaces
    const success = await generatePDFDirect();
    
    if (!success) {
      console.log('Intentando método alternativo...');
      // Si falla, ofrecer window.print que también preserva enlaces
      const usePrint = confirm(
        'Hubo un problema con la exportación automática.\n\n' +
        '¿Desea usar el diálogo de impresión del navegador?\n' +
        'Este método preserva todos los enlaces correctamente.\n\n' +
        'Consejo: Seleccione "Guardar como PDF" como destino.'
      );
      
      if (usePrint) {
        printToPDF();
        return true;
      }
      
      return false;
    }
    
    return success;
  } catch (error) {
    console.error('Error en exportación:', error);
    
    // Como último recurso, ofrecer window.print
    const usePrint = confirm(
      'Hubo un problema con la exportación automática.\n\n' +
      '¿Desea usar el diálogo de impresión del navegador?\n' +
      'Este método preserva todos los enlaces correctamente.\n\n' +
      'Consejo: Seleccione "Guardar como PDF" como destino.'
    );
    
    if (usePrint) {
      printToPDF();
    }
    
    return false;
  }
};
/**
 * MODO DEBUG: Genera PDF con rectángulos visuales en las áreas de enlaces
 * Útil para verificar que los enlaces están correctamente posicionados
 */
export const generatePDFWithVisibleLinks = async () => {
  try {
    const element = document.querySelector('.brochure-container');
    
    if (!element) {
      throw new Error('No se encontró el contenedor del brochure');
    }

    const { default: jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    // Recolectar enlaces
    const links = [];
    element.querySelectorAll('a[href]').forEach((link) => {
      const rect = link.getBoundingClientRect();
      const containerRect = element.getBoundingClientRect();
      
      links.push({
        url: link.href,
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height,
        text: link.textContent.trim()
      });
    });

    console.log(`📎 ${links.length} enlaces encontrados`);

    // Capturar como imagen
    const canvas = await html2canvas(element, {
      scale: 2.5, // Aumentar escala para mejor calidad de texto
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      letterRendering: true, // Mejor renderizado de texto
      allowTaint: false,
      imageTimeout: 15000,
      removeContainer: true
    });

    const pdfWidth = 297;
    const pdfHeight = 420;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a3',
      compress: true
    });

    let scale = 1;
    let yOffset = 0;
    let xOffset = 0;

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    if (imgHeight <= pdfHeight) {
      yOffset = (pdfHeight - imgHeight) / 2;
      scale = pdfWidth / element.scrollWidth;
      pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight);
    } else {
      const scaleRatio = pdfHeight / imgHeight;
      const scaledWidth = imgWidth * scaleRatio;
      const scaledHeight = pdfHeight;
      xOffset = (pdfWidth - scaledWidth) / 2;
      scale = (scaledWidth / element.scrollWidth);
      pdf.addImage(imgData, 'JPEG', xOffset, 0, scaledWidth, scaledHeight);
    }

    // Agregar enlaces CON rectángulos visibles
    links.forEach((link, index) => {
      const linkX = xOffset + (link.x * scale * 0.264583);
      const linkY = yOffset + (link.y * scale * 0.264583);
      const linkWidth = link.width * scale * 0.264583;
      const linkHeight = link.height * scale * 0.264583;

      // Agregar el enlace
      pdf.link(linkX, linkY, linkWidth, linkHeight, { url: link.url });
      
      // DIBUJAR RECTÁNGULO VISIBLE (modo debug)
      pdf.setDrawColor(255, 215, 0); // Dorado
      pdf.setFillColor(255, 215, 0, 0.2); // Dorado semi-transparente
      pdf.setLineWidth(1);
      pdf.rect(linkX, linkY, linkWidth, linkHeight, 'S');
      
      console.log(`✓ Enlace ${index + 1}: "${link.text}" → ${link.url}`);
    });

    pdf.save('JEGASolutions-Brochure-DEBUG.pdf');
    
    console.log('✓ PDF DEBUG generado con rectángulos visibles en los enlaces');
    alert(`✓ PDF DEBUG generado\n\n${links.length} enlaces están marcados con rectángulos dorados.\n\nPrueba hacer clic dentro de los rectángulos dorados.`);
    
    return true;
    
  } catch (error) {
    console.error('Error al generar PDF debug:', error);
    return false;
  }
};
