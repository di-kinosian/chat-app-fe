import React, { useEffect, useRef } from "react";
import { Message } from "../Message/index.tsx";
import "./index.css";
import { IMessage } from "../../types.ts";

interface MessagesProps {
  messages: IMessage[];
  onEditMessage: (text: string, id: string) => void;
  isLoading: boolean;
}

export const Messages: React.FC<MessagesProps> = ({
  messages,
  onEditMessage,
  isLoading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  if (isLoading) {
    return <div className="messages-container loading">Loading...</div>
  } 
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          date={message.date}
          isOwn={message.isOwn}
          onEdit={() => onEditMessage(message.text, message.id)}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
