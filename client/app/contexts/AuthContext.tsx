"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, saveToken } from "../utils/token";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  function login(jwt: string, userData: User) {
    saveToken(jwt);

    setToken(jwt);

    setUser(userData);
  }

  function logout() {
    removeToken();

    setUser(null);

    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}