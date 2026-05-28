import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Target, Award, Flame, ArrowRight, BarChart3, Sparkles } from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/Topbar";
import StatsCard from "../components/Dashboard/StatsCard";

const getStoredUser = () => {
    try {
        const userdata = localStorage.getItem('user');
        return userdata ? JSON.parse(userdata) : null;
    } catch {
        return null;
    }
};

const Dashboard = () => {
    const storedUser = getStoredUser();
    const [userName] = useState(storedUser?.name || storedUser?.username || storedUser?.email?.split('@')[0] || 'Student');
    const [userId] = useState(storedUser?.id || null);
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

    const stats = [
        {
            icon: BookOpen,
            title: 'Topics Completed',
            value: loading ? '...' : (dashboardData?.topicsCompleted ?? 0).toString(),
            change: loading ? '' : `+${dashboardData?.topicsThisWeek ?? 0}`,
            changeLabel: 'this week',
            iconBg: 'bg-brand-100',
            iconColor: 'text-brand',
        },
        {
            icon: Target,
            title: 'Quizzes Taken',
            value: loading ? '...' : (dashboardData?.quizzesTaken ?? 0).toString(),
            change: loading ? '' : `+${dashboardData?.quizzesThisWeek ?? 0}`,
            changeLabel: 'this week',
            iconBg: 'bg-brand-100',
            iconColor: 'text-brand-dark',
        },
        {
            icon: Award,
            title: 'Average Score',
            value: loading ? '...' : `${dashboardData?.averageScore ?? 0}%`,
            change: loading ? '' : `+${dashboardData?.scoreImprovement ?? 0}%`,
            changeLabel: 'improvement',
            iconBg: 'bg-brand-100',
            iconColor: 'text-brand-dark',
        },
        {
            icon: Flame,
            title: 'Current Streak',
            value: loading ? '...' : `${dashboardData?.currentStreak ?? 0} days`,
            change: (dashboardData?.currentStreak ?? 0) > 0 ? 'Keep it up!' : 'Start today!',
            changeLabel: '',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
        },
    ];

    return (
        <div className="flex min-h-screen page-shell">
            <Sidebar />

            <div className="min-w-0 flex-1 pb-24 md:ml-64 md:pb-0">
                <TopBar userName={userName} />

                <main className="space-y-7 p-4 sm:p-6 lg:p-8">
                    <section className="brand-gradient relative overflow-hidden rounded-[2rem] p-6 text-white shadow-lift sm:p-8">
                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-sm font-bold text-brand-50">
                                    <Sparkles size={16} />
                                    Personalized dashboard
                                </div>
                                <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                                    Welcome back, {userName || 'Student'}
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-50/86 sm:text-base">
                                    Track your learning momentum, review performance, and jump into the next best topic.
                                </p>
                            </div>
                            <Link to="/topics" className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-brand-dark shadow-lg transition hover:-translate-y-1">
                                Continue Learning
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </section>

                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </section>

                    <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
                        <div className="premium-card rounded-[2rem] p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-slate-950">Learning Progress</h3>
                                    <p className="text-sm text-slate-500">Weekly activity snapshot</p>
                                </div>
                                <BarChart3 className="text-brand" size={24} />
                            </div>
                            {loading ? (
                                <div className="space-y-3">
                                    <div className="skeleton h-8 rounded-xl" />
                                    <div className="skeleton h-48 rounded-2xl" />
                                </div>
                            ) : (
                                <div className="flex h-64 items-end gap-2 rounded-3xl bg-slate-50 p-5">
                                    {[42, 58, 35, 74, 63, 89, 72, 96, 68, 84, 78, 92].map((height, index) => (
                                        <div key={index} className="flex flex-1 flex-col items-center gap-2">
                                            <div
                                                className="w-full rounded-t-xl bg-gradient-to-t from-brand to-brand-400 transition hover:opacity-80"
                                                style={{ height: `${height}%` }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="premium-card rounded-[2rem] p-6">
                            <h3 className="text-xl font-black text-slate-950">Topic Mastery</h3>
                            <p className="mt-1 text-sm text-slate-500">Your current readiness overview</p>
                            {loading ? (
                                <div className="mt-6 space-y-3">
                                    <div className="skeleton mx-auto h-40 w-40 rounded-full" />
                                    <div className="skeleton h-4 rounded-full" />
                                </div>
                            ) : (
                                <div className="mt-8 flex flex-col items-center">
                                    <div className="grid h-44 w-44 place-items-center rounded-full bg-[conic-gradient(#7c3aed_0_68%,#06b6d4_68%_84%,#e2e8f0_84%_100%)] p-4">
                                        <div className="grid h-full w-full place-items-center rounded-full bg-white text-center">
                                            <span className="text-3xl font-black text-slate-950">{dashboardData?.averageScore ?? 0}%</span>
                                        </div>
                                    </div>
                                    <p className="mt-5 text-center text-sm text-slate-500">
                                        Keep practicing to lift your mastery score.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="premium-card rounded-[2rem] p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-950">Continue Learning</h3>
                                <p className="mt-1 text-sm text-slate-500">Recommended action based on your current activity.</p>
                            </div>
                            <Link to="/ai-tutor" className="btn-secondary px-5 py-3 text-sm text-brand-dark">
                                Ask AI Tutor
                                <Sparkles size={17} />
                            </Link>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

