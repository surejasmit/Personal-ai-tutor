import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Sparkles, BookOpen, Target, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar';
import TopBar from '../components/Dashboard/Topbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const quickPrompts = [
  'Explain my weakest topic in simple words',
  'Give me a 3-day revision plan',
  'Suggest the best topic to study next',
  'Test me with 5 rapid-fire questions',
];

const getStoredUser = () => {
  try {
    const userdata = localStorage.getItem('user');
    return userdata ? JSON.parse(userdata) : null;
  } catch {
    return null;
  }
};

const AITutor = () => {
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const [userName] = useState(() => storedUser?.name || storedUser?.username || storedUser?.email?.split('@')[0] || 'Student');
  const [userId] = useState(() => storedUser?.id || null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const promptCards = useMemo(
    () => [
      {
        title: 'Review weak areas',
        description: 'Focus on the topics where you need the most improvement.',
        icon: Target,
      },
      {
        title: 'Learn faster',
        description: 'Get concise explanations, examples, and revision hints.',
        icon: BookOpen,
      },
      {
        title: 'Personalized support',
        description: 'Use your quiz history to guide the next best step.',
        icon: Sparkles,
      },
    ],
    []
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userdata = localStorage.getItem('user');

    if (!token || !userdata) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/recommendation/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to load AI Tutor recommendation');
          setRecommendation(null);
          return;
        }

        setRecommendation(data);
    } catch {
      setError('Network error while loading AI Tutor');
      setRecommendation(null);
    } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [userId]);

  const handleRefresh = async () => {
    if (!userId) return;

    try {
      setRefreshing(true);
      setError('');

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/recommendation/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to refresh recommendation');
        return;
      }

      setRecommendation(data);
    } catch {
      setError('Network error while refreshing recommendation');
    } finally {
      setRefreshing(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    navigate('/topics', { state: { prompt } });
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e1a] text-white">
      <Sidebar />

      <div className="flex-1 ml-56">
        <TopBar userName={userName} />

        <main className="p-8 space-y-8">
          <section className="bg-[#1a1f2e] border border-white/5 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
                  <Bot size={16} />
                  AI Tutor
                </div>

                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  Welcome back, <span className="text-emerald-400">{userName || 'Student'}</span>
                </h1>
                <p className="mt-3 text-gray-400 text-base md:text-lg max-w-xl">
                  Your AI tutor uses your quiz performance to recommend what to study next and helps you build a focused learning routine.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/topics')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
                  >
                    Start a Quiz
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/10 text-gray-200 hover:bg-white/5 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                    {refreshing ? 'Refreshing...' : 'Refresh Recommendation'}
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-80 bg-[#0f1419] border border-white/5 rounded-2xl p-5">
                <p className="text-sm text-gray-400 mb-2">Today's focus</p>
                <h2 className="text-xl font-bold mb-3">Study smarter, not longer</h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The tutor highlights a next step based on your current progress and recent quiz activity.
                </p>
              </div>
            </div>
          </section>

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300">
              <AlertCircle size={18} className="mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <section className="grid gap-6 lg:grid-cols-3">
            {promptCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-[#1a1f2e] border border-white/5 rounded-xl p-6">
                  <div className="w-11 h-11 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400">{card.description}</p>
                </div>
              );
            })}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-xl font-bold">Personalized Recommendation</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Based on your latest quiz activity
                  </p>
                </div>
                <Sparkles className="text-emerald-400" size={22} />
              </div>

              {loading ? (
                <p className="text-gray-400 text-sm">Loading your recommendation...</p>
              ) : recommendation?.hasRecommendation ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-2">
                      Recommended next topic
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {recommendation.recommendation.recommended_topic}
                    </h3>
                    <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                      {recommendation.recommendation.recommendation_reason}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/topics')}
                      className="px-5 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
                    >
                      Continue Learning
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="px-5 py-3 rounded-lg border border-white/10 text-gray-200 hover:bg-white/5 transition-colors"
                    >
                      View Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-[#0f1419] p-5">
                  <h3 className="text-lg font-semibold mb-2">No recommendation yet</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Take a quiz to unlock your first personalized AI recommendation.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/topics')}
                    className="mt-4 px-5 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
                  >
                    Choose a Topic
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Quick Prompts</h2>
              <div className="space-y-3">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
                  >
                    <span className="text-sm text-gray-200">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AITutor;
