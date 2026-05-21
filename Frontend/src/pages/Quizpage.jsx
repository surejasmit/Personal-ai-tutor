import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
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
      <div className="flex min-h-screen bg-[#0a0e14] text-white">
        <Sidebar />

        <main className="flex-1 ml-56 p-8">
          <p className="text-gray-400">Loading quiz...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0e14] text-white">
      <Sidebar />

      <main className="flex-1 ml-56 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Quiz</h1>

          {!submitted && (
            <div className="flex items-center gap-4 text-emerald-400">
              <Clock size={20} />

              <span>{formatTime(timeLeft)}</span>

              <span className="text-gray-400">
                Answered: {Object.keys(answers).length}/{quizData.length}
              </span>
            </div>
          )}
        </div>

        {submitted && results && (
          <div className="mb-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>

            <p className="text-4xl text-emerald-400 font-bold">
              {results.score}/{results.totalQuestions}
            </p>

            <p className="text-gray-300">{results.percentage}% Score</p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Go Dashboard
            </button>
          </div>
        )}

        <div className="space-y-6">
          {quizData.map((question, index) => {
            const qId = question.question_id || question.id;
            return (
              <div
                key={qId}
                className="bg-[#0f1419] border border-white/10 rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold mb-4">
                  {index + 1}. {question.question_text || question.question}
                </h2>

                {[
                  question.option_a || question.option1,
                  question.option_b || question.option2,
                  question.option_c || question.option3,
                  question.option_d || question.option4,
                ].map((option) => (
                  <label
                    key={option}
                    className={`block p-4 mb-3 rounded-lg border cursor-pointer ${
                      answers[qId] === option
                        ? "bg-emerald-500/10 border-emerald-500"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${qId}`}
                      value={option}
                      checked={answers[qId] === option}
                      onChange={() => handleAnswerSelect(qId, option)}
                      disabled={submitted}
                      className="mr-3"
                    />

                    {option}
                  </label>
                ))}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            className="mt-8 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold"
          >
            Submit Quiz
          </button>
        )}
      </main>
    </div>
  );
};

export default QuizPage;