import axios from "axios";

const url = "http://localhost:4000";

type CreateChatPayload = {
  firstName: string;
  lastName: string;
};

export const createChatRequest = async (payload: CreateChatPayload) => {
  try {
    const response = await axios.post(`${url}/chats`, payload);
    return response.data;
  } catch (error) {
    console.error("Error while creating chat:", error);
  }
};

type EditChatPayload = {
  firstName: string;
  lastName: string;
  id: string;
};

export const updateChatRequest = async (payload: EditChatPayload) => {
  try {
    const response = await axios.put(`${url}/chats/${payload.id}`, {
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating chat:", error.message);
    throw error;
  }
};

export const deleteChatRequest = async (id: string) => {
  try {
    const response = await axios.delete(`${url}/chats/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
};

export const getChatsRequest = async () => {
  try {
    const response = await axios.get(`${url}/chats`);
    return response.data;
  } catch (error) {
    console.error("Error while get chats:", error);
  }
};

type SendMessagePayload = {
  chatId: string;
  messageText: string;
};

export const sendMessageRequest = async (payload: SendMessagePayload) => {
  try {
    const response = await axios.post(
      `${url}/chats/${payload.chatId}/messages`,
      {
        content: payload.messageText,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getChatByIdRequest = async (chatId: string) => {
  try {
    const response = await axios.get(`${url}/chats/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat by ID:", error);
    throw error;
  }
};

type EditMessagePayload = {
  chatId: string;
  messageId: string;
  newContent: string;
};

export const editMessageRequest = async (payload: EditMessagePayload) => {
  try {
    const response = await axios.put(
      `${url}/chats/${payload.chatId}/messages/${payload.messageId}`,
      {
        content: payload.newContent,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error editing message:", error);
    throw error;
  }
};
