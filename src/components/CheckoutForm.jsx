import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCreditCard,
  FiMapPin,
  FiPackage,
  FiTruck,
  FiLock,
  FiCheck,
} from "react-icons/fi";

import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems = [] } = useContext(CartContext);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [shipDifferent, setShipDifferent] = useState(false);

  const [formData, setFormData] = useState({
    personalName: "",
    personalEmail: "",
    password: "",
    confirmPassword: "",

    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    customerZip: "",
    customerCountry: "Nigeria",

    shippingName: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingZip: "",

    orderNotes: "",
    paymentMethod: "Paystack",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shippingCost + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // API CALL HERE
      console.log(formData);

      setTimeout(() => {
        navigate("/success");
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkoutSteps = [
    {
      id: 1,
      title: "Shipping",
      icon: <FiMapPin />,
    },
    {
      id: 2,
      title: "Review",
      icon: <FiPackage />,
    },
    {
      id: 3,
      title: "Payment",
      icon: <FiCreditCard />,
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        {/* HEADER */}
        <div className="mb-5">
          <h1
            className="fw-bold mb-2"
            style={{
              fontSize: "2.5rem",
              color: "#111827",
            }}
          >
            Secure Checkout
          </h1>

          <p
            style={{
              color: "#6b7280",
              maxWidth: "600px",
            }}
          >
            Complete your order securely with encrypted payment and
            fast delivery.
          </p>
        </div>

        {/* STEPPER */}
        <div className="d-flex align-items-center justify-content-between mb-5 flex-wrap gap-3">
          {checkoutSteps.map((item, index) => (
            <div
              key={item.id}
              className="d-flex align-items-center flex-grow-1"
            >
              <button
                type="button"
                onClick={() => setStep(item.id)}
                className="border-0 bg-transparent p-0 w-100"
              >
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background:
                        step >= item.id
                          ? "#111827"
                          : "#e5e7eb",
                      color:
                        step >= item.id
                          ? "#fff"
                          : "#6b7280",
                      fontSize: "18px",
                      transition: "0.3s",
                    }}
                  >
                    {step > item.id ? <FiCheck /> : item.icon}
                  </div>

                  <div className="ms-3 text-start">
                    <small
                      className="d-block"
                      style={{
                        color: "#9ca3af",
                        fontWeight: 500,
                      }}
                    >
                      Step {item.id}
                    </small>

                    <span
                      className="fw-semibold"
                      style={{
                        color: "#111827",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              </button>

              {index !== checkoutSteps.length - 1 && (
                <div
                  className="mx-3 d-none d-md-block"
                  style={{
                    height: "2px",
                    flex: 1,
                    background:
                      step > item.id
                        ? "#111827"
                        : "#d1d5db",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* LEFT SIDE */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* STEP 1 */}
              {step === 1 && (
                <div
                  className="bg-white p-4 p-lg-5"
                  style={{
                    borderRadius: "24px",
                    boxShadow:
                      "0 10px 40px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="mb-4">
                    <h3 className="fw-bold">
                      Shipping Information
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                      }}
                    >
                      Enter your billing and delivery details.
                    </p>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        className="form-control form-control-lg rounded-lg shadow-none py-3 px-3 border "
                        placeholder="full name"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* EMAIL */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2">
                        Email Address
                      </label>

                      <div className="input-group border rounded-4 overflow-hidden">
                        <span className="input-group-text bg-white border-0 px-3">
                          <i className="fas fa-envelope text-muted"></i>
                        </span>

                        <input
                          type="email"
                          className="form-control border-0 shadow-none py-3"
                          placeholder="stephanie@email.com"
                          name="customerEmail"
                          value={formData.customerEmail}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* PHONE */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2">
                        Phone Number
                      </label>

                      <div className="input-group border rounded-4 overflow-hidden">
                        <span className="input-group-text bg-white border-0 px-3">
                          +234
                        </span>

                        <input
                          type="text"
                          className="form-control border-0 shadow-none py-3"
                          placeholder="901 234 5678"
                          name="customerPhone"
                          value={formData.customerPhone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* COUNTRY */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2">
                        Country
                      </label>

                      <select
                        className="form-select py-3 rounded-4 shadow-none"
                        name="customerCountry"
                        value={formData.customerCountry}
                        onChange={handleChange}
                      >
                        <option>Nigeria</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Canada</option>
                      </select>
                    </div>

                    {/* POSTAL CODE */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2">
                        Postal Code 
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-4 shadow-none border px-3 rounded-lg shadow-none"
                        placeholder="100001"
                        name="customerZip"
                        value={formData.customerZip}
                        onChange={handleChange}
                      />
                    </div>

                    {/* ADDRESS */}
                    <div className="col-12">
                      <label className="form-label fw-semibold mb-2">
                        Delivery Address
                      </label>

                      <textarea
                        className="form-control rounded-4 shadow-none p-3"
                        rows="2"
                        placeholder="Enter your full delivery address..."
                        name="customerAddress"
                        value={formData.customerAddress}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  {/* ACCOUNT OPTION */}
                  <div
                    className="p-4 mt-4"
                    style={{
                      background: "#f9fafb",
                      borderRadius: "18px",
                    }}
                  >
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={createAccount}
                        onChange={() =>
                          setCreateAccount(!createAccount)
                        }
                        id="createAccount"
                      />

                      <label
                        htmlFor="createAccount"
                        className="form-check-label fw-semibold"
                      >
                        Create account for faster checkout
                      </label>
                    </div>

                    {createAccount && (
                      <div className="row g-3 mt-3">
                        <div className="col-md-6">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SHIPPING TO DIFFERENT ADDRESS */}
                  <div className="mt-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={shipDifferent}
                        onChange={() =>
                          setShipDifferent(!shipDifferent)
                        }
                        id="shipDifferent"
                      />

                      <label
                        htmlFor="shipDifferent"
                        className="form-check-label fw-semibold"
                      >
                        Ship to a different address
                      </label>
                    </div>
                  </div>

                  {shipDifferent && (
                    <div className="row g-4 mt-2">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control form-control-lg border rounded-lg shadow-none py-3 px-3"
                          placeholder="Receiver Name"
                          name="shippingName"
                          value={formData.shippingName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control form-control-lg border rounded-lg shadow-none py-3 px-3"
                          placeholder="Receiver Phone"
                          name="shippingPhone"
                          value={formData.shippingPhone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control form-control-lg border rounded-lg shadow-none py-3 px-3"
                          placeholder="Shipping Address"
                          name="shippingAddress"
                          value={formData.shippingAddress}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* NOTES */}
                  <div className="mt-4">
                    <label className="form-label fw-semibold">
                      Order Notes
                    </label>

                    <textarea
                      rows="5"
                      className="form-control"
                      placeholder="Add delivery instructions..."
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleChange}
                    />
                  </div>

                  {/* BUTTON */}
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn btn-dark btn-lg px-5"
                      style={{
                        borderRadius: "14px",
                      }}
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div
                  className="bg-white p-4 p-lg-5"
                  style={{
                    borderRadius: "24px",
                    boxShadow:
                      "0 10px 40px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="mb-4">
                    <h3 className="fw-bold">
                      Order Review
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                      }}
                    >
                      Confirm your selected books before payment.
                    </p>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center py-4 border-bottom"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            item.image ||
                            "https://via.placeholder.com/80"
                          }
                          alt={item.title}
                          style={{
                            width: "80px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />

                        <div className="ms-3">
                          <h6 className="fw-bold mb-1">
                            {item.title}
                          </h6>

                          <small
                            style={{
                              color: "#6b7280",
                            }}
                          >
                            Quantity: {item.quantity}
                          </small>
                        </div>
                      </div>

                      <h6 className="fw-bold">
                        $
                        {(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </h6>
                    </div>
                  ))}

                  <div className="d-flex gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn btn-light btn-lg px-4"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn btn-dark btn-lg px-5 bg-purple-700"
                      style={{
                        borderRadius: "14px",
                      }}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div
                  className="bg-white p-4 p-lg-5"
                  style={{
                    borderRadius: "24px",
                    boxShadow:
                      "0 10px 40px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="mb-4">
                    <h3 className="fw-bold">
                      Payment Method
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                      }}
                    >
                      Your payment information is encrypted and
                      secure.
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {[
                      "Paystack",
                      "Paypal",
                      "Cash On Delivery",
                    ].map((method) => (
                      <label
                        key={method}
                        className={`p-4 border d-flex justify-content-between align-items-center`}
                        style={{
                          borderRadius: "18px",
                          cursor: "pointer",
                          border:
                            formData.paymentMethod === method
                              ? "2px solid #111827"
                              : "1px solid #e5e7eb",
                          background:
                            formData.paymentMethod === method
                              ? "#f9fafb"
                              : "#fff",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={
                              formData.paymentMethod ===
                              method
                            }
                            onChange={handleChange}
                          />

                          <span className="ms-3 fw-semibold">
                            {method}
                          </span>
                        </div>

                        <FiCreditCard size={20} />
                      </label>
                    ))}
                  </div>

                  <div className="d-flex gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn btn-light btn-lg px-4"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-success btn-lg px-5"
                      style={{
                        borderRadius: "14px",
                      }}
                    >
                      {loading
                        ? "Processing..."
                        : "Complete Order"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-4">
            <div
              className="bg-white p-4 position-sticky"
              style={{
                top: "30px",
                borderRadius: "24px",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.05)",
              }}
            >
              <div className="d-flex align-items-center mb-4">
                <FiPackage size={22} />

                <h4 className="fw-bold ms-2 mb-0">
                  Order Summary
                </h4>
              </div>

              {/* PRODUCTS */}
              <div className="mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-3"
                  >
                    <div>
                      <h6 className="mb-1 fw-semibold">
                        {item.title}
                      </h6>

                      <small
                        style={{
                          color: "#6b7280",
                        }}
                      >
                        Qty {item.quantity}
                      </small>
                    </div>

                    <strong>
                      $
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <hr />

              {/* PRICE */}
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="d-flex align-items-center">
                  <FiTruck className="me-2" />
                  Shipping
                </span>

                <strong>
                  {shippingCost === 0
                    ? "Free"
                    : `$${shippingCost.toFixed(2)}`}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>

                <strong>${tax.toFixed(2)}</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">Total</h5>

                <h4 className="fw-bold">
                  ${total.toFixed(2)}
                </h4>
              </div>

              {/* COUPON */}
              <div className="mt-4">
                <label className="form-label fw-semibold">
                  Promo Code
                </label>

                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter code"
                  />

                  <button className="btn btn-dark ms-2">
                    Apply
                  </button>
                </div>
              </div>

              {/* SECURITY */}
              <div
                className="mt-4 p-3"
                style={{
                  background: "#f9fafb",
                  borderRadius: "16px",
                }}
              >
                <div className="d-flex align-items-center">
                  <FiLock className="me-2" />

                  <small
                    style={{
                      color: "#4b5563",
                    }}
                  >
                    Secure SSL encrypted checkout
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}