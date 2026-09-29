const API = 'https://api.github.com/users/';
const $ = (id) => document.getElementById(id);

/* VELVETY PASTEL COLORS — no harsh yellow */
const LANG_COLORS = {
  JavaScript:'#f9d5a8',       // soft peachy gold
  TypeScript:'#a8c8e8',       // soft sky blue
  Python:'#b8b0e8',           // soft lavender blue
  Java:'#f5a8b8',             // soft rose
  HTML:'#f5b8d8',             // soft pink
  CSS:'#c8b0e8',              // soft lavender
  Go:'#a8e0e8',               // soft mint blue
  Rust:'#f5c8a8',             // soft peach
  'C++':'#f5b0c8',            // soft pink
  C:'#c8cce0',                // soft gray blue
  'C#':'#a8dcd0',             // soft teal
  Ruby:'#f0a8b8',             // soft coral
  PHP:'#c0b0e0',              // soft purple
  Swift:'#f5c0a0',            // soft orange cream
  Kotlin:'#d0b8f0',           // soft violet
  Shell:'#a8e0c0',            // soft mint
  'Jupyter Notebook':'#f5c8a0', // soft amber
  Dart:'#a8d4e8',             // soft blue
  Vue:'#b0e0c0'               // soft green
};
const FALLBACK_COLORS = ['#f5b8d8','#c8b0e8','#a8d8f0','#a8e0c0','#f5c8a8','#f0a8b8'];

const LOAD_ICONS = ['sparkles','heart','palette','star','send'];
const LOAD_MSGS = [
  'Gathering your repos...',
  'Counting every commit...',
  'Brewing your languages...',
  'Adding extra sparkle...',
  'Almost ready, bestie...'
];

const LANG_VIBES = {
  JavaScript:'The JavaScript Wizard',
  TypeScript:'The TypeScript Sorcerer',
  Python:'The Pythonista',
  Java:'The Java Architect',
  HTML:'The Web Weaver',
  CSS:'The Style Sage',
  Go:'The Go Gopher',
  Rust:'The Rust Craftsman',
  'C++':'The C++ Conjurer',
  C:'The C Alchemist',
  'C#':'The C# Champion',
  Ruby:'The Ruby Ranger',
  PHP:'The PHP Pioneer',
  Swift:'The Swift Ninja',
  Kotlin:'The Kotlin Knight',
  Shell:'The Shell Sage',
  'Jupyter Notebook':'The Data Sage',
  Dart:'The Dart Daredevil',
  Vue:'The Vue Virtuoso'
};

const charts = [];
let loadTimer;

async function fetchJSON(url){
  let res;
  try{ res = await fetch(url); }
  catch{ throw new Error('Network error. Check your connection and try again.'); }
  if(res.status === 404) throw new Error('User not found. Check the spelling and try again.');
  if(res.status === 403) throw new Error('GitHub rate limit reached. Wait a few minutes and try again.');
  if(!res.ok) throw new Error(`GitHub returned an error (${res.status}).`);
  return res.json();
}
const fetchUser = (u) => fetchJSON(API + encodeURIComponent(u));
const fetchRepos = (u) => fetchJSON(`${API}${encodeURIComponent(u)}/repos?per_page=100&sort=updated`);
const fetchEvents = (u) => fetchJSON(`${API}${encodeURIComponent(u)}/events/public?per_page=100`).catch(() => []);

function buildHeatmap(events){
  const today = new Date();
  today.setHours(0,0,0,0);
  const days = [];
  for(let i = 83; i >= 0; i--){
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push({ date: d, count: 0 });
  }
  events.forEach((ev) => {
    const d = new Date(ev.created_at);
    d.setHours(0,0,0,0);
    const found = days.find((x) => x.date.getTime() === d.getTime());
    if(found) found.count++;
  });
  return days;
}

function calcStreaks(days){
  let current = 0, longest = 0, temp = 0, totalDays = 0;
  days.forEach((d) => {
    if(d.count > 0){ temp++; totalDays++; if(temp > longest) longest = temp; }
    else { temp = 0; }
  });
  for(let i = days.length - 1; i >= 0; i--){
    if(days[i].count > 0) current++;
    else break;
  }
  return { current, longest, totalDays };
}

function calculateStats(user, repos, events){
  const langs = {}, days = [0,0,0,0,0,0,0];
  let stars = 0, forks = 0, watchers = 0;
  const year = new Date().getFullYear();
  let updatedThisYear = 0;
  repos.forEach((r) => {
    if(r.language) langs[r.language] = (langs[r.language] || 0) + 1;
    days[new Date(r.updated_at).getDay()]++;
    stars += r.stargazers_count;
    forks += r.forks_count;
    watchers += r.watchers_count || 0;
    if(new Date(r.updated_at).getFullYear() === year) updatedThisYear++;
  });
  const topLangs = Object.entries(langs).sort((a,b) => b[1] - a[1]).slice(0,5);
  const total = topLangs.reduce((s,[,n]) => s + n, 0) || 1;
  const age = (Date.now() - new Date(user.created_at)) / 31557600000;
  const topRepo = [...repos].sort((a,b) => b.stargazers_count - a.stargazers_count)[0];
  const recent = [...repos].sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0,5);

  const heatmapDays = buildHeatmap(events);
  const streaks = calcStreaks(heatmapDays);
  const totalEvents = events.length;

  return { langs, topLangs, total, days, stars, forks, watchers, updatedThisYear, age, topRepo, recent, heatmapDays, streaks, totalEvents };
}

function devVibe(user, s){
  const topLang = s.topLangs[0];
  const topLangName = topLang ? topLang[0] : null;
  const topLangCount = topLang ? topLang[1] : 0;
  const totalReposWithLang = s.topLangs.reduce((sum, [,n]) => sum + n, 0) || 1;
  const langDominance = topLangCount / totalReposWithLang;

  if(topLangName && langDominance >= 0.25 && LANG_VIBES[topLangName]){
    return LANG_VIBES[topLangName];
  }
  if(user.followers >= 1000) return 'The Community Legend';
  if(s.stars >= 500) return 'The Open Source Hero';
  if(s.stars >= 100) return 'The Crowd Favorite';
  if(s.age < 1) return 'The Rising Star';
  if(user.public_repos >= 50) return 'The Prolific Builder';
  if(user.public_repos >= 30) return 'The Relentless Builder';
  if(topLangName && LANG_VIBES[topLangName]) return LANG_VIBES[topLangName];
  if(s.age >= 8) return 'The GitHub Veteran';
  if(s.age >= 4) return 'The Code Voyager';
  return 'The Curious Coder';
}

function getShortName(user){
  const full = user.name || user.login;
  const first = full.split(' ')[0];
  return first.length > 14 ? first.slice(0, 14) : first;
}

function startLoading(){
  let i = 0;
  $('loading').hidden = false;
  $('barFill').style.width = '15%';
  const setMsg = (idx) => {
    const txt = document.querySelector('#loadText span');
    const iconHost = document.querySelector('#loadText');
    if(txt) txt.textContent = LOAD_MSGS[idx];
    if(iconHost){
      const oldIcon = iconHost.querySelector('svg, i');
      if(oldIcon){
        const newIcon = document.createElement('i');
        newIcon.setAttribute('data-lucide', LOAD_ICONS[idx]);
        oldIcon.replaceWith(newIcon);
        if(window.lucide) lucide.createIcons();
      }
    }
  };
  setMsg(0);
  if(window.lucide) lucide.createIcons();
  loadTimer = setInterval(() => {
    i = Math.min(i + 1, LOAD_MSGS.length - 1);
    $('loadText').style.opacity = 0;
    setTimeout(() => { setMsg(i); $('loadText').style.opacity = 1; }, 200);
    $('barFill').style.width = `${15 + i * 20}%`;
  }, 800);
}
function stopLoading(){
  clearInterval(loadTimer);
  $('barFill').style.width = '100%';
  setTimeout(() => $('loading').hidden = true, 400);
}

function countUp(el, target, ms = 1600){
  const dec = target % 1 ? 1 : 0, t0 = performance.now();
  (function tick(t){
    const p = Math.min((t - t0) / ms, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * e).toFixed(dec);
    if(p < 1) requestAnimationFrame(tick);
  })(t0);
}

function chart(id, cfg){ charts.push(new Chart($(id), cfg)); }

/* ============ VELVETY 3D PIE ============ */
function build3DPie(container, data, colors){
  const total = data.reduce((s, d) => s + d.value, 0);
  const size = 340;
  const cx = size / 2;
  const cy = size / 2 + 8;
  const outerR = size / 2 - 32;
  const innerR = outerR * 0.62;
  const depth = 22;

  let angleStart = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const angle = (d.value / total) * Math.PI * 2;
    const a0 = angleStart;
    const a1 = angleStart + angle;
    angleStart = a1;
    return { ...d, color: colors[i], a0, a1 };
  });

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

  const defs = document.createElementNS(svgNS, 'defs');

  // Soft outer glow
  const glowGrad = document.createElementNS(svgNS, 'radialGradient');
  glowGrad.setAttribute('id', 'pieGlow');
  const gs1 = document.createElementNS(svgNS, 'stop');
  gs1.setAttribute('offset', '60%'); gs1.setAttribute('stop-color', '#fbcfe8'); gs1.setAttribute('stop-opacity', '0');
  const gs2 = document.createElementNS(svgNS, 'stop');
  gs2.setAttribute('offset', '100%'); gs2.setAttribute('stop-color', '#fbcfe8'); gs2.setAttribute('stop-opacity', '.3');
  glowGrad.appendChild(gs1); glowGrad.appendChild(gs2);
  defs.appendChild(glowGrad);

  // Per-slice VELVETY gradients: light top-left → rich bottom-right
  slices.forEach((s, i) => {
    const grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', `grad-${i}`);
    grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '60%'); grad.setAttribute('y2', '100%');
    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '0%'); stop1.setAttribute('stop-color', lighten(s.color, 30));
    const stop2 = document.createElementNS(svgNS, 'stop');
    stop2.setAttribute('offset', '55%'); stop2.setAttribute('stop-color', s.color);
    const stop3 = document.createElementNS(svgNS, 'stop');
    stop3.setAttribute('offset', '100%'); stop3.setAttribute('stop-color', darken(s.color, 18));
    grad.appendChild(stop1); grad.appendChild(stop2); grad.appendChild(stop3);
    defs.appendChild(grad);

    // Radial velvet overlay
    const vel = document.createElementNS(svgNS, 'radialGradient');
    vel.setAttribute('id', `velvet-${i}`);
    vel.setAttribute('cx', '35%'); vel.setAttribute('cy', '30%');
    const v1 = document.createElementNS(svgNS, 'stop');
    v1.setAttribute('offset', '0%'); v1.setAttribute('stop-color', '#ffffff'); v1.setAttribute('stop-opacity', '.22');
    const v2 = document.createElementNS(svgNS, 'stop');
    v2.setAttribute('offset', '70%'); v2.setAttribute('stop-color', '#000000'); v2.setAttribute('stop-opacity', '0');
    vel.appendChild(v1); vel.appendChild(v2);
    defs.appendChild(vel);
  });
  svg.appendChild(defs);

  // Soft outer glow circle
  const glow = document.createElementNS(svgNS, 'circle');
  glow.setAttribute('cx', cx); glow.setAttribute('cy', cy);
  glow.setAttribute('r', outerR * 1.3);
  glow.setAttribute('fill', 'url(#pieGlow)');
  svg.appendChild(glow);

  // Floor shadow (soft)
  const shadow = document.createElementNS(svgNS, 'ellipse');
  shadow.setAttribute('cx', cx);
  shadow.setAttribute('cy', cy + depth + 14);
  shadow.setAttribute('rx', outerR * 0.95);
  shadow.setAttribute('ry', outerR * 0.24);
  shadow.setAttribute('fill', 'rgba(0,0,0,.5)');
  shadow.setAttribute('filter', 'blur(18px)');
  svg.appendChild(shadow);

  // Side extrusions first (behind top faces)
  slices.forEach((s) => {
    const sidePath = donutSide(cx, cy, outerR, innerR, s.a0, s.a1, depth);
    const side = document.createElementNS(svgNS, 'path');
    side.setAttribute('d', sidePath);
    side.setAttribute('fill', darken(s.color, 42));
    svg.appendChild(side);
  });

  // Top faces with velvet gradients
  slices.forEach((s, i) => {
    const top = document.createElementNS(svgNS, 'path');
    top.setAttribute('d', donutTop(cx, cy, outerR, innerR, s.a0, s.a1));
    top.setAttribute('fill', `url(#grad-${i})`);
    top.setAttribute('stroke', 'rgba(255,255,255,.35)');
    top.setAttribute('stroke-width', '1');
    top.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(top);

    // Velvet overlay on top
    const velOverlay = document.createElementNS(svgNS, 'path');
    velOverlay.setAttribute('d', donutTop(cx, cy, outerR, innerR, s.a0, s.a1));
    velOverlay.setAttribute('fill', `url(#velvet-${i})`);
    velOverlay.setAttribute('pointer-events', 'none');
    svg.appendChild(velOverlay);
  });

  // Soft inner rim highlight
  const innerRim = document.createElementNS(svgNS, 'circle');
  innerRim.setAttribute('cx', cx); innerRim.setAttribute('cy', cy);
  innerRim.setAttribute('r', innerR);
  innerRim.setAttribute('fill', 'none');
  innerRim.setAttribute('stroke', 'rgba(255,255,255,.25)');
  innerRim.setAttribute('stroke-width', '1.5');
  innerRim.setAttribute('filter', 'blur(1.5px)');
  svg.appendChild(innerRim);

  // Top shine arc (gloss)
  const shine = document.createElementNS(svgNS, 'ellipse');
  shine.setAttribute('cx', cx - outerR * 0.2);
  shine.setAttribute('cy', cy - outerR * 0.5);
  shine.setAttribute('rx', outerR * 0.35);
  shine.setAttribute('ry', outerR * 0.1);
  shine.setAttribute('fill', 'rgba(255,255,255,.25)');
  shine.setAttribute('filter', 'blur(6px)');
  svg.appendChild(shine);

  container.innerHTML = '';
  container.appendChild(svg);
}

function donutTop(cx, cy, outerR, innerR, a0, a1){
  const x1 = cx + Math.cos(a0) * outerR, y1 = cy + Math.sin(a0) * outerR;
  const x2 = cx + Math.cos(a1) * outerR, y2 = cy + Math.sin(a1) * outerR;
  const x3 = cx + Math.cos(a1) * innerR, y3 = cy + Math.sin(a1) * innerR;
  const x4 = cx + Math.cos(a0) * innerR, y4 = cy + Math.sin(a0) * innerR;
  const large = (a1 - a0) > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4} Z`;
}

function donutSide(cx, cy, outerR, innerR, a0, a1, depth){
  const cyd = cy + depth;
  const x1 = cx + Math.cos(a0) * outerR, y1 = cy + Math.sin(a0) * outerR;
  const x2 = cx + Math.cos(a1) * outerR, y2 = cy + Math.sin(a1) * outerR;
  const x1d = cx + Math.cos(a0) * outerR, y1d = cyd + Math.sin(a0) * outerR;
  const x2d = cx + Math.cos(a1) * outerR, y2d = cyd + Math.sin(a1) * outerR;
  const large = (a1 - a0) > Math.PI ? 1 : 0;
  const mid = (a0 + a1) / 2;
  const midY = Math.sin(mid);
  if(midY < -0.25){
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${x2} ${y2 + 3} A ${outerR} ${outerR} 0 ${large} 0 ${x1} ${y1 + 3} Z`;
  }
  return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${x2d} ${y2d} A ${outerR} ${outerR} 0 ${large} 0 ${x1d} ${y1d} Z`;
}

function hexToRgb(hex){
  return {
    r: parseInt(hex.slice(1,3), 16),
    g: parseInt(hex.slice(3,5), 16),
    b: parseInt(hex.slice(5,7), 16)
  };
}
function rgbToHex(r,g,b){
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b)).toString(16).slice(1)}`;
}
function lighten(hex, pct){
  const {r,g,b} = hexToRgb(hex);
  return rgbToHex(r + (255-r)*(pct/100), g + (255-g)*(pct/100), b + (255-b)*(pct/100));
}
function darken(hex, pct){
  const {r,g,b} = hexToRgb(hex);
  return rgbToHex(r * (1 - pct/100), g * (1 - pct/100), b * (1 - pct/100));
}

function renderStory(user, repos, events){
  const s = calculateStats(user, repos, events);
  const name = user.name || user.login;
  const nick = getShortName(user);
  const poss = nick.endsWith('s') ? "'" : "'s";

  $('avatar').src = user.avatar_url;
  $('vibeAvatar').src = user.avatar_url;
  $('hey').textContent = `Hey ${name}`;
  $('bio').textContent = user.bio || 'No bio yet. The code speaks for itself.';
  $('loc').textContent = user.location || 'Somewhere on the internet';

  $('numbersTitle').textContent = `${nick}${poss} numbers`;
  $('langsTitle').textContent = `${nick}${poss} top languages`;
  $('streaksTitle').textContent = `${nick}${poss} coding streaks`;
  $('achievementsTitle').textContent = `${nick}${poss} achievements`;
  $('starTitle').textContent = `${nick}${poss} top repo`;
  $('recentTitle').textContent = `${nick}${poss} recent work`;

  const nums = {
    repos: user.public_repos, followers: user.followers, following: user.following,
    age: +s.age.toFixed(1), stars: s.stars, forks: s.forks, watchers: s.watchers,
    updated: s.updatedThisYear, currentStreak: s.streaks.current,
    longestStreak: s.streaks.longest, activeDays: s.streaks.totalDays,
    totalEvents: s.totalEvents
  };
  document.querySelectorAll('[data-key]').forEach((el) => el.dataset.target = nums[el.dataset.key] || 0);

  const cols = s.topLangs.map(([l], i) => LANG_COLORS[l] || FALLBACK_COLORS[i]);
  const topLang = s.topLangs[0];
  $('topLangName').textContent = topLang ? topLang[0] : '—';

  if(s.topLangs.length){
    const pieData = s.topLangs.map(([name, value]) => ({ name, value }));
    build3DPie($('langPie'), pieData, cols);

    $('legend').innerHTML = s.topLangs.map(([l, n], i) => {
      const pct = Math.round(n / s.total * 100);
      const c = cols[i];
      return `<div class="lang-item" style="--c:${c};--c-shadow:${c}55">
        <div class="lang-row">
          <div class="lang-left"><span class="lang-dot"></span>${l}</div>
          <span class="lang-pct">${pct}%</span>
        </div>
        <div class="lang-bar"><div class="lang-bar-fill" data-pct="${pct}"></div></div>
      </div>`;
    }).join('');
    setTimeout(() => {
      document.querySelectorAll('.lang-bar-fill').forEach((el) => el.style.width = el.dataset.pct + '%');
    }, 400);
  } else {
    $('langPie').innerHTML = '';
    $('legend').innerHTML = '<p class="muted">No language data yet. Push some code.</p>';
  }

  const cs = s.streaks.current;
  const status = cs === 0 ? 'Start your streak today!' :
                 cs < 3 ? 'Nice start, keep going!' :
                 cs < 7 ? 'You are on fire!' :
                 cs < 30 ? 'Unstoppable streak!' :
                 'Legendary commitment!';
  $('streakStatus').textContent = status;

  const r = s.topRepo;
  if(r){
    $('starCard').innerHTML = `
      <h3>${r.name}</h3>
      <p>${r.description || 'No description yet.'}</p>
      <div class="stats-row">
        <span class="stat-chip"><i data-lucide="star"></i> ${r.stargazers_count}</span>
        <span class="stat-chip"><i data-lucide="git-fork"></i> ${r.forks_count}</span>
        ${r.language ? `<span class="stat-chip"><i data-lucide="code-2"></i> ${r.language}</span>` : ''}
      </div>
      <a class="btn" style="text-decoration:none;margin-top:.5rem" target="_blank" rel="noopener" href="${r.html_url}">
        <i data-lucide="external-link"></i>
        <span>View on GitHub</span>
      </a>`;
  } else {
    $('starCard').innerHTML = '<p class="muted">No public repos yet. The first one is waiting.</p>';
  }

  if(s.recent.length){
    $('recentList').innerHTML = s.recent.map((repo) => {
      const daysAgo = Math.round((Date.now() - new Date(repo.updated_at)) / 86400000);
      const when = daysAgo === 0 ? 'today' : daysAgo === 1 ? 'yesterday' : `${daysAgo}d ago`;
      return `<a class="repo-item" href="${repo.html_url}" target="_blank" rel="noopener">
        <div class="repo-icon"><i data-lucide="folder-git-2"></i></div>
        <div class="repo-info">
          <h4>${repo.name}</h4>
          <p>${repo.description || 'No description'}</p>
        </div>
        <div class="repo-meta">
          <span><i data-lucide="star"></i> ${repo.stargazers_count}</span>
          <span><i data-lucide="clock"></i> ${when}</span>
        </div>
      </a>`;
    }).join('');
  } else {
    $('recentList').innerHTML = '<p class="muted">No recent activity.</p>';
  }

  const D = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const best = s.days.indexOf(Math.max(...s.days));
  $('activityTitle').innerHTML = `<i data-lucide="activity"></i><span>${repos.length ? nick + poss + ' busiest day: ' + D[best] + 's' : 'No activity yet'}</span>`;

  const dayCtx = $('dayChart').getContext('2d');
  const grad = dayCtx.createLinearGradient(0, 0, 0, 300);
  grad.addColorStop(0, '#fbcfe8');
  grad.addColorStop(1, '#a5f3fc');

  chart('dayChart', {
    type: 'bar',
    data: {
      labels: D.map(d => d.slice(0, 3)),
      datasets: [{
        data: s.days,
        backgroundColor: s.days.map((_, i) => i === best ? '#fbcfe8' : grad),
        borderRadius: 14, borderSkipped: false, hoverBackgroundColor: '#c4b5fd'
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(24,16,56,.96)',
          borderColor: 'rgba(251,207,232,.5)',
          borderWidth: 1, padding: 12, cornerRadius: 12,
          titleFont: { family: 'Quicksand', weight: '700' },
          bodyFont: { family: 'Quicksand' }
        }
      },
      scales: {
        x: { ticks: { color: '#d8d4ec', font: { family: 'Quicksand', weight: '600' } }, grid: { display: false }, border: { display: false } },
        y: { ticks: { color: '#d8d4ec', precision: 0, font: { family: 'Quicksand' } }, grid: { color: 'rgba(255,255,255,.08)' }, border: { display: false } }
      },
      animation: { duration: 1400, easing: 'easeOutQuart' }
    }
  });

  $('vibeTitle').textContent = devVibe(user, s);
  $('vibeUser').textContent = `@${user.login}`;

  $('landing').hidden = true;
  $('story').hidden = false;
  window.scrollTo(0, 0);
  if(window.lucide) lucide.createIcons();
  observe();
}

function observe(){
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if(!e.isIntersecting || e.target.classList.contains('in')) return;
    e.target.classList.add('in');
    if(e.target.querySelector('[data-key]')){
      document.querySelectorAll('[data-key]').forEach((el) => countUp(el, +el.dataset.target));
    }
    if(e.target.querySelector('#vibeTitle')) fireConfetti();
  }), { threshold: 0.35 });
  document.querySelectorAll('.reveal').forEach((s) => { s.classList.remove('in'); io.observe(s); });
}

function fireConfetti(){
  if(typeof confetti !== 'function') return;
  const colors = ['#fbcfe8','#ffffff','#a5f3fc','#c4b5fd'];
  confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors, scalar: 0.9 });
  setTimeout(() => confetti({ particleCount: 60, spread: 110, origin: { y: 0.5 }, colors, scalar: 0.7 }), 220);
}

async function downloadShareCard(){
  const node = $('shareCard');
  const canvas = await html2canvas(node, {
    backgroundColor: '#181038', useCORS: true, scale: 2, logging: false,
    onclone: (clonedDoc) => {
      clonedDoc.querySelectorAll('.grad-text, .vibe-title, #vibeTitle').forEach((el) => {
        el.style.background = 'none';
        el.style.backgroundClip = 'border-box';
        el.style.webkitBackgroundClip = 'border-box';
        el.style.color = '#fbcfe8';
        el.style.textShadow = '0 0 20px rgba(251,207,232,.6)';
      });
    }
  });
  const link = document.createElement('a');
  link.download = 'github-wrapped.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function generate(username){
  $('error').hidden = true;
  startLoading();
  try {
    const [user, repos, events] = await Promise.all([
      fetchUser(username), fetchRepos(username), fetchEvents(username)
    ]);
    await new Promise(r => setTimeout(r, 2000));
    renderStory(user, repos, events);
    history.replaceState(null, '', `?u=${encodeURIComponent(user.login)}`);
  } catch (e){
    $('error').textContent = e.message;
    $('error').hidden = false;
  } finally { stopLoading(); }
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const u = $('username').value.trim();
  if(u) generate(u);
});

$('dl').addEventListener('click', async () => {
  const btn = $('dl');
  const original = btn.innerHTML;
  btn.innerHTML = '<i data-lucide="loader-circle"></i><span>Preparing...</span>';
  if(window.lucide) lucide.createIcons();
  try { await downloadShareCard(); }
  catch(err){ console.error(err); }
  finally { btn.innerHTML = original; if(window.lucide) lucide.createIcons(); }
});

$('copy').addEventListener('click', async () => {
  const btn = $('copy');
  try {
    await navigator.clipboard.writeText(location.href);
    btn.innerHTML = '<i data-lucide="check"></i><span>Copied!</span>';
  } catch {
    btn.innerHTML = '<i data-lucide="x"></i><span>Failed</span>';
  }
  if(window.lucide) lucide.createIcons();
  setTimeout(() => {
    btn.innerHTML = '<i data-lucide="link"></i><span>Copy link</span>';
    if(window.lucide) lucide.createIcons();
  }, 1800);
});

$('restart').addEventListener('click', () => {
  charts.splice(0).forEach((c) => c.destroy());
  $('story').hidden = true;
  $('landing').hidden = false;
  $('username').value = '';
  history.replaceState(null, '', location.pathname);
  window.scrollTo(0, 0);
  if(window.lucide) lucide.createIcons();
});

if(window.lucide) lucide.createIcons();
const preset = new URLSearchParams(location.search).get('u');
if(preset){ $('username').value = preset; generate(preset); }