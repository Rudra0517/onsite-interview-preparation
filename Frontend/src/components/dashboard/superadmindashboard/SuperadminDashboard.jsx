import React from "react";
import SuperAdminSidebar from "./SuperAdminSidebar";
import { Outlet } from "react-router-dom";

const SuperadminDashboard = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex overflow-hidden">
      <div className="w-60 flex-shrink-0">
        <SuperAdminSidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default SuperadminDashboard;
