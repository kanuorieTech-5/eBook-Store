import axios from "axios";

const API_URL =
  "http://localhost:5000/api/payments";

export const verifyPayment =
  async (paymentData) => {
    const response =
      await axios.post(
        `${API_URL}/verify`,
        paymentData
      );

    return response.data;
  };