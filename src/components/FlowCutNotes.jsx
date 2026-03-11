export default function FlowCutNotes({ value, onChange }) {
  return (
    <div className="space-y-2">
      <h2 className="font-serif text-xl text-atelier-gold border-b border-atelier-gold/30 pb-2">
        Note del Metodo Flow
      </h2>
      <p className="text-sm text-atelier-sand/70">
        Consigli personalizzati sul mantenimento del taglio FlowCut.
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-2 bg-atelier-anthracite border border-atelier-gold/30 rounded text-white placeholder-atelier-sand/40 focus:outline-none focus:border-atelier-gold resize-y"
        placeholder="Aggiungi qui i tuoi consigli personalizzati..."
      />
    </div>
  );
}
