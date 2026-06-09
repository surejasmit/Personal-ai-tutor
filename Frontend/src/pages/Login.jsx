import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

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
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell min-h-screen text-slate-100">
      <Navbar />

      {/* Background glows */}
      <div className="fixed top-1/3 left-1/4 w-[400px] h-[300px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[350px] h-[250px] bg-purple/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <main className="max-w-6xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT - Info Section */}
          <section className="hidden lg:block space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                             border border-accent/20 bg-accent/5
                             text-accent text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Welcome back
            </span>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-text-primary">
              Pick up where<br />
              <span className="bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">you left off</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-text-secondary">
              Access your dashboard, quizzes, AI recommendations, and progress insights from one polished workspace.
            </p>
          </section>

          {/* RIGHT - Login Form */}
          <section className="w-full max-w-md mx-auto lg:mx-0">
            <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/60 backdrop-blur-xl p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Sign in</h2>
              <p className="text-sm text-text-muted mb-6">
                Enter your credentials to continue learning.
              </p>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                      type="email"
                      id="login-email"
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-bg-card border border-white/[0.06]
                                 text-text-primary placeholder:text-text-muted
                                 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-text-secondary">Password</label>
                    <Link to="/forgot-password" className="text-xs text-accent hover:text-accent-light transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                      type="password"
                      id="login-password"
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-bg-card border border-white/[0.06]
                                 text-text-primary placeholder:text-text-muted
                                 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  className="w-full py-3 px-4 rounded-xl font-semibold btn-neon
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  id="login-submit"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-text-muted">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-accent hover:text-accent-light transition-colors">
                  Create one
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
