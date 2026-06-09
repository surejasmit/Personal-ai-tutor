import { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Clock,
  Zap,
  Award,
  Calendar,
  ChevronRight,
  CheckCircle,
  XCircle,
  BarChart3,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/Topbar";

// ─── API helper ──────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fetchJSON = async (path, token) => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch {
    return null;
  }
};

// ─── Small helper components ─────────────────────────────────
const Badge = ({ children, color = "green" }) => {
  const colors = {
    green: "bg-accent/10 text-accent border-accent/20",
    emerald: "bg-accent/10 text-accent border-accent/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple/10 text-purple-light border-purple/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    gray: "bg-white/5 text-text-muted border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border ${colors[color]}`}
    >
      {children}
    </span>
  );
};

const Shimmer = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-lg bg-white/5 ${className}`}
    style={{
      backgroundImage:
        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
    }}
  />
);

// ─── SVG Mini-Bar Chart (for weekly comparison) ──────────────
const MiniBarChart = ({ current, previous, label }) => {
  const max = Math.max(current, previous, 1);
  const currentH = (current / max) * 48;
  const previousH = (previous / max) * 48;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="40" height="56" viewBox="0 0 40 56">
        {/* Previous bar */}
        <rect
          x="2"
          y={56 - previousH}
          width="14"
          height={previousH}
          rx="3"
          fill="rgba(255,255,255,0.08)"
        />
        {/* Current bar */}
        <rect
          x="22"
          y={56 - currentH}
          width="14"
          height={currentH}
          rx="3"
          fill="url(#neonGreenGrad)"
        />
        <defs>
          <linearGradient id="neonGreenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34f0a1" />
            <stop offset="100%" stopColor="#00b368" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-[10px] text-text-muted font-medium">{label}</span>
    </div>
  );
};

// ─── Activity Heatmap (GitHub-style) ─────────────────────────
const ActivityHeatmap = ({ data = [] }) => {
  const cells = useMemo(() => {
    const map = {};
    data.forEach((d) => {
      map[d.date?.split("T")[0]] = Number(d.quiz_count);
    });

    const result = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const key = `${year}-${month}-${day}`;
      result.push({ date: key, count: map[key] || 0, day: d.getDay() });
    }
    return result;
  }, [data]);

  const getColor = (count) => {
    if (count === 0) return "rgba(255,255,255,0.04)";
    if (count === 1) return "rgba(0,217,126,0.25)";
    if (count === 2) return "rgba(0,217,126,0.45)";
    if (count <= 4) return "rgba(0,217,126,0.65)";
    return "rgba(0,217,126,0.9)";
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  const totalQuizzes = cells.reduce((s, c) => s + c.count, 0);
  const activeDays = cells.filter((c) => c.count > 0).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            Activity Heatmap
          </h3>
          <p className="text-xs text-text-muted mt-0.5">Last 30 days</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg font-bold text-text-primary">{totalQuizzes}</p>
            <p className="text-[10px] text-text-muted">Total quizzes</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-accent">{activeDays}</p>
            <p className="text-[10px] text-text-muted">Active days</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-1 pt-5">
          {dayLabels.map((label, i) => (
            <span key={i} className="text-[9px] text-text-muted h-[18px] leading-[18px]">
              {label}
            </span>
          ))}
        </div>

        {/* Grid – 5 columns (weeks) */}
        <div className="flex gap-[3px] flex-1">
          {Array.from({ length: Math.ceil(cells.length / 7) }, (_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[3px]">
              {cells
                .slice(weekIdx * 7, weekIdx * 7 + 7)
                .map((cell, dayIdx) => (
                  <div
                    key={dayIdx}
                    className="group relative"
                  >
                    <div
                      className="w-[18px] h-[18px] rounded-[4px] transition-all duration-200 hover:ring-1 hover:ring-accent/50 hover:scale-125 cursor-pointer"
                      style={{ background: getColor(cell.count) }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                      <div className="bg-bg-card border border-white/10 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap shadow-xl">
                        <span className="text-text-primary font-medium">
                          {cell.count} quiz{cell.count !== 1 ? "zes" : ""}
                        </span>
                        <span className="text-text-muted ml-1.5">
                          {new Date(cell.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-[10px] text-text-muted">Less</span>
        {[0, 1, 2, 3, 5].map((v, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-[2px]"
            style={{ background: getColor(v) }}
          />
        ))}
        <span className="text-[10px] text-text-muted">More</span>
      </div>
    </div>
  );
};

// ─── Skill Radar / Bar Chart ────────────────────────────────
const SkillBars = ({ skills = [] }) => {
  const getGrade = (score) => {
    if (score >= 90) return { label: "A+", color: "green" };
    if (score >= 80) return { label: "A", color: "green" };
    if (score >= 70) return { label: "B", color: "blue" };
    if (score >= 60) return { label: "C", color: "amber" };
    return { label: "D", color: "red" };
  };

  if (!skills.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text-muted">
        <Target size={40} className="mb-3 opacity-30" />
        <p className="text-sm">No skills data yet</p>
        <p className="text-xs mt-1 text-text-muted">Complete quizzes to see your skills</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {skills.slice(0, 8).map((skill, i) => {
        const grade = getGrade(Number(skill.avg_score));
        return (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {skill.topic_name}
                </span>
                <Badge color={grade.color}>{grade.label}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">
                  {skill.attempts} attempt{skill.attempts !== 1 ? "s" : ""}
                </span>
                <span className="text-sm font-bold text-text-primary">
                  {skill.avg_score}%
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${skill.avg_score}%`,
                  background:
                    Number(skill.avg_score) >= 70
                      ? "linear-gradient(90deg, #00b368, #00d97e)"
                      : Number(skill.avg_score) >= 50
                      ? "linear-gradient(90deg, #d97706, #fbbf24)"
                      : "linear-gradient(90deg, #dc2626, #f87171)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Topic Journey Sparkline ────────────────────────────────
const Sparkline = ({ data = [], width = 120, height = 32 }) => {
  if (data.length < 2) return null;
  const values = data.map((d) => Number(d.percentage));
  const min = Math.min(...values);
  const max = Math.max(...values, min + 1);
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / (max - min)) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const lastVal = values[values.length - 1];
  const firstVal = values[0];
  const trend = lastVal >= firstVal ? "up" : "down";

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient
          id={`spark-${trend}`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor={trend === "up" ? "#00b368" : "#dc2626"}
            stopOpacity="0.3"
          />
          <stop
            offset="100%"
            stopColor={trend === "up" ? "#00d97e" : "#f87171"}
          />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={`url(#spark-${trend})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={(values.length - 1) / (values.length - 1) * width}
        cy={
          height -
          ((lastVal - min) / (max - min)) * (height - 4) -
          2
        }
        r="3"
        fill={trend === "up" ? "#00d97e" : "#f87171"}
      />
    </svg>
  );
};

// ─── Timeline Event Card ────────────────────────────────────
const TimelineEvent = ({ event, isLast }) => {
  const pct = Number(event.percentage || 0);
  const isGood = pct >= 70;
  const formatTime = (seconds) => {
    if (!seconds) return "N/A";
    const s = Number(seconds);
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  return (
    <div className="flex gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isGood
              ? "bg-accent/10 border border-accent/20"
              : "bg-amber-500/10 border border-amber-500/20"
          }`}
        >
          {isGood ? (
            <CheckCircle size={18} className="text-accent" />
          ) : (
            <Target size={18} className="text-amber-400" />
          )}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent min-h-[24px]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-6 flex-1 min-w-0">
        <div className="bg-bg-card rounded-xl p-4 border border-white/[0.06] hover:border-white/10 transition-all group">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
                {event.topic_name}
              </h4>
              <p className="text-xs text-text-muted mt-0.5">
                {new Date(event.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span
                className={`text-lg font-bold ${
                  isGood ? "text-accent" : "text-amber-400"
                }`}
              >
                {pct}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <CheckCircle size={12} className="text-accent" />
              <span>
                {event.correct_answers}/{event.total_questions} correct
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock size={12} />
              <span>{formatTime(event.time_taken)}</span>
            </div>
            {event.score && (
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Award size={12} className="text-purple-light" />
                <span>{event.score} pts</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════
const MyProgress = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Data states
  const [skills, setSkills] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [weekly, setWeekly] = useState(null);
  const [journey, setJourney] = useState([]);
  const [timeline, setTimeline] = useState([]);

  // Get user from localStorage
  useEffect(() => {
    const userdata = localStorage.getItem("user");
    if (userdata) {
      const user = JSON.parse(userdata);
      setUserName(
        user.name || user.username || user.email?.split("@")[0] || "Student"
      );
      setUserId(user.id);
    }
  }, []);

  // Fetch all progress data
  useEffect(() => {
    if (!userId) return;
    const token = localStorage.getItem("token");

    const load = async () => {
      setLoading(true);
      const [skillsRes, heatmapRes, weeklyRes, journeyRes, timelineRes] =
        await Promise.all([
          fetchJSON(`/api/myprogress/skill-reader/${userId}`, token),
          fetchJSON(`/api/myprogress/heatmap/${userId}`, token),
          fetchJSON(`/api/myprogress/weekly-comparison/${userId}`, token),
          fetchJSON(`/api/myprogress/topic-journey/${userId}`, token),
          fetchJSON(`/api/myprogress/timeline/${userId}`, token),
        ]);

      if (skillsRes?.skills) setSkills(skillsRes.skills);
      if (heatmapRes?.heatmap) setHeatmap(heatmapRes.heatmap);
      if (weeklyRes) setWeekly(weeklyRes);
      if (journeyRes?.journey) setJourney(journeyRes.journey);
      if (timelineRes?.timeline) setTimeline(timelineRes.timeline);

      setLoading(false);
    };

    load();
  }, [userId]);

  // ── Derived stats ──
  const weeklyStats = useMemo(() => {
    if (!weekly) return null;
    const tw = weekly.thisweek || {};
    const lw = weekly.lastweek || {};

    const calcChange = (curr, prev) => {
      if (!prev) return curr > 0 ? 100 : 0;
      return prev === 0 ? (curr > 0 ? 100 : 0) : Math.round(((curr - prev) / prev) * 100);
    };

    return [
      {
        icon: Target,
        label: "Quizzes Taken",
        value: tw.quizzes_taken || 0,
        prev: lw.quizzes_taken || 0,
        change: calcChange(tw.quizzes_taken, lw.quizzes_taken),
        color: "emerald",
      },
      {
        icon: Award,
        label: "Avg Score",
        value: `${tw.avg_score || 0}%`,
        prev: `${lw.avg_score || 0}%`,
        change: calcChange(tw.avg_score, lw.avg_score),
        color: "blue",
      },
      {
        icon: Clock,
        label: "Study Time",
        value: `${Math.round((tw.total_time || 0) / 60)}m`,
        prev: `${Math.round((lw.total_time || 0) / 60)}m`,
        change: calcChange(tw.total_time, lw.total_time),
        color: "purple",
      },
      {
        icon: Flame,
        label: "Productivity",
        value:
          tw.quizzes_taken > 0
            ? `${Math.round((tw.avg_score || 0) * (tw.quizzes_taken || 1) / 100)}`
            : "0",
        prev: "-",
        change:
          (tw.avg_score || 0) > (lw.avg_score || 0)
            ? Math.round((tw.avg_score || 0) - (lw.avg_score || 0))
            : -Math.round((lw.avg_score || 0) - (tw.avg_score || 0)),
        color: "amber",
      },
    ];
  }, [weekly]);

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="flex min-h-screen bg-bg-primary">
        <Sidebar />
        <div className="flex-1 ml-56">
          <TopBar userName={userName} />
          <main className="p-8">
            <Shimmer className="h-8 w-64 mb-2" />
            <Shimmer className="h-4 w-96 mb-8" />
            <div className="grid grid-cols-4 gap-5 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Shimmer key={i} className="h-32 rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <Shimmer className="h-72 rounded-xl" />
              <Shimmer className="h-72 rounded-xl" />
            </div>
            <Shimmer className="h-96 rounded-xl" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary">
      <Sidebar />

      <div className="flex-1 ml-56">
        <TopBar userName={userName} />

        <main className="p-8">
          {/* ── Page Header ── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Your Learning Analytics</h1>
                <p className="text-sm text-text-muted">
                  Track your learning journey and growth
                </p>
              </div>
            </div>
          </div>

          {/* ══════════════ WEEKLY COMPARISON STATS ══════════════ */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            {weeklyStats?.map((stat, i) => {
              const isUp = stat.change > 0;
              const isNeutral = stat.change === 0;
              const colorMap = {
                emerald: "from-accent/10 to-accent/5",
                blue: "from-blue-500/10 to-blue-500/5",
                purple: "from-purple/10 to-purple/5",
                amber: "from-amber-500/10 to-amber-500/5",
              };
              const iconColorMap = {
                emerald: "text-accent",
                blue: "text-blue-400",
                purple: "text-purple-light",
                amber: "text-amber-400",
              };

              return (
                <div
                  key={i}
                  className="relative bg-bg-secondary rounded-2xl p-5 border border-white/[0.06] hover:border-white/10 transition-all group overflow-hidden"
                >
                  {/* Gradient glow */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${colorMap[stat.color]} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon
                        size={18}
                        className={iconColorMap[stat.color]}
                      />
                      <div
                        className={`flex items-center gap-1 text-xs font-semibold ${
                          isNeutral
                            ? "text-text-muted"
                            : isUp
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {isNeutral ? (
                          <Minus size={12} />
                        ) : isUp ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}
                        {Math.abs(stat.change)}%
                      </div>
                    </div>

                    <p className="text-2xl font-bold text-text-primary mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-text-muted">{stat.label}</p>

                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
                      <span className="text-[10px] text-text-muted">
                        Last week:
                      </span>
                      <span className="text-[10px] text-text-secondary font-medium">
                        {stat.prev}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }) || (
              <div className="col-span-4 text-center py-8 text-text-muted text-sm">
                No weekly data available yet
              </div>
            )}
          </div>

          {/* ══════════════ SKILLS + HEATMAP ROW ══════════════ */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            {/* Skills - 3 columns */}
            <div className="col-span-3 bg-bg-secondary rounded-2xl p-6 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-accent" />
                  <h3 className="text-base font-semibold text-text-primary">
                    Skill Breakdown
                  </h3>
                </div>
                {skills.length > 0 && (
                  <Badge color="gray">{skills.length} topics</Badge>
                )}
              </div>
              <SkillBars skills={skills} />
            </div>

            {/* Heatmap - 2 columns */}
            <div className="col-span-2 bg-bg-secondary rounded-2xl p-6 border border-white/[0.06]">
              <ActivityHeatmap data={heatmap} />
            </div>
          </div>

          {/* ══════════════ TOPIC JOURNEY ══════════════ */}
          {journey.length > 0 && (
            <div className="bg-bg-secondary rounded-2xl p-6 border border-white/[0.06] mb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-amber-400" />
                  <h3 className="text-base font-semibold text-text-primary">
                    Topic Journey
                  </h3>
                  <span className="text-xs text-text-muted">
                    Score trends over time
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {journey.map((topic, i) => {
                  const attempts = topic.attempts || [];
                  const latest = attempts[attempts.length - 1];
                  const first = attempts[0];
                  const improvement =
                    attempts.length >= 2
                      ? Number(latest.percentage) - Number(first.percentage)
                      : 0;

                  return (
                    <div
                      key={i}
                      className="bg-bg-card rounded-xl p-4 border border-white/[0.06] hover:border-white/10 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-semibold text-text-secondary truncate group-hover:text-text-primary transition-colors">
                            {topic.topic}
                          </h4>
                          <p className="text-xs text-text-muted mt-0.5">
                            {attempts.length} attempt
                            {attempts.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        {improvement !== 0 && (
                          <div
                            className={`flex items-center gap-0.5 text-xs font-semibold ${
                              improvement > 0
                                ? "text-accent"
                                : "text-red-400"
                            }`}
                          >
                            {improvement > 0 ? (
                              <TrendingUp size={12} />
                            ) : (
                              <TrendingDown size={12} />
                            )}
                            {Math.abs(improvement)}%
                          </div>
                        )}
                      </div>

                      <div className="flex items-end justify-between">
                        <Sparkline data={attempts} width={100} height={28} />
                        <span className="text-lg font-bold text-text-primary">
                          {latest?.percentage || 0}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══════════════ RECENT TIMELINE ══════════════ */}
          <div className="bg-bg-secondary rounded-2xl p-6 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-400" />
                <h3 className="text-base font-semibold text-text-primary">
                  Recent Activity
                </h3>
                {timeline.length > 0 && (
                  <Badge color="blue">{timeline.length} entries</Badge>
                )}
              </div>
            </div>

            {timeline.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-text-muted">
                <Calendar size={40} className="mb-3 opacity-20" />
                <p className="text-sm">No activity yet</p>
                <p className="text-xs mt-1 text-text-muted">
                  Start taking quizzes to see your timeline
                </p>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto pr-2 custom-scroll">
                {timeline.map((event, i) => (
                  <TimelineEvent
                    key={event.id || i}
                    event={event}
                    isLast={i === timeline.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Shimmer animation keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 2px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,217,126,0.3); }
      `}</style>
    </div>
  );
};

export default MyProgress;
