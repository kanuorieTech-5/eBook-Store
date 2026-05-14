import { PaystackButton } from "react-paystack";
import { useState } from "react";

export default function PaymentButton({ book, user }) {
  const [loading, setLoading] = useState(false);

  const publicKey = import.meta.env.VITE_PAYSTACK_KEY;

  const amount = Number(book.price) * 100; // kobo conversion

  const componentProps = {
    email: user?.email || "guest@email.com",
    amount,
    publicKey,
    text: loading ? "Processing..." : `Buy Now - ₦${book.price}`,

    onStart: () => {
      setLoading(true);
    },

    onSuccess: (reference) => {
      setLoading(false);

      console.log("Payment success:", reference);

      // 🚨 PRODUCTION FLOW (IMPORTANT)
      // DO NOT redirect directly to file
      // Instead verify payment with backend first

      window.location.href = `/success?ref=${reference.reference}`;
    },

    onClose: () => {
      setLoading(false);
    },
  };

  return (
    <PaystackButton
      {...componentProps}
      className="bg-yellow-400 hover:bg-yellow-300 transition text-black px-6 py-3 rounded-xl font-bold w-full"
    />
  );
}