import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../assets/styles/client/layout/layout.css";
import Container from "react-bootstrap/Container";

const MainLayout = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Container>
        <div className="main-content">
          <Outlet />
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
