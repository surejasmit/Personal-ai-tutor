from sklearn.metrics import classification_report, confusion_matrix,accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from dotenv import load_dotenv
import pandas as pd
import psycopg2
import joblib
import sys
import os

# Load enviroment variables From .env file

load_dotenv()

DB_USER = os.getenv("DB_USER","localhost")
DB_HOST = os.getenv("DB_HOST","localhost")
DB_NAME = os.getenv("DB_NAME","postgres")
DB_password = os.getenv("DB_PASSWORD","123456")
DB_PORT = os.getenv("DB_PORT","5432")

def get_db_connection():
    try:
        connection = psycopg2.connect(
            user=DB_USER,
            password=DB_password,
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME
        )
        print("Database connection successful")
        return connection
    except Exception as e:
        print(f"Error connecting to database: {e}")
        sys.exit(1)

def fetch_quiz_data(connection):

    query = """
    SELECT 
        qr.user_id,
        qr.topic_id,
        qr.score,
        qr.total_questions,
        qr.correct_answers,
        qr.wrong_answers,
        qr.time_taken,
        qr.percentage,
        t.topic_name
    FROM quiz_results qr
    JOIN topics t ON qr.topic_id = t.id
    ORDER BY qr.created_at;
    """
    
    try:
        df = pd.read_sql_query(query, connection)
        print("Data fetched successfully")
        return df
    except Exception as e:
        print(f"Error fetching data: {e}")
        sys.exit(1)


def get_all_topic(connection):
    query = "SELECT id, topic_name FROM topics order by id;"
    try:
        topics_df = pd.read_sql_query(query, connection)
        print("Topics fetched successfully")
        return topics_df
    except Exception as e:
        print(f"Error fetching topics: {e}")
        sys.exit(1)


def create_target_variable(df,topics_df):
    # Create a sorted list of all topic IDs
    sorted_topic_ids = topics_df.sort_values("id")["id"].tolist()
    
    # Create a mapping: topic_id → topic_name
    id_to_name = dict(zip(topics_df["id"], topics_df["topic_name"]))
    
    recommended_topics = []
    
    for _, row in df.iterrows():
        current_topic_id = row["topic_id"]
        percentage = row["percentage"]
        
        # Find the index of the current topic in the sorted list
        if current_topic_id in sorted_topic_ids:
            current_index = sorted_topic_ids.index(current_topic_id)
        else:
            # If topic not found, recommend the same topic
            current_index = 0
        
        if percentage < 50:
            # ❌ Low score: Recommend the SAME topic again (needs review)
            recommended_id = current_topic_id
        elif percentage < 80:
            # ⚠️ Medium score: Recommend the NEXT topic
            next_index = min(current_index + 1, len(sorted_topic_ids) - 1)
            recommended_id = sorted_topic_ids[next_index]
        else:
            # ✅ High score: Recommend topic AFTER next (skip ahead)
            next_index = min(current_index + 2, len(sorted_topic_ids) - 1)
            recommended_id = sorted_topic_ids[next_index]
        
        # Get the topic name for the recommended topic
        recommended_name = id_to_name.get(recommended_id, "Unknown")
        recommended_topics.append(recommended_name)
    
    # Add the new column to the DataFrame
    df["recommended_topic"] = recommended_topics
    print("Target labels (recommended_topic) created successfully!")
    return df

def train_model(df):
    
    Feature = ['topic_id','score','total_questions','correct_answers','wrong_answers','time_taken','percentage']
    x = df[Feature]
    
    label_encoder = LabelEncoder()    
    # Encode the target variable
    y = label_encoder.fit_transform(df['recommended_topic'])

    print(f"\nDataset Summary:")
    print(f"   Total samples: {len(x)}")
    print(f"   Features: {Feature}")
    print(f"   Unique recommended topics: {len(label_encoder.classes_)}")
    print(f"   Topic labels: {list(label_encoder.classes_)}")
    
    if len(x) < 10:
        print("\nVery few samples! Using all data for training (no test split).")
        X_train, X_test = x, x
        y_train, y_test = y, y
    else:
        X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)
        print(f"\nTrain/Test Split:")
        print(f"   Training samples: {len(X_train)}")
        print(f"   Testing samples: {len(X_test)}")
        
    
    model = RandomForestClassifier(n_estimators=100, random_state=42,max_depth=10)
    print("\nTraining RandomForestClassifier...")
    model.fit(X_train, y_train)
    print("Model trained successfully!")
    
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print("Model accuracy: {:.2f}%".format(accuracy * 100))
    
    if len(x) >= 10:
        try:
            print("\nClassification Report:")
            print(classification_report(
                y_test, y_pred,
                target_names=label_encoder.classes_,
                zero_division=0
            ))
        except Exception as e:
            print(f"Could not generate classification report: {e}")
    
    return model, label_encoder

def save_model(model, label_encoder):
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, "model.pkl")
    label_encoder_path = os.path.join(script_dir, "label_encoder.pkl")
    joblib.dump(model, model_path)
    joblib.dump(label_encoder, label_encoder_path)

    print(f"\nModel saved to: {model_path}")
    print(f"Label encoder saved to: {label_encoder_path}")


def generate_sample_data(conn):
    """
    If the database has no quiz results, insert some sample/fake data
    so the model can be trained for testing purposes.
    """
    cursor = conn.cursor()
    
    # Check if quiz_results table has any data
    cursor.execute("SELECT COUNT(*) FROM quiz_results;")
    count = cursor.fetchone()[0]
    
    if count > 0:
        print(f"Database already has {count} quiz result(s). Skipping sample data.")
        return False
    
    # Check how many topics exist
    cursor.execute("SELECT COUNT(*) FROM topics;")
    topic_count = cursor.fetchone()[0]
    
    if topic_count == 0:
        print("No topics found in the database! Please add topics first.")
        return False
    
    # Get all topic IDs
    cursor.execute("SELECT id FROM topics ORDER BY id;")
    topic_ids = [row[0] for row in cursor.fetchall()]
    
    # Check if at least one user exists
    cursor.execute("SELECT id FROM users LIMIT 1;")
    user_row = cursor.fetchone()
    
    if user_row is None:
        print("No users found in the database! Please register a user first.")
        return False
    
    user_id = user_row[0]
    
    print(f"\nGenerating sample quiz results for user_id={user_id}...")
    
    # Sample quiz results with different performance levels
    import random
    random.seed(42)
    
    sample_data = []
    for topic_id in topic_ids:
        # Generate 3-5 quiz attempts per topic with varying scores
        for _ in range(random.randint(3, 5)):
            total_q = 8
            correct = random.randint(1, 8)
            wrong = total_q - correct
            score = correct
            percentage = round((correct / total_q) * 100)
            time_taken = random.randint(120, 600)  # 2 to 10 minutes in seconds
            
            sample_data.append(
                (user_id, topic_id, score, total_q, correct, wrong, time_taken, percentage)
            )
    
    # Insert sample data
    insert_query = """
        INSERT INTO quiz_results 
            (user_id, topic_id, score, total_questions, correct_answers, 
             wrong_answers, time_taken, percentage, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW());
    """
    
    # psycopg2 uses %s placeholders, not $1
    insert_query_pg = """
        INSERT INTO quiz_results 
            (user_id, topic_id, score, total_questions, correct_answers, 
             wrong_answers, time_taken, percentage, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW());
    """
    
    for data in sample_data:
        cursor.execute(insert_query_pg, data)
    
    conn.commit()
    print(f"Inserted {len(sample_data)} sample quiz results into the database!")
    return True

# ===================================================
#                  MAIN EXECUTION
# ===================================================

if __name__ == "__main__":
    print("=" * 60)
    print("   Personalized AI Tutor - Model Training Script")
    print("=" * 60)
    

conn = get_db_connection()

try:
    generate_sample_data(conn)
    topics_df = get_all_topic(conn)
    if len(topics_df) < 2:
            print("Need at least 2 topics in the database for recommendations!")
            sys.exit(1)
            
    
    df = fetch_quiz_data(conn)
    if len(df) == 0:
        print("No quiz results found! Take some quizzes first, or the")
        print("sample data generator will create fake data on next run.")
        sys.exit(1)
    
    df = create_target_variable(df, topics_df)
    
    model, label_encoder = train_model(df)
    
    save_model(model, label_encoder)
    
    print("\n" + "=" * 60)
    print("  Training complete! You can now use predict_recommendation.py")
    print("=" * 60)

finally:
    # Always close the database connection
    conn.close()
    print("\nDatabase connection closed.")