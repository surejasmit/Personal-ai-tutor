import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, LogOut, Search, Settings, User } from 'lucide-react';
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
    <header className="relative flex items-center justify-between border-b border-white/5 bg-[#0a0e1a] px-4 py-4 md:px-8">
      <div className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-white/5 bg-[#1a1f2e] px-4 py-2.5">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search topics, quizzes..."
          className="w-full bg-transparent text-sm text-gray-300 outline-none placeholder:text-gray-500"
        />
      </div>

      <div className="ml-4 flex items-center gap-4">
        <button type="button" className="relative rounded-lg p-2 transition-all hover:bg-white/5" aria-label="Notifications">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />
          <span className="absolute -right-1 -top-1 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold">
            3
          </span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-lg border-l border-white/5 px-3 py-1.5 transition-all hover:bg-white/5"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600">
              <span className="text-sm font-semibold text-white">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>

            <span className="hidden text-sm font-medium sm:block">{userName || 'User'}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-bold text-slate-900">{userName || 'User'}</p>
                <p className="text-xs text-slate-500">Student profile</p>
              </div>

              <button
                type="button"
                onClick={handleProfileClick}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-dark"
              >
                <User size={16} />
                Profile
              </button>

              <button
                type="button"
                onClick={handleProfileClick}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-dark"
              >
                <Settings size={16} />
                Account Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
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
