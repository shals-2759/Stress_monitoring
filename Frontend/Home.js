import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const openExtension = () => {
    // Fetch the zip file from the backend to trigger the download
    fetch('http://localhost/learningtracker/download_extension.php')  // Backend endpoint for the extension
      .then(response => response.blob())  // Get the response as a blob (zip file)
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'chrome_extension_tracker.zip';  // Specify file name for download
        document.body.appendChild(a);
        a.click();  // Trigger the download
        window.URL.revokeObjectURL(url);  // Clean up the object URL
      })
      .catch(err => {
        console.error("Error downloading the extension:", err);
      });
  };

  return (
    <div className="home">
      <nav className="navbar">
        <h1><img src="/yes.jpg" alt="stress image" width="80" height="50"/>STRESS MANAGEMENT SYSTEM </h1>
        <div className="nav-links">
          
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="content">
        <h2>Welcome to the Stress Monitoring System</h2>
        <img src="/stress.png" alt="stress image" width="200" height="200"/>
        <p>
          
        </p>


        <p>
          This platform helps you track your browsing behavior, monitor stress patterns,
          and provide real-time insights into your digital habits. Register or log in to get started.
        </p>
        
      </div>
    </div>
  );
};

export default Home;
