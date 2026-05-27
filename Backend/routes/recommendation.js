const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// If the ML model fails or hasn't been run yet, we provide a fallback recommendation based on the user's latest quiz performance. This ensures that users always receive some guidance on what to study next, even if the ML model isn't available or hasn't been triggered yet.
const buildReason = (percentage, recommendedTopic, currentTopicName) => {
    if (percentage < 50) {
        return `You scored ${percentage}% on '${currentTopicName}'. We recommend reviewing '${recommendedTopic}' again to strengthen your understanding.`;
    }

    if (percentage < 80) {
        return `You scored ${percentage}% on '${currentTopicName}'. Good progress! We recommend moving to '${recommendedTopic}' to continue learning.`;
    }

    return `You scored ${percentage}% on '${currentTopicName}'. Excellent work! You're ready for '${recommendedTopic}'.`;
};

const getFallbackRecommendation = async (userId) => {
    const latestQuizResult = await pool.query(`
        SELECT topic_id, percentage
        FROM quiz_results
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 1
    `, [userId]);

    if (latestQuizResult.rows.length === 0) {
        return null;
    }

    const latestResult = latestQuizResult.rows[0];
    const topicsResult = await pool.query(`
        SELECT id, topic_name
        FROM topics
        ORDER BY id
    `);

    if (topicsResult.rows.length === 0) {
        return null;
    }

    const topicIds = topicsResult.rows.map((topic) => topic.id);
    const topicMap = Object.fromEntries(topicsResult.rows.map((topic) => [topic.id, topic.topic_name]));
    const currentTopicName = topicMap[latestResult.topic_id] || 'Unknown Topic';
    const currentIndex = Math.max(topicIds.indexOf(latestResult.topic_id), 0);

    let recommendedTopicId = latestResult.topic_id;

    if (latestResult.percentage < 50) {
        recommendedTopicId = latestResult.topic_id;
    } else if (latestResult.percentage < 80) {
        recommendedTopicId = topicIds[Math.min(currentIndex + 1, topicIds.length - 1)];
    } else {
        recommendedTopicId = topicIds[Math.min(currentIndex + 2, topicIds.length - 1)];
    }

    const recommendedTopic = topicMap[recommendedTopicId] || currentTopicName;
    const recommendationReason = buildReason(latestResult.percentage, recommendedTopic, currentTopicName);

    await pool.query(`
        INSERT INTO recommendations (user_id, recommended_topic, recommendation_reason, created_at)
        VALUES ($1, $2, $3, NOW())
    `, [userId, recommendedTopic, recommendationReason]);

    return {
        recommended_topic: recommendedTopic,
        recommendation_reason: recommendationReason,
        created_at: new Date().toISOString()
    };
};

// GET latest recommendation for a user

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query(`
            SELECT recommended_topic, recommendation_reason, created_at
            FROM recommendations
            WHERE user_id = $1
            ORDER BY created_at DESC
            LIMIT 1
        `, [userId]);

        if (result.rows.length > 0) {
            return res.json({
                hasRecommendation: true,
                recommendation: result.rows[0]
            });
        }

        const fallbackRecommendation = await getFallbackRecommendation(userId);

        if (fallbackRecommendation) {
            return res.json({
                hasRecommendation: true,
                recommendation: fallbackRecommendation
            });
        }

        return res.json({
            hasRecommendation: false,
            message: 'Take a quiz to get your first recommendation!'
        });
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        res.status(500).json({ error: 'Failed to fetch recommendation' });
    }
});

module.exports = router;
