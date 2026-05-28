import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const API_URL = `${BASE_URL}/api/payments`;

export const verifyPayment = async (
  paymentData
) => {
  try {
    const response =
      await axios.post(
        `${API_URL}/verify`,
        paymentData
      );

    return response.data;
  } catch (error) {
    console.error(
      "Payment verification failed:",
      error
    );

    throw error;
  }
};