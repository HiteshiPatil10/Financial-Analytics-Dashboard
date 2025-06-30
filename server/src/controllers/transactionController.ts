import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

export const createTransaction = async (req: Request, res: Response) => {
  const { type, category, amount, date, description } = req.body;

  const newTransaction = await Transaction.create({
    user: req.user?.userid,
    type,
    category,
    amount,
    date,
    description,
  });

  res.status(201).json(newTransaction);
};

export const getTransactions = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
    search = '',
    status,
    category,
    minAmount,
    maxAmount,
    fromDate,
    toDate,
  } = req.query;

  const query: any = {
    user: req.user?.userid // ✅ Filter to user's data only
  };

  

  if (search) {
    query.$or = [
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { status: { $regex: search, $options: 'i' } }
    ];
  }

  if (status) query.status = status;
  if (category) query.category = category;
  if (minAmount) query.amount = { ...query.amount, $gte: Number(minAmount) };
  if (maxAmount) query.amount = { ...query.amount, $lte: Number(maxAmount) };
  if (fromDate) query.date = { ...query.date, $gte: new Date(fromDate as string) };
  if (toDate) query.date = { ...query.date, $lte: new Date(toDate as string) };

  const skip = (Number(page) - 1) * Number(limit);
  const sortOptions: any = { [sortBy as string]: order === 'asc' ? 1 : -1 };

  const [transactions, total] = await Promise.all([
    Transaction.find(query).sort(sortOptions).skip(skip).limit(Number(limit)),
    Transaction.countDocuments(query)
  ]);

  res.json({
    total,
    page: Number(page),
    pageSize: Number(limit),
    transactions
  });
};
export const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = await Transaction.findOne({ _id: id, user: req.user?.userid });

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  res.json(transaction);
};
export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Transaction.findOneAndDelete({ _id: id, user: req.user?.userid });

    if (!deleted) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting transaction' });
  }
};


export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: id, user: req.user?.userid },
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating transaction' });
  }
};

