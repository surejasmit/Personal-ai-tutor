import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Target, Award, Flame, ChevronRight, Star, Bot, ArrowRight } from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/Topbar";
import StatsCard from "../components/Dashboard/StatsCard";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [dashboardData, setDashboardData] = useState({
        topicsCompleted: 0,
        topicsThisWeek: 0,
        quizzesTaken: 0,
        quizzesThisWeek: 0,
        averageScore: 0,
        scoreImprovement: 0,
        currentStreak: 0,
    });
    const [loading, setLoading] = useState(true);

    // Get user data on component mount
    useEffect(() => {
        const userdata = localStorage.getItem('user');
        if (userdata) {
            const user = JSON.parse(userdata);
            setUserName(user.name || user.username || user.email?.split('@')[0] || 'Student');
            setUserId(user.id);
        }
    }, []);

    // Fetch dashboard data from backend
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!userId) return;

            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

                const response = await fetch(`${API_URL}/api/dashboard/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDashboardData(data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [userId]);

    // Fetch AI Recommendation
    useEffect(() => {
        const fetchRecommendation = async () => {
            if (!userId) return;

            try {
                const token = localStorage.getItem('token');
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

                const response = await fetch(`${API_URL}/api/recommendation/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.hasRecommendation) {
                        setRecommendation(data.recommendation);
                    }
                }
            } catch (error) {
                console.error('Error fetching AI recommendation:', error);
            }
        };

        fetchRecommendation();
    }, [userId]);

    const stats = [
        {
            icon: BookOpen,
            title: 'Courses Enrolled',
            value: loading ? '...' : (dashboardData?.topicsCompleted ?? 0).toString(),
            change: loading ? '' : `+${dashboardData?.topicsThisWeek ?? 0}`,
            changeLabel: 'this week',
            iconBg: 'bg-accent/10',
            iconColor: 'text-accent',
        },
        {
            icon: Target,
            title: 'Quizzes Completed',
            value: loading ? '...' : (dashboardData?.quizzesTaken ?? 0).toString(),
            change: loading ? '' : `+${dashboardData?.quizzesThisWeek ?? 0}`,
            changeLabel: 'this week',
            iconBg: 'bg-purple/10',
            iconColor: 'text-purple-light',
        },
        {
            icon: Award,
            title: 'Accuracy',
            value: loading ? '...' : `${dashboardData?.averageScore ?? 0}%`,
            change: loading ? '' : `+${dashboardData?.scoreImprovement ?? 0}%`,
            changeLabel: 'improvement',
            iconBg: 'bg-info/10',
            iconColor: 'text-blue-400',
        },
        {
            icon: Flame,
            title: 'Current Streak',
            value: loading ? '...' : `${dashboardData?.currentStreak ?? 0} days`,
            change: (dashboardData?.currentStreak ?? 0) > 0 ? '🔥 Keep it up!' : 'Start today!',
            changeLabel: '',
            iconBg: 'bg-warm/10',
            iconColor: 'text-amber-400',
        },
    ];

    const progressData = [
        { label: 'Data Structures and Algorithms', progress: 75 },
        { label: 'Machine Learning Fundamentals', progress: 60 },
        { label: 'Web Development Bootcamp', progress: 90 },
        { label: 'Python for Beginners', progress: 40 },
    ];

    const recommendedCourses = [
        { name: 'Database Systems', category: 'Intermediate', rating: 4.6, color: 'from-accent to-accent-dark' },
        { name: 'Operating Systems', category: 'Intermediate', rating: 4.7, color: 'from-purple to-purple-dark' },
        { name: 'Computer Networks', category: 'Intermediate', rating: 4.5, color: 'from-blue-500 to-blue-600' },
        { name: 'AI & Deep Learning', category: 'Advanced', rating: 4.9, color: 'from-amber-400 to-amber-500' },
    ];

    return (
        <div className="flex min-h-screen bg-bg-primary text-text-primary">
            <Sidebar />

            <div className="flex-1 ml-56">
                <TopBar userName={userName} />

                <main className="p-8">
                    {/* Welcome */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-1">
                            Welcome back, <span className="text-accent text-glow-green">{userName}!</span> 👋
                        </h1>
                        <p className="text-text-muted text-sm">Let&apos;s continue your learning journey.</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-5 mb-8">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* AI Recommendation Banner */}
                    {recommendation && (
                        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-accent/15 via-accent/5 to-transparent border border-accent/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-700" />
                            <div className="flex-1 space-y-2 relative z-10">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider">
                                    <Bot size={13} className="animate-pulse" />
                                    AI Recommended Next Step
                                </div>
                                <h3 className="text-xl font-bold text-text-primary">
                                    Ready to master <span className="text-accent text-glow-green">{recommendation.recommended_topic}</span>?
                                </h3>
                                <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
                                    {recommendation.recommendation_reason}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/topics')}
                                className="px-5 py-2.5 rounded-xl btn-neon font-semibold flex-shrink-0 flex items-center gap-2 relative z-10"
                            >
                                Start Quiz
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    )}

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {/* Progress Overview Chart */}
                        <div className="col-span-2 neon-card p-6 h-80">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-base font-semibold">Your Progress Overview</h3>
                                <span className="text-xs text-text-muted px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">This Week ▾</span>
                            </div>
                            {loading ? (
                                <div className="flex items-center justify-center h-48">
                                    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <div className="flex items-end gap-2 h-48 px-2">
                                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => {
                                        const heights = [45, 60, 55, 85, 70, 65, 50];
                                        return (
                                            <div key={day} className="flex-1 flex flex-col items-center gap-2">
                                                <div className="w-full flex flex-col items-center">
                                                    <span className="text-[10px] text-accent font-medium mb-1">{heights[i]}%</span>
                                                    <div
                                                        className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-accent/40 to-accent transition-all duration-500 hover:from-accent/60 hover:to-accent-light"
                                                        style={{ height: `${heights[i] * 1.8}px` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] text-text-muted">{day}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Continue Learning */}
                        <div className="neon-card p-6 h-80 overflow-y-auto">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-base font-semibold">Continue Learning</h3>
                                <a href="/courses" className="text-xs text-accent hover:text-accent-light transition-colors">View All</a>
                            </div>
                            <div className="space-y-4">
                                {progressData.map((course) => (
                                    <div key={course.label} className="group">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-sm text-text-primary font-medium truncate mr-2">{course.label}</span>
                                            <span className="text-xs text-text-muted flex-shrink-0">{course.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-700"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recommended For You */}
                    <div className="neon-card p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-semibold">Recommended for You</h3>
                            <a href="/courses" className="text-xs text-accent hover:text-accent-light transition-colors">View All</a>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {recommendedCourses.map((course) => (
                                <div key={course.name} className="group rounded-xl bg-bg-card border border-white/[0.04] p-4 hover:border-accent/15 transition-all cursor-pointer">
                                    <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${course.color} mb-3 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                                        <BookOpen size={24} className="text-white/80" />
                                    </div>
                                    <h4 className="text-sm font-semibold text-text-primary mb-1 truncate">{course.name}</h4>
                                    <p className="text-xs text-text-muted mb-2">{course.category}</p>
                                    <div className="flex items-center gap-1">
                                        <Star size={12} className="text-amber-400 fill-amber-400" />
                                        <span className="text-xs text-text-secondary">{course.rating}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
