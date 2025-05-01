// pages/index.js
import Link from 'next/link';
import styles from './register.module.css'; // reuse our container & button styles

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
      <p>
        <Link href="/login">
          <button className={styles.submitBtn}>Login</button>
        </Link>
      </p>
      <p>
        <Link href="/register">
          <button className={styles.submitBtn}>Register</button>
        </Link>
      </p>
    </div>
  );
}