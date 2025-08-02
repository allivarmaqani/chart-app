# Chart App - Frontend Technical Test

This React application loads chart data from `data.json` and renders single-series and multi-series line charts dynamically using D3.js.

---

## Features

- Detects chart type automatically (single-series or multi-series).
- Renders single continuous line for single-series charts.
- Renders three colored lines (Blue, Green, Red) for multi-series charts.
- Skips points with `null` values in each series.
- Displays chart title above each chart.

---

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/allivarmaqani/chart-app.git
cd chart-app

npm install

npm run dev
