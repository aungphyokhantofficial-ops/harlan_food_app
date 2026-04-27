import React from "react";
import Menu from "../pages/Menu";
import Reservation from "../pages/Reservation";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3">
      <div className="container">
        {/* ၁။ Logo အပိုင်း */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="https://harlanrestaurant.com/images/logo.jpg" // သင့် Logo URL ကို ဒီမှာထည့်ပါ
            alt="Logo"
            className="me-2 logo-img"
          />
          <span className="fw-bold text-warning" style={{ letterSpacing: "1px" }}>
            HARLAN'S PATTAYA
          </span>
        </a>

        {/* Mobile အတွက် Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ၂။ Menu Items (အလယ်ပို့ရန် ms-auto me-auto သုံးထားသည်) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#" onClick={() => navigate("/")}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={() => navigate("/menu")}>
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={() => navigate("/reservation")}>
                Reservation
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => navigate("/gallery")}>
                Gallery
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => navigate("/about")}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => navigate("/contact")}>
                Contact
              </a>
            </li>
          </ul>

          {/* ၃။ ညာဘက်ခြမ်း User Profile / Name */}
          {/* ညာဘက်ခြမ်း User Profile Dropdown */}
          <button className="btn btn-warning" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
