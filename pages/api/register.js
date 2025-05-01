import bcrypt from 'bcryptjs';

import { users } from '../../data/users'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user (in memory)
  users.push({ name, email, password: hashedPassword });

  // For debugging, log the users array on the server
  console.log('Registered users:', users);

  // Respond with success
  return res.status(201).json({ message: 'User registered' });
}
