import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function SaveConsultationButton({
  clientData,
  selectedIds,
  instructions,
  flowCutNotes,
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isSupabaseConfigured()) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const { error } = await supabase.from('consultations').insert({
        client_first_name: clientData.firstName || null,
        client_last_name: clientData.lastName || null,
        client_date: clientData.date || null,
        selected_products: selectedIds,
        instructions,
        flow_cut_notes: flowCutNotes || null,
      });
      if (!error) setSaved(true);
      else console.warn('Errore salvataggio:', error);
    } catch (e) {
      console.warn('Errore salvataggio:', e);
    }
    setSaving(false);
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={saving}
      className="px-6 py-2 rounded border border-atelier-gold/50 text-atelier-gold hover:bg-atelier-gold/10 text-sm transition-colors disabled:opacity-50"
    >
      {saving ? 'Salvataggio...' : saved ? 'Salvato ✓' : 'Salva consultazione'}
    </button>
  );
}
