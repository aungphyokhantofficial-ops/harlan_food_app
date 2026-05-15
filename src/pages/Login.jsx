import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, ArrowRight, ArrowLeft, Shield } from "lucide-react";

const loginApi = "http://localhost:8800/login";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const mutation = useMutation({
    mutationFn: async (credentials) => {
      const res = await fetch(loginApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login အဆင်မပြေပါ");
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      navigate("/admin");
    },
    onError: (error) => alert(error.message),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100 p-3 bg-black">
      {/* ပိုမိုကျစ်လစ်သော Card (Max-width: 360px) */}
      <div className="login-compact-card shadow-lg position-relative" style={{ maxWidth: "360px", width: "100%" }}>
        {/* Back Button */}
        <button onClick={() => navigate("/")} className="compact-back-btn">
          <ArrowLeft size={18} />
        </button>

        <div className="p-4">
          {/* Header */}
          <div className="text-center mb-4 mt-2">
            <div className="compact-icon-bg mx-auto mb-2">
              <Shield size={28} className="text-warning" />
            </div>
            <h5 className="fw-bold text-white mb-0">ADMIN ACCESS</h5>
            <p className="text-muted" style={{ fontSize: "11px" }}>
              Secure login for Harlan's Pattaya
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <div className="compact-input-group">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className="compact-input"
                  placeholder="Admin Email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="compact-input-group">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  name="password"
                  className="compact-input"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-end mb-4">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none text-warning fw-medium"
                onClick={() => navigate("/forget")}
                style={{ fontSize: "11px" }}>
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="compact-submit-btn w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
              disabled={mutation.isPending}>
              {mutation.isPending ?
                <span className="spinner-border spinner-border-sm"></span>
              : <>
                  SIGN IN <ArrowRight size={16} />
                </>
              }
            </button>
          </form>

          {/* Footer Label */}
          <div className="mt-4 text-center opacity-25">
            <span style={{ fontSize: "10px", color: "white", letterSpacing: "1px" }}>HARLAN v1.0</span>
          </div>
        </div>
      </div>

      <style>{`
        .login-wrapper {
          background: #050505;
          font-family: 'Inter', sans-serif;
        }
        .login-compact-card {
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .compact-back-btn {
          position: absolute;
          top: 15px;
          left: 15px;
          background: transparent;
          border: none;
          color: #666;
          transition: 0.3s;
        }
        .compact-back-btn:hover { color: #ffc107; }
        
        .compact-icon-bg {
          width: 55px;
          height: 55px;
          background: rgba(255, 193, 7, 0.05);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
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
        }
        .compact-submit-btn:hover {
          background: #fff;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
