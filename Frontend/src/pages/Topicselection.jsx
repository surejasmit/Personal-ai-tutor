import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Brain, Database, Network, Code, Layers, Monitor, Cpu, ArrowRight, Search } from 'lucide-react';
import Sidebar from "../components/Dashboard/Sidebar";

const TopicSelection = () => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleStartQuiz = (topicId) => {
        navigate(`/quiz/${topicId}`);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen page-shell">
                <Sidebar />
                <main className="flex-1 pb-24 md:ml-64 md:pb-0">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="mb-8 h-36 rounded-[2rem] brand-gradient" />
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <div key={item} className="premium-card rounded-3xl p-6">
                                    <div className="skeleton mb-5 h-12 w-12 rounded-2xl" />
                                    <div className="skeleton mb-3 h-5 rounded-full" />
                                    <div className="skeleton h-16 rounded-2xl" />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen page-shell">
            <Sidebar />
            <main className="min-w-0 flex-1 pb-24 md:ml-64 md:pb-0">
                <div className="space-y-7 p-4 sm:p-6 lg:p-8">
                    <section className="brand-gradient rounded-[2rem] p-6 text-white shadow-lift sm:p-8">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-brand-100">Quiz library</p>
                                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Choose your next challenge</h1>
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-50/86 sm:text-base">
                                    Select a subject and start a focused quiz designed to sharpen recall and reveal gaps.
                                </p>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl bg-white/14 px-4 py-3 text-sm font-semibold text-white">
                                <Search size={18} />
                                {topics.length} topics available
                            </div>
                        </div>
                    </section>

                    {topics && topics.length > 0 ? (
                        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {topics.map((topic) => {
                                const Icon = topicIcons[topic.topic_name] || BookOpen;

                                return (
                                    <button
                                        key={topic.id}
                                        type="button"
                                        className="premium-card group rounded-[1.7rem] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
                                        onClick={() => handleStartQuiz(topic.id)}
                                    >
                                        <div className="mb-5 flex items-center justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-dark transition group-hover:bg-brand group-hover:text-white">
                                                <Icon size={24} />
                                            </div>
                                            <ArrowRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand" />
                                        </div>

                                        <h3 className="text-lg font-black text-slate-950">{topic.topic_name}</h3>
                                        <p className="mt-2 line-clamp-3 min-h-16 text-sm leading-6 text-slate-500">
                                            {topic.description || 'Test your knowledge with a focused practice set.'}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                                {topic.question_count || 0} questions
                                            </span>
                                            <span className="text-sm font-extrabold text-brand">Start Quiz</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </section>
                    ) : (
                        <div className="premium-card rounded-[2rem] p-10 text-center">
                            <p className="text-lg font-bold text-slate-800">No topics available at the moment.</p>
                            <p className="mt-2 text-sm text-slate-500">Please check back after topics are added.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TopicSelection;

