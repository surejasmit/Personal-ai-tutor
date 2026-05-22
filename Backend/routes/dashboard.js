const express = require('express');
const router = express.Router();
const pool = require('../config/db');


router.get('/:userId',async(req,res) => {

    try{
        const { userId } = req.params;

        const quizzesTaken = await pool.query(
            'SELECT COUNT(*) AS total FROM quiz_results WHERE user_id = $1',
            [userId]
        );

        const quizzesThisWeek = await pool.query(

            `SELECT COUNT(*) AS total
                FROM quiz_results
                WHERE user_id = $1
                AND created_at >= NOW() - INTERVAL '7 days'`,
                [userId]);


        const averageScore = await pool.query(
            `SELECT AVG(percentage) AS average
                FROM quiz_results
                WHERE user_id = $1`,
                [userId]
        );

        
        const topicsCompleted = await pool.query(
            `SELECT COUNT(DISTINCT topic_id) AS total
                FROM quiz_results
                WHERE user_id = $1`,
                [userId]
        );

        const topicsThisWeek = await pool.query(
            `SELECT COUNT(DISTINCT topic_id) AS total
                FROM quiz_results
                WHERE user_id = $1
                AND created_at >= NOW() - INTERVAL '7 days'`,
                [userId]
        );

        const lastScore = await pool.query(
            `SELECT percentage
                FROM quiz_results
                WHERE user_id = $1
                ORDER BY created_at DESC
                LIMIT 1`,
                [userId]
        );

        const previousScore = await pool.query(
            `SELECT percentage
                FROM quiz_results
                WHERE user_id = $1
                ORDER BY created_at DESC
                OFFSET 1
                LIMIT 1`,
                [userId]
        );

        const latest = Number(lastScore.rows[0]?.percentage || 0);
        const previous = Number(previousScore.rows[0]?.percentage || 0);


        res.json({
            topicsCompleted: Number(topicsCompleted.rows[0].total),
            topicsThisWeek: Number(topicsThisWeek.rows[0].total),
            quizzesTaken: Number(quizzesTaken.rows[0].total),
            quizzesThisWeek: Number(quizzesThisWeek.rows[0].total),
            averageScore: Math.round(Number(averageScore.rows[0].average || 0)),
            scoreImprovement: latest - previous,
            currentStreak: 0
        })
        
    }
    catch(error){
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;