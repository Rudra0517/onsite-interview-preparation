import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../API/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axiosInstance.get("/me");
        setUserData(res.data);
        setIsLoggedIn(res?.isLoggedIn ?? false);
        setRole(res?.data?.role ?? null);
        setUsername(res?.data?.username ?? "");
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

  useEffect(() => {
    const refetchAuth = async () => {
      try {
        const { data } = await axiosInstance.get("/me");
        setIsLoggedIn(data?.isLoggedIn ?? false);
        setRole(data?.role ?? null);
        setUsername(data?.username ?? "");
      } catch {
        setIsLoggedIn(false);
        setRole(null);
        setUsername("");
      }
    };
    refetchAuth();
  }, []);

  const value = {
    isLoggedIn,
    role,
    username,
    email: userData.email,
    course: userData.course,
    loading,
    logout,
    login,
    userData,
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
