import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";

const hourApi = "http://localhost:8800/hours";

export default function Home() {
  const navigate = useNavigate();

  // --- 🔥 ၁။ အချိန်ပြောင်းပေးမယ့် Helper Function ထည့်မယ် ---
  const formatTime12 = (timeString) => {
    if (!timeString || timeString === "---") return "---";
    try {
      const [hours, minutes] = timeString.split(":");
      let hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12; // 0 ကို 12 လို့ပြောင်းပြီး 13 ကို 1 လို့ပြောင်းပေးတာပါ
      return `${hour}:${minutes} ${ampm}`;
    } catch (e) {
      return timeString;
    }
  };

  const {
    data: hours,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hours"],
    queryFn: async () => {
      const res = await fetch(hourApi);
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Something went wrong!
        </div>
      </div>
    );

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="src/assets/food.mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
        <div className="hero-content container text-center text-white">
          <h1 className="fw-bold mb-3">Harlan's Pattaya</h1>
          <p className=" display-2 fw-bold text-warning fst-italic">Where Dining Is An Experience</p>
          <h5>Fire. Precision. Obsession.</h5>
          <h5> Welcome to Harlan’s.</h5>
          <div className="mt-5">
            <button className="btn btn-outline-light btn-lg px-4 me-3 rounded-3" onClick={() => navigate("/reservation")}>
              Reserve a Table
            </button>
            <button className="btn btn-outline-light btn-lg px-4 rounded-3" onClick={() => navigate("/menu")}>
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Signature & Services Sections (နဂိုအတိုင်းထားပါသည်) */}
      {/* ... (မင်းရဲ့ Signature Experience နဲ့ Our Services section တွေ ဒီကြားထဲမှာ ရှိပါမယ်) ... */}

      {/* Sunday Special */}
      <section className="my-5">
        <div className="text-center sunday-section">
          <h1>Sunday Special</h1>
          <p>Exclusive Wagyu & Wine pairing experience available only today</p>
          <button className="btn btn-outline-warning" onClick={() => navigate("/menu")}>
            Explore Sunday Menu
          </button>
        </div>
      </section>

      {/* --- 🔥 Opening Hours Section (ပြင်ဆင်ထားသောအပိုင်း) --- */}
      {/* --- 🔥 Opening Hours Section (Compact & Modern Design) --- */}
      <section className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-2">Opening Hours</h2>
              <div className="mx-auto bg-warning" style={{ width: "50px", height: "3px" }}></div>
            </div>

            <div className="hour-card shadow-lg border-0 overflow-hidden" style={{ borderRadius: "24px" }}>
              {/* Header - ပိုကျစ်လစ်သွားသည် */}
              <div className="bg-dark p-3 text-center">
                <span className="text-warning fw-bold small" style={{ letterSpacing: "3px" }}>
                  RESTAURANT TIMING
                </span>
              </div>

              {/* Days List - Padding များလျှော့ချထားသည် */}
              <div className="p-3 p-md-4 bg-white">
                {hours.map((hour, index) => {
                  const currentDay = new Date().getDay();
                  const isToday = currentDay === (index === 6 ? 0 : index + 1);

                  return (
                    <div
                      key={index}
                      className={`d-flex justify-content-between align-items-center px-3 py-2 mb-1 rounded-3 transition-all ${
                        isToday ? "today-highlight" : "hover-light"
                      }`}>
                      <div className="d-flex align-items-center gap-3">
                        <span className={`fw-bold small ${isToday ? "text-warning" : "text-muted"}`} style={{ width: "35px" }}>
                          {hour.dayOfWeek.substring(0, 3).toUpperCase()}
                        </span>
                        <span className={`fw-semibold ${isToday ? "text-dark" : "text-secondary"}`}>{hour.dayOfWeek}</span>
                      </div>

                      <div className="text-end">
                        {hour.isClosed ?
                          <span className="text-danger small fw-bold">CLOSED</span>
                        : <span className={`fw-bold ${isToday ? "text-dark" : "text-muted"}`} style={{ fontSize: "0.95rem" }}>
                            {formatTime12(hour.openTime)} - {formatTime12(hour.closeTime)}
                          </span>
                        }
                      </div>
                    </div>
                  );
                })}

                {/* Quick Action - ပိုလှပသော Call to Action */}
                <div className="mt-4 pt-3 border-top border-light text-center">
                  <button
                    className="btn btn-dark w-100 py-2 rounded-pill fw-bold shadow-sm"
                    onClick={() => navigate("/reservation")}
                    style={{ letterSpacing: "1px", fontSize: "0.9rem" }}>
                    BOOK A TABLE NOW
                  </button>
                  <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.75rem" }}>
                    * Sunday Special menu available exclusively on Sundays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
    .hour-card {
      background: #ffffff;
      border: 1px solid rgba(0,0,0,0.05);
    }
    .today-highlight {
      background: rgba(255, 193, 7, 0.08);
      border-left: 4px solid #ffc107;
    }
    .hover-light:hover {
      background: #f8f9fa;
    }
    .transition-all {
      transition: all 0.3s ease;
    }
    .ls-3 { letter-spacing: 3px; }
  `}</style>
      </section>
    </div>
  );
}
