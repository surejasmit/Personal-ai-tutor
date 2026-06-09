const StatsCard = ({ icon: Icon, title, value, change, changeLabel, iconBg, iconColor }) => {
  return (
    <div className="neon-card p-5 hover:border-accent/15 group">
      <div className="flex items-start justify-between">
        {/* Left Side - Text Content */}
        <div>
          <p className="text-text-muted text-xs font-medium uppercase tracking-wider mb-2">{title}</p>
          <h3 className="text-2xl font-bold text-text-primary mb-1.5">{value}</h3>
          <p className="text-accent text-xs font-semibold">
            {change} <span className="text-text-muted font-normal">{changeLabel}</span>
          </p>
        </div>

        {/* Right Side - Icon */}
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={20} className={iconColor} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
