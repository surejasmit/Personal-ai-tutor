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

      {/* Background glows */}
      <div className="fixed top-1/4 right-1/3 w-[400px] h-[300px] bg-purple/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/3 left-1/4 w-[350px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <main className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 relative z-10">
        {/* LEFT INFO (desktop) */}
        <section className="animate-fade-up hidden space-y-8 lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-semibold text-accent backdrop-blur">
            <Sparkles size={16} className="text-accent" />
            Free to start
          </div>

          <div>
            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-text-primary">
              Build a sharper study routine with{' '}
              <span className="bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">AI guidance.</span>
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
              <div key={item.text} className="glass-card p-4">
                <item.icon size={22} className="mb-3 text-accent" />
                <p className="text-sm font-semibold text-text-primary">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT FORM */}
        <section className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/60 backdrop-blur-xl p-6 sm:p-8">
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
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-5 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm font-medium text-accent-light">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Full name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    className="w-full rounded-xl bg-bg-card border border-white/[0.06] pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
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
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="email"
                    className="w-full rounded-xl bg-bg-card border border-white/[0.06] pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
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
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="password"
                    className="w-full rounded-xl bg-bg-card border border-white/[0.06] pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
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
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="password"
                    className="w-full rounded-xl bg-bg-card border border-white/[0.06] pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                className="w-full py-3 px-4 rounded-xl font-semibold btn-neon disabled:opacity-50 disabled:cursor-not-allowed"
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
