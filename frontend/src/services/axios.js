import axios from "axios";

// =========================
// BASE URL
// =========================
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

// =========================
// API INSTANCE
// =========================
const API = axios.create({
  baseURL: BASE_URL,

  withCredentials: true,

  timeout: 15000,
});

// =========================
// REQUEST INTERCEPTOR
// =========================
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    // Attach token
    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(
      error
    );
  }
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
API.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      "API Error:",
      error?.response?.data ||
        error.message
    );

    // Auto logout on unauthorized
    if (
      error?.response?.status ===
      401
    ) {
      localStorage.removeItem(
        "token"
      );

      // optional redirect
      window.location.href =
        "/login";
    }

    return Promise.reject(
      error
    );
  }
);

export default API;