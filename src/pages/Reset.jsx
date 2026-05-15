import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Lock, Eye, EyeOff, Loader2, CheckCircle, Mail, ShieldAlert } from "lucide-react";

export default function Reset() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus({ type: "danger", msg: "Passwords do not match!" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:8800/reset/${token}`, {
        email,
        password,
      });

      setStatus({ type: "success", msg: "Password updated successfully!" });
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      setStatus({
        type: "danger",
        msg: error.response?.data?.message || "Invalid email or expired link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-container d-flex align-items-center justify-content-center min-vh-100 p-3 bg-black">
      <div className="reset-card shadow-lg overflow-hidden" style={{ maxWidth: "380px", width: "100%" }}>
        {/* Top Accent Line */}
        <div className="bg-warning" style={{ height: "4px" }}></div>

        <div className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="icon-badge mx-auto mb-3">
              <ShieldAlert size={28} className="text-warning" />
            </div>
            <h4 className="fw-bold text-white mb-1">Reset Password</h4>
            <p className="text-white-50 small">Secure your Harlan admin account.</p>
          </div>

          {status.msg && (
            <div
              className={`alert alert-${status.type === "danger" ? "danger" : "warning"} py-2 px-3 small border-0 d-flex align-items-center mb-4`}
              style={{ borderRadius: "12px", fontSize: "11px" }}>
              {status.type === "success" && <CheckCircle size={14} className="me-2" />}
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="text-warning small fw-bold mb-2 ps-1 text-uppercase ls-1" style={{ fontSize: "10px" }}>
                Verify Admin Email
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

            {/* New Password */}
            <div className="mb-3">
              <label className="text-warning small fw-bold mb-2 ps-1 text-uppercase ls-1" style={{ fontSize: "10px" }}>
                New Password
              </label>
              <div className="compact-input-group">
                <Lock size={16} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="compact-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ?
                    <EyeOff size={16} />
                  : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="text-warning small fw-bold mb-2 ps-1 text-uppercase ls-1" style={{ fontSize: "10px" }}>
                Confirm Password
              </label>
              <div className="compact-input-group">
                <Lock size={16} className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="compact-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ?
                    <EyeOff size={16} />
                  : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="compact-submit-btn w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
              disabled={isLoading}>
              {isLoading ?
                <Loader2 size={18} className="animate-spin" />
              : "UPDATE PASSWORD"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .reset-container { background: #050505; font-family: 'Inter', sans-serif; }
        .reset-card { background: #111; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; }
        .icon-badge {
          width: 60px; height: 60px; background: rgba(255, 193, 7, 0.05);
          border-radius: 20px; display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255, 193, 7, 0.1);
        }
        .compact-input-group {
          position: relative; background: #1a1a1a; border-radius: 12px;
          border: 1px solid transparent; transition: 0.3s;
        }
        .compact-input-group:focus-within { border-color: #ffc107; background: #222; }
        .input-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #555; }
        .eye-btn {
          position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
          background: transparent; border: none; color: #555; transition: 0.3s;
        }
        .eye-btn:hover { color: #ffc107; }
        .compact-input {
          width: 100%; padding: 10px 40px 10px 45px; background: transparent;
          border: none; color: white; font-size: 0.9rem; outline: none;
        }
        .compact-submit-btn {
          background: #ffc107; color: #000; border: none; border-radius: 12px;
          transition: 0.3s; font-size: 0.85rem; letter-spacing: 0.5px;
        }
        .compact-submit-btn:hover:not(:disabled) { background: #fff; transform: translateY(-2px); }
        .compact-submit-btn:disabled { opacity: 0.6; }
        .ls-1 { letter-spacing: 1px; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
