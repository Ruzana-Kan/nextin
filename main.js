(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wait = ms => new Promise(r => setTimeout(r, ms));

  $('#year').textContent = new Date().getFullYear();

  /* ---------- nav: scroll state, progress, scrollspy, mobile menu ---------- */
  const nav = $('#nav'), bar = $('#bar');
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 20);
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = $('#burger'), menuWrap = $('#menuWrap');
  const setMenu = open => {
    menuWrap.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!menuWrap.classList.contains('open')));
  menuWrap.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

  const links = $$('.menu a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(l => l.removeAttribute('aria-current'));
      const l = links.find(a => a.getAttribute('href') === '#' + en.target.id);
      if (l) l.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = $(a.getAttribute('href')); if (s) spy.observe(s); });

  /* ---------- hero headline: words rise in ---------- */
  const hero = $('.hero'), h1 = $('.hero h1');
  if (!reduce) {
    const text = h1.textContent.trim();
    h1.setAttribute('aria-label', text);
    h1.innerHTML = text.split(/\s+/).map((w, k) => '<span class="w" aria-hidden="true"><span style="--k:' + k + '">' + w + '</span></span>').join(' ');
  }

  /* ---------- hero centrepiece: the live-class preview ---------- */
  const tracks = [
    { id: 'ai', title: 'Class 2 · Anatomy of a Perfect Prompt', color: 'var(--lilac)' },
    { id: 'marketing', title: 'Class 3 · SEO', color: 'var(--rose)' },
    { id: 'web', title: 'Class 2 · HTML Fundamentals', color: 'var(--mint)' }
  ];
  const panes = $$('.pane'), stabs = $$('.stab'), wtitle = $('#wtitle'), go = $('#go');
  let token = 0, auto = !reduce, inView = true;

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function hl(s) {           /* tiny HTML syntax highlighter for the typed code */
    let out = '', last = 0, m;
    const re = /(<\/?)([a-z0-9]+)|([a-z-]+)=("[^"]*"?)/gi;
    while ((m = re.exec(s))) {
      out += esc(s.slice(last, m.index));
      out += m[2] ? esc(m[1]) + '<i class="t">' + m[2] + '</i>' : '<i class="a">' + m[3] + '</i>=<i class="s">' + esc(m[4]) + '</i>';
      last = re.lastIndex;
    }
    return out + esc(s.slice(last));
  }
  async function typeInto(el, text, t, speed, render) {
    el.classList.add('typing');
    for (let n = 1; n <= text.length; n++) {
      if (t !== token) { el.classList.remove('typing'); return false; }
      const part = text.slice(0, n);
      if (render) el.innerHTML = render(part); else el.textContent = part;
      await wait(speed);
    }
    el.classList.remove('typing');
    return true;
  }
  function show(i) {
    panes.forEach((p, k) => p.classList.toggle('on', k === i));
    stabs.forEach((b, k) => { b.classList.toggle('cur', k === i); b.setAttribute('aria-selected', k === i); });
    wtitle.textContent = tracks[i].title;
    hero.style.setProperty('--c', tracks[i].color);
    go.setAttribute('href', '#course-' + tracks[i].id);
  }

  const webLines = $$('#webCode .ln'), pvParts = $$('.pv [data-at]');
  webLines.forEach(l => { l.innerHTML = hl(l.dataset.text); });   /* final state by default */

  async function playAI(t) {
    const segs = $$('#aiPrompt .seg'), tags = $$('.tag'), lis = $$('#aiOut li');
    segs.forEach(s => s.textContent = ''); tags.forEach(x => x.classList.remove('on')); lis.forEach(l => l.classList.remove('on'));
    await wait(650); if (t !== token) return;
    for (let k = 0; k < segs.length; k++) {
      if (!await typeInto(segs[k], segs[k].dataset.text, t, 24)) return;
      tags[k].classList.add('on');
      await wait(220); if (t !== token) return;
    }
    for (const l of lis) { await wait(600); if (t !== token) return; l.classList.add('on'); }
  }
  async function playMkt(t) {
    const p = panes[1];
    p.classList.remove('play'); void p.offsetWidth; p.classList.add('play');
    await wait(3600);
  }
  async function playWeb(t) {
    webLines.forEach(l => l.innerHTML = '');
    pvParts.forEach(x => x.classList.remove('on'));
    await wait(600); if (t !== token) return;
    for (let k = 0; k < webLines.length; k++) {
      if (!await typeInto(webLines[k], webLines[k].dataset.text, t, 26, hl)) return;
      pvParts.filter(x => +x.dataset.at === k).forEach(x => x.classList.add('on'));
      await wait(180); if (t !== token) return;
    }
  }
  async function play(i) {
    const t = ++token;
    show(i);
    if (reduce) return;
    await [playAI, playMkt, playWeb][i](t);
    if (t !== token || !auto) return;
    await wait(3600);
    while (t === token && auto && (!inView || document.hidden)) await wait(600);
    if (t !== token || !auto) return;
    play((i + 1) % tracks.length);
  }
  new IntersectionObserver(es => { inView = es[0].isIntersecting; }, { threshold: .1 }).observe(hero);

  stabs.forEach((b, k) => b.addEventListener('click', () => { auto = false; play(k); }));
  show(0);
  if (!reduce) play(0);

  /* pointer glow in the hero */
  if (fine && !reduce) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--gx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--gy', (e.clientY - r.top) + 'px');
    });
  }

  /* ---------- courses: expandable rows ---------- */
  const rows = $$('.row');
  const setOpen = (row, open) => {
    row.classList.toggle('open', open);
    $('.toggle', row).setAttribute('aria-expanded', open);
  };
  rows.forEach(r => {
    $$('.curr li', r).forEach((li, i) => li.style.setProperty('--i', i));
    $('.toggle', r).addEventListener('click', () => setOpen(r, !r.classList.contains('open')));
  });
  function openRow(id, scroll) {
    const r = document.getElementById(id);
    if (!r) return;
    setOpen(r, true);
    if (scroll) {
      r.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    }
  }
  go.addEventListener('click', e => { e.preventDefault(); openRow(go.getAttribute('href').slice(1), true); });
  $$('a[href^="#course-"]').forEach(a => {
    if (a === go) return;
    a.addEventListener('click', () => openRow(a.getAttribute('href').slice(1), false));
  });
  if (location.hash.startsWith('#course-')) openRow(location.hash.slice(1), false);

  /* ---------- bento: light up when seen, spotlight follows the pointer ---------- */
  const cellObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); cellObs.unobserve(e.target); }
  }), { threshold: .35 });
  $$('.cell').forEach(c => cellObs.observe(c));
  if (fine) $$('.spot').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  /* magnetic primary buttons */
  if (fine && !reduce) $$('.btn-primary').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.translate = ((e.clientX - r.left - r.width / 2) * .16) + 'px ' + ((e.clientY - r.top - r.height / 2) * .26) + 'px';
    });
    b.addEventListener('pointerleave', () => { b.style.translate = ''; });
  });

  /* ---------- how it works: line fills as steps come into view ---------- */
  const steps = $$('.step'), stepsWrap = $('.steps');
  const so = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('lit'); so.unobserve(en.target); } });
    let k = -1;
    steps.forEach((s, i) => { if (s.classList.contains('lit')) k = i; });
    steps.forEach((s, i) => { if (i <= k) s.classList.add('lit'); });
    stepsWrap.style.setProperty('--fill', Math.max(k, 0) / (steps.length - 1));
  }, { rootMargin: '0px 0px -30% 0px' });
  steps.forEach(s => so.observe(s));

  /* ---------- scroll reveals: course lines draw in, team photos pop in ---------- */
  const rowObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('seen'); rowObs.unobserve(e.target); }
  }), { rootMargin: '0px 0px -20% 0px' });
  rows.forEach(r => rowObs.observe(r));

  $$('.person').forEach(p => p.style.setProperty('--d', ([...p.parentElement.children].indexOf(p) * 70) + 'ms'));
  const personObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); personObs.unobserve(e.target); }
  }), { threshold: .15 });
  $$('.person').forEach(p => personObs.observe(p));

  /* ---------- messaging: send to email without a backend ---------- */
  const ENDPOINT = 'https://formsubmit.co/ajax/nextinhq@gmail.com';
  const openMail = fd => {
    const subject = encodeURIComponent('Enquiry from the NeXT Innovation website: ' + (fd.get('name') || ''));
    const body = encodeURIComponent(
      'Name: ' + (fd.get('name') || '') + '\n' +
      'Email: ' + (fd.get('email') || '') + '\n' +
      'Phone: ' + (fd.get('phone') || '-') + '\n' +
      'Interested in: ' + (fd.get('interest') || '-') + '\n\n' +
      (fd.get('message') || '')
    );
    location.href = 'mailto:nextinhq@gmail.com?subject=' + subject + '&body=' + body;
  };
  $$('form.js-mail').forEach(form => {
    const status = $('.status', form), btn = $('button[type="submit"]', form), lbl = $('.lbl', btn);
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      if (fd.get('_honey')) return;
      btn.disabled = true; lbl.textContent = 'Sending…';
      status.className = 'status'; status.textContent = '';
      try {
        const res = await fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) !== 'true') throw new Error('send failed');
        form.reset();
        form.classList.add('sent');
      } catch (err) {
        status.classList.add('err');
        status.textContent = "We couldn't send that from the page. Your email app will open so you can send it directly.";
        setTimeout(() => openMail(fd), 1400);
      } finally {
        btn.disabled = false; lbl.textContent = 'Send message';
      }
    });
    const again = $('.again', form);
    if (again) again.addEventListener('click', () => { form.classList.remove('sent'); status.textContent = ''; });
  });

  const fabBtn = $('#fabBtn'), panel = $('#panel');
  const togglePanel = open => {
    panel.hidden = !open;
    fabBtn.setAttribute('aria-expanded', open);
    if (open) { const f = $('input[name="name"]', panel); if (f) f.focus(); }
  };
  fabBtn.addEventListener('click', () => togglePanel(panel.hidden));
  $('#panelClose').addEventListener('click', () => { togglePanel(false); fabBtn.focus(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { togglePanel(false); fabBtn.focus(); } });
  document.addEventListener('click', e => { if (!panel.hidden && !e.target.closest('#fab')) togglePanel(false); });
  $$('a[href="#contact"]').forEach(a => a.addEventListener('click', () => togglePanel(false)));

  /* ---------- team photos: fall back to initials if an image is missing ---------- */
  $$('img[data-avatar]').forEach(img => {
    const swap = () => {
      const name = img.alt.split(',')[0];
      const ini = name.split(/\s+/).filter(w => !/^md\.?$/i.test(w)).slice(0, 2).map(w => w[0]).join('').toUpperCase();
      const s = document.createElement('span');
      s.className = 'initials'; s.textContent = ini; s.setAttribute('aria-hidden', 'true');
      img.replaceWith(s);
    };
    img.addEventListener('error', swap, { once: true });
    if (img.complete && img.naturalWidth === 0) swap();
  });
})();