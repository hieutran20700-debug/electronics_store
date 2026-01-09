import React, { useEffect, useState } from 'react';
import CategoriesTable from './CategoriesTable';
import categoryService from '../../../services/category.service';
import "../../../assets/styles/admin/categories.css";
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try{
              const res = await categoryService.getAllCategories();
              const categories = res.data.data;
              setCategories(categories)
              console.log(categories)
              
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <div className='table-wrapper'>
            <CategoriesTable categories={categories}/>
        </div>
    );
};

export default Categories;