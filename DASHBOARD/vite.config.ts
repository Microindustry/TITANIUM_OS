// vite.config.ts | TITANIUM_OS | v2.1 | 2026-06-11
// Middleware dev: serve API core direttamente (STATE, md-files, file)
// Flask rimane per operazioni pesanti (scan, TTS, video, semantic search)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

const ROOT = path.resolve(__dirname, '..')
const STATE_FILE = path.join(ROOT, 'BRAIN', 'STATE.json')
const CONTENT_DIR = process.env.CONTENT_ENGINE_DIR || `C:\\Users\\${process.env.USERNAME || 'benen'}\\MICROINDUSTRY\\CONTENT_ENGINE`
const SKIP_DIRS = new Set(['BACKUPS', 'VERSIONS', 'node_modules', '__pycache__', '.git', 'venv', '.venv'])

// ── helpers ──────────────────────────────────────────────────
// NB: niente Access-Control-Allow-Origin — la dashboard chiama questi endpoint
// same-origin (fetch relative); con '*' qualsiasi sito nel browser potrebbe
// leggere/scrivere STATE.json via PATCH /api/state (drive-by su localhost).
function json(res: ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function scanMdFiles(dir: string): any[] {
  const files: any[] = []
  function walk(d: string) {
    let entries: fs.Dirent[]
    try { entries = fs.readdirSync(d, { withFileTypes: true }) } catch { return }
    for (const e of entries) {
      if (SKIP_DIRS.has(e.name)) continue
      const full = path.join(d, e.name)
      if (e.isDirectory()) { walk(full); continue }
      if (!e.name.endsWith('.md')) continue
      try {
        const stat = fs.statSync(full)
        files.push({
          path: full,
          rel: path.relative(ROOT, full),
          name: e.name,
          size_kb: Math.round(stat.size / 1024 * 10) / 10,
          modified: new Date(stat.mtimeMs).toISOString(),
        })
      } catch { /* skip */ }
    }
  }
  walk(dir)
  return files.sort((a, b) => b.modified.localeCompare(a.modified))
}

// ── endpoint handlers ─────────────────────────────────────────
function handleApi(req: IncomingMessage, res: ServerResponse): boolean {
  const url = new URL(req.url!, `http://localhost`)
  const p = url.pathname

  // OPTIONS preflight (same-origin: nessun header CORS necessario)
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Allow': 'GET,PATCH,POST,OPTIONS' })
    res.end(); return true
  }

  // GET /api/state
  if (p === '/api/state' && req.method === 'GET') {
    try { json(res, readJson(STATE_FILE)) }
    catch (e) { json(res, { error: String(e) }, 500) }
    return true
  }

  // PATCH /api/state
  if (p === '/api/state' && req.method === 'PATCH') {
    let body = ''
    req.on('data', c => body += c)
    req.on('end', () => {
      try {
        const state = readJson(STATE_FILE)
        const patch = JSON.parse(body || '{}')
        Object.assign(state, patch)
        state.last_update = new Date().toISOString()
        fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
        json(res, { ok: true, state })
      } catch (e) { json(res, { error: String(e) }, 500) }
    })
    return true
  }

  // GET /api/md-files → solo BRAIN/KNOWLEDGE + file chiave (knowledge base)
  if (p === '/api/md-files' && req.method === 'GET') {
    try {
      const knowledgeDir = path.join(ROOT, 'BRAIN', 'KNOWLEDGE')
      const keyFiles = [
        path.join(ROOT, 'BRAIN', 'ECOSYSTEM_MANIFEST.md'),
        path.join(ROOT, 'BRAIN', 'RULES.md'),
        path.join(ROOT, 'AUTOMATIONS', 'AUTOMATIONS_MASTER.md'),
        path.join(ROOT, 'BRAIN', 'github_profile_readme.md'),
      ]
      const files = [
        ...scanMdFiles(knowledgeDir),
        ...keyFiles.filter(f => fs.existsSync(f)).map(f => {
          const stat = fs.statSync(f)
          const rel = path.relative(ROOT, f)
          return { path: f, rel, name: path.basename(f), size_kb: Math.round(stat.size / 1024 * 10) / 10, modified: new Date(stat.mtimeMs).toISOString() }
        }),
      ].sort((a, b) => b.modified.localeCompare(a.modified))
      json(res, { ok: true, total: files.length, files })
    } catch (e) { json(res, { error: String(e) }, 500) }
    return true
  }

  // GET /api/content-files → episodi da entrambe le cartelle, con frontmatter YAML
  if (p === '/api/content-files' && req.method === 'GET') {
    try {
      const epDirs = [
        path.join(ROOT, 'CONTENT_ENGINE', 'DATABASE', 'episodes'),
        path.join(CONTENT_DIR, 'DATABASE', 'episodes'),
      ]
      const allFiles: any[] = []
      const seenNames = new Set<string>()
      for (const dir of epDirs) {
        if (!fs.existsSync(dir)) continue
        for (const f of scanMdFiles(dir)) {
          if (seenNames.has(f.name)) continue
          seenNames.add(f.name)
          // Leggi frontmatter YAML (tra --- e ---)
          let meta: Record<string, string> = {}
          try {
            const raw = fs.readFileSync(f.path, 'utf-8').replace(/\r\n/g, '\n')
            const match = raw.match(/^---\n([\s\S]*?)\n---/)
            if (match) {
              for (const line of match[1].split('\n')) {
                const [k, ...rest] = line.split(':')
                if (k && rest.length) meta[k.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
              }
            }
          } catch {}
          allFiles.push({ ...f, meta })
        }
      }
      allFiles.sort((a, b) => (a.meta.id || a.name).localeCompare(b.meta.id || b.name))
      json(res, { ok: true, total: allFiles.length, files: allFiles })
    } catch (e) { json(res, { error: String(e) }, 500) }
    return true
  }

  // GET /api/file?path=...
  if (p === '/api/file' && req.method === 'GET') {
    const target = url.searchParams.get('path') || ''
    if (!target) { json(res, { ok: false, error: 'path mancante' }, 400); return true }
    const MENTE_DIR = process.env.MENTE_DIR || path.join(process.env.USERPROFILE || `C:\\Users\\${process.env.USERNAME || 'benen'}`, 'MICROINDUSTRY', 'MENTE')
    // I path relativi si risolvono dalla ROOT del progetto (TITANIUM_OS), NON dal cwd del
    // dev server (DASHBOARD). Senza, "DOCS/PITCH_*.md" finiva in DASHBOARD/DOCS -> 404 (pitch invisibili).
    const resolved = path.resolve(ROOT, target)
    // Sicurezza: solo dentro ROOT, CONTENT_ENGINE o MENTE
    const allowed = resolved.startsWith(ROOT) || resolved.startsWith(CONTENT_DIR) || resolved.startsWith(MENTE_DIR)
    // Denylist segreti (red-team #38, att05): mai servire .env* / _VAULT / .git via API
    const DENY = /(^|[\\/])(\.env[^\\/]*|_VAULT|\.git)([\\/]|$)/i
    if (!allowed || DENY.test(resolved)) { json(res, { ok: false, error: 'percorso non consentito' }, 403); return true }
    try {
      const stat = fs.statSync(resolved)
      if (stat.isDirectory()) {
        const children = fs.readdirSync(resolved, { withFileTypes: true }).map(e => ({
          name: e.name, is_dir: e.isDirectory(),
          size_kb: e.isFile() ? Math.round(fs.statSync(path.join(resolved, e.name)).size / 1024 * 10) / 10 : null
        }))
        json(res, { ok: true, type: 'dir', path: resolved, children })
      } else {
        if (stat.size > 200_000) { json(res, { ok: false, error: `file troppo grande (${Math.floor(stat.size/1024)}KB)` }, 413); return true }
        const content = fs.readFileSync(resolved, 'utf-8')
        json(res, { ok: true, type: 'file', path: resolved, content, size_kb: Math.round(stat.size / 1024 * 10) / 10 })
      }
    } catch (e) { json(res, { ok: false, error: String(e) }, 404) }
    return true
  }

  // GET /api/health
  if (p === '/api/health' && req.method === 'GET') {
    json(res, { status: 'ok', source: 'vite-middleware', time: new Date().toISOString(), state_exists: fs.existsSync(STATE_FILE) })
    return true
  }

  // GET /api/root
  if (p === '/api/root' && req.method === 'GET') {
    const MENTE_DIR_ROOT = process.env.MENTE_DIR || path.join(process.env.USERPROFILE || `C:\\Users\\${process.env.USERNAME || 'benen'}`, 'MICROINDUSTRY', 'MENTE')
    json(res, { ok: true, root: ROOT, allowed: [ROOT, MENTE_DIR_ROOT, CONTENT_DIR] })
    return true
  }

  return false // non gestito → prova proxy Flask
}

// ── vite plugin ───────────────────────────────────────────────
function titaniumApiPlugin() {
  return {
    name: 'titanium-api',
    configureServer(server: any) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url?.startsWith('/api/')) {
          if (handleApi(req, res)) return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    titaniumApiPlugin(), // deve essere prima di react() per intercettare /api
    react(),
    tailwindcss(),
  ],
  // motion (framer-motion) usa i Context di React: senza dedupe Vite può caricare due copie
  // di React -> "Invalid hook call". Dedupe + pre-bundle esplicito = animazioni stabili.
  resolve: { dedupe: ['react', 'react-dom'] },
  optimizeDeps: { include: ['react', 'react-dom', 'motion', 'motion/react'] },
  server: {
    // Flask rimane come fallback per /api/* non gestiti dal middleware
    // (scan, TTS, video, semantic search, content/trigger, ecc.)
    proxy: {
      '/api/scan': 'http://localhost:5001',
      '/api/digest': 'http://localhost:5001',
      '/api/digest/search': 'http://localhost:5001',
      '/api/open': 'http://localhost:5001',
      '/api/md-save': 'http://localhost:5001',
      '/api/content/trigger': 'http://localhost:5001',
      '/api/content/archive': 'http://localhost:5001',
      '/api/content/generate': 'http://localhost:5001',
      '/api/content/tts': 'http://localhost:5001',
      '/api/content/video': 'http://localhost:5001',
      '/api/content/distribute': 'http://localhost:5001',
      '/api/semantic/search': 'http://localhost:5001',
      '/api/view': 'http://localhost:5001',
      '/api/view-index': 'http://localhost:5001',
      '/api/watchdog': 'http://localhost:5001',
      '/api/tasks': 'http://localhost:5001',
      '/api/llm': 'http://localhost:5001',
      '/api/sanitizer': 'http://localhost:5001',
      '/api/rag': 'http://localhost:5001',
      '/api/nina': 'http://localhost:5001',
      '/api/daily-brief': 'http://localhost:5001',
      '/api/agents': 'http://localhost:5001',
      '/api/screen': 'http://localhost:5001',
      '/api/media': 'http://localhost:5001',
      '/api/photos': 'http://localhost:5001',
      '/api/pdfs': 'http://localhost:5001',
      '/api/programs': 'http://localhost:5001',
      '/api/restart': 'http://localhost:5001',
      // mancavano: senza proxy il dev server rispondeva 200 + index.html e il
      // frontend moriva su "Unexpected token '<'" (vista RETE sorgente SISTEMA).
      '/api/graph': 'http://localhost:5001',
      '/api/critiche': 'http://localhost:5001',
      '/api/bussola': 'http://localhost:5001',
      '/api/episodes': 'http://localhost:5001',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'force-graph': ['react-force-graph-2d'],
          'grid-layout': ['react-grid-layout'],
        },
      },
    },
  },
})
