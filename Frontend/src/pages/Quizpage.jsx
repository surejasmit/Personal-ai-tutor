import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Trophy } from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar";

const QuizPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

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

    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
      <div className="flex min-h-screen page-shell">
        <Sidebar />

        <main className="flex-1 pb-24 md:ml-64 md:pb-0">
          <div className="space-y-5 p-4 sm:p-6 lg:p-8">
            <div className="skeleton h-32 rounded-[2rem]" />
            {[1, 2, 3].map((item) => (
              <div key={item} className="premium-card rounded-[2rem] p-6">
                <div className="skeleton mb-5 h-6 rounded-full" />
                <div className="space-y-3">
                  <div className="skeleton h-12 rounded-2xl" />
                  <div className="skeleton h-12 rounded-2xl" />
                  <div className="skeleton h-12 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progress = quizData.length ? (answeredCount / quizData.length) * 100 : 0;

  return (
    <div className="flex min-h-screen page-shell">
      <Sidebar />

      <main className="min-w-0 flex-1 pb-24 md:ml-64 md:pb-0">
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
          <section className="brand-gradient rounded-[2rem] p-6 text-white shadow-lift sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-brand-100">Assessment</p>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Quiz Session</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-50/86 sm:text-base">
                  Answer every question before submitting. Your result updates your learning progress.
                </p>
              </div>

              {!submitted && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/14 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Clock size={18} />
                      {formatTime(timeLeft)}
                    </div>
                    <p className="mt-1 text-xs text-brand-100">Time remaining</p>
                  </div>
                  <div className="rounded-2xl bg-white/14 px-4 py-3">
                    <div className="text-sm font-bold">{answeredCount}/{quizData.length}</div>
                    <p className="mt-1 text-xs text-brand-100">Answered</p>
                  </div>
                </div>
              )}
            </div>

            {!submitted && (
              <div className="mt-6 h-2 rounded-full bg-white/18">
                <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
              </div>
            )}
          </section>

          {submitted && results && (
            <section className="premium-card rounded-[2rem] p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-100 text-brand-dark">
                <Trophy size={30} />
              </div>
              <h2 className="text-2xl font-black text-slate-950">Quiz Completed</h2>
              <p className="mt-3 text-5xl font-black text-brand">
                {results.score}/{results.totalQuestions}
              </p>
              <p className="mt-2 text-slate-500">{results.percentage}% Score</p>
              <button
                onClick={() => navigate("/dashboard")}
                className="btn-primary mt-6 px-6 py-3"
              >
                Go Dashboard
              </button>
            </section>
          )}

          <section className="space-y-5">
            {quizData.map((question, index) => {
              const qId = question.question_id || question.id;
              const options = [
                question.option_a || question.option1,
                question.option_b || question.option2,
                question.option_c || question.option3,
                question.option_d || question.option4,
              ];

              return (
                <div key={qId} className="premium-card rounded-[2rem] p-5 sm:p-6">
                  <div className="mb-5 flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <h2 className="pt-1 text-base font-black leading-7 text-slate-950 sm:text-lg">
                      {question.question_text || question.question}
                    </h2>
                  </div>

                  <div className="grid gap-3">
                    {options.map((option, optionIndex) => (
                      <label
                        key={`${qId}-${optionIndex}`}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-semibold transition ${
                          answers[qId] === option
                            ? "border-brand-400 bg-brand-50 text-brand-deep shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50/60"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${qId}`}
                          value={option}
                          checked={answers[qId] === option}
                          onChange={() => handleAnswerSelect(qId, option)}
                          disabled={submitted}
                          className="h-4 w-4 accent-brand"
                        />
                        <span className="flex-1">{option}</span>
                        {answers[qId] === option && <CheckCircle2 size={18} className="text-brand" />}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {!submitted && (
            <button onClick={handleSubmit} className="btn-primary px-8 py-4">
              Submit Quiz
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;

