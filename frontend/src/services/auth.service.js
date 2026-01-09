import axiosClient from "../api/axiosClient";

const authService = {
    login(body){
        return axiosClient.post("/auth/login", body);
    },

    register(body){
        return axiosClient.post("/auth/register", body);
    },

    logout(){
        return axiosClient.post("/auth/logout");
    }

}

export default authService;