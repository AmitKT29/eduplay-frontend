import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./ViewScores.css";

// Dummy data
const allScores = [
  { date: "2025-05-01", subject: "Math", score: 78 },
  { date: "2025-05-02", subject: "English", score: 85 },
  { date: "2025-05-03", subject: "Science", score: 92 },
  { date: "2025-05-04", subject: "Math", score: 88 },
  { date: "2025-05-05", subject: "English", score: 80 },
];

const ViewScores = () => {
  const navigate = useNavigate();
  const [filteredScores, setFilteredScores] = useState(allScores);
  const [dateFilter, setDateFilter] = useState("");

  // Handle date filtering
  useEffect(() => {
    if (dateFilter === "") {
      setFilteredScores(allScores);
    } else {
      const filtered = allScores.filter((item) => item.date === dateFilter);
      setFilteredScores(filtered);
    }
  }, [dateFilter]);

  const averageScore =
    filteredScores.reduce((sum, item) => sum + item.score, 0) /
    (filteredScores.length || 1);

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Date,Subject,Score", ...filteredScores.map((s) => `${s.date},${s.subject},${s.score}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scores_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="scores-container">
      <button onClick={() => navigate("/dashboard")} className="back-button">⬅ Back to Dashboard</button>
      <h2>📊 View Scores</h2>

      <div className="score-header">
        <label>
          Filter by Date:{" "}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </label>
        <button onClick={handleDownload} className="download-button">
          ⬇ Download CSV
        </button>
      </div>

      <div className="average-score">
        Average Score: <strong>{averageScore.toFixed(2)}</strong>
      </div>

      <div className="score-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredScores.map((score, index) => (
              <tr key={index}>
                <td>{score.date}</td>
                <td>{score.subject}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="score-chart">
        <h3>Score Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={filteredScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViewScores;
