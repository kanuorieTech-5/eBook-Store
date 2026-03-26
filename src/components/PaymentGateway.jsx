import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/success");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 grid md:grid-cols-2 gap-6">

      {/* Order Summary */}
      <div className="bg-white shadow rounded p-6">

        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cart.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b py-2"
          >
            <span>{item.title}</span>
            <span>${item.price}</span>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total</span>
          <span>${total}</span>
        </div>

      </div>

      {/* Payment */}
      <div className="bg-white shadow rounded p-6 flex flex-col justify-between h-full ">

        <h2 className="text-xl font-bold mb-4">Payment Method</h2>

        <div className="flex gap-2 mb-4 flex-wrap">

          <button
            onClick={() => setMethod("card")}
            className={`px-3 py-2 border rounded ${
              method === "card" ? "bg-purple-600 text-white" : ""
            }`}
          >
            Card
          </button>

          <button
            onClick={() => setMethod("paystack")}
            className={`px-3 py-2 border rounded ${
              method === "paystack" ? "bg-purple-600 text-white" : ""
            }`}
          >
            Paystack
          </button>

          <button
            onClick={() => setMethod("flutterwave")}
            className={`px-3 py-2 border rounded ${
              method === "flutterwave" ? "bg-purple-600 text-white" : ""
            }`}
          >
            Flutterwave
          </button>

          <button
            onClick={() => setMethod("paypal")}
            className={`px-3 py-2 rounded border ${
              method === "paypal" ? "bg-purple-600 text-white" : ""
            }`}
          >
            PayPal
          </button>

          <button
            onClick={() => setMethod("bank")}
            className={`px-3 py-2 rounded border ${
              method === "bank" ? "bg-purple-600 text-white" : ""
            }`}
          >
            Bank
          </button>

        </div>

        {method === "card" && (
          <>
            <input
              className="border w-full p-2 mb-3"
              placeholder="Card Number"
            />

            <div className="flex gap-2">
              <input
                className="border w-1/2 p-2"
                placeholder="MM/YY"
              />
              <input
                className="border w-1/2 p-2"
                placeholder="CVV"
              />
            </div>
          </>
        )}

        {method === "paystack" && (
          <p className="text-gray-600 mb-4">
            Pay securely using Paystack.
          </p>
        )}

        {method === "flutterwave" && (
          <p className="text-gray-600 mb-4">
            Pay securely using Flutterwave.
          </p>
        )}

         {/* PayPal Info */}
      {method === "paypal" && (
        <p className="text-gray-600 mb-4">
          You will be redirected to PayPal to complete payment.
        </p>
      )}

      {/* Bank Transfer */}
      {method === "bank" && (
        <div className="text-gray-600 mb-4">
          <p>Bank: Example Bank</p>
          <p>Account: 123456789</p>
          <p>Name: E-Library</p>
        </div>
      )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-purple-600 text-white w-full py-3 rounded mt-6"
        >
          {loading ? "Processing..." : `Pay $${total}`}
        </button>

      </div>
    </div>
  );
}