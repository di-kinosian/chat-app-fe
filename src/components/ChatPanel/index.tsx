import React, { useMemo, useState } from "react";
import PlusIcon from "../../assets/svg/plus.svg";
import { InfoType, ServerChat, ServerMessage } from "../../types";
import { Avatar } from "../Avatar/index.tsx";
import { SearchInput } from "../SearchInput/index.tsx";
import { ChatPreview } from "../ChatPreview/index.tsx";
import { Toast } from "../Toast/index.tsx";

interface ChatPanelProps {
  chats: ServerChat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onAddChat: () => void;
  newMessageData: {
    lastMessage: ServerMessage;
    chatInfo: InfoType;
  } | null;
  onCloseNewMessage: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
  onAddChat: onOpenManagerModal,
  newMessageData,
  onCloseNewMessage,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredChats = useMemo(
    () =>
      chats
        ? chats.filter((c) =>
            `${c.firstName} ${c.lastName}`
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase()),
          )
        : [],
    [searchValue, chats],
  );

  return (
    <div
      style={{
        width: "400px",
        borderRight: "1px solid #ddd",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        transform: "translate(0px, 0px)",
      }}
    >
      <div
        style={{
          background: "#f5f5f5",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Avatar img="https://lh3.googleusercontent.com/ogw/AF2bZyhNkaae00A_7Tzr-qFYvICs2izmswjgOaagTp1DCehHxC0=s32-c-mo" />
        <SearchInput
          onSearch={setSearchValue}
          placeholder="Search for users..."
        />
      </div>
      <div
        style={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {filteredChats.map((item, index) => (
          <ChatPreview
            isSelected={item.id === selectedChatId}
            key={index}
            info={{
              firstName: item.firstName,
              lastName: item.lastName,
              id: item.id,
              avatar: item.avatar,
            }}
            lastMessage={item.lastMessage}
            onSelect={onSelectChat}
          />
        ))}
        <button className="add-button" onClick={onOpenManagerModal}>
          <img
            src={PlusIcon}
            alt=""
            style={{ width: "36px", height: " 36px" }}
          />
        </button>
        <Toast
          info={newMessageData?.chatInfo}
          message={newMessageData?.lastMessage.content}
          onClose={onCloseNewMessage}
          onClick={onSelectChat}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
