import { Search, Bell } from 'lucide-react';
import StudentProfileMenu from '../StudentProfileMenu';

const TopBar = ({ userName }) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#0a0e1a] border-b border-white/5">
      {/* Search */}
      <div className="flex items-center gap-3 bg-[#1a1f2e] px-4 py-2.5 rounded-lg border border-white/5 w-96">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search topics, quizzes..."
          className="bg-transparent outline-none text-sm w-full text-gray-300 placeholder:text-gray-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-all">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="pl-4 border-l border-white/5">
          <StudentProfileMenu compact={false} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
