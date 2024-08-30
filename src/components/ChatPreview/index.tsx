import React from "react";
import { Avatar } from "../Avatar/index.tsx";
import { InfoType, ServerMessage } from "../../types.ts";
import "./index.css";
import { formatDateString } from "../../helpers/date.ts";
import classNames from "classnames";

interface ChatPreviewProps {
  lastMessage?: ServerMessage;
  info: InfoType;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({
  lastMessage,
  info,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={classNames("chat-preview", { active: isSelected })}
      onClick={() => onSelect(info.id)}
    >
      <Avatar img={info.avatar} />
      <div className="chat-preview-info">
        <div className="chat-preview-header">
          <span className="chat-preview-name">
            {info.firstName} {info.lastName}
          </span>
          <span className="chat-preview-date">
            {lastMessage ? formatDateString(lastMessage.timestamp) : ""}
          </span>
        </div>
        <p className="chat-preview-message">{lastMessage?.content}</p>
      </div>
    </div>
  );
};
