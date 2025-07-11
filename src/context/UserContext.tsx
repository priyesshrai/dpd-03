'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NewUserData } from '../../types';

type UserContextType = {
  userData: NewUserData;
  setUserData: (data: NewUserData) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  user: string;
  accessCode?: string;
  locked: boolean;
  setLocked: (locked: boolean) => void;
  closePingForm: boolean;
  setClosePingForm: (closePingForm: boolean) => void;
  showLockedMessage: boolean;
  setShowLockedMessage: (showLockedMessage: boolean) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used inside UserProvider');
  return context;
};

export const UserProvider = ({ user, accessCode, children }: { user: string; accessCode?: string; children: ReactNode }) => {
  const [userData, setUserData] = useState<NewUserData>({});
  const [loading, setLoading] = useState(true);
  const [closePingForm, setClosePingForm] = useState<boolean>(true);
  const [locked, setLocked] = useState<boolean>(true);
  const [showLockedMessage, setShowLockedMessage] = useState<boolean>(false);

  const contextValue: UserContextType = {
    userData,
    setUserData,
    loading,
    setLoading,
    user,
    locked,
    setLocked,
    closePingForm,
    setClosePingForm,
    showLockedMessage,
    setShowLockedMessage,
    accessCode,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
