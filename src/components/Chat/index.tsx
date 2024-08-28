import React, { useState } from "react";
import { Avatar } from "../Avatar/index.tsx";
import { Messages } from "../Messages/index.tsx";
import { Input } from "../Input/index.tsx";
import EditIcon from "../IconsCollection/EditIcon.tsx";
import TrashIcon from "../IconsCollection/TrashIcon.tsx";
import "./index.css";
import { FormValues } from "../UserManagerModal/index.tsx";

export type InfoType = {
  firstName: string;
  lastName: string;
  id: string;
  avatar: string;
};

interface ChatProps {
  info: InfoType;
  openManagerModal: () => void;
  openDeleteModal: () => void;
  editModalData?: (editData: FormValues) => void;
}

export const Chat: React.FC<ChatProps> = ({
  info,
  openManagerModal: openModal,
  editModalData,
  openDeleteModal,
}) => {
  const [messages, setMessages] = useState([
    { text: "Hello!", date: "2024-08-27 10:00 AM", isOwn: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { text: inputValue, date: new Date().toLocaleString(), isOwn: true },
      ]);
      setInputValue("");
      setIsEdit(false);
    }
  };

  const handleEditData = () => {
    openModal();
    if (info) {
      const userToEdit: FormValues = {
        firstName: info.firstName,
        lastName: info.lastName,
        id: info.id,
      };
      editModalData(userToEdit);
    }
  };

  const handleEditMessage = (text: string, edit: boolean) => {
    setInputValue(text);
    setIsEdit(edit);
  };

  return (
    <div className="chat-overlay">
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
            openDeleteModal();
          }}
        />
      </div>

      <Messages messages={messages} onEditMessage={handleEditMessage} />

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
          {isEdit ? "Edit" : "Send"}
        </button>
      </div>
    </div>
  );
};
