import { useState } from 'react';
import ClientForm from './components/ClientForm';
import ProductSelector from './components/ProductSelector';
import UsageInstructions from './components/UsageInstructions';
import FlowCutNotes from './components/FlowCutNotes';
import GenerateButton from './components/GenerateButton';
import SaveConsultationButton from './components/SaveConsultationButton';
import ConsultationHistory from './components/ConsultationHistory';

const initialClientData = {
  firstName: '',
  lastName: '',
  date: '',
};

export default function App() {
  const [clientData, setClientData] = useState(initialClientData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [instructions, setInstructions] = useState({});
  const [flowCutNotes, setFlowCutNotes] = useState('');

  const loadConsultation = ({ clientData: cd, selectedIds: ids, instructions: instr, flowCutNotes: notes }) => {
    setClientData(cd);
    setSelectedIds(ids);
    setInstructions(instr);
    setFlowCutNotes(notes);
  };

  const toggleProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-atelier-black">
      <header className="border-b border-atelier-gold/20 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-2xl md:text-3xl text-atelier-gold text-center w-[729px] mx-auto">
            Davide Studio - Marsala
          </h1>
          <p className="text-atelier-sand/70 text-center mt-1 text-sm">
            Generatore PDF Home-Care · Metodo Flow
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <section className="p-6 rounded-lg border border-atelier-gold/20 bg-atelier-anthracite/30">
          <ConsultationHistory onLoad={loadConsultation} />
        </section>

        <section className="p-6 rounded-lg border border-atelier-gold/20 bg-atelier-anthracite/30">
          <ClientForm clientData={clientData} onChange={setClientData} />
        </section>

        <section className="p-6 rounded-lg border border-atelier-gold/20 bg-atelier-anthracite/30">
          <ProductSelector selectedIds={selectedIds} onToggle={toggleProduct} />
        </section>

        <section className="p-6 rounded-lg border border-atelier-gold/20 bg-atelier-anthracite/30">
          <UsageInstructions
            selectedIds={selectedIds}
            instructions={instructions}
            onChange={setInstructions}
          />
        </section>

        <section className="p-6 rounded-lg border border-atelier-gold/20 bg-atelier-anthracite/30">
          <FlowCutNotes value={flowCutNotes} onChange={setFlowCutNotes} />
        </section>

        <section className="p-6 rounded-lg border border-atelier-gold/20 bg-atelier-anthracite/30 flex flex-col sm:flex-row items-center justify-center gap-4">
          <GenerateButton
            clientData={clientData}
            selectedIds={selectedIds}
            instructions={instructions}
            flowCutNotes={flowCutNotes}
          />
          <SaveConsultationButton
            clientData={clientData}
            selectedIds={selectedIds}
            instructions={instructions}
            flowCutNotes={flowCutNotes}
          />
        </section>
      </main>

      <footer className="border-t border-atelier-gold/20 py-6 mt-12">
        <p className="text-atelier-sand/50 text-center text-sm">
          Davide Studio · Atelier del Riccio · Marsala
        </p>
      </footer>
    </div>
  );
}
