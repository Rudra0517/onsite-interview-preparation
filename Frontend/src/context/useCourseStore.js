import { create } from 'zustand'
import { axiosInstance } from '../API/axiosInstance'
import { toast } from 'react-toastify'

export const useCourseStore = create((set, get) => ({
  courses: [],
  loading: false,

  fetchCourses: async () => {
    set({ loading: true })
    try {
      const res = await axiosInstance.get('/courses')
      set({ courses: res.data.courses || res.data })
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      set({ loading: false })
    }
  },

  getCourseById: (id) => {
    const { courses } = get()
    return courses.find((c) => c._id === id) || null
  },

  createCourse: async (payload) => {
    try {
      const res = await axiosInstance.post('/courses', payload)
      toast.success(res.data.message || 'Course created')
      get().fetchCourses()
      return res.data
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  },

  updateCourse: async (id, updates) => {
    try {
      const res = await axiosInstance.put(`/courses/${id}`, updates)
      toast.success(res.data.message || 'Course updated')
      get().fetchCourses()
      return res.data
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  },

  deleteCourse: async (id) => {
    try {
      const res = await axiosInstance.delete(`/courses/${id}`)
      toast.success(res.data.message || 'Course deleted')
      get().fetchCourses()
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  },
}))

export default useCourseStore
