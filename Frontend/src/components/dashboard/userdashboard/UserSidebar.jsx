import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaUsers } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import ROUTES from "../../../constants/routes";

const UserSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <aside className="w-[100%] h-full bg-gray-900 shadow-lg flex flex-col items-center justify-between text-gray-200">
      <div className="w-full h-[30%] mt-[20px] flex justify-start gap-5 items-center flex-col">
        <NavLink
          className=" w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200 font-medium hover:bg-[#474767] transition"
          to={ROUTES.USER_PANNEL}
        >
          <FaUsers />
          <span className="text-[12px]">Dashboard</span>
        </NavLink>
        <NavLink
          className="w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200
        font-medium hover:bg-[#474767] hover:text-gray-200  transition"
          to={ROUTES.ADD_REVIEW}
        >
          <IoIosAddCircleOutline />
          <span className="text-[12px]">Add Review</span>
        </NavLink>
        <NavLink
          className="w-[85%] flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200
        font-medium hover:bg-[#474767] hover:text-gray-200  transition"
          to={ROUTES.USER_PROFILE}
        >
          <LuNotebookText />
          <span className="text-[12px]">Profile</span>
        </NavLink>
      </div>
      <div className="flex justify-center items-center w-full mb-6">
        <button
          onClick={handleLogout}
          className="hover:bg-red-100/20 w-[90%] flex py-2 gap-2 rounded-lg text-left pl-10 hover:text-[#F59E0B]"
        >
          <span className="pt-1">
            <IoIosLogOut />
          </span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
