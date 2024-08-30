import React from "react";
import "./index.css";
import CrossIcon from "../IconsCollection/CrossIcon.tsx";
import { InfoType } from "../../types.ts";

interface ToastProps {
  info?: InfoType;
  message?: string;
  onClick: (id: string) => void;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ info, message, onClick, onClose }) => {
  const handleCloseClick = (e) => {
    e.stopPropagation()
    onClose()
  }
  if (!info) return null;
  return (
    <div className={`toast-container`} onClick={() => onClick(info.id)}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <CrossIcon className="cross" onClick={handleCloseClick}/>
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
