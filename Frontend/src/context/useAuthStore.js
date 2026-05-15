import { create } from "zustand";
import { axiosInstance } from "../API/axiosInstance";
import { toast } from "react-toastify";

export const useAuthStore = create((set, get) => ({
  isLoggedIn: false,
  role: null,
  user: null,
  loading: false,
  isInitializing: true,

  register: async (data, navigate) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      set({ loading: false });
    }
  },

  login: async (data, navigate) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success(res.data.message);
      set({ isLoggedIn: true, role: res.data.role, user: res.data.user });
      if (res?.data?.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ isLoggedIn: false, role: null, user: null });
      toast.success("Logged out");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  },

  resetPassword: async (token, newPassword, navigate) => {
    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword,
      });
      toast.success(res.data.message);
      if (navigate) navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  },

  changePassword: async (oldPassword, newPassword) => {
    try {
      const res = await axiosInstance.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  },

  updateProfile: async (updates) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", updates);
      toast.success(res.data.message);
      set({ user: res.data.user });
      return res.data.user;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  },

  deleteProfile: async () => {
    try {
      const res = await axiosInstance.delete("/auth/delete-profile");
      toast.success(res.data.message);
      set({ isLoggedIn: false, role: null, user: null });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  },

  checkAuthStatus: async () => {
    set({ isInitializing: true });
    try {
      const res = await axiosInstance.get("/auth/status");
      if (res.data.isLogin) {
        set({
          isLoggedIn: true,
          role: res.data.role,
          user: res.data.user,
        });
      } else {
        set({ isLoggedIn: false, role: null, user: null });
      }
    } catch (error) {
      set({ isLoggedIn: false, role: null, user: null });
    } finally {
      set({ isInitializing: false });
    }
  },
}));

export default useAuthStore;
