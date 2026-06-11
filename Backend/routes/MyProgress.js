const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/skill-reader/:UserId',async (req, res) => {
    try{
        const {UserId} = req.params;

        const result = await pool.query(
            `select t.topic_name,
                ROUND(avg(qr.percentage)) as avg_score,
                count(qr.id) as attempts
                from quiz_results qr
                join topics t on qr.topic_id = t.id
                where qr.user_id = $1
                group by t.topic_name
                order by avg_score desc
            `,[UserId]
        );

        res.json(
            {skills: result.rows}
        );

    }
    catch(err){
        console.error('Skill reader error:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});


router.get('/heatmap/:UserId',async (req, res) => {
    
    try{

        const {UserId} = req.params;

        const result = await pool.query(
            `select
                TO_CHAR(created_at, 'YYYY-MM-DD') as date,
                count(id) as quiz_count
            from quiz_results
            where user_id = $1
            and created_at >= NOW() - interval '30 days'
            group by TO_CHAR(created_at, 'YYYY-MM-DD')
            order by date asc
            `,[UserId]
        );

        res.json({
            heatmap: result.rows
        });

    }
    catch(err){
        console.error('Heatmap error:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});


router.get('/weekly-comparison/:userId',async (req, res) => {

    try{
        const {userId} = req.params;

        const thisweek = await pool.query(
            `select 
                count(id) as quizzes_taken,
                ROUND(avg(percentage)) as avg_score,
                sum(time_taken) as total_time
            from quiz_results
            where user_id = $1
            and created_at >= NOW() - interval '7 days'
            `,[userId]
        );

        const lastWeek = await pool.query(
            `SELECT 
                COUNT(id) AS quizzes_taken,
                ROUND(AVG(percentage)) AS avg_score,
                SUM(time_taken) AS total_time_seconds
             FROM quiz_results
             WHERE user_id = $1
               AND created_at >= NOW() - INTERVAL '14 days'
               AND created_at < NOW() - INTERVAL '7 days'`,
            [userId]
        );

        const current = thisweek.rows[0];
        const previous = lastWeek.rows[0];

        res.json({
            thisweek : {
                quizzes_taken: Number(current.quizzes_taken || 0),
                avg_score: Number(current.avg_score || 0),
                total_time: Number(current.total_time || 0) 
            },
            lastweek : {
                quizzes_taken: Number(previous.quizzes_taken || 0),
                avg_score: Number(previous.avg_score || 0),
                total_time: Number(previous.total_time_seconds || 0)
            }
        })
    }
    catch(err){
        console.error('Weekly comparison error:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});
// GET /api/progress/topic-journey/:userId
// Returns: quiz score history grouped by topic
router.get('/topic-journey/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            `SELECT 
                t.topic_name,
                qr.percentage,
                qr.created_at,
                qr.time_taken,
                qr.correct_answers,
                qr.total_questions
             FROM quiz_results qr
             JOIN topics t ON t.id = qr.topic_id
             WHERE qr.user_id = $1
             ORDER BY t.topic_name ASC, qr.created_at ASC`,
            [userId]
        );

        // Group results by topic_name
        const grouped = {};
        result.rows.forEach(row => {
            if (!grouped[row.topic_name]) {
                grouped[row.topic_name] = [];
            }
            grouped[row.topic_name].push({
                percentage: row.percentage,
                date: row.created_at,
                timeTaken: row.time_taken,
                correctAnswers: row.correct_answers,
                totalQuestions: row.total_questions
            });
        });

        // Convert to array format
        const journey = Object.keys(grouped).map(topicName => ({
            topic: topicName,
            attempts: grouped[topicName]
        }));

        res.json({ journey });

    } catch (error) {
        console.error('Topic journey error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/progress/timeline/:userId
// Returns: chronological feed of quiz activity
router.get('/timeline/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            `SELECT 
                qr.id,
                t.topic_name,
                qr.percentage,
                qr.score,
                qr.total_questions,
                qr.correct_answers,
                qr.wrong_answers,
                qr.time_taken,
                qr.created_at
             FROM quiz_results qr
             JOIN topics t ON t.id = qr.topic_id
             WHERE qr.user_id = $1
             ORDER BY qr.created_at DESC
             LIMIT 20`,
            [userId]
        );

        res.json({
            timeline: result.rows   // Most recent 20 quiz attempts
        });

    } catch (error) {
        console.error('Timeline error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
