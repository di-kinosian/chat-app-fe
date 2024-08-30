import React, { useState } from "react";
import { Avatar } from "../Avatar/index.tsx";
import { Messages } from "../Messages/index.tsx";
import { Input } from "../Input/index.tsx";
import EditIcon from "../IconsCollection/EditIcon.tsx";
import TrashIcon from "../IconsCollection/TrashIcon.tsx";
import { IMessage, InfoType, ServerChat } from "../../types.ts";
import "./index.css";

interface ChatProps {
  info?: ServerChat;
  messages: IMessage[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onEditMessage: (content: string, id: string) => void;
  onEditChat: (editData: Omit<InfoType, "avatar">) => void;
  onDeleteChat: (id: string) => void;
}

export const Chat: React.FC<ChatProps> = ({
  info,
  onDeleteChat,
  onSendMessage,
  onEditMessage,
  messages,
  onEditChat,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [updatingMessageId, setUpdatingMessageId] = useState<string | null>(
    null,
  );

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleEditData = () => {
    if (info) {
      const userToEdit = {
        firstName: info.firstName,
        lastName: info.lastName,
        id: info.id,
      };
      onEditChat(userToEdit);
    }
  };

  const handleEditMessage = (text: string, id: string) => {
    setInputValue(text);
    setUpdatingMessageId(id);
  };

  const handleUpdateMessage = () => {
    if (updatingMessageId) {
      onEditMessage(inputValue, updatingMessageId);
    }
    setInputValue("");
    setUpdatingMessageId(null);
  };

  return (
    <div className="chat-overlay">
      {info ? (
        <>
          <div className="chat-header">
            <div className="chat-header-elements">
              <Avatar
                img={info?.avatar}
                alt={`${info.firstName} ${info.lastName}`}
              />
              <div className="chat-header-info">
                <p className="chat-header-name">
                  {info.firstName} {info.lastName}
                </p>
              </div>
              <EditIcon onClick={handleEditData} />
            </div>
            <TrashIcon
              className="trash-icon"
              onClick={() => {
                onDeleteChat(info.id);
              }}
            />
          </div>

          <Messages
            isLoading={isLoading}
            messages={messages}
            onEditMessage={handleEditMessage}
          />

          <div className="chat-footer">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={
                updatingMessageId ? handleUpdateMessage : handleSendMessage
              }
              className="chat-send-button"
            >
              {updatingMessageId ? "Edit" : "Send"}
            </button>
          </div>
        </>
      ) : (
        <div className="chat-empty-state">
          Please create or select a chat to start messaging.
        </div>
      )}
    </div>
  );
};
