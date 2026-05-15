import React from "react";
import UserSidebar from "./UserSidebar";
import { Outlet } from "react-router-dom";

const UserPanel = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex overflow-hidden">
      <div className="w-60 flex-shrink-0">
        <UserSidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPanel;
