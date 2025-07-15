import React, { useEffect, useState } from 'react';
import '../styles/StressFeedback.css';

const StressFeedback = () => {
  const [stressLevel, setStressLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_stress_level')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setStressLevel(data.stress_level);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stress level:', err);
        setLoading(false);
      });
  }, []);

  const getFeedback = () => {
    switch (stressLevel) {
      case 'Low':
        return {
          title: '😌 Relaxed and Balanced',
          message: `You are doing great! 
          • Keep maintaining a balance between screen time and rest. 
          • Continue practicing mindfulness or engaging in hobbies you enjoy.
          • Maintain a healthy sleep schedule and keep up the great digital hygiene.`,
          color: 'green',
        };
      case 'Medium':
        return {
          title: '😐 Stay Aware',
          message: `You may be experiencing some stress.
          • Try short breaks every hour to rest your eyes and mind.
          • Avoid multitasking with too many tabs or tasks at once.
          • Consider light physical activity like stretching or a walk.`,
          color: 'orange',
        };
      case 'High':
        return {
          title: '⚠️ High Stress Detected',
          message: `Your stress level appears to be high.
          • Take immediate breaks and limit screen time for the rest of the day.
          • Try meditation, calming music, or guided breathing exercises.
          • Reach out to a friend, mentor, or counselor if needed.
          • Avoid exposure to social media or negative news for a while.`,
          color: 'red',
        };
      default:
        return {
          title: 'Unable to determine stress level',
          message: 'Please try again later.',
          color: 'gray',
        };
    }
  };
  
  const feedback = getFeedback();

  return (
    <div className="feedback-container">
      <div className="feedback-card" style={{ borderColor: feedback.color }}>
        <h1>Personalized Stress Feedback</h1>
        {loading ? (
          <p>Loading feedback...</p>
        ) : (
          <>
            <h2 style={{ color: feedback.color }}>{feedback.title}</h2>
            <p className="feedback-message">{feedback.message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default StressFeedback;
