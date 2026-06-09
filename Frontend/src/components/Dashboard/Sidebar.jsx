import { LayoutDashboard, TrendingUp, FileText, BookOpen, Bot, Bookmark, MessageSquare, Settings, Crown, ChevronDown } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    const userdata = localStorage.getItem('user');
    if (userdata) {
      const user = JSON.parse(userdata);
      setUserName(user.name || user.username || user.email?.split('@')[0] || 'Student');
    }
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Bot, label: 'AI Recommendation', path: '/ai-tutor' },
    { icon: BookOpen, label: 'Courses', path: '/topics' },
    { icon: TrendingUp, label: 'Analytics', path: '/progress' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: MessageSquare, label: 'AI Chatbot', path: '/chatbot' },
    { icon: Settings, label: 'Settings', path: '/profile' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-[#0b1018] border-r border-white/[0.04] flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.04]">
        <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center font-bold text-sm text-bg-primary shadow-lg shadow-accent/20">
          AT
        </div>
        <span className="text-lg font-semibold text-text-primary">AI Tutor</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path + item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 relative group ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-muted hover:bg-white/[0.04] hover:text-text-secondary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full shadow-lg shadow-accent/30" />
                )}
                <item.icon size={18} className={isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'} />
                <span className="text-sm font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Premium Card */}
      <div className="mx-3 mb-3">
        <div className="rounded-xl bg-gradient-to-br from-purple/10 to-accent/5 border border-purple/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={16} className="text-purple-light" />
            <span className="text-sm font-semibold text-purple-light">Premium</span>
          </div>
          <p className="text-xs text-text-muted mb-3 leading-relaxed">
            Unlock all features and unlimited practice.
          </p>
          <button className="w-full py-2 text-xs font-semibold rounded-lg bg-purple text-white hover:bg-purple-light transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-white/[0.04] px-3 py-3">
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/[0.04] transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-purple rounded-full flex items-center justify-center text-sm font-semibold text-bg-primary">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{userName}</p>
            <p className="text-xs text-text-muted">View Profile</p>
          </div>
          <ChevronDown size={14} className="text-text-muted" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
