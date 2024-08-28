import React from "react";
import "./index.css";
import CrossIcon from "../IconsCollection/CrossIcon.tsx";
import { InfoType } from "../Chat";

interface ToastProps {
  isVisible: boolean;
  info: InfoType;
  message: string;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  info,
  message,
  className = "",
}) => {
  if (!isVisible) return null;
  return (
    <div className={`toast-container ${className}`}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <CrossIcon className="cross" />
        <img
          src={info.avatar}
          alt={`${info.firstName} ${info.lastName}`}
          className="toast-avatar"
        />
        <div className="toast-content">
          <p className="toast-name">{`${info.firstName} ${info.lastName}`}</p>
          <p className="toast-message">{message}</p>
        </div>
      </div>
    </div>
  );
};
