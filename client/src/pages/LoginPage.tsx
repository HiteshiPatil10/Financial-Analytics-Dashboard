import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '@/lib/api';
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(' Submitting login form...', { email, password });

    try {
      const res = await API.post('/auth/login', { email, password });
      console.log(' Login success:', res.data);

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/'); // assuming '/' is your dashboard
    } catch (err: any) {
      console.error(' Login error:', err);
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-[hsl(var(--primary))] text-white py-2 rounded hover:bg-[hsl(var(--primary)/0.8)]"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
