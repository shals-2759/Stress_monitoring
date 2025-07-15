import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // reuse same style for consistent design

const Login = () => {
  const [mail_id, setMailId] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost/stressmanager/login.php', {
        mail_id,
        pwd
      });

      if (res.data.status === 'success') {
        alert('Login successful');
        navigate('/dashboard');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Login failed. Please check server or console.");
      console.error(err);
    }
  };

  return (
    
    <div className="wrapper">
      
      <div className="form-container">
        <h2 className="welcome-title">Welcome Back</h2>
        <h2 className="welcome-title">LOGIN TO START</h2>
        <form onSubmit={handleLogin} className="form-box">
          <input
            type="email"
            placeholder="Email"
            value={mail_id}
            onChange={(e) => setMailId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
  
};

export default Login;
