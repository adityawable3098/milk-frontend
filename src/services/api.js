// src/services/api.js
import axios from "axios";

const BASE =
  process.env.REACT_APP_API_URL ||
  "https://milk-backend-production-f620.up.railway.app";

const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;