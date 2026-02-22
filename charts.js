// ═══════════════════════════════════════════════════════
//  CHARTS — Chart.js powered visualizations
// ═══════════════════════════════════════════════════════

// Chart.js global defaults
Chart.defaults.color = '#64748b';
Chart.defaults.borderColor = 'rgba(99,179,237,0.08)';
Chart.defaults.font.family = "'Inter', sans-serif";

const COLORS = {
    accent: '#38bdf8',
    green: '#22c55e',
    red: '#ef4444',
    purple: '#a78bfa',
    yellow: '#f59e0b',
    gray: '#475569',
};

// ─── Helper: parse date strings ───
function parseDates(data, key = 'date') {
    return data.map(d => new Date(d[key]));
}

// ─── 1. EQUITY CURVE ───
function initEquityChart() {
    const ctx = document.getElementById('equityChart');
    if (!ctx) return;

    const labels = BACKTEST_DATA.equity_curve.map(d => d.date);
    const strategy = BACKTEST_DATA.equity_curve.map(d => d.equity);
    const bnh = (() => {
        // Interpolate B&H to same x-axis
        const bhnRaw = BACKTEST_DATA.bnh_curve;
        return labels.map(date => {
            const hit = bhnRaw.find(d => d.date === date);
            if (hit) return hit.equity;
            // nearest
            let prev = bhnRaw[0];
            for (const d of bhnRaw) { if (d.date <= date) prev = d; else break; }
            return prev.equity;
        });
    })();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Strategy',
                    data: strategy,
                    borderColor: COLORS.accent,
                    borderWidth: 2.5,
                    backgroundColor: 'rgba(56,189,248,0.06)',
                    fill: true,
                    tension: 0.35,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointBackgroundColor: COLORS.accent,
                },
                {
                    label: 'Market Benchmark',
                    data: bnh,
                    borderColor: COLORS.gray,
                    borderWidth: 1.5,
                    borderDash: [5, 4],
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    pointRadius: 0,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: {
                    grid: { color: 'rgba(99,179,237,0.05)' },
                    ticks: { maxTicksLimit: 10, font: { size: 11 } }
                },
                y: {
                    type: 'logarithmic',
                    grid: { color: 'rgba(99,179,237,0.05)' },
                    ticks: {
                        font: { size: 11 },
                        callback: v => v >= 1e9 ? '$' + (v / 1e9).toFixed(1) + 'B'
                            : v >= 1e6 ? '$' + (v / 1e6).toFixed(1) + 'M'
                                : v >= 1000 ? '$' + (v / 1e3).toFixed(0) + 'K'
                                    : '$' + v
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(13,20,33,0.95)',
                    borderColor: 'rgba(56,189,248,0.3)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: ctx => {
                            const v = ctx.raw;
                            const str = v >= 1e9 ? '$' + (v / 1e9).toFixed(2) + 'B'
                                : v >= 1e6 ? '$' + (v / 1e6).toFixed(2) + 'M'
                                    : '$' + v.toLocaleString();
                            return `  ${ctx.dataset.label}: ${str}`;
                        }
                    }
                }
            }
        }
    });
}

// ─── 2. DRAWDOWN CHART ───
function initDrawdownChart() {
    const ctx = document.getElementById('drawdownChart');
    if (!ctx) return;

    const labels = BACKTEST_DATA.drawdown_curve.map(d => d.date);
    const dd = BACKTEST_DATA.drawdown_curve.map(d => d.dd);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Drawdown %',
                data: dd,
                borderColor: COLORS.red,
                borderWidth: 1.5,
                backgroundColor: 'rgba(239,68,68,0.15)',
                fill: true,
                tension: 0.35,
                pointRadius: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(99,179,237,0.05)' }, ticks: { maxTicksLimit: 8, font: { size: 11 } } },
                y: {
                    grid: { color: 'rgba(99,179,237,0.05)' },
                    ticks: { callback: v => v + '%', font: { size: 11 } }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(13,20,33,0.95)',
                    borderColor: 'rgba(239,68,68,0.3)',
                    borderWidth: 1,
                    callbacks: { label: ctx => `  Drawdown: ${ctx.raw.toFixed(2)}%` }
                }
            }
        }
    });
}

// ─── 3. YEARLY BAR CHART ───
function initYearlyChart() {
    const ctx = document.getElementById('yearlyChart');
    if (!ctx) return;

    const labels = BACKTEST_DATA.yearly.map(d => d.year);
    const returns = BACKTEST_DATA.yearly.map(d => d.return_pct);
    const maxDDs = BACKTEST_DATA.yearly.map(d => -Math.abs(d.max_dd_pct));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Annual Return %',
                    data: returns,
                    backgroundColor: returns.map(v => v >= 0 ? 'rgba(34,197,94,0.75)' : 'rgba(239,68,68,0.75)'),
                    borderColor: returns.map(v => v >= 0 ? COLORS.green : COLORS.red),
                    borderWidth: 1.5,
                    borderRadius: 6,
                    yAxisID: 'y',
                },
                {
                    label: 'Max Drawdown %',
                    data: maxDDs,
                    backgroundColor: 'rgba(239,68,68,0.20)',
                    borderColor: 'rgba(239,68,68,0.5)',
                    borderWidth: 1.5,
                    borderRadius: 4,
                    type: 'bar',
                    yAxisID: 'y2',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 11 } } },
                y: {
                    position: 'left',
                    grid: { color: 'rgba(99,179,237,0.05)' },
                    ticks: { callback: v => v.toLocaleString() + '%', font: { size: 11 } }
                },
                y2: {
                    position: 'right',
                    grid: { display: false },
                    ticks: { callback: v => v.toFixed(0) + '%', font: { size: 11 } }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(13,20,33,0.95)',
                    borderColor: 'rgba(56,189,248,0.3)',
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => `  ${ctx.dataset.label}: ${ctx.raw.toFixed(2)}%`
                    }
                }
            }
        }
    });
}

// ─── 4. MONTHLY HEATMAP ───
function renderHeatmap() {
    const container = document.getElementById('heatmapContainer');
    if (!container) return;

    const { months } = BACKTEST_DATA.monthly.labels;
    const rows = BACKTEST_DATA.monthly.rows;

    // Color scale: RdYlGn
    function returnToColor(v) {
        if (v === null) return 'transparent';
        if (v > 200) return 'rgba(21,128,61,0.95)';
        if (v > 100) return 'rgba(22,163,74,0.90)';
        if (v > 50) return 'rgba(34,197,94,0.85)';
        if (v > 20) return 'rgba(74,222,128,0.75)';
        if (v > 5) return 'rgba(134,239,172,0.6)';
        if (v > 0) return 'rgba(187,247,208,0.4)';
        if (v > -5) return 'rgba(254,202,202,0.4)';
        if (v > -15) return 'rgba(252,165,165,0.6)';
        if (v > -30) return 'rgba(239,68,68,0.75)';
        return 'rgba(185,28,28,0.9)';
    }
    function textColor(v) {
        if (v === null) return 'transparent';
        return Math.abs(v) > 30 ? '#fff' : '#e2e8f0';
    }

    let html = '<table class="heatmap-table"><thead><tr>';
    html += '<th>Year</th>';
    months.forEach(m => { html += `<th>${m}</th>`; });
    html += '</tr></thead><tbody>';

    rows.forEach(row => {
        html += `<tr><td class="year-cell">${row.year}</td>`;
        row.values.forEach(v => {
            if (v === null) {
                html += '<td style="background:transparent;color:var(--text-muted);">—</td>';
            } else {
                const bg = returnToColor(v);
                const fc = textColor(v);
                html += `<td style="background:${bg};color:${fc};" title="${v > 0 ? '+' : ''}${v}%">${v > 0 ? '+' : ''}${v.toFixed(1)}</td>`;
            }
        });
        html += '</tr>';
    });
    html += '</tbody></table>';

    container.innerHTML = html;
}

// ─── 5. MONTE CARLO FAN CHART ───
function initMCChart() {
    const ctx = document.getElementById('mcChart');
    if (!ctx) return;

    const { dates, p5, p50, p95, actual } = BACKTEST_DATA.mc_bands;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: '95th Percentile',
                    data: p95,
                    borderColor: 'rgba(34,197,94,0.4)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(34,197,94,0.06)',
                    fill: '+1',
                    tension: 0.4,
                    pointRadius: 0,
                },
                {
                    label: 'Median',
                    data: p50,
                    borderColor: COLORS.accent,
                    borderWidth: 2,
                    backgroundColor: 'rgba(56,189,248,0.08)',
                    fill: '+1',
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                },
                {
                    label: '5th Percentile (Worst)',
                    data: p5,
                    borderColor: 'rgba(239,68,68,0.4)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(239,68,68,0.06)',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                },
                {
                    label: 'Actual Result',
                    data: actual,
                    borderColor: COLORS.yellow,
                    borderWidth: 2.5,
                    borderDash: [6, 3],
                    backgroundColor: 'transparent',
                    fill: false,
                    tension: 0.35,
                    pointRadius: 4,
                    pointHoverRadius: 7,
                    pointBackgroundColor: COLORS.yellow,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(99,179,237,0.05)' }, ticks: { maxTicksLimit: 8, font: { size: 11 } } },
                y: {
                    type: 'logarithmic',
                    grid: { color: 'rgba(99,179,237,0.05)' },
                    ticks: {
                        font: { size: 11 },
                        callback: v => v >= 1e9 ? '$' + (v / 1e9).toFixed(0) + 'B'
                            : v >= 1e6 ? '$' + (v / 1e6).toFixed(0) + 'M'
                                : v >= 1000 ? '$' + (v / 1e3).toFixed(0) + 'K'
                                    : '$' + v
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#94a3b8', font: { size: 11 }, padding: 16, boxWidth: 12, boxHeight: 2 }
                },
                tooltip: {
                    backgroundColor: 'rgba(13,20,33,0.95)',
                    borderColor: 'rgba(56,189,248,0.3)',
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => {
                            const v = ctx.raw;
                            const s = v >= 1e9 ? '$' + (v / 1e9).toFixed(2) + 'B'
                                : v >= 1e6 ? '$' + (v / 1e6).toFixed(2) + 'M'
                                    : '$' + v.toLocaleString();
                            return `  ${ctx.dataset.label}: ${s}`;
                        }
                    }
                }
            }
        }
    });
}

// ─── 6. INIT ALL ───
function initCharts() {
    initEquityChart();
    initDrawdownChart();
    initYearlyChart();
    renderHeatmap();
    initMCChart();
}

document.addEventListener('DOMContentLoaded', initCharts);
