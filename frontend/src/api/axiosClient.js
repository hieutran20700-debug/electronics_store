import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Nếu là refresh token mà lỗi thì logout
    if (originalRequest.url.includes("auth/refresh")) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Xử lý 401 hoặc 403 và chưa retry
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        localStorage.setItem("accessToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
