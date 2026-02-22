// ═══════════════════════════════════════════════════════
//  APP.JS — Animations, Navigation, Counter Effects
// ═══════════════════════════════════════════════════════

// ─── Smooth active nav link ───
function initNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
}

// ─── Fade-up on scroll ───
function initFadeUp() {
    const els = document.querySelectorAll('.fade-up');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
}

// ─── Number Counter Animation ───
function animateCounter(el) {
    const raw = el.dataset.value;
    const isFloat = raw.includes('.');
    const isPercent = el.dataset.suffix === '%';
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const target = parseFloat(raw);
    const duration = 1800;
    const start = performance.now();

    function format(v) {
        if (Math.abs(target) >= 1e9) return prefix + (v / 1e9).toFixed(2) + 'B' + suffix;
        if (Math.abs(target) >= 1e6) return prefix + (v / 1e6).toFixed(2) + 'M' + suffix;
        if (Math.abs(target) >= 1e3) return prefix + (v / 1e3).toFixed(1) + 'K' + suffix;
        if (isFloat) return prefix + v.toFixed(2) + suffix;
        return prefix + Math.round(v).toLocaleString() + suffix;
    }

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = target * easeOut(progress);
        el.textContent = format(current);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = format(target);
    }
    requestAnimationFrame(step);
}

function initCounters() {
    const counters = document.querySelectorAll('[data-value]');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => io.observe(el));
}

// ─── Progress Bar Animation ───
function initProgressBars() {
    const bars = document.querySelectorAll('.progress-bar-fill[data-width]');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.width = e.target.dataset.width + '%';
                }, 200);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    bars.forEach(b => io.observe(b));
}

// ─── Yearly Table ───
function renderYearlyTable() {
    const tbody = document.getElementById('yearlyTableBody');
    if (!tbody) return;

    BACKTEST_DATA.yearly.forEach(row => {
        const positive = row.return_pct >= 0;
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td class="year-col">${row.year}</td>
      <td class="${positive ? 'positive' : 'negative'}">${positive ? '+' : ''}${row.return_pct.toFixed(2)}%</td>
      <td class="negative">${row.max_dd_pct.toFixed(2)}%</td>
      <td class="${positive ? 'positive' : 'negative'}">$${formatMoney(row.end_equity)}</td>
    `;
        tbody.appendChild(tr);
    });
}

// ─── Format Money Helper ───
function formatMoney(v) {
    if (v >= 1e9) return (v / 1e9).toFixed(2) + 'B';
    if (v >= 1e6) return (v / 1e6).toFixed(2) + 'M';
    if (v >= 1e3) return (v / 1e3).toFixed(1) + 'K';
    return v.toFixed(2);
}

// ─── Hero stats populate ───
function populateHeroStats() {
    const map = {
        'heroFinalEquity': { value: BACKTEST_DATA.performance.final_equity, prefix: '$', suffix: '' },
        'heroCAGR': { value: BACKTEST_DATA.performance.cagr_pct, prefix: '', suffix: '%' },
        'heroSharpe': { value: BACKTEST_DATA.risk.sharpe_ratio, prefix: '', suffix: '' },
        'heroTrades': { value: BACKTEST_DATA.trades.total_trades, prefix: '', suffix: '' },
    };
    for (const [id, cfg] of Object.entries(map)) {
        const el = document.getElementById(id);
        if (el) {
            el.dataset.value = cfg.value;
            el.dataset.prefix = cfg.prefix;
            el.dataset.suffix = cfg.suffix;
        }
    }
}

// ─── Mobile menu toggle ─── 
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('navLinks');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
    populateHeroStats();
    renderYearlyTable();
    initNav();
    initFadeUp();
    initCounters();
    initProgressBars();
    initMobileMenu();

    // Stagger fade-up
    document.querySelectorAll('.fade-up').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.05) + 's';
    });
});
