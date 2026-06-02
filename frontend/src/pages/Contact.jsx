import {
  useState,
} from "react";

import {
  sendContactMessage,
} from "../services/contactService";

export default function Contact() {
  // =====================================
  // STATE
  // =====================================
  const [form, setForm] =
    useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  // =====================================
  // HANDLE CHANGE
  // =====================================
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================
  // SUBMIT
  // =====================================
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      setSuccess("");

      setError("");

      try {
        const response =
          await sendContactMessage(
            form
          );

        setSuccess(
          response.message
        );

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main
      className="
        min-h-screen
        px-4
        py-16
      "
    >
      <div
        className="
          max-w-3xl
          mx-auto
        "
      >
        {/* HEADER */}
        <div
          className="
            text-center
            mb-12
          "
        >
          <h1
            className="
              text-5xl
              font-black
              mb-4
            "
          >
            Contact Us
          </h1>

          <p
            className="
              text-gray-400
              text-lg
            "
          >
            Have questions,
            feedback or support
            requests? Send us a
            message.
          </p>
        </div>

        {/* CARD */}
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-8
            backdrop-blur-xl
          "
        >
          {/* SUCCESS */}
          {success && (
            <div
              className="
                bg-green-500/20
                border
                border-green-500/30
                text-green-400
                p-4
                rounded-2xl
                mb-6
              "
            >
              {success}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div
              className="
                bg-red-500/20
                border
                border-red-500/30
                text-red-400
                p-4
                rounded-2xl
                mb-6
              "
            >
              {error}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={
              handleSubmit
            }
            className="
              space-y-6
            "
          >
            {/* NAME */}
            <div>
              <label
                className="
                  block
                  mb-2
                  font-semibold
                "
              >
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                required
                placeholder="John Doe"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  outline-none
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                className="
                  block
                  mb-2
                  font-semibold
                "
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={
                  handleChange
                }
                required
                placeholder="example@email.com"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  outline-none
                "
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label
                className="
                  block
                  mb-2
                  font-semibold
                "
              >
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={
                  form.subject
                }
                onChange={
                  handleChange
                }
                required
                placeholder="Support Request"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  outline-none
                "
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label
                className="
                  block
                  mb-2
                  font-semibold
                "
              >
                Message
              </label>

              <textarea
                name="message"
                value={
                  form.message
                }
                onChange={
                  handleChange
                }
                required
                rows="6"
                placeholder="Write your message..."
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  outline-none
                  resize-none
                "
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full

                bg-yellow-400
                hover:bg-yellow-300

                text-black
                font-bold

                py-4
                rounded-2xl

                transition-all
              "
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}