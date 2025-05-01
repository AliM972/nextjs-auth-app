// pages/api/login.js

import bcrypt from 'bcryptjs';
import { users } from '../../data/users.js';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    console.log('🔑 Current users array at login:', users);

    // Find the user
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed passwords
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Set a session cookie (holding their email)
    res.setHeader('Set-Cookie', 
        serialize('session', email, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        })
    );

    return res.status(200).json({ message: 'Logged in' });
}
