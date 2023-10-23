import { ReactNode, createContext, useState } from "react";
import ApiClient from "../utils/backend-api";

export interface IUser {
  id: number;
  name: string;
  email: string;
  token: string;
  apiClient: ApiClient
};

export type UserContextType = {
  currentUser: IUser | null
  updateUser: (user: IUser) => void;
};

// This is what will be globally accessible
export const UserContext = createContext<UserContextType>({
  currentUser: null,
  updateUser: (user: IUser) => { }
});

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const updateUser = (user: IUser) => {
    setCurrentUser(user);
  };

  const value = { currentUser, updateUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
