import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/register.css'; // Style it as needed

const ScreenTime = () => {
  const [websiteData, setWebsiteData] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost/stressmanager/get_screen_time.php')
      .then((res) => {
        if (res.data.status === "success") {
          setWebsiteData(res.data.data);
          setTotalTime(res.data.data.reduce((acc, item) => acc + extractMinutesFromDuration(item.duration), 0)); // Summing durations
        } else {
          setError("Failed to fetch data.");
        }
      })
      .catch((err) => {
        setError("Server error. Please check connection.");
        console.error(err);
      });
  }, []);

  // Extract first digit as minutes
  const extractMinutesFromDuration = (duration) => {
    const firstDigit = duration.toString()[0]; // Extract the first digit as a string
    return parseInt(firstDigit); // Return as integer (minutes)
  };

  // Format time in hours and minutes
  const formatMinutes = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="screen-time-container">
      <h2>Total Screen Time: <span>{formatMinutes(totalTime)}</span></h2>
      {error && <p className="error">{error}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>Time Spent</th>
            </tr>
          </thead>
          <tbody>
            {websiteData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.website}</td>
                <td>{formatMinutes(extractMinutesFromDuration(item.duration))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScreenTime;
