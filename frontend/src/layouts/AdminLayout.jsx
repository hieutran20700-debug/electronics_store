import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import "../assets/styles/admin/layout.css";
const AdminLayout = () => {
  return (
    <div className="admin-wrapper">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
