import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import '../styles/StressLevels.css';

const StressLevels = () => {
  const [categoryCounts, setCategoryCounts] = useState([]);

  // Simulating fetching data from the backend or an API (replace with your API call)
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get_classified_websites')
      .then((response) => {
        // Here, you should process your response and set the category counts accordingly
        // This is just a placeholder example
        setCategoryCounts([
          { category: 'Entertainment', count: 5 },
          { category: 'Work', count: 8 },
          { category: 'Social Media', count: 10 },
        ]);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="stress-page">
      <h2>Stress Levels Based on Website Usage</h2>
      <div className="charts-container">
        <div className="chart-box">
          <BarChart width={450} height={300} data={categoryCounts}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00c6ff" stopOpacity={1} />
                <stop offset="100%" stopColor="#0072ff" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="url(#barGradient)" />
          </BarChart>
        </div>

        <div className="chart-box">
          <LineChart width={450} height={300} data={categoryCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ff4e50"
              strokeWidth={3}
              dot={{ r: 6, stroke: '#ff6e7f', strokeWidth: 2 }}
            />
          </LineChart>
        </div>

        <div className="chart-box">
          <PieChart width={450} height={300}>
            <Tooltip />
            <Legend />
            <Pie
              data={categoryCounts}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryCounts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", "#ff9f40"][index % 6]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default StressLevels;
