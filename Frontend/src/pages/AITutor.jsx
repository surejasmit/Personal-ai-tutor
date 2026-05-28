import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Sparkles, BookOpen, Target, ArrowRight, RefreshCw, AlertCircle, MessageSquareText } from 'lucide-react';
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
    <div className="flex min-h-screen page-shell">
      <Sidebar />

      <div className="min-w-0 flex-1 pb-24 md:ml-64 md:pb-0">
        <TopBar userName={userName} />

        <main className="space-y-6 p-4 sm:p-6 lg:p-8">
          <section className="brand-gradient rounded-[2rem] p-6 text-white shadow-lift sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-sm font-bold">
                  <Bot size={16} />
                  AI Tutor
                </div>

                <h1 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
                  Welcome back, {userName || 'Student'}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-brand-50/86 md:text-base">
                  Your AI tutor uses quiz performance to recommend what to study next and keep your routine focused.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/topics')}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-brand-dark shadow-lg transition hover:-translate-y-1"
                  >
                    Start a Quiz
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/18 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/16 disabled:opacity-60"
                  >
                    <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>
              </div>

              <div className="dark-card w-full rounded-[1.7rem] p-5 lg:w-80">
                <p className="text-sm font-bold text-brand-200">Today's focus</p>
                <h2 className="mt-2 text-xl font-black text-white">Study smarter, not longer</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  The tutor highlights a next step based on current progress and recent quiz activity.
                </p>
              </div>
            </div>
          </section>

          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
              <AlertCircle size={18} className="mt-0.5" />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          <section className="grid gap-5 lg:grid-cols-3">
            {promptCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="premium-card rounded-[1.7rem] p-6 transition hover:-translate-y-1 hover:shadow-lift">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-dark">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-black text-slate-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{card.description}</p>
                </div>
              );
            })}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
            <div className="premium-card rounded-[2rem] p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-950">Personalized Recommendation</h2>
                  <p className="mt-1 text-sm text-slate-500">Based on your latest quiz activity</p>
                </div>
                <Sparkles className="text-brand" size={22} />
              </div>

              {loading ? (
                <div className="space-y-4">
                  <div className="skeleton h-32 rounded-3xl" />
                  <div className="skeleton h-12 rounded-2xl" />
                </div>
              ) : recommendation?.hasRecommendation ? (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-brand-200 bg-brand-50 p-5">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-brand">
                      Recommended next topic
                    </p>
                    <h3 className="text-2xl font-black text-slate-950">
                      {recommendation.recommendation.recommended_topic}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {recommendation.recommendation.recommendation_reason}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/topics')}
                      className="btn-primary px-5 py-3"
                    >
                      Continue Learning
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="btn-secondary px-5 py-3 text-sm text-slate-700"
                    >
                      View Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-slate-950">No recommendation yet</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Take a quiz to unlock your first personalized AI recommendation.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/topics')}
                    className="btn-primary mt-4 px-5 py-3"
                  >
                    Choose a Topic
                  </button>
                </div>
              )}
            </div>

            <div className="premium-card rounded-[2rem] p-6">
              <div className="mb-4 flex items-center gap-2">
                <MessageSquareText size={21} className="text-brand" />
                <h2 className="text-xl font-black text-slate-950">Quick Prompts</h2>
              </div>
              <div className="space-y-3">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-deep"
                  >
                    {prompt}
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

