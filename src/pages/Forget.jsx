import React, { useState } from "react";
import axios from "axios";
import { Mail, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { useNavigate } from "react-router";

export default function Forget() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post("http://localhost:8800/forget", {
        email,
      });

      setMessage({
        type: "success",
        text: response.data.message || "Reset link sent to your email!",
      });
      setEmail("");
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forget-container d-flex align-items-center justify-content-center min-vh-100 p-3 bg-black">
      <div className="forget-card shadow-lg position-relative overflow-hidden" style={{ maxWidth: "360px", width: "100%" }}>
        {/* Top Accent Line */}
        <div className="bg-warning" style={{ height: "4px" }}></div>

        <div className="p-4 p-md-5">
          {/* Header Icon Section */}
          <div className="text-center mb-4">
            <div className="icon-circle mx-auto mb-3">
              <KeyRound size={28} className="text-warning" />
            </div>
            <h4 className="fw-bold text-white mb-1">Forgot Password?</h4>
            <p className="text-white-50 small">Enter your email and we'll send a recovery link.</p>
          </div>

          {/* Alert Message */}
          {message.text && (
            <div
              className={`alert alert-${message.type === "danger" ? "danger" : "warning"} py-2 px-3 small border-0 text-center mb-4`}
              style={{ borderRadius: "12px", fontSize: "11px" }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-warning small fw-bold mb-2 ps-1 text-uppercase ls-1" style={{ fontSize: "10px" }}>
                Email Address
              </label>
              <div className="compact-input-group">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  className="compact-input"
                  placeholder="admin@harlan.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="compact-submit-btn w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 mb-4"
              disabled={isLoading}>
              {isLoading ?
                <Loader2 size={18} className="animate-spin" />
              : "SEND RESET LINK"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-link p-0 text-decoration-none text-white-50 hover-warning small d-flex align-items-center justify-content-center mx-auto gap-1"
              style={{ fontSize: "12px" }}>
              <ArrowLeft size={14} /> Back to Login
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .forget-container {
          background: #050505;
          font-family: 'Inter', sans-serif;
        }
        .forget-card {
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
        }
        .icon-circle {
          width: 60px;
          height: 60px;
          background: rgba(255, 193, 7, 0.05);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 193, 7, 0.1);
        }
        .compact-input-group {
          position: relative;
          background: #1a1a1a;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: 0.3s;
        }
        .compact-input-group:focus-within {
          border-color: #ffc107;
          background: #222;
        }
        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #555;
        }
        .compact-input {
          width: 100%;
          padding: 10px 15px 10px 45px;
          background: transparent;
          border: none;
          color: white;
          font-size: 0.9rem;
          outline: none;
        }
        .compact-submit-btn {
          background: #ffc107;
          color: #000;
          border: none;
          border-radius: 12px;
          transition: 0.3s;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        .compact-submit-btn:hover:not(:disabled) {
          background: #fff;
          transform: translateY(-2px);
        }
        .compact-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .hover-warning:hover {
          color: #ffc107 !important;
        }
        .ls-1 { letter-spacing: 1px; }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
