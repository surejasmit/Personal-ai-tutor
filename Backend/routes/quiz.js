const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/topics', async (req, res) => {
    try {
        const topicsQuery = await pool.query(`
            SELECT 
                t.id,
                t.topic_name,
                t.description,
                COUNT(q.id) as question_count
            FROM topics t
            LEFT JOIN questions q ON t.id = q.topic_id
            GROUP BY t.id, t.topic_name, t.description
            ORDER BY t.topic_name
        `);

        res.json({ topics: topicsQuery.rows });
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Failed to fetch topics' });
    }
});

router.get('/start/:topicId', async (req, res) => {
    try {
        const { topicId } = req.params;

        // Get topic name
        const topicQuery = await pool.query(
            'SELECT topic_name FROM topics WHERE id = $1',
            [topicId]
        );

        if (topicQuery.rows.length === 0) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        // Get 8 random questions (without correct_answer and explanation)
        const questionsQuery = await pool.query(`
            SELECT 
                id as question_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d
            FROM questions
            WHERE topic_id = $1
            ORDER BY RANDOM()
            LIMIT 8
        `, [topicId]);

        if (questionsQuery.rows.length < 8) {
            return res.status(400).json({ error: 'Not enough questions available for this topic' });
        }

        res.json({
            topicId: parseInt(topicId),
            topicName: topicQuery.rows[0].topic_name,
            questions: questionsQuery.rows
        });
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
});

router.post('/submit',async (req, res) => {
    try{
        const {userId,topicId,answers,timeTaken} = req.body;

        if(!userId || !topicId || !Array.isArray(answers) || timeTaken === undefined){
            return  res.status(400).json({error:'Invalid request data'});
        }

        const questionIds = answers.map(a => a.questionId);

        const correctAnswersQuery = await pool.query(`
            SELECT 
                id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_answer,
                explanation
            FROM questions
            WHERE id = ANY($1)
        `, [questionIds]);

        const correctAnswersMap = {};
        correctAnswersQuery.rows.forEach(q => {
            correctAnswersMap[q.id] = q;
        });


        // calculate score and build results

       // Calculate score and build results
        let score = 0;
        const results = answers.map(answer => {
            const question = correctAnswersMap[answer.questionId];
            const isCorrect = answer.selectedAnswer === question.correct_answer;
            
            if (isCorrect) score++;

            return {
                questionId: answer.questionId,
                questionText: question.question,
                options: {
                    A: question.option_a,
                    B: question.option_b,
                    C: question.option_c,
                    D: question.option_d
                },
                userAnswer: answer.selectedAnswer,
                correctAnswer: question.correct_answer,
                isCorrect: isCorrect,
                explanation: question.explanation
            };
        });

        const totalQuestions = answers.length;
        const percentage = Math.round((score / totalQuestions) * 100);

        // Save quiz result to database
        await pool.query(`
            INSERT INTO quiz_results (user_id, topic_id, score, total_questions, correct_answers, wrong_answers, time_taken, percentage, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        `, [userId, topicId, score, totalQuestions, score, totalQuestions - score, timeTaken, percentage]);

        res.json({
            score: score,
            totalQuestions: totalQuestions,
            percentage: percentage,
            timeTaken: timeTaken,
            results: results
        });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Failed to submit quiz' });
    }
});
        
module.exports = router;