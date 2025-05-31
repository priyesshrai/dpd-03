'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  user: string | null;
  role: string | null;
  login: (user: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = (username: string, userRole: string) => {
    setUser(username);
    setRole(userRole);

    localStorage.setItem('user', username);
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);

    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
