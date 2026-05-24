import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../API/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

const AdminProfile = () => {
  const [user, setUser] = useState({});
  const { userData } = useAuth();
  const fdata = async () => {
    setUser(userData);
  };
  useEffect(() => {
    fdata();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-teal-400" />

        {/* Profile Content */}
        <div className="p-6 relative">
          {/* Avatar */}
          <div className="absolute -top-10 left-6">
            <div className="h-20 w-20 rounded-full bg-amber-300 flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {user.username?.slice(0, 1)?.toUpperCase()}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-12">
            <p className="text-sm text-gray-500">User</p>
            <h2 className="text-xl font-semibold text-gray-800">
              {user.username}
            </h2>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>

            {/* <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-800 font-medium">{user.phone}</p>
            </div> */}

            <div>
              <p className="text-sm text-gray-500">Course</p>
              <p className="text-gray-800 font-medium">{user.course}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-8">
            <button className="w-full bg-amber-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-amber-500 transition">
              ✏️ Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
