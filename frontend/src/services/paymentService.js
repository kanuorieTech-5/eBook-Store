import API from "./axios";

// =========================
// VERIFY PAYMENT
// =========================
export const verifyPayment =
  async (paymentData) => {
    const response =
      await API.post(
        "/payments/verify",
        paymentData
      );

    return response.data;
  };