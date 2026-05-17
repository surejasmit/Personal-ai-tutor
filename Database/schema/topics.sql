CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    topic_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);