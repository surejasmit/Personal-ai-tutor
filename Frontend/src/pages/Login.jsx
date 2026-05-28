import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, TrendingUp, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-bg min-h-screen">
      <Navbar />

      <main className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="animate-fade-up hidden space-y-8 lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-brand-100 backdrop-blur">
            <ShieldCheck size={16} className="text-brand-300" />
            Secure student workspace
          </div>

          <div>
            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-white">
              Continue your personalized learning path.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Access your dashboard, quizzes, AI recommendations, and progress insights from one polished workspace.
            </p>
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              { icon: LockKeyhole, text: 'Encrypted login' },
              { icon: TrendingUp, text: 'Saved progress' },
              { icon: Zap, text: 'Fast resume' },
            ].map((item) => (
              <div key={item.text} className="dark-card rounded-3xl p-4">
                <item.icon size={22} className="mb-3 text-brand-300" />
                <p className="text-sm font-semibold text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="glass-light rounded-[2rem] p-6 sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Welcome back</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Sign in</h2>
              <p className="mt-2 text-sm text-slate-500">Enter your credentials to continue learning.</p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    id="login-email"
                    className="form-input py-3 pl-11 pr-4"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-bold text-brand transition hover:text-brand-deep">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    id="login-password"
                    className="form-input py-3 pl-11 pr-4"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                className="btn-primary w-full px-4 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                id="login-submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-bold text-brand transition hover:text-brand-deep">
                Create one
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;

