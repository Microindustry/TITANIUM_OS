import { useState, useMemo } from "react";
import { Card, Badge, StatBlock } from "./UIComponents";
import { BOM_ITEMS, CATEGORIES, getAvailableValue, getMissingValue, getTotalValue } from "../data/bomData";
import type { BOMItem } from "../data/bomData";

const statusVariant = (s: BOMItem["status"]) =>
  s === "Disponibile" ? "success" : s === "Mancante" ? "danger" : "warning";

export const WarehouseView = () => {
  const [filter, setFilter] = useState("Tutti");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Tutti" | "Disponibile" | "Mancante" | "Da Integrare">("Tutti");

  const filtered = useMemo(() => {
    let items = BOM_ITEMS;
    if (filter !== "Tutti") items = items.filter(i => i.category === filter);
    if (statusFilter !== "Tutti") items = items.filter(i => i.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q) ||
        i.supplier.toLowerCase().includes(q) ||
        i.role.toLowerCase().includes(q)
      );
    }
    return items;
  }, [filter, search, statusFilter]);

  const available = getAvailableValue(BOM_ITEMS);
  const missing = getMissingValue(BOM_ITEMS);
  const total = getTotalValue(BOM_ITEMS);
  const countDisp = BOM_ITEMS.filter(i => i.status === "Disponibile").length;
  const countManc = BOM_ITEMS.filter(i => i.status === "Mancante").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Magazzino V32</h1>
          <p className="text-sm text-zinc-500 mt-1">Inventario completo — Lista CNC 12/02/26 + ASSOLUTO V3.0</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success">{countDisp} disponibili</Badge>
          <Badge variant="danger">{countManc} mancanti</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBlock label="Asset Recuperati" value={`\u20AC${available.toLocaleString()}`} sub="81% del totale — costo 0" color="text-green-400" />
        <StatBlock label="Da Acquistare" value={`\u20AC${missing.toLocaleString()}`} sub="Investimento necessario" color="text-red-400" />
        <StatBlock label="Valore Totale" value={`\u20AC${total.toLocaleString()}`} sub={`Rapporto ${(available / missing).toFixed(1)}x`} color="text-blue-400" />
        <StatBlock label="Componenti" value={`${BOM_ITEMS.length}`} sub={`${countDisp} OK + ${countManc} da comprare`} color="text-yellow-400" />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Cerca componente, ID, fornitore..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
          className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-blue-600"
        >
          <option value="Tutti">Stato: Tutti</option>
          <option value="Disponibile">Disponibile</option>
          <option value="Mancante">Mancante</option>
          <option value="Da Integrare">Da Integrare</option>
        </select>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === cat
                ? "bg-blue-600 text-white"
                : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black text-zinc-500 text-[10px] uppercase font-mono">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Componente</th>
                <th className="px-4 py-3 hidden lg:table-cell">Q</th>
                <th className="px-4 py-3 hidden md:table-cell">Fornitore</th>
                <th className="px-4 py-3 hidden lg:table-cell">Specs</th>
                <th className="px-4 py-3 hidden xl:table-cell">Ruolo</th>
                <th className="px-4 py-3 text-right">Valore</th>
                <th className="px-4 py-3">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filtered.map(item => (
                <tr key={item.id} className={`hover:bg-zinc-800/30 transition-colors ${item.vincente ? "border-l-2 border-l-yellow-500" : ""}`}>
                  <td className="px-4 py-3 font-mono text-blue-500 text-xs whitespace-nowrap">{item.id}</td>
                  <td className="px-4 py-3 text-zinc-200 font-medium">
                    {item.name}
                    {item.vincente && (
                      <div className="text-[10px] text-yellow-500 font-mono mt-0.5">{item.vincente}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 hidden lg:table-cell">{item.q}</td>
                  <td className="px-4 py-3 text-zinc-400 hidden md:table-cell">{item.supplier}</td>
                  <td className="px-4 py-3 text-zinc-500 text-xs hidden lg:table-cell">{item.specs}</td>
                  <td className="px-4 py-3 text-zinc-500 text-xs hidden xl:table-cell">{item.role}</td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-300">{`\u20AC${item.value}`}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-zinc-600 text-sm">Nessun componente trovato.</div>
        )}
      </Card>

      {/* Footer stats */}
      <div className="flex justify-between text-xs text-zinc-600 font-mono">
        <span>{filtered.length} componenti visualizzati</span>
        <span>Totale filtrato: {`\u20AC${filtered.reduce((a, i) => a + i.value * i.q, 0).toLocaleString()}`}</span>
      </div>
    </div>
  );
};
