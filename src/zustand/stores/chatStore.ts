/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { Conversations } from '../../interfaces/chatInterface';

export interface ChatStore {
  chats: Conversations[];
  setChats: (chats: Conversations[]) => void;

}

const chatStore = create<ChatStore>((set) => ({
  chats:[],
  setChats: (chats: Conversations[]) => set({ chats }),
}));

export default chatStore;
