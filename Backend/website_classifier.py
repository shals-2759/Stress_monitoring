import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.externals import joblib  # To save/load the model
from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)
import joblib

# Load the trained model
model = joblib.load('website_classifier_model.pkl')

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='learning_tracker'
    )

# Function to fetch websites from activity_log table without categories
def fetch_websites_without_category():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT website FROM activity_log WHERE category IS NULL")
    websites = cursor.fetchall()
    connection.close()
    return websites

# Function to classify websites (use a pre-trained model or train here)
def classify_websites(websites):
    # Assuming the pre-trained model or training happens here
    model = joblib.load('website_classifier_model.pkl')  # Load existing model

    # Assuming the model classifies websites as 'education', 'entertainment', etc.
    classifications = {}
    for website in websites:
        website_name = website['url']
        category = model.predict([website_name])  # Use the model to predict category
        classifications[website_name] = category[0]

    return classifications
def update_classified_data(classified_data):
    connection = get_db_connection()
    cursor = connection.cursor()
    for website, category in classified_data.items():
        cursor.execute(
            "UPDATE activity_log SET category = %s WHERE url = %s",
            (category, website)
        )
    connection.commit()
    connection.close()

# Function to train a model on sample data (can be run once to generate the model)
def train_model():
    # Sample data for training (this should be a better dataset)
    data = {
        'website': ['khanacademy.com', 'netflix.com', 'bbc.com', 'wikipedia.org', 'amazon.com'],
        'category': ['education', 'entertainment', 'news', 'education', 'ecommerce']
    }
    df = pd.DataFrame(data)

    # Define the feature (URL) and target (category)
    X = df['website']
    y = df['category']

    # Train a text classification model using TF-IDF and Naive Bayes
    model = make_pipeline(TfidfVectorizer(), MultinomialNB())
    model.fit(X, y)

    # Save the trained model to a file
    joblib.dump(model, 'website_classifier_model.pkl')
    print("Model trained and saved.")

# API endpoint to fetch and classify data
@app.route('/get_classified_websites', methods=['GET'])
def get_classified_websites():
    websites = fetch_websites_without_category()
    classified_data = classify_websites(websites)

    # Update the database with the classified categories
    update_classified_data(classified_data)

    return jsonify(classified_data)


if __name__ == '__main__':
    app.run(debug=True)

