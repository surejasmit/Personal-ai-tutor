const express = require('express');
const router = express.Router();
const pool = require('./confing/db');

router.get('/skill-reader/:UserId',async (req, res) => {
    try{
        const {UserId} = req.params;

        const result = await pool.query(
            `select t.topic_name,
                ROUND(avg(qr.precentage)) as avg_score,
                count(qr.id) as attempts
                from quiz_results qr
                join topic t on qr.topic_id = t.id
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
                DATE(created_at) as date,
                count(id) as quiz_count
            from quiz_results
            where user_id = $1
            and created_at >= current_date - interval '30 days'
            group by DATE(created_at)
            order by date asc
            `,[UserId]
        );

        res.json({
            heatmap: result.rows
        });

    }
    catch(err){
        console.error('Heatmap error:', err);
        res.error(500).json({error: 'Internal server error'});
    }
});


router.get('/weekly-comparison/:userId',async (req, res) => {

    try{
        const {userId} = req.params;

        const thisweek = await pool.query(
            `select 
                count(id) as quizzes_taken
                ROUND(avg(precentage)) as avg_score
                sum(time_taken) as total_time
            from quiz_results
            where user_id = $1
            and created_at >= current_date - interval '7 days'
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
                total_time: Number(previous.total_time || 0)
            }
        })
    }
    catch(err){
        console.error('Weekly comparison error:', err);
        res.json(500).json({error: 'Internal server error'});
    }


});