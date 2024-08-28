import React from "react";
import "./index.css";
import { IMessage } from "../Messages/index.tsx";
import { InfoType } from "../Chat/index.tsx";
import { Avatar } from "../Avatar/index.tsx";

interface ChatPreviewProps {
  lastMessage: IMessage;
  info: InfoType;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({
  lastMessage,
  info,
}) => {
  return (
    <div className="chat-preview">
      <Avatar img={info.avatar} />
      <div className="chat-preview-info">
        <div className="chat-preview-header">
          <span className="chat-preview-name">
            {info.firstName} {info.lastName}
          </span>
          <span className="chat-preview-date">{lastMessage.date}</span>
        </div>
        <p className="chat-preview-message">{lastMessage.text}</p>
      </div>
    </div>
  );
};
