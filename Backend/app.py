from flask import Flask, jsonify
import mysql.connector
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ Connect to MySQL
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='learning_tracker'
    )

# ✅ Fetch distinct website URLs
def fetch_websites():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT DISTINCT url FROM activity_log")
    websites = cursor.fetchall()
    conn.close()
    return websites

# ✅ Classify websites using model
def classify_websites(websites):
    model = joblib.load('website_classifier_model.pkl')  # Make sure this file exists
    website_urls = [item['url'] for item in websites]

    # Predictions
    predictions = model.predict(website_urls)

    classified = []
    for i, website in enumerate(website_urls):
        classified.append({
            'url': website,
            'category': predictions[i]
        })
    return classified

# ✅ Route 1: Return classified websites (used for graphs)
@app.route('/get_classified_websites', methods=['GET'])
def get_classified():
    websites = fetch_websites()
    classified_data = classify_websites(websites)
    return jsonify({
        'status': 'success',
        'data': classified_data
    })

# ✅ Route 2: Return stress level statistics
@app.route('/get_stress_level', methods=['GET'])
def get_stress_level():
    websites = fetch_websites()
    classified_data = classify_websites(websites)

    # Count categories (e.g., harmful, productive)
    category_counts = {}
    for item in classified_data:
        cat = item['category']
        category_counts[cat] = category_counts.get(cat, 0) + 1

    # Simple logic to determine stress level (adjust as needed)
    stressful_categories = ['harmful', 'Education', 'adult', 'entertainment']
    stress_score = sum([count for cat, count in category_counts.items() if cat.lower() in stressful_categories])

    if stress_score <= 3:
        stress_level = "Low"
    elif stress_score <= 6:
        stress_level = "Medium"
    else:
        stress_level = "High"

    return jsonify({
        'status': 'success',
        'stress_level': stress_level,
        'category_counts': category_counts
    })

if __name__ == '__main__':
    app.run(debug=True)
