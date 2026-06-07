import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft, Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg-primary overflow-hidden">
      <Navbar />

      {/* Background glows */}
      <div className="fixed top-1/4 left-1/3 w-[500px] h-[400px] bg-purple/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-[400px] h-[300px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-16">

        {/* Floating decorative elements */}
        <div className="absolute top-32 left-[10%] w-4 h-4 border-2 border-accent/30 rounded-full animate-float" />
        <div className="absolute top-44 right-[15%] w-3 h-3 bg-purple/40 rounded-full" style={{ animation: 'float 5s ease-in-out 1s infinite' }} />
        <div className="absolute bottom-32 left-[20%] w-5 h-5 border-2 border-purple/20 rotate-45" style={{ animation: 'float-slow 8s ease-in-out infinite' }} />
        <div className="absolute top-56 left-[25%] w-2 h-2 bg-accent/30 rounded-full" style={{ animation: 'float 7s ease-in-out 0.5s infinite' }} />
        <div className="absolute bottom-44 right-[10%] w-3 h-3 border border-accent/20 rounded-full" style={{ animation: 'float-slow 6s ease-in-out 2s infinite' }} />

        {/* Decorative gear shapes */}
        <svg className="absolute top-36 right-[20%] opacity-[0.07]" style={{ animation: 'orbit 20s linear infinite' }} width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 8a12 12 0 110 24 12 12 0 010-24zm0 4a8 8 0 100 16 8 8 0 000-16z" fill="#7c5cfc"/>
        </svg>
        <svg className="absolute bottom-40 left-[12%] opacity-[0.06]" style={{ animation: 'orbit 25s linear reverse infinite' }} width="50" height="50" viewBox="0 0 40 40" fill="none">
          <path d="M20 8a12 12 0 110 24 12 12 0 010-24zm0 4a8 8 0 100 16 8 8 0 000-16z" fill="#00d97e"/>
        </svg>

        {/* Magnifying glass illustration */}
        <div className="relative mb-6" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <div className="w-28 h-28 rounded-full border-[6px] border-purple/30 flex items-center justify-center relative">
            <div className="w-20 h-20 rounded-full bg-purple/[0.08] border border-purple/10 flex items-center justify-center">
              <span className="text-3xl">👻</span>
            </div>
            {/* Magnifying glass handle */}
            <div className="absolute -bottom-5 -right-5 w-10 h-3 bg-purple/20 rounded-full rotate-45 border border-purple/10" />
          </div>
        </div>

        {/* Giant 404 */}
        <div className="relative select-none mb-4">
          <h1 className="text-[10rem] sm:text-[13rem] md:text-[16rem] font-black leading-none tracking-tighter bg-gradient-to-b from-purple via-purple-light to-purple-dark bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 40px rgba(124, 92, 252, 0.3))' }}>
            404
          </h1>

          {/* Decorative leaves / plant elements */}
          <svg className="absolute -left-6 bottom-4 opacity-60" width="48" height="80" viewBox="0 0 48 80" fill="none">
            <path d="M24 80V40M24 40C24 40 6 30 4 10C2 -10 24 0 24 0C24 0 46-10 44 10C42 30 24 40 24 40Z" stroke="#00d97e" strokeWidth="2" fill="rgba(0,217,126,0.08)"/>
          </svg>
          <svg className="absolute -right-6 bottom-4 opacity-60 scale-x-[-1]" width="48" height="80" viewBox="0 0 48 80" fill="none">
            <path d="M24 80V40M24 40C24 40 6 30 4 10C2 -10 24 0 24 0C24 0 46-10 44 10C42 30 24 40 24 40Z" stroke="#00d97e" strokeWidth="2" fill="rgba(0,217,126,0.08)"/>
          </svg>
          <svg className="absolute -left-12 bottom-14 opacity-40" width="36" height="60" viewBox="0 0 48 80" fill="none">
            <path d="M30 80V50M30 50C30 50 12 42 10 26C8 10 30 18 30 18C30 18 52 10 50 26C48 42 30 50 30 50Z" stroke="#34f0a1" strokeWidth="1.5" fill="rgba(52,240,161,0.05)"/>
          </svg>
          <svg className="absolute -right-12 bottom-14 opacity-40 scale-x-[-1]" width="36" height="60" viewBox="0 0 48 80" fill="none">
            <path d="M30 80V50M30 50C30 50 12 42 10 26C8 10 30 18 30 18C30 18 52 10 50 26C48 42 30 50 30 50Z" stroke="#34f0a1" strokeWidth="1.5" fill="rgba(52,240,161,0.05)"/>
          </svg>

          {/* Exclamation badge */}
          <div className="absolute -top-2 right-4 sm:right-12 flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center"
                 style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}>
              <span className="text-accent text-xl font-black">!</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center max-w-lg mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            Page not found
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Looks like you've wandered into uncharted territory.
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Search-like hint */}
        <div className="w-full max-w-md mb-8">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-bg-card/80 border border-white/[0.06] backdrop-blur-sm">
            <Search size={18} className="text-text-muted flex-shrink-0" />
            <span className="text-text-muted text-sm">
              The URL <code className="mx-1 px-2 py-0.5 rounded-md bg-white/[0.06] text-purple-light text-xs font-mono">{window.location.pathname}</code> was not found
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Link
            to="/"
            className="flex-1 py-3 px-6 rounded-xl font-semibold btn-neon text-center"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Home size={18} />
              Go Home
            </span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-3 px-6 rounded-xl font-semibold border border-white/[0.08] text-text-secondary
                       hover:bg-white/[0.04] hover:border-white/[0.14] transition-all text-center"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <ArrowLeft size={18} />
              Go Back
            </span>
          </button>
        </div>

        {/* Helpful links */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {[
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Topics', to: '/topics' },
            { label: 'AI Tutor', to: '/ai-tutor' },
            { label: 'Sign Up', to: '/signup' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotFound;
