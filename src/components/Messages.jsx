import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css";

// Dummy message data
const messages = [
  { id: 1, from: "System", subject: "New Quiz Available", content: "A new math quiz is now available for your child.", date: "2025-05-01", read: false },
  { id: 2, from: "Teacher", subject: "Quiz Feedback", content: "Your child has completed the English quiz. Great job!", date: "2025-05-02", read: true },
  { id: 3, from: "System", subject: "App Update", content: "EduPlay app has been updated with new features.", date: "2025-05-03", read: false },
];

const Messages = () => {
  const navigate = useNavigate();
  const [messageList, setMessageList] = useState(messages);

  const handleDeleteMessage = (id) => {
    const updatedMessages = messageList.filter((message) => message.id !== id);
    setMessageList(updatedMessages);
  };

  const handleMarkAsRead = (id) => {
    const updatedMessages = messageList.map((message) =>
      message.id === id ? { ...message, read: true } : message
    );
    setMessageList(updatedMessages);
  };

  return (
    <div className="messages-container">
      <button onClick={() => navigate("/dashboard")} className="back-button">
        ⬅ Back to Dashboard
      </button>
      <h2>✉️ Messages</h2>

      <div className="message-list">
        {messageList.map((message) => (
          <div
            key={message.id}
            className={`message-item ${message.read ? "read" : "unread"}`}
          >
            <h3>{message.subject}</h3>
            <p><strong>From:</strong> {message.from}</p>
            <p><strong>Date:</strong> {message.date}</p>
            <p>{message.content}</p>
            <div className="message-actions">
              {!message.read && (
                <button onClick={() => handleMarkAsRead(message.id)}>Mark as Read</button>
              )}
              <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => alert("Compose message feature coming soon...")} className="compose-button">
        ✏️ Compose New Message
      </button>
    </div>
  );
};

export default Messages;
