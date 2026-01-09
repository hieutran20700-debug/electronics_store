import React from 'react';
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { Smartphone } from "lucide-react";
import { Laptop } from "lucide-react";
import { TabletSmartphone } from "lucide-react";
import { Monitor } from "lucide-react";
import { Cpu } from "lucide-react";
import { Watch } from "lucide-react";
import { Headphones } from "lucide-react";

const Categories = ({categories = [], loading}) => {
  console.log("da nhan", categories)
  const dataCategories = [
    {
      id: "dien-thoai",
      name: "Điện thoại",
      slug: "dien-thoai",
      icon: <Smartphone />,
    },
    {
      id: "laptop",
      name: "Laptop",
      slug: "laptop",
      icon: <Laptop />,
    },
    {
      id: "tablet",
      name: "Tablet",
      slug: "tablet",
      icon: <TabletSmartphone />,
    },
    {
      id: "man-hinh",
      name: "Màn hình",
      slug: "man-hinh",
      icon: <Monitor />,
    },
    {
      id: "linh-kien-may-tinh",
      name: "Linh kiện máy tính",
      slug: "linh-kien-may-tinh",
      icon: <Cpu />,
    },
    {
      id: "dong-ho",
      name: "Đồng hồ",
      slug: "dong-ho",
      icon: <Watch />,
    },
    {
      id: "am-thanh",
      name: "Âm thanh",
      slug: "am-thanh",
      icon: <Headphones />,
    },
  ];
  if(loading) return <div>Loading...</div>
  return (
    <Nav className="flex-column gap-4 mt-3">
      {dataCategories?.map((c) => (
        <Nav.Link as={NavLink} to={c.slug} key={c.id} end>
          <p className="sidebar-client-item m-0">
            {c.icon} {c.name}
          </p>
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Categories;