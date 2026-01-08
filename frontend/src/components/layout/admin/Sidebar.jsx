import React from "react";
import "../../../assets/styles/admin/sidebar.css";
import { SiAudiotechnica } from "react-icons/si";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { UserRound } from "lucide-react";
import { Box } from "lucide-react";
import { TableProperties } from "lucide-react";
const Sidebar = () => {
  return (
    <section className="admin-sidebar">
      <div className="admin-sidebar-wrapper">
        <div className="sidebar-brand">
          <SiAudiotechnica size={38} />
          SnowTech
        </div>
        <Nav className="flex-column gap-4 mt-3">
          <Nav.Link as={NavLink} to="/admin/" end>
            <LayoutDashboard size={22} />
            <p className="sidebar-label">Dashboard</p>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/users">
            <UserRound size={22} />
            <p className="sidebar-label">Users</p>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/categories">
            <TableProperties size={22} />
            <p className="sidebar-label">Categories</p>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/products">
            <Box size={22} />
            <p className="sidebar-label">Products</p>
          </Nav.Link>
        </Nav>
      </div>
    </section>
  );
};

export default Sidebar;
