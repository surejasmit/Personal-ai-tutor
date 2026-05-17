CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(id),
    difficulty VARCHAR(20),
    question TEXT NOT NULL,
    option1 TEXT,
    option2 TEXT,
    option3 TEXT,
    option4 TEXT,
    correct_answer TEXT,
    explanation TEXT
);