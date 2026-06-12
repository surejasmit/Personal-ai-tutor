import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Brain, Database, Network, Code, Layers, Monitor, Cpu, Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/Topbar";

const TopicSelection = () => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [userName, setUserName] = useState('Student');

    const filters = ['All', 'In Progress', 'Not Started', 'Completed'];

    const topicIcons = {
        'AI and ML': Brain,
        'AIML': Brain,
        'Algorithms': Code,
        'Computer Networks': Network,
        'Database': Database,
        'DBMS': Database,
        'Data Structures': Layers,
        'Object-Oriented Programming': Cpu,
        'OOP': Cpu,
        'Operating Systems': Monitor,
        'Operating System': Monitor,
        'Web Development': BookOpen
    };

    const topicColors = {
        'AI and ML': 'from-purple to-purple-dark',
        'AIML': 'from-purple to-purple-dark',
        'Algorithms': 'from-blue-500 to-blue-600',
        'Computer Networks': 'from-cyan-500 to-cyan-600',
        'Database': 'from-accent to-accent-dark',
        'DBMS': 'from-accent to-accent-dark',
        'Data Structures': 'from-amber-400 to-amber-500',
        'Object-Oriented Programming': 'from-rose-500 to-rose-600',
        'OOP': 'from-rose-500 to-rose-600',
        'Operating Systems': 'from-indigo-500 to-indigo-600',
        'Operating System': 'from-indigo-500 to-indigo-600',
        'Web Development': 'from-emerald-500 to-emerald-600',
    };

    const topicDifficulty = {
        'Data Structures': 'Beginner',
        'Algorithms': 'Intermediate',
        'Web Development': 'Beginner',
        'Database': 'Beginner',
        'DBMS': 'Beginner',
        'Computer Networks': 'Intermediate',
        'Operating Systems': 'Intermediate',
        'Operating System': 'Intermediate',
        'AI and ML': 'Advanced',
        'AIML': 'Advanced',
        'Object-Oriented Programming': 'Beginner',
        'OOP': 'Beginner',
    };

    useEffect(() => {
        const userdata = localStorage.getItem('user');
        if (userdata) {
            const user = JSON.parse(userdata);
            setUserName(user.name || user.username || user.email?.split('@')[0] || 'Student');
        }
    }, []);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/quiz/topics`);
                const data = await response.json();
                if (response.ok) {
                    setTopics(data.topics || []);
                } else {
                    console.error('Failed to fetch topics:', data.error);
                    setTopics([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching topics:', error);
                setTopics([]);
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    const handleStartQuiz = (topic) => {
        navigate(`/quiz/${topic.id}`, { state: { topicName: topic.topic_name } });
    };

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'Beginner': return 'text-accent bg-accent/10 border-accent/20';
            case 'Intermediate': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'Advanced': return 'text-purple-light bg-purple/10 border-purple/20';
            default: return 'text-text-muted bg-white/5 border-white/10';
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-bg-primary text-text-primary">
                <Sidebar />
                <div className="flex-1 ml-56">
                    <TopBar userName={userName} />
                    <main className="flex-1 p-8">
                        <div className="flex items-center justify-center h-64">
                            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                        </div>
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
                <main className="flex-1 p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">All Courses</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="flex items-center gap-2 bg-bg-secondary/80 px-3.5 py-2 rounded-xl border border-white/[0.06] w-64">
                                <Search size={16} className="text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="bg-transparent outline-none text-sm w-full text-text-primary placeholder:text-text-muted"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/[0.06] bg-bg-secondary/80 text-text-muted hover:text-text-secondary hover:border-white/10 transition-colors">
                                <SlidersHorizontal size={16} />
                                <span className="text-sm">Filter</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 mb-6">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    filter === f
                                        ? 'bg-accent/15 text-accent border border-accent/20'
                                        : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04] border border-transparent'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Topics Grid */}
                    {topics && topics.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {topics
                                .filter(t => searchQuery === '' || t.topic_name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((topic) => {
                                const Icon = topicIcons[topic.topic_name] || BookOpen;
                                const colorGrad = topicColors[topic.topic_name] || 'from-accent to-accent-dark';
                                const difficulty = topicDifficulty[topic.topic_name] || 'Beginner';
                                const progress = Math.floor(Math.random() * 100);

                                return (
                                    <div
                                        key={topic.id}
                                        className="neon-card p-5 cursor-pointer group"
                                        onClick={() => handleStartQuiz(topic)}
                                    >
                                        {/* Color Header */}
                                        <div className={`w-full h-24 rounded-xl bg-gradient-to-br ${colorGrad} mb-4 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                                            <Icon className="text-white/90" size={28} />
                                        </div>

                                        {/* Topic Name */}
                                        <h3 className="text-base font-semibold mb-1.5 text-text-primary">{topic.topic_name}</h3>

                                        {/* Difficulty Badge */}
                                        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border mb-3 ${getDifficultyColor(difficulty)}`}>
                                            {difficulty}
                                        </span>

                                        {/* Progress */}
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-text-muted">{progress}% Complete</span>
                                            </div>
                                            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full bg-gradient-to-r ${colorGrad} transition-all duration-700`}
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-text-muted">
                                                {topic.question_count || 0} questions
                                            </span>
                                            <span className="text-accent text-xs font-semibold inline-flex items-center gap-1 group-hover:text-accent-light transition-colors">
                                                Start <ChevronRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center py-20">
                            <p className="text-text-muted text-lg">No courses available at the moment.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default TopicSelection;
