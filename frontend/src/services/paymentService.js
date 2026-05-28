import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL +
  "payments"  || "http://localhost:5000/api/payments";

export const verifyPayment =
  async (paymentData) => {
    const response =
      await axios.post(
        `${API_URL}/verify`,
        paymentData
      );

    return response.data;
  };