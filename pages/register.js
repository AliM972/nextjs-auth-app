import { useState } from 'react';
import styles from './register.module.css'; 

export default function Register() {
    // 1. State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 2. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();      // stop full page reload

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        console.log('Server response:', data);

        if (!res.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Success! You could clear the form or show a message here:
        alert('Registered successfully! You can now log in.');
        } catch (err) {
        console.error('Registration error:', err);
        alert('Error: ' + err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                </div>
        
                <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                </div>
        
                <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                </div>
        
                <button type="submit" className={styles.submitBtn}>
                Register
                </button>
            </form>
        </div>
    );
}