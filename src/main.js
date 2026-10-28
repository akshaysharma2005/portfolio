import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { featured, more, milestones, setup, personal } from './data.js';
import { playIntro } from './intro.js';

document.documentElement.classList.add('js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- Work: projects on the left, sticky screen on the right ---------- */
const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

document.getElementById('featured').innerHTML = featured.map((p, i) => `
  <article class="work reveal" data-i="${i}">
    ${p.shot ? `<img class="work-shot" src="${p.shot}" alt="${esc(p.name)} dashboard preview" loading="lazy" width="1100" height="688">` : ''}
    <div class="work-idx">0${i + 1}</div>
    <h3 class="work-name">${esc(p.name)}</h3>
    <p class="work-tag">${esc(p.tagline)}</p>
    <div class="work-status">
      <span class="status ${p.status}">${esc(p.statusText)}</span>
      <span>${esc(p.year)}</span>
    </div>
    <p class="work-desc">${esc(p.desc)}</p>
    <ul class="work-notes">${p.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
    ${p.stack.length ? `<div class="stack">${p.stack.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
    <div class="work-links">
      ${p.live ? `<a class="link-arrow" href="${p.live}" target="_blank" rel="noopener">Explore Project</a>` : ''}
      ${p.repo ? `<a class="link-arrow" href="${p.repo}" target="_blank" rel="noopener">GitHub Repository</a>` : ''}
    </div>
  </article>`).join('');

const screenFrame = document.getElementById('screenFrame');
screenFrame.insertAdjacentHTML('afterbegin', featured.map((p, i) =>
  `<img src="${p.shot}" alt="${esc(p.name)}" width="1100" height="688" class="${i === 0 ? 'on' : ''}" decoding="async">`).join(''));
const shots = [...screenFrame.querySelectorAll('img')];
const screenIdx = document.getElementById('screenIdx');
const screenUrl = document.getElementById('screenUrl');
const workEls = [...document.querySelectorAll('.work')];
let shotNow = -1;

function setShot(i) {
  if (i === shotNow) return;
  const prev = shotNow;
  shotNow = i;
  shots.forEach((img, k) => {
    img.classList.toggle('on', k === i);
    img.classList.toggle('below', k > i);
  });
  workEls.forEach((el, k) => el.classList.toggle('hot', k === i));
  screenIdx.textContent = `0${i + 1} / 0${featured.length}`;
  screenUrl.textContent = featured[i].name;
  if (prev >= 0) {
    screenFrame.classList.remove('scan');
    void screenFrame.offsetWidth;
    screenFrame.classList.add('scan');
  }
}

function updateWork() {
  const mid = window.innerHeight * 0.55;
  let active = 0;
  workEls.forEach((el, i) => { if (el.getBoundingClientRect().top < mid) active = i; });
  setShot(active);
}

document.getElementById('archive').innerHTML = more.map((p) => `
  <div class="arow reveal">
    <span class="arow-name">${esc(p.name)}</span>
    <span class="arow-desc">${esc(p.desc)}</span>
    <span class="arow-stack">${p.stack.map(esc).join(' · ')}</span>
    <span class="arow-year">${esc(p.year)}</span>
    <span class="arow-links">
      ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">Code</a>` : ''}
    </span>
  </div>`).join('');

/* ---------- Capabilities: the 3D cricket pitch stage ---------- */
document.getElementById('caps').innerHTML = setup.map((s, i) => `
  <li class="xr-card${i === 0 ? ' on' : ''}" data-i="${i}">
    <p class="xr-part"><span>0${i + 1}</span>${esc(s.label)}</p>
    <h3>${esc(s.title)}</h3>
    <p class="xr-line">${esc(s.line)}</p>
    <ul>${s.items.map(([a, b]) => `<li><span>${esc(a)}</span><span>${esc(b)}</span></li>`).join('')}</ul>
  </li>`).join('');

document.getElementById('xrSteps').innerHTML = setup.map((s, i) => `<li class="${i === 0 ? 'on' : ''}"><span>0${i + 1}</span>${esc(s.title)}</li>`).join('');

const xrSection = document.getElementById('capabilities');
if (reduceMotion) {
  xrSection.classList.add('static');
} else {
  const near = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    near.disconnect();
    import('./xray.js').then((m) => m.initXray(setup)).catch(() => xrSection.classList.add('static'));
  }, { rootMargin: '150% 0px' });
  near.observe(xrSection);
}

/* ---------- Journey: Cricket Wagon Wheel & Milestones ---------- */
const list = document.getElementById('milestones');
list.innerHTML = milestones.map((m, i) => `
  <li class="ms" data-i="${i}">
    <span class="ms-t">SHOT ${i + 1}</span>
    <div>
      <div class="ms-meta">
        <span class="ms-shot">${esc(m.shot)}</span> · 
        <span class="ms-sector">${esc(m.sector)}</span> · 
        <span class="ms-speed">${esc(m.speed)}</span>
      </div>
      <h3>${esc(m.title)}</h3>
      <p>${esc(m.text)}</p>
    </div>
  </li>`).join('');

// Setup Wagon Wheel coordinates
const CX = 500;
const CY = 300;
const RX = 440;
const RY = 240;

const wagonRays = document.getElementById('wagonRays');
const cornersG = document.getElementById('corners');
const activeTracer = document.getElementById('activeTracer');
const mapBall = document.getElementById('mapBall');
const mapNow = document.getElementById('mapNow');
const NS = 'http://www.w3.org/2000/svg';

// Compute targets
const targets = milestones.map((m) => {
  const rad = ((m.angle - 90) * Math.PI) / 180;
  const x = CX + Math.cos(rad) * RX * m.distance;
  const y = CY + Math.sin(rad) * RY * m.distance;
  return { x, y, m };
});

// Create background ray lines
targets.forEach(({ x, y }) => {
  const line = document.createElementNS(NS, 'line');
  line.setAttribute('x1', CX);
  line.setAttribute('y1', CY);
  line.setAttribute('x2', x.toFixed(1));
  line.setAttribute('y2', y.toFixed(1));
  line.setAttribute('stroke', 'rgba(226, 232, 240, 0.12)');
  line.setAttribute('stroke-dasharray', '2 4');
  wagonRays.appendChild(line);
});

// Create corner pin markers
const cornerEls = targets.map(({ x, y, m }, i) => {
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', 'corner');
  g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  g.innerHTML = `
    <circle r="14" class="corner-bg"></circle>
    <text text-anchor="middle" dy="4">${i + 1}</text>
  `;
  cornersG.appendChild(g);
  return g;
});

const msEls = [...list.children];

function updateWagonWheel() {
  const mid = window.innerHeight * 0.5;
  let active = 0;
  let within = 0;

  for (let i = 0; i < msEls.length; i++) {
    const r = msEls[i].getBoundingClientRect();
    if (r.top <= mid) {
      active = i;
      within = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
    }
  }

  const first = msEls[0].getBoundingClientRect();
  const target = targets[active];
  
  // Animate ball along current shot vector
  const ballX = CX + (target.x - CX) * (0.2 + within * 0.8);
  const ballY = CY + (target.y - CY) * (0.2 + within * 0.8);

  mapBall.setAttribute('transform', `translate(${ballX.toFixed(1)} ${ballY.toFixed(1)})`);

  // Active tracer line
  activeTracer.setAttribute('x1', CX);
  activeTracer.setAttribute('y1', CY);
  activeTracer.setAttribute('x2', target.x.toFixed(1));
  activeTracer.setAttribute('y2', target.y.toFixed(1));

  msEls.forEach((el, i) => {
    el.classList.toggle('hot', i === active && first.top <= mid);
    el.classList.toggle('done', i < active);
  });

  cornerEls.forEach((el, i) => {
    el.classList.toggle('hot', i === active && first.top <= mid);
    el.classList.toggle('done', i < active);
  });

  mapNow.textContent = first.top <= mid 
    ? `${milestones[active].shot} · ${milestones[active].sector}` 
    : 'Strike Stance';
}

/* ---------- Nav & Scroll Tracking ---------- */
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href')));

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('scrolled', window.scrollY > 10);
    let current = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) current = i; });
    if (max > 0 && window.scrollY >= max - 4) current = sections.length - 1;
    navLinks.forEach((a, i) => a.classList.toggle('active', i === current));
    updateWagonWheel();
    updateWork();
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

/* ---------- Reveal on Scroll ---------- */
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
}

/* ---------- Contact & Email Copying ---------- */
const copyBtn = document.getElementById('copyEmail');
const email = document.getElementById('email');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email.textContent.trim());
    copyBtn.textContent = 'Copied';
  } catch {
    const r = document.createRange();
    r.selectNodeContents(email);
    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
    copyBtn.textContent = 'Selected';
  }
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
});

/* ---------- Local Clock (IST) ---------- */
const clock = document.getElementById('clock');
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const tick = () => { clock.textContent = `${fmt.format(new Date())} IST`; };
tick();
setInterval(tick, 1000);

/* ---------- Live GitHub Status for Akshay ---------- */
(async () => {
  const now = document.getElementById('now');
  const KEY = 'akshayGhNow';
  let data = null;
  try { data = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { /* storage blocked */ }
  if (!data) {
    try {
      const res = await fetch('https://api.github.com/users/akshaysharma2005/repos?per_page=30&sort=pushed');
      if (!res.ok) return;
      const repos = (await res.json()).filter((r) => !r.fork);
      if (!repos.length) return;
      data = { name: repos[0].name, url: repos[0].html_url, at: repos[0].pushed_at };
      try { sessionStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* storage blocked */ }
    } catch (e) { return; }
  }
  if (!data) return;
  const days = (Date.now() - new Date(data.at).getTime()) / 864e5;
  const ago = days < 1 / 24 ? 'minutes ago' : days < 1 ? `${Math.round(days * 24)}h ago` : `${Math.round(days)}d ago`;
  now.innerHTML = `<i></i>Live GitHub · <a href="${esc(data.url)}" target="_blank" rel="noopener">${esc(data.name)}</a> · active ${ago}`;
  now.hidden = false;
})();

/* ---------- Smooth scrolling with Lenis ---------- */
if (!reduceMotion) {
  const lenis = new Lenis({ anchors: { offset: 0 }, lerp: 0.11 });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  const sync = () => (document.documentElement.classList.contains('intro-on') ? lenis.stop() : lenis.start());
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  sync();
}

/* ---------- Intro Trigger ---------- */
if (document.documentElement.classList.contains('intro-on')) playIntro();
document.getElementById('replayIntro').addEventListener('click', () => {
  document.documentElement.classList.add('intro-on');
  playIntro();
});
