[中文](./README.md)

# 天道仙途 · Xianxia Online

A browser-based xianxia cultivation RPG — no download required, play instantly in your browser.

## Tech Stack

| Technology | Version |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| Tailwind CSS | 4 |
| Zustand | 5 |
| Framer Motion | 12 |
| React Router | 7 |
| Axios | 1 |

## Local Deployment Guide

### Prerequisites

- **Node.js** ≥ 18 (LTS version recommended)
- **npm** ≥ 9 (bundled with Node.js)

> Download and install Node.js from [https://nodejs.org](https://nodejs.org).

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/zeshuai007/web-game.git
cd web-game
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

Once started, open [http://localhost:5173](http://localhost:5173) in your browser to play.

**4. Build for production**

```bash
npm run build
```

The production artifacts are output to the `dist/` directory.

**5. Preview the production build**

```bash
npm run preview
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with Hot Module Replacement (HMR) |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint code checks |

## Project Structure

```
src/
├── api/          # HTTP request modules (axios)
├── assets/       # Static assets (images, fonts, etc.)
├── components/   # Reusable UI and game components
│   ├── game/     # Game-specific components
│   └── ui/       # Generic UI components
├── constants/    # Global constants
├── layouts/      # Page layout components
├── mock/         # Mock data
├── pages/        # Page-level components (login, lobby, cultivation, inventory, etc.)
├── router/       # Route configuration
├── store/        # Global state management (Zustand)
├── styles/       # Global styles
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
├── ws/           # WebSocket logic
├── App.tsx       # Root application component
└── main.tsx      # Application entry point
```

## Contributing

Issues and Pull Requests are welcome!

## License

[MIT](./LICENSE)
