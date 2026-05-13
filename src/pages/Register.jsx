import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded mt-10 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
        <p className="mb-4 text-gray-600">
          Registration is currently closed. Please check back later.
        </p>

         <button
        onClick={() => navigate("/home")}
        className="bg-purple-600 text-white w-full py-2 rounded"
      >
        Go to Home
      </button>
    </div>
  );
}