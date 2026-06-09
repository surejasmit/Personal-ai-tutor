import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ['Home', 'Features', 'Courses', 'Pricing', 'About'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/20">
              <span className="text-bg-primary text-sm font-bold">AT</span>
            </div>
            <span className="text-lg font-bold text-text-primary">
              AI Tutor
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium text-text-secondary
                           rounded-lg transition-all duration-200
                           hover:text-text-primary hover:bg-white/5"
              >
                {item}
              </a>
            ))}
          </div>

          {/* DESKTOP AUTH BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="px-5 py-2 text-sm font-medium text-text-secondary
                               rounded-lg border border-border
                               transition-all duration-200
                               hover:text-text-primary hover:border-accent/30 hover:bg-accent/5">
              Log in
            </Link>
            <Link to="/signup" className="px-5 py-2 text-sm font-semibold text-bg-primary
                               rounded-lg btn-neon">
              Sign up
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-border bg-bg-primary/95 backdrop-blur-xl">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm text-text-secondary
                         hover:text-text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link to="/login" className="w-full py-2.5 text-sm text-text-secondary text-center
                               rounded-lg border border-border">
              Log in
            </Link>
            <Link to="/signup" className="w-full py-2.5 text-sm font-semibold text-bg-primary text-center
                               rounded-lg btn-neon">
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
