// pages/api/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  // Clear the session cookie
  res.setHeader(
    'Set-Cookie',
    serialize('session', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,           // Expire immediately
    })
  );
  return res.status(200).json({ message: 'Logged out' });
}