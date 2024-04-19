import axios from "axios";

// const baseURL = "http://localhost:8000/api/";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_WEB,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(function (response) {
  return response;
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect the user to the login page or handle the unauthorized situation
      // Example using window.location:
      window.location.href = "/"; // Replace with your login page URL
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
