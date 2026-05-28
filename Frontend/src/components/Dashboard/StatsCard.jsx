const StatsCard = ({ icon: Icon, title, value, change, changeLabel, iconBg, iconColor }) => {
  return (
    <div className="premium-card group rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{value}</h3>
          <p className="mt-2 text-sm font-bold text-brand">
            {change} <span className="font-medium text-slate-500">{changeLabel}</span>
          </p>
        </div>

        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

