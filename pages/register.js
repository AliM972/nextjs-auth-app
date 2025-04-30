import { useState } from 'react';
import styles from './register.module.css'; 

export default function Register() {
    // 1. State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 2. Handle form submission
    const handleSubmit = e => {
        e.preventDefault();            // prevent page reload
        console.log({ name, email, password });
        // └ for now, just log the values
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