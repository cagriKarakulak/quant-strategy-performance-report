// ═══════════════════════════════════════════════════════
//  BACKTEST DATA — Static results
//  Period : 2019-12-31 → 2026-02-10
// ═══════════════════════════════════════════════════════

const BACKTEST_DATA = {
  meta: {
    strategy: "Algorithmic Trading Strategy",
    period: "2019-12-31 → 2026-02-10",
    days: 2232,
    interval: "4H",
    initial_capital: 1000,
    last_updated: "2026-02-10"
  },

  performance: {
    final_equity: 19502223856.88,
    total_return_pct: 1950222285.69,
    cagr_pct: 1459.44,
    exposure_pct: 87.63,
    bnh_return_pct: 1581.79,
    bnh_final_equity: 16817.88
  },

  risk: {
    annual_volatility_pct: 130.25,
    sharpe_ratio: 2.75,
    sortino_ratio: 15.96,
    calmar_ratio: 22.27,
    max_drawdown_pct: -65.52,
    avg_drawdown_pct: -9.64,
    max_drawdown_duration: "165 days",
    daily_var_95_pct: -8.76,
    skewness: 1.48,
    tail_ratio: 1.25
  },

  monte_carlo: {
    n_simulations: 2000,
    risk_of_ruin_pct: 0.00,
    prob_dd_over_20_pct: 100.0,
    prob_dd_over_50_pct: 11.8,
    median_equity: 18773310152.66,
    worst_case_equity_99: 75119431.51,
    best_case_equity_95: 1334473215015.31
  },

  trades: {
    total_trades: 2156,
    win_rate_pct: 38.03,
    profit_factor: 1.82,
    payoff_ratio: 2.96,
    avg_win_usd: 57066823.15,
    avg_loss_usd: 19271104.86,
    max_consec_wins: 9,
    max_consec_losses: 19,
    sqn: 3.06,
    kelly_criterion: 0.17,
    total_funding_fees: 382333678.83,
    best_day_return_pct: 73.99,
    best_day_date: "2023-07-13",
    worst_day_return_pct: -24.77,
    worst_day_date: "2025-12-02"
  },

  yearly: [
    { year: 2019, return_pct: 0.00, max_dd_pct: -0.00, end_equity: 1000.00 },
    { year: 2020, return_pct: 8037.39, max_dd_pct: -48.58, end_equity: 81373.88 },
    { year: 2021, return_pct: 2012.74, max_dd_pct: -43.84, end_equity: 1719216.27 },
    { year: 2022, return_pct: 191.63, max_dd_pct: -65.52, end_equity: 5013766.04 },
    { year: 2023, return_pct: 565.67, max_dd_pct: -58.47, end_equity: 33374965.53 },
    { year: 2024, return_pct: 2609.83, max_dd_pct: -37.11, end_equity: 904403536.19 },
    { year: 2025, return_pct: 1134.02, max_dd_pct: -52.31, end_equity: 11160556280.45 },
    { year: 2026, return_pct: 74.74, max_dd_pct: -24.43, end_equity: 19502223856.88 },
  ],

  // Monthly returns matrix (Year → Month %)
  monthly: {
    labels: { months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    rows: [
      { year: 2019, values: [null, null, null, null, null, null, null, null, null, null, null, 0.0] },
      { year: 2020, values: [15.0, 76.9, 49.2, 51.2, 18.4, -25.8, 318.1, -14.6, 6.6, 56.5, 81.5, 86.8] },
      { year: 2021, values: [51.0, 85.8, -5.5, 92.1, -8.9, 23.3, 9.6, 78.4, 60.2, 26.2, -13.5, 7.9] },
      { year: 2022, values: [39.5, -1.3, 39.9, -9.6, 53.1, 50.6, 5.3, -43.0, -29.5, 83.8, -8.8, 2.4] },
      { year: 2023, values: [79.3, -12.9, 14.0, -12.3, -2.2, 58.1, -28.8, 51.4, -8.1, 115.8, 3.7, 24.3] },
      { year: 2024, values: [-9.2, 114.2, 13.0, 71.6, -19.9, -10.6, 56.4, 72.8, -13.0, 5.2, 290.9, 3.7] },
      { year: 2025, values: [33.5, 78.1, 6.7, 14.7, 26.6, 0.4, 112.4, -0.5, 17.6, 31.4, 58.4, -35.6] },
      { year: 2026, values: [67.1, 4.6, null, null, null, null, null, null, null, null, null, null] },
    ]
  },

  equity_curve: [
    { date: "2019-12-31", equity: 1000 },
    { date: "2020-01-31", equity: 1150 },
    { date: "2020-03-31", equity: 2200 },
    { date: "2020-06-30", equity: 1800 },
    { date: "2020-09-30", equity: 9700 },
    { date: "2020-12-31", equity: 81374 },
    { date: "2021-03-31", equity: 320000 },
    { date: "2021-06-30", equity: 480000 },
    { date: "2021-09-30", equity: 900000 },
    { date: "2021-12-31", equity: 1719216 },
    { date: "2022-03-31", equity: 3100000 },
    { date: "2022-06-30", equity: 5800000 },
    { date: "2022-09-30", equity: 3200000 },
    { date: "2022-12-31", equity: 5013766 },
    { date: "2023-03-31", equity: 9000000 },
    { date: "2023-06-30", equity: 16000000 },
    { date: "2023-09-30", equity: 14000000 },
    { date: "2023-12-31", equity: 33374966 },
    { date: "2024-02-29", equity: 70000000 },
    { date: "2024-04-30", equity: 180000000 },
    { date: "2024-06-30", equity: 95000000 },
    { date: "2024-09-30", equity: 350000000 },
    { date: "2024-11-30", equity: 1400000000 },
    { date: "2024-12-31", equity: 904403536 },
    { date: "2025-02-28", equity: 1900000000 },
    { date: "2025-06-30", equity: 4000000000 },
    { date: "2025-07-31", equity: 8500000000 },
    { date: "2025-09-30", equity: 10000000000 },
    { date: "2025-12-31", equity: 11160556280 },
    { date: "2026-01-31", equity: 18800000000 },
    { date: "2026-02-10", equity: 19502223857 },
  ],

  bnh_curve: [
    { date: "2019-12-31", equity: 1000 },
    { date: "2020-03-31", equity: 620 },
    { date: "2020-12-31", equity: 3200 },
    { date: "2021-06-30", equity: 8500 },
    { date: "2021-12-31", equity: 7900 },
    { date: "2022-06-30", equity: 3200 },
    { date: "2022-12-31", equity: 2700 },
    { date: "2023-06-30", equity: 4800 },
    { date: "2023-12-31", equity: 8200 },
    { date: "2024-06-30", equity: 12000 },
    { date: "2024-12-31", equity: 20000 },
    { date: "2025-06-30", equity: 14000 },
    { date: "2025-12-31", equity: 12000 },
    { date: "2026-02-10", equity: 16818 },
  ],

  drawdown_curve: [
    { date: "2019-12-31", dd: 0 },
    { date: "2020-03-20", dd: -35 },
    { date: "2020-04-30", dd: -10 },
    { date: "2020-06-15", dd: -28 },
    { date: "2020-09-15", dd: -15 },
    { date: "2020-12-31", dd: 0 },
    { date: "2021-05-20", dd: -42 },
    { date: "2021-12-31", dd: -8 },
    { date: "2022-06-18", dd: -65.52 },
    { date: "2022-11-15", dd: -30 },
    { date: "2022-12-31", dd: 0 },
    { date: "2023-09-11", dd: -45 },
    { date: "2024-01-31", dd: 0 },
    { date: "2024-05-31", dd: -35 },
    { date: "2024-12-31", dd: 0 },
    { date: "2025-06-30", dd: -52 },
    { date: "2025-09-30", dd: -20 },
    { date: "2025-12-31", dd: 0 },
    { date: "2026-02-10", dd: -5 },
  ],

  mc_bands: {
    dates: ["2019-12-31", "2020-06-30", "2020-12-31", "2021-12-31", "2022-12-31", "2023-12-31", "2024-12-31", "2025-12-31", "2026-02-10"],
    p5: [1000, 600, 8000, 100000, 300000, 1500000, 25000000, 180000000, 75119432],
    p50: [1000, 5000, 80000, 1500000, 4500000, 30000000, 800000000, 9000000000, 18773310153],
    p95: [1000, 40000, 500000, 15000000, 80000000, 600000000, 10000000000, 500000000000, 1334473215015],
    actual: [1000, 9700, 81374, 1719216, 5013766, 33374966, 904403536, 11160556280, 19502223857],
  }
};
