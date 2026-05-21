import { LayoutDashboard, TrendingUp, FileText, BookOpen, Bot, Calendar, Trophy, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'My Progress', path: '/progress' },
    { icon: FileText, label: 'Quizzes', path: '/topics' },
    { icon: BookOpen, label: 'Topics', path: '/topic' },
    { icon: Bot, label: 'AI Tutor', path: '/ai-tutor' },
    { icon: Calendar, label: 'Study Plan', path: '/study-plan' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-[#0f1419] border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">
          AT
        </div>
        <span className="text-lg font-semibold">AI Tutor</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-all">
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
