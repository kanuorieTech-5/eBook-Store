import API from "./axios";

// =========================
// REGISTER
// =========================
export const registerUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/register",
        userData
      );

    return response.data;
  };

// =========================
// LOGIN
// =========================
export const loginUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/login",
        userData
      );

    return response.data;
  };

// =========================
// GET PROFILE
// =========================
export const getProfile =
  async () => {
    const response =
      await API.get(
        "/auth/profile"
      );

    return response.data;
  };