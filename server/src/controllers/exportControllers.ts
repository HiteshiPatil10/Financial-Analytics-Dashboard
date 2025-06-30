import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { Parser } from 'json2csv';

export const exportTransactionsCSV = async (req: Request, res: Response) => {
  const { fields, ...filters } = req.query;

  if (!fields) {
    return res.status(400).json({ message: 'Missing required fields parameter' });
  }

  const selectedFields = (fields as string).split(',');

  const query: any = { user: req.user?.userid };

  if (filters.category) query.category = filters.category;
  if (filters.status) query.status = filters.status;

  const transactions = await Transaction.find(query).select(selectedFields.join(' '));

  const parser = new Parser({ fields: selectedFields });
  const csv = parser.parse(transactions);

  res.header('Content-Type', 'text/csv');
  res.attachment('transactions.csv');
  res.send(csv);
};
