import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { CATEGORY_ORDER, PRODUCT_CATEGORIES } from '../data/products';

const INSTAGRAM_URL = 'https://www.instagram.com/thedavidestudio/';
const TIKTOK_URL = 'https://www.tiktok.com/@thedavidestudio';
const WHATSAPP_NUMBER = '393249217969';

export async function generatePDF({ clientData, selectedProducts, instructions, flowCutNotes }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Colori (RGB 0-255)
  const gold = [201, 169, 98];
  const anthracite = [44, 44, 44];

  // --- HEADER ---
  doc.setFontSize(24);
  doc.setTextColor(...gold);
  doc.setFont('helvetica', 'bold');
  doc.text('Davide Studio - Marsala', pageWidth / 2, y, { align: 'center' });
  y += 15;

  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.setFont('helvetica', 'normal');
  doc.text('Atelier del Riccio', pageWidth / 2, y, { align: 'center' });
  y += 20;

  // --- TITOLO ---
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  const clientName = [clientData.firstName, clientData.lastName].filter(Boolean).join(' ') || 'Cliente';
  doc.text(`Il tuo Rituale di Bellezza a Casa`, pageWidth / 2, y, { align: 'center' });
  y += 8;
  doc.setFontSize(14);
  doc.setTextColor(...gold);
  doc.text(clientName, pageWidth / 2, y, { align: 'center' });
  y += 15;

  if (clientData.date) {
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data: ${clientData.date}`, pageWidth / 2, y, { align: 'center' });
    y += 12;
  }

  y += 5;

  // --- CORPO: Prodotti per categoria ---
  doc.setFont('helvetica', 'normal');
  const productsByCategory = {};
  selectedProducts.forEach((p) => {
    if (!productsByCategory[p.category]) productsByCategory[p.category] = [];
    productsByCategory[p.category].push(p);
  });

  for (const categoryKey of CATEGORY_ORDER) {
    const products = productsByCategory[categoryKey];
    if (!products?.length) continue;

    const categoryLabel = categoryKey.replace(/_/g, ' ');
    const subtitle = PRODUCT_CATEGORIES[categoryKey] || '';

    // Controllo pagina
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.text(categoryLabel, margin, y);
    y += 6;

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'italic');
    doc.text(subtitle, margin, y);
    y += 8;

    for (const product of products) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const instr = instructions[product.id] ?? product.instructions;
      const lines = doc.splitTextToSize(`${product.name} (${product.brand})`, pageWidth - 2 * margin - 5);
      const instrLines = doc.splitTextToSize(instr, pageWidth - 2 * margin - 5);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(lines, margin, y);
      y += lines.length * 5 + 2;

      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');
      doc.text(instrLines, margin + 2, y);
      y += instrLines.length * 5 + 8;
    }
    y += 5;
  }

  // --- Note FlowCut ---
  if (flowCutNotes?.trim()) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.text('Note Metodo Flow', margin, y);
    y += 6;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    const noteLines = doc.splitTextToSize(flowCutNotes.trim(), pageWidth - 2 * margin - 5);
    doc.text(noteLines, margin, y);
    y += noteLines.length * 5 + 15;
  }

  // --- FOOTER con QR ---
  const lastPage = doc.internal.getNumberOfPages();
  for (let p = 1; p <= lastPage; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Instagram: @thedavidestudio | TikTok: @thedavidestudio | Prenota il tuo prossimo appuntamento`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // QR Code Instagram sull'ultima pagina
  try {
    const qrDataUrl = await QRCode.toDataURL(INSTAGRAM_URL, { width: 40, margin: 1 });
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 55, doc.internal.pageSize.getHeight() - 55, 35, 35);
  } catch (e) {
    console.warn('QR code non generato:', e);
  }

  return doc;
}

export function getWhatsAppLink(clientData, includeAttachmentHint = false) {
  const name = [clientData.firstName, clientData.lastName].filter(Boolean).join(' ') || 'Cliente';
  let message = `Ciao ${name}, ecco il tuo protocollo personalizzato per mantenere il tuo FlowCut perfetto.`;
  if (includeAttachmentHint) {
    message += ' Ti allego il PDF con i prodotti consigliati.';
  }
  message += ' A presto, Davide';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
