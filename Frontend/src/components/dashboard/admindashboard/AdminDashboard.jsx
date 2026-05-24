import axios from "axios";
import { useState } from "react";
import { axiosInstance } from "../../../API/axiosInstance";
import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex overflow-hidden">
      <div className="w-60 flex-shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>  
    </div>
  );
};

export default AdminDashboard;
