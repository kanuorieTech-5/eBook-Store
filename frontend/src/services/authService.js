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

// =========================
// LOGOUT
// =========================  
  export const logoutUser =
  async () => {
    const response =
      await API.post(
        "/auth/logout"
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
        "/auth/send-receipt",
        emailData
      );
    return response.data;
  };

// =========================
// SEND RECEIPT EMAIL (BACKEND)
// =========================  
import nodemailer from "nodemailer";

const sendReceipt = async (
  to,
  subject,
  html
) => {
  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
};

export default sendReceipt;
