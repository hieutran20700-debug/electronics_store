import React from "react";
import "../../assets/styles/client/common/productCard.css";

const ProductCard = ({ img, name, price, description, specs }) => {

  return (
    <section className="product-card">
      <img className="product-img" src={img} alt={name} />

      <p className="product-name">{name}</p>
      <p className="product-price">{price.toLocaleString("vi-VN")} đ</p>
      <div className="product-spec">
        {specs.map((s) => (
          <div className="product-spec-item">{s.value}</div>
        ))}
      </div>
      <p className="product-desc m-0">{description}</p>
    </section>
  );
};

export default ProductCard;
