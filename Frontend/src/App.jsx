import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TopicSelection from './pages/Topicselection';
import QuizPage from './pages/Quizpage';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
