import React from "react";
import { useNavigate, useLocation } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // လက်ရှိရောက်နေတဲ့ Page ကို စစ်ဆေးဖို့ Function
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
      <div className="container">
        {/* ၁။ Logo အပိုင်း */}
        <a
          className="navbar-brand d-flex align-items-center"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}>
          <img src="https://harlanrestaurant.com/images/logo.jpg" alt="Logo" className="me-2 logo-img rounded-circle" />
          <div className="brand-text-wrapper">
            <span className="fw-bold text-warning brand-name">HARLAN'S</span>
            <span className="text-white ms-1 brand-sub">PATTAYA</span>
          </div>
        </a>

        {/* Mobile Toggle */}
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ၂။ Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-lg-3">
            {[
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
              { name: "Reservation", path: "/reservation" },
              { name: "Gallery", path: "/gallery" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <li className="nav-item" key={link.path}>
                <a
                  className={`nav-link custom-link ${isActive(link.path) ? "active-link" : ""}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.path);
                  }}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* ၃။ Action Button */}
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <button className="btn btn-outline-warning rounded-pill px-4 py-2 fw-bold login-btn" onClick={() => navigate("/login")}>
              LOGIN
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Custom Navbar Styling */
        .custom-navbar {
          background: rgba(18, 18, 18, 0.9) !important;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 193, 7, 0.1);
          transition: all 0.3s ease;
        }

        .logo-img {
          height: 45px;
          width: 45px;
          object-fit: cover;
          border: 1px solid rgba(255, 193, 7, 0.5);
        }

        .brand-name {
          letter-spacing: 2px;
          font-size: 1.25rem;
        }

        .brand-sub {
          font-size: 0.8rem;
          letter-spacing: 1px;
          opacity: 0.8;
        }

        /* Nav Links */
        .custom-link {
          font-weight: 500;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.7) !important;
          position: relative;
          transition: 0.3s;
          padding: 0.5rem 0 !important;
        }

        .custom-link:hover, .active-link {
          color: #ffc107 !important;
        }

        /* Link Animation Line */
        .custom-link::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #ffc107;
          transition: 0.3s;
        }

        .custom-link:hover::after, .active-link::after {
          width: 100%;
        }

        /* Login Button */
        .login-btn {
          font-size: 0.85rem;
          letter-spacing: 1px;
          transition: 0.3s;
        }

        .login-btn:hover {
          background-color: #ffc107;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
        }

        /* Mobile Adjustments */
        @media (max-width: 991px) {
          .navbar-nav {
            padding: 1rem 0;
          }
          .custom-link::after {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
