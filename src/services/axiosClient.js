import axios from "axios";
import qs from "qs";
import { Redirect } from "react-router-dom";

const axiosClient = axios.create({
  baseURL: "https://elearning0706.cybersoft.edu.vn/api",
  paramsSerializer: (param) => qs.stringify(param, { skipNulls: true }),
});

axiosClient.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const { accessToken } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý kết quả trả về từ server
    return response;
  },
  // Xử lý nếu kết quả trả về bị lỗi
  (error) => {
    if (error.status === 401) {
      // Xử lý log out: clear Storage, đẩy người dùng vào trang login
      localStorage.clear();
      <Redirect to="/" />;
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
