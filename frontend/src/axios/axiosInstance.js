import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for base URL
});

// Set 'Content-Type' to 'application/json' only for JSON requests
axiosInstance.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  } else {
    delete config.headers["Content-Type"]; // Let axios set it automatically
  }
  return config;
});

export default axiosInstance;
