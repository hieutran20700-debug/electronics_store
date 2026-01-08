import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../assets/styles/client/home/homepage.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Smartphone } from "lucide-react";
import { Laptop } from "lucide-react";
import { TabletSmartphone } from "lucide-react";
import { Monitor } from "lucide-react";
import { Cpu } from "lucide-react";
import { Watch } from "lucide-react";
import { Headphones } from "lucide-react";
import Slider from "../../components/common/Slider";
import Banner1 from "../../assets/images/banner1.webp"
import Banner2 from "../../assets/images/banner2.webp";
import Banner3 from "../../assets/images/banner3.webp";


import Subbanner from "../../assets/images/subbanner.png";
import Product from "../product/Products"


const sliderData = [
  {
    image: Banner1,
    title: "iPhone 15 Pro Max",
    description: "Giảm giá lên đến 5 triệu",
  },
  {
    image: Banner2,
    title: "Samsung Galaxy S25",
    description: "Ưu đãi đặc biệt hôm nay",
  },
  {
    image: Banner3,
    title: "Xiaomi Note 13",
    description: "Giá tốt nhất phân khúc",
  },
];
  
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


const HomePage = () => {
  return (
    <Row>
      <Col xs={3}>
        <div className="box-categories">
          <h4 className="title-sidebar">Danh mục</h4>
          <Nav className="flex-column gap-4 mt-3">
            {dataCategories?.map((c) => (
              <Nav.Link as={NavLink} to={c.slug} end>
                <p className="sidebar-client-item m-0">
                  {c.icon} {c.name}
                </p>
              </Nav.Link>
            ))}
          </Nav>
        </div>
      </Col>
      <Col xs={9}>
        <div className="slider-wrapper">
          <Slider images={sliderData} />
        </div>
        <Row className="mt-4">
          <Col xs={12} md={5}>
            <img className="subbanner w-100 h-100" src={Subbanner} alt="" />
          </Col>
          <Col xs={12} md={3}>
            <Product />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomePage;
