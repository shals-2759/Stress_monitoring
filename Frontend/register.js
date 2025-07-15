import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Manage error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message on new attempt
    try {
      const res = await axios.post("http://localhost/stressmanager/register_user.php", {
        username,
        password
      });

      if (res.data.status === "success") {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        setError(res.data.message); // Show error message below the form
      }
    } catch (err) {
      setError("Registration failed. Please try again."); // Catch network or other errors
      console.error(err);
    }
  };

  return (
    <div className="wrapper">
       {/* Wrapper for centering */}
       
      <div className="form-container">
        {/* Welcome statement outside the form */}
        <h2 className="welcome-title">Create Your Account</h2>
        <p className="welcome-description">
          Welcome to our Stress Monitoring System. Please register below to get started.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
  
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
  
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
