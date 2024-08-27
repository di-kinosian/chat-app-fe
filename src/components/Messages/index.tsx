import React from "react";
import { Message } from "../Message/index.tsx";
import "./index.css";

interface IMessage {
  text: string;
  date: string;
  isOwn: boolean;
}

interface MessagesProps {
  messages: IMessage[];
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          date={message.date}
          isOwn={message.isOwn}
        />
      ))}
    </div>
  );
};
