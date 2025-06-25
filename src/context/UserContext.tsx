'use client'
import { createContext, useContext } from 'react';
import { NewUserData } from '../../types';


type UserContextType = {
  userData: NewUserData;
  loading: boolean;
  user:string
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used inside UserProvider");
  return context;
};
