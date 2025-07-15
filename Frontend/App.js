import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import ClassifiedWebsites from './components/ClassifiedWebsites'; // Import the ClassifiedWebsites component
import ScreenTime from './components/ScreenTime';
import Dashboard from './components/dashboard';
import Chatbot from "./components/Chatbot"; 
import StressLevels from './components/StressLevels';
import StressStats from './components/StressStats';
import StressFeedback from './components/StressFeedback';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/screentime" element={<ScreenTime />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/feedback" element={<StressFeedback />} />
        <Route path="/stress-levels" element={<StressLevels />} />
        <Route path="/stress-stats" element={<StressStats />} />
        <Route path="/classified-websites" element={<ClassifiedWebsites />} /> {/* New route for ClassifiedWebsites */}
      </Routes>
    </Router>
  );
};

export default App;
