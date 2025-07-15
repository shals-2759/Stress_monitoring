import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import { Link } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  // Card data with navigation routes
  const cards = [
    { id: 1, title: "Chatbot", description: "Interact with our chatbot.", imageUrl: "/chatbot.png", route: "/chatbot" },
    { id: 2, title: "Screen Time", description: "Track your device usage.", imageUrl: "/screentime.png", route: "/screentime" },
    { id: 3, title: "Stress Levels", description: "Monitor your stress levels.", imageUrl: "/graph.png", route: "/stress-levels" },
    { id: 4, title: "Website Usage", description: "Track your website visits.", imageUrl: "/activity.png", route: "/classified-websites" },
    { id: 5, title: "Statistics", description: "View detailed statistics.", imageUrl: "/features.png", route: "/stress-stats" },
    { id: 6, title: "Personalized Feedback", description: "Get personalized recommendations.", imageUrl: "/tips.png", route: "/feedback" }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    
    <div className="dashboard-container">
      
     
      <div className="welcome-message">
        <h1>Welcome to Your Stress Monitoring Dashboard</h1>
      </div>
      
      <div className="cards-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className="dashboard-card"
            onClick={() => handleCardClick(card.route)}
          >
            <div className="card-image-wrapper">
              <img src={card.imageUrl} alt={card.title} className="card-image" />
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default Dashboard;
