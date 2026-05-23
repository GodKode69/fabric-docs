---
layout: home

title: Fabric
titleTemplate: Home

navbar: true
sidebar: false

hero:
  name: "Fabric"
  text: "All In One Discord Bot"
  tagline: "Moderation, automation, utility, music, and more built into one sleek modular experience."

  image:
    src: /assets/f.gif
    alt: Fabric Logo
---

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const cursorX = ref(0)
const cursorY = ref(0)
const visible = ref(false)

const stats = ref({ commands: null, guilds: null, users: null, uptime: null, ping: null })
const statsLoaded = ref(false)
let pollTimer = null

function moveCursor(e) { cursorX.value = e.clientX; cursorY.value = e.clientY; visible.value = true }
function hideCursor() { visible.value = false }

function animateCount(el, from, to, duration = 900) {
  if (from === to) return
  const start = performance.now()
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.floor(from + (to - from) * ease).toLocaleString()
    if (p < 1) requestAnimationFrame(step)
    else el.textContent = Math.floor(to).toLocaleString()
  }
  requestAnimationFrame(step)
}

async function fetchStats() {
  try {
    const res = await fetch('https://api.godkode.xyz/stats')
    const data = await res.json()
    const prev = { ...stats.value }
    const wasLoaded = statsLoaded.value
    stats.value = {
      commands: data.commands,
      categories: data.categories,
      executed: data.executed,
      voice: data.voice,
      guilds: data.guilds,
      users: data.users,
      uptime: data.uptime?.formatted ?? '—',
      ping: data.ping,
    }
    statsLoaded.value = true
    await new Promise(r => setTimeout(r, 60))
    document.querySelectorAll('[data-count]').forEach(el => {
      const key = el.dataset.count
      const to = stats.value[key]
      const from = wasLoaded ? (prev[key] ?? 0) : 0
      if (typeof to === 'number') animateCount(el, from, to)
    })
  } catch (e) {
    console.error('[stats] fetch failed', e)
  }
}

onMounted(() => {
  window.addEventListener('mousemove', moveCursor)
  window.addEventListener('mouseleave', hideCursor)
  fetchStats()
  pollTimer = setInterval(fetchStats, 60000)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveCursor)
  window.removeEventListener('mouseleave', hideCursor)
  clearInterval(pollTimer)
})
</script>

<div
  class="cursor-dot"
  :class="{ visible }"
  :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
/>

<div class="bg-grid"></div>

<div class="bg-glow glow-1"></div>
<div class="bg-glow glow-2"></div>
<div class="bg-glow glow-3"></div>

<div class="top-actions">
  <a href="/documentation/">Documentation</a>
  <a href="/commands/">Commands</a>
  <a href="https://discord.gg/BKuQvPrUQR">Support</a>
  <a href="https://discord.com/oauth2/authorize?client_id=1226510987407130624">
    Invite
  </a>
</div>

<div class="stats-container">

  <div class="stat-card">
    <span v-if="statsLoaded" data-count="commands">{{ stats.commands }}</span>
    <span v-else class="stat-placeholder">—</span>
    <span> Commands </span>
    <hr>
    <span v-if="statsLoaded" data-count="categories">{{ stats.categories }}</span>
    <span v-else class="stat-placeholder">—</span>
    <span> Categories </span>
  </div>

  <div class="stat-card">
    <span v-if="statsLoaded" data-count="guilds">{{ stats.guilds }}</span>
    <span v-else class="stat-placeholder">—</span>
    <span> Servers </span>
    <hr>
    <span v-if="statsLoaded" data-count="users">{{ stats.users }}</span>
    <span v-else class="stat-placeholder">—</span>
    <span> Users </span>
  </div>

  <div class="stat-card stat-card--text">
      <span v-if="statsLoaded" class="uptime-val">{{ stats.uptime }}</span>
      <span v-else class="stat-placeholder">—</span>
      <hr>
    <span v-if="statsLoaded" class="ping-badge">{{ stats.ping }}ms</span>
  </div>

  <div class="stat-card stat-card--text">
    <span v-if="statsLoaded" data-count="executed">{{ stats.executed }}</span>
    <span v-else class="stat-placeholder">—</span>
    <span> Commands Executed </span>
    <hr>
    <span v-if="statsLoaded" data-count="voice">{{ stats.voice }}</span>
    <span v-else class="stat-placeholder">—</span>
    <span> Voice Connections </span>
  </div>
</div>

---

# Core Systems

<div class="feature-grid">

<div class="feature-card">
🛡 Moderation
<hr>
<p>
Automod, anti-spam, logging, role management, bans, warnings,
and advanced moderation systems.
</p>
</div>

<div class="feature-card">
⚙ Automation
<hr>
<p>
Reaction roles, tickets, reminders, welcome systems,
workflows, and server automation tools.
</p>
</div>

<div class="feature-card">
🎵 Music
<hr>
<p>
Queue management, playlists, filters, low latency playback,
and stable music streaming.
</p>
</div>

<div class="feature-card">
📊 Analytics
<hr>
<p>
Server activity tracking, moderation history,
logging pipelines, and operational insights.
</p>
</div>

<div class="feature-card">
⚡ Utilities
<hr>
<p>
Fast utility commands and management tools
designed for both admins and members.
</p>
</div>

<div class="feature-card">
✨ Experience
<hr>
<p>
Clean interactions, polished UX, modern design language,
and unified command systems.
</p>
</div>

</div>

---

# Special Features

<div class="feature-grid">
<div class="feature-card">
Colouful Embeds
<hr
><p>
Every embed has rotating embed colour from a pastel color pallete.
</p>
</div>

<div class="feature-card">
Automatic Message Deletion
<hr>
<p>
The bot automatically deletes it's message automatically in 5 seconds, some messages may last upto 15 seconds.
</p>
</div>
</div>

<footer class="fabric-footer">
  <div>
    © 2024 - Current | GodKode™ — All rights reserved.
  </div>

  <a href="https://godkode.xyz" target="_blank">
    godkode.xyz
  </a>
</footer>

<style>
:root {
  color-scheme: dark light;

  --vp-c-brand-1: #7c5cff;
  --vp-c-brand-2: #9f7cff;

  --fabric-solid: #ffffff;
  --fabric-text-soft: #94a3b8;
  --fabric-border: rgba(255, 255, 255, 0.08);
  --fabric-card: rgba(255, 255, 255, 0.04);
  --fabric-card-strong: rgba(255, 255, 255, 0.07);
  --fabric-grid: rgba(255, 255, 255, 0.025);
  --fabric-bg:
    radial-gradient(circle at top, rgba(124, 92, 255, 0.08), transparent 30%),
    #05070b;
}

html:not(.dark) {
  --fabric-solid: #0f172a;
  --fabric-text-soft: #475569;
  --fabric-border: rgba(15, 23, 42, 0.08);
  --fabric-card: rgba(255, 255, 255, 0.78);
  --fabric-card-strong: rgba(255, 255, 255, 0.92);
  --fabric-grid: rgba(15, 23, 42, 0.05);
  --fabric-bg:
    radial-gradient(circle at top, rgba(124, 92, 255, 0.06), transparent 30%),
    #f6f8fc;
}

html, body, #app {
  background: var(--fabric-bg);
}

body {
  overflow-x: hidden;
  margin: 0;
}

.VPNavBarTitle .title {
  display: none !important;
}

html, body, a, button, input, textarea, select {
  cursor: none !important;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--fabric-solid);
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transform: translate(-50%, -50%);
}

.cursor-dot.visible {
  opacity: 1;
}

/* ── Hero ── */
@media (max-width: 767px) {
  .VPHero .container {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .VPHero .image {
    order: -1 !important;
    margin-bottom: 1.5rem !important;
    transform: none !important;
  }

  .VPHero .main {
    order: 1 !important;
    text-align: center !important;
  }
}

.top-actions {
  display: flex;
  gap: 0.8rem;
  justify-content: flex-start;
  margin: -1rem 0 2.5rem;
  flex-wrap: wrap;
}

.top-actions a {
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  font-size: 0.92rem;
  font-weight: 600;
  padding: 0.75rem 1.2rem;
  border-radius: 999px;
  background: var(--fabric-card);
  border: 1px solid var(--fabric-border);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}

.top-actions a:hover {
  transform: translateY(-4px);
  background: var(--fabric-card-strong);
  border-color: rgba(124, 92, 255, 0.35);
}

.bg-grid {
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background-image:
    linear-gradient(var(--fabric-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--fabric-grid) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(circle at center, black, transparent 85%);
}

.bg-grid::before {
  content: "";
  position: absolute;
  inset: -200%;
  background:
    radial-gradient(circle, rgba(124, 92, 255, 0.08) 0 1px, transparent 1.5px) 0 0 / 42px 42px,
    radial-gradient(circle, rgba(0, 191, 255, 0.05) 0 1px, transparent 1.5px) 21px 21px / 42px 42px;
  opacity: 0.45;
  animation: patternMove 40s linear infinite;
}

.bg-glow {
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 999px;
  filter: blur(120px);
  opacity: 0.18;
  z-index: -2;
  pointer-events: none;
  animation: float 12s ease-in-out infinite alternate;
}

.glow-1 { top: -180px; left: -120px; background: #7c5cff; }
.glow-2 { top: 120px; right: -180px; background: #00bfff; animation-delay: -4s; }
.glow-3 { bottom: -200px; left: 30%; background: #ff3ea5; animation-delay: -8s; }

/* ── Stat cards ── */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 2rem 0 3rem;
}

.stat-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 30px;
  text-align: center;
  background: var(--fabric-card);
  border: 1px solid var(--fabric-border);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.16);
  transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-8px);
  border-color: rgba(124, 92, 255, 0.35);
  background: var(--fabric-card-strong);
}

.stat-card h2 {
  font-size: 2rem;
  margin: 0;
  letter-spacing: -0.04em;
  color: var(--vp-c-text-1);
  min-height: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-card p {
  margin-top: 0.4rem;
  color: var(--fabric-text-soft);
}

.stat-card--text h2 {
  font-size: 1.3rem;
  letter-spacing: -0.02em;
}

.uptime-val {
  font-variant-numeric: tabular-nums;
}

.ping-badge {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.18rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(124, 92, 255, 0.15);
  border: 1px solid rgba(124, 92, 255, 0.3);
  color: var(--vp-c-brand-1);
  letter-spacing: 0.04em;
}

.stat-placeholder {
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
  border-radius: 6px;
  background: var(--fabric-border);
  animation: pulse 1.4s ease-in-out infinite;
}

/* ── Feature grid ── */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.feature-card {
  padding: 1.4rem;
  border-radius: 30px;
  background: var(--fabric-card);
  border: 1px solid var(--fabric-border);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: rgba(124, 92, 255, 0.34);
  background: var(--fabric-card-strong);
}

.feature-card h2 {
  margin-top: 0;
  margin-bottom: 0.7rem;
  font-size: 1.1rem;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

.feature-card p {
  margin: 0;
  color: var(--fabric-text-soft);
  line-height: 1.7;
}

/* ── Hero typography ── */
.VPHero .name {
  background: linear-gradient(90deg, #ffffff, #b7c3ff, #7c5cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.05em;
}

html:not(.dark) .VPHero .name {
  background: linear-gradient(90deg, #0f172a, #334155, #7c5cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.VPHero .text {
  font-size: 2rem !important;
  font-weight: 700;
}

.VPHero .tagline {
  color: var(--fabric-text-soft);
  max-width: 720px;
  line-height: 1.7;
}

.VPHero .image {
  background: transparent !important;
  transform: translateY(-24px);
}

.VPHero .image img {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 999px;
  overflow: hidden;
  background: transparent !important;
  transform: none !important;
  transition: none !important;
  box-shadow:
    0 0 30px rgba(255,255,255,0.28),
    0 0 60px rgba(255,255,255,0.12);
}

html:not(.dark) .VPHero .image img {
  box-shadow:
    0 10px 30px rgba(15,23,42,0.18),
    0 0 10px rgba(15,23,42,0.08);
}

/* ── Footer ── */
.fabric-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 5rem;
  padding: 2rem 0 0.5rem;
  border-top: 1px solid var(--fabric-border);
  color: var(--fabric-text-soft);
  font-size: 0.92rem;
}

.fabric-footer a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.fabric-footer a:hover { opacity: 0.8; }

a { text-decoration: none !important; }

/* ── Animations ── */
@keyframes float {
  from { transform: translateY(-15px) scale(1); }
  to { transform: translateY(15px) scale(1.05); }
}

@keyframes patternMove {
  from { transform: translate3d(0, 0, 0) rotate(0deg); }
  to { transform: translate3d(-120px, -120px, 0) rotate(1deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .stats-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .top-actions {
    margin-top: 1rem;
  }

  .fabric-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .VPHero .text {
    font-size: 1.6rem !important;
  }

  .VPHero .image img {
    width: 180px;
    height: 180px;
  }

  .VPHero .image {
    transform: none !important;
  }
}

.VPHome {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.VPContent.is-home {
  padding-bottom: 0 !important;
}

.VPFooter {
  display: none !important;
}

.Layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
