import React, { useState } from "react";
import { Avatar } from "../Avatar/index.tsx";
import { Messages } from "../Messages/index.tsx";
import { Input } from "../Input/index.tsx";
import "./index.css";

type InfoType = {
  firstName: string;
  lastName: string;
  id: string;
  avatar: string;
};

interface ChatProps {
  info: InfoType;
}

export const Chat: React.FC<ChatProps> = ({ info }) => {
  const [messages, setMessages] = useState([
    { text: "Hello!", date: "2024-08-27 10:00 AM", isOwn: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { text: inputValue, date: new Date().toLocaleString(), isOwn: true },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="chat-overlay">
      <div className="chat-header">
        <Avatar img={info?.avatar} alt={`${info.firstName} ${info.lastName}`} />
        <div className="chat-header-info">
          <p className="chat-header-name">
            {info.firstName} {info.lastName}
          </p>
        </div>
      </div>

      <Messages messages={messages} />

      <div className="chat-footer">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button onClick={handleSendMessage} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};
