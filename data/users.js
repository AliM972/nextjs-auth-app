// data/users.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

// Load (or initialize) users array
let users;
try {
  const raw = fs.readFileSync(filePath, 'utf8');
  users = JSON.parse(raw);
} catch (err) {
  users = [];
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Helper to save back to disk
export function saveUsers() {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export { users };