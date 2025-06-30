# Finance Analytics Client

This is the frontend client for the Finance Analytics application, built with **React**, **TypeScript**, and **Vite**. It provides a modern UI for managing users, transactions, analytics, and CSV exports.

## Features

- Modern dashboard UI with charts and analytics
- User authentication (login/register)
- Transaction management (CRUD)
- CSV export functionality
- Responsive design with Tailwind CSS and shadcn/ui components

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [ESLint](https://eslint.org/) for linting

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- (Optional) Bun for faster installs

### Installation

1. **Install dependencies:**
   ```sh
   npm install
   # or
   bun install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   # or
   bun run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```sh
npm run build
# or
bun run build
```

### Preview Production Build

```sh
npm run preview
# or
bun run preview
```

## Project Structure

```
client/
  public/
  src/
    components/
    context/
    hooks/
    lib/
    pages/
    utils/
    App.tsx
    main.tsx
  index.html
  package.json
  tailwind.config.ts
  tsconfig.json
  vite.config.ts
```

## Linting

This project uses ESLint with recommended settings for React and TypeScript. To run lint checks:

```sh
npm run lint
```

You can expand the ESLint configuration for stricter or more type-aware rules. See the [ESLint documentation](https://eslint.org/) or the comments in `eslint.config.js` for more details.

## Environment Variables

If your app needs to connect to a backend API, create a `.env` file in the root and add:

```
VITE_API_URL=http://localhost:3000
```

## License

MIT

---

*This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [shadcn/ui](https://ui.shadcn.com/) for UI
