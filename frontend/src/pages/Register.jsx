import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

export default function Register() {
  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      setError("");

      const result =
        await register(
          form.name,
          form.email,
          form.password
        );

      setLoading(false);

      if (!result.success) {
        return setError(
          result.message
        );
      }

      navigate("/dashboard");
    };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        bg-black
        text-white
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-gray-900
          border
          border-gray-800
          rounded-3xl
          p-8
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-2
          "
        >
          Create Account
        </h1>

        <p
          className="
            text-gray-400
            mb-8
          "
        >
          Start building your
          digital library
        </p>

        {/* ERROR */}
        {error && (
          <div
            className="
              bg-red-500/20
              border
              border-red-500/30
              text-red-400
              p-3
              rounded-xl
              mb-4
            "
          >
            {error}
          </div>
        )}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={
              handleChange
            }
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-xl
              p-4
              outline-none
              focus:border-yellow-400
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={
              handleChange
            }
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-xl
              p-4
              outline-none
              focus:border-yellow-400
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={
              handleChange
            }
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-xl
              p-4
              outline-none
              focus:border-yellow-400
            "
          />

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
              rounded-xl
              transition-all
            "
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p
          className="
            text-gray-400
            mt-6
            text-center
          "
        >
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="
              text-yellow-400
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}