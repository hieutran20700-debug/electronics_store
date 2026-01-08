import React from "react";
import "../../assets/styles/client/common/productCard.css";
const ProductCard = ({ img, name, price, description }) => {
  return (
    <section className="product-card">
      <img className="product-img" src={img} alt={name} />

      <p className="product-name">{name}</p>
      <p className="product-price">{price} đ</p>
      <p className="product-desc">{description}</p>
    </section>
  );
};

export default ProductCard;
