import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Brain, BarChart3, Target, Sparkles, Star } from 'lucide-react';

// ─────────────────────────────────────────────
// SVG ROBOT HERO ILLUSTRATION
// ─────────────────────────────────────────────
const RobotIllustration = () => (
  <div className="relative w-full max-w-lg mx-auto">
    {/* Background glow */}
    <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px]" />
    <div className="absolute top-1/4 right-0 w-48 h-48 bg-purple/10 rounded-full blur-[80px]" />

    {/* Robot SVG */}
    <svg viewBox="0 0 400 400" className="w-full h-auto relative z-10 animate-float drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body glow */}
      <defs>
        <radialGradient id="bodyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d97e" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#00d97e" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a2744"/>
          <stop offset="100%" stopColor="#111827"/>
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f1520"/>
          <stop offset="100%" stopColor="#0a0e1a"/>
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d97e"/>
          <stop offset="100%" stopColor="#7c5cfc"/>
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="160" fill="url(#bodyGlow)"/>

      {/* Antenna */}
      <line x1="200" y1="75" x2="200" y2="95" stroke="#00d97e" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="200" cy="70" r="6" fill="#00d97e" opacity="0.9">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* Head */}
      <rect x="140" y="95" width="120" height="90" rx="20" fill="url(#bodyGrad)" stroke="#1e3a5f" strokeWidth="2"/>

      {/* Face screen */}
      <rect x="155" y="110" width="90" height="55" rx="12" fill="url(#screenGrad)" stroke="#00d97e" strokeWidth="1" opacity="0.8"/>

      {/* Eyes */}
      <circle cx="180" cy="135" r="8" fill="#00d97e" opacity="0.9">
        <animate attributeName="r" values="8;6;8" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="220" cy="135" r="8" fill="#7c5cfc" opacity="0.9">
        <animate attributeName="r" values="8;6;8" dur="3s" repeatCount="indefinite" begin="0.5s"/>
      </circle>

      {/* Smile */}
      <path d="M185 150 Q200 162 215 150" stroke="#00d97e" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* Neck */}
      <rect x="188" y="185" width="24" height="12" rx="4" fill="#1a2744" stroke="#1e3a5f" strokeWidth="1"/>

      {/* Body */}
      <rect x="130" y="197" width="140" height="100" rx="18" fill="url(#bodyGrad)" stroke="#1e3a5f" strokeWidth="2"/>

      {/* Chest screen */}
      <rect x="155" y="212" width="90" height="50" rx="10" fill="url(#screenGrad)" stroke="url(#accentGrad)" strokeWidth="1" opacity="0.7"/>

      {/* Chest bars - like a chart */}
      <rect x="168" y="242" width="10" height="14" rx="2" fill="#00d97e" opacity="0.7"/>
      <rect x="183" y="236" width="10" height="20" rx="2" fill="#00d97e" opacity="0.85"/>
      <rect x="198" y="230" width="10" height="26" rx="2" fill="#7c5cfc" opacity="0.8"/>
      <rect x="213" y="224" width="10" height="32" rx="2" fill="#00d97e"/>
      <rect x="228" y="228" width="10" height="28" rx="2" fill="#7c5cfc" opacity="0.8"/>

      {/* Arms */}
      <rect x="95" y="210" width="35" height="16" rx="8" fill="url(#bodyGrad)" stroke="#1e3a5f" strokeWidth="1.5"/>
      <rect x="270" y="210" width="35" height="16" rx="8" fill="url(#bodyGrad)" stroke="#1e3a5f" strokeWidth="1.5"/>
      {/* Hands */}
      <circle cx="88" cy="218" r="10" fill="#1a2744" stroke="#00d97e" strokeWidth="1.5"/>
      <circle cx="312" cy="218" r="10" fill="#1a2744" stroke="#7c5cfc" strokeWidth="1.5"/>

      {/* Legs */}
      <rect x="160" y="297" width="20" height="30" rx="6" fill="url(#bodyGrad)" stroke="#1e3a5f" strokeWidth="1.5"/>
      <rect x="220" y="297" width="20" height="30" rx="6" fill="url(#bodyGrad)" stroke="#1e3a5f" strokeWidth="1.5"/>
      {/* Feet */}
      <rect x="152" y="322" width="36" height="14" rx="7" fill="#1a2744" stroke="#1e3a5f" strokeWidth="1.5"/>
      <rect x="212" y="322" width="36" height="14" rx="7" fill="#1a2744" stroke="#1e3a5f" strokeWidth="1.5"/>
    </svg>

    {/* Floating labels */}
    <div className="absolute top-8 right-0 glass-card px-3 py-2 animate-float" style={{ animationDelay: '0.5s' }}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple" />
        <span className="text-xs font-medium text-purple-light">Real-time Insights</span>
      </div>
    </div>

    <div className="absolute top-1/3 -left-4 glass-card px-3 py-2 animate-float" style={{ animationDelay: '1s' }}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-xs font-medium text-accent-light">Personalized Quizzes</span>
      </div>
    </div>

    <div className="absolute bottom-20 right-4 glass-card px-3 py-2 animate-float" style={{ animationDelay: '1.5s' }}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-info" />
        <span className="text-xs font-medium text-blue-300">Adaptive Learning Path</span>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 bg-grid">
    {/* Subtle background glows */}
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] rounded-full bg-accent/[0.03] blur-[150px] pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] rounded-full bg-purple/[0.04] blur-[120px] pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — Copy */}
        <div className="space-y-6 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                           border border-accent/20 bg-accent/5
                           text-accent text-xs font-medium tracking-wide">
            <Sparkles size={12} className="text-accent" />
            Now in Beta
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-text-primary">
            Learn smarter,<br />
            <span className="bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">not harder.</span>
          </h1>

          <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
            An adaptive learning platform that understands how you learn.
            Personalized quizzes, real-time insights, and a path built just for you.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/signup">
              <button className="px-7 py-3 text-sm font-semibold text-bg-primary rounded-xl btn-neon inline-flex items-center gap-2">
                Start Learning — Free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </Link>
            <a href="#about">
              <button className="px-7 py-3 text-sm font-medium text-text-secondary rounded-xl
                                 border border-border transition-all duration-200
                                 hover:text-text-primary hover:border-accent/20 hover:bg-accent/5
                                 inline-flex items-center gap-2">
                See How It Works
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7 4v4m0 0l2-2m-2 2L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 7 7)"/></svg>
              </button>
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {['from-accent to-accent-dark', 'from-purple to-purple-dark', 'from-blue-500 to-blue-600', 'from-amber-400 to-amber-500'].map((gradient, i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-bg-primary
                            flex items-center justify-center text-white text-[10px] font-bold`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted">
              <span className="text-text-primary font-semibold">5,000+</span> students enrolled
            </p>
            <div className="flex gap-0.5 ml-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Robot Illustration */}
        <div className="hidden lg:block opacity-0 animate-fade-up-delay">
          <RobotIllustration />
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// FEATURE STRIP
// ─────────────────────────────────────────────
const featureStrip = [
  { icon: Brain, title: 'Smart Learning', desc: 'AI adapts to your strengths & weaknesses' },
  { icon: BarChart3, title: 'Real-time Feedback', desc: 'Instant feedback to help you improve faster' },
  { icon: Target, title: 'Track Progress', desc: 'Detailed analytics to track your growth' },
  { icon: Sparkles, title: 'Achieve Goals', desc: 'Stay motivated and reach your targets' },
];

const FeatureStripSection = () => (
  <section className="py-14 border-y border-white/[0.04] bg-bg-secondary/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {featureStrip.map((f) => (
          <div key={f.title} className="flex items-start gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
              <f.icon size={18} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">{f.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// STATS BAR
// ─────────────────────────────────────────────
const StatsSection = () => (
  <section className="py-16 border-b border-white/[0.04]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { value: '5,000+', label: 'Active Students' },
          { value: '1,200+', label: 'Quizzes Taken' },
          { value: '94.2%', label: 'Avg Accuracy' },
          { value: '24/7',  label: 'Available' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">{stat.value}</p>
            <p className="text-sm text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────
const features = [
  {
    icon: Brain,
    title: 'Adaptive Quizzes',
    desc: 'Questions that adjust in real-time to match your skill level. No more too-easy or too-hard.',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    desc: 'Clean dashboards showing what you know, what you don\'t, and exactly where to focus next.',
  },
  {
    icon: Target,
    title: 'Smart Recommendations',
    desc: 'A personalized learning path that adapts as you grow. Every session moves you forward.',
  },
  {
    icon: Sparkles,
    title: 'Instant Feedback',
    desc: 'Know what went wrong the moment you answer. Detailed explanations, not just scores.',
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="max-w-2xl mb-16">
        <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-3">Features</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
          Built for how people actually learn
        </h2>
        <p className="text-text-secondary text-lg mt-4">
          No gimmicks. Just tools that work — backed by learning science and built for real students.
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group neon-card p-6 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/15 group-hover:border-accent/20 transition-all">
              <f.icon size={20} className="text-accent" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">{f.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────
const steps = [
  { num: '01', title: 'Create your account',  desc: 'Sign up in 30 seconds. No credit card required.' },
  { num: '02', title: 'Take a diagnostic quiz', desc: 'We figure out where you stand — no guesswork.' },
  { num: '03', title: 'Get your learning path', desc: 'A personalized roadmap based on your strengths and gaps.' },
  { num: '04', title: 'Practice and grow',      desc: 'Daily quizzes adapt to push you just enough.' },
];

const HowItWorksSection = () => (
  <section id="about" className="py-20 lg:py-28 bg-dot">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-3">How It Works</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
          From signup to results in 4 steps
        </h2>
      </div>

      {/* Steps */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div key={s.num} className="relative">
            <div className="neon-card p-6 transition-all duration-300 hover:border-accent/20">
              <span className="text-accent text-xs font-bold tracking-widest">{s.num}</span>
              <h3 className="text-base font-bold text-text-primary mt-3 mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────
const CTASection = () => (
  <section className="py-20 lg:py-28">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="rounded-2xl border border-accent/10 bg-gradient-to-br from-bg-secondary/80 to-bg-card/80 p-10 sm:p-16 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

        <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-4 relative">Free to start</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4 relative">
          Ready to learn smarter?
        </h2>
        <p className="text-text-secondary text-lg max-w-md mx-auto mb-8 relative">
          Join thousands of students who stopped guessing and started growing.
          No credit card. No commitment.
        </p>
        <Link to="/signup">
          <button className="px-8 py-3.5 text-sm font-semibold rounded-xl btn-neon relative">
            Create Free Account →
          </button>
        </Link>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
const Footer = () => (
  <footer id="contact" className="border-t border-white/[0.04]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-md shadow-accent/20">
              <span className="text-bg-primary text-xs font-bold">AT</span>
            </div>
            <span className="text-base font-bold text-text-primary">AI Tutor</span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            Making quality education accessible through adaptive technology.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Product</h4>
          <ul className="space-y-2.5">
            {['Features', 'Pricing', 'Changelog', 'Roadmap'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Resources</h4>
          <ul className="space-y-2.5">
            {['Documentation', 'Blog', 'Community', 'Support'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Stay Updated</h4>
          <p className="text-sm text-text-muted mb-3">Get product updates. No spam.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 min-w-0 px-3.5 py-2 text-sm rounded-lg
                         bg-bg-card border border-border text-text-primary
                         placeholder:text-text-muted
                         focus:outline-none focus:border-accent/30 transition-colors"
            />
            <button className="px-4 py-2 rounded-lg btn-neon text-sm font-medium">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">© 2026 AI Tutor. All rights reserved.</p>
        <div className="flex gap-5">
          {['Privacy', 'Terms', 'Cookies'].map((link) => (
            <a key={link} href="#" className="text-xs text-text-muted hover:text-accent transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
// LANDING PAGE (combines all sections)
// ─────────────────────────────────────────────
const Landing = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureStripSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
