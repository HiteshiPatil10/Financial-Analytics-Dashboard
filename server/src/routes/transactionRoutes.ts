import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
  updateTransaction
} from '../controllers/transactionController';
import { asyncHandler } from '../utils/asyncHandler';
import authenticateJWT  from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authenticateJWT); // 🔒 All below routes are protected

router.get('/', asyncHandler(getTransactions));
router.get('/:id', asyncHandler(getTransactionById));
router.post('/', asyncHandler(createTransaction));
router.put('/:id', asyncHandler(updateTransaction));
router.delete('/:id', asyncHandler(deleteTransaction));


export default router;