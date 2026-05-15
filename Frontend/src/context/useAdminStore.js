import { create } from "zustand";
import { axiosInstance } from "../API/axiosInstance";
import { toast } from "react-toastify";

export const useAdminStore = create((set, get) => ({
  admins: [],
  pendingAdmins: [],
  loading: false,

  fetchAdmins: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/admins");
      set({ admins: res.data.admins || res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchPendingAdmins: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/admins/pending");
      set({ pendingAdmins: res.data.pending || res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      set({ loading: false });
    }
  },

  approveAdmin: async (id) => {
    try {
      const res = await axiosInstance.post(`/admins/${id}/approve`);
      toast.success(res.data.message || "Approved");
      get().fetchPendingAdmins();
      get().fetchAdmins();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  },

  rejectAdmin: async (id) => {
    try {
      const res = await axiosInstance.post(`/admins/${id}/reject`);
      toast.success(res.data.message || "Rejected");
      get().fetchPendingAdmins();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  },
}));

export default useAdminStore;
