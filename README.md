# 💼 Crypto Portfolio Allocation

A simple, intuitive React app for managing and rebalancing your cryptocurrency portfolio. Enter your holdings, set target allocations, and receive clear buy/sell recommendations based on your goals.

## 🚀 Features

- 📊 Add and view your crypto holdings
- 🎯 Set target percentage allocations
- 🔁 Get buy/sell recommendations to rebalance your portfolio
- 💾 State persistence with local storage
- ✨ Clean, component-based UI using SCSS modules

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **SCSS Modules**
- **Custom hooks & reusable components**

## 🧠 Core Logic

The `usePortfolio` hook manages:

- Holdings state
- Total portfolio value
- Rebalancing logic
- Adding/removing assets

```ts
{
  id: string;
  name: string; // e.g., BTC
  value: number; // e.g., 1000
  targetPercentage: number; // e.g., 50
}
```

## 💾 Persistent Storage
Your portfolio is automatically saved and restored from localStorage using:

```ts
const PORTFOLIO_CACHE_KEY = 'crypto_portfolio_cache';
```

## 🖼️ UI Highlights
Modular SCSS styling per component

`Card` component wraps major sections for consistent layout

`Table` component used for both holdings and recommendations


## 📄 License
MIT — free to use, modify, and distribute.