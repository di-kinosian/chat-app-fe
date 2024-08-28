import React from "react";
import { Message } from "../Message/index.tsx";
import "./index.css";
import EditIcon from "../IconsCollection/EditIcon.tsx";

export interface IMessage {
  text: string;
  date: string;
  isOwn: boolean;
}

interface MessagesProps {
  messages: IMessage[];
  onEditMessage: (text: string, edit: boolean) => void;
}

export const Messages: React.FC<MessagesProps> = ({
  messages,
  onEditMessage,
}) => {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          date={message.date}
          isOwn={message.isOwn}
          onEdit={() => onEditMessage(message.text, true)}
        />
      ))}
    </div>
  );
};
