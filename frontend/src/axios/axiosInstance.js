// lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // You can use environment variables here
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
