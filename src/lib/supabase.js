import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey && supabaseAnonKey !== 'your_anon_key_from_supabase_dashboard') {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.warn('Supabase init failed:', e);
  }
}

export { supabase };
export const isSupabaseConfigured = () => !!supabase;
