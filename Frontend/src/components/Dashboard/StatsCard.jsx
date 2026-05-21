const StatsCard = ({ icon: Icon, title, value, change, changeLabel, iconBg, iconColor }) => {
  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all">
      <div className="flex items-start justify-between">
        {/* Left Side - Text Content */}
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          <p className="text-emerald-400 text-sm font-medium">
            {change} {changeLabel}
          </p>
        </div>

        {/* Right Side - Icon */}
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
