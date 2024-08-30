import React, { useEffect, useMemo, useState } from "react";
import { UserManagerModal } from "../components/UserManagerModal/index.tsx";
import { Chat } from "../components/Chat/index.tsx";
import { Modal } from "../components/Modal/index.tsx";
import { Button } from "../components/Button/index.tsx";
import {
  createChatRequest,
  deleteChatRequest,
  editMessageRequest,
  getChatByIdRequest,
  getChatsRequest,
  sendMessageRequest,
  updateChatRequest,
} from "../api/index.ts";
import { IMessage, InfoType, ServerChat, ServerMessage } from "../types.ts";
import "../App.js";
import io from "socket.io-client";
import { transformMessages } from "../helpers/transformers.ts";
import ChatPanel from "../components/ChatPanel/index.tsx";

const socket = io("http://localhost:4000");

function MainPage() {
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [newMessageData, setNewMessageData] = useState<{
    lastMessage: ServerMessage;
    chatInfo: InfoType;
  } | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isOpenManagerModal, setIsOpenManagerModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [editModalData, setEditModalData] = useState<Omit<
    InfoType,
    "avatar"
  > | null>();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [chats, setChats] = useState<ServerChat[]>([]);

  useEffect(() => {
    getChatsRequest().then((data) => {
      setChats(data || []);
    });
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      setIsChatLoading(true);
      getChatByIdRequest(selectedChatId)
        .then((data) => {
          setChatMessages(transformMessages(data.messages));
        })
        .finally(() => {
          setIsChatLoading(false);
        });
    }
  }, [selectedChatId]);

  useEffect(() => {
    socket.on("message", (updatedChat) => {
      const chatId = updatedChat._id;
      const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
      if (selectedChatId === chatId) {
        setChatMessages(transformMessages(updatedChat.messages));
      }
      setChats((prevChats) =>
        prevChats.map((c) =>
          c.id === chatId
            ? {
                ...c,
                lastMessage:
                  updatedChat.messages[updatedChat.messages.length - 1],
              }
            : c,
        ),
      );

      if (lastMessage.sender === "System") {
        setNewMessageData({
          chatInfo: {
            avatar: updatedChat.avatar,
            firstName: updatedChat.firstName,
            lastName: updatedChat.lastName,
            id: chatId,
          },
          lastMessage,
        });
        setTimeout(() => {
          setNewMessageData(null);
        }, 25000);
      }
    });
    return () => {
      socket.off("message");
    };
  }, [selectedChatId]);

  const reset = () => {
    setIsOpenManagerModal(false);
    setEditModalData(null);
  };

  const onOpenManagerModal = () => {
    setIsOpenManagerModal(true);
  };
  const onCloseManagerModal = () => {
    setEditModalData(null);
    reset();
  };

  const onSaveModalData = async (firstName: string, lastName: string) => {
    try {
      if (editModalData) {
        await updateChatRequest({
          id: editModalData.id!,
          firstName,
          lastName,
        });

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === editModalData.id
              ? { ...chat, firstName, lastName }
              : chat,
          ),
        );
      } else {
        const res = await createChatRequest({
          firstName,
          lastName,
        });
        setChats((prevChats) => [...prevChats, { ...res, id: res._id }]);
      }
      reset();
    } catch (error) {
      console.error("Error in saving modal data:", error);
    }
  };

  const selectedChat = useMemo(
    () => chats.find((c) => c.id === selectedChatId),
    [selectedChatId, chats],
  );

  const onEditModalData = (data: Omit<InfoType, "avatar">) => {
    setEditModalData(data);
    setIsOpenManagerModal(true);
  };

  const onOpenDeleteModal = (id: string) => {
    setChatToDelete(id);
    setIsOpenDeleteModal(true);
  };

  const onCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const onDeleteChat = async () => {
    if (chatToDelete) {
      try {
        await deleteChatRequest(chatToDelete);
        setChats((prevChats) =>
          prevChats.filter((chat) => chat.id !== chatToDelete),
        );
      } catch (error) {
        console.error("Error deleting chat:", error);
      } finally {
        onCloseDeleteModal();
      }
    }
    setChatToDelete(null);
  };

  const handleSendMessage = async (messageText: string) => {
    if (!selectedChatId) {
      console.error("No chat selected");
      return;
    }

    try {
      const updatedChat = await sendMessageRequest({
        chatId: selectedChatId,
        messageText,
      });

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === updatedChat.id ? updatedChat : chat,
        ),
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const onEditMessage = async (content: string, messageId: string) => {
    if (!selectedChatId) {
      console.error("No chat selected");
      return;
    }

    try {
      const updatedChat = await editMessageRequest({
        chatId: selectedChatId,
        messageId,
        newContent: content,
      });

      setChatMessages(transformMessages(updatedChat.messages));

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? {
                ...chat,
                lastMessage:
                  updatedChat.messages[updatedChat.messages.length - 1],
              }
            : chat,
        ),
      );
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <ChatPanel
        chats={chats}
        newMessageData={newMessageData}
        onAddChat={onOpenManagerModal}
        onCloseNewMessage={() => setNewMessageData(null)}
        onSelectChat={setSelectedChatId}
        selectedChatId={selectedChatId}
      />
      <Chat
        info={selectedChat}
        onEditChat={onEditModalData}
        onDeleteChat={onOpenDeleteModal}
        onSendMessage={handleSendMessage}
        onEditMessage={onEditMessage}
        messages={chatMessages}
        isLoading={isChatLoading}
      />
      <UserManagerModal
        isOpen={isOpenManagerModal}
        onClose={onCloseManagerModal}
        onSave={onSaveModalData}
        editData={editModalData}
      />
      <Modal isOpen={isOpenDeleteModal} className="delete-modal">
        <h3 style={{ margin: 0 }}>Delete chat</h3>
        <p>Are you sure you want to delete chat? </p>
        <div className="modal-actions">
          <Button
            variant="critical"
            type="submit"
            onClick={() => {
              onDeleteChat();
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={onCloseDeleteModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MainPage;
