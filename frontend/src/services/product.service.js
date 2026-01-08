import axiosClient from "../api/axiosClient";

const productService = {
    getAllProduct(){
        return axiosClient.get("/products/");
    }
}

export default productService;