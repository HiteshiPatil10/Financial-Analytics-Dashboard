import {Request,Response} from 'express';
import Transaction from '../models/Transaction';
import {User} from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Parser } from 'json2csv';

export const register = async (req: Request, res: Response) => {
  console.log('Register endpoint hit with body:', req.body); // ✅
  const {name, email, password} = req.body;

  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });
   console.log('✅ User created:', user.email);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err: any) {
    console.error(' Register Error:', err); // ✅ Add this
    return res.status(500).json({ message: err.message || "Server error" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

