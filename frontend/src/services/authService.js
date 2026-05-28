import API from "./axios";

// =========================
// REGISTER
// =========================
export const registerUser = async (
  userData
) => {
  const response =
    await API.post(
      "/api/auth/register",
      userData
    );

  return response.data;
};

// =========================
// LOGIN
// =========================
export const loginUser = async (
  userData
) => {
  const response =
    await API.post(
      "/api/auth/login",
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
        "/api/auth/profile"
      );

    return response.data;
  };

// =========================
// LOGOUT
// =========================
export const logoutUser =
  async () => {
    const response =
      await API.post(
        "/api/auth/logout"
      );

    return response.data;
  };

// =========================
// SEND RECEIPT EMAIL
// =========================
export const sendReceiptEmail =
  async (emailData) => {
    const response =
      await API.post(
        "/api/auth/send-receipt",
        emailData
      );

    return response.data;
  };
