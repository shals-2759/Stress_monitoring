import mysql.connector
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib
import pandas as pd

# 1. Connect to your MySQL database
def get_training_data():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='learning_tracker'
    )
    query = "SELECT url, category FROM activity_log WHERE category IS NOT NULL"
    df = pd.read_sql(query, conn)
    conn.close()
    return df

# 2. Train and save model
def train_and_save_model():
    df = get_training_data()

    if df.empty:
        print("No labeled data found. Please label websites in your DB first.")
        return

    X = df['url']
    y = df['category']

    model = Pipeline([
        ('vectorizer', CountVectorizer()),
        ('classifier', MultinomialNB())
    ])

    model.fit(X, y)
    joblib.dump(model, 'website_classifier_model.pkl')
    print("✅ Model trained and saved as website_classifier_model.pkl")

if __name__ == "__main__":
    train_and_save_model()
