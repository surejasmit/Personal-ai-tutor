const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());

// Routing For Login and Registration
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Routing For Dashboard
const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

// quizz routes
const quizRoutes = require('./routes/quiz');
app.use('/api/quiz', quizRoutes);

// profile routes
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

// recommendation routes
const recommendationRoutes = require('./routes/recommendation')
app.use('/api/recommendation', recommendationRoutes);

// My progress routes
const myProgressRoutes = require('./routes/MyProgress');
app.use('/api/myprogress', myProgressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});