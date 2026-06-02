import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  getBookId,
} from "../utils/bookIds";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalItems,
  } = useContext(CartContext);

  const navigate = useNavigate();
const formatPrice = (price) =>
  Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            Your cart is empty.
          </div>
        )}

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={getBookId(item)}
              className="flex flex-col gap-4 bg-gray-800 p-4 rounded-xl sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">
                  {formatPrice(item.price)} x {item.quantity}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(getBookId(item))}
                  className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                  aria-label={`Decrease ${item.title} quantity`}
                >
                  -
                </button>

                <span className="min-w-6 text-center font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(getBookId(item))}
                  className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                  aria-label={`Increase ${item.title} quantity`}
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(getBookId(item))}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-yellow-400">
              {formatPrice(totalPrice)}
            </span>
          </div>
        )}

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-gray-800 hover:bg-gray-700 transition py-3 rounded-xl font-semibold"
          >
            Clear Cart ({totalItems} items)
          </button>
        )}

        {cart.length > 0 && (
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl font-semibold"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}
