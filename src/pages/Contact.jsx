import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../services/axiosInstance";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (newData) => {
      const res = await api.post("/contacts", {
        userName: newData.name,
        userEmail: newData.email,
        message: newData.message,
        subject: "Contact from Website",
      });
      return res.data;
    },
    onSuccess: () => {
      alert("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Server Error. Please try again.";
      alert("Error: " + errorMsg);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill all fields.");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="contact-page bg-dark min-vh-100">
      {/* 1. Header Section */}
      <div className="contact-header py-5 d-flex align-items-center justify-content-center text-center">
        <div className="container position-relative z-1 pt-5">
          <h4 className="text-warning text-uppercase ls-3 mb-2 fw-bold">Connect With Us</h4>
          <h1 className="display-3 fw-bold text-white mb-3">GET IN TOUCH</h1>
          <div className="header-line mx-auto mb-4"></div>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: "600px" }}>
            Experience world-class dining at Harlan's Pattaya. Whether you have a question or want to share feedback, we're here to listen.
          </p>
        </div>
      </div>

      <div className="container pb-5 mt-n5">
        <div className="row g-4">
          {/* 2. Info Column */}
          <div className="col-lg-4">
            <div className="info-card p-4 rounded-4 h-100 shadow-lg">
              <h3 className="text-white fw-bold mb-4">Contact Detail</h3>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="icon-box rounded-3">
                  <MapPin className="text-warning" />
                </div>
                <div>
                  <h6 className="text-warning mb-1 fw-bold">Location</h6>
                  <p className="text-white-50 small mb-0">Harlan's Pattaya, 47/72, Soi Welcome Town, Pattaya, Thailand</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="icon-box rounded-3">
                  <Phone className="text-warning" />
                </div>
                <div>
                  <h6 className="text-warning mb-1 fw-bold">Phone</h6>
                  <p className="text-white-50 mb-0">0811613248</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="icon-box rounded-3">
                  <Mail className="text-warning" />
                </div>
                <div>
                  <h6 className="text-warning mb-1 fw-bold">Email</h6>
                  <p className="text-white-50 mb-0">harlan.chef@gmail.com</p>
                </div>
              </div>

              <div className="line-section mt-auto pt-4 text-center border-top border-secondary">
                <p className="text-white-50 small mb-2">Scan for Quick Support</p>
                <img
                  src="https://harlanrestaurant.com/images/LINE.png"
                  alt="Line"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxWidth: "120px" }}
                />
              </div>
            </div>
          </div>

          {/* 3. Form Column */}
          <div className="col-lg-8">
            <div className="form-card bg-white p-4 p-md-5 rounded-4 shadow-lg border-top border-5 border-warning">
              <div className="d-flex align-items-center gap-2 mb-4">
                <MessageSquare className="text-warning" />
                <h3 className="fw-bold text-dark mb-0">Send Us a Message</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark small fw-bold">YOUR NAME</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control custom-input"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark small fw-bold">YOUR EMAIL</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control custom-input"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4 mt-3">
                  <label className="form-label text-dark small fw-bold">YOUR MESSAGE</label>
                  <textarea
                    id="message"
                    className="form-control custom-input"
                    rows="5"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={handleChange}></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 py-3 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 submit-btn"
                  disabled={mutation.isPending}>
                  {mutation.isPending ?
                    <span className="spinner-border spinner-border-sm"></span>
                  : <>
                      SEND MESSAGE <Send size={18} />
                    </>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Map Section */}
      <div className="map-container shadow-lg border-top border-warning">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.607280796969!2d100.8988152!3d12.9329437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102950434b7ae39%3A0xa83001ecd2d66297!2sHarlan%E2%80%98s%20Pattaya!5e0!3m2!1smy!2smm!4v1777556540931!5m2!1smy!2smm"
          width="100%"
          height="450"
          style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(90%)" }}
          allowFullScreen=""
          loading="lazy"></iframe>
      </div>

      <style>{`
        .contact-header {
          background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://harlanrestaurant.com/images/bg.jpg'); /* Replace with your actual BG image */
          background-size: cover;
          background-position: center;
          padding-bottom: 120px !important;
        }
        .header-line {
          width: 80px;
          height: 3px;
          background: #ffc107;
        }
        .ls-3 { letter-spacing: 3px; }
        .mt-n5 { margin-top: -80px; position: relative; z-index: 5; }
        
        /* Info Card */
        .info-card {
          background: #1a1a1a;
          border: 1px solid rgba(255,193,7,0.1);
        }
        .icon-box {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,193,7,0.1);
          border: 1px solid rgba(255,193,7,0.3);
        }

        /* Form Customization */
        .custom-input {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          padding: 12px 15px;
          border-radius: 8px;
          transition: 0.3s;
        }
        .custom-input:focus {
          background: #fff;
          border-color: #ffc107;
          box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.1);
        }
        
        .submit-btn {
          background: #000;
          border: none;
          transition: 0.3s;
        }
        .submit-btn:hover {
          background: #ffc107;
          color: #000;
          transform: translateY(-3px);
        }
        
        .map-container iframe {
          display: block;
        }
      `}</style>
    </div>
  );
}
