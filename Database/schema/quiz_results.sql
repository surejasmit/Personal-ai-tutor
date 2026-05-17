CREATE TABLE quiz_results (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    topic_id INT REFERENCES topics(id),
    score INT,
    total_questions INT,
    correct_answers INT,
    wrong_answers INT,
    attempts INT DEFAULT 1,
    time_taken INT,
    difficulty VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);