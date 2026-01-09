import axiosClient from "../api/axiosClient";

const userService = {
  getMe() {
    return axiosClient.get("/user/me");
  },
};

export default userService;
