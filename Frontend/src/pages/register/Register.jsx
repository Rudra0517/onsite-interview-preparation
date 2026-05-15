import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../API/axiosInstance";

const Register = () => {
  const [status, setStatus] = useState("User");
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    course: "",
  });
  const [adminFormData, setAdminFormData] = useState({
    username: "",
    email: "",
    gender: "",
    course: "",
  });

  const navigate = useNavigate();

  //* User logic
  const userHandleInput = (e) => {
    const { name, value, checked } = e.target;
    setUserFormData({ ...userFormData, [name]: value, [checked]: value });
  };

  const userHandleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await axiosInstance.post("/user-register", userFormData);
      setUserFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        course: "",
      });

      navigate("/login");
      return toast.success("Registered successfully");
    } catch (error) {
      const { status, data } = error.response;
      if (status === 409) {
        return toast.warn(data.message);
      }
      if (status === 401) {
        return toast.warn(data.message);
      }
    }
  };

  //* Admin logic
  const adminHandleInput = (e) => {
    const { name, value, checked } = e.target;
    setAdminFormData({ ...adminFormData, [name]: value, [checked]: value });
  };
  const adminHandleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await axiosInstance.post("/admin-register", adminFormData);
      setAdminFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        course: "",
      });
      toast.success(
        "Your data is sent to the super admin. Please wait for approval.",
      );
      navigate("/login");
    } catch (error) {
      if (error.response.status === 409) {
        return toast.warn("You are alredy registered");
      }
      if (error.response.status === 401) {
        return toast.warn(
          "You are already registered wait for super admins approval",
        );
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 transform transition-all">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <div className="w-full flex justify-center items-center mb-3">
          <button
            className={`w-[50%] ${status === "User" ? ` border-b-4 border-amber-400 py-2` : ""}`}
            onClick={() => setStatus("User")}
          >
            User
          </button>
          <button
            className={`w-[50%] ${status === "Admin" ? ` border-b-4 border-amber-400 py-2` : ""}`}
            onClick={() => setStatus("Admin")}
          >
            Admin
          </button>
        </div>

        {status === "User" ? (
          <form onSubmit={userHandleForm} className="space-y-4 ">
            <div>
              <label className="text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={userFormData.username}
                placeholder="Enter full name"
                required
                onChange={userHandleInput}
                className="mt-1 w-full placeholder-gray-500 rounded-xl border bg-white/30 border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userFormData.email}
                placeholder="Enter your mail"
                required
                onChange={userHandleInput}
                className="mt-1 w-full placeholder-gray-500 bg-white/30 rounded-xl border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={userFormData.password}
                placeholder="Create password"
                required
                onChange={userHandleInput}
                className="mt-1 w-full placeholder-gray-500 bg-white/30 rounded-xl border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-2 flex gap-4">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userFormData.gender === "Male"}
                  onChange={userHandleInput}
                  className="accent-amber-500 bg-white/30"
                />
                <label htmlFor="male">Male</label>
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userFormData.gender === "Female"}
                  onChange={userHandleInput}
                  className="accent-amber-500"
                />
                <label htmlFor="female">Female</label>
                <input
                  id="other"
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={userFormData.gender === "Other"}
                  onChange={userHandleInput}
                  className="accent-amber-500"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Course
              </label>
              <select
                name="course"
                value={userFormData.course}
                required
                onChange={userHandleInput}
                className="mt-1 w-full bg-white/30 rounded-xl border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">Select Course</option>
                <option value="MERN">MERN</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-6 rounded-xl bg-amber-500 py-2 text-white font-semibold shadow-lg hover:bg-amber-400 hover:shadow-xl transition"
            >
              Register
            </button>
            <p className="text-center mt-2">
              Already have an account?
              <span className="text-[#F59E0B] font-semibold">
                <Link to="/login">Signin </Link>
              </span>
              here
            </p>
          </form>
        ) : (
          <form onSubmit={adminHandleForm} className="space-y-4 ">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Admin Name
              </label>
              <input
                type="text"
                name="username"
                value={adminFormData.username}
                placeholder="Enter full name"
                required
                onChange={adminHandleInput}
                className="mt-1 w-full placeholder-gray-500 rounded-xl border bg-white/30 border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={adminFormData.email}
                placeholder="Enter your mail"
                required
                onChange={adminHandleInput}
                className="mt-1 w-full placeholder-gray-500 bg-white/30 rounded-xl border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-2 flex gap-4">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={adminFormData.gender === "Male"}
                  onChange={adminHandleInput}
                  className="accent-amber-500 bg-white/30"
                />
                <label htmlFor="male">Male</label>
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={adminFormData.gender === "Female"}
                  onChange={adminHandleInput}
                  className="accent-amber-500"
                />
                <label htmlFor="female">Female</label>
                <input
                  id="other"
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={adminFormData.gender === "Other"}
                  onChange={adminHandleInput}
                  className="accent-amber-500 bg-white/30"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Course
              </label>
              <select
                name="course"
                value={adminFormData.course}
                required
                onChange={adminHandleInput}
                className="mt-1 w-full bg-white/30 rounded-xl border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">Select Course</option>
                <option value="MERN">MERN</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-6 rounded-xl bg-amber-500 py-2 text-white font-semibold shadow-lg hover:bg-amber-400 hover:shadow-xl transition"
            >
              Register
            </button>
            <p className="text-center mt-2">
              Already have an account?
              <span className="text-amber-500 font-semibold">
                <Link to="/login">Signin </Link>
              </span>
              here
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
