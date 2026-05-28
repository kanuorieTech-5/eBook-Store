import axios from "axios";

// =========================
// API INSTANCE
// =========================
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000",

  headers: {
    "Content-Type":
      "application/json",
  },

  withCredentials: true,
});

// =========================
// AUTO ATTACH TOKEN
// =========================
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

// =========================
// RESPONSE ERROR HANDLER
// =========================
API.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      "API Error:",
      error?.response?.data ||
        error.message
    );

    return Promise.reject(error);
  }
);

export default API;
