import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SetGoals.css";

const SetGoals = () => {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([
    {
      title: "Complete 5 quizzes",
      description: "Finish 5 quizzes this week to improve Math skills.",
      targetDate: "2025-05-18",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.targetDate) {
      setGoals((prev) => [...prev, formData]);
      setFormData({ title: "", description: "", targetDate: "" });
    }
  };

  const handleDeleteGoal = (index) => {
    const updated = [...goals];
    updated.splice(index, 1);
    setGoals(updated);
  };

  return (
    <div className="goals-container">
      <button onClick={() => navigate("/dashboard")} className="back-button">
        ⬅ Back to Dashboard
      </button>
      <h2>🎯 Set Goals</h2>

      <form onSubmit={handleAddGoal} className="goal-form">
        <input
          type="text"
          name="title"
          placeholder="Goal Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Goal Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="targetDate"
          value={formData.targetDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit">➕ Add Goal</button>
      </form>

      <div className="goal-list">
        {goals.map((goal, index) => (
          <div key={index} className="goal-item">
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <small>Target: {goal.targetDate}</small>
            <button onClick={() => handleDeleteGoal(index)}>🗑 Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetGoals;
