import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, LockKeyhole, Mail, ShieldQuestion } from 'lucide-react';

const SECURITY_QUESTIONS = [
  'What is your favorite color?',
  'What was the name of your first pet?',
  'What city were you born in?',
  "What is your mother's maiden name?",
  'What was your childhood nickname?',
  'What is the name of your favorite teacher?',
];

const ForgotPassword = () => {
  const navigate = useNavigate();

  // step: 1 = enter email, 2 = answer security question, 3 = set new password, 4 = success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Step 1 — Look up the user's security question by email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter your email.'); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password/question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'No account found with that email.');
        return;
      }

      setSecurityQuestion(data.securityQuestion);
      setStep(2);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify the security answer
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!securityAnswer.trim()) { setError('Please enter your answer.'); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, securityAnswer }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Incorrect answer. Please try again.');
        return;
      }

      setStep(3);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3 — Reset the password
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, securityAnswer, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Password reset failed.');
        return;
      }

      setStep(4);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ─── Step indicator ─── */
  const stepLabels = ['Email', 'Verify', 'Reset'];
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-1 mb-8">
      {stepLabels.map((label, i) => {
        const idx = i + 1;
        const isActive = step >= idx;
        const isCurrent = step === idx;
        return (
          <div key={label} className="flex items-center gap-1">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300
              ${isCurrent ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_12px_rgba(0,200,150,0.15)]' :
                isActive ? 'bg-accent/10 text-accent/60' : 'bg-white/[0.04] text-text-muted'}`}>
              {isActive && idx < step ? <CheckCircle2 size={12} /> : <span className="w-4 text-center">{idx}</span>}
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < stepLabels.length - 1 && (
              <div className={`w-6 h-px transition-colors duration-300 ${step > idx ? 'bg-accent/40' : 'bg-white/[0.08]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      {/* Background glows */}
      <div className="fixed top-1/3 left-1/4 w-[400px] h-[300px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[350px] h-[250px] bg-purple/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <main className="max-w-lg mx-auto pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/60 backdrop-blur-xl p-6 sm:p-8">

          {/* Header */}
          <div className="mb-2 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/20">
              <KeyRound size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                {step === 4 ? 'All done!' : 'Reset password'}
              </h2>
              <p className="text-xs text-text-muted">
                {step === 1 && 'Enter the email you signed up with.'}
                {step === 2 && 'Answer your security question.'}
                {step === 3 && 'Choose a new password.'}
                {step === 4 && 'Your password has been updated.'}
              </p>
            </div>
          </div>

          {step < 4 && <StepIndicator />}

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
              {error}
            </div>
          )}

          {/* ─── STEP 1 — Email ─── */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="email"
                    id="forgot-email"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg-card border border-white/[0.06]
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                className="w-full py-3 px-4 rounded-xl font-semibold btn-neon disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {loading ? 'Looking up…' : 'Continue'}
                  {!loading && <ArrowRight size={18} />}
                </span>
              </button>
            </form>
          )}

          {/* ─── STEP 2 — Security question ─── */}
          {step === 2 && (
            <form onSubmit={handleAnswerSubmit} className="space-y-4">
              <div className="rounded-xl bg-accent/[0.06] border border-accent/10 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent/60 mb-1">Your security question</p>
                <p className="text-sm font-medium text-text-primary">{securityQuestion}</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Your answer</label>
                <div className="relative">
                  <ShieldQuestion className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="text"
                    id="forgot-answer"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg-card border border-white/[0.06]
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                    placeholder="Enter your answer"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(''); setSecurityAnswer(''); }}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold border border-white/[0.08] text-text-secondary
                             hover:bg-white/[0.04] transition-colors"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <ArrowLeft size={16} /> Back
                  </span>
                </button>
                <button
                  className="flex-[2] py-3 px-4 rounded-xl font-semibold btn-neon disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {loading ? 'Verifying…' : 'Verify'}
                    {!loading && <ArrowRight size={18} />}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* ─── STEP 3 — New password ─── */}
          {step === 3 && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">New password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="password"
                    id="forgot-new-password"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg-card border border-white/[0.06]
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Confirm new password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="password"
                    id="forgot-confirm-password"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg-card border border-white/[0.06]
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                className="w-full py-3 px-4 rounded-xl font-semibold btn-neon disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {loading ? 'Resetting…' : 'Reset password'}
                  {!loading && <ArrowRight size={18} />}
                </span>
              </button>
            </form>
          )}

          {/* ─── STEP 4 — Success ─── */}
          {step === 4 && (
            <div className="text-center space-y-5 py-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-accent" />
              </div>
              <div>
                <p className="text-lg font-semibold text-text-primary">Password updated!</p>
                <p className="text-sm text-text-muted mt-1">You can now sign in with your new password.</p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 px-4 rounded-xl font-semibold btn-neon"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  Go to Sign in <ArrowRight size={18} />
                </span>
              </button>
            </div>
          )}

          {/* Footer link */}
          {step < 4 && (
            <p className="mt-6 text-sm text-center text-text-muted">
              Remember your password?{' '}
              <Link to="/login" className="text-accent hover:text-accent-light font-medium transition-colors">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
