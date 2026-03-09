import { generatePDF, getWhatsAppLink } from '../utils/pdfGenerator';
import { PRODUCTS } from '../data/products';

export default function GenerateButton({ clientData, selectedIds, instructions, flowCutNotes }) {
  const selectedProducts = PRODUCTS.filter((p) => selectedIds.includes(p.id));
  const hasProducts = selectedProducts.length > 0;
  const clientName = [clientData.firstName, clientData.lastName].filter(Boolean).join(' ');

  const handleGenerate = async () => {
    try {
      const doc = await generatePDF({
        clientData,
        selectedProducts,
        instructions,
        flowCutNotes,
      });
      const fileName = `Rituale_${clientName.replace(/\s+/g, '_') || 'Cliente'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('Errore generazione PDF:', err);
      alert('Errore durante la generazione del PDF. Riprova.');
    }
  };

  const handleWhatsApp = async () => {
    if (!hasProducts) {
      alert('Seleziona almeno un prodotto prima di inviare su WhatsApp.');
      return;
    }
    try {
      // 1. Genera e scarica il PDF
      const doc = await generatePDF({
        clientData,
        selectedProducts,
        instructions,
        flowCutNotes,
      });
      const fileName = `Rituale_${clientName.replace(/\s+/g, '_') || 'Cliente'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(fileName);
      // 2. Apri WhatsApp con messaggio precompilato
      const url = getWhatsAppLink(clientData, true);
      window.open(url, '_blank');
      // 3. Avvisa l'utente di allegare il PDF
      alert('Il PDF è stato scaricato nella cartella Download.\n\nWhatsApp si è aperto: allega il file PDF alla chat (icona graffetta → Documento).');
    } catch (err) {
      console.error('Errore:', err);
      alert('Errore durante la generazione. Riprova.');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleGenerate}
        disabled={!hasProducts}
        className={`px-8 py-3 font-serif text-lg rounded border-2 transition-all ${
          hasProducts
            ? 'bg-atelier-gold text-atelier-black border-atelier-gold hover:bg-atelier-gold/90 hover:scale-[1.02]'
            : 'bg-atelier-anthracite text-atelier-sand/50 border-atelier-anthracite cursor-not-allowed'
        }`}
      >
        Genera PDF
      </button>
      <button
        onClick={handleWhatsApp}
        disabled={!hasProducts}
        className={`px-8 py-3 font-serif text-lg rounded border-2 transition-all ${
          hasProducts
            ? 'border-atelier-gold text-atelier-gold hover:bg-atelier-gold/10'
            : 'border-atelier-anthracite text-atelier-sand/50 cursor-not-allowed'
        }`}
      >
        Invia su WhatsApp
      </button>
    </div>
  );
}
