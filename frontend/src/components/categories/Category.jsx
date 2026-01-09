import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import categoryService from "../../services/category.service";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryService.getAllCategories();
      const categories = res.data.data;
      setCategories(categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="box-categories">
      <h4 className="title-sidebar">Danh mục</h4>
      <Categories categories={categories} loading={loading} />
    </div>
  );
};

export default Category;
