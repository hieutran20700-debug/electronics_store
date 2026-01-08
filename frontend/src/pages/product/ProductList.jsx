import React from 'react';
import ProductCard from '../../components/common/ProductCard';
import Col from "react-bootstrap/Col";
import Product from "../../assets/images/iphone14.png";
const productData = [
  {
    id: "pr1",
    name: "iPhone 15 Pro Max 256GB - Chính hãng VN/A",
    price: 25990000,
    img: Product,
    description: "Giảm giá đến 2 triệu đồng khi thanh toán qua HSBC",
  },
  {
    id: "pr2",
    name: "Samsung Galaxy S25 Ultra 512GB",
    price: 27990000,
    img: Product,
    description: "Ưu đãi trả góp 0% lãi suất",
  },
  {
    id: "pr3",
    name: "Xiaomi 14T Pro 5G",
    price: 15990000,
    img: Product,
    description: "Tặng tai nghe Bluetooth trị giá 1 triệu",
  },
  {
    id: "pr4",
    name: "OPPO Find X7",
    price: 18990000,
    img: Product,
    description: "Thu cũ đổi mới trợ giá lên đến 3 triệu",
  },
];

const ProductList = ({data}) => {
  console.log(data)
    return (
      <>
        {data.map((item) => (
          <Col xs={12} md={3}>
            <ProductCard
              key={item.id}
              img={item.thumbnail}
              name={item.name}
              price={item.maxPrice}
              specs={item.specs}
              description={item.description}
            />
          </Col>
        ))}
      </>
    );
};

export default ProductList;