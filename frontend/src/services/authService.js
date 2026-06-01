import API from "./axios";

// =========================
// SAVE TOKEN
// =========================
const saveToken = (
  token
) => {
  if (token) {
    localStorage.setItem(
      "token",
      token
    );
  }
};

// =========================
// REGISTER
// =========================
export const registerUser =
  async (userData) => {
    try {await API.post("/auth/register", userData);

      // Save token if backend returns one
      saveToken(
        response.data?.token
      );

      return response.data;
    } catch (error) {
      console.error(
        "Registration Error:",
        error?.response?.data ||
          error.message
      );

      throw error;
    }
  };

// =========================
// LOGIN
// =========================
export const loginUser =
  async (userData) => {
    try {await API.post("/auth/login", userData);

      // Save auth token
      saveToken(
        response.data?.token
      );

      return response.data;
    } catch (error) {
      console.error(
        "Login Error:",
        error?.response?.data ||
          error.message
      );

      throw error;
    }
  };

// =========================
// GET PROFILE
// =========================
export const getProfile =
  async () => {
    try {await API.get("/auth/profile");
      return response.data;
    } catch (error) {
      console.error(
        "Profile Error:",
        error?.response?.data ||
          error.message
      );

      throw error;
    }
  };

// =========================
// LOGOUT
// =========================
export const logoutUser =
  async () => {
    try { const response = await API.post("/auth/logout");

      // Remove local token
      localStorage.removeItem(
        "token"
      );

      return response.data;
    } catch (error) {
      console.error(
        "Logout Error:",
        error?.response?.data ||
          error.message
      );

      // Still remove token locally
      localStorage.removeItem(
        "token"
      );

      throw error;
    }
  };

// =========================
// SEND RECEIPT EMAIL
// =========================
export const sendReceiptEmail =
  async (emailData) => {
    try {await API.post("/auth/send-receipt", emailData);

      return response.data;
    } catch (error) {
      console.error(
        "Receipt Email Error:",
        error?.response?.data ||
          error.message
      );

      throw error;
    }
  };