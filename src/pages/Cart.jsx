import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded mt-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>{item.title}</span>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-4 font-bold">
        Total: ${total.toFixed(2)}
      </div>

      <button
        onClick={() => navigate("/Checkoutform")}
        className="bg-green-600 text-white w-full py-2 rounded mt-4"
      >
        Checkout
      </button>
    </div>
  );
}