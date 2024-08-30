import { IMessage, ServerMessage } from "../types";

export const transformMessages = (messages: ServerMessage[]): IMessage[] =>
  messages
    ? messages.map((m) => ({
        text: m.content,
        date: m.timestamp,
        isOwn: m.sender === "User",
        id: m._id,
      }))
    : [];
