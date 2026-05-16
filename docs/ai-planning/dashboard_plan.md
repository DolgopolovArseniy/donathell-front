> **Status:** Completed
> **Author:** Arseniy Dolgopolov (Co-authored with Gemini 3.1 Pro)

# Dashboard Implementation Plan

Based on your requirements and the API schema, here is the detailed plan for building the Dashboard page. I have included several styling and logic proposals to ensure the result is exceptionally clean, professional, and visually stunning.

## 1. 1st Level: Total Balances
**Structure:**
- A full-width container labeled **"Total Balances"**.
- A 3x2 Grid containing 6 cards (`grid-cols-1 md:grid-cols-3 gap-6`).

**Logic Proposals:**
- **Merge USD & USDT:** Since the API returns `fiatBalances` and `cryptoBalances` separately, I will programmatically merge USD and USDT into a single **"USD / USDT"** card by summing their `amount` and `convertedAmount`.
- **Card Distribution:** The 6 cards will be structured as:
  - Top Row (Crypto): **BTC**, **ETH**, **SOL**
  - Bottom Row (Traditional/Stable): **USD / USDT** (combined), **EUR**,
   **UAH**
- **Formatting:** `convertedAmount` (USD equivalent) will be formatted exactly to standard currency (e.g., `$1,234.56`). The native balance `amount` will display up to 4-6 decimals for crypto so it remains readable (e.g., `0.0450 BTC`).

**Styling Proposals:**
- **Card Design:** We will use the existing `.glass` class. The currency tag will sit in the top-left, and the converted value (subtle gray `text-[#666]`) in the top-right. The actual native balance will be large and bold in the center.
- **Tag Colors:** I propose adding subtle, brand-matching background glows to the currency tags to make them pop (e.g., subtle orange for BTC, blue for ETH).

## 2. 2nd Level: Donation Trends
**Structure:**
- Full-width container labeled **"Donation Trends"**.
- A chart spanning the full width.
- Filter buttons: `1D`, `7D`, `30D`.

**Logic Proposals:**
- **Filter Naming:** I propose using **`30D`** instead of `1M`. "30 Days" is exact and unambiguous, which is standard in financial dashboards.
- **Data Fetching:** Clicking a filter will trigger `getDashboardStats(range)` to refetch. We will add a subtle loading state (e.g., dimming the chart or a small loader) so the UI doesn't freeze while fetching.

**Styling Proposals:**
- **AreaChart vs LineChart (Important):** I strongly propose using Recharts `<AreaChart>` instead of a `<LineChart>`. An area chart with a gradient fill—starting from solid neon green (`donathell-main`) at the top and fading to transparent at the bottom—looks significantly more premium and dynamic in a dark mode UI than a plain line.
- **Axes & Tooltip:** We will hide grid lines (or make them extremely faint, like `5%` opacity) to keep the UI clean. We will also implement a custom HTML tooltip that matches your `.glass-dropdown` styling.

## 3. 3rd Level: Analytics & Distributions
**Structure:**
- Full-width grid container with 3 equal columns (`grid-cols-1 lg:grid-cols-3 gap-6`).

### 3.1 Top 5 Donors
**Logic Proposals:**
- Map through the `topDonors` array (up to 5 items). Amounts will be cleanly formatted as USD.

**Styling Proposals:**
- **Podium Highlighting:**
  - 🥇 **1st Place:** Larger text size, a subtle neon gold gradient for the amount, and a glowing glass border.
  - 🥈 **2nd Place:** Silver accent color.
  - 🥉 **3rd Place:** Bronze/Orange accent color.
  - **4th & 5th:** Standard text formatting.

### 3.2 & 3.3 Asset Distributions (Crypto & Fiat)
**Logic Proposals:**
- Feed `cryptoDistribution` to the first chart and `fiatDistribution` to the second.
- We will include an "Empty State" fallback just in case a user has absolutely 0 fiat or crypto, preventing the charts from crashing or looking broken.

**Styling Proposals:**
- **Donut Chart Style:** I propose using a **"Donut"** style pie chart (by setting an `innerRadius` on the `Pie` component). Donut charts look significantly more modern, clean, and less heavy than solid pie charts.
- **Colors:** We will use a curated palette of vibrant, harmonious colors (Neon Green, Electric Blue, Violet, Cyber Pink) that pop against the `#121315` background.
- **Interactivity:** Custom glassmorphism tooltips showing the exact percentage and USD value on hover.

---
**Please review these proposals.** If you approve of the layout (AreaChart, Donut charts, USD/USDT merge, 30D label), I will begin implementing the dashboard components step by step!
