import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { totalPrice, totalItems } = useContext(CartContext);
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price * item.quantity || 0),
    0
  );
  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl p-6 shadow-lg">

        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

        {/* EMPTY STATE */}
        {cart.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            Your cart is empty 😢
          </div>
        )}

        {/* CART ITEMS */}
        <div className="space-y-4">

          {cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-xl"
            >

              {/* ITEM INFO */}
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">
                  ₦{totalPrice.toLocaleString()}
                </p>
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                Remove
              </button>

            </div>
          ))}

        </div>

        {/* TOTAL */}
        {cart.length > 0 && (
          <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-yellow-400">
              ₦{totalPrice.toLocaleString()}
            </span>
          </div>
        )}

        {/* CHECKOUT BUTTON */}
        {cart.length > 0 && (
          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl font-semibold"
          >
            Proceed to Checkout
          </button>
        )}

      </div>

    </div>
  );
}