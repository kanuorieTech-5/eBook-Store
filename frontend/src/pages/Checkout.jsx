import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { usePurchases, } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";
import { getBookId,} from "../utils/bookIds";
import { verifyPayment } from "../services/paymentService";
import PaystackGateway from "../components/PaystackGateway";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { addPurchase, } = usePurchases();
  const { user } = useAuth();
  const [method, setMethod] =
    useState("paystack");
  const hasInvalidItems =
    cart.some((item) => !item._id);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price * item.quantity || 0),
    0
  );

  const handleSuccess = async (response) => {
  try {
    const reference =
      response?.reference ||
      response?.transaction?.reference;

    if (!reference) {
      console.error("No payment reference returned");
      return;
    }

    const result = await verifyPayment({
      reference,
      cart,
    });

    if (result?.success) {
      const purchasedBooks =
        result?.purchases?.length
          ? result.purchases
          : cart;

      addPurchase(purchasedBooks);
      clearCart();
      navigate("/success");
      } else {
        console.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  return (
    <main className="
      min-h-screen
      bg-black
      text-white
      px-4
      py-10
    ">
      <div className="
        max-w-6xl
        mx-auto
        grid
        lg:grid-cols-2
        gap-8
      ">

        {/* ORDER SUMMARY */}
        <section className="
          bg-gray-900
          border border-white/10
          rounded-3xl
          p-6
          shadow-xl
        ">
          <div className="mb-6">
            <h1 className="
              text-3xl
              font-black
              mb-2
            ">
              Checkout
            </h1>

            <p className="text-gray-400">
              Complete your purchase and
              instantly unlock your ebooks.
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="
              bg-gray-800
              rounded-2xl
              p-8
              text-center
            ">
              <p className="text-gray-400">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={getBookId(item) || index}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b border-white/10
                    pb-4
                  "
                >
                  <div className="
                    flex
                    items-center
                    gap-4
                  ">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="
                        w-16
                        h-20
                        object-cover
                        rounded-xl
                      "
                    />

                    <div>
                      <h3 className="
                        font-semibold
                        text-white
                      ">
                        {item.title}
                      </h3>

                      <p className="
                        text-sm
                        text-gray-400
                      ">
                        {item.author}
                      </p>
                    </div>
                  </div>

                  <p className="
                    font-bold
                    text-yellow-400
                  ">
                    ₦
                    {Number(
                      item.price
                    ).toLocaleString()}
                  </p>
                </div>
              ))}

              {/* TOTAL */}
              <div className="
                flex
                justify-between
                items-center
                pt-6
                text-xl
                font-bold
              ">
                <span>Total</span>

                <span className="
                  text-yellow-400
                ">
                  ₦
                  {total.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* PAYMENT SECTION */}
        <section className="
          bg-gray-900
          border border-white/10
          rounded-3xl
          p-6
          shadow-xl
        ">
          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">
            Payment Method
          </h2>

          {/* PAYMENT METHOD SWITCHER */}
          <div className="
            flex
            flex-wrap
            gap-3
            mb-8
          ">
            {[
              "card",
              "bank",
            ].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setMethod(type)
                }
                className={`
                  px-5 py-3
                  rounded-2xl
                  font-semibold
                  transition-all
                  ${
                    method === type
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }
                `}
              >
              {type === "card" &&
                "Card / Bank / USSD"}

              {type === "bank" &&
                "Bank Transfer"}
              </button>
            ))}
          </div>

          {/* CARD / PAYSTACK PAYMENT */}
          {method === "card" && (
            hasInvalidItems ? (
              <div
                className="
                  rounded-2xl
                  border border-red-500/20
                  bg-red-500/10
                  p-4
                  text-center
                  text-red-400
                "
              >
                One or more items in your cart
                are no longer available.
              </div>
            ) : (
              <div className="space-y-6">

                {/* PAYMENT INFO */}
                <div
                  className="
                    bg-gray-800
                    border border-white/10
                    rounded-2xl
                    p-5
                  "
                >
                  <h3
                    className="
                      text-lg
                      font-bold
                      mb-4
                    "
                  >
                    Secure Online Payment
                  </h3>

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-3
                      text-sm
                    "
                  >
                    <div
                      className="
                        bg-gray-900
                        rounded-xl
                        p-3
                      "
                    >
                      💳 Visa
                    </div>

                    <div
                      className="
                        bg-gray-900
                        rounded-xl
                        p-3
                      "
                    >
                      💳 Mastercard
                    </div>

                    <div
                      className="
                        bg-gray-900
                        rounded-xl
                        p-3
                      "
                    >
                      🇳🇬 Verve
                    </div>

                    <div
                      className="
                        bg-gray-900
                        rounded-xl
                        p-3
                      "
                    >
                      🏦 Bank Transfer
                    </div>

                    <div
                      className="
                        bg-gray-900
                        rounded-xl
                        p-3
                      "
                    >
                      📱 USSD
                    </div>

                    <div
                      className="
                        bg-gray-900
                        rounded-xl
                        p-3
                      "
                    >
                      🔒 Secure Checkout
                    </div>
                  </div>
                </div>

                <PaystackGateway
                  amount={total}
                  email={
                    user?.email ||
                    "guest@email.com"
                  }
                  cart={cart}
                  metadata={{
                    books: cart.map(
                      (item) => item.title
                    ),

                    totalBooks:
                      cart.length,

                    custom_fields: [
                      {
                        display_name:
                          "Payment Type",

                        variable_name:
                          "payment_type",

                        value:
                          "ebook_purchase",
                      },
                    ],
                  }}
                  onSuccess={
                    handleSuccess
                  }
                />

                {/* SECURITY NOTICE */}
                <div
                  className="
                    bg-green-500/10
                    border border-green-500/20
                    rounded-2xl
                    p-4
                    text-sm
                    text-green-300
                  "
                >
                  Payments are securely
                  processed through Paystack
                  with support for all major
                  Nigerian bank cards and
                  payment methods.
                </div>

              </div>
            )
          )}

          {/* BANK TRANSFER */}
          {method === "bank" && (
            <div className="
              bg-gray-800
              rounded-2xl
              p-6
              space-y-4
            ">
              <h3 className="
                text-xl
                font-bold
              ">
                Bank Transfer
              </h3>

              <div className="
                text-gray-300
                space-y-2
              ">
                <p>
                  <span className="font-semibold">
                    Bank:
                  </span>{" "}
                  Example Bank
                </p>

                <p>
                  <span className="font-semibold">
                    Account Number:
                  </span>{" "}
                  1234567890
                </p>

                <p>
                  <span className="font-semibold">
                    Account Name:
                  </span>{" "}
                  UketBooks Digital
                </p>
              </div>

              <div className="
                bg-yellow-400/10
                border border-yellow-400/20
                text-yellow-300
                p-4
                rounded-2xl
                text-sm
              ">
                Your ebooks will be
                delivered after payment
                confirmation.
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
