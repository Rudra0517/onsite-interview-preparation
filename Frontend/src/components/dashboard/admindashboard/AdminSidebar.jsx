import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaUsers } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { BiSolidAddToQueue } from "react-icons/bi";
import { RiSettings3Line } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="w-[100%] h-full bg-gray-900 shadow-lg flex flex-col items-center justify-between text-gray-200">
      <div className="w-full mt-4">
        <div className="w-full flex justify-center gap-5 items-center flex-col">
          <NavLink
            className=" w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200 font-medium hover:bg-[#474767] transition"
            to="/dashboard/admin/adminpannel"
          >
            <MdDashboard />
            <span className="text-[12px]">Dashboard</span>
          </NavLink>
          <NavLink
            className=" w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200 font-medium hover:bg-[#474767] transition"
            to="/dashboard/admin/allusers"
          >
            <FaUsers />
            <span className="text-[12px]"> All Users</span>
          </NavLink>
          <NavLink
            className="w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200
        font-medium hover:bg-[#474767] hover:text-gray-200  transition"
            to="/dashboard/admin/allquestions"
          >
            <LuNotebookText />
            <span className="text-[12px]">All Questions</span>
          </NavLink>
          <NavLink
            className="w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200
        font-medium hover:bg-[#474767] transition"
            to="/dashboard/admin/createquestion"
          >
            <BiSolidAddToQueue />
            <span className="text-[12px]">Add Questions</span>
          </NavLink>
          {/* <NavLink
            className="w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200
        font-medium hover:bg-[#474767] transition"
            to="/dashboard/admin/setting"
          >
            <RiSettings3Line />
            <span className="text-[12px]">Setting</span>
          </NavLink> */}
          <NavLink
            className="w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200
        font-medium hover:bg-[#474767] transition"
            to="/dashboard/admin/profile"
          >
            <IoMdPerson />
            <span className="text-[12px]">Profile</span>
          </NavLink>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mb-6">
        <button
          onClick={handleLogout}
          className="hover:bg-red-100/20 w-[90%] gap-2 flex py-2 rounded-lg text-left pl-10 hover:text-[#F59E0B]"
        >
          <span className="pt-1">
            <IoIosLogOut />
          </span>
          <span> Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
