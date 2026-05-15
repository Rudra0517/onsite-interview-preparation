import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../API/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", formData);

      if (response?.status === 200) {
        const { role, username, email, _id } = response?.data;

        login({ role, username, email, _id });

        if (role === "Admin") navigate("/dashboard/admin");
        else if (role === "User") navigate("/dashboard/user");
        else if (role === "Super Admin") navigate("/dashboard/superadmin");
      }
      toast.success("Login successful");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response.status === 404) {
        return toast.error("Inavlid email");
      }
      if (error.response.status === 401) {
        return toast.warning("Incorrect Password");
      }
      if (error.response.status === 409) {
        return alert(error.response.data.message);
      }
      if (error.response.status === 403) {
        return alert("Your account has been freeze by admin");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-black text-center mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleForm}>
          <div>
            <label className="block text-sm text-black mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleInput}
              className="mt-1 w-full placeholder-gray-500 bg-white/30 rounded-xl border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-black mb-1">Password</label>
            <input
              type="password"
              onChange={handleInput}
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="mt-1 w-full placeholder-gray-500 bg-white/30 rounded-xl border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="text-right">
            <Link
              to="/forgetpassword"
              className="text-md text-amber-400 hover:text-amber-500 underline transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-400 text-white font-semibold shadow-lg hover:bg-amber-500 hover:scale-[1.02] active:scale-95 transition"
          >
            Login
          </button>
          <p className="text-center mt-2">
            If you are not registered yet?
            <span className="text-amber-500 font-semibold">
              <Link to="/register"> Register </Link>
            </span>
            here
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
