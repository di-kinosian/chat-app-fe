import React from "react";
import "./index.css";
import EditIcon from "../IconsCollection/EditIcon.tsx";

interface MessageProps {
  text: string;
  date: string;
  isOwn: boolean;
  onEdit?: () => void;
}

export const Message: React.FC<MessageProps> = ({
  text,
  date,
  isOwn,
  onEdit,
}) => {
  return (
    <div className={`message-wrapper ${isOwn ? "own" : ""}`}>
      <div className="message-container">
        <div className="message-text">{text}</div>
        {isOwn && (
          <div className="edit-icon" onClick={onEdit}>
            <EditIcon size={16} color="white" />
          </div>
        )}
      </div>
      <div className="message-date">{date}</div>
    </div>
  );
};
