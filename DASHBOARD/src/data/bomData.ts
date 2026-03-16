export interface BOMItem {
  id: string;
  name: string;
  q: number;
  supplier: string;
  status: "Disponibile" | "Mancante" | "Da Integrare";
  value: number;
  category: string;
  specs: string;
  role: string;
  vincente?: string; // ruolo nel settaggio vincente
}

// Database completo da lista CNC 12/02/26 + ASSOLUTO V3.0
export const BOM_ITEMS: BOMItem[] = [
  // === AUTOMAZIONE PLC ===
  { id: "6ES7 314-6CG03-0AB0", name: "CPU Siemens S7-314C-2 PtP", q: 1, supplier: "Siemens", status: "Disponibile", value: 850, category: "Automazione", specs: "24 DI, 16 DO, PtP", role: "Cervello PLC" },
  { id: "6ES7 307-1EA00-0AA0", name: "PS307 Alimentatore 5A", q: 1, supplier: "Siemens", status: "Disponibile", value: 180, category: "Automazione", specs: "24V DC 5A", role: "Alimentazione PLC" },
  { id: "6ES7 350-1AH03-0AE0", name: "FM350 Contatore Rapido", q: 1, supplier: "Siemens", status: "Disponibile", value: 320, category: "Automazione", specs: "500 kHz", role: "Lettura encoder alta velocita", vincente: "Campionamento FFT per validazione f0" },
  { id: "6ES7 322-1BH01-0AA0", name: "SM322 Uscite Digitali", q: 1, supplier: "Siemens", status: "Disponibile", value: 150, category: "Automazione", specs: "16 DO 24V/0.5A", role: "Uscite digitali" },
  { id: "6GK7 343-1EX11-0XE0", name: "CP343 Ethernet/PROFINET", q: 1, supplier: "Siemens", status: "Disponibile", value: 380, category: "Automazione", specs: "Industrial Ethernet", role: "Connettivita rete", vincente: "Industria 4.0 — remote monitoring" },
  { id: "6ES5 393-0UA11", name: "Connettore Profibus", q: 1, supplier: "Siemens", status: "Disponibile", value: 25, category: "Automazione", specs: "9-pin Sub-D", role: "Bus comunicazione" },
  { id: "6SE3290-0XX87-8PB0", name: "Filtro Rete Sinamics", q: 1, supplier: "Siemens", status: "Disponibile", value: 95, category: "Automazione", specs: "EMC Filter", role: "Filtraggio EMC" },

  // === HMI ===
  { id: "6AV2 124-0JC01-0AX0", name: "HMI TP900 Comfort 9\"", q: 1, supplier: "Siemens", status: "Disponibile", value: 2800, category: "HMI", specs: "9\" Touch, Made in Germany", role: "Interfaccia operatore principale", vincente: "HMI OPERATIVO — G-code, posizione, allarmi" },
  { id: "6AV2 123-2GA03-0AX0", name: "HMI KTP700 Basic", q: 1, supplier: "Siemens", status: "Disponibile", value: 520, category: "HMI", specs: "7\" Touch Basic", role: "Pannello secondario" },
  { id: "6AV6 647-0AD11-3AX0", name: "HMI KTP600 Basic", q: 1, supplier: "Siemens", status: "Disponibile", value: 380, category: "HMI", specs: "6\" Touch Basic", role: "Pannello diagnostica", vincente: "DOPPIO HMI — diagnostica dedicata (temp, vibrazioni)" },

  // === SENSORI ===
  { id: "IFM VSE150", name: "IFM VSE150 Sensore Vibrazioni", q: 1, supplier: "IFM", status: "Disponibile", value: 550, category: "Sensori", specs: "0-80mm/s, 4-20mA", role: "Monitor vibrazioni", vincente: "Validazione f0 reale + test smorzamento" },
  { id: "IFM VSA004", name: "IFM VSA004 Accelerometro", q: 1, supplier: "IFM", status: "Disponibile", value: 420, category: "Sensori", specs: "Triassiale, IEPE", role: "Analisi vibrazioni avanzata", vincente: "MIGLIORIA 1: Impulso + FFT = f0 misurato" },
  { id: "IFM O5D100", name: "IFM O5D100 Sensore Laser ToF", q: 1, supplier: "IFM", status: "Disponibile", value: 329, category: "Sensori", specs: "100-5000mm, ToF", role: "Misura distanza", vincente: "MIGLIORIA 3: Probing automatico Z" },
  { id: "KEYENCE IL-1000", name: "Keyence IL-1000 Profilometro", q: 1, supplier: "Keyence", status: "Disponibile", value: 730, category: "Sensori", specs: "Fibra ottica laser", role: "Misura profilo/Ra", vincente: "Misura Ra in-process" },
  { id: "XS1 M12PA370", name: "Sensori Induttivi M12", q: 8, supplier: "Telemecanique", status: "Disponibile", value: 160, category: "Sensori", specs: "PNP NO, M12", role: "Finecorsa / homing" },

  // === ENCODER / FEEDBACK ===
  { id: "Omron E6B2-CWZ5B", name: "Omron E6B2 Encoder Rotativo", q: 1, supplier: "Omron", status: "Disponibile", value: 85, category: "Encoder", specs: "1000 PPR, ABZ", role: "Feedback rotazione", vincente: "MIGLIORIA 4: Monitor RPM mandrino" },
  { id: "Baumer BHK 16.24K250-B2-9", name: "Baumer BHK16 Encoder", q: 1, supplier: "Baumer", status: "Disponibile", value: 120, category: "Encoder", specs: "Incrementale", role: "Feedback posizione" },
  { id: "Baumer FPDM 16P5101/S14", name: "Baumer FPDM Fotoelettrico", q: 1, supplier: "Baumer", status: "Disponibile", value: 95, category: "Sensori", specs: "Fotoelettrico, PNP", role: "Homing preciso", vincente: "Homing ripetibile < 0.005mm" },

  // === VISIONE ===
  { id: "Basler acA1920-155um", name: "Basler acA1920 Camera Industriale", q: 1, supplier: "Basler", status: "Disponibile", value: 580, category: "Visione", specs: "2.3MP, 164fps, USB3", role: "Machine vision", vincente: "MIGLIORIA 6: QC automatico post-fresatura" },

  // === TERMOREGOLAZIONE ===
  { id: "OMRON E5CC-RX3A5M-001", name: "Omron E5CC Termoregolatore", q: 1, supplier: "Omron", status: "Disponibile", value: 110, category: "Termoregolazione", specs: "PID, TC K/J, Rele", role: "Controllo temperatura", vincente: "MIGLIORIA 4: Compensazione termica mandrino" },
  { id: "ROPEX PEX-W4", name: "Ropex PEX-W4 Controller Temp", q: 1, supplier: "Ropex", status: "Disponibile", value: 280, category: "Termoregolazione", specs: "Riscaldamento industriale", role: "Controllore termico", vincente: "Camera termica per curing Epoxy Granite" },

  // === GUIDE LINEARI ===
  { id: "SBC SBI 15", name: "SBC SBI 15 Guide + Pattini", q: 1, supplier: "SBC", status: "Disponibile", value: 480, category: "Motion", specs: "2 Guide L=660mm + 4 Pattini", role: "Asse X — guide lineari" },
  { id: "HIWIN HG20", name: "HIWIN HG20 Guide + Pattini", q: 1, supplier: "HIWIN", status: "Disponibile", value: 520, category: "Motion", specs: "2 Guide L=520mm + 3 Pattini", role: "Asse Y — guide lineari" },
  { id: "TBI MGN15H", name: "TBI MGN15H Guide + Pattini", q: 1, supplier: "TBI Motion", status: "Disponibile", value: 280, category: "Motion", specs: "2 Guide L=343mm + 4 Pattini", role: "Asse Z — guide lineari" },

  // === VITI A RICIRCOLO ===
  { id: "VITE-1605", name: "Vite Ricircolo 1605", q: 1, supplier: "Generico", status: "Disponibile", value: 120, category: "Motion", specs: "Passo 5mm, D16", role: "Asse X — trasmissione" },
  { id: "VITE-8MM-1", name: "Vite Ricircolo Passo 8mm #1", q: 1, supplier: "Generico", status: "Disponibile", value: 140, category: "Motion", specs: "Passo 8mm", role: "Asse Y — trasmissione", vincente: "MIGLIORIA 2: Rapidi +60% su Y" },
  { id: "VITE-8MM-2", name: "Vite Ricircolo Passo 8mm #2", q: 1, supplier: "Generico", status: "Disponibile", value: 140, category: "Motion", specs: "Passo 8mm", role: "Asse Z — trasmissione", vincente: "MIGLIORIA 2: Leggerezza su Z con FAULHABER" },

  // === MOTORI / SERVO ===
  { id: "DELTA ECMA-C20604RS", name: "Delta ECMA Servo 400W", q: 1, supplier: "Delta", status: "Disponibile", value: 350, category: "Motori", specs: "400W, 3000rpm, Encoder", role: "Asse X — servo drive" },
  { id: "MT23HE31042M4LC", name: "Ever Elettronica NEMA23 CL", q: 1, supplier: "Ever Elettronica", status: "Disponibile", value: 180, category: "Motori", specs: "Closed Loop, 3A", role: "Asse Y — stepper" },
  { id: "FAULHABER 2232S024BX4", name: "Faulhaber 2232S DC Motor", q: 2, supplier: "Faulhaber", status: "Disponibile", value: 460, category: "Motori", specs: "24V, Encoder integrato", role: "Asse Z — precisione" },

  // === FIELDBUS / IO ===
  { id: "BALLUFF BNI004L", name: "Balluff BNI IO-Link Master", q: 2, supplier: "Balluff", status: "Disponibile", value: 380, category: "Fieldbus", specs: "8 porte IO-Link", role: "Hub sensori distribuiti" },
  { id: "BALLUFF BNI PNT-508", name: "Balluff BNI PROFINET", q: 1, supplier: "Balluff", status: "Disponibile", value: 290, category: "Fieldbus", specs: "PROFINET IO", role: "Gateway PROFINET" },
  { id: "6XV1 830-0EH10", name: "Cavo Profibus", q: 1, supplier: "Siemens", status: "Disponibile", value: 35, category: "Cablaggio", specs: "FC Standard Cable", role: "Bus comunicazione" },
  { id: "RELE-DIN-8", name: "Moduli Rele Interfaccia DIN", q: 8, supplier: "Generico", status: "Disponibile", value: 120, category: "Automazione", specs: "24V DC, DIN Rail", role: "Interfaccia uscite" },

  // === ACCESSORI INDUSTRIALI ===
  { id: "EDWARDS RV3", name: "Edwards RV3 Pompa Vuoto", q: 1, supplier: "Edwards", status: "Disponibile", value: 480, category: "Accessori", specs: "Pompa rotativa", role: "Vuoto industriale" },
  { id: "SIEMENS 8WD4", name: "Siemens Torretta Segnalazione", q: 1, supplier: "Siemens", status: "Disponibile", value: 250, category: "Segnalazione", specs: "G/Y/B/R + Cicalino", role: "Stato macchina visivo" },

  // === STRUTTURA CONFIG G (ATTIVA) ===
  { id: "MOLLE-GIALLE-90N", name: "Molle Gialle 90N — Config G", q: 4, supplier: "Misumi", status: "Disponibile", value: 80, category: "Struttura", specs: "ISO gialle, 90N cad, Config G attiva", role: "Smorzamento vibrazionale basamento", vincente: "Config G attiva — fn ~3.83 Hz, attenuazione 99.99% @400Hz" },
  { id: "PIASTRE-XY-V32", name: "Piastre Basamento XY (V32)", q: 2, supplier: "V32 interno", status: "Da Integrare", value: 0, category: "Struttura", specs: "Fresate su V32 — dim. TBD, +15-30kg massa sospesa", role: "Incremento massa sospesa + rigidità basamento XY" },

  // === DA ACQUISTARE (MANCANTI) ===
  { id: "EPOXY-G", name: "Epoxy Granite 20kg", q: 1, supplier: "Inerteco", status: "Mancante", value: 255, category: "Struttura", specs: "Primo lotto — test YouTube", role: "Smorzamento tubolari" },
  { id: "VITI-1605-XY", name: "Viti 1605 X+Y + BK12/BF12", q: 1, supplier: "Generico", status: "Mancante", value: 355, category: "Motion", specs: "2 assi completi", role: "Trasmissione assi" },
  { id: "MANDRINO-ER20", name: "Mandrino 2.2kW ER20 + VFD", q: 1, supplier: "Generico", status: "Mancante", value: 625, category: "Mandrino", specs: "2.2kW, ER20, 24000rpm", role: "Utensile rotante" },
  { id: "PATTINO-CAVI", name: "Pattino HIWIN + Cavi + Quadro", q: 1, supplier: "Generico", status: "Mancante", value: 320, category: "Cablaggio", specs: "IP54, schermato", role: "Cablaggio schermato" },
  { id: "HARDWARE-KIT", name: "Hardware (bulloni/giunti/morsetti)", q: 1, supplier: "Generico", status: "Mancante", value: 410, category: "Hardware", specs: "Scorta inclusa", role: "Fissaggio generale" },
  { id: "STRUTTURA-KIT", name: "Tubolari + Profili Alu + Copri-viti", q: 1, supplier: "Generico", status: "Mancante", value: 285, category: "Struttura", specs: "Parzialmente acquisiti", role: "Struttura Config G" },
];

// Categorie per filtri
export const CATEGORIES = [
  "Tutti",
  "Automazione",
  "HMI",
  "Sensori",
  "Encoder",
  "Visione",
  "Termoregolazione",
  "Motion",
  "Motori",
  "Fieldbus",
  "Cablaggio",
  "Segnalazione",
  "Accessori",
  "Struttura",
  "Mandrino",
  "Hardware",
] as const;

// Helpers
export const getAvailableValue = (items: BOMItem[]) =>
  items.filter(i => i.status === "Disponibile").reduce((a, i) => a + i.value * i.q, 0);

export const getMissingValue = (items: BOMItem[]) =>
  items.filter(i => i.status === "Mancante").reduce((a, i) => a + i.value * i.q, 0);

export const getTotalValue = (items: BOMItem[]) =>
  items.reduce((a, i) => a + i.value * i.q, 0);

export const getVincenteItems = (items: BOMItem[]) =>
  items.filter(i => i.vincente);
