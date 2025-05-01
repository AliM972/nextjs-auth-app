// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <div className="buttonGroup">
        <Link href="/login" legacyBehavior>
          <a className="btn">Login</a>
        </Link>
        <Link href="/register" legacyBehavior>
          <a className="btn">Register</a>
        </Link>
      </div>
    </div>
  );
}