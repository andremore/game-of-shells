# Game of Santas 🎅

## Why Vanilla TypeScript?

For this project, I intentionally avoided using any frontend frameworks to focus on core web development skills. By using Vanilla TypeScript, I aimed to:

- Gain a deeper understanding of TypeScript in a browser environment.
- Show the ability to build a project from scratch without pre-built abstractions.
- Challenge myself to manage DOM interactions, state management, and application logic directly.

---

## Technologies

- **TypeScript**
- **Vite**

---

## Project Structure

```
game-of-shells/
├── public/
├── src/
│   ├── components/
│   ├── controllers/
│   ├── game/
│   ├── stores/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── main.ts
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

---

## Setup and Usage

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://www.pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andremore/game-of-shells.git
   cd game-of-shells
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Development

Start the development server:

```bash
pnpm dev
```

Visit `http://localhost:5173` to play the game.

### Build

Generate a production build:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

---

Feel free to reach out for any questions or suggestions
