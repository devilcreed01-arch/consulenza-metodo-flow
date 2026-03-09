import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function ConsultationHistory({ onLoad }) {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConsultations = async () => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (!error) setConsultations(data || []);
    } catch (e) {
      console.warn('Errore caricamento storico:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  if (!isSupabaseConfigured()) return null;

  const handleLoad = (c) => {
    onLoad({
      clientData: {
        firstName: c.client_first_name || '',
        lastName: c.client_last_name || '',
        date: c.client_date || '',
      },
      selectedIds: c.selected_products || [],
      instructions: c.instructions || {},
      flowCutNotes: c.flow_cut_notes || '',
    });
  };

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getLabel = (c) => {
    const name = [c.client_first_name, c.client_last_name].filter(Boolean).join(' ');
    return name || 'Consultazione senza nome';
  };

  return (
    <div className="space-y-2">
      <h2 className="font-serif text-lg text-atelier-gold border-b border-atelier-gold/30 pb-2">
        Ultime consultazioni
      </h2>
      {loading ? (
        <p className="text-atelier-sand/60 text-sm">Caricamento...</p>
      ) : consultations.length === 0 ? (
        <p className="text-atelier-sand/60 text-sm italic">Nessuna consultazione salvata.</p>
      ) : (
        <ul className="space-y-1">
          {consultations.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => handleLoad(c)}
                className="text-left w-full px-3 py-2 rounded border border-atelier-anthracite hover:border-atelier-gold/50 hover:bg-atelier-gold/5 text-sm transition-colors"
              >
                <span className="text-atelier-sand">{getLabel(c)}</span>
                <span className="text-atelier-sand/50 text-xs ml-2">
                  {formatDate(c.created_at)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
