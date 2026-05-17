import Navbar from '../components/Navbar';

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 bg-grid">
    {/* Subtle background glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — Copy */}
        <div className="space-y-6 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full
                           border border-accent/20 bg-accent/5
                           text-accent-light text-xs font-medium tracking-wide uppercase">
            <span className="1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Now in Beta
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-text-primary">
            Learn smarter,<br />
            <span className="text-accent">not harder.</span>
          </h1>

          <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
            An adaptive learning platform that understands how you learn.
            Personalized quizzes, real-time insights, and a path built just for you.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="px-7 py-3 text-sm font-semibold text-bg-primary rounded-lg
                               bg-accent transition-all duration-200
                               hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20">
              Start Learning — Free
            </button>
            <button className="px-7 py-3 text-sm font-medium text-text-secondary rounded-lg
                               border border-border transition-all duration-200
                               hover:text-text-primary hover:border-border-hover">
              See How It Works ↓
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {['bg-emerald-600','bg-teal-500','bg-cyan-600','bg-green-500'].map((bg, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-bg-primary
                            flex items-center justify-center text-white text-xs font-semibold`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted">
              <span className="text-text-primary font-medium">5,000+</span> students enrolled
            </p>
          </div>
        </div>

        {/* RIGHT — Dashboard Preview */}
        <div className="hidden lg:block opacity-0 animate-fade-up-delay">
          <div className="rounded-2xl border border-border bg-bg-secondary p-5">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-3 text-xs text-text-muted">Dashboard — Progress Overview</span>
            </div>

            {/* Chart */}
            <div className="rounded-xl bg-bg-primary/80 p-4 mb-4">
              <div className="flex items-end gap-1.5 h-28">
                {[35,50,40,70,55,85,60,90,65,80,75,95].map((h, i) => (
                  <div key={i}
                    className="flex-1 rounded-t bg-accent/70 hover:bg-accent transition-colors duration-200"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-text-muted">
                <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
              </div>
            </div>

            {/* Mini stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Accuracy', value: '94.2%' },
                { label: 'Completed', value: '847' },
                { label: 'Streak', value: '21d' },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-bg-primary/80 p-3 text-center">
                  <p className="text-base font-bold text-accent">{s.value}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// STATS BAR
// ─────────────────────────────────────────────
const StatsSection = () => (
  <section className="py-16 border-y border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { value: '5,000+', label: 'Active Students' },
          { value: '1,200+', label: 'Quizzes Taken' },
          { value: '94.2%', label: 'Avg Accuracy' },
          { value: '24/7',  label: 'Available' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl lg:text-4xl font-extrabold text-text-primary">{stat.value}</p>
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
    icon: '🎯',
    title: 'Adaptive Quizzes',
    desc: 'Questions that adjust in real-time to match your skill level. No more too-easy or too-hard.',
  },
  {
    icon: '📊',
    title: 'Progress Analytics',
    desc: 'Clean dashboards showing what you know, what you don\'t, and exactly where to focus next.',
  },
  {
    icon: '🧭',
    title: 'Smart Recommendations',
    desc: 'A personalized learning path that adapts as you grow. Every session moves you forward.',
  },
  {
    icon: '⚡',
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
            className="group rounded-xl border border-border bg-bg-secondary/50 p-6
                       transition-all duration-300
                       hover:border-accent/20 hover:bg-bg-secondary"
          >
            <span className="text-2xl mb-4 block">{f.icon}</span>
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
            <div className="rounded-xl border border-border bg-bg-secondary/40 p-6
                            transition-all duration-300 hover:border-accent/20">
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
      <div className="rounded-2xl border border-border bg-bg-secondary/50 p-10 sm:p-16">
        <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-4">Free to start</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
          Ready to learn smarter?
        </h2>
        <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
          Join thousands of students who stopped guessing and started growing.
          No credit card. No commitment.
        </p>
        <button className="px-8 py-3.5 text-sm font-semibold text-bg-primary rounded-lg
                           bg-accent transition-all duration-200
                           hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20">
          Create Free Account →
        </button>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
const Footer = () => (
  <footer id="contact" className="border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
              <span className="text-white text-xs font-bold">AT</span>
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
                <a href="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">{link}</a>
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
                <a href="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">{link}</a>
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
                         bg-bg-primary border border-border text-text-primary
                         placeholder:text-text-muted
                         focus:outline-none focus:border-accent/40 transition-colors"
            />
            <button className="px-4 py-2 rounded-lg bg-accent text-bg-primary text-sm font-medium
                               hover:bg-accent-light transition-colors">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">© 2026 AI Tutor. All rights reserved.</p>
        <div className="flex gap-5">
          {['Privacy', 'Terms', 'Cookies'].map((link) => (
            <a key={link} href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
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
