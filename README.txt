# Finance Analytics

Finance Analytics is a full-stack web application for managing personal finances, tracking transactions, setting financial goals, and visualizing portfolio performance. The project consists of a React + TypeScript client and an Express + MongoDB server.

---

## Features

- User authentication (JWT)
- Transaction management (CRUD)
- Financial goals tracking
- Portfolio analytics and charts
- CSV export for transactions and goals
- Responsive UI with Tailwind CSS and shadcn/ui
- Modern dashboard design

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI, Recharts
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, json2csv
- **Other:** ESLint, Bun (optional for faster installs)

---

## Project Structure

```
finance-analytics/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── types/
│   │   └── utils/
│   ├── transactions.json
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- (Optional) Bun for faster installs

---

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd finance-analytics
```

---

### 2. Setup the Server

```sh
cd server
npm install
# or
bun install
```

- Create a `.env` file in `server/` with:
  ```
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<your-secret-key>
  PORT=3000
  ```

- Start the server:
  ```sh
  npm run dev
  ```

---

### 3. Setup the Client

```sh
cd client
npm install
# or
bun install
```

- (Optional) Create a `.env` file in `client/` if you need to override the API URL:
  ```
  VITE_API_URL=http://localhost:3000
  ```

- Start the client:
  ```sh
  npm run dev
  ```

- The app will be available at [http://localhost:5173](http://localhost:5173)

---

## Scripts

### Server

- `npm run dev` — Start the server with hot-reload
- `npm run load-data` — Load transactions from `transactions.json` into MongoDB

### Client

- `npm run dev` — Start the Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT

### Transactions

- `GET /api/transactions` — Get all transactions (auth required)
- `POST /api/transactions` — Create a new transaction (auth required)
- `PUT /api/transactions/:id` — Update a transaction (auth required)
- `DELETE /api/transactions/:id` — Delete a transaction (auth required)

### Export

- `GET /api/export/csv?fields=field1,field2,...` — Export transactions as CSV (auth required)

---

## Linting

Run ESLint in the client:

```sh
npm run lint
```

---

## License

MIT

---

*This project uses [Vite](https://vitejs.dev/) and [shadcn/ui](https://ui.shadcn.com/) for UI components.*