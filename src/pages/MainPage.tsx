import React, { useState } from "react";
import { Input } from "../components/Input/index.tsx";
import {
  FormValues,
  UserManagerModal,
} from "../components/UserManagerModal/index.tsx";
import { Avatar } from "../components/Avatar/index.tsx";
import { Chat, InfoType } from "../components/Chat/index.tsx";
import { ChatPreview } from "../components/ChatPreview/index.tsx";
import PlusIcon from "../assets/svg/plus.svg";
import "../App.js";
import { Modal } from "../components/Modal/index.tsx";
import { Button } from "../components/Button/index.tsx";
import { Toast } from "../components/Toast/index.tsx";
import { SearchInput } from "../components/SearchInput/index.tsx";

function MainPage() {
  const [isOpenManagerModal, setIsOpenManagerModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [editModalData, setEditModalData] = useState<FormValues | null>();

  const reset = () => {
    setIsOpenManagerModal(false);
    setEditModalData(null);
  };

  const onOpenManagerModal = () => {
    setIsOpenManagerModal(true);
    setEditModalData(null);
  };
  const onCloseManagerModal = () => {
    reset();
  };

  const onSaveModalData = (firstName: string, lastName: string) => {
    const chatUser = {
      firstName,
      lastName,
      id: "744939830",
    };
    console.log(chatUser);
    reset();
  };

  const onEditModalData = (data: FormValues) => {
    setEditModalData(data);
    setIsOpenManagerModal(true);
  };

  const onOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const onCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // Add logic for searching users
  };

  const userInfo: InfoType = {
    firstName: "Viktoria",
    lastName: "Mida",
    id: "1872687",
    avatar:
      "https://lh3.googleusercontent.com/ogw/AF2bZyhNkaae00A_7Tzr-qFYvICs2izmswjgOaagTp1DCehHxC0=s32-c-mo",
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
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
          {/* <Input /> */}
          <SearchInput
            onSearch={handleSearch}
            placeholder="Search for users..."
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item, index) => (
            <ChatPreview
              key={index}
              info={{
                firstName: "Nadia",
                lastName: "Krivorko",
                id: "1872687",
                avatar:
                  "https://lh3.googleusercontent.com/ogw/AF2bZyhNkaae00A_7Tzr-qFYvICs2izmswjgOaagTp1DCehHxC0=s32-c-mo",
              }}
              lastMessage={{
                text: `Hello, What's up?`,
                date: "2024-08-27 10:00 AM",
                isOwn: false,
              }}
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
            isVisible={false}
            info={userInfo}
            message="Hello! How are you?"
          />
        </div>
      </div>
      <Chat
        editModalData={onEditModalData}
        openManagerModal={onOpenManagerModal}
        openDeleteModal={onOpenDeleteModal}
        info={{
          firstName: "Nadia",
          lastName: "Krivorko",
          id: "1872687",
          avatar:
            "https://lh3.googleusercontent.com/ogw/AF2bZyhNkaae00A_7Tzr-qFYvICs2izmswjgOaagTp1DCehHxC0=s32-c-mo",
        }}
      />
      <UserManagerModal
        isOpen={isOpenManagerModal}
        onClose={onCloseManagerModal}
        onSave={onSaveModalData}
        editData={editModalData}
      />
      <Modal isOpen={isOpenDeleteModal} className="delepe-modal">
        <h3 style={{ margin: 0 }}>Delete chat</h3>
        <p>Are you shure you want to delete chat? </p>
        <div className="modal-actions">
          <Button
            variant="critical"
            type="submit"
            onClick={() => {
              console.log("modal was deleted");

              onCloseDeleteModal();
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
