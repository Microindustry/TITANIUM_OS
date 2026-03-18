// layersData.ts — Struttura ecosistema Matteo Benenati
// Parte di: TITANIUM_OS / DASHBOARD
// Versione: 1.0 | Data: 2026-03-17

export type LayerStatus = 'active' | 'building' | 'pending' | 'future';
export type LayerType = 'root' | 'project' | 'cv' | 'skill' | 'layer';
export type LayerColor = 'emerald' | 'cyan' | 'indigo' | 'amber' | 'slate' | 'pink' | 'violet';

export interface Layer {
  id: string;
  name: string;
  type: LayerType;
  status: LayerStatus;
  color: LayerColor;
  pct?: number;
  subtitle?: string;
  skills?: string[];
  proof?: string; // output reale che certifica la skill
  children?: Layer[];
}

// Colori per status
export const STATUS_COLOR: Record<LayerStatus, string> = {
  active: 'emerald',
  building: 'cyan',
  pending: 'amber',
  future: 'slate',
};

export const LAYERS_DATA: Layer = {
  id: 'root',
  name: 'SINAPSI',
  type: 'root',
  status: 'active',
  color: 'emerald',
  subtitle: 'Ecosistema Matteo Benenati',
  children: [

    // ─── CV ────────────────────────────────────────────
    {
      id: 'cv',
      name: 'CV',
      type: 'cv',
      status: 'active',
      color: 'cyan',
      pct: 100,
      subtitle: 'Esperienza dipendente certificata da progetti reali',
      skills: ['TIG titanio', 'MIG', 'Robot industriali', 'Presse', 'QC'],
      children: [
        {
          id: 'scproject',
          name: 'SCProject',
          type: 'layer',
          status: 'active',
          color: 'cyan',
          subtitle: 'Saldatura TIG/MIG · MotoGP',
          skills: ['TIG titanio aerospace', 'MIG alluminio/acciaio', 'Scarichi MotoGP', 'Tolleranze racing'],
          proof: 'Scarichi titanio MotoGP montati in gara',
          children: [
            {
              id: 'tig',
              name: 'TIG Titanio',
              type: 'skill',
              status: 'active',
              color: 'cyan',
              skills: ['Inerte gas shielding', 'Purge interno tubo', 'Titanio Grade 5', 'Giunzioni aerospace'],
              proof: 'Saldature su scarichi racing approvate',
            },
            {
              id: 'mig',
              name: 'MIG',
              type: 'skill',
              status: 'active',
              color: 'slate',
              skills: ['Alluminio', 'Acciaio inox', 'Acciaio dolce', 'MIG pulsato'],
            },
            {
              id: 'motogp',
              name: 'MotoGP Context',
              type: 'skill',
              status: 'active',
              color: 'amber',
              skills: ['Timing pressioni race', 'Tolleranze 0.01mm', 'Documentazione racing', 'Materiali aerospace'],
              proof: 'Componenti montati su moto WorldChampionship',
            },
          ],
        },
        {
          id: 'essegi',
          name: 'ESSEGI',
          type: 'layer',
          status: 'active',
          color: 'indigo',
          subtitle: 'Robot industriali',
          skills: ['Robot industriali', 'Programmazione robot', 'Manutenzione', 'Cicli produzione'],
          proof: 'Robot in produzione attiva',
          children: [
            {
              id: 'robot-prog',
              name: 'Programmazione Robot',
              type: 'skill',
              status: 'active',
              color: 'indigo',
              skills: ['Path planning', 'Teach pendant', 'Cicli automatici'],
            },
            {
              id: 'robot-maint',
              name: 'Manutenzione',
              type: 'skill',
              status: 'active',
              color: 'slate',
              skills: ['Diagnostica', 'Sostituzione attuatori', 'Calibrazione'],
            },
          ],
        },
        {
          id: 'datwler',
          name: 'DATWLER',
          type: 'layer',
          status: 'active',
          color: 'amber',
          subtitle: 'Presse industriali',
          skills: ['Presse industriali', 'Cicli stampa', 'Materiali termoplastici', 'QC processo'],
          proof: 'Presse in produzione continua',
          children: [
            {
              id: 'presse-cicli',
              name: 'Cicli Stampa',
              type: 'skill',
              status: 'active',
              color: 'amber',
              skills: ['Parametri pressione', 'Temperatura stampo', 'Tempo ciclo', 'Eiezione'],
            },
            {
              id: 'cilindri-guida',
              name: 'Cilindri Guida',
              type: 'skill',
              status: 'active',
              color: 'slate',
              skills: ['Colonne guida struttura', 'Recupero componenti', 'Riuso in VULCAN'],
              proof: 'Colonne DATWLER riutilizzate come guide in VULCAN',
            },
          ],
        },
        {
          id: 'luve',
          name: 'LU.VE',
          type: 'layer',
          status: 'active',
          color: 'emerald',
          subtitle: 'Quality Control',
          skills: ['Quality Control', 'Metrologia', 'Processo produttivo', 'Scambiatori di calore'],
          proof: 'QC scambiatori passati a normative EU',
          children: [
            {
              id: 'qc-metro',
              name: 'Metrologia',
              type: 'skill',
              status: 'active',
              color: 'emerald',
              skills: ['Calibri', 'Micrometri', 'Comparatori', 'Tolleranze ISO'],
            },
            {
              id: 'qc-processo',
              name: 'Controllo Processo',
              type: 'skill',
              status: 'active',
              color: 'cyan',
              skills: ['SPC base', 'Non conformità', 'Azioni correttive', 'Documentazione'],
            },
          ],
        },
      ],
    },

    // ─── V32 ───────────────────────────────────────────
    {
      id: 'v32',
      name: 'V32',
      type: 'project',
      status: 'building',
      color: 'emerald',
      pct: 65,
      subtitle: 'Fresatrice CNC · Atto II',
      skills: ['CNC', 'Alu 7075', 'G-code', 'Elettronica', 'TITANIUM_OS'],
      proof: 'Fresatrice CNC funzionante',
      children: [
        {
          id: 'v32-hw',
          name: 'Hardware',
          type: 'layer',
          status: 'building',
          color: 'emerald',
          subtitle: 'Struttura meccanica',
          skills: ['Alu 7075', 'Fresatura struttura', 'Meccanica di precisione', 'Assemblaggio'],
        },
        {
          id: 'v32-sw',
          name: 'Software',
          type: 'layer',
          status: 'active',
          color: 'cyan',
          subtitle: 'TITANIUM_OS · VLC · G-code',
          skills: ['TITANIUM_OS', 'VLC', 'G-code', 'Python', 'React dashboard'],
          proof: 'Dashboard live a localhost:5173',
        },
        {
          id: 'v32-elec',
          name: 'Elettronica',
          type: 'layer',
          status: 'building',
          color: 'indigo',
          subtitle: 'Controller · Driver · Sensing',
          skills: ['Controller CNC', 'Driver motori stepper', 'Sensing posizione', 'Wiring industriale'],
        },
      ],
    },

    // ─── MIMS ──────────────────────────────────────────
    {
      id: 'mims',
      name: 'MIMS',
      type: 'project',
      status: 'building',
      color: 'indigo',
      pct: 30,
      subtitle: 'Connettori modulari · Ecosistema fisico+digitale',
      skills: ['Design modulare', 'Produzione fisica', 'Sistema digitale'],
      proof: 'Kit MIMS funzionante',
      children: [
        {
          id: 'mims-kit',
          name: 'Kit Fisico',
          type: 'layer',
          status: 'building',
          color: 'indigo',
          subtitle: 'Tile modulari · Sistema incastro',
          skills: ['Tile modulari', 'Sistema incastro', 'Stampo', 'Materiale polimerico (VULCAN)'],
        },
        {
          id: 'mims-fitpark',
          name: 'Fit Park 4.0',
          type: 'layer',
          status: 'pending',
          color: 'amber',
          subtitle: 'Area fitness con tornello MIMS',
          skills: ['Tornello MIMS proprietario', 'Area fitness outdoor', 'Sistema accesso'],
        },
        {
          id: 'mims-digital',
          name: 'Ecosistema Digitale',
          type: 'layer',
          status: 'future',
          color: 'cyan',
          subtitle: 'App · Backend · API',
          skills: ['App mobile', 'Backend gestione', 'API connettori'],
        },
      ],
    },

    // ─── VULCAN ────────────────────────────────────────
    {
      id: 'vulcan',
      name: 'VULCAN',
      type: 'project',
      status: 'pending',
      color: 'amber',
      pct: 15,
      subtitle: 'Pressa 20t · Ricette polimeri · Brevetto materiale',
      skills: ['Pressa idraulica', 'Polimeri', 'Ricette materiali', 'Ingegneria stampo'],
      proof: 'Stampi polimeri proprietari per MIMS',
      children: [
        {
          id: 'vulcan-struttura',
          name: 'Struttura Pressa',
          type: 'layer',
          status: 'pending',
          color: 'amber',
          subtitle: 'Martinetto Vevor 20t · Colonne guida',
          skills: ['Martinetto Vevor 20t (3 stati)', 'Colonne guida DATWLER (recupero)', 'Frame strutturale', 'Meccanica pressa'],
          proof: 'Struttura pressa assemblata',
        },
        {
          id: 'vulcan-ricette',
          name: 'Ricette Polimeri',
          type: 'layer',
          status: 'future',
          color: 'indigo',
          subtitle: 'Formula proprietaria · Parametri ciclo',
          skills: ['Temperatura stampo', 'Pressione ciclo', 'Tempo mantenimento', 'Formula materiale proprietaria'],
          proof: 'Ricette testate con output certificato',
        },
        {
          id: 'vulcan-brevetto',
          name: 'Brevetto Materiale',
          type: 'layer',
          status: 'future',
          color: 'cyan',
          subtitle: 'Proprietà meccaniche · Applicazioni MIMS',
          skills: ['Formulazione chimica', 'Proprietà meccaniche', 'Applicazioni MIMS tile', 'Documentazione brevettuale'],
          proof: 'Brevetto depositato',
        },
      ],
    },

    // ─── EVA ───────────────────────────────────────────
    {
      id: 'eva',
      name: 'EVA',
      type: 'project',
      status: 'building',
      color: 'pink',
      pct: 40,
      subtitle: 'AI assistant · Vita Natura (Maria)',
      skills: ['AI', 'WhatsApp bot', 'Automazione centro estetico'],
      proof: 'Bot attivo per Vita Natura',
      children: [
        {
          id: 'eva-whatsapp',
          name: 'WhatsApp Bot',
          type: 'layer',
          status: 'building',
          color: 'emerald',
          subtitle: 'n8n · API WhatsApp',
          skills: ['n8n workflow', 'WhatsApp Business API', 'Risposte automatiche', 'Prenotazioni'],
        },
        {
          id: 'eva-vita',
          name: 'Vita Natura',
          type: 'layer',
          status: 'building',
          color: 'pink',
          subtitle: 'Centro estetico Boffalora s/T',
          skills: ['Customer care automatico', 'Gestione appuntamenti', 'Follow-up clienti'],
        },
      ],
    },

    // ─── GENESIS ───────────────────────────────────────
    {
      id: 'genesis',
      name: 'GENESIS',
      type: 'project',
      status: 'active',
      color: 'slate',
      pct: 10,
      subtitle: 'OS setup · Infrastruttura base',
      skills: ['Setup sistema', 'Infrastruttura', 'Bootstrap ecosystem'],
      children: [],
    },

    // ─── CONTENT ───────────────────────────────────────
    {
      id: 'content',
      name: 'CONTENT',
      type: 'project',
      status: 'pending',
      color: 'violet',
      pct: 20,
      subtitle: 'Podcast · Video · Storytelling',
      skills: ['Content creation', 'Storytelling industriale', 'Video produzione'],
      children: [
        {
          id: 'content-engine',
          name: 'Content Engine',
          type: 'layer',
          status: 'pending',
          color: 'violet',
          subtitle: 'Auto-generazione file · Template',
          skills: ['Auto-generation', 'Template system', 'Distribution pipeline'],
        },
        {
          id: 'content-storico',
          name: 'Storico Passato',
          type: 'layer',
          status: 'pending',
          color: 'slate',
          subtitle: 'Versioni · Idee · Flussi passati',
          skills: ['Archivio idee', 'Versioni progetto', 'Flussi di coscienza', 'Storytelling passato'],
        },
      ],
    },
  ],
};
