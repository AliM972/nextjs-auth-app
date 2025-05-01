// pages/api/profile.js

import { users, saveUsers } from '../../data/users';
import { parse, serialize } from 'cookie';

export default function handler(req, res) {
  // 1. Read & parse cookies
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const { session: email } = parse(cookieHeader);
  if (!email) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // 2. Find the user in memory
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) {
    return res.status(401).json({ message: 'Invalid session' });
  }

  // 3. Handle GET: return name & email
  if (req.method === 'GET') {
    const { name, email: userEmail } = users[idx];
    return res.status(200).json({ name, email: userEmail });
  }

  // 4. Handle PUT: update name & email
  if (req.method === 'PUT') {
    const { name: newName, email: newEmail } = req.body;
    if (!newName || !newEmail) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // Reject names longer than 50 characters
    if (newName.trim().length > 50) {
      return res.status(400).json({ message: 'Name must be at most 50 characters long' });
    }

    // Prevent changing to an email someone else already registered
    const normalizedNewEmail = newEmail.toLowerCase();
    const collision = users.findIndex((u, i) =>
      i !== idx && u.email.toLowerCase() === normalizedNewEmail
    );
    if (collision !== -1) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Update in-memory
    users[idx].name = newName;
    users[idx].email = normalizedNewEmail;
    saveUsers();

    // Rotate the session cookie to use the new email
    res.setHeader(
      'Set-Cookie',
      serialize('session', newEmail, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      })
    );

    return res.status(200).json({ message: 'Profile updated' });
  }

  // 5. Other methods not allowed
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}