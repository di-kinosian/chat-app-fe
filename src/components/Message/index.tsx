import React from "react";
import "./index.css";

interface MessageProps {
  text: string;
  date: string;
  isOwn: boolean;
}

export const Message: React.FC<MessageProps> = ({ text, date, isOwn }) => {
  return (
    <div className={`message-wrapper ${isOwn ? "own" : ""}`}>
      <div className="message-container">
        <div className="message-text">{text}</div>
      </div>
      <div className="message-date">{date}</div>
    </div>
  );
};
