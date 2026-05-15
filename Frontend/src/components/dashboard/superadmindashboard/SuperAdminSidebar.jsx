import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoPersonAdd } from "react-icons/io5";

const SuperAdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <aside className="w-[100%] h-full bg-gray-900 shadow-lg flex flex-col items-center justify-between text-gray-200">
      <div className="w-full h-[50%] flex justify-evenly items-center flex-col">
        <NavLink
          className=" w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200 font-medium hover:bg-[#474767] transition"
          to="/dashboard/superadmin/pendingadmins"
        >
          <IoPersonAdd />
          <span className="text-[12px]">Pending Admins</span>
        </NavLink>
        <NavLink
          className="w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200
        font-medium hover:bg-[#474767] hover:text-gray-200  transition"
          to="/dashboard/superadmin/alladmins"
        >
          <HiMiniUserGroup />
          <span className="text-[12px]">All Admins</span>
        </NavLink>
        <NavLink
          className="w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200
        font-medium hover:bg-[#474767] hover:text-gray-200  transition"
          to="/dashboard/superadmin/allusers"
        >
          <HiMiniUserGroup />
          <span className="text-[12px]">All Users</span>
        </NavLink>
      </div>
      <div className="flex justify-center items-center w-full mb-6">
        <button
          onClick={handleLogout}
          className="hover:bg-gray-100 w-[90%] py-2 rounded-lg text-left pl-10 hover:text-[#F59E0B]"
        >
          Log out
        </button>
      </div>
    </aside>
  );
};

export default SuperAdminSidebar;
