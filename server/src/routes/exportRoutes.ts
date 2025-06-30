import express from 'express';
import { exportTransactionsCSV } from '../controllers/exportControllers';
import { asyncHandler } from '../utils/asyncHandler';
import authenticateJWT from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/csv', authenticateJWT, asyncHandler(exportTransactionsCSV));

export default router;