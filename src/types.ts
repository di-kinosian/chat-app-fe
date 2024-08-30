export type InfoType = {
  firstName: string;
  lastName: string;
  id: string;
  avatar: string;
};
export interface IMessage {
  text: string;
  date: string;
  isOwn: boolean;
  id: string;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  id?: string;
}

export interface ServerMessage {
  content: string;
  sender: string;
  timestamp: string;
  _id: string;
}

export interface ServerChat {
  firstName: string;
  lastName: string;
  id: string;
  avatar: string;
  lastMessage: ServerMessage;
}
