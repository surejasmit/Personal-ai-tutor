import { useEffect, useRef, useState } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ userName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setMenuOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-bg-primary/90 backdrop-blur-md border-b border-white/[0.04] relative">
      <div className="flex items-center gap-3 bg-bg-secondary/80 px-4 py-2.5 rounded-xl border border-white/[0.06] w-96 transition-colors focus-within:border-accent/20">
        <Search size={18} className="text-text-muted" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent outline-none text-sm w-full text-text-primary placeholder:text-text-muted"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 hover:bg-white/[0.04] rounded-xl transition-all group">
          <Bell size={20} className="text-text-muted group-hover:text-text-secondary transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full ring-2 ring-bg-primary"></span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 pl-4 border-l border-white/[0.06] hover:bg-white/[0.04] px-3 py-1.5 rounded-xl transition-all"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-accent to-purple rounded-full flex items-center justify-center ring-2 ring-accent/20">
              <span className="text-sm font-semibold text-bg-primary">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <span className="text-sm font-medium text-text-primary">{userName || 'User'}</span>
            <ChevronDown size={16} className="text-text-muted" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-xl border border-white/[0.08] bg-bg-card shadow-2xl shadow-black/40 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-sm font-semibold text-text-primary">{userName || 'User'}</p>
                <p className="text-xs text-text-muted">Student profile</p>
              </div>

              <button
                type="button"
                onClick={handleProfileClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-colors"
              >
                <User size={16} />
                Profile
              </button>

              <button
                type="button"
                onClick={handleProfileClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-colors"
              >
                <Settings size={16} />
                Account Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/[0.06]"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
