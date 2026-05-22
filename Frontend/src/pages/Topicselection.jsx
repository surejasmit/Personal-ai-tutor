import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Brain, Database, Network, Code, Layers, Monitor, Cpu } from 'lucide-react';
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
            <div className="flex min-h-screen bg-[#0a0e14]">
                <Sidebar />
                <main className="flex-1 ml-56 p-8">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-gray-400 text-xl">Loading topics...</div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#0a0e14] text-white">
            <Sidebar />
            <main className="flex-1 ml-56 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Quiz Topics</h1>
                    <p className="text-gray-400">Select a topic to start your quiz</p>
                </div>

                {/* Topics Grid */}
                {topics && topics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {topics.map((topic) => {
                            const Icon = topicIcons[topic.topic_name] || BookOpen;

                            return (
                                <div
                                    key={topic.id}
                                    className="bg-[#0f1419] border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer group"
                                    onClick={() => handleStartQuiz(topic.id)}
                                >
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-all">
                                        <Icon className="text-emerald-400" size={24} />
                                    </div>

                                    {/* Topic Name */}
                                    <h3 className="text-lg font-semibold mb-2">{topic.topic_name}</h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {topic.description || 'Test your knowledge'}
                                    </p>

                                    {/* Question Count */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            {topic.question_count || 0} questions
                                        </span>
                                        <button className="text-emerald-400 text-sm font-medium group-hover:text-emerald-300">
                                            Start Quiz →
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-400 text-lg">No topics available at the moment.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TopicSelection;
