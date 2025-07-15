import React, { useState } from "react";
import "../styles/chatbot.css";
import { Link } from "react-router-dom";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const predefinedResponses = {
    "what is stress": "Stress is a physical, mental, or emotional response to events that cause feelings of tension or pressure. It can be caused by both good and bad experiences, but it is often related to challenges or difficulties in life.",
    "how to manage stress": "Stress management techniques include physical activities like exercise, practicing relaxation methods such as meditation or yoga, and ensuring you have a balanced lifestyle with proper sleep, nutrition, and social support.",
    "what are the symptoms of stress": "Common symptoms of stress include headaches, fatigue, irritability, difficulty concentrating, and changes in appetite. Chronic stress can lead to more serious health problems like heart disease.",
    "what are the types of stress": "There are three main types of stress: acute stress, episodic stress, and chronic stress. Acute stress is short-term and often caused by immediate challenges. Episodic stress occurs when a person experiences frequent episodes of stress. Chronic stress lasts for a long period and can be harmful to health.",
    "how to reduce stress": "To reduce stress, try regular physical activity, deep breathing exercises, maintaining a healthy work-life balance, and seeking professional help if needed. Spending time with loved ones can also provide emotional support and reduce stress.",
    "how to prevent stress": "To prevent stress, focus on maintaining a balanced lifestyle, including regular exercise, proper sleep, healthy eating, and practicing mindfulness techniques such as meditation or yoga. Time management skills can also help avoid stress-inducing situations.",
    "how to relieve stress": "Stress relief techniques include mindfulness, meditation, journaling, breathing exercises, taking breaks, and engaging in hobbies or creative activities that bring joy and relaxation."
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");

    // Convert the user's input to lowercase for case-insensitive matching
    const userQuery = input.toLowerCase().trim();

    const aiText = predefinedResponses[userQuery] || "Sorry, I couldn't understand that. Can you ask something else related to stress?";
    const aiMsg = { sender: "ai", text: aiText };
    setChat((prev) => [...prev, aiMsg]);
  };

  return (
    
    <div className="chatbot-container">
      <h2>Stress Assistant Chatbot</h2>
      <div className="chat-window">
        {chat.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
