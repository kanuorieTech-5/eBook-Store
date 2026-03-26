import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow relative">

      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        📚 E-Library
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <Link to="/cart" className="relative">
          🛒 Cart

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        <Link to="/profile">
          👤
        </Link>

        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-16 right-6 bg-white shadow-lg rounded-xl p-4 w-40 text-black">

          <Link
            to="/Home"
            className="block py-2 hover:bg-gray-200 rounded"
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="block py-2 hover:bg-gray-200 rounded"
          >
            Profile
          </Link>

          <Link
            to="/Mylibrary"
            className="block py-2 hover:bg-gray-200 rounded"
          >
            My Library
          </Link>

          <Link
            to="/login"
            className="block py-2 hover:bg-gray-200 rounded"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block py-2 hover:bg-gray-200 rounded"
          >
            Register
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              navigate("/login");
            }}
            className="block py-2 text-red-500 hover:text-red-700 w-full text-left"
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
}