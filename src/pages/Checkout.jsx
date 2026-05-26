import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { usePurchases, } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";

import PaystackGateway from "../components/PaystackGateway";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { addPurchase, } = usePurchases();
  const { user } = useAuth();
  const [method, setMethod] =
    useState("paystack");

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price * item.quantity || 0),
    0
  );

  const handleSuccess = (response) => {
    const purchasedBooks =
      response?.purchases?.length
        ? response.purchases
        : cart;

    addPurchase(purchasedBooks);
    clearCart();
    navigate("/success");
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
                  key={item.id || index}
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
              "paystack",
              "flutterwave",
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
                {type === "paystack" &&
                  "Paystack"}

                {type ===
                  "flutterwave" &&
                  "Flutterwave"}

                {type === "bank" &&
                  "Bank Transfer"}
              </button>
            ))}
          </div>

          {/* PAYSTACK */}
          {method === "paystack" && (
            <PaystackGateway
              amount={total}
              email={user?.email || "guest@email.com"}
              metadata={{
                books: cart.map(
                  (item) => item.title
                ),

                totalBooks: cart.length,
              }}
              onSuccess={handleSuccess}
            />
          )}

          {/* FLUTTERWAVE */}
          {method ===
            "flutterwave" && (
            <div className="
              bg-gray-800
              rounded-2xl
              p-6
            ">
              <p className="
                text-gray-300
                mb-6
              ">
                Flutterwave integration
                coming soon.
              </p>

              <button
                className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-yellow-400
                  hover:bg-yellow-300
                  text-black
                  font-bold
                  transition
                "
              >
                Coming Soon
              </button>
            </div>
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
