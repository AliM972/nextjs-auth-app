// pages/profile.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './register.module.css'; // reuse

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch profile on mount
  useEffect(() => {
    fetch('/api/profile')
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch(() => {
        // If not logged in, redirect to login
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  // 2. Handle updates
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      alert('Profile updated!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className={styles.container}>
      <h1>Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
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
        <button type="submit" className={styles.submitBtn}>
          Update Profile
        </button>
      </form>
    </div>
  );
}