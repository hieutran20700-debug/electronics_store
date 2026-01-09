import React from 'react';
import ProductCard from '../common/ProductCard';
import Col from "react-bootstrap/Col";

const ProductList = ({data}) => {

    return (
      <>
        {data.map((item) => (
          <Col xs={12} md={3} key={item.id}>
            <ProductCard
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