import React, { useState, useEffect } from "react";
import productService from "../../services/product.service";
import ProductList from "./ProductList";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAllProduct();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return <>{loading ? <p>Loading...</p> : <ProductList data={products} />}</>;
};

export default Products;
