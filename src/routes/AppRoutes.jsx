import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Dashboard from "../pages/Dashboard";
import MyLibrary from "../pages/MyLibrary";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/profile";
import Success from "../pages/OrderSuccess";
import CheckoutForm from "../components/CheckoutForm";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/Mylibrary" element={<MyLibrary />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/success" element={<OrderSuccess />} />
      <Route path="/checkoutform" element={<CheckoutForm />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/MyLibrary" element={<ProtectedRoute> <MyLibrary /></ProtectedRoute>}/>
    </Routes>
  );
}