import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('Please fill all required fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Attempt to POST to backend signup endpoint if available
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message || 'Sign up failed');
        return;
      }

      setSuccess('Account created. Redirecting...');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError('Network error.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
        <section className="hidden md:block">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-black">Welcome to Personal AI Tutor</h1>
            <p className="text-gray-600">Create an account to save progress, take quizzes, and receive personalized recommendations.</p>

            <div className="mt-8 bg-white p-6 rounded-lg shadow flex items-center justify-center">
              <svg width="140" height="140" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="6" fill="#60A5FA" />
                <path d="M12 12c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" fill="white" />
                <path d="M5 19c0-3.866 3.582-7 8-7s8 3.134 8 7v1H5v-1z" fill="white" />
              </svg>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow mx-2">
          <h2 className="text-2xl font-semibold mb-2 text-black">Create an account</h2>
          <p className="text-sm text-gray-500 mb-6">Sign up to get tailored learning paths and track your progress.</p>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
          {success && <div className="mb-4 text-sm text-green-600">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 p-2 text-black"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 p-2 text-black"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 p-2 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 p-2 text-black"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium" type="submit">
              Create account
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium">Sign in</Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
