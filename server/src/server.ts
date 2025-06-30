import express from 'express';
import authRoutes from './routes/authRoutes';
import { createServer } from 'http';
import mongoose   from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes';
import exportRoutes from './routes/exportRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

app.use(cors({
  origin: 'http://localhost:8080', // Your frontend port
  credentials: true,
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Something went wrong on the server' });
});
app.use('/api/transactions', transactionRoutes);
app.use('/api/export', exportRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Finance Analytics Server!');
});

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB error:', err));