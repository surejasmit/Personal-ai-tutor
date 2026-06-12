import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/Topbar";
import { useLocation } from "react-router-dom";
const QuizPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [topicName, setTopicName] = useState(() => location.state?.topicName || "");
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    const userdata = localStorage.getItem('user');
    if (userdata) {
      const user = JSON.parse(userdata);
      setUserName(user.name || user.username || user.email?.split('@')[0] || 'Student');
    }
  }, []);

  const submitQuiz = useCallback(async () => {
    if (submitted || quizData.length === 0) return;

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        alert("User not found. Please login again.");
        navigate("/login");
        return;
      }

      const answersArray = quizData.map((q) => ({
        questionId: q.question_id || q.id,
        selectedAnswer: answers[q.question_id || q.id] || null,
      }));

      const response = await fetch(`${API_URL}/api/quiz/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          topicId: Number(topicId),
          answers: answersArray,
          timeTaken: 600 - timeLeft,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz");
    }
  }, [answers, navigate, quizData, submitted, timeLeft, topicId]);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        const response = await fetch(`${API_URL}/api/quiz/start/${topicId}`);

        const data = await response.json();

        if (response.ok) {
          setQuizData(data.questions || data);
          if (data.topicName) {
            setTopicName(data.topicName);
          }
        } else {
          alert(data.error || "Failed to load quiz");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        alert("Failed to load quiz");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, [topicId, navigate]);

  useEffect(() => {
    if (loading || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, submitted, submitQuiz]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    if (submitted) return;

    setAnswers({
      ...answers,
      [questionId]: selectedAnswer,
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== quizData.length) {
      alert("Please answer all questions.");
      return;
    }

    submitQuiz();
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

  const currentQ = quizData[currentQuestion];
  const qId = currentQ?.question_id || currentQ?.id;
  const options = currentQ ? [
    currentQ.option_a || currentQ.option1,
    currentQ.option_b || currentQ.option2,
    currentQ.option_c || currentQ.option3,
    currentQ.option_d || currentQ.option4,
  ] : [];

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary">
      <Sidebar />

      <div className="flex-1 ml-56">
        <TopBar userName={userName} />
        <main className="flex-1 p-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate('/quizzes')}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              <ChevronLeft size={16} />
              Back to Quizzes
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">{topicName}</h1>
              {!submitted && (
                <p className="text-sm text-text-muted">
                  Question {currentQuestion + 1} of {quizData.length}
                </p>
              )}
            </div>
            {!submitted && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-secondary border border-white/[0.06]">
                <Clock size={16} className="text-accent" />
                <span className="text-sm font-mono font-semibold text-accent">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {!submitted && (
            <div className="w-full h-1 rounded-full bg-white/[0.06] mb-8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              />
            </div>
          )}

          {/* Results */}
          {submitted && results && (
            <div className="mb-8 neon-card neon-border-green p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-5xl text-accent font-bold text-glow-green mb-1">
                {results.score}/{results.totalQuestions}
              </p>
              <p className="text-text-muted mb-6">{results.percentage}% Score</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-3 rounded-xl btn-neon font-semibold"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate("/topics")}
                  className="px-6 py-3 rounded-xl border border-white/[0.08] text-text-secondary hover:bg-white/[0.04] transition-colors"
                >
                  Try Another Quiz
                </button>
              </div>
            </div>
          )}

          {/* Current Question */}
          {!submitted && currentQ && (
            <div className="neon-card p-6 mb-6">
              <h2 className="text-lg font-semibold mb-6 leading-relaxed">
                {currentQ.question_text || currentQ.question}
              </h2>

              <div className="space-y-3">
                {options.map((option, idx) => {
                  const labels = ['A', 'B', 'C', 'D'];
                  const isSelected = answers[qId] === option;
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-accent/10 border-accent/30"
                          : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? 'border-accent bg-accent text-bg-primary'
                          : 'border-white/20 text-text-muted'
                      }`}>
                        <span className="text-xs font-bold">{labels[idx]}</span>
                      </div>
                      <input
                        type="radio"
                        name={`question-${qId}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(qId, option)}
                        disabled={submitted}
                        className="sr-only"
                      />
                      <span className={`text-sm ${isSelected ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Explanation Box (shown after submission) */}
          {submitted && currentQ && (
            <div className="neon-card neon-border-green p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} className="text-accent" />
                <span className="text-sm font-semibold text-accent">Explanation</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Review your answers above. Each question tests a fundamental concept. Keep practicing to improve your understanding.
              </p>
            </div>
          )}

          {/* Navigation */}
          {!submitted && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-text-secondary hover:bg-white/[0.04] transition-colors disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {currentQuestion === quizData.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-xl btn-neon font-semibold"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(Math.min(quizData.length - 1, currentQuestion + 1))}
                  className="px-5 py-2.5 rounded-xl btn-neon font-semibold inline-flex items-center gap-2"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuizPage;