import { useLocation } from "react-router";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  // /admin, /login, /forget နဲ့ /reset လမ်းကြောင်းတွေမှာ Layout ဖျောက်ဖို့ ပြင်လိုက်ပါ
  const hideLayout =
    location.pathname.startsWith("/admin")
    || location.pathname === "/login"
    || location.pathname === "/forget" // path name ကို Router ထဲကအတိုင်း ပြင်ပါ
    || location.pathname.startsWith("/reset"); // reset path ကို ထည့်ပေးရပါမယ်

  return (
    <div className="main-wrapper">
      {!hideLayout && <Navbar />}

      <div className={`content-wrapper ${!hideLayout ? "py-2 mt-3" : ""}`}>
        <Outlet />
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
}
