import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  LayoutDashboard,
  Utensils,
  Calendar,
  Image as ImageIcon,
  Clock,
  Phone,
  Menu,
  X,
  ChevronRight,
  LogOut,
  ExternalLink,
  Home,
} from "lucide-react";

export default function Admin() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const location = useLocation();

  // --- Token ရယူခြင်း ---
  const token = localStorage.getItem("token");

  // --- ၁။ Data Fetching ---
  const { data: reservations = [] } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      // မင်းရဲ့ Reservation API URL ကို ပြန်စစ်ပါ (ဥပမာ /api/reservations ဖြစ်နိုင်သည်)
      const res = await axios.get("http://localhost:8800/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      // 🔥 Backend မှာ route က /api/contacts ဖြစ်နေနိုင်လို့ URL ကို သတိထားပါ
      const res = await axios.get("http://localhost:8800/contacts", {
        headers: { Authorization: `Bearer ${token}` }, // 🔥 Auth middleware အတွက် token ထည့်ပေးခြင်း
      });
      return res.data;
    },
  });

  // --- ၂။ Badge Calculation Logic ---
  const pendingCount = Array.isArray(reservations) ? reservations.filter((r) => r.status === "pending").length : 0;

  // 🔥 Contacts data က array ဖြစ်မှ filter လုပ်ရန်
  const unreadMessageCount = Array.isArray(contacts) ? contacts.filter((c) => c.isRead === false || c.isRead === 0).length : 0;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
      else setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    const isConfirm = window.confirm("Are you sure you want to logout?");
    if (isConfirm) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminUser");
      sessionStorage.clear();
      navigate("/");
    }
  };

  const menuItems = [
    { label: "Dashboard (Menu)", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Opening Hours", path: "/admin/a_openhour", icon: <Clock size={18} /> },
    { label: "Menu Edit", path: "/admin/a_menu", icon: <Utensils size={18} /> },
    { label: "Gallery Edit", path: "/admin/a_gallery", icon: <ImageIcon size={18} /> },
    {
      label: "Reservations",
      path: "/admin/a_reservation",
      icon: <Calendar size={18} />,
      badge: pendingCount > 0 ? pendingCount : null,
    },
    {
      label: "Contact Info",
      path: "/admin/a_contact",
      icon: <Phone size={18} />,
      badge: unreadMessageCount > 0 ? unreadMessageCount : null,
    },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light admin-layout position-relative">
      {isOpen && window.innerWidth <= 768 && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 1040 }} onClick={() => setIsOpen(false)}></div>
      )}

      <aside
        className="bg-dark text-white position-fixed h-100 shadow-lg transition-all"
        style={{
          width: "260px",
          left: isOpen ? "0" : "-260px",
          top: 0,
          zIndex: 1050,
          overflowX: "hidden",
        }}>
        <div className="p-4 d-flex flex-column h-100" style={{ width: "260px" }}>
          <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">
            <h5 className="fw-bold text-warning mb-0">HARLAN ADMIN</h5>
            <button className="btn btn-link text-white-50 p-0 d-md-none" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="nav flex-column gap-1 flex-grow-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth <= 768) setIsOpen(false);
                  }}
                  className={`btn d-flex align-items-center gap-3 py-3 px-3 rounded-3 transition-all border-0 position-relative ${
                    isActive ? "bg-warning text-dark fw-bold" : "text-white-50 hover-nav-item"
                  }`}
                  style={{ textAlign: "left" }}>
                  <span className={isActive ? "text-dark" : "text-warning"}>{item.icon}</span>
                  <span className="flex-grow-1 small">{item.label}</span>

                  {item.badge && (
                    <span
                      className="badge rounded-pill bg-danger position-absolute shadow-sm"
                      style={{
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "10px",
                        padding: "4px 8px",
                      }}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && !item.badge && <ChevronRight size={14} />}
                </button>
              );
            })}
            <hr className="text-secondary my-3" />
            <button
              onClick={() => navigate("/")}
              className="btn d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white-50 hover-nav-item border-0 shadow-none outline-none">
              <span className="text-info">
                <Home size={18} />
              </span>
              <span className="small">Back to Live Site</span>
            </button>
          </nav>

          <div className="mt-auto pt-3 border-top border-secondary">
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-2 rounded-3 py-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-grow-1 d-flex flex-column transition-all" style={{ marginLeft: isOpen && window.innerWidth > 768 ? "260px" : "0" }}>
        <header className="navbar bg-white shadow-sm px-4 py-2 border-bottom sticky-top">
          <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button className="btn btn-light border me-3 shadow-sm position-relative" onClick={() => setIsOpen(!isOpen)}>
                <Menu size={20} />
                {!isOpen && (pendingCount > 0 || unreadMessageCount > 0) && (
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                )}
              </button>
              <h5 className="mb-0 fw-bold text-dark d-none d-sm-block">Control Panel Center</h5>
            </div>
            <button
              className="btn btn-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-2 shadow-sm border-0"
              onClick={() => navigate("/")}>
              <ExternalLink size={14} />
              <span className="d-none d-md-inline">Visit Website</span>
            </button>
          </div>
        </header>

        <main className="p-3 p-md-4 flex-grow-1 bg-light">
          <div className="bg-white rounded-4 shadow-sm p-3 p-md-4 border" style={{ minHeight: "80vh" }}>
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        .transition-all { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-nav-item:hover { background: rgba(255, 255, 255, 0.05); color: #ffc107 !important; transform: translateX(5px); }
        .admin-layout { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
