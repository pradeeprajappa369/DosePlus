import axios from "axios";

const instance = axios.create({
  baseURL: "https://18.60.129.193/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // localStorage.clear();
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
