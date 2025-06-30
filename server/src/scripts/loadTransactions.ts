import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Transaction from '../models/Transaction';

dotenv.config();

const loadTransactions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ Connected to MongoDB');

    const filePath = path.join(__dirname, '../../transactions.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const actualUserId = '68602c4d34bdf625136fc88e'; // ✅ Replace with real user _id

    const cleanedData = data
      .filter((txn: any) =>
        txn.date && txn.amount && txn.category && txn.status
      )
      .map((txn: any) => ({
        user: actualUserId,
        type: txn.category.toLowerCase() === "revenue" ? "income" : "expense", // Convert category to type
        category: txn.category,
        amount: txn.amount,
        date: new Date(txn.date),
        status: txn.status,
        description: `Imported transaction ${txn.id || ''}` // Fallback description
      }));

    if (cleanedData.length === 0) {
      console.warn('⚠️ No valid transactions found to import.');
      return process.exit(0);
    }

    await Transaction.deleteMany({ user: actualUserId }); // Clear only this user's data
    await Transaction.insertMany(cleanedData);

    console.log(`✅ Imported ${cleanedData.length} transactions successfully`);
    process.exit();
  } catch (err) {
    console.error('❌ Error loading transactions:', err);
    process.exit(1);
  }
};

loadTransactions();

/*dotenv.config();

const loadTransactions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(' Connected to MongoDB');

    // Read JSON file
    const filePath = path.join(__dirname, '../../transactions.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const transactions = JSON.parse(fileData);

    // Map to match Transaction model schema
    const formatted = transactions.map((t: any) => ({
      user: t.user_id,
      type: t.amount > 0 ? 'income' : 'expense',
      category: t.category,
      amount: Math.abs(t.amount),
      description: t.user_profile.name, // or any string
      status: t.status,
      date: new Date(t.date),
    }));

    // Clear existing data (optional)
    await Transaction.deleteMany({});
    console.log(' Old transactions cleared');

    // Insert new data
    await Transaction.insertMany(formatted);
    console.log(` Inserted ${formatted.length} transactions`);

    process.exit(0);
  } catch (err) {
    console.error(' Error loading data:', err);
    process.exit(1);
  }
};

loadTransactions();*/