// pages/api/register.js

import bcrypt from 'bcryptjs';
import { users } from '../../data/users.js'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password } = req.body;

  // Trim whitespace
  const trimmedName  = name.trim();
  const trimmedEmail = email.trim();

  // Reject names longer than 50 characters
  if (trimmedName.length > 50) {
    return res.status(400).json({ message: 'Name must be at most 50 characters long' });
  }

  // Basic validation
  if (!trimmedName || !trimmedEmail || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Simple email format validation
  const normalizedEmail = trimmedEmail.toLowerCase();
  if (!normalizedEmail.includes('@') || !normalizedEmail.includes('.')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Prevent registering the same email twice
  if (users.some(u => u.email === normalizedEmail)) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  // Password strength validation
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user (in memory)
  users.push({ name: trimmedName, email: normalizedEmail, password: hashedPassword });

  // For debugging, log the users array on the server
  console.log('Registered users:', users);

  // Respond with success
  return res.status(201).json({ message: 'User registered' });
}
