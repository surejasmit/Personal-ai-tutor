"""
=============================================================
 predict_recommendation.py — Predict Next Topic for a Student
=============================================================
 This script:
   1. Loads the trained model (model.pkl) and label encoder
   2. Accepts quiz result data via command-line arguments
   3. Predicts the recommended next topic
   4. Inserts the recommendation into the database
   5. Prints the result as JSON (for Node.js backend to read)

 Usage:
   python predict_recommendation.py --user_id 1 --topic_id 2 --percentage 45 --score 4 --wrong_answers 6 --time_taken 300
=============================================================
"""

import os
import sys
import json
import argparse
import numpy as np
import psycopg2
from dotenv import load_dotenv
import joblib
import pandas as pd

# -----------------------------------------------
# STEP 1: Load environment variables from .env
# -----------------------------------------------
# Load .env from the same directory as this script
script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(script_dir, ".env"))

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "ai-tutor")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "123456")


def get_db_connection():
    """Creates and returns a PostgreSQL database connection."""
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except psycopg2.Error as e:
        print(json.dumps({
            "success": False,
            "error": f"Database connection failed: {str(e)}"
        }))
        sys.exit(1)


def load_model():
    """
    Loads the trained model and label encoder from .pkl files.
    These files are created by train_model.py.
    """
    model_path = os.path.join(script_dir, "model.pkl")
    encoder_path = os.path.join(script_dir, "label_encoder.pkl")
    
    # Check if model files exist
    if not os.path.exists(model_path):
        print(json.dumps({
            "success": False,
            "error": "model.pkl not found! Run 'python train_model.py' first."
        }))
        sys.exit(1)
    
    if not os.path.exists(encoder_path):
        print(json.dumps({
            "success": False,
            "error": "label_encoder.pkl not found! Run 'python train_model.py' first."
        }))
        sys.exit(1)
    
    model = joblib.load(model_path)
    label_encoder = joblib.load(encoder_path)
    
    return model, label_encoder


def generate_reason(percentage, recommended_topic, current_topic_name):
    """
    Generates a human-readable reason for the recommendation.
    This will be stored in the recommendations table.
    """
    if percentage < 50:
        return (
            f"You scored {percentage}% on '{current_topic_name}'. "
            f"We recommend reviewing '{recommended_topic}' again to strengthen your understanding."
        )
    elif percentage < 80:
        return (
            f"You scored {percentage}% on '{current_topic_name}'. "
            f"Good progress! We recommend moving to '{recommended_topic}' to continue learning."
        )
    else:
        return (
            f"You scored {percentage}% on '{current_topic_name}'. "
            f"Excellent work! You're ready for '{recommended_topic}'."
        )


def get_topic_name(conn, topic_id):
    """Fetches the topic name for a given topic_id from the database."""
    cursor = conn.cursor()
    cursor.execute("SELECT topic_name FROM topics WHERE id = %s;", (topic_id,))
    row = cursor.fetchone()
    if row:
        return row[0]
    return "Unknown Topic"


def insert_recommendation(conn, user_id, recommended_topic, reason):
    """
    Inserts the prediction result into the recommendations table.
    This allows the dashboard to display the latest recommendation.
    """
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO recommendations (user_id, recommended_topic, recommendation_reason, created_at)
            VALUES (%s, %s, %s, NOW());
        """, (user_id, recommended_topic, reason))
        conn.commit()
    except psycopg2.Error as e:
        # Don't crash the prediction if insert fails
        # The prediction result is still returned to Node.js
        print(json.dumps({
            "success": False,
            "error": f"Failed to save recommendation: {str(e)}"
        }), file=sys.stderr)


def predict(user_id, topic_id, percentage, score, wrong_answers, time_taken):
    """
    Main prediction function.
    1. Loads model
    2. Predicts recommended topic
    3. Saves to database
    4. Returns JSON result
    """
    # Load the trained model and label encoder
    model, label_encoder = load_model()
    
    # Connect to database
    conn = get_db_connection()
    
    try:
        # Get the current topic name (for the reason message)
        current_topic_name = get_topic_name(conn, topic_id)
        
        # -----------------------------------------------
        # Prepare the input features for prediction
        # -----------------------------------------------
        # Construct DataFrame with exactly the same features and order as during training
        correct_answers = score
        total_questions = score + wrong_answers
        
        input_dict = {
            'topic_id': [topic_id],
            'score': [score],
            'total_questions': [total_questions],
            'correct_answers': [correct_answers],
            'wrong_answers': [wrong_answers],
            'time_taken': [time_taken],
            'percentage': [percentage]
        }
        input_features = pd.DataFrame(input_dict)
        
        # -----------------------------------------------
        # Make the prediction
        # -----------------------------------------------
        predicted_label = model.predict(input_features)[0]
        
        # Convert the numeric label back to topic name
        recommended_topic = label_encoder.inverse_transform([predicted_label])[0]
        
        # Generate a human-readable reason
        reason = generate_reason(percentage, recommended_topic, current_topic_name)
        
        # -----------------------------------------------
        # Save recommendation to the database
        # -----------------------------------------------
        insert_recommendation(conn, user_id, recommended_topic, reason)
        
        # -----------------------------------------------
        # Output the result as JSON
        # -----------------------------------------------
        # Node.js backend will read this JSON from stdout
        result = {
            "success": True,
            "user_id": user_id,
            "current_topic": current_topic_name,
            "recommended_topic": recommended_topic,
            "recommendation_reason": reason,
            "input_data": {
                "topic_id": topic_id,
                "percentage": percentage,
                "score": score,
                "wrong_answers": wrong_answers,
                "time_taken": time_taken
            }
        }
        
        print(json.dumps(result, indent=2))
    
    finally:
        conn.close()


# ===================================================
#                  MAIN EXECUTION
# ===================================================
if __name__ == "__main__":
    # -----------------------------------------------
    # Parse command-line arguments
    # -----------------------------------------------
    parser = argparse.ArgumentParser(
        description="Predict the next recommended topic for a student."
    )
    parser.add_argument("--user_id", type=int, required=True,
                        help="The student's user ID")
    parser.add_argument("--topic_id", type=int, required=True,
                        help="The topic ID of the quiz just taken")
    parser.add_argument("--percentage", type=int, required=True,
                        help="Quiz score percentage (0-100)")
    parser.add_argument("--score", type=int, required=True,
                        help="Number of correct answers")
    parser.add_argument("--wrong_answers", type=int, required=True,
                        help="Number of wrong answers")
    parser.add_argument("--time_taken", type=int, required=True,
                        help="Time taken in seconds")
    
    args = parser.parse_args()
    
    # Run the prediction
    predict(
        user_id=args.user_id,
        topic_id=args.topic_id,
        percentage=args.percentage,
        score=args.score,
        wrong_answers=args.wrong_answers,
        time_taken=args.time_taken
    )