import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TopicSelection from './pages/Topicselection';
import QuizPage from './pages/Quizpage';
import Profile from './pages/Profile';
import AITutor from './pages/AITutor';
import MyProgress from './pages/MyProgress';
import Chatbot from './pages/Chatbot';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topics" element={<TopicSelection />} />
          <Route path="/quiz/:topicId" element={<QuizPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/progress" element={<MyProgress />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
