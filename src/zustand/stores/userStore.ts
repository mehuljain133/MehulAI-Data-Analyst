import { create } from 'zustand'
import { User } from "../../interfaces/userInterface";

export interface UserStore {
  user: User | null;
  loader: {
    userLoaded: boolean;
    buttonLoader: boolean;
  };
  setUser: (user: User) => void;
  setLoader: (loader: Partial<UserStore['loader']>) => void;
}

const userStore = create<UserStore>((set) => ({
  user: null,
  loader: {
    userLoaded: false,
    buttonLoader: false
  },
  setUser: (user: User) => set({ user }),
  setLoader: (loader) => set((state) => ({ loader: { ...state.loader, ...loader } })),
}));

export default userStore;