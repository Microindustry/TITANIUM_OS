# NEUROMAPV3 — Build Reference
**Versione:** 3.0 | **Data:** 2026-03-18 | **Autore:** Claude Sonnet 4.6 + Matteo Benenati
**File sorgente:** `DASHBOARD/src/components/NeuroMapView.tsx`
**Status:** ✅ LIVE — "la cosa più bella che tu abbia mai fatto"

---

## Cos'è

Mappa dimensionale multi-livello dell'ecosistema TITANIUM_OS.
Ogni nodo è un progetto, pilastro o fase operativa.
Click su un nodo → drill-down → i figli esplodono in orbita.
∞ livelli navigabili.

---

## Estetica — Linguaggio visivo

### Palette
| Colore | Hex | Uso |
|--------|-----|-----|
| Emerald | `#10b981` | Attivo, V32, sistema |
| Amber | `#f59e0b` | In build, MIMS |
| Indigo | `#818cf8` | In attesa, VITA |
| Cyan | `#06b6d4` | Building, GENESIS |
| Slate | `#64748b` | Futuro, IDENTITY |

### Animazioni
- **Pulse ring:** `np` keyframes — opacity 0.04→0.22, 2.6s ease-in-out ∞ — solo nodi `active`
- **Ciclo badge:** `nc` keyframes — opacity 0.1→0.6, 1.3s — nodo corrente del ciclo operativo
- **Node enter:** `nodeIn` — scale 0.3→1, cubic-bezier(0.34,1.56,0.64,1) spring, stagger 40ms/nodo
- **Drill zoom burst:** `drillZoom` — cerchio esplode scale 1→3.5, opacity 1→0, 350ms
- **Level transition:** `fadeUp` — translateY(6px)→0 + scale(0.97)→1, 280ms

### SVG details
- Background: dot grid `#1e293b` + radial gradient glow `centerGlow` dal colore del nodo centrale
- Nodi: `fill="#0f172a"` + stroke colorato per progetto
- Status dot: `r=2.5` a posizione `+0.62r, -0.62r` (angolo top-right)
- Archi progresso: arc SVG da -90° clockwise, `strokeLinecap="round"`, track grigio + fill colorato
- Level watermark: `L{n}` fontSize=80, opacity=0.04 — indica profondità visivamente
- Glow nodo espandibile: `drop-shadow(0 0 4px {hex})` su hover

---

## Architettura — Come funziona

### Stack di navigazione
```ts
type StackEntry = {
  nodes: MapNode[];          // nodi del livello
  edges: [string,string][];  // connessioni
  centerId: string;          // nodo al centro
  centerLabel: string;
  centerHex: string;
  centerEmoji: string;
}

const [stack, setStack] = useState<StackEntry[]>([L0_ENTRY]);
```

Ogni drill-down aggiunge un entry allo stack. `drillBack()` rimuove l'ultimo.

### Geometria radiale
```ts
const RADII = [0, 88, 160];   // ring 0 (centro), ring 1, ring 2
const NODE_R = [22, 15, 11];  // raggio cerchio per ring

function nodePos(n: MapNode): { x: number; y: number } {
  if (n.ring === 0) return { x: CX, y: CY };
  const angle = (-90 + n.idx * (360/n.total)) * (Math.PI/180);
  return { x: CX + RADII[n.ring]*cos(angle), y: CY + RADII[n.ring]*sin(angle) };
}
```

### Drill-down flow
1. Click nodo con `hasChildren=true`
2. `setZoomNode` → render burst circle SVG (drillZoom animation)
3. `setTimeout(350ms)` → `buildDrillLevel(nodeId, children)`
4. Push nuovo StackEntry → `setAnimKey` → re-render con `fadeUp`

### Live data
- Fetch `GET :5001/api/state` ogni 30s
- Merge `pillars[pillarKey]` → override `status` e `pct` dei nodi ring-1
- `PATCH :5001/api/state/pillar/{key}` → cicla status dal badge del detail panel

---

## Struttura dati DRILL_CHILDREN

```
OS (L0)
├── V32 → Hardware, Software, Elettronica, G-code
├── MIMS → VULCAN (→ Struttura, Ricette, Brevetto), Kit Fisico, Fit Park, Digitale
├── VITA → EVA Bot, CRM, Brand
├── IDENTITY → CV Layers (→ SCProject, ESSEGI, DATWLER, LU.VE), SINAPSI, Content
├── GENESIS → Brain, Automations, Dashboard, Memory
├── COSTRUISCI → V32 Config G, VULCAN Pressa
├── PROGETTA → MIMS CAD, V33 Design, GENESIS v7
└── DOCUMENTA → Video AVA, Changelog, LinkedIn
```

---

## Come estendere

### Aggiungere figli a un nodo esistente
```ts
// In DRILL_CHILDREN:
nuovo_nodo: [
  { id: "id", label: "NOME", emoji: "🔧", hex: "#10b981",
    status: "active", pct: 50, detail: "descrizione" }
]

// Nel nodo parent (NODES_BASE o DRILL_CHILDREN):
hasChildren: true
```

### Aggiungere livello L0
Aggiungere entry in `NODES_BASE` con `ring: 1` e incrementare `total`.

### Aggiungere drill profondo (L3+)
`DrillNode.children` è `Record<string, DrillNode[]>` — supporta ricorsione.
`buildDrillLevel` cerca il parent in tutti i livelli di `DRILL_CHILDREN`.

---

## Riferimento visivo

La mappa usa il linguaggio di una **corteccia neurale artificiale** — i livelli di drill-down
corrispondono ai layer cognitivi del sistema. Ogni click è un pensiero che si espande.

> "Immagino le 1024 assi ma ho scoperto che in base al modello LLM utilizzato, possono essere anche di più."
> — Matteo Benenati, 2026-03-18
