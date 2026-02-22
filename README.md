# 📊 Quant Strategy Performance Report

> An interactive backtest dashboard built with vanilla HTML, CSS, and JavaScript — no frameworks, no server required.

## 🌐 Live Demo

**[cagrikarakulak.github.io/quant-strategy-performance-report](https://cagrikarakulak.github.io/quant-strategy-performance-report/)**

---

## Overview

This repository hosts the static web dashboard for a proprietary algorithmic trading strategy, backtested over a **6-year period (2019–2026)** on cryptocurrency futures markets.

The dashboard presents performance results in a clean, fully interactive format without revealing any implementation details of the underlying strategy.

## 📈 Key Results

| Metric | Value |
|---|---|
| Initial Capital | $1,000 |
| Final Equity | $19.50B |
| CAGR | 1,459% |
| Sharpe Ratio | 2.75 |
| Sortino Ratio | 15.96 |
| Max Drawdown | -65.52% |
| Total Trades | 2,156 |
| Win Rate | 38.03% |
| Profit Factor | 1.82 |

## 🗂️ Dashboard Sections

- **Overview** — Summary metrics and test configuration
- **Equity Curve** — Portfolio growth vs. market benchmark (log scale)
- **Drawdown Chart** — Underwater equity analysis
- **Yearly Breakdown** — Annual returns table and bar chart
- **Monthly Heatmap** — Color-coded month-by-month returns
- **Monte Carlo Stress Test** — 2,000 bootstrap simulations, risk of ruin analysis
- **Trade Statistics** — SQN, Kelly Criterion, payoff ratio, streak analysis

## 🛠️ Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — zero dependencies
- **[Chart.js](https://www.chartjs.org/)** — interactive charts (CDN)
- **Google Fonts** — Inter + JetBrains Mono
- Static data embedded in `data.js` — no backend, no API calls

## 📁 Structure

```
├── index.html   # Main page
├── style.css    # Dark theme stylesheet
├── data.js      # Backtest results (static)
├── charts.js    # Chart rendering logic
└── app.js       # Animations & navigation
```

## ⚠️ Disclaimer

Past performance does not guarantee future results. This dashboard is published for informational and research purposes only and does not constitute financial advice.

---

*Built with ❤️ using pure HTML/CSS/JS*
