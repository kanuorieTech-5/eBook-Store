import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    login(email, password);
    navigate("/profile");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        className="border w-full p-2 mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-purple-600 text-white w-full py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}