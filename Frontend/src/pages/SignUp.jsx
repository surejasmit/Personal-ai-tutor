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
    <div className="page-shell min-h-screen text-slate-100">
      <Navbar />

      <main className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <section className="animate-fade-up hidden space-y-8 lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-100 shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-brand-300" />
            Free to start
          </div>

          <div>
            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-white">
              Build a sharper study routine with AI guidance.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Create your learning profile, take topic quizzes, and unlock recommendations that adapt as you improve.
            </p>
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              { icon: CheckCircle2, text: 'Adaptive quizzes' },
              { icon: BarChart3, text: 'Progress insights' },
              { icon: Sparkles, text: 'AI next steps' },
            ].map((item) => (
              <div key={item.text} className="premium-card rounded-3xl p-4">
                <item.icon size={22} className="mb-3 text-brand-300" />
                <p className="text-sm font-semibold text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-200">Join AI Tutor</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Create an account</h2>
              <p className="mt-2 text-sm text-slate-300">No credit card required. Start learning in minutes.</p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-5 rounded-2xl border border-brand-400/20 bg-brand-500/10 px-4 py-3 text-sm font-medium text-brand-100">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">Full name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    className="form-input py-3 pl-11 pr-4"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    className="form-input py-3 pl-11 pr-4"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">Password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    className="form-input py-3 pl-11 pr-4"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">Confirm password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    className="form-input py-3 pl-11 pr-4"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="btn-primary w-full px-4 py-3.5" type="submit">
                Create account
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-200 transition hover:text-white">
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
