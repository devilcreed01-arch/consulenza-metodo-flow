export default function ClientForm({ clientData, onChange }) {
  const { firstName, lastName, date } = clientData;

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl text-atelier-gold border-b border-atelier-gold/30 pb-2">
        Dati Cliente
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-atelier-sand/80 mb-1">Nome</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => onChange({ ...clientData, firstName: e.target.value })}
            className="w-full px-4 py-2 bg-atelier-anthracite border border-atelier-gold/30 rounded text-white placeholder-atelier-sand/40 focus:outline-none focus:border-atelier-gold"
            placeholder="Nome"
          />
        </div>
        <div>
          <label className="block text-sm text-atelier-sand/80 mb-1">Cognome</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => onChange({ ...clientData, lastName: e.target.value })}
            className="w-full px-4 py-2 bg-atelier-anthracite border border-atelier-gold/30 rounded text-white placeholder-atelier-sand/40 focus:outline-none focus:border-atelier-gold"
            placeholder="Cognome"
          />
        </div>
        <div>
          <label className="block text-sm text-atelier-sand/80 mb-1">Data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => onChange({ ...clientData, date: e.target.value })}
            className="w-full px-4 py-2 bg-atelier-anthracite border border-atelier-gold/30 rounded text-white focus:outline-none focus:border-atelier-gold"
          />
        </div>
      </div>
    </div>
  );
}
