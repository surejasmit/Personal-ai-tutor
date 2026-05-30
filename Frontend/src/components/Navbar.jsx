import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ['Home', 'Features', 'About', 'Contact'];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl shadow-lift">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
              AI Tutor
            </span>
          </Link>

          <div className="hidden items-center rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white hover:shadow-sm"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Login
            </Link>
            <Link to="/signup" className="btn-primary px-4 py-2 text-sm">
              Sign Up
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-xl border border-white/10 p-2 text-white transition hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/96 px-4 pb-5 pt-3 backdrop-blur-2xl md:hidden">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link to="/login" className="btn-secondary px-4 py-3 text-center text-sm">
              Login
            </Link>
            <Link to="/signup" className="btn-primary px-4 py-3 text-sm">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
