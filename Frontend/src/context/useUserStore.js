import { create } from 'zustand'
import { axiosInstance } from '../API/axiosInstance'
import { toast } from 'react-toastify'

export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true })
    try {
      const res = await axiosInstance.get('/users')
      set({ users: res.data.users || res.data })
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      set({ loading: false })
    }
  },

  getUserById: (id) => {
    const { users } = get()
    return users.find((u) => u._id === id) || null
  },

  updateUser: async (id, updates) => {
    try {
      const res = await axiosInstance.put(`/users/${id}`, updates)
      toast.success(res.data.message || 'User updated')
      get().fetchUsers()
      return res.data
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axiosInstance.delete(`/users/${id}`)
      toast.success(res.data.message || 'User deleted')
      get().fetchUsers()
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  },
}))

export default useUserStore
