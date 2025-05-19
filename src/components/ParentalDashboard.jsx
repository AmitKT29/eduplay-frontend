import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useNavigate } from "react-router-dom"; // Make sure react-router-dom is installed
import "./ParentalDashboard.css";

const weeklyData = [
  { name: "Week 1", score: 45 },
  { name: "Week 2", score: 60 },
  { name: "Week 3", score: 75 },
  { name: "Week 4", score: 90 },
];

const monthlyData = [
  { date: "01 Apr", progress: 10 },
  { date: "08 Apr", progress: 30 },
  { date: "15 Apr", progress: 55 },
  { date: "22 Apr", progress: 70 },
  { date: "29 Apr", progress: 85 },
];

const tiles = [
  { title: "View Scores", icon: "📊", path: "/view-scores" },
  { title: "Set Goals", icon: "🎯", path: "/set-goals" },
  { title: "Activity Log", icon: "📜", path: "/activity-log" },
  { title: "Messages", icon: "✉️", path: "/messages" },
];


const ParentalDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Parental Dashboard</h2>
        <button className="home-button" onClick={() => navigate("/")}>
          ⬅️ Back to Homepage
        </button>
      </div>

      <div className="tiles-container">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="tile"
            onClick={() => navigate(tile.path)}
            style={{ cursor: "pointer" }}
          >
            <div className="tile-icon">{tile.icon}</div>
            <div className="tile-title">{tile.title}</div>
          </div>
        ))}
      </div>


      <div className="charts-container">
        <div className="chart-box">
          <h3 className="chart-title">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3 className="chart-title">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="progress" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ParentalDashboard;
