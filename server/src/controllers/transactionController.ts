import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "transactions.json");

const readTransactions = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeTransactions = (data: any[]) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export const getTransactions = async (req: Request, res: Response) => {
  const userId = req.user?.userid;
  const transactions = readTransactions();
  const userTransactions = transactions.filter((txn: { user_id: string | undefined; }) => txn.user_id === userId);
  res.json({ transactions: userTransactions });
};

export const createTransaction = async (req: Request, res: Response) => {
  const userId = req.user?.userid;
  const transactions = readTransactions();

  const newTransaction = {
    id: Date.now(),
    ...req.body,
    user_id: userId,
  };

  transactions.push(newTransaction);
  writeTransactions(transactions);
  res.status(201).json(newTransaction);
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userid;
  const transactions = readTransactions();
  const index = transactions.findIndex((t: { id: string; user_id: string | undefined; }) => t.id == id && t.user_id === userId);

  if (index === -1) return res.status(404).json({ error: "Transaction not found" });

  transactions[index] = { ...transactions[index], ...req.body };
  writeTransactions(transactions);
  res.json(transactions[index]);
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userid;
  const transactions = readTransactions();
  const newList = transactions.filter((t: { id: string; user_id: string | undefined; }) => !(t.id == id && t.user_id === userId));

  if (newList.length === transactions.length) return res.status(404).json({ error: "Transaction not found" });

  writeTransactions(newList);
  res.status(204).send();
};

export const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userid;
  const transactions = readTransactions();
  const transaction = transactions.find((t: { id: string; user_id: string | undefined; }) => t.id == id && t.user_id === userId);
  if (!transaction) return res.status(404).json({ error: "Transaction not found" });
  res.json(transaction);
};
export const exportTransactions = async (req: Request, res: Response) => {
  const userId = req.user?.userid;
  const transactions = readTransactions();
  const userTransactions = transactions.filter((txn: { user_id: string | undefined; }) => txn.user_id === userId);

  const csvContent = userTransactions.map((txn: any) => Object.values(txn).join(",")).join("\n");
  res.header("Content-Type", "text/csv");
  res.attachment("transactions.csv");
  res.send(csvContent);
};
