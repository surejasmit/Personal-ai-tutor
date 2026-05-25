import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, ChevronDown, LogOut, UserRound, BookOpen, TrendingUp, Award } from 'lucide-react';

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user')) || null;
  } catch {
    return null;
  }
};

const getDisplayName = (user) => (
  user?.name || user?.username || user?.email?.split('@')[0] || 'Student'
);

const StudentProfileMenu = ({ compact = false }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    topicsCompleted: 0,
    topicsThisWeek: 0,
    averageScore: 0
  });

  const token = localStorage.getItem('token');
  const name = getDisplayName(profile);
  const initial = useMemo(() => name.charAt(0).toUpperCase(), [name]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const { data } = await axios.get(`${API_URL}/api/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = data?.user || data;
        setProfile(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Fetch dashboard stats
  useEffect(() => {
    if (!token || !profile?.id) return;

    const fetchStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const { data } = await axios.get(`${API_URL}/api/dashboard/${profile.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats({
          topicsCompleted: data?.topicsCompleted || 0,
          topicsThisWeek: data?.topicsThisWeek || 0,
          averageScore: Math.round(data?.averageScore) || 0
        });
      } catch (err) {
        console.log('Unable to fetch stats');
      }
    };

    fetchStats();
  }, [token, profile?.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setOpen(false);
    navigate('/login');
  };

  if (!token) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex items-center rounded-lg transition-all hover:bg-white/5 ${
          compact ? 'gap-2 px-2 py-1.5' : 'gap-3 px-3 py-1.5'
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-semibold text-white">
          {loading ? <UserRound size={17} /> : initial}
        </span>

        {!compact && (
          <span className="hidden max-w-36 truncate text-sm font-medium text-text-primary sm:block">
            {loading ? 'Loading...' : name}
          </span>
        )}

        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg border border-white/10 bg-[#111827] shadow-2xl shadow-black/30"
        >
          {/* Profile Header */}
          <div className="border-b border-white/5 px-5 py-5">
            <div className="flex items-center gap-4 mb-3">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-xl font-bold text-white shadow-lg">
                {loading ? <UserRound size={24} /> : initial}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-white">
                  {loading ? 'Loading...' : name}
                </p>
                <p className="truncate text-xs text-gray-400 mt-1">
                  {loading ? 'Please wait' : profile?.email || 'Email unavailable'}
                </p>
                {profile?.level && (
                  <p className="text-xs font-medium text-emerald-400 mt-1">
                    Level: {profile.level}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Progress Stats */}
          <div className="border-b border-white/5 px-5 py-4">
            <p className="text-xs font-bold uppercase text-gray-500 mb-3">Progress &amp; Topics</p>
            <div className="grid grid-cols-3 gap-3">
              {/* Topics Completed */}
              <div className="rounded-lg bg-white/5 px-3 py-3 text-center hover:bg-white/10 transition-colors">
                <div className="flex justify-center mb-2">
                  <BookOpen size={18} className="text-emerald-400" />
                </div>
                <p className="text-lg font-bold text-white">{stats.topicsCompleted}</p>
                <p className="text-xs text-gray-400 mt-1">Topics</p>
              </div>

              {/* This Week */}
              <div className="rounded-lg bg-white/5 px-3 py-3 text-center hover:bg-white/10 transition-colors">
                <div className="flex justify-center mb-2">
                  <TrendingUp size={18} className="text-blue-400" />
                </div>
                <p className="text-lg font-bold text-white">{stats.topicsThisWeek}</p>
                <p className="text-xs text-gray-400 mt-1">This Week</p>
              </div>

              {/* Average Score */}
              <div className="rounded-lg bg-white/5 px-3 py-3 text-center hover:bg-white/10 transition-colors">
                <div className="flex justify-center mb-2">
                  <Award size={18} className="text-yellow-400" />
                </div>
                <p className="text-lg font-bold text-white">{stats.averageScore}%</p>
                <p className="text-xs text-gray-400 mt-1">Avg Score</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            role="menuitem"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentProfileMenu;
