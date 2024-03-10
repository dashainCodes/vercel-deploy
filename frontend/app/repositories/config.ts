import axios from "axios";

export const AxiosInstance = axios.create({
  // baseURL: `${import.meta.env.VITE_REACT_API_URL}`,
  // baseURL: "http://localhost:5007/api",
  // withCredentials:true
  baseURL: "https://backend.expertbusiness.com.np/api",
   withCredentials:true
});

// AxiosInstance.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("accessToken");
//   // config.headers.Authorization = `Bearer ${accessToken}`;
//   config.headers.Authorization = accessToken;
//   return config;
// });

