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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    <header className="flex items-center justify-between px-8 py-4 bg-[#0a0e1a] border-b border-white/5 relative">
      <div className="flex items-center gap-3 bg-[#1a1f2e] px-4 py-2.5 rounded-lg border border-white/5 w-96">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search topics, quizzes..."
          className="bg-transparent outline-none text-sm w-full text-gray-300 placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-all">
          <Bell size={20} className="text-gray-400" />

          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>

          <span className="absolute -top-1 -right-1 bg-emerald-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 pl-4 border-l border-white/5 hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>

            <span className="text-sm font-medium">
              {userName || 'User'}
            </span>

            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-xl border border-white/10 bg-[#111626] shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-semibold text-white">
                  {userName || 'User'}
                </p>

                <p className="text-xs text-gray-400">
                  Student profile
                </p>
              </div>

              <button
                type="button"
                onClick={handleProfileClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <User size={16} />
                Profile
              </button>

              <button
                type="button"
                onClick={handleProfileClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Settings size={16} />
                Account Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
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