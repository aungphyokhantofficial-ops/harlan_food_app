import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  // localStorage ထဲမှာ token ရှိမရှိ စစ်ဆေးတာပါ
  const token = localStorage.getItem("token");

  if (!token) {
    // Token မရှိရင် Login page ကို ပြန်လွှတ်မယ်
    return <Navigate to="/login" replace />;
  }

  // Token ရှိရင် သွားချင်တဲ့ page ကို ပေးဝင်မယ်
  return children;
};

export default ProtectedRoute;
