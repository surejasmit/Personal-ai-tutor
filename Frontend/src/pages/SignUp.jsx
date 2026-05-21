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
      const res = await fetch('/api/register', {
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
      setError(err.message || 'Network error.');
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
              Free to start
            </span>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-text-primary">
              Join thousands of<br />
              <span className="text-accent">smart learners</span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              Create an account to unlock personalized quizzes, track your progress,
              and get AI-powered recommendations tailored just for you.
            </p>

            <div className="pt-4 space-y-4">
              {[
                { icon: '🎯', text: 'Adaptive learning paths' },
                { icon: '📊', text: 'Real-time progress tracking' },
                { icon: '⚡', text: 'Instant feedback on every quiz' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-text-secondary">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT - Form Section */}
          <section className="w-full max-w-md mx-auto lg:mx-0">
            <div className="rounded-2xl border border-border bg-bg-secondary/50 p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Create an account</h2>
              <p className="text-sm text-text-muted mb-6">
                Sign up to get started. No credit card required.
              </p>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
              {success && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-accent-light">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Full name</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <input
                    type="email"
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
                  <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Confirm password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="w-full py-3 px-4 bg-accent hover:bg-accent-light text-bg-primary
                             rounded-lg font-semibold transition-all duration-200
                             hover:shadow-lg hover:shadow-accent/20"
                  type="submit"
                >
                  Create account
                </button>
              </form>

              <p className="mt-6 text-sm text-center text-text-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-accent hover:text-accent-light font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
