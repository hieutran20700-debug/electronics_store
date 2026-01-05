const CategoryService = require("./category.service");

class CategoryController{
    async create(req, res, next){
        try{
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json({
                message: "Category created successfully",
                data: category,
            })
        }catch(error){
            next(error);
        }
    }

    async getAll(req, res, next){
        try{
            const categories = await CategoryService.getAllCategories();
           res.status(200).json({     
             message: "Get all categories successfully", 
             data: categories,
           });
        }catch(error){
            next(error);
        }
    }

    async update(req, res, next){
        try{
            const {id} = req.params;
            const category = await CategoryService.updateCategory(id, req.body);
            res.status(200).json({
                message: "Category update successfully",
                data: category,
            })
        }catch(error){
            next(error);
        }
    }

    async deactivate(req, res, next){
        try{
            const {id} = req.params;
            const category = await CategoryService.deactivateCategory(id);
            res.status(200).json({
                message: "Category deactivate",
                data: category,
            })
        }catch(error){
            next(error)
        }
    }
}

module.exports = new CategoryController();