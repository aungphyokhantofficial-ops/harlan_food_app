import { useNavigate } from "react-router";
import { MapPin, Phone, Mail, ExternalLink, MessageSquare } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer-wrapper bg-dark text-white pt-5">
      <footer className="container">
        <div className="row g-5 pb-5">
          {/* ၁။ Brand Logo & Slogan */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-brand">
              <img src="https://harlanrestaurant.com/images/logo.jpg" alt="Harlan Logo" className="footer-logo mb-3 rounded-circle" />
              <h5 className="text-warning fw-bold mb-2">HARLAN'S PATTAYA</h5>
              <p className="text-secondary small fst-italic">"Serious Food, No Compromise"</p>
            </div>
          </div>

          {/* ၂။ Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-heading mb-4">Quick Links</h5>
            <ul className="list-unstyled footer-nav">
              {["Home", "Menu", "Reservation", "About", "Contact"].map((item) => (
                <li key={item} className="mb-2">
                  <a
                    href="#"
                    className="text-secondary text-decoration-none footer-link-item"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
                    }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ၃။ Follow & Reviews */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading mb-4">Engagement</h5>
            <div className="d-flex flex-column gap-3">
              <a
                href="https://www.tiktok.com/@122004apk"
                className="tiktok-card d-flex align-items-center gap-2 p-2 rounded bg-secondary bg-opacity-10 text-decoration-none">
                <img src="https://i.pinimg.com/736x/c9/57/1d/c9571d5c14647a889fb4b3e923c5b7ce.jpg" alt="TikTok" className="tiktok-mini-icon" />
                <span className="text-white small">Follow on TikTok</span>
              </a>

              <a
                href="https://www.google.com/search?q=Harlan%E2%80%98s+Pattaya#lrd=0x3102950434b7ae39:0xa83001ecd2d66297,1"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center gap-2">
                <ExternalLink size={14} /> See Google Reviews
              </a>

              <a
                href="https://www.google.com/search?q=Harlan%E2%80%98s+Pattaya#lrd=0x3102950434b7ae39:0xa83001ecd2d66297,3"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-warning d-flex align-items-center justify-content-center gap-2 fw-bold">
                <MessageSquare size={14} /> Write a Review
              </a>
            </div>
          </div>

          {/* ၄။ Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-heading mb-4">Visit Us</h5>
            <div className="contact-info small text-secondary">
              <div className="d-flex gap-2 mb-3">
                <MapPin className="text-warning shrink-0" size={18} />
                <span>47/72, Soi Welcome Town, Central Pattaya Road, Chon Buri, Thailand</span>
              </div>
              <div className="d-flex gap-2 mb-2">
                <Phone className="text-warning" size={18} />
                <span>0811613248</span>
              </div>
              <div className="d-flex gap-2">
                <Mail className="text-warning" size={18} />
                <span>harlan.chef@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="border-secondary opacity-25" />
        <div className="footer-bottom py-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="text-secondary small">
            © 2026 <span className="text-warning">Harlan's Pattaya</span>. All rights reserved.
          </div>
          <div className="d-flex gap-4 text-secondary small opacity-75">
            <span>Version 1.0</span>
            <span>
              Developed By: <strong className="text-white">Classic Software Team</strong>
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-wrapper {
          background: #111111 !important;
          font-family: 'Inter', sans-serif;
        }
        .footer-logo {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border: 2px solid #ffc107;
        }
        .footer-heading {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #fff;
          text-transform: uppercase;
        }
        .footer-link-item {
          transition: 0.3s ease;
          display: inline-block;
        }
        .footer-link-item:hover {
          color: #ffc107 !important;
          transform: translateX(5px);
        }
        .tiktok-mini-icon {
          width: 30px;
          height: 30px;
          border-radius: 6px;
        }
        .tiktok-card {
          transition: 0.3s;
        }
        .tiktok-card:hover {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .shrink-0 { flex-shrink: 0; }
        @media (max-width: 768px) {
          .footer-bottom { justify-content: center; text-align: center; }
        }
      `}</style>
    </div>
  );
}
