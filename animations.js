/* ════════════════════════════════════════════
   ChefMind — animations.js v4.0
   Без кастомного курсора, без скрамбла
   Ripple · 3D Tilt · Scroll Reveal · Particles
   Scroll Bar · Save Burst · Placeholder Cycle
════════════════════════════════════════════ */

// ── ДЕКОРАТИВНЫЕ ФОНОВЫЕ ORBS ──────────────
(function() {
  [1,2,3].forEach(n => {
    const orb = document.createElement('div');
    orb.className = `bg-orb bg-orb-${n}`;
    document.body.prepend(orb);
  });
})();

// ── SCROLL PROGRESS BAR ────────────────────
(function() {
  const bar = document.createElement('div');
  bar.id = 'scroll-bar';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

// ── RIPPLE ЭФФЕКТ НА КНОПКАХ ───────────────
document.addEventListener('click', e => {
  const btn = e.target.closest(
    '.btn-find, .btn-add, .btn-open, .nav-btn, .auth-tab, .btn-profile, .btn-save'
  );
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.6;
  const x    = e.clientX - rect.left  - size / 2;
  const y    = e.clientY - rect.top   - size / 2;

  const wave = document.createElement('span');
  wave.className = 'ripple-wave';
  wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
  btn.appendChild(wave);
  wave.addEventListener('animationend', () => wave.remove());
}, { passive: true });

// ── 3D TILT + SHINE НА КАРТОЧКАХ ──────────
(function() {
  let activeCard = null;

  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.recipe-card');

    // Reset previous card if moved to a different one
    if (activeCard && activeCard !== card) {
      resetCard(activeCard);
      activeCard = null;
    }
    if (!card) return;

    activeCard = card;
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
    const dy   = (e.clientY - cy) / (rect.height / 2); // -1 to 1

    card.style.transform = `perspective(800px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) translateY(-5px) scale(1.02)`;
    card.style.boxShadow = `
      ${-dx * 12}px ${-dy * 12}px 36px rgba(43,29,14,.18),
      0 16px 40px rgba(43,29,14,.12)`;

    // Shine layer
    let shine = card.querySelector('.card-shine');
    if (!shine) {
      shine = document.createElement('div');
      shine.className = 'card-shine';
      card.appendChild(shine);
    }
    const px = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const py = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    shine.style.setProperty('--mx', px + '%');
    shine.style.setProperty('--my', py + '%');
  }, { passive: true });

  document.addEventListener('mouseleave', e => {
    const card = e.target.closest('.recipe-card');
    if (card) resetCard(card);
  }, true);

  function resetCard(card) {
    card.style.transition = 'transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s ease';
    card.style.transform  = '';
    card.style.boxShadow  = '';
    setTimeout(() => card.style.transition = '', 400);
  }
})();

// ── SCROLL REVEAL ──────────────────────────
(function() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });

  function observeNew() {
    document.querySelectorAll('.recipe-card:not([data-reveal])').forEach((card, i) => {
      card.setAttribute('data-reveal', '1');
      card.style.transitionDelay = `${i * 0.1}s`;
      io.observe(card);
    });
  }

  new MutationObserver(observeNew)
    .observe(document.body, { childList: true, subtree: true });
  observeNew();
})();

// ── ЧАСТИЦЫ ПРИ СОХРАНЕНИИ ♥ ──────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-save');
  if (!btn) return;

  // Burst only when BECOMING saved (classList will have 'saved' after toggle in app.js)
  // We fire on every heart click; looks great either way
  const rect   = btn.getBoundingClientRect();
  const cx     = rect.left + rect.width  / 2;
  const cy     = rect.top  + rect.height / 2;
  const colors = ['#d4813a','#e9a96a','#f0c080','#c06820','#fff0d0'];

  for (let i = 0; i < 10; i++) {
    const dot   = document.createElement('div');
    const angle = (i / 10) * Math.PI * 2;
    const r     = 28 + Math.random() * 22;
    const size  = 5 + Math.random() * 5;

    dot.style.cssText = `
      position: fixed;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: ${colors[i % colors.length]};
      left: ${cx}px; top: ${cy}px;
      pointer-events: none; z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform .52s cubic-bezier(.23,1,.32,1), opacity .52s ease;
    `;
    document.body.appendChild(dot);

    requestAnimationFrame(() => {
      dot.style.transform = `translate(calc(-50% + ${Math.cos(angle) * r}px), calc(-50% + ${Math.sin(angle) * r}px)) scale(0)`;
      dot.style.opacity   = '0';
    });
    setTimeout(() => dot.remove(), 560);
  }
});

// ── PLACEHOLDER CYCLE В ПОЛЕ ВВОДА ────────
(function() {
  const input = document.getElementById('ingredientInput');
  if (!input) return;

  const hints = [
    'Добавить продукт...', 'яйца', 'помидоры', 'сыр',
    'картофель', 'курица', 'макароны', 'чеснок', 'рис', 'творог'
  ];
  let idx = 0;

  setInterval(() => {
    if (document.activeElement === input) return;
    idx = (idx + 1) % hints.length;
    // Fade effect via CSS transition on color
    input.style.color = 'transparent';
    setTimeout(() => {
      input.placeholder = hints[idx];
      input.style.color = '';
    }, 180);
  }, 2400);
})();

// ── МЯГКОЕ МЕРЦАНИЕ HERO-ТЕКСТА ────────────
// Подчёркивание скользит под текстом при hover
(function() {
  const h1 = document.querySelector('.hero h1');
  if (!h1) return;

  h1.style.cssText += `
    background: linear-gradient(135deg, var(--brown) 0%, var(--amber) 50%, var(--brown) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: background-position .6s ease;
  `;

  h1.addEventListener('mouseenter', () => {
    h1.style.backgroundPosition = 'right center';
  });
  h1.addEventListener('mouseleave', () => {
    h1.style.backgroundPosition = 'left center';
  });
})();

// ── ТОНКОЕ СВЕЧЕНИЕ INPUT ПРИ ФОКУСЕ ──────
document.querySelectorAll('.mood-input, .ingredient-input, .auth-input, .gen-textarea')
  .forEach(el => {
    el.addEventListener('focus', () => {
      el.style.transition = 'box-shadow .25s ease, border-color .25s ease';
    });
  });

// ── АНИМАЦИЯ КНОПКИ «НАЙТИ» ВО ВРЕМЯ ПОИСКА ─
// Добавляем пульс к тексту (app.js уже меняет текст)
const findBtn = document.getElementById('findBtn');
if (findBtn) {
  const observer = new MutationObserver(() => {
    if (findBtn.disabled) {
      findBtn.style.animation = 'findBtnLoading 1s ease-in-out infinite';
    } else {
      findBtn.style.animation = '';
    }
  });
  observer.observe(findBtn, { attributes: true, attributeFilter: ['disabled'] });
}

// ── RE-OBSERVE AFTER NEW CARDS ─────────────
// (already handled by MutationObserver above)
