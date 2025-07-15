import React, { useEffect, useState } from 'react';
import '../styles/classifiedwebsites.css';
const ClassifiedWebsites = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    // Fetch classified websites data from the Flask API
    fetch('http://127.0.0.1:5000/get_classified_websites')
      .then(response => response.json())
      .then(data => {
        setWebsites(data.data);
      })
      .catch(error => console.error('Error fetching classified websites:', error));
  }, []);

  return (
    <div>
      <h1>Classified Websites</h1>
      <div>
        {websites.map((item, index) => (
          <div key={index} className="website-item" style={styles.websiteItem}>
            <div className="category" style={styles.category}>
              Category: {item.category}
            </div>
            <div className="url" style={styles.url}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styling
const styles = {
  websiteItem: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
  },
  category: {
    fontWeight: 'bold',
  },
  url: {
    color: 'blue',
    textDecoration: 'underline',
  },
};

export default ClassifiedWebsites;
