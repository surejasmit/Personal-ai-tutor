import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
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

      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT - Info Section */}
          <section className="hidden lg:block space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full
                             border border-accent/20 bg-accent/5
                             text-accent-light text-xs font-medium tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Welcome back
            </span>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-text-primary">
              Pick up where<br />
              <span className="text-accent">you left off</span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              Sign in to access your personalized dashboard, continue your learning
              path, and track your progress in real time.
            </p>

            <div className="pt-4 space-y-4">
              {[
                { icon: '🔒', text: 'Secure & encrypted login' },
                { icon: '📈', text: 'Your progress saved automatically' },
                { icon: '🚀', text: 'Jump back into learning instantly' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-text-secondary">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT - Login Form */}
          <section className="w-full max-w-md mx-auto lg:mx-0">
            <div className="rounded-2xl border border-border bg-bg-secondary/50 p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Sign in</h2>
              <p className="text-sm text-text-muted mb-6">
                Enter your credentials to continue learning.
              </p>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <input
                    type="email"
                    id="login-email"
                    className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-text-secondary">Password</label>
                    <a href="#" className="text-xs text-accent hover:text-accent-light transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="login-password"
                    className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="w-full py-3 px-4 bg-accent hover:bg-accent-light text-bg-primary
                             rounded-lg font-semibold transition-all duration-200
                             hover:shadow-lg hover:shadow-accent/20
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  id="login-submit"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <p className="mt-6 text-sm text-center text-text-muted">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-accent hover:text-accent-light font-medium transition-colors">
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
