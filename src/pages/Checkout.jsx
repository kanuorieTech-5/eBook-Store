import { useNavigate } from "react-router-dom";
import PaymentGateway from "../components/PaymentGateway";
export default function Checkout() {
  const navigate = useNavigate();

  const handlePayment = () => {
    setTimeout(() => navigate("/OrderSuccess"), 1500);
  };

  return (
    <PaymentGateway onSuccess={handlePayment} />
  );
}