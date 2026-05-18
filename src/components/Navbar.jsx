import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import SearchBar from "./SearchBar";
import {
  FaMoon,
  FaSun,
} from "react-icons/fa";

import {
  useTheme,
} from "../context/ThemeContext";

export default function Navbar() {
  const {cart, totalItems, totalPrice} = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;
  const {darkMode, toggleTheme,} = useTheme();
  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow relative">

      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        📚 eBook Store
      </Link>

      {/* Search */}
      <div className="hidden md:block w-[300px]">
        <SearchBar />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Cart */}
        <Link to="/cart" className="relative text-xl">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className={`text-xl ${isActive("/profile") ? "text-yellow-300" : ""}`}
        >
          👤
        </Link>

        {/* Menu */}
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-16 right-6 z-[9999] w-40 p-4 rounded-2xl border border-white/10 bg-white/95
          dark:bg-gray-900/95 backdrop-blur-2xl shadow-2xl shadow-black/20 text-black dark:text-white animate-in fade-in
          zoom-in-95 duration-200" ref={menuRef}>
          <button
            onClick={toggleTheme}
            className="w-10 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition">
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-white" />
            )}
          </button>
          
          <Link to="/" className="block py-2 hover:bg-gray-200 rounded">
            Home
          </Link>

          <Link to="/books" className="block py-2 hover:bg-gray-200 rounded">
            Books
          </Link>

          <Link to="/profile" className="block py-2 hover:bg-gray-200 rounded">
            Profile
          </Link>

          <Link to="/MyLibrary" className="block py-2 hover:bg-gray-200 rounded">
            My Library
          </Link>

          <Link to="/login" className="block py-2 hover:bg-gray-200 rounded">
            Login
          </Link>

          <Link to="/register" className="block py-2 hover:bg-gray-200 rounded">
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