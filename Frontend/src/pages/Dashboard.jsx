import { useState, useEffect } from "react";
import { BookOpen, Target, Award, Flame } from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/Topbar";
import StatsCard from "../components/Dashboard/StatsCard";

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
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

    const stats = [
        {
            icon: BookOpen,
            title: 'Topics Completed',
            value: loading ? '...' : (dashboardData?.topicsCompleted ?? 0).toString(),
            change: loading ? '' : `+${dashboardData?.topicsThisWeek ?? 0}`,
            changeLabel: 'this week',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-400',
        },
        {
            icon: Target,
            title: 'Quizzes Taken',
            value: loading ? '...' : (dashboardData?.quizzesTaken ?? 0).toString(),
            change: loading ? '' : `+${dashboardData?.quizzesThisWeek ?? 0}`,
            changeLabel: 'this week',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-400',
        },
        {
            icon: Award,
            title: 'Average Score',
            value: loading ? '...' : `${dashboardData?.averageScore ?? 0}%`,
            change: loading ? '' : `+${dashboardData?.scoreImprovement ?? 0}%`,
            changeLabel: 'improvement',
            iconBg: 'bg-purple-500/10',
            iconColor: 'text-purple-400',
        },
        {
            icon: Flame,
            title: 'Current Streak',
            value: loading ? '...' : `${dashboardData?.currentStreak ?? 0} days`,
            change: (dashboardData?.currentStreak ?? 0) > 0 ? 'Keep it up!' : 'Start today!',
            changeLabel: '🔥',
            iconBg: 'bg-orange-500/10',
            iconColor: 'text-orange-400',
        },
    ];

    return (
        <div className="flex min-h-screen bg-[#0a0e1a]">
            <Sidebar />

            <div className="flex-1 ml-56">
                <TopBar userName={userName} />

                <main className="p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome back, <span className="text-emerald-400">{userName}!</span> 👋
                        </h1>
                        <p className="text-gray-400">Keep learning, keep growing. You're doing great!</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="col-span-2 bg-[#1a1f2e] rounded-xl p-6 border border-white/5 h-96">
                            <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
                            {loading ? (
                                <p className="text-gray-400 text-sm">Loading...</p>
                            ) : (
                                <p className="text-gray-400 text-sm">Chart will go here</p>
                            )}
                        </div>
                        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-white/5 h-96">
                            <h3 className="text-lg font-semibold mb-4">Topic Mastery</h3>
                            {loading ? (
                                <p className="text-gray-400 text-sm">Loading...</p>
                            ) : (
                                <p className="text-gray-400 text-sm">Donut chart will go here</p>
                            )}
                        </div>
                    </div>

                    {/* Continue Learning */}
                    <div className="bg-[#1a1f2e] rounded-xl p-6 border border-white/5">
                        <h3 className="text-lg font-semibold mb-4">Continue Learning</h3>
                        {loading ? (
                            <p className="text-gray-400 text-sm">Loading...</p>
                        ) : (
                            <p className="text-gray-400 text-sm">Course cards will go here</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

