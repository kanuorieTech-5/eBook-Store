import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

export default function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [form, setForm] =
    useState({
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
        await login(
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
          Welcome Back
        </h1>

        <p
          className="
            text-gray-400
            mb-8
          "
        >
          Login to continue
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
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p
          className="
            text-gray-400
            mt-6
            text-center
          "
        >
          Don’t have an
          account?{" "}
          <Link
            to="/register"
            className="
              text-yellow-400
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}