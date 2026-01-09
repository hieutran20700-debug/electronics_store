import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../assets/styles/client/home/homepage.css";

import Slider from "../../components/common/Slider";
import Banner1 from "../../assets/images/banner1.webp"
import Banner2 from "../../assets/images/banner2.webp";
import Banner3 from "../../assets/images/banner3.webp";
import Subbanner from "../../assets/images/subbanner.png";
import Product from "../../components/product/Products"
import Category from "../../components/categories/Category";

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
  



const HomePage = () => {
  return (
    <Row>
      <Col xs={3}>
       <Category />
      </Col>
      <Col xs={9}>
        <div className="slider-wrapper">
          <Slider images={sliderData} />
        </div>
        <div className="products mt-4">
          <Row>
            <Col xs={12} md={6}>
              <img
                className="subbanner w-100 h-100 rounded"
                src={Subbanner}
                alt=""
              />
            </Col>
            <Product />
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default HomePage;
