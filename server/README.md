# Finance Analytics Server

This is the backend server for the Finance Analytics application. It provides RESTful APIs for user authentication, transaction management, and CSV export.

## Features

- User registration and login (JWT authentication)
- Transaction CRUD operations
- Export transactions as CSV
- MongoDB database integration

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (local or Atlas)

## Setup

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd server
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `server` directory:

   ```
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   PORT=3000
   ```

4. **Run the server in development mode:**
   ```sh
   npm run dev
   ```

   The server will start on `http://localhost:3000` by default.

## Scripts

- `npm run dev` — Start the server with hot-reload using ts-node-dev
- `npm run load-data` — Load transactions from `transactions.json` into the database

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

## Project Structure

```
server/
  src/
    controllers/
    middlewares/
    models/
    routes/
    scripts/
    types/
    utils/
  transactions.json
  .env
  package.json
  tsconfig.json
```

##