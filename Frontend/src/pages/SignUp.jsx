import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, BarChart3, CheckCircle2, LockKeyhole, Mail, Sparkles, User } from 'lucide-react';

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
      const res = await fetch('/api/auth/register', {
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

      <main className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        {/* LEFT INFO (desktop) */}
        <section className="animate-fade-up hidden space-y-8 lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-semibold text-accent-light backdrop-blur">
            <Sparkles size={16} className="text-accent" />
            Free to start
          </div>

          <div>
            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-text-primary">
              Build a sharper study routine with AI guidance.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-text-secondary">
              Create your learning profile, take topic quizzes, and unlock recommendations that adapt as you improve.
            </p>
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              { icon: CheckCircle2, text: 'Adaptive quizzes' },
              { icon: BarChart3, text: 'Progress insights' },
              { icon: Sparkles, text: 'AI next steps' },
            ].map((item) => (
              <div key={item.text} className="glass rounded-3xl p-4">
                <item.icon size={22} className="mb-3 text-accent" />
                <p className="text-sm font-semibold text-text-primary">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT FORM */}
        <section className="mx-auto w-full max-w-md">
          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
                Join AI Tutor
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-text-primary">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                No credit card required. Start learning in minutes.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-5 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm font-medium text-accent-light">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Full name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    className="w-full rounded-xl bg-bg-primary/60 border border-border px-11 py-3 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="email"
                    className="w-full rounded-xl bg-bg-primary/60 border border-border px-11 py-3 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="password"
                    className="w-full rounded-xl bg-bg-primary/60 border border-border px-11 py-3 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Confirm password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="password"
                    className="w-full rounded-xl bg-bg-primary/60 border border-border px-11 py-3 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                className="w-full py-3 px-4 bg-accent hover:bg-accent-light text-bg-primary rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  Create account
                  <ArrowRight size={18} />
                </span>
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-accent hover:text-accent-light transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUp;

