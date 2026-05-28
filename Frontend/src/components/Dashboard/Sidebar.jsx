import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  BookOpen,
  Bot,
  Calendar,
  Trophy,
  Settings,
  GraduationCap,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: FileText, label: 'Quizzes', path: '/topics' },
    { icon: BookOpen, label: 'Topics', path: '/topic' },
    { icon: Bot, label: 'AI Tutor', path: '/ai-tutor' },
    { icon: Calendar, label: 'Plan', path: '/study-plan' },
    { icon: Trophy, label: 'Awards', path: '/achievements' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#080b18]/92 px-3 py-2 backdrop-blur-2xl md:inset-y-0 md:left-0 md:right-auto md:w-64 md:border-r md:border-t-0 md:px-4 md:py-5">
      <div className="mb-7 hidden items-center gap-3 px-3 md:flex">
        <div className="brand-gradient flex h-10 w-10 items-center justify-center rounded-2xl shadow-lift">
          <GraduationCap size={22} className="text-white" />
        </div>
        <div>
          <p className="text-base font-extrabold text-white">AI Tutor</p>
          <p className="text-xs text-slate-400">Learning cockpit</p>
        </div>
      </div>

      <nav className="grid grid-cols-5 gap-1 md:flex md:flex-col md:gap-1.5">
        {menuItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2.5 text-[11px] font-semibold transition md:flex-row md:justify-start md:gap-3 md:px-4 md:py-3 md:text-sm ${
                isActive
                  ? 'bg-brand-500/18 text-white ring-1 ring-brand-400/30'
                  : 'text-slate-400 hover:bg-white/8 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="mt-5 hidden border-t border-white/10 pt-5 md:block">
          {menuItems.slice(5).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `mb-1.5 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-500/18 text-white ring-1 ring-brand-400/30'
                    : 'text-slate-400 hover:bg-white/8 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

