import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { usePurchases } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";
import { getBookId } from "../utils/bookIds";
import { verifyPayment } from "../services/paymentService";
import PaystackGateway from "../components/PaystackGateway";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { addPurchase } = usePurchases();
  const { user } = useAuth();
  const [method] = useState("card");
  const [couponInput, setCouponInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const hasInvalidItems = cart.some((item) => !item._id);
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const handleSuccess = async (response) => {
    try {
      const reference =
        response?.reference || response?.transaction?.reference;

      if (!reference) return;

      const result = await verifyPayment({
        reference,
        cart,
      });

      if (result?.success) {
        const purchasedBooks =
          result?.purchases?.length ? result.purchases : cart;

        addPurchase(purchasedBooks);
        clearCart();
        navigate("/success");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  const applyCoupon = () => {
    if (couponInput === "BOOK10") {
      setDiscount(total * 0.1); // 10% off
    } else if (couponInput === "BOOK20") {
      setDiscount(total * 0.2); // 20% off
    } else {
      setDiscount(0);
      alert("Invalid coupon");
    }
  };
  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

        <section className="bg-gray-900 border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="mb-6">
            <h1 className="text-3xl font-black mb-2">Checkout</h1>
            <p className="text-gray-400">
              Complete your purchase and instantly unlock your ebooks.
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="bg-gray-800 rounded-2xl p-8 text-center text-gray-400">
              Your cart is empty.
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={getBookId(item) || index}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded-xl"
                      />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.author}</p>
                      </div>
                    </div>

                    <p className="font-bold text-yellow-400">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <p>Total:</p>

                <div className="text-right">
                  <p className="line-through text-gray-400">
                    {formatPrice(total)}
                  </p>

                  <p className="text-yellow-400 font-bold">
                    {formatPrice(total - discount)}
                  </p>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="bg-gray-900 border border-white/10 rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

          {method === "card" && (
            <>
              {hasInvalidItems ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-red-400">
                  One or more items in your cart are no longer available.
                </div>
              ) : (
                <>
                <div className="flex gap-2 mb-4">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 rounded-xl bg-gray-800"
                    />

                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-yellow-400 text-black rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                  <PaystackGateway
                    amount={total}
                    email={user?.email || "guest@email.com"}
                    cart={cart}
                    metadata={{
                      books: cart.map((item) => item.title),
                      totalBooks: cart.length,
                      custom_fields: [
                        {
                          display_name: "Payment Type",
                          variable_name: "payment_type",
                          value: "ebook_purchase",
                        },
                      ],
                    }}
                    onSuccess={handleSuccess}
                  /> 
                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-sm text-green-300 mt-6">
                    Payments are securely processed through Paystack.
                  </div>
                </>
              )}
            </>
          )}
        </section>

      </div>
    </main>
  );
}