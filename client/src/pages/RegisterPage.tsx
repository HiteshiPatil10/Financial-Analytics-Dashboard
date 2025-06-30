import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '@/lib/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('User registered! Please log in.');
      navigate('/login');
    } catch (err: any) {
  console.error(" Register Error:", err);
  alert(
    'Register failed: ' +
    (err?.response?.data?.message || err.message || 'Unknown error')
  );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <form
        onSubmit={handleSubmit}
        className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          required
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          required
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={handleChange}
          className="w-full p-2 border rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 rounded hover:bg-[hsl(var(--primary)/0.85)]"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[hsl(var(--primary))] underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
