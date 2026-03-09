# Davide Studio - Generatore PDF Home-Care

Applicazione web per generare PDF personalizzati con i prodotti consigliati per la home routine (Metodo Flow).

## Avvio

```bash
npm install
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173).

## Configurazione

### Supabase (persistenza consultazioni)

1. In Supabase Dashboard > SQL Editor, esegui lo script `supabase-schema.sql`
2. Le variabili `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` sono già in `.env.local`

**Nota:** Se Supabase non funziona, verifica di usare la chiave **anon public** (JWT che inizia con `eyJ...`) da Settings > API, non altre chiavi.

## Funzionalità

- Form dati cliente (Nome, Cognome, Data)
- Selettore prodotti per categoria (Detersione, Idratazione, Styling, Mantenimento colore)
- Istruzioni d'uso auto-compilanti e modificabili
- Note Metodo Flow
- Generazione PDF con layout editoriale
- Pulsante Invia su WhatsApp
- Salvataggio consultazioni su Supabase
- Storico ultime 10 consultazioni (caricabili con un click)

## Build

```bash
npm run build
```

I file saranno in `dist/`.
