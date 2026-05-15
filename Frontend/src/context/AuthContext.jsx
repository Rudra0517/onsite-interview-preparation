import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../API/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axiosInstance.get("/me");
        setIsLoggedIn(res?.data?.isLoggedIn ?? false);
        setRole(res?.data?.data?.role ?? null);
        setUsername(res?.data?.data?.username ?? "");
      } catch {
        setIsLoggedIn(false);
        setRole(null);
        setUsername("");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggedIn(false);
      setRole(null);
      setUsername("");
    }
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setRole(userData?.role ?? null);
    setUsername(userData?.username ?? "");
    setLoading(false);
  };

  const refetchAuth = async () => {
    try {
      const res = await axiosInstance.get("/me");
      setIsLoggedIn(res?.data?.isLoggedIn ?? false);
      setRole(res?.data?.data?.role ?? null);
      setUsername(res?.data?.data?.username ?? "");
    } catch {
      setIsLoggedIn(false);
      setRole(null);
      setUsername("");
    }
  };

  const value = {
    isLoggedIn,
    role,
    username,
    loading,
    logout,
    login,
    refetchAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
