import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const verifyPayment = async (
  paymentData
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/payments/verify`,
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