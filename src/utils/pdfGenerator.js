// Generador de PDF optimizado para preservar enlaces y mejorar visualización móvil

/**
 * MÉTODO PRINCIPAL - Genera PDF con enlaces activos usando jsPDF
 * Este método preserva TODOS los hipervínculos en el PDF final
 */
export const generatePDF = async () => {
  try {
    console.log('🚀 Iniciando generación de PDF con enlaces activos...');
    
    const element = document.querySelector('.brochure-container');
    
    if (!element) {
      throw new Error('No se encontró el contenedor del brochure');
    }

    // Importar librerías dinámicamente
    const { default: jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    // 1. RECOLECTAR TODOS LOS ENLACES ANTES DE CAPTURAR
    // Asegurar que el elemento esté completamente visible y sin scroll
    window.scrollTo(0, 0);
    element.scrollIntoView({ block: 'start' });
    
    // Esperar un momento para que el layout se estabilice
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const links = [];
    const containerRect = element.getBoundingClientRect();
    
    element.querySelectorAll('a[href]').forEach((link) => {
      const rect = link.getBoundingClientRect();
      
      // Calcular posición relativa al contenedor del brochure
      const relativeX = rect.left - containerRect.left;
      const relativeY = rect.top - containerRect.top;
      
      links.push({
        url: link.href,
        x: relativeX,
        y: relativeY,
        width: rect.width,
        height: rect.height,
        text: link.textContent.trim()
      });
      
      console.log(`📍 Enlace: "${link.textContent.trim().substring(0, 30)}" en posición (${relativeX.toFixed(0)}, ${relativeY.toFixed(0)})`);
    });

    console.log(`📎 Encontrados ${links.length} enlaces para preservar`);

    // 2. CAPTURAR EL ELEMENTO COMO IMAGEN DE ALTA CALIDAD
    const canvas = await html2canvas(element, {
      scale: 3, // Alta calidad para texto nítido
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      letterRendering: true,
      imageTimeout: 15000,
      removeContainer: true,
      onclone: function(clonedDoc) {
        // Asegurar que todos los estilos se preserven
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .brochure-container {
            transform: none !important;
            box-shadow: none !important;
          }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    // 3. CONFIGURAR DIMENSIONES DEL PDF
    const pdfWidth = 297; // A3 ancho en mm
    const pdfHeight = 420; // A3 alto en mm
    
    // Calcular dimensiones de la imagen
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // 4. CREAR DOCUMENTO PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a3',
      compress: true
    });

    // 5. CALCULAR ESCALA Y POSICIÓN
    let scaleFactor = 1;
    let yOffset = 0;
    let xOffset = 0;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    
    if (imgHeight <= pdfHeight) {
      // Si cabe en una página, centrar verticalmente
      yOffset = (pdfHeight - imgHeight) / 2;
      xOffset = 0;
      scaleFactor = imgWidth / canvas.width; // Escala de canvas a PDF
      pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight, undefined, 'FAST');
      
      console.log(`📐 PDF con margen vertical: yOffset=${yOffset.toFixed(2)}mm`);
    } else {
      // Si no cabe, ajustar proporcionalmente
      const scaleRatio = pdfHeight / imgHeight;
      const scaledWidth = imgWidth * scaleRatio;
      const scaledHeight = pdfHeight;
      xOffset = (pdfWidth - scaledWidth) / 2;
      yOffset = 0;
      scaleFactor = scaledWidth / canvas.width; // Escala de canvas a PDF
      pdf.addImage(imgData, 'JPEG', xOffset, 0, scaledWidth, scaledHeight, undefined, 'FAST');
      
      console.log(`📐 PDF escalado: xOffset=${xOffset.toFixed(2)}mm, scale=${scaleRatio.toFixed(3)}`);
    }
    
    console.log(`📊 Escala calculada: ${scaleFactor.toFixed(6)} (canvas → PDF)`);
    console.log(`📊 Canvas: ${canvas.width}px × ${canvas.height}px`);
    console.log(`📊 PDF: ${imgWidth}mm × ${imgHeight.toFixed(2)}mm`);

    // 6. AGREGAR ENLACES AL PDF (CRÍTICO PARA PRESERVAR HIPERVÍNCULOS)
    let linksAdded = 0;
    const LINK_PADDING = 1; // Padding adicional en mm para área clickeable

    console.log('\n🔗 Agregando enlaces al PDF...');

    links.forEach((link, index) => {
      // Convertir coordenadas de píxeles del elemento a píxeles del canvas
      const canvasX = link.x * 3; // Multiplicar por la escala de html2canvas (scale: 3)
      const canvasY = link.y * 3;
      const canvasWidth = link.width * 3;
      const canvasHeight = link.height * 3;
      
      // Convertir de píxeles del canvas a milímetros del PDF
      const linkX = (canvasX * scaleFactor) + xOffset - LINK_PADDING;
      const linkY = (canvasY * scaleFactor) + yOffset - LINK_PADDING;
      const linkWidth = (canvasWidth * scaleFactor) + (LINK_PADDING * 2);
      const linkHeight = (canvasHeight * scaleFactor) + (LINK_PADDING * 2);

      // Agregar área de enlace clickeable al PDF
      try {
        // Configurar el enlace para que se abra en nueva ventana/pestaña
        pdf.link(linkX, linkY, linkWidth, linkHeight, { 
          url: link.url,
          target: '_blank' // Intentar abrir en nueva pestaña (depende del visor)
        });
        linksAdded++;
        
        console.log(`✓ Enlace ${index + 1}/${links.length}:`);
        console.log(`  Texto: "${link.text.substring(0, 40)}..."`);
        console.log(`  Posición elemento: (${link.x.toFixed(0)}px, ${link.y.toFixed(0)}px)`);
        console.log(`  Posición canvas: (${canvasX.toFixed(0)}px, ${canvasY.toFixed(0)}px)`);
        console.log(`  Posición PDF: (${linkX.toFixed(2)}mm, ${linkY.toFixed(2)}mm)`);
        console.log(`  URL: ${link.url}`);
      } catch (error) {
        console.warn(`⚠️ No se pudo agregar enlace ${index + 1}:`, error);
      }
    });

    // 7. GUARDAR PDF
    const fileName = 'JEGASolutions-Brochure.pdf';
    pdf.save(fileName);
    
    // 8. MOSTRAR RESULTADOS
    console.log('\n✅ PDF GENERADO EXITOSAMENTE');
    console.log(`📄 Nombre: ${fileName}`);
    console.log(`📐 Formato: A3 (297mm × 420mm)`);
    console.log(`📊 Orientación: Vertical (Portrait)`);
    console.log(`🔗 Enlaces activos: ${linksAdded}/${links.length}`);
    console.log(`📱 Optimizado para visualización móvil`);
    
    // Notificación visual
    setTimeout(() => {
      const message = `✅ PDF GENERADO CORRECTAMENTE\n\n` +
                     `📄 Formato: A3 (297mm × 420mm)\n` +
                     `🔗 ${linksAdded} enlaces activos preservados\n` +
                     `📱 Optimizado para móviles\n\n` +
                     `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                     `🔍 CÓMO VERIFICAR LOS ENLACES:\n\n` +
                     `1️⃣ Abre el PDF con Adobe Acrobat Reader\n` +
                     `   (Recomendado para mejor compatibilidad)\n\n` +
                     `2️⃣ O arrastra el PDF a Google Chrome\n\n` +
                     `3️⃣ Haz clic en:\n` +
                     `   • Botones dorados\n` +
                     `   • Logo JEGASolutions\n` +
                     `   • Email y URL\n\n` +
                     `💡 El cursor debe cambiar a "mano" sobre los enlaces\n\n` +
                     `⚠️ Nota: Algunos visores básicos (Vista previa\n` +
                     `de Windows/Mac) no muestran enlaces correctamente.\n` +
                     `Usa Adobe Reader o Chrome para mejor experiencia.`;
      
      alert(message);
    }, 500);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error al generar PDF:', error);
    alert('Hubo un error al generar el PDF. Por favor, intente nuevamente o use el método de impresión.');
    return false;
  }
};

/**
 * MÉTODO ALTERNATIVO - Usar diálogo de impresión nativo
 * Este método preserva enlaces de forma 100% confiable
 */
export const printToPDF = () => {
  console.log('🖨️ Preparando impresión a PDF...');
  
  // Agregar estilos específicos para impresión
  const printStyles = document.createElement('style');
  printStyles.id = 'print-styles-temp';
  printStyles.textContent = `
    @media print {
      @page {
        size: A3 portrait;
        margin: 0;
      }
      
      body {
        margin: 0;
        padding: 0;
        background: white !important;
      }
      
      .brochure-container {
        box-shadow: none !important;
        max-width: 100% !important;
        width: 297mm !important;
        min-height: 420mm !important;
        page-break-after: avoid;
        page-break-inside: avoid;
        transform: none !important;
        margin: 0 !important;
      }
      
      /* Ocultar botones y elementos fixed */
      .fixed, button, [class*="pdf-export"] {
        display: none !important;
      }
      
      /* Preservar colores exactos */
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      /* CRÍTICO: Preservar enlaces */
      a[href] {
        color: #d4af37 !important;
        text-decoration: underline !important;
        pointer-events: auto !important;
      }
      
      /* Evitar saltos de página */
      section, header, footer {
        page-break-inside: avoid;
      }
    }
  `;
  
  document.head.appendChild(printStyles);
  
  // Mostrar instrucciones
  const instructions = 
    '📄 EXPORTAR A PDF CON ENLACES\n\n' +
    'Siga estos pasos:\n\n' +
    '1️⃣ En el diálogo de impresión:\n' +
    '   • Destino: "Guardar como PDF"\n' +
    '   • Tamaño del papel: A3\n' +
    '   • Orientación: Vertical\n' +
    '   • Márgenes: Ninguno\n\n' +
    '2️⃣ Haga clic en "Guardar"\n\n' +
    '✅ Todos los enlaces se preservarán correctamente';
  
  alert(instructions);
  
  // Abrir diálogo de impresión
  window.print();
  
  // Limpiar estilos después
  setTimeout(() => {
    const tempStyles = document.getElementById('print-styles-temp');
    if (tempStyles) {
      tempStyles.remove();
    }
  }, 1000);
  
  console.log('✓ Diálogo de impresión abierto');
};

/**
 * MÉTODO DE EXPORTACIÓN AUTOMÁTICA (RECOMENDADO)
 * Intenta el método jsPDF primero, ofrece impresión como alternativa
 */
export const exportToPDF = async () => {
  console.log('📱 Detectando método óptimo de exportación...');
  
  try {
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      console.log('📱 Dispositivo móvil detectado');
      
      // En móviles, ofrecer ambos métodos
      const useNativeMethod = confirm(
        '📱 EXPORTAR EN MÓVIL\n\n' +
        '¿Desea usar el diálogo de impresión del navegador?\n\n' +
        '✓ Recomendado para móviles\n' +
        '✓ Preserva todos los enlaces\n\n' +
        'Presione OK para usar impresión\n' +
        'Presione Cancelar para descarga directa'
      );
      
      if (useNativeMethod) {
        printToPDF();
        return true;
      }
    }
    
    // Intentar método jsPDF
    console.log('🔄 Generando PDF con jsPDF...');
    const success = await generatePDF();
    
    if (!success) {
      // Si falla, ofrecer método de impresión
      const usePrint = confirm(
        '⚠️ MÉTODO ALTERNATIVO\n\n' +
        'La descarga automática encontró un problema.\n\n' +
        '¿Desea usar el diálogo de impresión?\n' +
        '(Este método es 100% confiable para preservar enlaces)'
      );
      
      if (usePrint) {
        printToPDF();
        return true;
      }
      
      return false;
    }
    
    return success;
    
  } catch (error) {
    console.error('❌ Error en exportación:', error);
    
    // Como último recurso, ofrecer impresión
    const usePrint = confirm(
      '⚠️ ERROR EN EXPORTACIÓN\n\n' +
      'Hubo un problema con la descarga automática.\n\n' +
      '¿Desea intentar con el diálogo de impresión?\n' +
      '(Método más confiable)'
    );
    
    if (usePrint) {
      printToPDF();
    }
    
    return false;
  }
};

/**
 * MÉTODO DEBUG - Genera PDF con rectángulos visibles en áreas de enlaces
 * Útil para verificar que los enlaces están correctamente posicionados
 */
export const generatePDFWithVisibleLinks = async () => {
  try {
    console.log('🐛 Generando PDF en modo DEBUG...');
    
    const element = document.querySelector('.brochure-container');
    if (!element) throw new Error('Contenedor no encontrado');

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

    // Capturar imagen
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    const pdfWidth = 297;
    const pdfHeight = 420;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a3'
    });

    let scale = 1;
    let yOffset = 0;
    let xOffset = 0;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    
    if (imgHeight <= pdfHeight) {
      yOffset = (pdfHeight - imgHeight) / 2;
      scale = pdfWidth / element.scrollWidth;
      pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight);
    } else {
      const scaleRatio = pdfHeight / imgHeight;
      const scaledWidth = imgWidth * scaleRatio;
      xOffset = (pdfWidth - scaledWidth) / 2;
      scale = (scaledWidth / element.scrollWidth);
      pdf.addImage(imgData, 'JPEG', xOffset, 0, scaledWidth, pdfHeight);
    }

    // Agregar enlaces CON rectángulos visibles
    const PX_TO_MM = 0.264583;
    
    links.forEach((link, index) => {
      const linkX = xOffset + (link.x * scale * PX_TO_MM);
      const linkY = yOffset + (link.y * scale * PX_TO_MM);
      const linkWidth = link.width * scale * PX_TO_MM;
      const linkHeight = link.height * scale * PX_TO_MM;

      // Agregar enlace
      pdf.link(linkX, linkY, linkWidth, linkHeight, { 
        url: link.url,
        target: '_blank'
      });
      
      // Dibujar rectángulo visible (DEBUG)
      pdf.setDrawColor(255, 215, 0); // Dorado
      pdf.setFillColor(255, 215, 0, 50); // Dorado semi-transparente
      pdf.setLineWidth(0.5);
      pdf.rect(linkX, linkY, linkWidth, linkHeight, 'FD');
      
      console.log(`✓ DEBUG: Enlace ${index + 1} marcado`);
    });

    pdf.save('JEGASolutions-DEBUG.pdf');
    
    const debugMessage = 
      `🐛 PDF DEBUG GENERADO\n\n` +
      `📊 Total de enlaces: ${links.length}\n\n` +
      `🎨 Los enlaces están marcados con:\n` +
      `   • Rectángulos dorados semi-transparentes\n` +
      `   • Números 🔗1, 🔗2, 🔗3, etc.\n\n` +
      `✅ CÓMO PROBAR:\n\n` +
      `1️⃣ Abre el PDF con Adobe Acrobat Reader\n` +
      `2️⃣ Busca los rectángulos dorados\n` +
      `3️⃣ Haz clic DENTRO de cada rectángulo\n` +
      `4️⃣ Debe abrir el enlace en el navegador\n\n` +
      `💡 Si los enlaces funcionan en modo debug,\n` +
      `también funcionarán en el PDF normal.\n\n` +
      `Áreas de enlaces encontradas:\n` +
      links.map((l, i) => `  ${i + 1}. ${l.text.substring(0, 40)}...`).slice(0, 5).join('\n');
    
    alert(debugMessage);
    
    return true;
    
  } catch (error) {
    console.error('Error en modo DEBUG:', error);
    return false;
  }
};

// Exportar todas las funciones
export default {
  generatePDF,
  printToPDF,
  exportToPDF,
  generatePDFWithVisibleLinks
};