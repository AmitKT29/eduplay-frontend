import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ActivityLog.css";

// Dummy activity data
const activities = [
  { date: "2025-05-01", activity: "Completed Math Quiz", time: "15 min" },
  { date: "2025-05-02", activity: "Watched Science Video", time: "25 min" },
  { date: "2025-05-03", activity: "Completed English Quiz", time: "20 min" },
  { date: "2025-05-04", activity: "Watched History Video", time: "30 min" },
];

const ActivityLog = () => {
  const navigate = useNavigate();
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [activityType, setActivityType] = useState("");

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setActivityType(type);

    if (type === "") {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter((activity) =>
        activity.activity.toLowerCase().includes(type.toLowerCase())
      );
      setFilteredActivities(filtered);
    }
  };

  return (
    <div className="activity-log-container">
      <button onClick={() => navigate("/dashboard")} className="back-button">
        ⬅ Back to Dashboard
      </button>
      <h2>📜 Activity Log</h2>

      <div className="filter-container">
        <label>Filter by Activity Type: </label>
        <input
          type="text"
          placeholder="Search activity"
          value={activityType}
          onChange={handleFilterChange}
        />
      </div>

      <div className="activity-list">
        {filteredActivities.map((activity, index) => (
          <div key={index} className="activity-item">
            <p><strong>{activity.activity}</strong></p>
            <p>Date: {activity.date}</p>
            <p>Time Spent: {activity.time}</p>
            <button onClick={() => alert("More details coming soon...")}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
