# Next.js Authentication App

A simple full-stack example built with Next.js demonstrating:

- **User Registration** with bcrypt-hashed passwords (`/register`)  
- **Login** with secure, HTTP-only session cookies (`/login`)  
- **Protected Profile** view and update (`/profile`)  
- **Logout** endpoint to clear the session (`/api/logout`)  
- **In-memory data store** (for demo purposes)

## Features

- **Register** (`/register`):  
  Collects name, email, and password → hashes with `bcryptjs` → stores in memory.  
- **Login** (`/login`):  
  Verifies credentials → issues a secure `session` cookie.  
- **View Profile** (`/profile`):  
  Protected route that reads the `session` cookie → displays name & email.  
- **Update Profile** (`/profile`):  
  Allows editing name/email → rotates session cookie to new email.  
- **Logout**:  
  Clears the `session` cookie and redirects to login.

## Tech Stack

- **Framework**: Next.js (Pages Router)  
- **Frontend**: React hooks (`useState`, `useEffect`)  
- **Styling**: Global utility classes in `styles/globals.css`  
- **Auth**: `bcryptjs` for hashing, `cookie` for serialization  
- **Data Storage**: In-memory array (`data/users.js`)

## Getting Started

### Prerequisites

- Node.js ≥ 14  
- npm (or yarn, pnpm)

### Installation

```bash
git clone <YOUR_REPO_URL>
cd nextjs-auth-app
npm install

### Run Locally

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

## Project Structure

```text
nextjs-auth-app/
├── data/
│   └── users.js                # In-memory user array (resets on restart)
├── pages/
│   ├── api/
│   │   ├── register.js         # POST /api/register
│   │   ├── login.js            # POST /api/login
│   │   ├── profile.js          # GET & PUT /api/profile
│   │   └── logout.js           # POST /api/logout
│   ├── index.js                # Landing page (Login / Register)
│   ├── register.js             # Registration form
│   ├── login.js                # Login form
│   └── profile.js              # Protected profile page
├── styles/
│   └── globals.css             # Utility classes for layout & forms
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

| Method | Path             | Description                             |
| ------ | ---------------- | --------------------------------------- |
| POST   | `/api/register`  | Register a new user (name, email, pass) |
| POST   | `/api/login`     | Authenticate and set `session` cookie   |
| GET    | `/api/profile`   | Fetch current user’s profile            |
| PUT    | `/api/profile`   | Update name/email & rotate the cookie   |
| POST   | `/api/logout`    | Clear the session cookie                |

## Authentication Flow

1. **Register** → store hashed password  
2. **Login** → verify + set `session` cookie  
3. Every protected request (`/api/profile`) reads and validates that cookie  
4. **Logout** clears the cookie  