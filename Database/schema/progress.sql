CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    weak_topics TEXT[],
    strong_topics TEXT[],
    average_score INT,
    last_quiz_date TIMESTAMP
);