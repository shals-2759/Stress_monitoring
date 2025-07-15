import React, { useEffect, useState } from 'react';
import '../styles/StressStats.css';

const StressStatistics = () => {
  const [stressLevel, setStressLevel] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_stress_level')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setStressLevel(data.stress_level);
          setCategoryCounts(data.category_counts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching stress level:', error);
        setLoading(false);
      });
  }, []);

  const getMessage = () => {
    if (stressLevel === 'Low') {
      return "🎉 Great! Your stress level is low. Keep up the good balance!";
    } else if (stressLevel === 'Medium') {
      return "😐 Your stress level is moderate. Try to relax occasionally.";
    } else if (stressLevel === 'High') {
      return "⚠️ Your stress level is high. Consider taking a break and relaxing.";
    } else {
      return "";
    }
  };

  return (
    <div className="stress-statistics-container">
      <div className="stats-card">
        <h1>Stress Level Statistics</h1>
        {loading ? (
          <p>Loading your stress level...</p>
        ) : stressLevel ? (
          <>
            <h2>
              Your Stress Level:{' '}
              <span className={`level-${stressLevel.toLowerCase()}`}>
                {stressLevel}
              </span>
            </h2>
            <p className="message">{getMessage()}</p>
            <h3>Website Category Counts:</h3>
            <ul>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <li key={category}>
                  <strong>{category}</strong>: {count}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Could not determine stress level.</p>
        )}
      </div>
    </div>
  );
};

export default StressStatistics;
