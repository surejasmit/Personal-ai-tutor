import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import Navbar from '../components/Navbar';

const stats = [
  { value: '5,000+', label: 'Active students' },
  { value: '1,200+', label: 'Quizzes taken' },
  { value: '94%', label: 'Avg accuracy' },
  { value: '24/7', label: 'AI support' },
];

const features = [
  {
    icon: Target,
    title: 'Adaptive Quizzes',
    desc: 'Practice sets help reveal what you know and where to focus next.',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    desc: 'A clean dashboard turns quiz history into readable learning signals.',
  },
  {
    icon: Bot,
    title: 'AI Tutor Guidance',
    desc: 'Personal recommendations help you choose the next best topic.',
  },
  {
    icon: Zap,
    title: 'Instant Momentum',
    desc: 'Fast flows and focused feedback keep each study session moving.',
  },
];

const steps = [
  { num: '01', title: 'Create your account', desc: 'Start with a secure student profile.' },
  { num: '02', title: 'Choose a topic', desc: 'Pick a subject and begin a focused quiz.' },
  { num: '03', title: 'Review progress', desc: 'Track scores, streaks, and completed topics.' },
  { num: '04', title: 'Follow AI guidance', desc: 'Use recommendations to plan your next session.' },
];

const dashboardStats = [
  { label: 'Topics', value: '18' },
  { label: 'Streak', value: '21d' },
  { label: 'Quizzes', value: '84' },
];

const Landing = () => {
  return (
    <div className="app-bg min-h-screen text-slate-100">
      <Navbar />

      <main>
        <section id="home" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="animate-fade-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-100 shadow-sm backdrop-blur">
                <Sparkles size={16} className="text-brand-300" />
                AI-powered learning platform
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                Learn smarter with a tutor that adapts to you.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A polished ed-tech workspace for personalized quizzes, progress insights, and AI recommendations built around your study rhythm.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/signup" className="btn-primary px-6 py-3.5 text-sm">
                  Start Learning Free
                  <ArrowRight size={18} />
                </Link>
                <a href="#features" className="btn-secondary px-6 py-3.5 text-sm">
                  Explore Features
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="premium-card rounded-3xl p-4">
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up">
              <div className="premium-card overflow-hidden rounded-[2rem] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="brand-gradient flex h-11 w-11 items-center justify-center rounded-2xl shadow-lift">
                      <GraduationCap size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="font-black text-white">Learning Dashboard</p>
                      <p className="text-xs text-slate-300">Personalized overview</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-brand-300" />
                </div>

                <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="dark-card rounded-[1.75rem] p-5">
                    <p className="text-sm font-bold text-brand-100">Average score</p>
                    <p className="mt-2 text-4xl font-black text-white">94%</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Clear feedback, fast review, and a simple next step after every quiz.
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {dashboardStats.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                          <p className="text-lg font-black text-white">{item.value}</p>
                          <p className="text-xs font-semibold text-slate-300">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                    <div className="flex h-full min-h-[340px] flex-col justify-between rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.22),rgba(37,99,235,0.18),rgba(34,211,238,0.12))] p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-brand-200">AI Tutor Signal</p>
                          <p className="mt-1 text-2xl font-black text-white">Ready for the next lesson</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg">
                          <Bot size={24} />
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {[
                          ['Recommended Topic', 'Data Structures'],
                          ['Confidence', 'High'],
                          ['Next Action', 'Start quiz now'],
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                            <span className="text-sm font-semibold text-slate-300">{label}</span>
                            <span className="text-sm font-black text-white">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/8 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-300">Learning momentum</span>
                          <span className="text-sm font-black text-brand-200">+12%</span>
                        </div>
                        <div className="flex h-24 items-end gap-2">
                          {[45, 58, 42, 72, 66, 88, 74, 94].map((h, i) => (
                            <div key={i} className="flex-1 rounded-t-xl bg-gradient-to-t from-brand to-brand-300" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-200">Features</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Built for modern learners</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Clean workflows inspired by the best education and productivity platforms.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="premium-card rounded-[1.7rem] p-6 transition hover:-translate-y-1 hover:shadow-lift">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-dark">
                    <feature.icon size={23} />
                  </div>
                  <h3 className="text-lg font-black text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-200">How it works</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                From signup to sharper study
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.num} className="dark-card rounded-[1.7rem] p-6">
                  <span className="text-sm font-black text-brand-300">{step.num}</span>
                  <h3 className="mt-4 text-lg font-black text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 text-center shadow-lift sm:p-12">
            <Trophy className="mx-auto mb-5 text-brand" size={34} />
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Ready to learn with more clarity?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500">
              Join the platform, take your first quiz, and let your AI tutor guide the next step.
            </p>
            <Link to="/signup" className="btn-primary mt-8 px-7 py-3.5 text-sm">
              Create Free Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-white/10 px-4 py-10 text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl">
              <GraduationCap size={19} className="text-white" />
            </div>
            <span className="font-black text-white">AI Tutor</span>
          </div>
          <p className="text-sm">© 2026 AI Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
